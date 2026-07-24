import { createElement, type ReactNode } from 'react';
import parse, { Element, attributesToProps, type DOMNode } from 'html-react-parser';

type Position = 'head' | 'body-start' | 'footer';

interface CmsScriptsProps {
    html: string;
    position: Position;
}

/**
 * Injects admin-authored raw HTML/scripts into the document, server-side.
 *
 * Why server-side: scripts present in the initial server-rendered HTML execute
 * when the browser parses the document. Scripts inserted later via client-side
 * innerHTML do NOT execute — so this must render during SSR, never in an effect.
 *
 * - `head`   → rendered as children of <head>; <meta>/<link>/<script>/<style>
 *              land in the head. Inline <script>/<style> use dangerouslySetInnerHTML
 *              so their exact source is preserved and runs on parse.
 * - `body-start` / `footer` → wrapped in a display:contents container; inline and
 *              external scripts inside execute because they're in the initial HTML.
 */
export function CmsScripts({ html, position }: CmsScriptsProps): ReactNode {
    if (!html || !html.trim()) return null;

    if (position === 'head') {
        return (
            <>
                {parse(html, {
                    replace: (node: DOMNode) => {
                        if (
                            node instanceof Element &&
                            (node.name === 'script' || node.name === 'style')
                        ) {
                            const first = node.children?.[0] as { type?: string; data?: string } | undefined;
                            const inlineCode = first && first.type === 'text' ? first.data ?? '' : '';
                            // Only take over inline content; let external <script src> render normally.
                            if (inlineCode) {
                                const props = attributesToProps(node.attribs);
                                return createElement(node.name, {
                                    ...props,
                                    dangerouslySetInnerHTML: { __html: inlineCode },
                                });
                            }
                        }
                        return undefined;
                    },
                })}
            </>
        );
    }

    return (
        <div
            style={{ display: 'contents' }}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
