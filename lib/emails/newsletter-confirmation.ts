function getSiteUrl(): string {
    return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.cousinsdistilleryltd.com';
}

function getLogoUrl(): string {
    return `${getSiteUrl()}/logo.svg`;
}

function getCollectionImageUrl(): string {
    return `${getSiteUrl()}/all-bottles.jpeg`;
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

export function newsletterConfirmationHtml(email: string): string {
    return wrapEmailShell(
        'Welcome to the Cousins Distillery Newsletter',
        `<tr>
            <td style="padding:28px;">
              <h1 style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.2;color:#111827;">
                You are on the list.
              </h1>
              <p style="margin:0 0 10px;font-size:15px;line-height:1.7;color:#374151;">
                Thank you for subscribing to Cousins Distillery updates.
              </p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#374151;">
                We will send future updates to <strong style="color:#111827;">${email}</strong>, including new releases, events, and product stories.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e5e7eb;">
                <tr>
                  <td style="padding:12px 14px;">
                    <p style="margin:0;font-size:12px;line-height:1.6;color:#4b5563;">
                      You received this because you subscribed at cousinsdistillery.com.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
    );
}

export function newsletterConfirmationText(email: string): string {
    return `Welcome to the Cousins Distillery Newsletter.

Thank you for subscribing. You'll be among the first to hear about new releases, exclusive events, and stories from our distillery.

We'll be sending updates to ${email}. Every message will be worth your time — crafted with the same devotion we put into our spirits.

Until then, raise a glass to heritage.

— Cousins Distillery Ltd.

Contact:
Cousins Distillery LTD
747 Appleby Line, Burlington, ON L7L 2Y6
Contact@cousinsdistilleryltd.com
+1 905 512 5943

---
© ${new Date().getFullYear()} Cousins Distillery Ltd. All rights reserved.
You received this because you subscribed at cousinsdistillery.com.`;
}

// Internal notification to the distillery team (admin).
export function newsletterInternalNotificationHtml(email: string): string {
    const receivedAt = new Date().toISOString();
    return wrapEmailShell(
        'New Newsletter Subscription',
        `<tr>
            <td style="padding:28px;">
              <h1 style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.2;color:#111827;">
                New newsletter subscription
              </h1>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;">
                <tr>
                  <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Subscriber</p>
                    <p style="margin:6px 0 0;font-size:15px;color:#111827;">${email}</p>
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

export function newsletterInternalNotificationText(email: string): string {
    const receivedAt = new Date().toISOString();
    return `New newsletter subscription received.\n\nSubscriber: ${email}\nReceived at: ${receivedAt}\n\nContact:\nCousins Distillery LTD\n747 Appleby Line, Burlington, ON L7L 2Y6\nContact@cousinsdistilleryltd.com\n+1 905 512 5943`;
}
