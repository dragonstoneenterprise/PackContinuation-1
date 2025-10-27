import { ProductPage } from "./ProductPage";
import heroImage from "@assets/generated_images/Home_Office_Power_Kit_da145527.png";

export default function HomeOfficePowerKit() {
  return (
    <ProductPage
      name="Home Office Power Kit"
      tagline="The world's most efficient remote work power solution."
      description="Transform your home office with our comprehensive power management bundle. Designed for professionals who demand reliability, organization, and efficiency in their workspace. Never worry about running out of outlets or tangled cables again."
      price={79}
      originalPrice={118}
      heroImage={heroImage}
      category="Home Office"
      features={[
        "Premium surge protection keeps your devices safe from power spikes and outages",
        "USB-C and USB-A ports for fast charging of all your devices simultaneously",
        "Cable management system eliminates desktop clutter and tangles",
        "Compact design maximizes desk space while providing maximum functionality",
        "Energy-efficient power distribution reduces electricity costs",
        "Perfect for remote workers, freelancers, and home office professionals",
      ]}
      includes={[
        "6-outlet surge protector power strip with 900J protection",
        "2x USB-C fast charging ports (20W each)",
        "3x USB-A charging ports (12W each)",
        "Premium braided power cable (6ft)",
        "Cable management clips and organizers",
        "Adhesive cable holders and ties",
        "20,000mAh portable power bank",
        "Multi-device charging cables kit",
      ]}
    />
  );
}
