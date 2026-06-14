/**
 * RichText — lightweight inline emphasis renderer.
 *
 * Convention (applied in lib/content.ts copy strings):
 *   *word or phrase*   → amber highlighter mark  (key terms, rates, dollar amounts)
 *   **word or phrase** → bold navy emphasis       (strong statements)
 *
 * Designed to render a single string or array of paragraphs.
 * Never uses dangerouslySetInnerHTML — purely JSX.
 */

import { Fragment } from "react";

type Segment =
  | { type: "text"; content: string }
  | { type: "highlight"; content: string }
  | { type: "bold"; content: string };

function parseSegments(text: string): Segment[] {
  // Process **bold** first, then *highlight* to avoid conflicts.
  // We split on a combined regex that matches both markers.
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts: Segment[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push({ type: "text", content: text.slice(last, match.index) });
    }
    const raw = match[0];
    if (raw.startsWith("**")) {
      parts.push({ type: "bold", content: raw.slice(2, -2) });
    } else {
      parts.push({ type: "highlight", content: raw.slice(1, -1) });
    }
    last = match.index + raw.length;
  }
  if (last < text.length) {
    parts.push({ type: "text", content: text.slice(last) });
  }
  return parts;
}

function RichLine({ text }: { text: string }) {
  const segments = parseSegments(text);
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.type === "highlight")
          return <mark key={i} className="highlight">{seg.content}</mark>;
        if (seg.type === "bold")
          return <strong key={i} className="emphasis">{seg.content}</strong>;
        return <Fragment key={i}>{seg.content}</Fragment>;
      })}
    </>
  );
}

interface RichTextProps {
  /** A single string or array of paragraph strings. */
  children: string | string[];
  className?: string;
  /** Renders as a single <span> inline rather than block <p> elements. */
  inline?: boolean;
}

export default function RichText({ children, className, inline }: RichTextProps) {
  if (inline || typeof children === "string") {
    const text = typeof children === "string" ? children : children.join(" ");
    if (inline) {
      return <span className={className}><RichLine text={text} /></span>;
    }
    return <p className={className}><RichLine text={text} /></p>;
  }

  return (
    <div className={className}>
      {(children as string[]).map((para, i) => (
        <p key={i} className={i > 0 ? "mt-4" : undefined}>
          <RichLine text={para} />
        </p>
      ))}
    </div>
  );
}
