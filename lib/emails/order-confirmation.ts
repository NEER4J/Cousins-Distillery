function getSiteUrl(): string {
    return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.cousinsdistilleryltd.com';
}

function getLogoUrl(): string {
    return `${getSiteUrl()}/logo.svg`;
}

function getCollectionImageUrl(): string {
    return `${getSiteUrl()}/all-bottles-mail.jpeg`;
}

export interface OrderDetails {
    name: string;
    email: string;
    phone: string;
    productName: string;
    productSlug: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    notes?: string;
}

function money(value: number): string {
    return `$${value.toFixed(2)}`;
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

function renderAddressBlock(o: OrderDetails): string {
    const line2 = o.addressLine2 ? `${o.addressLine2}<br />` : '';
    return `${o.addressLine1}<br />${line2}${o.city}, ${o.province} ${o.postalCode}<br />${o.country}`;
}

function renderOrderSummaryTable(o: OrderDetails): string {
    return `<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-collapse:collapse;">
        <tr style="background:#fafaf9;">
          <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Item</td>
          <td align="center" style="padding:12px 14px;border-bottom:1px solid #e5e7eb;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Qty</td>
          <td align="right" style="padding:12px 14px;border-bottom:1px solid #e5e7eb;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Unit</td>
          <td align="right" style="padding:12px 14px;border-bottom:1px solid #e5e7eb;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Total</td>
        </tr>
        <tr>
          <td style="padding:14px;font-size:15px;color:#111827;">${o.productName}</td>
          <td align="center" style="padding:14px;font-size:15px;color:#111827;">${o.quantity}</td>
          <td align="right" style="padding:14px;font-size:15px;color:#111827;">${money(o.unitPrice)}</td>
          <td align="right" style="padding:14px;font-size:15px;color:#111827;">${money(o.unitPrice * o.quantity)}</td>
        </tr>
        <tr style="background:#0F0A08;">
          <td colspan="3" style="padding:14px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#D1BB8A;font-weight:bold;">Order Total (Retail)</td>
          <td align="right" style="padding:14px;font-size:18px;color:#ffffff;font-weight:bold;">${money(o.totalPrice)}</td>
        </tr>
      </table>`;
}

export function orderConfirmationHtml(o: OrderDetails): string {
    const notesBlock = o.notes
        ? `<p style="margin:18px 0 0;font-size:13px;line-height:1.7;color:#374151;"><strong style="color:#111827;">Your note:</strong> ${o.notes.replace(/\n/g, '<br />')}</p>`
        : '';

    return wrapEmailShell(
        "We've received your order — Cousins Distillery",
        `<tr>
            <td style="padding:28px;">
              <h1 style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.2;color:#111827;">
                Thank you for your order.
              </h1>
              <p style="margin:0 0 10px;font-size:15px;line-height:1.7;color:#374151;">
                Hi ${o.name}, we've received your order request and our team will be in touch shortly at <strong style="color:#111827;">${o.email}</strong> to confirm details and arrange payment and delivery.
              </p>
              <p style="margin:0 0 22px;font-size:13px;line-height:1.7;color:#6b7280;">
                Please note: prices below are retail. Payment and shipping costs will be confirmed by our team prior to fulfillment.
              </p>
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;">Order Summary</p>
              ${renderOrderSummaryTable(o)}
              <p style="margin:22px 0 8px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;">Shipping Address</p>
              <p style="margin:0;font-size:14px;line-height:1.7;color:#1f2937;">${renderAddressBlock(o)}</p>
              ${notesBlock}
            </td>
          </tr>`
    );
}

export function orderConfirmationText(o: OrderDetails): string {
    const line2 = o.addressLine2 ? `${o.addressLine2}\n` : '';
    const notes = o.notes ? `\nNote: ${o.notes}\n` : '';
    return `Thank you for your order, ${o.name}.

We've received your order request and our team will be in touch shortly at ${o.email} to confirm details and arrange payment and delivery.

Order Summary
-------------
${o.productName} x ${o.quantity} @ ${money(o.unitPrice)} = ${money(o.unitPrice * o.quantity)}
Order Total (Retail): ${money(o.totalPrice)}

Shipping Address
----------------
${o.addressLine1}
${line2}${o.city}, ${o.province} ${o.postalCode}
${o.country}
${notes}
Cousins Distillery LTD
747 Appleby Line, Burlington, ON L7L 2Y6
Contact@cousinsdistilleryltd.com
+1 905 512 5943

© ${new Date().getFullYear()} Cousins Distillery Ltd. All rights reserved.`;
}

export function orderInternalNotificationHtml(o: OrderDetails): string {
    const receivedAt = new Date().toISOString();
    const notesRow = o.notes
        ? `<tr><td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;"><p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Notes</p><p style="margin:6px 0 0;font-size:15px;line-height:1.7;color:#111827;">${o.notes.replace(/\n/g, '<br />')}</p></td></tr>`
        : '';

    return wrapEmailShell(
        'New Order Submission',
        `<tr>
            <td style="padding:28px;">
              <h1 style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.2;color:#111827;">
                New order received
              </h1>
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;">Order Summary</p>
              ${renderOrderSummaryTable(o)}
              <p style="margin:22px 0 8px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;">Customer</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;">
                <tr>
                  <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Name</p>
                    <p style="margin:6px 0 0;font-size:15px;color:#111827;">${o.name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Email</p>
                    <p style="margin:6px 0 0;font-size:15px;color:#111827;"><a href="mailto:${o.email}" style="color:#0f766e;text-decoration:none;">${o.email}</a></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Phone</p>
                    <p style="margin:6px 0 0;font-size:15px;color:#111827;"><a href="tel:${o.phone}" style="color:#0f766e;text-decoration:none;">${o.phone}</a></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Shipping Address</p>
                    <p style="margin:6px 0 0;font-size:15px;line-height:1.7;color:#111827;">${renderAddressBlock(o)}</p>
                  </td>
                </tr>
                ${notesRow}
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

export function orderInternalNotificationText(o: OrderDetails): string {
    const line2 = o.addressLine2 ? `${o.addressLine2}\n` : '';
    const notes = o.notes ? `\nNotes: ${o.notes}\n` : '';
    return `New order received.

Customer
--------
Name: ${o.name}
Email: ${o.email}
Phone: ${o.phone}

Order
-----
${o.productName} x ${o.quantity} @ ${money(o.unitPrice)} = ${money(o.unitPrice * o.quantity)}
Order Total (Retail): ${money(o.totalPrice)}

Shipping Address
----------------
${o.addressLine1}
${line2}${o.city}, ${o.province} ${o.postalCode}
${o.country}
${notes}
Received at: ${new Date().toISOString()}`;
}
