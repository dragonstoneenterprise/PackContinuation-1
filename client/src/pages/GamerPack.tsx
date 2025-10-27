import { ProductPage } from "./ProductPage";
import heroImage from "@assets/generated_images/4K_Gamer_Pack_6178dea2.png";

export default function GamerPack() {
  return (
    <ProductPage
      name="4K Gamer Pack"
      tagline="Ultimate gaming experience for console & PC."
      description="Elevate your gaming setup to professional levels with our complete 4K gaming bundle. Whether you're streaming, competing, or just playing for fun, this pack delivers the performance and comfort you need for marathon gaming sessions."
      price={89}
      originalPrice={135}
      heroImage={heroImage}
      category="Gaming"
      features={[
        "4K HDMI cables support 120Hz refresh rate for buttery-smooth gameplay",
        "Premium gaming headset delivers immersive 7.1 surround sound",
        "Dual controller charging dock keeps you always ready to play",
        "RGB lighting adds ambiance and style to your gaming station",
        "Compatible with PlayStation, Xbox, Nintendo Switch, and PC",
        "Professional-grade accessories used by top streamers and esports players",
      ]}
      includes={[
        "2x Premium 4K HDMI 2.1 cables (6ft, supports 120Hz)",
        "Wireless gaming headset with 7.1 surround sound",
        "Dual controller charging station with LED indicators",
        "RGB LED light strip (16.4ft) with remote control",
        "Gaming mouse pad (extended size, 31.5\" x 11.8\")",
        "Cable management kit for clean setup",
        "Controller thumb grips and protective case",
        "Microfiber cleaning cloth",
      ]}
    />
  );
}
