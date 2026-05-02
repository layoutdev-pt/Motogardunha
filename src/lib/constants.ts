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
  coordinates: {
    lat: 40.1770511,
    lng: -7.4906962,
  },
  hours: {
    weekdays: "Seg - Sex: 9:00 - 19:15",
    saturday: "Sábado: 9:30 - 13:00",
    sunday: "Domingo: Encerrado",
  },
  social: {
    facebook: "https://facebook.com/motogardunha",
    instagram: "https://instagram.com/motogardunha",
  },
  maps: "https://www.google.com/maps/place/Motogardunha-Veiculos+Motorizados+E+Representa%C3%A7%C3%B5es,+Lda./@40.1771853,-7.4906929,232m/data=!3m1!1e3!4m6!3m5!1s0xd3d3ea266b68ef1:0x8338d1da153e560d!8m2!3d40.1770511!4d-7.4906962!16s%2Fg%2F1tgxkbqv?entry=ttu&g_ep=EgoyMDI2MDIyMy4wIKXMDSoASAFQAw%3D%3D",
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
  "Kymco",
  "Linhai",
  "Morbidelli",
  "Kawasaki",
  "Moto Guzzi",
  "Piaggio",
  "Polaris",
  "Sherco",
  "Segway",
  "Vespa",
  "Zontes",
  "TM Moto",
];

export const MOTORCYCLE_SEGMENTS = ["Scooters", "Naked", "Desportivas", "Trail", "Off-Road"] as const;

export const MOTORCYCLE_TYPES = [
  { value: "all", label: "Todos" },
  { value: "Scooters", label: "Scooters" },
  { value: "Naked", label: "Naked" },
  { value: "Desportivas", label: "Desportivas" },
  { value: "Trail", label: "Trail" },
  { value: "Off-Road", label: "Off-Road" },
];

export const GEAR_BRANDS = [
  "SHOEI",
  "BELL",
  "FOX RACING",
  "100%",
  "RST",
  "RSW",
  "TUCANO URBANO",
  "Kriega",
  "MT HELMETS",
  "SENA",
  "SPRINT",
  "FORMA",
  "CABERG",
  "BERING",
];

export const GEAR_CATEGORIES = [
  { value: "all", label: "Todo o Equipamento", icon: "Shield" },
  { value: "helmets", label: "Capacetes", icon: "HardHat" },
  { value: "jackets", label: "Casacos", icon: "Shirt" },
  { value: "gloves", label: "Luvas", icon: "Hand" },
  { value: "boots", label: "Botas", icon: "Footprints" },
  { value: "accessories", label: "Acessórios", icon: "Wrench" },
];
