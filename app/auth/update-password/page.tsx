"use client";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [sessionReady, setSessionReady] = useState(false);
  const router = useRouter();
  const supabase = createServerSupabaseClient();
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setCode(query.get("code"));
  }, []);

  useEffect(() => {
    if (code === null) return; // Wait until code is set

    const handleCodeExchange = async () => {
      console.log("URL actual:", window.location.href);
      console.log("Código obtenido de la URL:", code);

      if (code) {
        console.log(
          "Código encontrado en la URL. Intentando intercambiar por sesión..."
        );
        const { error: exchangeError, data } =
          await supabase.auth.exchangeCodeForSession(code);

        if (exchangeError) {
          console.error(
            "Error al intercambiar el código por sesión:",
            exchangeError
          );
          setError("Error al iniciar sesión: " + exchangeError.message);
          setSessionReady(false);
        } else {
          console.log(
            "Código intercambiado exitosamente. Sesión establecida:",
            data.session
          );
          // Limpiar el parámetro 'code' de la URL sin shallow routing
          router.replace("/auth/update-password"); // Eliminado: undefined, { shallow: true }
          setSessionReady(true);
        }
      } else {
        console.log("No se encontró código en la URL.");
        // Si no se encuentra código, podría ser una visita directa o después del replace.
        // Verificar si ya existe una sesión.
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          setSessionReady(true);
        } else {
          // Manejar casos donde no hay código ni sesión, quizás redirigir al inicio de sesión
          // router.push('/login');
        }
      }
    };

    handleCodeExchange();

    // Escuchar cambios en el estado de autenticación de Supabase
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        console.log("onAuthStateChange: Sesión iniciada", session);
        setSessionReady(true);
      } else if (event === "SIGNED_OUT") {
        setSessionReady(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [code, supabase, router]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Asegúrate de que sessionReady sea true antes de intentar actualizar
    if (!sessionReady) {
      setError("La sesión no está lista para actualizar la contraseña.");
      return;
    }

    const {
      data: { session },
      error: getSessionError,
    } = await supabase.auth.getSession();

    if (getSessionError || !session) {
      setError(
        "Error al obtener la sesión: " +
          (getSessionError?.message || "Sesión no encontrada.")
      );
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    if (updateError) {
      setError("Error al actualizar la contraseña: " + updateError.message);
    } else {
      setMessage(
        "Contraseña actualizada exitosamente. Redirigiendo al inicio de sesión..."
      );
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Actualizar Contraseña
          </h2>
        </div>
        {/* Conditionally render the form or show a loading/error message */}
        {!sessionReady && !error && !message && (
          <p className="text-center text-gray-600">Cargando...</p>
        )}
        {sessionReady && (
          <form className="mt-8 space-y-6" onSubmit={handleUpdatePassword}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">
                  Nueva Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nueva Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirmar Nueva Contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Actualizar Contraseña
              </button>
            </div>
          </form>
        )}

        {error && (
          <p className="mt-2 text-center text-sm text-red-600">
            Error al actualizar la contraseña: {error}
          </p>
        )}
        {message && (
          <p className="mt-2 text-center text-sm text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
}
