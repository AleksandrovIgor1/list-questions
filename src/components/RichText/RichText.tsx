import { useMemo } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";

interface RichTextProps {
  content: string
}

export const RichText = ({ content }: RichTextProps) => {
  const cleanHtml = useMemo(() => {
    if (typeof content !== "string") return "";

    let normalized = content.trim();

    if (normalized.startsWith("<p>") && normalized.endsWith("</p>")) {
      normalized = normalized.slice(3, -4);
    }

    const parsed = marked.parse(normalized);

    return DOMPurify.sanitize(parsed);
  }, [content]);

  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};
