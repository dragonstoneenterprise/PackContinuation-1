# Design Guidelines: Apple-Inspired Product Package Pages

## Design Approach: Reference-Based (Apple Product Pages)

**Primary Reference:** Apple AirPods Pro 3 and iPhone product pages
**Design Philosophy:** Premium minimalism with hero-focused product presentation, generous whitespace, and clear information hierarchy.

## Typography System

**Font Family:** SF Pro Display (primary), Inter or Helvetica Neue (fallback)

**Hierarchy:**
- Hero Title: text-5xl md:text-6xl lg:text-7xl, font-bold, tracking-tight
- Product Tagline: text-xl md:text-2xl lg:text-3xl, font-normal, tracking-wide
- Section Headers: text-3xl md:text-4xl, font-semibold
- Body Text: text-base md:text-lg, font-normal, leading-relaxed
- Pricing: text-4xl md:text-5xl, font-bold
- Product Details: text-sm md:text-base, font-medium
- CTA Buttons: text-base md:text-lg, font-semibold

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 8, 12, 16, 20, 24, 32
- Section padding: py-16 md:py-24 lg:py-32
- Component spacing: space-y-8 to space-y-12
- Container max-width: max-w-7xl with px-4 md:px-8 lg:px-12

**Grid System:**
- Hero Section: Single column, centered content
- Package Contents: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 with gap-8
- Feature Highlights: grid-cols-1 md:grid-cols-2 with gap-12

## Page Structure

### Hero Section (Full Viewport - 90vh to 100vh)
- Centered product title and tagline
- Large, high-quality product image (60-70% of viewport height)
- Dual CTA buttons positioned below product image
- Minimalist background treatment
- No busy patterns or distracting elements

### Product Information Section
- Package name and comprehensive description
- Pricing display with optional savings indicator
- "What's Included" component listing all bundle items
- Each item with icon/thumbnail, name, and brief description

### Visual Showcase Section
- Large product lifestyle images showing bundle in use
- Alternating image-text layouts (left-right, right-left)
- Each showcase highlighting a key benefit
- Images should be full-width on mobile, 50% on desktop

### Specifications Section
- Clean table or grid displaying technical details
- Package dimensions, compatibility, warranty info
- Organized in easily scannable format

### Final CTA Section
- Reinforced purchase call-to-action
- Price reminder
- Trust indicators (free shipping, returns, warranty)
- Secondary button for customer support/questions

## Component Library

### Navigation
- Fixed header with transparent background on scroll-top
- Becomes solid with subtle shadow on scroll
- Logo left-aligned, navigation center, cart/account right
- Mobile: Hamburger menu with slide-in drawer

### Buttons
**Primary CTA:** 
- Large button (px-8 py-4), fully rounded (rounded-full)
- When on images: backdrop-blur-md with semi-transparent background
- No custom hover states needed (Button component handles this)

**Secondary CTA:**
- Outlined style with border-2
- Same dimensions as primary
- Placed adjacent to primary (flex gap-4)

### Product Cards (for bundle item listings)
- Aspect ratio 1:1 for product images
- Product name below image
- Brief description (2 lines max)
- Minimal borders, relies on spacing for separation

### Image Treatments
- High-resolution product photography on clean backgrounds
- Lifestyle shots showing products in realistic settings
- Maintain consistent aspect ratios within sections
- Use object-cover for responsive image handling

## Images Strategy

**Hero Image:** 
- Large, centered product shot on clean background
- PNG format with transparency if possible
- Minimum 1920x1080 resolution
- Shows complete bundle or hero product from bundle

**Lifestyle Images:**
- 3-4 contextual shots showing bundle in use
- Home office setup, gaming station, streaming setup, etc.
- Placed in Visual Showcase Section
- Minimum 1200x800 resolution

**Individual Product Images:**
- Thumbnail-sized (300x300) for "What's Included" section
- Clean background, consistent styling
- Shows individual items from bundle

**Background Treatments:**
- Subtle gradients or solid colors for hero
- Never compete with product imagery
- Use of negative space to emphasize products

## Animations & Interactions

**Scroll Behavior:**
- Smooth fade-in for sections as they enter viewport
- Parallax effect on hero image (subtle, 10-20% slower scroll)
- Product images scale slightly on hover (scale-105)

**Button Interactions:**
- Handled by Button component
- No custom implementations needed

**Image Loading:**
- Skeleton loaders for progressive image loading
- Blur-up technique for hero images

## Accessibility & Responsive Design

**Viewport Breakpoints:**
- Mobile: < 768px (single column, stacked layout)
- Tablet: 768px - 1024px (2 columns where appropriate)
- Desktop: > 1024px (full multi-column layouts)

**Typography Scaling:**
- All text uses responsive classes (text-base md:text-lg lg:text-xl pattern)
- Maintain readability across all devices

**Touch Targets:**
- Minimum 44px height for all interactive elements
- Adequate spacing between clickable items on mobile

## Page-Specific Requirements

Each package page follows identical structure with customized content:
- **Home Office Power Kit:** Professional, productivity-focused imagery
- **4K Gamer Pack:** Dynamic, colorful gaming setup visuals  
- **Streaming Setup Pro:** Creator-focused, studio-quality presentation
- **Studio Clean Desk Bundle:** Minimalist, organized workspace aesthetic

**Consistency Rules:**
- Same section order across all package pages
- Identical button placement and sizing
- Consistent spacing and typography treatment
- Only content and images differ between pages