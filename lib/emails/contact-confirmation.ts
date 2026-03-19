function getSiteUrl(): string {
    return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.cousinsdistilleryltd.com';
}

function getLogoUrl(): string {
    return `${getSiteUrl()}/logo.svg`;
}

function getCollectionImageUrl(): string {
    return `${getSiteUrl()}/all-bottles-mail.jpeg`;
}

function wrapEmailShell(title: string, contentHtml: string): string {
    const year = new Date().getFullYear();
    const logoUrl = getLogoUrl();
    const collectionImageUrl = getCollectionImageUrl();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f7f7f5;font-family:Helvetica,Arial,sans-serif;color:#1f2937;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border:1px solid #e5e7eb;">
          <tr>
            <td style="padding:24px 28px;border-bottom:1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <img src="${logoUrl}" alt="Cousins Distillery logo" width="120" style="display:block;height:auto;border:0;outline:none;text-decoration:none;" />
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;">Cousins Distillery</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <img src="${collectionImageUrl}" alt="Cousins Distillery collection" width="620" style="display:block;width:100%;max-width:620px;height:auto;border:0;outline:none;text-decoration:none;" />
            </td>
          </tr>
          ${contentHtml}
          <tr>
            <td style="padding:18px 28px;border-top:1px solid #e5e7eb;background:#fafaf9;">
              <p style="margin:0 0 10px;font-size:12px;line-height:1.7;color:#374151;">
                Cousins Distillery LTD<br />
                747 Appleby Line, Burlington, ON L7L 2Y6<br />
                <a href="mailto:Contact@cousinsdistilleryltd.com" style="color:#0f766e;text-decoration:none;">Contact@cousinsdistilleryltd.com</a> ·
                <a href="tel:+19055125943" style="color:#0f766e;text-decoration:none;">+1 905 512 5943</a>
              </p>
              <p style="margin:0;font-size:11px;line-height:1.6;color:#6b7280;">
                © ${year} Cousins Distillery Ltd. All rights reserved.
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

export function contactConfirmationHtml(name: string, email: string, message: string): string {
    return wrapEmailShell(
        "We've received your message — Cousins Distillery",
        `<tr>
            <td style="padding:28px;">
              <h1 style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.2;color:#111827;">
                We received your message.
              </h1>
              <p style="margin:0 0 10px;font-size:15px;line-height:1.7;color:#374151;">
                Hi ${name}, thank you for contacting Cousins Distillery.
              </p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#374151;">
                Our team will get back to you at <strong style="color:#111827;">${email}</strong> within 1-2 business days.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e5e7eb;">
                <tr>
                  <td style="padding:14px 16px;">
                    <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">
                      Your message
                    </p>
                    <p style="margin:0;font-size:14px;line-height:1.7;color:#1f2937;">
                      ${message.replace(/\n/g, '<br />')}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
    );
}

export function contactConfirmationText(name: string, email: string, message: string): string {
    return `We've received your message, ${name}.

Thank you for reaching out to Cousins Distillery. Our team will review your message and get back to you at ${email} within 1–2 business days.

Your message:
"${message}"

Until then, raise a glass to heritage.
— Cousins Distillery Ltd.

Contact:
Cousins Distillery LTD
747 Appleby Line, Burlington, ON L7L 2Y6
Contact@cousinsdistilleryltd.com
+1 905 512 5943

---
© ${new Date().getFullYear()} Cousins Distillery Ltd. All rights reserved.`;
}

// Internal notification email sent to the distillery team
export function contactInternalNotificationHtml(name: string, email: string, subject: string, message: string): string {
    const receivedAt = new Date().toISOString();
    return wrapEmailShell(
        'New Contact Form Submission',
        `<tr>
            <td style="padding:28px;">
              <h1 style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.2;color:#111827;">
                New contact submission
              </h1>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;">
                <tr>
                  <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Name</p>
                    <p style="margin:6px 0 0;font-size:15px;color:#111827;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Email</p>
                    <p style="margin:6px 0 0;font-size:15px;color:#111827;"><a href="mailto:${email}" style="color:#0f766e;text-decoration:none;">${email}</a></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Subject</p>
                    <p style="margin:6px 0 0;font-size:15px;color:#111827;">${subject}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Message</p>
                    <p style="margin:6px 0 0;font-size:15px;line-height:1.7;color:#111827;">${message.replace(/\n/g, '<br />')}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;">
                    <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Received at</p>
                    <p style="margin:6px 0 0;font-size:15px;color:#111827;">${receivedAt}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
    );
}
