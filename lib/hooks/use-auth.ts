"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { supabase } from "../supabase/client"
import { useAuthStore } from "../store"

export function useAuth() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setUser, clearUser } = useAuthStore()

  // Verificar sesión al cargar
  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          // Obtener el perfil del usuario para verificar el rol
          const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

          if (profile) {
            setUser({
              id: session.user.id,
              email: profile.email,
              role: profile.role,
              firstName: profile.first_name || "",
              lastName: profile.last_name || "",
            })
          }
        }
      } catch (error) {
        console.error("Error checking session:", error)
      }
    }

    checkSession()

    // Escuchar cambios en la autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

        if (profile) {
          setUser({
            id: session.user.id,
            email: profile.email,
            role: profile.role,
            firstName: profile.first_name || "",
            lastName: profile.last_name || "",
          })
        }
      }

      if (event === "SIGNED_OUT") {
        clearUser()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [setUser, clearUser])

  // Registro de usuario
  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    setLoading(true)
    setError(null)

    try {
      // 1. Registrar usuario en Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })

      if (authError) throw authError

      // 2. El perfil se crea automáticamente por el trigger
      if (data.user) {
        setUser({
          id: data.user.id,
          email,
          role: "customer", // Los nuevos usuarios son siempre customers
          firstName,
          lastName,
        })

        router.push("/")
      }
    } catch (err: any) {
      setError(err.message || "Error al registrar usuario")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Login de usuario
  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError

      if (data.user) {
        // Obtener el perfil para verificar el rol
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

        if (profile) {
          setUser({
            id: data.user.id,
            email: profile.email,
            role: profile.role,
            firstName: profile.first_name || "",
            lastName: profile.last_name || "",
          })

          // Redirigir según el rol
          if (profile.role === "admin") {
            router.push("/admin")
          } else {
            router.push("/")
          }
        }
      }
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Logout de usuario
  const logout = async () => {
    setLoading(true)

    try {
      await supabase.auth.signOut()
      clearUser()
      router.push("/")
    } catch (err: any) {
      setError(err.message || "Error al cerrar sesión")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    register,
    login,
    logout,
    loading,
    error,
  }
}
