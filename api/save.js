import { put } from "@vercel/blob";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "仅支持 POST" });
  }
  
  try {
    const { excelData, publishDate } = req.body;
    if (!excelData || !Array.isArray(excelData)) {
      return res.status(400).json({ error: "无效数据" });
    }
    
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
    const payload = JSON.stringify({
      excelData,
      publishDate: publishDate || new Date().toLocaleDateString("zh-CN"),
      saveTime: new Date().toISOString()
    });
    
    const blob = await put("workorder-" + id + ".json", payload, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false
    });
    
    const baseUrl = "https://" + req.get("host");
    res.json({
      success: true,
      id,
      shareUrl: baseUrl + "/share.html?id=" + id
    });
  } catch (error) {
    console.error("保存错误:", error);
    res.status(500).json({ error: error.message });
  }
}
