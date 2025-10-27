import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Truck, Shield, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductPageProps {
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  heroImage: string;
  features: string[];
  includes: string[];
  category: string;
}

export function ProductPage({
  name,
  tagline,
  description,
  price,
  originalPrice,
  heroImage,
  features,
  includes,
  category,
}: ProductPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const savings = originalPrice - price;
  const savingsPercent = Math.round((savings / originalPrice) * 100);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const trustIndicators = [
    { icon: Truck, text: "Free Shipping" },
    { icon: RotateCcw, text: "30-Day Returns" },
    { icon: Shield, text: "1-Year Warranty" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 md:px-8 pt-24 pb-12">
        <div
          className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge variant="secondary" className="mb-6 text-sm md:text-base px-4 py-2" data-testid="badge-category">
            {category}
          </Badge>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            {name}
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-3xl mx-auto font-normal tracking-wide">
            {tagline}
          </p>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <div className="aspect-[4/3] flex items-center justify-center">
              <img
                src={heroImage}
                alt={name}
                className="w-full h-full object-contain drop-shadow-2xl"
                data-testid="img-hero-product"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-base md:text-lg"
              data-testid="button-buy"
            >
              Buy - ${price}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-base md:text-lg border-2"
              data-testid="button-learn-more"
              onClick={() => {
                document.getElementById("details")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Product Information Section */}
      <section id="details" className="py-16 md:py-24 px-4 md:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                Everything You Need
              </h2>
              <p className="text-base md:text-lg text-foreground leading-relaxed mb-8">
                {description}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-bold" data-testid="text-price">${price}</span>
                  <span className="text-xl md:text-2xl text-muted-foreground line-through" data-testid="text-original-price">
                    ${originalPrice}
                  </span>
                  <Badge variant="destructive" className="text-sm" data-testid="badge-savings">
                    Save {savingsPercent}%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Save ${savings} with this complete bundle
                </p>
              </div>

              <Button size="lg" className="rounded-full px-8 w-full sm:w-auto" data-testid="button-buy-now">
                Buy Now
              </Button>
            </div>

            <Card className="p-8">
              <h3 className="text-2xl font-semibold mb-6">What's Included</h3>
              <div className="space-y-4">
                {includes.map((item, index) => (
                  <div key={index} className="flex items-start gap-3" data-testid={`item-included-${index}`}>
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm md:text-base leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
            Why Choose This Bundle?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6" data-testid={`card-feature-${index}`}>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <p className="text-base leading-relaxed">{feature}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Setup?
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center gap-2" data-testid={`trust-${index}`}>
                <indicator.icon className="h-5 w-5" />
                <span className="text-sm md:text-base font-medium">{indicator.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full px-8 py-6 text-base md:text-lg"
              data-testid="button-buy-footer"
            >
              Buy for ${price}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-base md:text-lg border-2 bg-primary/10 hover:bg-primary/20 border-primary-foreground/20"
              data-testid="button-contact"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
