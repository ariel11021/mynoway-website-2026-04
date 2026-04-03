export default async function handler(req, res) {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!token || !databaseId) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          property: '上架',
          checkbox: { equals: true }
        },
        sorts: [
          { timestamp: 'created_time', direction: 'descending' }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();

    const templates = data.results.map(page => {
      const props = page.properties;

      const name = props['名稱']?.title?.[0]?.plain_text || '';

      const files = props['封面圖']?.files || [];
      let imageUrl = '';
      if (files.length > 0) {
        const file = files[0];
        imageUrl = file.type === 'external' ? file.external.url : (file.file?.url || '');
      }
      const image = imageUrl ? `/api/image?url=${encodeURIComponent(imageUrl)}` : '';

      const price = props['價格']?.rich_text?.[0]?.plain_text || '';
      const link = props['連結']?.url || '';
      const categories = (props['分類']?.multi_select || []).map(t => t.name);

      return { id: page.id, name, image, price, link, categories };
    });

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json(templates);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
