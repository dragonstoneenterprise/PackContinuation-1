import { ProductPage } from "./ProductPage";
import heroImage from "@assets/generated_images/Streaming_Setup_Pro_3fb52712.png";

export default function StreamingSetupPro() {
  return (
    <ProductPage
      name="Streaming Setup Pro"
      tagline="Professional streaming gear for creators."
      description="Launch your content creation career or take it to the next level with our professional streaming bundle. Designed by creators for creators, this complete kit delivers broadcast-quality video and audio that will make your streams stand out from the competition."
      price={99}
      originalPrice={145}
      heroImage={heroImage}
      category="Content Creation"
      features={[
        "1080p 60fps webcam with auto-focus ensures you always look sharp",
        "Studio-quality USB microphone captures crystal-clear audio",
        "Adjustable ring light provides perfect lighting in any environment",
        "Green screen enables professional background effects",
        "Plug-and-play setup works with all major streaming platforms",
        "Professional tools used by successful streamers and YouTubers",
      ]}
      includes={[
        "1080p HD webcam with auto-focus and low-light correction",
        "USB condenser microphone with cardioid pattern",
        "Adjustable microphone boom arm with cable management",
        "Pop filter and foam windscreen",
        "10\" LED ring light with tripod stand",
        "Collapsible green screen backdrop (5ft x 7ft)",
        "Backdrop stand and clips",
        "USB extension cable and shock mount",
      ]}
    />
  );
}
