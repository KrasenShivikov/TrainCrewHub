export async function loadHtml(relativePath, importMetaUrl) {
  const resourceUrl = new URL(relativePath, importMetaUrl);
  const response = await fetch(resourceUrl);

  if (!response.ok) {
    throw new Error(`Failed to load HTML from ${resourceUrl.pathname}`);
  }

  return response.text();
}
