export function contactConfirmationHtml(name: string, email: string, message: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We've received your message — Cousins Distillery</title>
</head>
<body style="margin:0;padding:0;background:#F5F2E8;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F2E8;padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:4px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#41380E;padding:32px 40px;">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;letter-spacing:0.05em;color:#D1BB8A;">
                Cousins Distillery
              </p>
              <p style="margin:6px 0 0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#8C8567;">
                Cultivated Excellence
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h1 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:700;line-height:1.2;color:#222222;">
                We&rsquo;ve received your message, ${name}.
              </h1>
              <p style="margin:0 0 16px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#555555;">
                Thank you for reaching out to Cousins Distillery. Our team will review your message and get back to you at <strong style="color:#222222;">${email}</strong> within 1–2 business days.
              </p>

              <!-- Message recap -->
              <div style="background:#F5F2E8;border-left:3px solid #D1BB8A;padding:16px 20px;margin:24px 0;border-radius:2px;">
                <p style="margin:0 0 8px;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#8C8567;">
                  Your message
                </p>
                <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7;color:#444444;">
                  ${message.replace(/\n/g, '<br />')}
                </p>
              </div>

              <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#555555;">
                Until then, raise a glass to heritage.
              </p>
            </td>
          </tr>

          <!-- Divider + Quote -->
          <tr>
            <td style="padding:0 40px 40px;">
              <div style="border-top:2px solid #41380E;padding-top:24px;">
                <blockquote style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:17px;font-style:italic;line-height:1.5;color:#41380E;">
                  &ldquo;This Is Not Just Vodka. This Is Cultivated Excellence.&rdquo;
                </blockquote>
                <p style="margin:8px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#8C8567;letter-spacing:0.05em;">
                  — Cousins Distillery Ltd.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F5F2E8;padding:24px 40px;border-top:1px solid #E0D9C8;">
              <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#8C8567;">
                © ${new Date().getFullYear()} Cousins Distillery Ltd. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function contactConfirmationText(name: string, email: string, message: string): string {
    return `We've received your message, ${name}.

Thank you for reaching out to Cousins Distillery. Our team will review your message and get back to you at ${email} within 1–2 business days.

Your message:
"${message}"

Until then, raise a glass to heritage.
— Cousins Distillery Ltd.

---
© ${new Date().getFullYear()} Cousins Distillery Ltd. All rights reserved.`;
}

// Internal notification email sent to the distillery team
export function contactInternalNotificationHtml(name: string, email: string, subject: string, message: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 24px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
          <tr>
            <td style="padding-bottom:24px;border-bottom:2px solid #41380E;">
              <p style="margin:0;font-family:Georgia,serif;font-size:20px;font-weight:700;color:#41380E;">
                New Contact Form Submission
              </p>
              <p style="margin:4px 0 0;font-size:12px;color:#8C8567;">Cousins Distillery Website</p>
            </td>
          </tr>
          <tr><td style="height:24px;"></td></tr>
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #E0D9C8;">
                    <span style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#8C8567;">Name</span>
                    <p style="margin:4px 0 0;font-size:15px;color:#222222;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #E0D9C8;">
                    <span style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#8C8567;">Email</span>
                    <p style="margin:4px 0 0;font-size:15px;color:#222222;"><a href="mailto:${email}" style="color:#9f860e;">${email}</a></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #E0D9C8;">
                    <span style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#8C8567;">Subject</span>
                    <p style="margin:4px 0 0;font-size:15px;color:#222222;">${subject}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <span style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#8C8567;">Message</span>
                    <p style="margin:4px 0 0;font-size:15px;line-height:1.7;color:#222222;">${message.replace(/\n/g, '<br />')}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
