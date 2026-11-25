const FEED = 'https://feeds.soundcloud.com/users/soundcloud:users:1022394793/sounds.rss';
const CACHE_KEY = new Request('https://exhail-internal.invalid/rss-cache');
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname !== '/rss') return new Response('EXHAIL RSS relay. Request /rss', {headers:{'content-type':'text/plain; charset=utf-8'}});
    if (request.method === 'OPTIONS') return new Response(null,{headers:corsHeaders()});
    if (request.method !== 'GET') return new Response('Method not allowed',{status:405,headers:corsHeaders()});
    const cache = caches.default;
    let response = await cache.match(CACHE_KEY);
    if (!response) {
      try {
        const upstream = await fetch(FEED,{headers:{'User-Agent':'EXHAIL-site/1.0 RSS reader'},cf:{cacheTtl:600,cacheEverything:true}});
        if (!upstream.ok) throw new Error(`SoundCloud returned ${upstream.status}`);
        const body = await upstream.text();
        if (!body.includes('<rss') && !body.includes('<feed')) throw new Error('SoundCloud response was not RSS/XML');
        response = new Response(body,{headers:{'content-type':'application/rss+xml; charset=utf-8','cache-control':'public, max-age=600',...corsHeaders()}});
        ctx.waitUntil(cache.put(CACHE_KEY,response.clone()));
      } catch (e) {
        return new Response(`RSS sync unavailable: ${e.message}`,{status:502,headers:{'content-type':'text/plain; charset=utf-8',...corsHeaders()}});
      }
    }
    const headers = new Headers(response.headers); for (const [k,v] of Object.entries(corsHeaders())) headers.set(k,v);
    headers.set('cache-control','public, max-age=600');
    return new Response(response.body,{status:200,headers});
  }
};
function corsHeaders(){return {'access-control-allow-origin':'*','access-control-allow-methods':'GET, OPTIONS','access-control-allow-headers':'Content-Type','x-content-type-options':'nosniff'};}
