import { list } from "@vercel/blob";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: "缺少 id" });
  }
  
  try {
    const blobName = "workorder-" + id + ".json";
    const { blobs } = await list();
    const target = blobs.find(b => b.pathname === blobName);
    
    if (!target) {
      return res.status(404).json({ error: "数据不存在或已过期" });
    }
    
    const response = await fetch(target.url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("读取错误:", error);
    res.status(500).json({ error: error.message });
  }
}
