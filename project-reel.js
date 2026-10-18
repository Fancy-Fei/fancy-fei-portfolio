(()=>{
const track=document.querySelector('.reel-track');
const items=[{id:1,name:'Promotional Pamphlet',detail:'Comme des Garçons',src:'assets/preview-pamphlet-preview-new.webp',ratio:1492/1054},{id:2,name:'Promotional Campaign',detail:'Casa Mila Reverie',src:'assets/preview-casa-mila.webp',ratio:3964/5440},{id:3,name:'Short Film',detail:'Overexposed',src:'assets/preview-film.webp',ratio:16/9},{id:4,name:'Artistic Book',detail:'The Artificial Spotlight',src:'assets/preview-book-thumbnail.webp',ratio:1218/1292},{id:5,name:'Rebranding',detail:'Renew Sony Through Colour',src:'assets/preview-gallery-sony-white.webp',ratio:1684/1190}];
let selected=6,cycleWidth=0,animation=0,target=null,snapTimer=0,pointerDown=false,animationStart=0,animationFrom=0,wheelLast=0,wheelDirection=0;
[...items,...items,...items].forEach((p,i)=>{const a=document.createElement('a');a.className='reel-card';a.href='#project-'+p.id;a.style.setProperty('--ratio',p.ratio);a.setAttribute('aria-label','View '+p.detail);a.innerHTML='<span class="reel-description">'+p.name+'<br>'+(p.id===4?'The artificial<br>spotlight':p.detail)+'</span><span class="reel-media">'+(p.id===3?'<video muted autoplay loop playsinline poster="assets/preview-film.webp" src="assets/gallery-film.mp4"></video>':'<img src="'+p.src+'" alt="'+p.name+'">')+(p.id===5?'<img class="reel-sony" src="assets/preview-gallery-sony-black.webp" alt="" aria-hidden="true">':'')+'</span>';a.addEventListener('click',e=>{if(selected!==i||Math.abs(cardCenter(i)-track.scrollLeft)>1){e.preventDefault();center(i)}});a.addEventListener('focus',()=>center(i));track.append(a)});
const cards=[...track.children];
const controls=document.createElement('div');controls.className='reel-controls';controls.setAttribute('role','group');controls.setAttribute('aria-label','Explore selected works');controls.innerHTML='<button type="button" aria-label="Previous project">←</button><span>EXPLORE WORK</span><button type="button" aria-label="Next project">→</button>';track.after(controls);
const [previous,next]=controls.querySelectorAll('button');
previous.addEventListener('click',()=>center((selected-1+cards.length)%cards.length));
next.addEventListener('click',()=>center((selected+1)%cards.length));

const texture=document.querySelector('.paper');
function updateTextureCutout(){
 if(!texture)return;
 const card=cards[selected];
 if(document.body.classList.contains('viewing-project')||!card){texture.style.clipPath='';return}
  const media=card.querySelector('.reel-media'),asset=media.querySelector('img,video');
 const bounds=media.getBoundingClientRect(),w=window.innerWidth,h=window.innerHeight;
 const naturalWidth=asset.videoWidth||asset.naturalWidth,naturalHeight=asset.videoHeight||asset.naturalHeight;
 const ratio=['#project-3','#project-4'].includes(card.getAttribute('href'))?bounds.width/bounds.height:(naturalWidth&&naturalHeight?naturalWidth/naturalHeight:bounds.width/bounds.height);
 const fitWidth=Math.min(bounds.width,bounds.height*ratio),fitHeight=fitWidth/ratio;
 const rect={left:bounds.left+(bounds.width-fitWidth)/2,top:bounds.top+(bounds.height-fitHeight)/2};
 rect.right=rect.left+fitWidth;rect.bottom=rect.top+fitHeight;

 if(rect.bottom<=0||rect.top>=h||rect.right<=0||rect.left>=w){texture.style.clipPath='';return}
 const left=Math.max(0,rect.left),right=Math.min(w,rect.right),top=Math.max(0,rect.top),bottom=Math.min(h,rect.bottom);
 texture.style.clipPath=`path(evenodd, "M0 0H${w}V${h}H0Z M${left} ${top}H${right}V${bottom}H${left}Z")`;
}
track.querySelectorAll('img,video').forEach(asset=>{asset.addEventListener('load',updateTextureCutout);asset.addEventListener('loadeddata',updateTextureCutout)});
window.addEventListener('scroll',updateTextureCutout,{passive:true});
window.addEventListener('resize',updateTextureCutout,{passive:true});
window.addEventListener('hashchange',()=>requestAnimationFrame(updateTextureCutout));
new MutationObserver(updateTextureCutout).observe(document.body,{attributes:true,attributeFilter:['class']});
function cardCenter(i){return cards[i].offsetLeft+cards[i].offsetWidth/2-track.clientWidth/2}
function normalize(){if(!cycleWidth)return;const low=cardCenter(5)-cycleWidth/2,high=low+cycleWidth;let shift=0;if(track.scrollLeft<low)shift=cycleWidth;else if(track.scrollLeft>=high)shift=-cycleWidth;if(shift){track.scrollLeft+=shift;if(target!==null){target+=shift;animationFrom+=shift}}}
function update(){normalize();let best=Infinity;cards.forEach((c,i)=>{const d=Math.abs(cardCenter(i)-track.scrollLeft);if(d<best){best=d;selected=i}});cards.forEach((c,i)=>{const distance=Math.abs(cardCenter(i)-track.scrollLeft);const reach=c.offsetWidth/2+100;const proximity=Math.max(0,1-distance/reach);const emphasis=proximity*proximity*(3-2*proximity);c.style.transform='scale('+(0.67+0.33*emphasis)+')';c.style.filter='grayscale('+(1-emphasis)+')';c.style.opacity=0.65+0.35*emphasis;c.querySelector('.reel-description').style.opacity=Math.max(0,(emphasis-0.85)/0.15);c.classList.toggle('is-selected',i===selected&&best<=1);c.tabIndex=i===selected?0:-1;if(i===selected)c.setAttribute('aria-current','true');else c.removeAttribute('aria-current')});updateTextureCutout()}
function animate(now){if(target===null)return;if(!animationStart)animationStart=now;const progress=Math.min(1,(now-animationStart)/420);const eased=1-Math.pow(1-progress,3);track.scrollLeft=animationFrom+(target-animationFrom)*eased;if(progress===1){track.scrollLeft=target;target=null;animation=0;update();if(Math.abs(cardCenter(selected)-track.scrollLeft)>1)scheduleSnap();return}update();animation=requestAnimationFrame(animate)}
function center(i,instant=false){i=(i+cards.length)%cards.length;clearTimeout(snapTimer);cancelAnimationFrame(animation);target=cardCenter(i);animationStart=0;animationFrom=track.scrollLeft;if(instant||matchMedia('(prefers-reduced-motion: reduce)').matches){track.scrollLeft=target;target=null;update()}else animation=requestAnimationFrame(animate)}
function scheduleSnap(){clearTimeout(snapTimer);if(target===null&&!pointerDown)snapTimer=setTimeout(()=>{update();center(selected)},80)}
track.addEventListener('scroll',()=>{update();scheduleSnap()},{passive:true});track.addEventListener('wheel',e=>{const raw=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;if(!raw)return;e.preventDefault();const now=performance.now(),direction=Math.sign(raw);const newGesture=now-wheelLast>180||direction!==wheelDirection;wheelLast=now;wheelDirection=direction;if(!newGesture||Math.abs(raw)<2)return;update();let destination=selected;if(target!==null){let nearest=Infinity;cards.forEach((c,i)=>{const d=Math.abs(cardCenter(i)-target);if(d<nearest){nearest=d;destination=i}})}center(destination+direction)},{passive:false});track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();center(selected+(e.key==='ArrowRight'?1:-1))}});
const videos=[...track.querySelectorAll('video')];for(const v of videos){v.muted=true;v.defaultPlaybackRate=2;v.playbackRate=2;v.addEventListener('loadedmetadata',()=>v.playbackRate=2)}
new IntersectionObserver(entries=>{for(const v of videos)entries[0].isIntersecting?v.play().catch(()=>{}):v.pause()}).observe(track);
track.addEventListener('pointerdown',()=>{pointerDown=true;clearTimeout(snapTimer);cancelAnimationFrame(animation);target=null});
function release(){if(!pointerDown)return;pointerDown=false;scheduleSnap()}
window.addEventListener('pointerup',release);window.addEventListener('pointercancel',release);
function measure(){const id=selected%items.length;cycleWidth=cards[10].offsetLeft-cards[5].offsetLeft;center(5+id,true)}
requestAnimationFrame(measure);new ResizeObserver(measure).observe(track);window.addEventListener("resize",measure);
})();
