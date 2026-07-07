import Image from "next/image";
import { companyInfo } from "@/data/company";

const footerLinks = [
  { href: "#about", label: "О компании" },
  { href: "#catalog", label: "Каталог" },
  { href: "#request", label: "Заявка" },
  { href: "#contacts", label: "Контакты" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-gray-300">
      <div className="section-container section-padding pb-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Image
              src="/logo.png"
              alt={companyInfo.name}
              width={180}
              height={180}
              className="mb-4 h-14 w-auto rounded-md bg-white object-contain p-1.5"
            />
            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              {companyInfo.tagline}. Работаем с юридическими лицами по всему
              Казахстану с {companyInfo.foundedYear} года.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Навигация
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-accent-orange"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Контакты
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href={companyInfo.phoneHref} className="hover:text-white">
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white">
                  {companyInfo.email}
                </a>
              </li>
              <li>{companyInfo.address}</li>
              <li>{companyInfo.workingHours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-navy-800 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            © {currentYear} {companyInfo.name}. Все права защищены.
          </p>
          <p className="text-sm text-gray-500">
            Поставки дорожного оборудования по Казахстану
          </p>
        </div>
      </div>
    </footer>
  );
}
