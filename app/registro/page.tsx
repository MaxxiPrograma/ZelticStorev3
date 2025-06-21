"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { supabase } from "@/lib/supabase/client"
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react"

export default function RegistroPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Función para validar email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validaciones del lado del cliente
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      setError("Todos los campos son obligatorios")
      return
    }

    if (!isValidEmail(email)) {
      setError("Por favor ingresa un email válido")
      return
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    try {
      setLoading(true)
      setError("Procesando registro...")

      // Esperar 9 segundos antes de intentar el registro
      await new Promise(resolve => setTimeout(resolve, 9000))

      // Registrar usuario en Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
          },
        },
      })

      if (signUpError) {
        console.error("Error de registro:", signUpError)

        // Manejar errores específicos
        if (signUpError.message.includes("invalid")) {
          setError("El formato del email no es válido. Intenta con otro email.")
        } else if (signUpError.message.includes("already registered")) {
          setError("Este email ya está registrado. Intenta iniciar sesión.")
        } else if (signUpError.message.includes("weak password")) {
          setError("La contraseña es muy débil. Usa al menos 6 caracteres.")
        } else {
          setError(`Error de registro: ${signUpError.message}`)
        }
        return
      }

      if (!authData.user) {
        setError("No se pudo crear el usuario. Intenta nuevamente.")
        return
      }

      // Crear perfil en la tabla profiles
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: authData.user.id,
            email: email.trim().toLowerCase(),
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            role: "customer",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()

      if (profileError) {
        console.error("Error creando perfil:", profileError)
        setError(`Error creando perfil: ${profileError.message}`)
        return
      }

      // Registro exitoso - redirigir directamente al login
      router.push("/login?message=Se ha enviado un correo de confirmación a tu email. Por favor, revisa tu bandeja de entrada y confirma tu cuenta para poder iniciar sesión.")
    } catch (err: any) {
      console.error("Error inesperado:", err)
      setError("Error inesperado. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-2xl">Crear una cuenta</CardTitle>
              <CardDescription>Regístrate para comprar y seguir tus pedidos</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6 bg-red-900/30 border-red-900">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-zinc-800 border-zinc-700"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-zinc-800 border-zinc-700"
                      placeholder="Tu apellido"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-zinc-800 border-zinc-700"
                    placeholder="tu@email.com"
                    required
                  />
                  <p className="text-xs text-zinc-400">Usa un email válido como ejemplo@gmail.com</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 pr-10"
                      placeholder="Mínimo 6 caracteres"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-zinc-800 border-zinc-700"
                    placeholder="Repite tu contraseña"
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registrando...
                    </>
                  ) : (
                    "Registrarse"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-zinc-800 pt-4">
              <p className="text-sm text-zinc-400">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-blue-400 hover:underline">
                  Iniciar Sesión
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
