import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
    title: "Cousins CMS",
    robots: { index: false, follow: false },
};

/**
 * Base wrapper for the whole /admin area (including the public login page).
 * No auth guard here — that lives in the (dashboard) group layout so that
 * /admin/login stays reachable without an infinite redirect.
 */
export default function AdminBaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="admin-root">{children}</div>;
}
