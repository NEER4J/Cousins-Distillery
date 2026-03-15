import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cousins Distillery | Coming Soon',
  description: 'Cousins Distillery is cultivating something special. Our premium craft spirits—Vodka, Whiskey, and Tequila—will be available soon.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0F0A08] font-body text-white antialiased selection:bg-[#D1BB8A] selection:text-[#0F0A08]">
      {children}
    </div>
  );
}
