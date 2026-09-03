import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const SMTP_SECURE = process.env.SMTP_SECURE !== "false"; // true for 465, false for 587
const SMTP_USER = process.env.SMTP_USER || "info.nisarachar@gmail.com";
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || `"Nisar Ki Achar" <${SMTP_USER}>`;
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "info.nisarachar@gmail.com";
const WHATSAPP_NUM = process.env.STORE_WHATSAPP_NUMBER || "923341677114";

// Configure reusable Nodemailer transporter
function getTransporter() {
    if (!SMTP_PASS || SMTP_PASS.includes("your_16_digit")) {
        return null;
    }
    return nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });
}

export async function POST(req: Request) {
    try {
        const transporter = getTransporter();
        if (!transporter) {
            console.warn("⚠️ SMTP_PASS is not configured in .env.local yet. Skipping email dispatch.");
            return NextResponse.json({
                success: false,
                message: "SMTP_PASS is not configured in .env.local",
            });
        }

        const data = await req.json();
        const {
            orderId,
            customerName,
            customerEmail,
            customerPhone,
            shippingAddress,
            city,
            items = [],
            subtotal = 0,
            shippingFee = 0,
            totalAmount = 0,
            paymentMethod = "Cash on Delivery (COD)",
        } = data;

        const trackingMsg = encodeURIComponent(
            `Assalam o Alaikum! I would like to track my order #${orderId} for ${customerName}.`
        );
        const whatsappLink = `https://wa.me/${WHATSAPP_NUM}?text=${trackingMsg}`;

        const itemsHtml = items
            .map(
                (it: any) => `
<tr style="border-bottom: 1px solid #f0f0f0;">
  <td style="padding: 10px 0; color: #333;">
    <strong>${it.name}</strong> ${it.selectedWeight ? `<span style="color:#888; font-size:12px;">(${it.selectedWeight})</span>` : ""}
  </td>
  <td style="padding: 10px 0; text-align: center; color: #555;">${it.quantity}</td>
  <td style="padding: 10px 0; text-align: right; color: #111; font-weight: 600;">Rs. ${(it.price * it.quantity).toLocaleString()}</td>
</tr>`
            )
            .join("");

        // 1. Send Admin Notification Alert
        await transporter.sendMail({
            from: SMTP_FROM,
            to: ADMIN_EMAIL,
            subject: `🚨 New Order #${orderId} Received - Rs. ${totalAmount.toLocaleString()}`,
            html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #222; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
  <div style="background: #b45309; padding: 20px; color: white;">
    <h2 style="margin: 0; font-size: 20px;">🚨 New Store Order #${orderId}</h2>
    <p style="margin: 5px 0 0; opacity: 0.9; font-size: 13px;">Total: Rs. ${totalAmount.toLocaleString()} (${paymentMethod})</p>
  </div>
  <div style="padding: 24px;">
    <h3 style="margin-top: 0; font-size: 15px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Customer Information</h3>
    <p style="margin: 4px 0;"><strong>Name:</strong> ${customerName}</p>
    <p style="margin: 4px 0;"><strong>Phone:</strong> <a href="tel:${customerPhone}">${customerPhone}</a></p>
    <p style="margin: 4px 0;"><strong>Email:</strong> ${customerEmail || "N/A"}</p>
    <p style="margin: 4px 0;"><strong>Address:</strong> ${shippingAddress}, ${city}</p>

    <h3 style="margin-top: 20px; font-size: 15px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Ordered Items</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="color: #666; font-size: 12px; border-bottom: 2px solid #eee;">
          <th style="text-align: left; padding: 6px 0;">Item</th>
          <th style="text-align: center; padding: 6px 0;">Qty</th>
          <th style="text-align: right; padding: 6px 0;">Total</th>
        </tr>
      </thead>
      <tbody>${itemsHtml}</tbody>
    </table>

    <div style="margin-top: 20px; padding: 14px; background: #fdfaf6; border-radius: 8px; border: 1px solid #fde68a;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>Subtotal:</span><span>Rs. ${subtotal.toLocaleString()}</span></div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>Delivery Fee:</span><span>${shippingFee === 0 ? "FREE" : `Rs. ${shippingFee}`}</span></div>
      <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 16px; margin-top: 8px; border-top: 1px solid #fde68a; padding-top: 8px; color: #b45309;">
        <span>Total Payable (COD):</span><span>Rs. ${totalAmount.toLocaleString()}</span>
      </div>
    </div>
  </div>
</div>
`,
        });

        // 2. Send Customer Order Confirmation (if customer provided their email)
        if (customerEmail) {
            await transporter.sendMail({
                from: SMTP_FROM,
                to: customerEmail,
                subject: `✅ Order Confirmed! #${orderId} - Nisar Ki Achar`,
                html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #222; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
  <div style="background: #b45309; padding: 28px 20px; text-align: center; color: white;">
    <h1 style="margin: 0; font-size: 24px;">🫙 Nisar Ki Achar</h1>
    <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.95;">Thank you for your order, ${customerName}!</p>
  </div>
  <div style="padding: 24px;">
    <p style="font-size: 15px; line-height: 1.5;">We have received your order <strong>#${orderId}</strong> and are preparing your freshly handcrafted pickles for dispatch. Estimated delivery is <strong>2 to 4 business days</strong>.</p>

    <div style="margin: 20px 0; text-align: center;">
      <a href="${whatsappLink}" style="display: inline-block; background: #25D366; color: white; text-decoration: none; font-weight: bold; padding: 12px 24px; border-radius: 8px; font-size: 14px;">
        💬 Track Order on WhatsApp
      </a>
    </div>

    <h3 style="border-bottom: 2px solid #f0f0f0; padding-bottom: 8px; font-size: 15px;">Order Summary</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="color: #666; font-size: 12px; border-bottom: 1px solid #eee;">
          <th style="text-align: left; padding: 6px 0;">Item</th>
          <th style="text-align: center; padding: 6px 0;">Qty</th>
          <th style="text-align: right; padding: 6px 0;">Price</th>
        </tr>
      </thead>
      <tbody>${itemsHtml}</tbody>
    </table>

    <div style="margin-top: 16px; padding-top: 12px; border-top: 2px solid #eee;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 14px;"><span>Subtotal:</span><span>Rs. ${subtotal.toLocaleString()}</span></div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 14px;"><span>Shipping Fee:</span><span>${shippingFee === 0 ? "FREE" : `Rs. ${shippingFee}`}</span></div>
      <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 16px; margin-top: 8px; border-top: 1px solid #eee; padding-top: 8px; color: #b45309;">
        <span>Total Amount (COD):</span><span>Rs. ${totalAmount.toLocaleString()}</span>
      </div>
    </div>

    <div style="margin-top: 24px; background: #f9f9f9; padding: 14px; border-radius: 8px; font-size: 13px; color: #555;">
      <strong>Delivery Address:</strong><br />
      ${shippingAddress}, ${city}<br />
      Phone: ${customerPhone}
    </div>
  </div>
  <div style="background: #fafafa; border-top: 1px solid #eee; padding: 16px; text-align: center; font-size: 12px; color: #888;">
    Nisar Ki Achar · Traditional Desi Mustard Oil Pickles
  </div>
</div>
`,
            });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Order email error via Nodemailer:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
