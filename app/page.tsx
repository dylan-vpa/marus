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
    const countDownDate = new Date("Nov 10, 2024 00:00:00").getTime()

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
    <div className="flex flex-col items-center min-h-screen bg-pink-50">
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
          <h2 className="text-4xl font-serif">Mis XV</h2>
          <p className="text-2xl font-light">10 de Noviembre 2024 - 7:00 PM</p>
        </div>
      </div>

      {/* Countdown Section */}
      <section className="py-12 w-full bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-pink-600 mb-8">Cuenta Regresiva</h2>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800">{days}</div>
              <div className="text-gray-600">Días</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800">{hours}</div>
              <div className="text-gray-600">Horas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800">{minutes}</div>
              <div className="text-gray-600">Minutos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800">{seconds}</div>
              <div className="text-gray-600">Segundos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section className="py-16 px-4 w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif text-pink-600 text-center mb-8">Canción de la Fiesta</h2>
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
        <div className="grid md:grid-cols-1 gap-8">
          <Card className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80"
                alt="Fiesta venue"
                width={300}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-serif text-gray-800 mb-2">La Fiesta</h3>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>7:00 PM</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600 mt-2">
                <MapPin className="w-4 h-4" />
                <span>Howard Johnson by Wyndham Barranquilla Versalles</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif text-pink-600 text-center mb-8">Galería</h2>
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
        <h2 className="text-3xl font-serif text-pink-600 text-center mb-8">Lluvia de Sobres</h2>
        <Card>
          <CardContent className="p-6 text-center">
            <Gift className="w-12 h-12 text-pink-600 mx-auto mb-4" />
            <p className="text-gray-800 mb-4">
              Tu presencia es el mejor regalo. Sin embargo, si deseas obsequiar algo, apreciamos tu contribución en efectivo.
            </p>
            <p className="text-gray-600">
              Habrá un buzón especial en la recepción para tu sobre.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* RSVP Section */}
      <section className="py-16 px-4 w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif text-pink-600 text-center mb-8">Confirma tu Asistencia</h2>
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
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
              />
              <Textarea
                placeholder="Mensaje (opcional)"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
              <Button
                className="w-full bg-pink-600 hover:bg-pink-700"
                type="submit"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Confirmar Asistencia"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Map Section */}
      <section className="w-full max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-serif text-pink-600 text-center mb-8">Ubicación</h2>
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
      <footer className="py-8 text-center text-gray-600">
        <div className="flex justify-center items-center gap-2">
          <Heart className="w-4 h-4 text-pink-600" />
          <span>Quinceañera de Mariana Hernandez 2024</span>
          <Heart className="w-4 h-4 text-pink-600" />
        </div>
      </footer>
    </div>
  )
}