# SetupBox Store - E-commerce Product Bundle Platform

## Overview

SetupBox Store is a premium e-commerce platform specializing in curated tech product bundles. The application showcases product packages with Apple-inspired minimalist design, featuring hero sections, detailed product information, and seamless navigation. Built as a full-stack TypeScript application with React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast HMR and optimized production builds
- **Wouter** for lightweight client-side routing instead of React Router
- **TanStack Query (React Query)** for server state management, caching, and data fetching

**UI Component Strategy**
- **shadcn/ui** component library built on Radix UI primitives
- Components follow the "New York" style variant with custom Tailwind configuration
- All UI components are local and customizable (not npm dependencies)
- Design system inspired by Apple product pages with emphasis on premium minimalism

**Styling Approach**
- **Tailwind CSS** for utility-first styling with custom design tokens
- CSS variables for theme customization (light/dark mode support built-in)
- Custom color system with semantic naming (background, foreground, primary, secondary, etc.)
- Responsive design with mobile-first breakpoints

**State Management Pattern**
- Server state managed via TanStack Query with aggressive caching (staleTime: Infinity)
- Local UI state managed with React hooks
- No global state management library needed due to simple application requirements

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript for RESTful API endpoints
- Middleware for JSON parsing, logging, and error handling
- Custom request logging that captures response data and duration

**Development Setup**
- **Vite middleware mode** for development with HMR
- Production builds serve static files from Express
- Separate dev and production execution modes

**API Design**
- RESTful endpoints following resource-based URL patterns
- Validation using Zod schemas with friendly error messages via zod-validation-error
- Consistent JSON response format

### Data Storage

**In-Memory Storage (Current Implementation)**
- `MemStorage` class implements storage interface for development
- Pre-seeded with product package data
- Maps used for efficient lookups by ID and slug

**Database Schema (Drizzle ORM)**
- Schema defined using Drizzle ORM with PostgreSQL dialect
- Two main tables: `users` and `packages`
- UUID primary keys with database-generated defaults
- Array fields for features and includes lists
- Schema located in shared directory for type sharing between client and server

**Migration Strategy**
- Drizzle Kit configured for schema migrations
- Connection via Neon Database serverless driver
- Push-based schema synchronization for rapid development

### External Dependencies

**Database & ORM**
- **Neon Database** - Serverless PostgreSQL (configured but not currently active)
- **Drizzle ORM** - Type-safe database toolkit with Zod integration
- **connect-pg-simple** - PostgreSQL session store for Express sessions

**UI Component Libraries**
- **Radix UI** - Unstyled, accessible component primitives (20+ components)
- **Lucide React** - Icon library
- **embla-carousel-react** - Carousel/slider functionality
- **cmdk** - Command palette component
- **vaul** - Drawer component library

**Validation & Type Safety**
- **Zod** - Runtime type validation and schema definition
- **drizzle-zod** - Automatic Zod schema generation from Drizzle schemas
- **@hookform/resolvers** - Form validation integration

**Styling Utilities**
- **class-variance-authority** - Type-safe variant handling for components
- **clsx** & **tailwind-merge** - Conditional className utilities
- **date-fns** - Date manipulation and formatting

**Development Tools**
- **Replit plugins** - Error overlay, cartographer, and dev banner for Replit environment
- **TypeScript** - Full type safety across client and server
- **esbuild** - Fast production bundling for server code

**Asset Management**
- Product images stored in `attached_assets/generated_images/` directory
- Static asset resolution via Vite aliases (@assets)
- Image imports handled at build time for optimization