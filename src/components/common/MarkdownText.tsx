import React from 'react';

interface MarkdownTextProps {
  content: string;
  isUser?: boolean;
}

export const MarkdownText: React.FC<MarkdownTextProps> = ({ content, isUser = false }) => {
  if (!content) return null;

  // Split content by paragraphs / double newlines
  const blocks = content.split(/\n\n+/);

  return (
    <div className={`space-y-3 ${isUser ? 'text-white' : 'text-slate-800'}`}>
      {blocks.map((block, bIdx) => {
        const trimmed = block.trim();
        const lines = trimmed.split('\n');

        // Check if block is a bullet list
        const isList = lines.length > 0 && lines.every((line) => line.trim().startsWith('- ') || line.trim().startsWith('* '));

        if (isList) {
          return (
            <ul key={bIdx} className="space-y-1.5 my-2 pl-1">
              {lines.map((line, lIdx) => {
                const itemText = line.trim().replace(/^[-*]\s+/, '');
                return (
                  <li key={lIdx} className="flex items-start gap-2">
                    <span className={isUser ? 'text-indigo-200 font-bold' : 'text-indigo-500 font-bold'}>•</span>
                    <span className="flex-1">{parseInlineMarkdown(itemText, isUser)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Header Check
        if (trimmed.startsWith('# ')) {
          return (
            <h2 key={bIdx} className={`text-base font-extrabold mt-3 mb-1 ${isUser ? 'text-white' : 'text-slate-900'}`}>
              {parseInlineMarkdown(trimmed.replace(/^#\s+/, ''), isUser)}
            </h2>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={bIdx} className={`text-sm font-bold mt-2.5 mb-1 ${isUser ? 'text-white' : 'text-slate-900'}`}>
              {parseInlineMarkdown(trimmed.replace(/^##\s+/, ''), isUser)}
            </h3>
          );
        }
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={bIdx} className={`text-xs font-bold uppercase tracking-wider mt-2 mb-1 ${isUser ? 'text-indigo-100' : 'text-indigo-600'}`}>
              {parseInlineMarkdown(trimmed.replace(/^###\s+/, ''), isUser)}
            </h4>
          );
        }

        // Regular Paragraph
        return (
          <p key={bIdx} className="leading-relaxed">
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {lIdx > 0 && <br />}
                {parseInlineMarkdown(line, isUser)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
};

function parseInlineMarkdown(text: string, isUser: boolean): React.ReactNode {
  // Regex matches **bold**, *italic*, and `inline code`
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className={`font-bold ${isUser ? 'text-white' : 'text-slate-950'}`}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={idx} className="italic">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={idx}
          className={`font-mono text-xs px-1.5 py-0.5 rounded ${
            isUser
              ? 'bg-indigo-700 text-indigo-100 border border-indigo-500'
              : 'bg-slate-100 text-indigo-700 border border-slate-200'
          }`}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}