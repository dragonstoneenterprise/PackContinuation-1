import { type User, type InsertUser, type Package, type InsertPackage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllPackages(): Promise<Package[]>;
  getPackageBySlug(slug: string): Promise<Package | undefined>;
  getPackageById(id: string): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private packages: Map<string, Package>;

  constructor() {
    this.users = new Map();
    this.packages = new Map();
    this.seedPackages();
  }

  private seedPackages() {
    const initialPackages: InsertPackage[] = [
      {
        slug: "home-office-power-kit",
        name: "Home Office Power Kit",
        tagline: "The world's most efficient remote work power solution.",
        description: "Transform your home office with our comprehensive power management bundle. Designed for professionals who demand reliability, organization, and efficiency in their workspace.",
        price: 79,
        originalPrice: 118,
        heroImage: "/assets/home-office-power-kit.png",
        category: "Home Office",
        features: [
          "Premium surge protection keeps your devices safe",
          "USB-C and USB-A ports for fast charging",
          "Cable management system eliminates desktop clutter",
          "Compact design maximizes desk space",
          "Energy-efficient power distribution",
          "Perfect for remote workers and professionals",
        ],
        includes: [
          "6-outlet surge protector power strip with 900J protection",
          "2x USB-C fast charging ports (20W each)",
          "3x USB-A charging ports (12W each)",
          "Premium braided power cable (6ft)",
          "Cable management clips and organizers",
          "Adhesive cable holders and ties",
          "20,000mAh portable power bank",
          "Multi-device charging cables kit",
        ],
      },
      {
        slug: "4k-gamer-pack",
        name: "4K Gamer Pack",
        tagline: "Ultimate gaming experience for console & PC.",
        description: "Elevate your gaming setup to professional levels with our complete 4K gaming bundle. Perfect for streaming, competing, or marathon gaming sessions.",
        price: 89,
        originalPrice: 135,
        heroImage: "/assets/4k-gamer-pack.png",
        category: "Gaming",
        features: [
          "4K HDMI cables support 120Hz refresh rate",
          "Premium gaming headset with 7.1 surround sound",
          "Dual controller charging dock",
          "RGB lighting adds ambiance to your setup",
          "Compatible with PlayStation, Xbox, Switch, and PC",
          "Professional-grade accessories for gamers",
        ],
        includes: [
          "2x Premium 4K HDMI 2.1 cables (6ft, 120Hz support)",
          "Wireless gaming headset with 7.1 surround sound",
          "Dual controller charging station with LED indicators",
          "RGB LED light strip (16.4ft) with remote",
          "Gaming mouse pad (extended size, 31.5\" x 11.8\")",
          "Cable management kit",
          "Controller thumb grips and protective case",
          "Microfiber cleaning cloth",
        ],
      },
      {
        slug: "streaming-setup-pro",
        name: "Streaming Setup Pro",
        tagline: "Professional streaming gear for creators.",
        description: "Launch or elevate your content creation career with our professional streaming bundle. Designed by creators for creators with broadcast-quality gear.",
        price: 99,
        originalPrice: 145,
        heroImage: "/assets/streaming-setup-pro.png",
        category: "Content Creation",
        features: [
          "1080p 60fps webcam with auto-focus",
          "Studio-quality USB microphone",
          "Adjustable ring light for perfect lighting",
          "Green screen for professional backgrounds",
          "Plug-and-play with all streaming platforms",
          "Tools used by successful streamers",
        ],
        includes: [
          "1080p HD webcam with auto-focus",
          "USB condenser microphone with cardioid pattern",
          "Adjustable microphone boom arm",
          "Pop filter and foam windscreen",
          "10\" LED ring light with tripod stand",
          "Collapsible green screen backdrop (5ft x 7ft)",
          "Backdrop stand and clips",
          "USB extension cable and shock mount",
        ],
      },
      {
        slug: "studio-clean-desk-bundle",
        name: "Studio Clean Desk Bundle",
        tagline: "Minimalist organization for focused minds.",
        description: "Create your perfect minimalist workspace with our Scandinavian-inspired desk organization bundle. Promote focus, creativity, and productivity.",
        price: 69,
        originalPrice: 98,
        heroImage: "/assets/studio-clean-desk-bundle.png",
        category: "Organization",
        features: [
          "Minimalist design for any workspace",
          "Premium natural wood and aluminum materials",
          "Modular system adapts to your needs",
          "Wireless charging eliminates cable clutter",
          "Eco-friendly and sustainable",
          "Perfect for minimalists and creatives",
        ],
        includes: [
          "Premium desk organizer set",
          "Wireless charging pad (10W fast charging)",
          "Minimalist desk mat (vegan leather, 31.5\" x 15.75\")",
          "Cable management box and clips",
          "Modern desk plant with ceramic pot",
          "Bamboo monitor stand with storage",
          "Microfiber desk cleaning kit",
          "Drawer organizer inserts",
        ],
      },
    ];

    initialPackages.forEach((pkg) => {
      const id = randomUUID();
      const fullPackage: Package = { 
        ...pkg, 
        id,
        originalPrice: pkg.originalPrice ?? null
      };
      this.packages.set(id, fullPackage);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllPackages(): Promise<Package[]> {
    return Array.from(this.packages.values());
  }

  async getPackageBySlug(slug: string): Promise<Package | undefined> {
    return Array.from(this.packages.values()).find((pkg) => pkg.slug === slug);
  }

  async getPackageById(id: string): Promise<Package | undefined> {
    return this.packages.get(id);
  }

  async createPackage(insertPackage: InsertPackage): Promise<Package> {
    const id = randomUUID();
    const pkg: Package = { 
      ...insertPackage, 
      id,
      originalPrice: insertPackage.originalPrice ?? null
    };
    this.packages.set(id, pkg);
    return pkg;
  }
}

export const storage = new MemStorage();
