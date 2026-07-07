interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  light?: boolean;
  centered?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  light = false,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {label && (
        <span
          className={`mb-3 inline-block text-sm font-semibold uppercase tracking-widest ${
            light ? "text-accent-orange" : "text-brand-red"
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? "text-gray-200" : "text-gray-500"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
