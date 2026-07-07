import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
        alt="Лабораторное оборудование для строительного контроля"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/75 to-navy-900/50" />

      <div className="section-container relative z-10 py-32 sm:py-40">
        <div className="max-w-3xl">
          <span className="animate-fade-in-up mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            ТОО «Скиф» — с 1996 года
          </span>
          <h1 className="animate-fade-in-up animate-delay-100 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Приборы и оборудование для дорожно-строительных лабораторий
          </h1>
          <p className="animate-fade-in-up animate-delay-200 mt-6 max-w-2xl text-lg leading-relaxed text-gray-200 sm:text-xl">
            Надёжное лабораторное оборудование напрямую от поставщика. Более 300
            организаций Казахстана доверяют нам.
          </p>
          <div className="animate-fade-in-up animate-delay-300 mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="#catalog" size="lg">
              Смотреть каталог
            </Button>
            <Button href="#request" variant="outline" size="lg">
              Оставить заявку
            </Button>
          </div>
        </div>

        <div className="animate-fade-in-up animate-delay-400 mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {[
            { value: "145+", label: "позиций в каталоге" },
            { value: "300+", label: "клиентов" },
            { value: "B2B", label: "юр. лица" },
            { value: "KZ", label: "все регионы" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
            >
              <div className="text-2xl font-bold text-white sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
