import type { NavItem } from "@/types";

export const SITE_NAME = "Motogardunha";
export const SITE_DESCRIPTION =
  "Stand de motos e equipamento em Fundão, Covilhã, Castelo Branco. Venda, restauro e manutenção de motociclos.";

export const CONTACT = {
  phone: "+351 963 948 336",
  email: "moto.gardunha@sapo.pt",
  address: "Rua I Zona Industrial do Fundão, lote 135, 6230-483 Fundão",
  city: "Fundão",
  region: "Castelo Branco",
  country: "Portugal",
  hours: {
    weekdays: "Seg - Sex: 9:00 - 19:15",
    saturday: "Sábado: 9:30 - 13:00",
    sunday: "Domingo: Encerrado",
  },
  social: {
    facebook: "https://facebook.com/motogardunha",
    instagram: "https://instagram.com/motogardunha",
  },
  maps: "https://maps.google.com/?q=Zona+Industrial+do+Fundão+lote+135",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Stand", href: "/stand" },
  { label: "Loja", href: "/loja" },
  { label: "Serviços", href: "/servicos" },
  { label: "Contactos", href: "/contactos" },
];

export const BRANDS = [
  "Aprilia",
  "Honda",
  "Kawasaki",
  "Moto Guzzi",
  "Piaggio",
  "Segway",
  "Vespa",
  "Voge",
  "Yamaha",
  "Zontes",
];

export const MOTORCYCLE_TYPES = [
  { value: "all", label: "Todos" },
  { value: "scooter", label: "Scooters" },
  { value: "naked", label: "Naked" },
  { value: "sport", label: "Desportivas" },
  { value: "adventure", label: "Adventure" },
  { value: "trail", label: "Trail" },
  { value: "offroad", label: "Off-Road" },
  { value: "cruiser", label: "Cruiser" },
  { value: "classic", label: "Clássicas" },
];

export const GEAR_CATEGORIES = [
  { value: "all", label: "Todo o Equipamento", icon: "Shield" },
  { value: "helmets", label: "Capacetes", icon: "HardHat" },
  { value: "jackets", label: "Casacos", icon: "Shirt" },
  { value: "gloves", label: "Luvas", icon: "Hand" },
  { value: "boots", label: "Botas", icon: "Footprints" },
  { value: "accessories", label: "Acessórios", icon: "Wrench" },
  { value: "parts", label: "Peças", icon: "Cog" },
];
