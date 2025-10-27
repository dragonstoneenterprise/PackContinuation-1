import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowRight, Package, Zap, Award, AlertCircle } from "lucide-react";
import type { Package as PackageType } from "@shared/schema";
import homeOfficeImg from "@assets/generated_images/Home_Office_Power_Kit_da145527.png";
import gamerPackImg from "@assets/generated_images/4K_Gamer_Pack_6178dea2.png";
import streamingSetupImg from "@assets/generated_images/Streaming_Setup_Pro_3fb52712.png";
import deskBundleImg from "@assets/generated_images/Studio_Clean_Desk_Bundle_6f7c400d.png";

const imageMap: Record<string, string> = {
  "home-office-power-kit": homeOfficeImg,
  "4k-gamer-pack": gamerPackImg,
  "streaming-setup-pro": streamingSetupImg,
  "studio-clean-desk-bundle": deskBundleImg,
};

export default function Home() {
  const { data: packages, isLoading, error } = useQuery<PackageType[]>({
    queryKey: ["/api/packages"],
  });

  const features = [
    {
      icon: Package,
      title: "Curated Bundles",
      description: "Handpicked products that work perfectly together",
    },
    {
      icon: Zap,
      title: "Ready to Use",
      description: "Everything you need in one complete package",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Only the best products for your setup",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Your Perfect Setup,
            <br />
            <span className="text-primary">One Bundle.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Premium tech bundles curated for professionals, gamers, creators, and minimalists.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full px-8 text-base md:text-lg"
              data-testid="button-explore-packages"
              onClick={() => {
                document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Packages
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center" data-testid={`feature-${index}`}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section id="packages" className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Choose Your Perfect Bundle
          </h2>

          {error && (
            <Alert variant="destructive" className="max-w-2xl mx-auto mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="ml-2">
                Failed to load packages. Please refresh the page to try again.
              </AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-square" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {packages?.map((pkg) => {
                const image = imageMap[pkg.slug] || pkg.heroImage;
                return (
                  <Link key={pkg.id} href={`/packages/${pkg.slug}`}>
                    <Card className="overflow-hidden hover-elevate transition-all duration-300 cursor-pointer h-full" data-testid={`card-package-${pkg.slug}`}>
                      <div className="aspect-square bg-muted/30 p-8 flex items-center justify-center">
                        <img
                          src={image}
                          alt={pkg.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{pkg.tagline}</p>
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-3xl font-bold">${pkg.price}</span>
                          {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                            <span className="text-lg text-muted-foreground line-through">
                              ${pkg.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1 rounded-full" size="sm" data-testid={`button-view-${pkg.slug}`}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Upgrade Your Setup?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Free shipping on all bundles. 30-day money-back guarantee.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full px-8 text-base md:text-lg"
            data-testid="button-browse-all"
            onClick={() => {
              document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Browse All Packages
          </Button>
        </div>
      </section>
    </div>
  );
}
