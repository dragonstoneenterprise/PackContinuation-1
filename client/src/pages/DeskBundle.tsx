import { ProductPage } from "./ProductPage";
import heroImage from "@assets/generated_images/Studio_Clean_Desk_Bundle_6f7c400d.png";

export default function DeskBundle() {
  return (
    <ProductPage
      name="Studio Clean Desk Bundle"
      tagline="Minimalist organization for focused minds."
      description="Create your perfect minimalist workspace with our curated desk organization bundle. Inspired by Scandinavian design principles, this collection helps you maintain a clutter-free environment that promotes focus, creativity, and productivity."
      price={69}
      originalPrice={98}
      heroImage={heroImage}
      category="Organization"
      features={[
        "Minimalist design complements any workspace aesthetic",
        "Premium materials including natural wood and aerospace-grade aluminum",
        "Modular system adapts to your changing needs",
        "Wireless charging eliminates cable clutter on your desk",
        "Eco-friendly and sustainable materials",
        "Perfect for minimalists, designers, and creative professionals",
      ]}
      includes={[
        "Premium desk organizer set (pen holder, tray, compartments)",
        "Wireless charging pad (10W fast charging)",
        "Minimalist desk mat (vegan leather, 31.5\" x 15.75\")",
        "Cable management box and clips",
        "Modern desk plant with ceramic pot",
        "Bamboo monitor stand with storage",
        "Microfiber desk cleaning kit",
        "Drawer organizer inserts",
      ]}
    />
  );
}
