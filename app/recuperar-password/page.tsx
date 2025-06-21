"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Add this line
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default function RecuperarPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createServerSupabaseClient();

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Correo enviado",
        description:
          "Se ha enviado un enlace de recuperación de contraseña a tu correo electrónico.",
      });
      router.push("/login");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 px-4 py-12">
      {" "}
      {/* Cambiado bg-gray-100 a bg-zinc-900 y añadido py-12 */}
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
        {" "}
        {/* Añadido shadow-xl */}
        <div className="mb-8 flex justify-center">
          {" "}
          {/* Aumentado mb-6 a mb-8 */}
          <Image
            src="/placeholder-logo.svg"
            alt="Logo de la empresa"
            width={100}
            height={100}
          />
        </div>
        <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-900">
          Recuperar Contraseña
        </h2>{" "}
        {/* Aumentado text-2xl a text-3xl, font-bold a font-extrabold y añadido text-gray-900 */}
        <form onSubmit={handlePasswordReset} className="space-y-6">
          {" "}
          {/* Aumentado space-y-4 a space-y-6 */}
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Correo Electrónico
            </Label>{" "}
            {/* Añadido estilos a Label */}
            <Input
              id="email"
              type="email"
              placeholder="tu@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" // Añadido estilos a Input
            />
          </div>
          <Button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            {" "}
            {/* Añadido estilos a Button */}
            {loading ? "Enviando..." : "Enviar Enlace de Recuperación"}
          </Button>
        </form>
      </div>
    </div>
  );
}
