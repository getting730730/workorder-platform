import { put } from "@vercel/blob";

export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const body = await req.json();
    const { excelData, publishDate } = body;

    if (!excelData || !Array.isArray(excelData)) {
      return new Response(JSON.stringify({ error: "Invalid data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
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

    const host = req.headers.get("host") || "localhost";
    const baseUrl = "https://" + host;

    return new Response(JSON.stringify({
      success: true,
      id: id,
      shareUrl: baseUrl + "/share.html?id=" + id
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
