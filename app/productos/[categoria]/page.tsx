"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductStore } from "@/lib/store";
import { Search, Filter, Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/lib/types";
import Link from "next/link";
import { getCategoryTitle, getCategoryDescription } from "@/lib/utils";

export default function CategoriaProductosPage() {
  const params = useParams();
  const { getProductsByCategory, fetchProducts, products } = useProductStore(); // Asegúrate de importar fetchProducts y products

  const categoria = params.categoria as ProductCategory;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterByTag, setFilterByTag] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Cargar productos al montar el componente
  useEffect(() => {
    if (products.length === 0) {
      // Solo cargar si no hay productos ya cargados
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  // Obtener productos por categoría
  const categoryProducts = getProductsByCategory(categoria);

  // Filtrar y ordenar productos
  const filteredProducts = categoryProducts
    .filter((product) => {
      // Filtrar por término de búsqueda
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Filtrar por etiqueta (tag)
      const matchesTag = filterByTag === "all" || product.tag === filterByTag;

      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return (
            Number.parseFloat(a.price.replace("$", "")) -
            Number.parseFloat(b.price.replace("$", ""))
          );
        case "price-high":
          return (
            Number.parseFloat(b.price.replace("$", "")) -
            Number.parseFloat(a.price.replace("$", ""))
          );
        default:
          return 0;
      }
    });

  // Obtener todas las etiquetas únicas de la categoría
  const allTags = Array.from(
    new Set(categoryProducts.map((p) => p.tag).filter(Boolean))
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const query = new URLSearchParams(window.location.search);
      const tagFromUrl = query.get("tag");
      if (tagFromUrl) {
        setFilterByTag(tagFromUrl);
      }
    }
  }, []);

  // Eliminar las funciones getCategoryTitle y getCategoryDescription de aquí

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            JEANS PARA{" "}
            <span className="text-blue-500">{getCategoryTitle(categoria)}</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            {getCategoryDescription(categoria)}
          </p>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-zinc-900 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Búsqueda */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar productos</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-zinc-800 border-zinc-700"
                />
              </div>
            </div>

            {/* Filtro por etiqueta */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Filtrar por tipo</label>
              <Select value={filterByTag} onValueChange={setFilterByTag}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder={`${getCategoryTitle(categoria)}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {getCategoryTitle(categoria)}
                  </SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Ordenar */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Ordenar por</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Todos los tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nombre A-Z</SelectItem>
                  <SelectItem value="price-low">
                    Precio: Menor a Mayor
                  </SelectItem>
                  <SelectItem value="price-high">
                    Precio: Mayor a Menor
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Vista */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Vista</label>
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="bg-zinc-800 border-zinc-700"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="bg-zinc-800 border-zinc-700"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <p className="text-zinc-400">
            Mostrando {filteredProducts.length} de {categoryProducts.length}{" "}
            productos para {categoria}
          </p>
        </div>

        {/* Grid de productos */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900 rounded-lg">
            <Filter className="h-16 w-16 mx-auto mb-4 text-zinc-600" />
            <h3 className="text-xl font-bold mb-2">
              No se encontraron productos
            </h3>
            <p className="text-zinc-400 mb-4">
              Intenta ajustar los filtros o términos de búsqueda.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setFilterByTag("all");
                setSortBy("name");
              }}
              variant="outline"
            >
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              "gap-6",
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "flex flex-col space-y-6"
            )}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Call to action */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">
            ¿Necesitas ayuda para elegir?
          </h2>
          <p className="text-blue-100 mb-6">
            Nuestro equipo está aquí para ayudarte a encontrar el jean perfecto
            para tu estilo.
          </p>
          <Link href="/contacto">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Contactar Ahora
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
