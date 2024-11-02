"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MapPin, Gift, Calendar, Clock, Music } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

const DecorativeSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative p-8 ${className}`}>
    <div className="absolute inset-0 bg-[#f9f3e8] rounded-lg">
      <div className="absolute inset-0 border-2 border-[#d4b995] rounded-lg m-4">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#f9f3e8] px-4 -rotate-90">
          <Image
            src="/flower-corner.png"
            alt="Decorative flower"
            width={80}
            height={80}
            className="opacity-80"
          />
        </div>
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-[#f9f3e8] px-4 rotate-90">
          <Image
            src="/flower-corner.png"
            alt="Decorative flower"
            width={80}
            height={80}
            className="opacity-80"
          />
        </div>
      </div>
    </div>
    <div className="relative z-10">
      {children}
    </div>
  </div>
)

export default function Component() {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: 1,
    message: ""
  })

  useEffect(() => {
    const countDownDate = new Date("Nov 10, 2024 20:00:00").getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = countDownDate - now

      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)))
      setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000))
    }

    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('rsvp')
        .insert([formData])

      if (error) throw error

      toast({
        title: "¡Confirmación exitosa!",
        description: "Gracias por confirmar tu asistencia.",
      })

      setFormData({
        name: "",
        email: "",
        guests: 1,
        message: ""
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al confirmar tu asistencia. Por favor intenta nuevamente.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#f9f3e8]">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] flex items-center justify-center">
        <Image
          src="/3.jpeg"
          alt="Forest background"
          className="absolute inset-0 object-cover w-full h-full brightness-50"
          width={1200}
          height={800}
          priority
        />
        <div className="relative text-center text-white space-y-4">
          <h1 className="text-5xl font-serif">Mariana Hernandez</h1>
        </div>
      </div>

      {/* Quote Section */}
      <section className="py-16 px-4 w-full max-w-4xl mx-auto">
        <DecorativeSection>
          <p className="text-center text-[#8b7355] font-serif text-lg italic">
            "Hay eventos en la vida que son muy especiales por si solos, pero poder compartirlos con quienes más quiero, los convierte en momentos únicos e inolvidables."
          </p>
          <p className="text-center text-[#8b7355] font-serif mt-4">
            ¡Te esperamos en mi fiesta!
          </p>
        </DecorativeSection>
      </section>

      {/* Countdown Section */}
      <section className="py-12 w-full">
        <div className="max-w-4xl mx-auto px-4">
          <DecorativeSection>
            <h2 className="text-3xl font-serif text-[#8b7355] text-center mb-8">Cuenta Regresiva</h2>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#8b7355]">{days}</div>
                <div className="text-[#a69081]">Días</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#8b7355]">{hours}</div>
                <div className="text-[#a69081]">Horas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#8b7355]">{minutes}</div>
                <div className="text-[#a69081]">Minutos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#8b7355]">{seconds}</div>
                <div className="text-[#a69081]">Segundos</div>
              </div>
            </div>
            <div className="mt-2 text-center font-bold text-[#8b7355]">10 de Nov - 8:00</div>
          </DecorativeSection>
        </div>
      </section>

      {/* Music Section */}
      <section className="py-16 px-4 w-full max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-[#8b7355] text-center mb-8">Mi canción favorita</h2>
          <div className="w-full max-w-xl mx-auto">
            <iframe
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/track/4U45aEWtQhrm8A5mxPaFZ7?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
      </section>

      {/* Events Section */}
      <section className="py-16 px-4 w-full max-w-4xl mx-auto">
        <DecorativeSection>
          <h2 className="text-3xl font-serif text-[#8b7355] text-center mb-8">¿Cuándo & Dónde?</h2>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80"
              alt="Fiesta venue"
              width={800}
              height={400}
              className="object-cover w-full h-48 rounded-lg"
            />
            <div className="mt-6 text-center">
              <h3 className="text-xl font-serif text-[#8b7355] mb-2">La Fiesta</h3>
              <div className="flex items-center justify-center gap-2 text-[#a69081]">
                <Clock className="w-4 h-4" />
                <span>8:00 PM</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-[#a69081] mt-2">
                <MapPin className="w-4 h-4" />
                <span>Howard Johnson by Wyndham Barranquilla Versalles - Salón Apolo</span>
                <span>Cra. 48 #70-188</span>
              </div>
            </div>
          </div>
        </DecorativeSection>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 w-full max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-[#8b7355] text-center mb-8">Galería</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "/1.jpeg",
              "/2.jpeg",
              "/4.jpeg",
            ].map((src, i) => (
              <div key={i} className="aspect-square relative overflow-hidden rounded-lg">
                <Image
                  src={src}
                  alt={`Gallery image ${i + 1}`}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
      </section>

      {/* Lluvia de Sobres Section */}
      <section className="py-16 px-4 w-full max-w-4xl mx-auto">
        <DecorativeSection>
          <h2 className="text-3xl font-serif text-[#8b7355] text-center mb-8">Regalos</h2>
          <div className="text-center">
            <Gift className="w-12 h-12 text-[#8b7355] mx-auto mb-4" />
            <p className="text-[#8b7355] mb-4">
              ¡Gracias por formar parte de este día!
            </p>
            <p className="text-[#a69081] italic">
              "La lluvia de sobres"
            </p>
            <p className="text-[#a69081] mt-4">
              Habrá un buzón especial en el salón Apolo para tu sobre.
            </p>
          </div>
        </DecorativeSection>
      </section>

      {/* RSVP Section */}
      <section className="py-16 px-4 w-full max-w-4xl mx-auto">
        <DecorativeSection>
          <h2 className="text-3xl font-serif text-[#8b7355] text-center mb-8">Confirma tu Asistencia</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Nombre"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-[#d4c5b9] focus:border-[#8b7355] focus:ring-[#8b7355]"
              />
              <Input
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-[#d4c5b9] focus:border-[#8b7355] focus:ring-[#8b7355]"
              />
            </div>
            <Input
              placeholder="Número de invitados"
              type="number"
              min="1"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="border-[#d4c5b9] focus:border-[#8b7355] focus:ring-[#8b7355]"
            />
            <Textarea
              placeholder="Mensaje (opcional)"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="border-[#d4c5b9] focus:border-[#8b7355] focus:ring-[#8b7355]"
            />
            <Button
              className="w-full bg-[#8b7355] hover:bg-[#a69081] transition-colors"
              type="submit"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Confirmar Asistencia"}
            </Button>
          </form>
        </DecorativeSection>
      </section>

      {/* Map Section */}
      <section className="w-full max-w-4xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-serif text-[#8b7355] text-center mb-8">Ubicación</h2>
          <div className="w-full h-[400px] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5598575983!2d-74.80625692584405!3d10.995679855344416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d736051fdcb%3A0x2597cd02ef4220b5!2sHoward%20Johnson%20by%20Wyndham%20Barranquilla%20Versalles!5e0!3m2!1sen!2sus!4v1698795607605!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-[#8b7355]">
        <div className="flex justify-center items-center gap-2">
          <Heart className="w-4 h-4 text-[#8b7355]" />
          <span>Quinceañera de Mariana Hernandez 2024</span>
          <Heart className="w-4 h-4 text-[#8b7355]" />
        </div>
      </footer>
    </div>
  )
}