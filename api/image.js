const ALLOWED_DOMAINS = [
  'notion.so',
  'amazonaws.com',
  'prod-files-secure.s3.us-west-2.amazonaws.com',
];

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  let decodedUrl;
  try {
    decodedUrl = decodeURIComponent(url);
    const { hostname } = new URL(decodedUrl);
    const allowed = ALLOWED_DOMAINS.some(d => hostname === d || hostname.endsWith('.' + d));
    if (!allowed) {
      return res.status(403).json({ error: 'Domain not allowed' });
    }
  } catch {
    return res.status(400).json({ error: 'Invalid url' });
  }

  try {
    const upstream = await fetch(decodedUrl);
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: 'Failed to fetch image' });
    }

    const contentType = upstream.headers.get('content-type') || 'image/jpeg';
    const buffer = await upstream.arrayBuffer();

    res.setHeader('Content-Type', contentType);
    // Vercel CDN 快取 24 小時，瀏覽器快取 1 小時
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
    return res.status(200).send(Buffer.from(buffer));

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
