import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, XCircle } from "lucide-react";

interface VerifiedOrder {
  verified: boolean;
  product: {
    name: string;
    price: number;
    slug: string;
  };
  paymentStatus: string;
  amount: number;
}

export default function Success() {
  const [, setLocation] = useLocation();
  const [orderData, setOrderData] = useState<VerifiedOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const params = new URLSearchParams(window.location.search);
  const paymentIntentId = params.get('payment_intent');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!paymentIntentId) {
      setLocation('/');
      return;
    }

    // Verify payment with backend before showing confirmation
    apiRequest("GET", `/api/verify-payment/${paymentIntentId}`)
      .then((res) => res.json())
      .then((data: VerifiedOrder) => {
        if (data.verified && data.paymentStatus === 'succeeded') {
          setOrderData(data);
        } else {
          setError('Payment verification failed');
        }
      })
      .catch((err) => {
        console.error('Payment verification error:', err);
        setError('Unable to verify payment');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [paymentIntentId, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-4 md:px-8 pb-16">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 md:p-12 text-center">
            <Skeleton className="h-20 w-20 rounded-full mx-auto mb-6" />
            <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
            <Skeleton className="h-32 w-full mb-4" />
          </Card>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen pt-24 px-4 md:px-8 pb-16">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                <XCircle className="h-12 w-12 text-destructive" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Payment Verification Failed
            </h1>
            <p className="text-muted-foreground mb-8">
              {error || 'Unable to verify your payment. Please contact support.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="rounded-full"
                onClick={() => setLocation('/')}
              >
                Return Home
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full"
                onClick={() => window.location.href = 'mailto:support@dragonstone.online'}
              >
                Contact Support
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 md:px-8 pb-16">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 md:p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-500" data-testid="icon-success" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Thank you, your order has been confirmed.
          </h1>

          <div className="max-w-md mx-auto space-y-6 my-8">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <span className="font-medium" data-testid="text-success-product">{orderData.product.name}</span>
              <span className="text-xl font-bold" data-testid="text-success-amount">${orderData.product.price}</span>
            </div>

            <div className="text-left space-y-2 p-4 bg-muted/30 rounded-lg">
              <h3 className="font-semibold mb-2">Shipping address</h3>
              <p className="text-sm text-muted-foreground">
                Your order confirmation and shipping details<br />
                will be sent to your email shortly.
              </p>
            </div>

            <div className="text-left space-y-2 p-4 bg-muted/30 rounded-lg">
              <h3 className="font-semibold mb-2">Payment method</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-background rounded">Card</span>
                Payment successful
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              size="lg"
              className="rounded-full"
              onClick={() => setLocation('/')}
              data-testid="button-continue-shopping"
            >
              Continue Shopping
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
              onClick={() => window.location.href = 'mailto:support@dragonstone.online'}
              data-testid="button-contact-support"
            >
              Contact Support
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-8">
            Return to havensetup.githubld.o
          </p>
        </Card>
      </div>
    </div>
  );
}
