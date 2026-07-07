import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutStats, advantages, companyInfo } from "@/data/company";

import type { ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  import: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  price: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  delivery: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),
  support: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
};

function getStatValue(stat: (typeof aboutStats)[number]): string {
  if ("valueKey" in stat) {
    return `${companyInfo[stat.valueKey]}${stat.suffix ?? ""}`;
  }
  return stat.value;
}

export function About() {
  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="section-container">
        <SectionHeading
          label="О компании"
          title={`${companyInfo.name} — надёжный партнёр с ${companyInfo.foundedYear} года`}
          description={companyInfo.description}
        />

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {aboutStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="text-3xl font-extrabold text-brand-red sm:text-4xl">
                {getStatValue(stat)}
              </div>
              <div className="mt-2 text-sm font-medium text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-brand-red/30 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex rounded-xl bg-navy-900/5 p-3 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
                {iconMap[item.icon]}
              </div>
              <h3 className="text-lg font-bold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
