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
function render(items,live=false){grid.innerHTML=items.slice(0,4).map((x,i)=>`<article class="specimen"><a class="specimen-image" href="${esc(x.url||playlist)}" target="_blank" rel="noreferrer"><img src="${esc(x.artwork)}" alt="${esc(x.title)} artwork" loading="lazy" decoding="async"><span class="specimen-number">0${i+1}</span><span class="specimen-open">OPEN ↗</span></a><div class="specimen-meta"><span>${esc(x.kind||'TRANSMISSION')}</span><span>EXHAIL / 0${i+1}</span></div><h3>${esc(x.title)}</h3><p>${esc(x.subtitle||'EXHAIL AUDIO ARCHIVE')}</p></article>`).join('');if(live){statusEl.innerHTML='<i></i> PLAYLIST ORDER / LIVE';statusEl.classList.add('connected');}}
function connectPlaylist(){const frame=document.querySelector('#soundcloud-playlist');if(!frame||!window.SC?.Widget)return;const widget=SC.Widget(frame);widget.bind(SC.Widget.Events.READY,()=>{widget.getSounds(sounds=>{if(!Array.isArray(sounds)||!sounds.length)return;const tracks=sounds.slice(0,4).map(sound=>{const title=(sound.title||'').toLowerCase();let local='';if(title.includes('2026 showcase'))local='assets/showcase-2026.png';else if(title.includes('aeon'))local='assets/aeon.png';else if(title.includes('be with you'))local='assets/be-with-you-bootleg.png';else if(title.includes('eyes cut deeper'))local='assets/eyes-cut-deeper-remix.png';let art=sound.artwork_url||sound.user?.avatar_url||'assets/exhail-logo.svg';if(art.includes('sndcdn.com'))art=art.replace(/-large\.(jpg|jpeg|png)$/i,'-t500x500.$1');return {title:sound.title||'UNTITLED TRANSMISSION',subtitle:sound.user?.username||'EXHAIL',kind:'PLAYLIST TRANSMISSION',artwork:local||art,url:sound.permalink_url||playlist};});render(tracks,true);});});}
render(fallback);if(window.SC?.Widget)connectPlaylist();else window.addEventListener('load',connectPlaylist,{once:true});
const boot=document.querySelector('#boot');
const bootMark=document.querySelector('#boot-mark');
const bootStatus=document.querySelector('#boot-status');
const heroMark=document.querySelector('#hero-mark');
window.addEventListener('load',()=>{
  if(bootMark)bootMark.classList.add('transmitting');
  if(bootStatus)bootStatus.innerHTML='SIGNAL DETECTED<span>_</span>';
  setTimeout(()=>{if(bootStatus)bootStatus.innerHTML='IDENTITY LOCKED<span>_</span>';},850);
  setTimeout(()=>{boot?.classList.add('done');},2100);
  setTimeout(()=>{heroMark?.classList.add('signal-hit');setTimeout(()=>heroMark?.classList.remove('signal-hit'),650);},2150);
});
const aura=document.querySelector('.cursor-aura');window.addEventListener('pointermove',e=>{aura.style.left=e.clientX+'px';aura.style.top=e.clientY+'px';});
const zones=[...document.querySelectorAll('.zone')];if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in-view');}),{threshold:.18});zones.forEach(z=>io.observe(z));}

// Procedural EXHAIL environment: wireframe architecture, signal particles and moving interference.
(()=>{
 const canvas=document.querySelector('#signal-art'); if(!canvas)return;
 const ctx=canvas.getContext('2d',{alpha:true}); let w=0,h=0,dpr=1,t=0,points=[],mouse={x:-1000,y:-1000};
 const resize=()=>{dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);points=Array.from({length:Math.min(115,Math.floor(w*h/10500))},()=>({x:Math.random()*w,y:Math.random()*h,z:.3+Math.random()*.9,v:.12+Math.random()*.48,p:Math.random()*6.28}));};
 const draw=()=>{t+=.006;ctx.clearRect(0,0,w,h);
  // Atmospheric light wells drift independently of the scroll position.
  const gx=w*(.68+Math.sin(t*.7)*.12),gy=h*(.44+Math.cos(t*.53)*.12),g=ctx.createRadialGradient(gx,gy,0,gx,gy,Math.max(w,h)*.56);g.addColorStop(0,'rgba(40,174,205,.10)');g.addColorStop(.45,'rgba(12,80,105,.045)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
  // Perspective lattice / impossible architecture.
  ctx.save();ctx.translate(w*.53,h*.52);ctx.rotate(-.12+Math.sin(t*.22)*.025);ctx.strokeStyle='rgba(112,224,240,.105)';ctx.lineWidth=.7;
  for(let i=-12;i<=12;i++){let x=i*42+Math.sin(t+i*.2)*8;ctx.beginPath();ctx.moveTo(x,-h);ctx.lineTo(x*.12,h);ctx.stroke();}
  for(let j=0;j<15;j++){let y=(j/14-.5)*h*1.8;ctx.beginPath();ctx.moveTo(-w,y);ctx.lineTo(w,y*.18);ctx.stroke();}ctx.restore();
  // Drifting luminous debris with short motion vectors.
  for(const p of points){p.y-=p.v*p.z;if(p.y<-10){p.y=h+10;p.x=Math.random()*w;}p.x+=Math.sin(t+p.p)*.22;const dx=p.x-mouse.x,dy=p.y-mouse.y,dist=Math.hypot(dx,dy);if(dist<125){p.x+=dx/(dist||1)*.8;p.y+=dy/(dist||1)*.8;}ctx.fillStyle=`rgba(154,239,248,${.16+p.z*.35})`;ctx.fillRect(p.x,p.y,p.z*1.5,p.z*1.5);if(p.z>.95){ctx.strokeStyle='rgba(91,220,244,.18)';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-5,p.y+12);ctx.stroke();}}
  // Occasional horizontal signal tears.
  if(Math.sin(t*2.7)>.985){const y=Math.random()*h;ctx.fillStyle='rgba(90,229,255,.12)';ctx.fillRect(0,y,w,1+Math.random()*3);ctx.fillStyle='rgba(255,48,143,.08)';ctx.fillRect(Math.random()*w,y+4,w*.18,1);}
  requestAnimationFrame(draw);
 };resize();addEventListener('resize',resize,{passive:true});addEventListener('pointermove',e=>{mouse.x=e.clientX;mouse.y=e.clientY},{passive:true});draw();
})();
// Split-channel cursor with restrained, intermittent chromatic glitches.
(()=>{const cursor=document.querySelector('.glitch-cursor'),aura=document.querySelector('.cursor-aura');if(!cursor)return;let last=0;addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';cursor.classList.add('active');if(aura){aura.style.left=e.clientX+'px';aura.style.top=e.clientY+'px';}const now=performance.now();if(now-last>180&&Math.random()>.76){cursor.classList.add('jolt');setTimeout(()=>cursor.classList.remove('jolt'),95);last=now;}},{passive:true});addEventListener('pointerdown',()=>{cursor.classList.add('jolt');setTimeout(()=>cursor.classList.remove('jolt'),140);});addEventListener('pointerleave',()=>cursor.classList.remove('active'));})();
