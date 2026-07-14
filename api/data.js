import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: "缺少 id" });
  }
  
  try {
    const data = await kv.get(id);
    
    if (!data) {
      return res.status(404).json({ error: "数据不存在或已过期" });
    }
    
    res.json(data);
  } catch (error) {
    console.error("读取错误:", error);
    res.status(500).json({ error: error.message });
  }
}
