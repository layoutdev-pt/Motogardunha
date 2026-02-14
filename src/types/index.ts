// Motorcycle types
export interface Motorcycle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  condition: "new" | "used";
  mileage: number;
  engine_cc: number;
  horsepower?: number;
  torque?: string;
  color: string;
  type: "scooter" | "naked" | "sport" | "adventure" | "trail" | "offroad" | "cruiser" | "classic";
  description?: string;
  features?: string[];
  images: string[];
  cover_image: string;
  slug: string;
  status: "available" | "reserved" | "sold";
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

// Gear/Shop product types
export interface GearProduct {
  id: string;
  name: string;
  brand: string;
  category: "helmets" | "jackets" | "gloves" | "boots" | "accessories" | "parts" | "maintenance";
  subcategory?: string;
  description?: string;
  price: number;
  sale_price?: number;
  sku: string;
  sizes?: string[];
  colors?: string[];
  stock: number;
  images: string[];
  cover_image: string;
  slug: string;
  rating?: number;
  review_count?: number;
  is_featured: boolean;
  is_new: boolean;
  status: "in_stock" | "low_stock" | "out_of_stock";
  created_at: string;
  updated_at: string;
}

// Lead/Contact types
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

// Dashboard stats
export interface DashboardStats {
  total_revenue: number;
  revenue_change: number;
  active_listings: number;
  new_listings: number;
  new_leads: number;
  leads_today: number;
  monthly_goal_percent: number;
}

// Admin user
export interface AdminUser {
  id: string;
  username: string;
  role: "admin" | "manager";
}

// Filter types
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

// Navigation
export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}
