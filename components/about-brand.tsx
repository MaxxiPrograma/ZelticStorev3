import Image from "next/image"

export function AboutBrand() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">LA MARCA ZELTIC</h2>
            <p className="text-zinc-300 mb-6">
              Nacimos con una misión clara: revolucionar la moda urbana con jeans que combinan calidad premium, diseño
              innovador y el auténtico estilo drip que define a nuestra generación.
            </p>
            <p className="text-zinc-300 mb-6">
              Cada par de jeans Zeltic está diseñado meticulosamente para quienes no temen destacar, para los que crean
              tendencias en lugar de seguirlas. Utilizamos los mejores materiales y técnicas de fabricación para
              garantizar durabilidad sin sacrificar estilo.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-1 w-12 bg-blue-500" />
              <p className="text-blue-400 font-semibold">ESTILO. ACTITUD. CALIDAD.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square relative">
              <Image
                src="/fijas/jean1.png"
                alt="Detalle de jeans Zeltic"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="aspect-square relative mt-8">
              <Image
                src="/fijas/jean2.png"
                alt="Modelo con jeans Zeltic"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="aspect-square relative -mt-8">
              <Image
                src="/fijas/jean3.png"
                alt="Detalle de costura Zeltic"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="aspect-square relative">
              <Image
                src="/fijas/jean4.png"
                alt="Jeans Zeltic"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
