import { SectionHeading } from "@/components/ui/SectionHeading";
import { companyInfo } from "@/data/company";

const contactItems = [
  {
    label: "Телефон / факс",
    value: companyInfo.phone,
    href: companyInfo.phoneHref,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: "Мобильный",
    value: companyInfo.phoneMobile,
    href: companyInfo.phoneMobileHref,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: companyInfo.email,
    href: `mailto:${companyInfo.email}`,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Сайт",
    value: companyInfo.website,
    href: `https://${companyInfo.website}`,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    label: "Адрес",
    value: companyInfo.address,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Режим работы",
    value: companyInfo.workingHours,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function Contacts() {
  return (
    <section id="contacts" className="section-padding bg-gray-50">
      <div className="section-container">
        <SectionHeading
          label="Контакты"
          title="Свяжитесь с нами"
          description={`${companyInfo.regions}. Работаем с юридическими лицами.`}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {contactItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-3 inline-flex rounded-lg bg-brand-red/10 p-2.5 text-brand-red">
                  {item.icon}
                </div>
                <h3 className="text-sm font-medium text-gray-500">{item.label}</h3>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-1 block font-semibold text-navy-900 hover:text-brand-red"
                    target={item.label === "Сайт" ? "_blank" : undefined}
                    rel={item.label === "Сайт" ? "noopener noreferrer" : undefined}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-1 font-semibold text-navy-900">{item.value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <iframe
              title="Карта — ТОО Скиф, Актобе"
              src="https://yandex.ru/map-widget/v1/?ll=57.1534%2C50.2919&z=15&l=map&pt=57.1534%2C50.2919,pm2rdm"
              width="100%"
              height="100%"
              className="min-h-[320px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
