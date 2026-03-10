export function newsletterConfirmationHtml(email: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to the Cousins Distillery Newsletter</title>
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
              <h1 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:700;line-height:1.2;color:#222222;">
                You&rsquo;re on the list.
              </h1>
              <p style="margin:0 0 16px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#555555;">
                Thank you for subscribing to the Cousins Distillery newsletter. You&rsquo;ll be among the first to hear about new releases, exclusive events, and stories from our distillery.
              </p>
              <p style="margin:0 0 16px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#555555;">
                We&rsquo;ll be sending updates to <strong style="color:#222222;">${email}</strong>. Every message will be worth your time — crafted with the same devotion we put into our spirits.
              </p>
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
              <p style="margin:8px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#8C8567;">
                You received this because you subscribed at cousinsdistillery.com.
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

export function newsletterConfirmationText(email: string): string {
    return `Welcome to the Cousins Distillery Newsletter.

Thank you for subscribing. You'll be among the first to hear about new releases, exclusive events, and stories from our distillery.

We'll be sending updates to ${email}. Every message will be worth your time — crafted with the same devotion we put into our spirits.

Until then, raise a glass to heritage.

— Cousins Distillery Ltd.

---
© ${new Date().getFullYear()} Cousins Distillery Ltd. All rights reserved.
You received this because you subscribed at cousinsdistillery.com.`;
}
