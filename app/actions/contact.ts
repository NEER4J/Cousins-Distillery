'use server';

import { Resend } from 'resend';
import { getSupabaseClient } from '@/lib/supabase';
import {
    contactConfirmationHtml,
    contactConfirmationText,
    contactInternalNotificationHtml,
} from '@/lib/emails/contact-confirmation';

const TEAM_EMAIL = 'hello@cousinsdistillery.com';

async function sendContactEmails(
    name: string,
    email: string,
    subject: string,
    message: string
) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('[contact] RESEND_API_KEY is not set');
        return;
    }

    const resend = new Resend(apiKey);

    // 1. Confirmation email to the user
    const { error: userEmailError } = await resend.emails.send({
        from: 'Cousins Distillery <hello@cousinsdistillery.com>',
        to: email,
        subject: "We've received your message — Cousins Distillery",
        html: contactConfirmationHtml(name, email, message),
        text: contactConfirmationText(name, email, message),
    });

    if (userEmailError) {
        console.error('[contact] User confirmation email error:', JSON.stringify(userEmailError));
    }

    // 2. Internal notification to the team
    const { error: teamEmailError } = await resend.emails.send({
        from: 'Cousins Distillery Website <hello@cousinsdistillery.com>',
        to: TEAM_EMAIL,
        subject: `New Contact: ${subject} — from ${name}`,
        html: contactInternalNotificationHtml(name, email, subject, message),
        text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
        replyTo: email,
    });

    if (teamEmailError) {
        console.error('[contact] Team notification email error:', JSON.stringify(teamEmailError));
    }
}

export async function submitContactForm(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
}): Promise<{ success: boolean; message: string }> {
    const name = formData.name?.trim();
    const email = formData.email?.toLowerCase().trim();
    const subject = formData.subject?.trim();
    const message = formData.message?.trim();

    // Validation
    if (!name || name.length < 2) {
        return { success: false, message: 'Please enter your full name.' };
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { success: false, message: 'Please enter a valid email address.' };
    }
    if (!subject || subject.length < 2) {
        return { success: false, message: 'Please enter a subject.' };
    }
    if (!message || message.length < 10) {
        return { success: false, message: 'Please enter a message (at least 10 characters).' };
    }

    try {
        const supabase = getSupabaseClient();

        const { error: dbError } = await supabase
            .from('contact_submissions')
            .insert({ name, email, subject, message });

        if (dbError) {
            console.error('[contact] Supabase insert error:', JSON.stringify(dbError));
            return { success: false, message: 'Something went wrong. Please try again.' };
        }

        await sendContactEmails(name, email, subject, message);

        return {
            success: true,
            message: "Thank you! We've received your message and will be in touch within 1–2 business days.",
        };
    } catch (err) {
        console.error('[contact] Unexpected error:', err);
        return { success: false, message: 'Something went wrong. Please try again.' };
    }
}
