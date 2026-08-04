export default function stripHtml(htmlString: string) {
  return htmlString.replace(/<[^>]*>/g, '');
}
