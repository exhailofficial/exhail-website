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
const aura=document.querySelector('.cursor-aura');window.addEventListener('pointermove',e=>{if(aura){aura.style.left=e.clientX+'px';aura.style.top=e.clientY+'px';}});
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

// Futuristic instrument cursor: stable reticle, expands over interactive elements.
(()=>{const cursor=document.querySelector('.interface-cursor');if(!cursor||matchMedia('(pointer:coarse)').matches)return;addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';cursor.classList.add('active');},{passive:true});document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('pointerenter',()=>cursor.classList.add('hover'));el.addEventListener('pointerleave',()=>cursor.classList.remove('hover'));});addEventListener('pointerleave',()=>cursor.classList.remove('active'));})();

// Organic generative environment: flowing translucent membranes, drifting spores,
// and luminous filaments. No photographic reference assets are used as backgrounds.
(()=>{
 const canvas=document.querySelector('#signal-art');if(!canvas)return;const ctx=canvas.getContext('2d',{alpha:true});let w=0,h=0,dpr=1,t=0,spores=[];const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let mouse={x:-1000,y:-1000};
 const resize=()=>{dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);spores=Array.from({length:Math.min(95,Math.floor(w*h/12500))},()=>({x:Math.random()*w,y:Math.random()*h,r:.5+Math.random()*2.4,v:.12+Math.random()*.42,p:Math.random()*Math.PI*2}));};
 const blob=(cx,cy,rx,ry,phase,color,alpha)=>{ctx.save();ctx.translate(cx,cy);ctx.rotate(phase*.12);ctx.beginPath();for(let i=0;i<=120;i++){const a=i/120*Math.PI*2;const wob=1+.13*Math.sin(a*3+phase)+.07*Math.cos(a*5-phase*.7);const x=Math.cos(a)*rx*wob,y=Math.sin(a)*ry*(1+.08*Math.sin(a*4+phase));if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.closePath();const g=ctx.createRadialGradient(-rx*.25,-ry*.3,2,0,0,Math.max(rx,ry));g.addColorStop(0,color.replace('ALPHA',String(alpha*.85)));g.addColorStop(.55,color.replace('ALPHA',String(alpha*.24)));g.addColorStop(1,color.replace('ALPHA','0'));ctx.fillStyle=g;ctx.fill();ctx.strokeStyle=color.replace('ALPHA',String(alpha*.55));ctx.lineWidth=1;ctx.stroke();ctx.restore();};
 const draw=()=>{t+=reduced?0:.004;ctx.clearRect(0,0,w,h);
  let x=w*(.72+Math.sin(t*.8)*.12),y=h*(.48+Math.cos(t*.62)*.16);let haze=ctx.createRadialGradient(x,y,0,x,y,Math.max(w,h)*.72);haze.addColorStop(0,'rgba(35,160,190,.13)');haze.addColorStop(.5,'rgba(24,72,104,.055)');haze.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=haze;ctx.fillRect(0,0,w,h);
  // Large translucent, liquid-like forms drift at different depths.
  blob(w*(.76+Math.sin(t*.55)*.09),h*(.47+Math.cos(t*.42)*.12),w*.24,h*.31,t*1.7,'rgba(72,207,232,ALPHA)',.22);
  blob(w*(.18+Math.cos(t*.36)*.07),h*(.68+Math.sin(t*.5)*.08),w*.19,h*.23,-t*1.1,'rgba(112,121,255,ALPHA)',.13);
  blob(w*(.52+Math.sin(t*.29)*.1),h*(.15+Math.cos(t*.38)*.05),w*.13,h*.2,t*1.3,'rgba(255,100,183,ALPHA)',.09);
  // Fine contour filaments, like organic growth captured by an instrument scan.
  for(let k=0;k<9;k++){const cx=w*(.72+Math.sin(t*.3+k)*.12),cy=h*(.48+Math.cos(t*.25+k*.7)*.15);ctx.beginPath();for(let i=0;i<=180;i++){const a=i/180*Math.PI*2,rad=65+k*17+Math.sin(a*3+t*1.4+k)*18;const px=cx+Math.cos(a)*rad*1.35,py=cy+Math.sin(a)*rad*.78;if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}ctx.strokeStyle=`rgba(117,226,246,${.025+k*.004})`;ctx.lineWidth=1;ctx.stroke();}
  for(const s of spores){s.y-=s.v;if(s.y<-8){s.y=h+8;s.x=Math.random()*w;}s.x+=Math.sin(t*1.8+s.p)*.24;const d=Math.hypot(s.x-mouse.x,s.y-mouse.y);if(d<150){s.x+=(s.x-mouse.x)/(d||1)*.25;s.y+=(s.y-mouse.y)/(d||1)*.25;}ctx.fillStyle=`rgba(188,245,255,${.18+Math.sin(t*2+s.p)*.12})`;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();}
  // Sparse interface marks: corner brackets, calibration ticks and reticles, never a full grid.
  ctx.strokeStyle='rgba(151,229,246,.22)';ctx.lineWidth=1;const pad=24,len=20;for(const [xx,yy,sx,sy] of [[pad,pad,1,1],[w-pad,pad,-1,1],[pad,h-pad,1,-1],[w-pad,h-pad,-1,-1]]){ctx.beginPath();ctx.moveTo(xx,yy+sy*len);ctx.lineTo(xx,yy);ctx.lineTo(xx+sx*len,yy);ctx.stroke();}
  if(!reduced)requestAnimationFrame(draw);
 };resize();addEventListener('resize',resize,{passive:true});addEventListener('pointermove',e=>{mouse.x=e.clientX;mouse.y=e.clientY},{passive:true});draw();
})();
