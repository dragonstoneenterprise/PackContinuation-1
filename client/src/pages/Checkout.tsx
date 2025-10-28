import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

// From blueprint:javascript_stripe - Make sure to call `loadStripe` outside of a component's render
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  productName: string;
  amount: number;
  slug: string;
}

const CheckoutForm = ({ productName, amount, slug }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    setIsProcessing(false);

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        className="w-full rounded-full text-base" 
        size="lg"
        disabled={!stripe || isProcessing}
        data-testid="button-pay"
      >
        {isProcessing ? "Processing..." : `Pay $${amount}`}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [productData, setProductData] = useState<{ name: string; price: number } | null>(null);
  const [, setLocation] = useLocation();
  
  // Get product slug from URL params
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');

  useEffect(() => {
    if (!slug) {
      setLocation('/');
      return;
    }

    // Create PaymentIntent - server fetches canonical price from storage
    apiRequest("POST", "/api/create-payment-intent", { slug })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setProductData(data.product);
      })
      .catch((error) => {
        console.error('Error creating payment intent:', error);
        setLocation('/');
      });
  }, [slug, setLocation]);

  if (!clientSecret || !productData) {
    return (
      <div className="min-h-screen pt-24 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <Skeleton className="h-8 w-48 mb-8" />
          <Card className="p-8">
            <div className="space-y-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 md:px-8 pb-16">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => setLocation('/')}
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">HAVEN</h1>
          <div className="flex items-center justify-between max-w-md mx-auto mt-6 p-4 bg-muted/30 rounded-lg">
            <span className="font-medium" data-testid="text-product-name">{productData.name}</span>
            <span className="text-2xl font-bold" data-testid="text-checkout-amount">${productData.price}</span>
          </div>
        </div>

        <Card className="p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm productName={productData.name} amount={productData.price} slug={slug || ''} />
          </Elements>
          <p className="text-xs text-center text-muted-foreground mt-6">
            Powered by Stripe
          </p>
        </Card>
      </div>
    </div>
  );
}
