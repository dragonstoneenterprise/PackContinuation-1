import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPackageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

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

  const httpServer = createServer(app);

  return httpServer;
}
