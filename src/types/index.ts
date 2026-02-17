// Motorcycle types
export interface Motorcycle {
  id: string;
  name: string; // Marca e Modelo (Nome)
  year: number; // Ano de Fabrico
  logo_url?: string; // Logótipo
  brand: string; // Marca
  price: number; // Preço
  mileage: number; // KMs
  gearbox_type?: string; // Tipo de Caixa
  segment?: string; // Segmento
  horsepower?: string; // Potência
  engine_cc: number; // Cilindrada
  engine?: string; // Motor
  transmission_type?: string; // Tipo de Transmissão
  fuel_type?: string; // Tipo de Combustível
  max_torque?: string; // Binário Máximo
  avg_consumption?: string; // Consumo Médio
  tank_capacity?: string; // Capacidade do Depósito
  seats?: number; // Lugares
  primary_color?: string; // Cor Principal
  secondary_color?: string; // Cor Secundária
  description_title?: string; // Título da Descrição
  description?: string; // Descrição
  images: string[]; // Imagens
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
  title: string; // Título
  description?: string; // Descrição
  product_type?: string; // Tipo de Produto
  category: string; // Categoria
  price: number; // Preço
  compare_price?: number; // Preço de Comparação
  is_featured: boolean; // Destaque
  images: string[]; // Imagens
  cover_image: string;
  slug: string;
  status: "active" | "draft" | "archived";
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
