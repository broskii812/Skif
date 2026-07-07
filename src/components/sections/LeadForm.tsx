"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { LeadFormData } from "@/types";

interface LeadFormProps {
  preselectedProduct?: string;
}

const initialForm: LeadFormData = {
  name: "",
  phone: "",
  email: "",
  company: "",
  comment: "",
};

export function LeadForm({ preselectedProduct }: LeadFormProps) {
  const [form, setForm] = useState<LeadFormData>({
    ...initialForm,
    comment: preselectedProduct
      ? `Интересует: ${preselectedProduct}`
      : "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (preselectedProduct) {
      setForm((prev) => ({
        ...prev,
        comment: `Интересует: ${preselectedProduct}`,
      }));
    }
  }, [preselectedProduct]);

  const updateField = (field: keyof LeadFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.phone.trim()) {
      setError("Укажите номер телефона");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          productName: preselectedProduct,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки");
      }

      setIsSuccess(true);
      setForm(initialForm);
    } catch {
      setError("Не удалось отправить заявку. Попробуйте позже или позвоните нам.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="request" className="section-padding bg-navy-900">
        <div className="section-container">
          <div className="mx-auto max-w-xl rounded-2xl bg-white p-10 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-navy-900">Заявка отправлена!</h3>
            <p className="mt-3 text-gray-500">
              Наш менеджер свяжется с вами в ближайшее время и подготовит
              коммерческое предложение.
            </p>
            <Button
              className="mt-6"
              onClick={() => setIsSuccess(false)}
            >
              Отправить ещё одну заявку
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="request" className="section-padding bg-navy-900">
      <div className="section-container">
        <SectionHeading
          label="Заявка"
          title="Получите коммерческое предложение"
          description="Заполните форму — мы подберём оборудование и рассчитаем стоимость с учётом ваших задач."
          light
        />

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-12 max-w-2xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy-900">
                Имя
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition-all focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
                placeholder="Ваше имя"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy-900">
                Телефон <span className="text-brand-red">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition-all focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
                placeholder="+7 (___) ___-__-__"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-900">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition-all focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
                placeholder="email@company.kz"
              />
            </div>

            <div>
              <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-navy-900">
                Название компании / предприятия
              </label>
              <input
                id="company"
                type="text"
                value={form.company}
                onChange={(e) => updateField("company", e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition-all focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
                placeholder="ТОО «...»"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="comment" className="mb-1.5 block text-sm font-medium text-navy-900">
                Комментарий
              </label>
              <textarea
                id="comment"
                rows={4}
                value={form.comment}
                onChange={(e) => updateField("comment", e.target.value)}
                className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 outline-none transition-all focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
                placeholder="Опишите задачу, нужное оборудование или объём поставки"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-brand-red">{error}</p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="mt-6 w-full sm:w-auto"
          >
            {isSubmitting ? "Отправка..." : "Получить коммерческое предложение"}
          </Button>

          <p className="mt-4 text-xs text-gray-400">
            Нажимая кнопку, вы соглашаетесь на обработку персональных данных
          </p>
        </form>
      </div>
    </section>
  );
}
