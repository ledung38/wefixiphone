export const generateBookingEmailHTML = (params: {
  bookingId: string;
  name: string;
  phone: string;
  email: string;
  suburb: string;
  address: string;
  date: string;
  time: string;
  modelName: string;
  partName: string;
  quality: string;
  price: number;
  notes: string;
}) => {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 24px; text-align: center; border-bottom: 2px solid #3b82f6;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">WeFix <span style="color: #3b82f6;">iPhone</span></h1>
          <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">Sydney Mobile Repair</p>
        </div>
        
        <!-- Body -->
        <div style="padding: 24px; background-color: #ffffff;">
          <h2 style="color: #0f172a; margin-top: 0; font-size: 18px; font-weight: 700; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">Booking Confirmation</h2>
          <p style="color: #475569; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
            Hi <strong>${params.name}</strong>, thank you for booking with us. We have received your request and will contact you 30 minutes before arrival to confirm.
          </p>

          <!-- Summary Card -->
          <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 140px;">Booking ID:</td>
                <td style="padding: 6px 0; color: #0f172a; font-family: monospace; font-weight: 700;">${params.bookingId}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Customer:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${params.name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Phone:</td>
                <td style="padding: 6px 0; color: #0f172a;">${params.phone}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Email:</td>
                <td style="padding: 6px 0; color: #0f172a;">${params.email}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Address:</td>
                <td style="padding: 6px 0; color: #0f172a;">${params.address}, ${params.suburb}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600; border-top: 1px solid #e2e8f0; padding-top: 12px;">Device & Repair:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 600; border-top: 1px solid #e2e8f0; padding-top: 12px;">${params.modelName} - ${params.partName}</td>
              </tr>
              ${
                params.quality
                  ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Quality Tier:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${params.quality}</td>
              </tr>
              `
                  : ""
              }
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Appointment:</td>
                <td style="padding: 6px 0; color: #3b82f6; font-weight: 700;">${params.date} at ${params.time}</td>
              </tr>
              ${
                params.notes
                  ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600; vertical-align: top;">Notes:</td>
                <td style="padding: 6px 0; color: #475569; font-style: italic;">"${params.notes}"</td>
              </tr>
              `
                  : ""
              }
              <tr>
                <td style="padding: 12px 0 0 0; color: #0f172a; font-weight: bold; font-size: 16px; border-top: 1px solid #e2e8f0;">Total Cost:</td>
                <td style="padding: 12px 0 0 0; color: #f4601f; font-weight: 800; font-size: 18px; border-top: 1px solid #e2e8f0;">
                  ${params.price === 0 ? "Free Diagnosis (Quote on arrival)" : `$${params.price} AUD`}
                </td>
              </tr>
            </table>
          </div>

          <!-- Info alert box -->
          <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px 16px; color: #1e3a8a; font-size: 13px; line-height: 1.4;">
            <strong>Sydney Mobile On-Site Service Note:</strong> The entire repair will be performed in front of you. Please make sure the technician has access to a safe working area.
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9;">
          <p style="margin: 0 0 4px 0;">© ${new Date().getFullYear()} WeFixiPhone. All rights reserved.</p>
          <p style="margin: 0;">Sydney, NSW, Australia | Tel: 0433 263 105</p>
        </div>
      </div>
    `;
};
