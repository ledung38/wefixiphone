import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { to, subject, message } = await req.json();
    if (!subject || !message) {
      return Response.json({ success: false }, { status: 400 });
    }

    // 1. Tạo transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NEXT_PUBLIC_MAIL_USER,
        pass: process.env.NEXT_PUBLIC_MAIL_PASS,
      },
    });

    // 2. Gửi mail
    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_MAIL_USER,
      to: `${to}, wefixiphone102@gmail.com`,
      subject,
      html: message,
    });

    return Response.json({ success: true });
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
