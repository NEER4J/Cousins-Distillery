'use server';

import { Resend } from 'resend';
import { getSupabaseClient } from '@/lib/supabase';
import { getProduct } from '@/lib/products';
import {
    orderConfirmationHtml,
    orderConfirmationText,
    orderInternalNotificationHtml,
    orderInternalNotificationText,
    type OrderDetails,
} from '@/lib/emails/order-confirmation';

const ADMIN_EMAIL = process.env.RESEND_ADMIN_EMAIL ?? 'Contact@cousinsdistilleryltd.com';
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'hello@cousinsdistillery.com';

export interface OrderFormData {
    name: string;
    email: string;
    phone: string;
    productSlug: string;
    quantity: number;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    notes?: string;
}

async function sendOrderEmails(order: OrderDetails) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('[order] RESEND_API_KEY is not set');
        return;
    }

    const resend = new Resend(apiKey);

    const { error: userEmailError } = await resend.emails.send({
        from: `Cousins Distillery <${RESEND_FROM_EMAIL}>`,
        to: order.email,
        subject: "We've received your order — Cousins Distillery",
        html: orderConfirmationHtml(order),
        text: orderConfirmationText(order),
    });

    if (userEmailError) {
        console.error('[order] User confirmation email error:', JSON.stringify(userEmailError));
    }

    const { error: teamEmailError } = await resend.emails.send({
        from: `Cousins Distillery Website <${RESEND_FROM_EMAIL}>`,
        to: ADMIN_EMAIL,
        subject: `New Order: ${order.productName} x ${order.quantity} — from ${order.name}`,
        html: orderInternalNotificationHtml(order),
        text: orderInternalNotificationText(order),
        replyTo: order.email,
    });

    if (teamEmailError) {
        console.error('[order] Team notification email error:', JSON.stringify(teamEmailError));
    }
}

export async function submitOrderForm(
    formData: OrderFormData
): Promise<{ success: boolean; message: string }> {
    const name = formData.name?.trim();
    const email = formData.email?.toLowerCase().trim();
    const phone = formData.phone?.trim();
    const productSlug = formData.productSlug?.trim();
    const quantity = Number(formData.quantity);
    const addressLine1 = formData.addressLine1?.trim();
    const addressLine2 = formData.addressLine2?.trim() || undefined;
    const city = formData.city?.trim();
    const province = formData.province?.trim();
    const postalCode = formData.postalCode?.trim();
    const country = formData.country?.trim() || 'Canada';
    const notes = formData.notes?.trim() || undefined;

    if (!name || name.length < 2) {
        return { success: false, message: 'Please enter your full name.' };
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { success: false, message: 'Please enter a valid email address.' };
    }
    if (!phone || phone.length < 7) {
        return { success: false, message: 'Please enter a valid phone number.' };
    }
    const product = getProduct(productSlug);
    if (!product) {
        return { success: false, message: 'Please select a valid product.' };
    }
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > 99) {
        return { success: false, message: 'Quantity must be between 1 and 99.' };
    }
    if (!addressLine1) {
        return { success: false, message: 'Please enter your shipping address.' };
    }
    if (!city || !province || !postalCode) {
        return { success: false, message: 'Please complete the city, province, and postal code.' };
    }

    const unitPrice = product.retailPrice;
    const totalPrice = Number((unitPrice * quantity).toFixed(2));

    const order: OrderDetails = {
        name,
        email,
        phone,
        productName: product.shortName,
        productSlug: product.slug,
        quantity,
        unitPrice,
        totalPrice,
        addressLine1,
        addressLine2,
        city,
        province,
        postalCode,
        country,
        notes,
    };

    try {
        const supabase = getSupabaseClient();

        const { error: dbError } = await supabase.from('orders').insert({
            name,
            email,
            phone,
            product_slug: product.slug,
            product_name: product.shortName,
            quantity,
            unit_price: unitPrice,
            total_price: totalPrice,
            address_line1: addressLine1,
            address_line2: addressLine2 ?? null,
            city,
            province,
            postal_code: postalCode,
            country,
            notes: notes ?? null,
        });

        if (dbError) {
            console.error('[order] Supabase insert error:', JSON.stringify(dbError));
            return { success: false, message: 'Something went wrong. Please try again.' };
        }

        await sendOrderEmails(order);

        return {
            success: true,
            message:
                "Thank you! We've received your order request and will be in touch shortly to confirm payment and delivery.",
        };
    } catch (err) {
        console.error('[order] Unexpected error:', err);
        return { success: false, message: 'Something went wrong. Please try again.' };
    }
}
