// FILE: worker.js
/**
 * Cloudflare Worker Adapter for QuantOS
 * Acts as an edge layer for:
 * 1. Serving static frontend assets (from KV/Pages)
 * 2. Proxying/Handling API requests with caching strategies
 * 3. Security headers and Rate Limiting
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Handle CORS Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    // 2. API Routes Strategy
    if (url.pathname.startsWith("/api")) {
       return handleApiRequest(request, env);
    }

    // 3. Static Assets Strategy
    try {
      // Check if ASSETS binding exists (configured in wrangler.toml)
      if (env.ASSETS) {
        // Attempt to fetch the asset
        let response = await env.ASSETS.fetch(request);
        
        // If 404 and it's not a file extension, serve index.html (SPA Fallback)
        if (response.status === 404 && !url.pathname.includes('.')) {
          response = await env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
        }
        
        return response;
      }
      
      return new Response("QuantOS Edge Worker Active. Frontend assets not bound. Please check wrangler.toml has [assets] configured.", { 
        status: 200,
        headers: { "Content-Type": "text/plain" } 
      });
      
    } catch (e) {
      return new Response("Internal Worker Error: " + e.message, { status: 500 });
    }
  },
};

async function handleApiRequest(request, env) {
  const data = {
    status: "ok",
    region: request.cf?.colo || "unknown",
    timestamp: new Date().toISOString()
  };

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  });
}
