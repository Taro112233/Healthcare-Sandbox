// lib/rich-text-utils.ts
export function extractTextFromRichText(content: string): string {
  try {
    const json = JSON.parse(content);
    
    // Recursive function to extract text from Tiptap JSON
    function extractText(node: any): string {
      if (!node) return '';
      
      if (node.type === 'text') {
        return node.text || '';
      }
      
      if (node.content) {
        return node.content.map((child: any) => extractText(child)).join('');
      }
      
      return '';
    }
    
    return extractText(json).trim();
  } catch {
    // If not JSON, return as-is (backward compatibility)
    return content;
  }
}

export function truncateRichText(content: string, maxLength: number = 150): string {
  const text = extractTextFromRichText(content);
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}