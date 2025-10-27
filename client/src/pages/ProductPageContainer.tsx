import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { ProductPage } from "./ProductPage";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Package } from "@shared/schema";
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

export default function ProductPageContainer() {
  const [, params] = useRoute("/packages/:slug");
  const slug = params?.slug || "";

  const { data: pkg, isLoading, error } = useQuery<Package>({
    queryKey: ["/api/packages", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-32 mx-auto mb-6" />
            <Skeleton className="h-16 md:h-20 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-8 w-2/3 mx-auto mb-12" />
            <div className="flex gap-4 justify-center mb-16">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
            <Skeleton className="aspect-[4/3] w-full max-w-4xl mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="min-h-screen pt-24 px-4 md:px-8 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="ml-2">
            Failed to load product. Please try again.
          </AlertDescription>
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={() => window.location.reload()}
            data-testid="button-retry"
          >
            Retry
          </Button>
        </Alert>
      </div>
    );
  }

  const heroImage = imageMap[pkg.slug] || pkg.heroImage;

  return (
    <ProductPage
      name={pkg.name}
      tagline={pkg.tagline}
      description={pkg.description}
      price={pkg.price}
      originalPrice={pkg.originalPrice || pkg.price}
      heroImage={heroImage}
      category={pkg.category}
      features={pkg.features}
      includes={pkg.includes}
    />
  );
}
