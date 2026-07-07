import { NextResponse } from "next/server";
import type { LeadFormData } from "@/types";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body: LeadFormData = await request.json();

    // Проверка обязательных полей
    if (!body.phone?.trim()) {
      return NextResponse.json(
        { error: "Телефон обязателен" },
        { status: 400 },
      );
    }

    const leadData = {
      ...body,
      submittedAt: new Date().toISOString(),
    };

    // Логирование заявки в консоль (для отладки)
    console.log("[LEAD] Новая заявка:", JSON.stringify(leadData, null, 2));

    // --- ОТПРАВКА НА EMAIL (ДОБАВЛЕННЫЙ КОД) ---
    
    // Проверяем, настроена ли отправка писем
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        // Настройка транспортера для отправки почты
        const transporter = nodemailer.createTransport({
          host: "smtp.yandex.ru", // Для Яндекс.Почты
          // host: "smtp.gmail.com", // Раскомментируйте для Gmail
          // host: "smtp.mail.ru", // Раскомментируйте для Mail.ru
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        // Формируем письмо
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          subject: `Новая заявка с сайта SKIF${body.productName ? ` - ${body.productName}` : ""}`,
          html: `
            <h2 style="color: #1a365d;">Новая заявка с сайта</h2>
            <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Имя:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${body.name || "Не указано"}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Телефон:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong style="color: #c00;">${body.phone}</strong></td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${body.email || "Не указан"}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Компания:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${body.company || "Не указана"}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Интересующий товар:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${body.productName || "Не указан"}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Комментарий:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${body.comment || "Без комментария"}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Дата и время:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString("ru-RU")}</td>
              </tr>
            </table>
            <p style="margin-top: 20px; color: #666; font-size: 12px;">
              Письмо отправлено автоматически с сайта<br>
              <a href="https://skiflab.kz">https://skiflab.kz</a>
            </p>
          `,
        };

        // Отправляем письмо
        await transporter.sendMail(mailOptions);
        console.log("[EMAIL] Письмо успешно отправлено на", process.env.EMAIL_TO || process.env.EMAIL_USER);

      } catch (emailError) {
        console.error("[EMAIL] Ошибка отправки письма:", emailError);
        // Не возвращаем ошибку клиенту, чтобы заявка всё равно сохранилась
        // (пользователь увидит успех, а мы узнаем о проблеме с почтой)
      }
    } else {
      console.warn("[EMAIL] Отправка не настроена. Добавьте переменные EMAIL_USER и EMAIL_PASSWORD в .env.local");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[LEAD] Ошибка:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}