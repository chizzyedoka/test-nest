interface ParsedMarkdown {
  type: string;
  content: string;
}

function parseMarkdown(text: string): string {
  // Bold text (wrapped in ** or __)
  text = text.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');

  // Italic text (wrapped in * or _)
  text = text.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');

  // Bullet points
  text = text.replace(/^\s*-\s+(.+)/gm, '<li>$1</li>');
  text = text.replace(/(<li>.*<\/li>)/gm, '<ul>$1</ul>');

  // Headers
  text = text.replace(/^#{1}\s+(.+)/gm, '<h1>$1</h1>');
  text = text.replace(/^#{2}\s+(.+)/gm, '<h2>$1</h2>');
  text = text.replace(/^#{3}\s+(.+)$/gm, '<h3>$1</h3>');

  // Line breaks
  text = text.replace(/\n/g, '<br/>');

  return text;
}

// Helper function to extract structured data from markdown
function extractStructuredData(text: string): Record<string, string> {
  const data: Record<string, string> = {};
  const lines = text.split('\n');

  lines.forEach(line => {
    const match = line.match(/^-\s+\*\*(.*?)\*\*:\s+(.*?)$/);
    if (match) {
      const [, key, value] = match;
      data[key.trim()] = value.trim();
    }
  });

  return data;
}

export { parseMarkdown, extractStructuredData };