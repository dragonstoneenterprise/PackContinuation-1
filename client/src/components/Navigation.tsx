import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/packages/home-office-power-kit", label: "Power Kit" },
    { href: "/packages/4k-gamer-pack", label: "Gamer Pack" },
    { href: "/packages/streaming-setup-pro", label: "Streaming Pro" },
    { href: "/packages/studio-clean-desk-bundle", label: "Desk Bundle" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home">
            <span className="text-xl font-bold tracking-tight hover-elevate px-2 py-1 rounded-md">
              HAVEN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <span
                  className={`text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                    location === link.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              data-testid="button-cart"
              className="hover-elevate"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden hover-elevate"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <span
                    className={`block px-4 py-3 text-sm font-medium rounded-md hover-elevate ${
                      location === link.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
