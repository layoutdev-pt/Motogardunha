"use client";

import { Store, Phone, Mail, Navigation, ArrowRight, MapPin } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { useState, useEffect } from "react";

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

export default function ContactSection() {
  const [travelTime, setTravelTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const distanceKm = calculateDistance(
            userLat,
            userLng,
            CONTACT.coordinates.lat,
            CONTACT.coordinates.lng
          );

          // Calculate estimated driving time
          // Average speed: 50 km/h for urban/mixed roads, 80 km/h for highways
          // Using 60 km/h as a balanced average for Portugal roads
          const averageSpeedKmH = 60;
          const timeHours = distanceKm / averageSpeedKmH;
          const timeMinutes = Math.round(timeHours * 60);

          if (timeMinutes < 1) {
            setTravelTime("menos de 1 minuto");
          } else if (timeMinutes === 1) {
            setTravelTime("1 minuto");
          } else if (timeMinutes < 60) {
            setTravelTime(`${timeMinutes} minutos`);
          } else {
            const hours = Math.floor(timeMinutes / 60);
            const mins = timeMinutes % 60;
            if (mins === 0) {
              setTravelTime(`${hours} ${hours === 1 ? "hora" : "horas"}`);
            } else {
              setTravelTime(`${hours}h ${mins}min`);
            }
          }
          setLoading(false);
        },
        () => {
          setError(true);
          setLoading(false);
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 300000, // Cache for 5 minutes
        }
      );
    } else {
      setError(true);
      setLoading(false);
    }
  }, []);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row h-auto lg:h-[500px]">
          {/* Left: Contact info */}
          <div className="lg:w-1/3 p-10 flex flex-col justify-between bg-secondary text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-20 bg-primary opacity-10 rounded-full filter blur-3xl transform translate-x-10 -translate-y-10" />

            <div className="relative z-10">
              <h2 className="text-3xl font-display font-bold mb-2">
                Venha visitar-nos!
              </h2>
              <p className="text-gray-400 text-sm mb-8">
                Venha Ver e Experimentar a Sua Nova Moto
              </p>

              <div className="space-y-6">
                {/* Address */}
                <div className="glass-panel p-4 rounded-lg flex items-start space-x-4">
                  <Store className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Motogardunha</h4>
                    <p className="text-gray-400 text-xs mt-1">
                      Rua I Zona Industrial do Fundão
                      <br />
                      lote 135, 6230-483 Fundão
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="bg-primary hover:bg-primary-dark transition-colors p-4 rounded-lg flex items-center justify-between cursor-pointer group block"
                >
                  <div className="flex items-center space-x-4">
                    <Phone className="w-5 h-5 text-white" />
                    <span className="font-bold text-lg">{CONTACT.phone}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Email */}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="glass-panel p-4 rounded-lg flex items-center space-x-4 hover:bg-white/10 transition-colors cursor-pointer block"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-sm">{CONTACT.email}</span>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center text-xs text-gray-500">
              <span>{CONTACT.hours.weekdays}</span>
              <span>{CONTACT.hours.saturday}</span>
            </div>
          </div>

          {/* Right: Map */}
          <div className="lg:w-2/3 relative bg-gray-200 min-h-[300px] lg:min-h-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3063.5!2d-7.5!3d40.14!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDA4JzI0LjAiTiA3wrAzMCcwMC4wIlc!5e0!3m2!1spt-PT!2spt!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 300 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Motogardunha"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute bottom-8 right-8 bg-white p-4 rounded-xl shadow-lg max-w-xs hidden sm:block">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                  {loading ? (
                    <MapPin className="w-5 h-5 animate-pulse" />
                  ) : (
                    <Navigation className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tempo de Viagem</p>
                  <p className="font-bold text-foreground">
                    {loading
                      ? "A calcular..."
                      : error
                      ? "A 5 min do Centro"
                      : `Está a ${travelTime}`}
                  </p>
                </div>
              </div>
              <a
                href={CONTACT.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gray-100 hover:bg-gray-200 text-foreground text-xs font-bold py-2 rounded transition-colors block text-center"
              >
                Obter Direções
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
