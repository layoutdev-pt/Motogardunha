// src/types/index.ts
// --- MOTORCYCLE TYPES ---
export interface Motorcycle {
  id: string;
  name: string; 
  year: number;
  logo_url?: string;
  brand: string;
  price: number;
  mileage: number;
  gearbox_type?: string;
  segment?: string;
  horsepower?: string;
  engine_cc: number;
  engine?: string;
  transmission_type?: string;
  fuel_type?: string;
  max_torque?: string;
  avg_consumption?: string;
  tank_capacity?: string;
  seats?: number;
  primary_color?: string;
  secondary_color?: string;
  description_title?: string;
  description?: string;
  images: string[];
  cover_image: string;
  slug: string;
  status: "available" | "reserved" | "sold";
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  
  // Campo opcional para os teus JSONs locais
  rich_content?: RichContent;
}

// --- RICH CONTENT STRUCTURE (Para os teus JSONs) ---

export interface RichContent {
  hero?: {
    video_url?: string;
    tagline: string;
    custom_image?: string;
  };
  colors?: Array<{
    name: string;
    hex: string;
    image: string;
  }>;
  highlights: Array<{
    label: string;
    value: string;
    icon: string; // Ex: "battery", "zap", "gauge", "settings"
  }>;
  sections: RichSection[];
  technical_data: TechCategory[];
}

export interface RichSection {
  id: string;
  type: "text_image" | "grid_features" | "hotspots" | "gallery" | "video_full" | "feature_tabs";
  title?: string;
  description?: string;
  image?: string;
  reversed?: boolean; // Alternar lado da imagem
  items?: any[];      // Usado para Hotspots, Grids ou Tabs
}
export interface TechCategory {
  category: string;
  title: string;
  items: Record<string, string>;
}

export interface GearProduct {
  id: string;
  title: string;
  description?: string;
  product_type?: string;
  category: string;
  price: number;
  compare_price?: number;
  is_featured: boolean;
  images: string[];
  cover_image: string;
  slug: string;
  status: "active" | "draft" | "archived";
  created_at: string;
  updated_at: string;
}
export interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  interested_model?: string;
  source: "website" | "referral" | "social_media" | "walk_in" | "direct_mail";
  status: "new_lead" | "contacted" | "negotiation" | "test_ride" | "sold" | "lost";
  lead_score?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total_revenue: number;
  revenue_change: number;
  active_listings: number;
  new_listings: number;
  new_leads: number;
  leads_today: number;
  monthly_goal_percent: number;
}

export interface AdminUser {
  id: string;
  username: string;
  role: "admin" | "manager";
}

export interface MotorcycleFilters {
  brands?: string[];
  type?: string;
  priceMin?: number;
  priceMax?: number;
  engineMin?: number;
  engineMax?: number;
  condition?: "new" | "used" | "all";
  sortBy?: "newest" | "price_asc" | "price_desc" | "year_desc";
}

export interface GearFilters {
  category?: string;
  brands?: string[];
  priceMin?: number;
  priceMax?: number;
  sizes?: string[];
  sortBy?: "newest" | "price_asc" | "price_desc" | "rating";
}

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}