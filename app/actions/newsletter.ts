'use server';

import { Resend } from 'resend';
import { getSupabaseClient } from '@/lib/supabase';
import {
    newsletterConfirmationHtml,
    newsletterConfirmationText,
} from '@/lib/emails/newsletter-confirmation';

async function sendNewsletterConfirmationEmail(email: string) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('[newsletter] RESEND_API_KEY is not set');
        return;
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
        from: 'Cousins Distillery <hello@cousinsdistillery.com>',
        to: email,
        subject: "You're subscribed to the Cousins Distillery newsletter",
        html: newsletterConfirmationHtml(email),
        text: newsletterConfirmationText(email),
    });

    if (error) {
        console.error('[newsletter] Resend error:', JSON.stringify(error));
    } else {
        console.log('[newsletter] Email sent, id:', data?.id);
    }
}

export async function subscribeNewsletter(
    email: string
): Promise<{ success: boolean; message: string }> {
    const trimmed = email?.toLowerCase().trim();

    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        return { success: false, message: 'Please enter a valid email address.' };
    }

    try {
        const supabase = getSupabaseClient();

        const { error: dbError } = await supabase
            .from('newsletter_subscribers')
            .insert({ email: trimmed });

        if (dbError) {
            if (dbError.code === '23505') {
                // Already subscribed — resend confirmation anyway
                await sendNewsletterConfirmationEmail(trimmed);
                return {
                    success: true,
                    message: "You're already subscribed. Check your inbox for our latest updates.",
                };
            }

            console.error('[newsletter] Supabase insert error:', JSON.stringify(dbError));
            return { success: false, message: 'Something went wrong. Please try again.' };
        }

        await sendNewsletterConfirmationEmail(trimmed);

        return {
            success: true,
            message: "You're subscribed! Welcome to the Cousins Distillery family.",
        };
    } catch (err) {
        console.error('[newsletter] Unexpected error:', err);
        return { success: false, message: 'Something went wrong. Please try again.' };
    }
}
