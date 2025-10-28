import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPackageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import Stripe from "stripe";

// Stripe integration from blueprint:javascript_stripe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-09-30.clover",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all packages
  app.get("/api/packages", async (req, res) => {
    try {
      const packages = await storage.getAllPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch packages" });
    }
  });

  // Get package by slug
  app.get("/api/packages/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const pkg = await storage.getPackageBySlug(slug);
      
      if (!pkg) {
        return res.status(404).json({ error: "Package not found" });
      }
      
      res.json(pkg);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch package" });
    }
  });

  // Create new package (admin endpoint)
  app.post("/api/packages", async (req, res) => {
    try {
      const result = insertPackageSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: fromZodError(result.error).toString() 
        });
      }
      
      const pkg = await storage.createPackage(result.data);
      res.status(201).json(pkg);
    } catch (error) {
      res.status(500).json({ error: "Failed to create package" });
    }
  });

  // Stripe payment route for one-time payments
  // From blueprint:javascript_stripe
  // Security: Fetches product price from storage, never trusts client-provided amounts
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { slug } = req.body;
      
      if (!slug) {
        return res.status(400).json({ error: "Product slug is required" });
      }

      // Fetch product from storage to get the canonical price
      const product = await storage.getPackageBySlug(slug);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(product.price * 100), // Convert to cents, use stored price
        currency: "usd",
        metadata: {
          productSlug: slug,
          productName: product.name,
          productId: product.id
        }
      });
      
      res.json({ 
        clientSecret: paymentIntent.client_secret,
        product: {
          name: product.name,
          price: product.price
        }
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Verify payment and get order details
  // Security: Validates payment completion via Stripe before returning order details
  app.get("/api/verify-payment/:paymentIntentId", async (req, res) => {
    try {
      const { paymentIntentId } = req.params;
      
      if (!paymentIntentId) {
        return res.status(400).json({ error: "Payment intent ID is required" });
      }

      // Retrieve and verify the payment intent from Stripe
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status !== 'succeeded') {
        return res.status(400).json({ error: "Payment not completed" });
      }

      // Get product details from metadata
      const productSlug = paymentIntent.metadata.productSlug;
      
      if (!productSlug) {
        return res.status(500).json({ error: "Product information not found" });
      }

      const product = await storage.getPackageBySlug(productSlug);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ 
        verified: true,
        product: {
          name: product.name,
          price: product.price,
          slug: productSlug
        },
        paymentStatus: paymentIntent.status,
        amount: paymentIntent.amount / 100
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Error verifying payment: " + error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
