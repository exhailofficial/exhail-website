const grid = document.querySelector('#release-grid');
const statusEl = document.querySelector('#feed-status');
const feedState = document.querySelector('.feed-state');
const playlist = 'https://soundcloud.com/exhailmusic/sets/ex-hail-releases';
const fallback = [
 {title:'2026 SHOWCASE',subtitle:'EXHAIL — 2026',kind:'SHOWCASE',artwork:'assets/showcase-2026.png',url:playlist},
 {title:'AEON',subtitle:'EXHAIL — ORIGINAL RELEASE',kind:'ORIGINAL',artwork:'assets/aeon.png',url:playlist},
 {title:'BE WITH YOU',subtitle:'ENRIQUE IGLESIAS — EXHAIL BOOTLEG',kind:'BOOTLEG',artwork:'assets/be-with-you-bootleg.png',url:playlist},
 {title:'EYES CUT DEEPER',subtitle:'SUBTRONICS x INÉZ — EXHAIL REMIX',kind:'REMIX',artwork:'assets/eyes-cut-deeper-remix.png',url:playlist}
];
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function render(items){grid.innerHTML=items.map(x=>`<article class="release-card"><div class="cover"><img loading="lazy" src="${esc(x.artwork)}" alt="${esc(x.title)} artwork"></div><div class="release-info"><div class="release-type">${esc(x.kind||'RELEASE')}</div><h3>${esc(x.title)}</h3><p>${esc(x.subtitle||'EXHAIL')}</p><a href="${esc(x.url||playlist)}" target="_blank" rel="noreferrer">LISTEN / VIEW ↗</a></div></article>`).join('');}
function decode(s=''){const d=document.createElement('textarea');d.innerHTML=s;return d.value;}
function getTag(node, selectors){for(const sel of selectors){const el=node.querySelector(sel);if(el)return el.getAttribute('href')||el.getAttribute('url')||el.textContent||'';}return '';}
function imageFrom(item){const direct=getTag(item,['itunes\\:image','image','media\\:thumbnail','media\\:content']);if(direct&&/^https?:/i.test(direct))return direct;const html=getTag(item,['description','content\\:encoded']);const m=html.match(/<img[^>]+src=["']([^"']+)/i);return m?decode(m[1]):'';}
function parseFeed(xml){const doc=new DOMParser().parseFromString(xml,'text/xml');if(doc.querySelector('parsererror'))throw new Error('Invalid RSS response');return [...doc.querySelectorAll('item')].map(item=>({title:decode(getTag(item,['title']))||'UNTITLED TRANSMISSION',subtitle:decode(getTag(item,['itunes\\:subtitle','description'])).replace(/<[^>]*>/g,'').slice(0,110),kind:'SOUNDCLOUD RELEASE',artwork:imageFrom(item),url:getTag(item,['link'])||playlist})).filter(x=>x.artwork);}
async function sync(){const endpoint=window.EXHAIL_CONFIG?.rssProxy;if(!endpoint){render(fallback);return;}try{const res=await fetch(endpoint,{cache:'no-store'});if(!res.ok)throw new Error('Feed proxy unavailable');const xml=await res.text();const items=parseFeed(xml);if(!items.length)throw new Error('No feed artwork found');render(items);statusEl.textContent=`LIVE RSS SYNC / ${items.length} ITEMS`;feedState.classList.add('live');}catch(err){render(fallback);statusEl.textContent='LOCAL ARCHIVE / RSS SYNC ERROR';console.warn('EXHAIL feed sync:',err);}}
render(fallback);sync();
const boot=document.querySelector('#boot');window.addEventListener('load',()=>setTimeout(()=>boot.classList.add('done'),1900));
const glow=document.querySelector('.cursor-glow');window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';});
