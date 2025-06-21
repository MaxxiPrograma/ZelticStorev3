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
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  const addDebugInfo = (info: string) => {
    setDebugInfo((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${info}`])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setDebugInfo([])

    // Validaciones
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      setError("Todos los campos son obligatorios")
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
      addDebugInfo("Iniciando proceso de registro...")

      // Verificar conexión a Supabase
      addDebugInfo("Verificando conexión a Supabase...")
      try {
        const { data: healthCheck, error: healthError } = await supabase.from("profiles").select("count").limit(1)

        if (healthError) {
          addDebugInfo(`Error de conexión: ${healthError.message}`)
          throw new Error(`Error de conexión a Supabase: ${healthError.message}`)
        }
        addDebugInfo("Conexión a Supabase exitosa")
      } catch (connErr: any) {
        addDebugInfo(`Error verificando conexión: ${connErr.message}`)
        throw new Error(`Error verificando conexión: ${connErr.message || "Desconocido"}`)
      }

      // Verificar estructura de la tabla profiles
      addDebugInfo("Verificando estructura de tabla profiles...")
      try {
        const { data: tableInfo, error: tableError } = await supabase
          .rpc("get_table_columns", { table_name: "profiles" })
          .single()

        if (tableError) {
          addDebugInfo(`No se pudo verificar estructura: ${tableError.message}`)
        } else {
          addDebugInfo(`Estructura de tabla verificada`)
        }
      } catch (structErr: any) {
        addDebugInfo(`Error verificando estructura: ${structErr.message}`)
      }

      // Registrar usuario en Supabase Auth
      addDebugInfo("Registrando usuario en Auth...")
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })

      if (signUpError) {
        addDebugInfo(`Error de Auth: ${signUpError.message}`)
        throw new Error(`Error de autenticación: ${signUpError.message}`)
      }

      if (!authData.user) {
        addDebugInfo("No se recibió usuario después del registro")
        throw new Error("No se pudo crear el usuario")
      }

      addDebugInfo(`Usuario creado en Auth con ID: ${authData.user.id}`)

      // Intentar diferentes estructuras de perfil
      addDebugInfo("Creando perfil en tabla profiles...")

      // Opción 1: Estructura actual esperada
      let profileError: any = null
      try {
        const { error: err1 } = await supabase.from("profiles").insert([
          {
            id: authData.user.id,
            email: email,
            first_name: firstName,
            last_name: lastName,
            role: "customer",
          },
        ])
        profileError = err1
        if (!err1) {
          addDebugInfo("Perfil creado exitosamente con first_name/last_name")
        }
      } catch (insertErr: any) {
        profileError = insertErr
        addDebugInfo(`Error con first_name/last_name: ${insertErr.message}`)
      }

      // Opción 2: Si falla, intentar con nombre/apellido
      if (profileError) {
        addDebugInfo("Intentando con nombre/apellido...")
        try {
          const { error: err2 } = await supabase.from("profiles").insert([
            {
              id: authData.user.id,
              email: email,
              nombre: firstName,
              apellido: lastName,
              role: "customer",
            },
          ])
          profileError = err2
          if (!err2) {
            addDebugInfo("Perfil creado exitosamente con nombre/apellido")
          }
        } catch (insertErr2: any) {
          profileError = insertErr2
          addDebugInfo(`Error con nombre/apellido: ${insertErr2.message}`)
        }
      }

      // Opción 3: Si falla, intentar estructura mínima
      if (profileError) {
        addDebugInfo("Intentando estructura mínima...")
        try {
          const { error: err3 } = await supabase.from("profiles").insert([
            {
              id: authData.user.id,
              email: email,
              role: "customer",
            },
          ])
          profileError = err3
          if (!err3) {
            addDebugInfo("Perfil creado exitosamente con estructura mínima")
          }
        } catch (insertErr3: any) {
          profileError = insertErr3
          addDebugInfo(`Error con estructura mínima: ${insertErr3.message}`)
        }
      }

      if (profileError) {
        addDebugInfo(`Error final creando perfil: ${profileError.message}`)
        throw new Error(`Error creando perfil: ${profileError.message}`)
      }

      addDebugInfo("Registro completado exitosamente")
      // Redirigir al usuario
      router.push("/login?registered=true")
    } catch (err: any) {
      console.error("Error de registro:", err)
      addDebugInfo(`Error final: ${err.message}`)
      setError(err.message || "Error al registrar usuario")
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

              {debugInfo.length > 0 && (
                <Alert className="mb-6 bg-blue-900/30 border-blue-900">
                  <AlertDescription>
                    <div className="text-xs font-mono overflow-auto max-h-32 space-y-1">
                      {debugInfo.map((info, index) => (
                        <div key={index}>{info}</div>
                      ))}
                    </div>
                  </AlertDescription>
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
                    required
                  />
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
