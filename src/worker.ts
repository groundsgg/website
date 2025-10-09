// Cloudflare Workers + Static Assets with strong security headers
export default {
  async fetch(request, env): Promise<Response> {
    // Try static assets first
    if (!env.ASSETS) {
      return new Response("Static assets not configured", { status: 500 });
    }
    
    const res = await env.ASSETS.fetch(request);
    const final = res.status === 404
      ? await env.ASSETS.fetch(new Request(new URL("/404.html", request.url)))
      : res;
    return withSecurityHeaders(final, res.status === 404 ? 404 : final.status);
  }
};

function withSecurityHeaders(res: Response, status = 200): Response {
  const headers = new Headers(res.headers);

  // Content Security Policy: self only (no external fonts/images)
  headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "base-uri 'none'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "script-src 'self'",
      "style-src 'self'",
      "font-src 'self'",
      "img-src 'self' data:",
      "connect-src 'self'",
      "form-action 'none'",
      "upgrade-insecure-requests"
    ].join("; ")
  );

  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Permissions-Policy", "geolocation=()");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  headers.set("Cross-Origin-Resource-Policy", "same-site");

  return new Response(res.body, { status, headers });
}
