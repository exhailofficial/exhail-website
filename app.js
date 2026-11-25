const grid=document.querySelector('#release-grid');
const statusEl=document.querySelector('#feed-status');
const playlist='https://soundcloud.com/exhailmusic/sets/ex-hail-releases';
const fallback=[
 {title:'2026 SHOWCASE',subtitle:'EXHAIL — 2026',kind:'SHOWCASE',artwork:'assets/showcase-2026.png',url:playlist},
 {title:'AEON',subtitle:'EXHAIL — ORIGINAL RELEASE',kind:'ORIGINAL',artwork:'assets/aeon.png',url:playlist},
 {title:'BE WITH YOU',subtitle:'ENRIQUE IGLESIAS — EXHAIL BOOTLEG',kind:'BOOTLEG',artwork:'assets/be-with-you-bootleg.png',url:playlist},
 {title:'EYES CUT DEEPER',subtitle:'SUBTRONICS x INÉZ — EXHAIL REMIX',kind:'REMIX',artwork:'assets/eyes-cut-deeper-remix.png',url:playlist}
];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(items,live=false){grid.innerHTML=items.slice(0,4).map((x,i)=>`<article class="specimen"><a class="specimen-image" href="${esc(x.url||playlist)}" target="_blank" rel="noreferrer"><img src="${esc(x.artwork)}" alt="${esc(x.title)} artwork"><span class="specimen-number">0${i+1}</span><span class="specimen-open">OPEN ↗</span></a><div class="specimen-meta"><span>${esc(x.kind||'TRANSMISSION')}</span><span>EXHAIL / 0${i+1}</span></div><h3>${esc(x.title)}</h3><p>${esc(x.subtitle||'EXHAIL AUDIO ARCHIVE')}</p></article>`).join('');if(live){statusEl.innerHTML='<i></i> PLAYLIST ORDER / LIVE';statusEl.classList.add('connected');}}
function connectPlaylist(){const frame=document.querySelector('#soundcloud-playlist');if(!frame||!window.SC?.Widget)return;const widget=SC.Widget(frame);widget.bind(SC.Widget.Events.READY,()=>{widget.getSounds(sounds=>{if(!Array.isArray(sounds)||!sounds.length)return;const tracks=sounds.slice(0,4).map(sound=>({title:sound.title||'UNTITLED TRANSMISSION',subtitle:sound.user?.username||'EXHAIL',kind:'PLAYLIST TRANSMISSION',artwork:sound.artwork_url||sound.user?.avatar_url||'assets/exhail-logo.svg',url:sound.permalink_url||playlist}));render(tracks,true);});});}
render(fallback);if(window.SC?.Widget)connectPlaylist();else window.addEventListener('load',connectPlaylist,{once:true});
const boot=document.querySelector('#boot');window.addEventListener('load',()=>setTimeout(()=>boot.classList.add('done'),1800));
const aura=document.querySelector('.cursor-aura');window.addEventListener('pointermove',e=>{aura.style.left=e.clientX+'px';aura.style.top=e.clientY+'px';});
const zones=[...document.querySelectorAll('.zone')];if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in-view');}),{threshold:.18});zones.forEach(z=>io.observe(z));}
