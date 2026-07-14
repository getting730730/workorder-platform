import { put } from "@vercel/blob";

export async function POST(request) {
  try {
    const body = await request.json();
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

    const host = request.headers.get("host") || "localhost";
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

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
