const stage=document.querySelector('#stage'),canvas=document.querySelector('#globe'),ctx=canvas.getContext('2d'),projectLayer=document.querySelector('#projects');
// Reference-space coordinates follow the supplied 1143 × 634 sketch.
const projects=[
{id:1,title:'Comme des Garçons',src:'assets/preview-pamphlet.webp',w:165,h:117},
{id:2,title:'Casa Mila Reverie',src:'assets/preview-casa-mila.webp',w:102,h:140},
{id:3,title:'Film',src:'assets/preview-film.webp',w:165,h:117},
{id:4,title:'Book design',src:'assets/preview-book-thumbnail.webp',w:130,h:138},
{id:5,title:'Sony',src:'assets/preview-sony-black.webp',w:165,h:117}
].map((p,i)=>({...p,angle:i*Math.PI*2/5}));
function art(p){return `<img src="${p.src}" alt="${p.title}" decoding="async">`}
function orbArt(p){
if(p.id===3)return '<video class="orb-film" autoplay muted loop playsinline preload="metadata" poster="assets/preview-film.webp"><source src="assets/gallery-film.mp4" type="video/mp4"></video>';
if(p.id===5)return '<img src="assets/preview-gallery-sony-white.webp" alt="Sony"><img class="orb-sony-alternate" src="assets/preview-gallery-sony-black.webp" alt="" aria-hidden="true">';
return art(p)}
for(const p of projects){const a=document.createElement('a');a.className='project-card';a.href=`#project-${p.id}`;a.setAttribute('aria-label',`Open ${p.title}`);a.innerHTML=`<span class="art">${orbArt(p)}</span>`;a.style.width=p.w+'px';a.style.height=p.h+'px';projectLayer.append(a);p.el=a}
const globeLabel=document.createElement('aside');
globeLabel.className='globe-project-label';globeLabel.id='globe-project-label';globeLabel.hidden=true;globeLabel.setAttribute('role','tooltip');document.body.append(globeLabel);
const projectKinds={1:'Promotional Pamphlet',2:'Promotional Campaign',3:'Short Film',4:'Artistic Book',5:'Rebranding'};
const projectCaptionTitles={1:'Comme des Garçons',2:'Casa Mila Reverie',3:'Overexposed',4:'The Artificial Spotlight',5:'Renew Sony Through Colour'};
const globeSides=document.createElement('div');globeSides.className='globe-editorial';
globeSides.innerHTML='<div class="globe-editorial-left">EVERY PROJECT<br>IS A SMALL<br>WORLD.</div><nav class="globe-editorial-right" aria-label="Project index">'+[2,3,4,5,1].map((id,i)=>`<a href="#project-${id}" data-project="${id}"><span>${String(i+1).padStart(2,'0')}</span><div class="globe-index-copy"><b>${projectCaptionTitles[id]}</b><small>${projectKinds[id]}</small></div></a>`).join('')+'</nav>';
document.body.append(globeSides);
function positionEditorial(){const bounds=stage.getBoundingClientRect(),center=bounds.left+cx,extent=(Math.hypot(orbit.rx,orbit.ry)+Math.max(...projects.map(p=>p.w))*.45)*radius-24;globeSides.style.setProperty('--editorial-y',(bounds.top+cy)+'px');globeSides.style.setProperty('--editorial-left',(center-extent-32)+'px');globeSides.style.setProperty('--editorial-right',(center+extent+32)+'px');globeSides.hidden=document.body.classList.contains('viewing-project')||bounds.bottom<0||bounds.top>innerHeight}
window.addEventListener('scroll',positionEditorial,{passive:true});
let hoveredProject=null,labelSide='left';
function positionGlobeLabel(){
 if(!hoveredProject)return;
 const bounds=stage.getBoundingClientRect(),centerX=bounds.left+cx;
 // Reserve fixed caption positions outside the thumbnail orbit.
 const extent=(Math.hypot(orbit.rx,orbit.ry)+Math.max(...projects.map(p=>p.w))*.45)*radius-24;
 const leftEdge=centerX-extent;
 const rightEdge=centerX+extent;
 const pageWidth=document.documentElement.clientWidth;
 const outer=12,inner=8;
 const from=labelSide==='left'?outer:rightEdge+inner;
 const to=labelSide==='left'?leftEdge-inner:pageWidth-outer;
 const available=Math.max(0,to-from);
 globeLabel.style.width=Math.min(210,available)+'px';
 const labelWidth=Math.min(210,available);
 const labelCenter=labelSide==='left'?to-labelWidth/2:from+labelWidth/2;
 globeLabel.style.left=labelCenter+'px';globeLabel.style.top=(bounds.top+cy)+'px';
 globeLabel.hidden=available<36||bounds.bottom<0||bounds.top>innerHeight;
 if(!globeLabel.hidden){let longest=0;for(const line of globeLabel.children){const range=document.createRange();range.selectNodeContents(line);for(const rect of range.getClientRects())longest=Math.max(longest,rect.width)}globeLabel.style.setProperty('--divider-width',longest+'px')}
}
function showGlobeLabel(p){for(const entry of globeSides.querySelectorAll('a'))entry.classList.toggle('is-active',Number(entry.dataset.project)===p.id)}
function hideGlobeLabel(p){for(const entry of globeSides.querySelectorAll('a'))entry.classList.remove('is-active')}
for(const p of projects){p.el.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')showGlobeLabel(p)});p.el.addEventListener('pointerleave',()=>hideGlobeLabel(p));p.el.addEventListener('focus',()=>showGlobeLabel(p));p.el.addEventListener('blur',()=>hideGlobeLabel(p));p.el.addEventListener('click',()=>hideGlobeLabel(p))}
window.addEventListener('scroll',positionGlobeLabel,{passive:true});
const orbFilm=document.querySelector('.orb-film');
orbFilm.muted=true;orbFilm.defaultPlaybackRate=2;orbFilm.playbackRate=2;
orbFilm.addEventListener('loadedmetadata',()=>{orbFilm.playbackRate=2});
const orbVideoObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)orbFilm.play().catch(()=>{});else orbFilm.pause()}},{threshold:0.01});
orbVideoObserver.observe(stage);
const defaultView={yaw:0,pitch:0.26};
let yaw=defaultView.yaw,pitch=defaultView.pitch,width=0,height=0,radius=0,cx=0,cy=0,velocity=0,drag=null,frame=0,dirty=true,lastTime=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function alignNameToGlobe(){const name=document.querySelector('.hero h1');name.style.left='';const label=name.getBoundingClientRect(),bounds=stage.getBoundingClientRect();name.style.left=(bounds.left+cx-label.left-label.width/2)+'px';const hero=name.closest('.hero'),heroTop=hero.getBoundingClientRect().top,nameBottom=name.querySelector('.name-line').getBoundingClientRect().bottom,globeTop=bounds.top+cy-191*radius;hero.style.setProperty('--masthead-end',((nameBottom+globeTop)/2-heroTop)+'px')}
function alignNameInitials(){
 const measure=document.createElement('canvas').getContext('2d');
 for(const initial of document.querySelectorAll('.hero .name-initial')){
  const letters=initial.nextElementSibling,targetStyle=getComputedStyle(letters),initialStyle=getComputedStyle(initial);
  const size=parseFloat(targetStyle.fontSize);
  measure.font=`${targetStyle.fontStyle} ${targetStyle.fontWeight} ${size}px ${targetStyle.fontFamily}`;
  const target=measure.measureText(letters.textContent),stroke=parseFloat(targetStyle.webkitTextStrokeWidth)||0;
  measure.font=`italic 400 ${size}px ${initialStyle.fontFamily}`;
  const source=measure.measureText('F');
  const ratio=(target.actualBoundingBoxAscent+target.actualBoundingBoxDescent+stroke)/(source.actualBoundingBoxAscent+source.actualBoundingBoxDescent);
  initial.style.fontSize=size*ratio*.965+'px';
  initial.style.top='0px';
  initial.style.transform=`translateY(${target.actualBoundingBoxDescent+stroke/2-source.actualBoundingBoxDescent*ratio*.965}px)`;
 }
}
function resize(){alignNameInitials();const experience=stage.parentElement,interaction=experience.querySelector('.interaction');stage.style.top='0px';interaction.style.top='0px';const panel=experience.getBoundingClientRect(),frame=getComputedStyle(experience,'::before'),stageBox=stage.getBoundingClientRect(),globeTop=stageBox.top+49*stageBox.width/1143,frameTop=panel.top+parseFloat(frame.top),frameBottom=panel.bottom-(parseFloat(frame.bottom)||0),textBottom=Math.max(...[...interaction.children].map(el=>el.getBoundingClientRect().bottom));const shift=((frameBottom-textBottom)-(globeTop-frameTop))/2+10;stage.style.top=shift+'px';interaction.style.top=shift+'px';const b=stage.getBoundingClientRect();width=b.width;height=b.height;const d=Math.min(devicePixelRatio||1,2);canvas.width=width*d;canvas.height=height*d;ctx.setTransform(d,0,0,d,0,0);radius=width/1143;cx=565*radius;cy=240*radius;alignNameToGlobe();dirty=true;draw()}

function project(p){return{x:cx+p.x*radius,y:cy+p.y*radius*GlobeGeometry.verticalScale,z:p.z}}
// Four upper loops and three lower loops, with no equatorial grid or meridians.
// Every globe loop lies on the same spherical surface, including its depth.
const rings=[{x:565,y:108,rx:94,ry:58},{x:568,y:124,rx:145,ry:76},{x:564,y:144,rx:158,ry:94},{x:564,y:167,rx:160,ry:118},{x:561,y:334,rx:142,ry:96},{x:565,y:367,rx:124,ry:65},{x:564,y:386,rx:102,ry:44}];
const orbit={x:565,y:240,rx:256,ry:162};
let autoRotation=0,autoResumeAt=0;
// A gentle continuous pitch adjustment prevents the rear view tipping too far up.
function presentationPitch(){return pitch-defaultView.pitch*(1-Math.cos(yaw+autoRotation))}
function pointOnRing(r,a){const viewPitch=presentationPitch();const [x,y,z]=r===orbit?GlobeGeometry.orbitPoint(r,a):GlobeGeometry.ringPoint(r,a);const turn=yaw+autoRotation,xx=x*Math.cos(turn)+z*Math.sin(turn),zz=-x*Math.sin(turn)+z*Math.cos(turn);const yy=y*Math.cos(viewPitch)-zz*Math.sin(viewPitch),depth=y*Math.sin(viewPitch)+zz*Math.cos(viewPitch);
// Each half-turn rises, then settles; keep rightward rotation uninterrupted.
const halfTurn=((turn%Math.PI)+Math.PI)%Math.PI;
const settle=Math.max(0,Math.min(1,(halfTurn-.85)/1.15));
const easing=settle*settle*(3-2*settle);
const normalX=.5*Math.sin(turn),normalY=-Math.sqrt(.75)*Math.cos(viewPitch)-.5*Math.cos(turn)*Math.sin(viewPitch);
const roll=-Math.atan2(normalX,-normalY)*easing;
return {x:xx*Math.cos(roll)-yy*Math.sin(roll),y:xx*Math.sin(roll)+yy*Math.cos(roll),z:depth}}
function strokeRing(r){let prev=null;for(let i=0;i<=240;i++){const p=project(pointOnRing(r,i/240*Math.PI*2));if(prev){const depth=(prev.z+p.z)/2;ctx.strokeStyle=r===orbit?(depth<0?'rgba(24,24,24,.42)':'rgba(24,24,24,.95)'):(depth<0?'rgba(24,24,24,.20)':'rgba(24,24,24,.86)');ctx.beginPath();ctx.moveTo(prev.x,prev.y);ctx.lineTo(p.x,p.y);ctx.stroke()}prev=p}}
function draw(){ctx.clearRect(0,0,width,height);
// Soft ground shadow follows the same orientation as the globe and orbit.
const shadowTurn=yaw+autoRotation,shadowPitch=presentationPitch();
const shadowSpread=1+.09*Math.sin(shadowTurn)*Math.sin(shadowTurn);
const shadowX=cx+Math.sin(shadowTurn)*9*radius;
const shadowY=cy+225*radius;
ctx.save();ctx.translate(shadowX,shadowY);
ctx.scale(155*radius*shadowSpread,(15+5*Math.abs(Math.sin(shadowPitch)))*radius);
const shadow=ctx.createRadialGradient(0,0,0,0,0,1);
shadow.addColorStop(0,'rgba(10,10,10,.36)');shadow.addColorStop(.4,'rgba(15,15,15,.15)');shadow.addColorStop(1,'rgba(15,15,15,0)');
ctx.fillStyle=shadow;ctx.beginPath();ctx.arc(0,0,1,0,Math.PI*2);ctx.fill();ctx.restore();
ctx.lineWidth=Math.max(.45,.72*radius);ctx.strokeStyle='rgba(24,24,24,.86)';
// Only the outside contour follows the viewer, like the edge of a sphere.
ctx.beginPath();ctx.ellipse(cx,cy,185*radius,191*radius,0,0,Math.PI*2);ctx.stroke();
for(const r of rings)strokeRing(r);
ctx.lineWidth=Math.max(.8,1.1*radius);strokeRing(orbit);
for(const p of projects){const pos=project(pointOnRing(orbit,p.angle));const scale=radius*.9;const lift=0;p.el.style.transform=`translate(${pos.x-p.w/2}px,${pos.y-lift*radius-p.h/2}px) scale(${scale})`;p.el.style.zIndex=String(Math.round(pos.z+300));p.el.style.opacity=pos.z<0?'.62':'1'}positionGlobeLabel();positionEditorial();dirty=false}
function tick(t){const dt=Math.min((t-lastTime)/16.67,3)||1;lastTime=t;if(!reduced&&!drag&&t>autoResumeAt){autoRotation+=.0023*dt;dirty=true}if(!drag&&Math.abs(velocity)>.00005){yaw+=velocity*dt;velocity*=Math.pow(.94,dt);dirty=true}if(dirty)draw();frame=requestAnimationFrame(tick)}
stage.addEventListener('pointerdown',e=>{if(e.button!==0||e.target.closest('.project-card'))return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,moved:false,target:e.target};velocity=0;});
stage.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)>5){drag.moved=true;stage.setPointerCapture(e.pointerId)}if(drag.moved){yaw+=dx*.008;pitch=Math.max(-1.15,Math.min(1.15,pitch+dy*.006));velocity=reduced?0:dx*.006;dirty=true}drag.x=e.clientX;drag.y=e.clientY});
let suppressClick=false;function release(e){if(!drag||drag.id!==e.pointerId)return;suppressClick=drag.moved;if(stage.hasPointerCapture(e.pointerId))stage.releasePointerCapture(e.pointerId);drag=null;autoResumeAt=performance.now();setTimeout(()=>{suppressClick=false},0)}window.addEventListener('pointerup',release);stage.addEventListener('dragstart',e=>e.preventDefault());stage.addEventListener('pointercancel',e=>{release(e);velocity=0});stage.addEventListener('click',e=>{if(suppressClick){e.preventDefault();e.stopPropagation()}},true);
function nudge(a){autoResumeAt=performance.now();yaw+=a;velocity=0;dirty=true}document.querySelector('#left').onclick=()=>nudge(-.35);document.querySelector('#right').onclick=()=>nudge(.35);document.querySelector('#reset').onclick=()=>{yaw=defaultView.yaw;pitch=defaultView.pitch;autoRotation=0;autoResumeAt=performance.now();velocity=0;dirty=true};canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();autoResumeAt=performance.now();if(e.key==='ArrowLeft')nudge(-.15);if(e.key==='ArrowRight')nudge(.15);if(e.key==='ArrowUp')pitch=Math.max(-1.15,pitch-.12);if(e.key==='ArrowDown')pitch=Math.min(1.15,pitch+.12);dirty=true});
function casaProjectPage(){return `
<div class="casa-case">
<a class="case-back" href="#work">← BACK TO ALL WORKS</a>
<header class="case-split-hero"><div class="case-hero-media"><video autoplay muted playsinline preload="auto" poster="assets/casa-mila.jpg" aria-label="Animated Casa Mila promotional poster"><source src="assets/casa-mila-smooth-text.mp4" type="video/mp4"></video></div><div class="case-hero-copy"><h1>CASA MILA REVERIE</h1><div class="case-summary"><span class="case-kicker">DESCRIPTION OF PROJECT</span><p>A visual invitation to discover Casa Mila. The final poster brings architectural imagery together with expressive typography and a striking circular composition.</p><dl><div><dt>PROJECT</dt><dd>Casa Mila Reverie</dd></div><div><dt>DISCIPLINE</dt><dd>Promotional campaign</dd></div></dl></div></div></header>
<nav class="case-sections" aria-label="Project sections"><a href="#casa-research">01 RESEARCH</a><a href="#casa-brief">02 BRIEF</a><a href="#casa-development">03 DEVELOPMENT</a><a href="#casa-final">04 FINAL PRESENTATION</a><a href="#casa-application">05 APPLICATION</a></nav>
<section class="case-section inspiration-section" id="casa-research">
<div class="inspiration-heading"><h2><em>I</em>NSPIRATION</h2></div>
<figure class="inspiration-photo"><button class="courtyard-open" aria-label="Enlarge Fancy Fei’s photograph of the Casa Mila courtyard"><img src="assets/casa-mila-courtyard.jpg" alt="Looking upward through Casa Mila’s curved courtyard, with rows of windows framing the blue Barcelona sky." loading="lazy"></button><figcaption>PHOTOGRAPH BY FANCY FEI<br>BARCELONA, SPAIN</figcaption></figure>
<div class="inspiration-story"><div class="inspiration-context"><span class="case-kicker">THE ARCHITECTURE / 1906–1912</span><p>Casa Mila, also known as La Pedrera, is a Barcelona landmark designed by architect Antoni Gaudí and built between 1906 and 1912.</p></div>
<div class="inspiration-observation"><span class="case-kicker">A PERSONAL OBSERVATION</span><p>That one vivid blue, cropped by the building’s organic curve, is then echoed again and again through the hundreds of ascending windows. That was the moment I was stunned by the building’s beauty.</p></div></div>
</section>
<dialog class="courtyard-dialog" aria-label="Casa Mila courtyard photograph"><button class="courtyard-close" aria-label="Close photograph">CLOSE ×</button><img src="assets/casa-mila-courtyard.jpg" alt="Fancy Fei’s full photograph of the Casa Mila courtyard"><p>PHOTOGRAPH BY FANCY FEI / BARCELONA, SPAIN</p></dialog>
<section class="case-section case-brief" id="casa-brief"><div class="case-section-title"><h2>THE <em>B</em>RIEF</h2></div><div class="case-section-content"><div class="case-brief-row"><div><h3>Criteria</h3><p>Develop a promotional campaign that captures the dreamlike atmosphere of Casa Mila and invites audiences to discover its architecture. Translate the courtyard’s organic curves, repeating windows and vivid blue sky into a cohesive identity across the poster, moving image and visitor applications.</p></div></div><div class="case-brief-row"><div><h3>Constraints</h3><p>Maintain a consistent visual language across print, digital and three-dimensional formats. Balance expressive typography and architectural imagery with clear information, adapting the composition to each application while preserving the campaign’s recognisable character.</p></div></div><div class="case-brief-row"><div><h3>Audience</h3><p>Prospective visitors to Barcelona, particularly those interested in architecture, art and cultural experiences. Spark curiosity through an evocative first impression and encourage viewers to experience Casa Mila in person.</p></div></div></div></section>
<section class="case-section visual-development" id="casa-development">
<header class="visual-heading"><div><h2>VISUAL <em>L</em>ANGUAGE</h2></div><p>INSPIRED BY GAUDÍ.<br>DEVELOPED THROUGH MY OWN OBSERVATION.</p></header>
<div class="visual-studies">
<article class="visual-study"><div class="study-image study-windows" role="img" aria-label="Ascending courtyard windows reflecting fragments of blue sky"></div><div><h3>Ascending windows</h3><p>I used the windows as decoration as much as structure: each one catches a fragment of that same sky blue, so the repetition climbing the building starts to feel like the sky is decorating the architecture itself.</p></div></article>
<article class="visual-study"><div class="study-image study-curves" role="img" aria-label="The organic courtyard edge framing the blue sky"></div><div><h3>Organic curves</h3><p>The courtyard’s organic curve became a way to frame the sky. This reading of the sky as a design material is my own observation, rather than a documented intention of Gaudí’s.</p></div></article>
<article class="visual-study"><div class="study-image study-sky" role="img" aria-label="A detail of the natural blue sky"></div><div><h3>Natural blue sky</h3><p>I treated the sky as a design element, not scenery: cropped and framed by the courtyard, that ordinary blue becomes something worth noticing, almost renewed by the building around it.</p></div></article>
</div>
<aside class="moon-study"><div class="moon-orbit"><div class="development-moon" role="img" aria-label="The warm full moon introduced into the poster"></div></div><h3>Full moon</h3><p>I added the moon to give the sky opening a focal point—a warm, round form that echoes the courtyard’s own curve while making the poster feel more like a moment than a straightforward photograph.</p><span class="moon-note">FROM ARCHITECTURE<br>TO ATMOSPHERE.</span></aside>
</section>
<section class="case-final" id="casa-final"><div class="case-section-title"><h2>FINAL<br>PRESENTATI<em>O</em>N</h2></div><figure class="case-final-art"><img src="assets/casa-mila.jpg" alt="Final Casa Mila campaign poster" loading="lazy"><figcaption>01 / THE FINAL DESIGN</figcaption></figure></section><section class="case-final-mockups" aria-labelledby="campaign-mockup-title"><h3 class="campaign-mockup-title" id="campaign-mockup-title">02 / CAMPAIGN MOCKUP</h3><div class="campaign-mockup-grid"><figure><img src="assets/casa-mockup-display.png" alt="Casa Mila campaign poster in a framed display on a Barcelona stone building" loading="lazy" width="1536" height="1024"><figcaption><span class="mockup-proposal">PROPOSED APPLICATION</span><span>Wall-mounted poster display · Barcelona, Spain</span></figcaption></figure><figure><img src="assets/casa-mockup-metro.png" alt="Casa Mila campaign poster beside a Barcelona metro entrance on a city street" loading="lazy" width="1536" height="1024"><figcaption><span class="mockup-proposal">PROPOSED APPLICATION</span><span>Metro entrance display · Lesseps setting, Barcelona</span></figcaption></figure><figure><img src="assets/casa-mockup-bus-stop.png" alt="Casa Mila campaign poster at a bus stop beside La Pedrera" loading="lazy" width="1536" height="1024"><figcaption><span class="mockup-proposal">PROPOSED APPLICATION</span><span>Bus shelter display · La Pedrera setting, Barcelona</span></figcaption></figure><figure><img src="assets/casa-mockup-plaza.png" alt="Casa Mila campaign poster in a freestanding display on a tree-lined Barcelona plaza" loading="lazy" width="1536" height="1024"><figcaption><span class="mockup-proposal">PROPOSED APPLICATION</span><span>Freestanding street display · Tree-lined plaza, Barcelona</span></figcaption></figure></div></section>
<section class="case-application" id="casa-application"><header class="application-heading"><div class="case-section-title"><h2>APPLICATI<em>O</em>N</h2></div><p>The poster’s visual language extends into a reel, a puzzle box, a ticket and a tote bag.</p></header><nav class="application-index" aria-label="Application subsections"><a href="#casa-reel">01 REEL ↘</a><a href="#casa-puzzle">02 PUZZLE BOX ↘</a><a href="#casa-ticket">03 TICKET ↘</a><a href="#casa-tote">04 TOTE BAG ↘</a></nav></section>
<section class="application-item" id="casa-reel"><header><h3>Reel</h3><p>The poster brought to life through motion.</p></header><figure class="application-media reel-application-media"><div class="casa-reel-phone"><img class="casa-phone-frame" src="assets/casa-reel-phone.png" alt="Purple phone displaying the Casa Mila reel" width="1254" height="1254"><video class="casa-reel-video" controls autoplay muted loop playsinline preload="metadata" aria-label="Casa Mila promotional reel"><source src="assets/casa-mila-reel.mp4" type="video/mp4"></video><img class="casa-phone-island" src="assets/casa-reel-phone.png" alt="" aria-hidden="true" width="1254" height="1254"></div></figure></section><section class="application-item" id="casa-puzzle"><header><h3>Puzzle box</h3><p>The campaign as an object to explore.</p></header><figure class="application-media puzzle-carousel" aria-label="Puzzle box photographs" aria-roledescription="carousel" tabindex="0"><div class="puzzle-slides"><img class="is-active" src="assets/puzzle-box-side.jpg" alt="Casa Mila puzzle box, side view" aria-hidden="false"><img src="assets/puzzle-box-open.jpg" alt="Casa Mila puzzle box with the sleeve slid open" aria-hidden="true"><img src="assets/puzzle-box-front.jpg" alt="Casa Mila puzzle box, front view" aria-hidden="true"></div><figcaption class="puzzle-controls"><span class="puzzle-position">01 / 03 — SIDE VIEW</span><div><button type="button" data-puzzle="previous" aria-label="Previous puzzle box photo">←</button><button type="button" data-puzzle="pause" aria-label="Pause puzzle box slideshow">PAUSE</button><button type="button" data-puzzle="next" aria-label="Next puzzle box photo">→</button></div></figcaption></figure></section>
<section class="application-item" id="casa-ticket"><header><h3>Ticket</h3><p>A small-format expression of the poster.</p></header><figure class="application-media"><img class="application-design" src="assets/casa-mila-ticket.png" alt="Casa Mila admission ticket design with a blue entry stub and courtyard imagery" loading="lazy"><figcaption>02 / TICKET DESIGN</figcaption></figure></section>
<section class="application-item" id="casa-tote"><header><h3>Tote bag</h3><p>The visual identity carried into everyday life.</p></header><figure class="application-media puzzle-carousel" aria-label="Tote bag photographs" aria-roledescription="carousel" tabindex="0"><div class="puzzle-slides"><img class="is-active" src="assets/casa-tote-front.png" alt="Casa Mila tote bag, front view" aria-hidden="false"><img src="assets/casa-tote-inside.png" alt="Casa Mila tote bag, inside view" aria-hidden="true"><img src="assets/casa-tote-closeup.png" alt="Casa Mila tote bag fabric and print close-up" aria-hidden="true"></div><figcaption class="puzzle-controls"><span class="puzzle-position">01 / 03 — FRONT VIEW</span><div><button type="button" data-puzzle="previous" aria-label="Previous tote bag photo">←</button><button type="button" data-puzzle="pause" aria-label="Pause tote bag slideshow">PAUSE</button><button type="button" data-puzzle="next" aria-label="Next tote bag photo">→</button></div></figcaption></figure></section>
<footer class="case-end"><a href="#project-3">NEXT PROJECT / OVEREXPOSED ↗</a></footer>
</div>`}

function route(){const sectionProjects={casa:2,rei:1,book:4,film:3,sony:5},sectionMatch=location.hash.match(/^#(casa|rei|book|film|sony)-/),sectionProject=sectionMatch?sectionProjects[sectionMatch[1]]:null;const p=projects.find(p=>location.hash===`#project-${p.id}`||p.id===sectionProject),view=document.querySelector('#project-view');if(sectionProject&&view.dataset.projectId===String(sectionProject)&&!view.hidden)return;document.querySelector('#home').hidden=!!p;document.body.classList.toggle('viewing-project',!!p);view.hidden=!p;view.dataset.projectId=p?String(p.id):'';if(p){view.innerHTML=p.id===1?reiProjectPage():p.id===2?casaProjectPage():p.id===4?bookProjectPage():p.id===3?filmProjectPage():p.id===5?sonyProjectPage():`<a class="back" href="#">← Back to the globe</a><div class="project-heading"><span>0${p.id} / 05</span><h1>${p.title}</h1></div><div class="detail-art">${art(p)}</div><p>Full project imagery and the story behind the work will live here.</p><a class="project-next" href="#project-${p.id%projects.length+1}">Next project →</a>`;if(p.id===1){const specimens=[['pamphlet-type-dengxian.png','DengXian specimen: Rei Kawa Kubo in bold and lighter weights'],['pamphlet-type-founders.png','Founders Grotesk specimen: Rei Kawa Kubo with bold, italic and regular lettering']];view.querySelectorAll('.rei-font-frame').forEach((frame,i)=>{frame.classList.add('type-screenshot-frame');frame.innerHTML=`<img class="type-screenshot" src="assets/${specimens[i][0]}" alt="${specimens[i][1]}">`})}document.title=`${p.title} — Fancy Fei`;view.querySelector('h1').tabIndex=-1;view.querySelector('h1').focus({preventScroll:true})}else{document.title='Fancy Fei — Design with logic';requestAnimationFrame(()=>{resize();const target=document.getElementById(location.hash.slice(1));if(target)target.scrollIntoView({behavior:reduced?'instant':'smooth'})})}if(p||!location.hash||location.hash==='#')window.scrollTo(0,0);if(sectionProject)requestAnimationFrame(()=>requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'instant',block:'start'})))}window.addEventListener('hashchange',route);new ResizeObserver(resize).observe(stage);route();resize();requestAnimationFrame(tick);











document.fonts.ready.then(resize);

document.fonts.ready.then(resize);

// The project section bar stays below the introduction and follows scroll direction.
(()=>{
 let previousY=window.scrollY;
 function updateCaseNavigation(){
  const nav=document.querySelector('.case-sections'),hero=document.querySelector('.case-split-hero');
  const y=window.scrollY,delta=y-previousY;
  if(nav&&hero){
   if(hero.getBoundingClientRect().bottom>0)nav.classList.remove('is-scroll-hidden');
   else if(Math.abs(delta)>3)nav.classList.toggle('is-scroll-hidden',delta>0);
  }
  previousY=y;
 }
 addEventListener('scroll',updateCaseNavigation,{passive:true});
 addEventListener('hashchange',()=>{previousY=window.scrollY;document.querySelector('.case-sections')?.classList.remove('is-scroll-hidden')});
})();

// An understated, sequential reveal for the three parts of the brief.
(()=>{
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let observer;
 function prepareBrief(){
  observer?.disconnect();
  const content=document.querySelector('.case-brief .case-section-content');
  if(!content||motion.matches)return;
  content.classList.add('brief-reveal-ready');
  observer=new IntersectionObserver(entries=>{
   for(const entry of entries)content.classList.toggle('brief-revealed',entry.isIntersecting);
  },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  observer.observe(content);
 }
 new MutationObserver(prepareBrief).observe(document.querySelector('#project-view'),{childList:true});
 motion.addEventListener('change',()=>{document.querySelector('.brief-reveal-ready')?.classList.remove('brief-reveal-ready');prepareBrief()});
 prepareBrief();
})();

// Fade the whole case-study surface into light paper for Final Presentation.
(()=>{
 let queued=false;
 const clamp=value=>Math.max(0,Math.min(1,value));
 function updateCaseTone(){
  queued=false;
  const page=document.querySelector('.casa-case');
  if(!page){document.body.classList.remove('viewing-applications');return;}
  const final=page.querySelector('.case-final').getBoundingClientRect();
  document.body.classList.toggle('viewing-applications',page.querySelector('.case-application').getBoundingClientRect().top<=innerHeight*.55);
  const enter=clamp((innerHeight*.9-final.top)/(innerHeight*.75));
  const smooth=value=>value*value*(3-2*value);
  const fade=matchMedia('(prefers-reduced-motion: reduce)').matches?(final.top<innerHeight*.5?1:0):smooth(enter);
  const mix=(dark,light)=>Math.round(dark+(light-dark)*fade);
  const ink=mix(255,25),rule=mix(85,170),slot=mix(36,233);
  page.style.setProperty('--scroll-paper',`rgb(${mix(16,245)},${mix(16,245)},${mix(16,243)})`);
  page.style.setProperty('--scroll-ink',`rgb(${ink},${ink},${ink})`);
  page.style.setProperty('--scroll-rule',`rgb(${rule},${rule},${rule})`);
  page.style.setProperty('--scroll-slot',`rgb(${slot},${slot},${mix(36,229)})`);
  page.style.setProperty('--sidebar-paper',`rgb(${mix(245,16)},${mix(245,16)},${mix(243,16)})`);
  const sidebarInk=mix(25,255);
  page.style.setProperty('--sidebar-ink',`rgb(${sidebarInk},${sidebarInk},${sidebarInk})`);
 }
 function queueCaseTone(){if(!queued){queued=true;requestAnimationFrame(updateCaseTone)}}
 addEventListener('scroll',queueCaseTone,{passive:true});addEventListener('resize',queueCaseTone);addEventListener('hashchange',queueCaseTone);
 new MutationObserver(queueCaseTone).observe(document.querySelector('#project-view'),{childList:true});queueCaseTone();
})();

// A restrained entrance and an accessible full-photograph view.
(()=>{
 let observer;
 function prepareInspiration(){
  observer?.disconnect();const section=document.querySelector('.inspiration-section');
  if(!section||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  section.classList.add('inspiration-ready');
  observer=new IntersectionObserver(entries=>{for(const entry of entries)section.classList.toggle('inspiration-visible',entry.isIntersecting)},{threshold:.2});observer.observe(section);
 }
 new MutationObserver(prepareInspiration).observe(document.querySelector('#project-view'),{childList:true});prepareInspiration();
 document.addEventListener('click',event=>{
  const dialog=document.querySelector('.courtyard-dialog');if(!dialog)return;
  if(event.target.closest('.courtyard-open'))dialog.showModal();
  if(event.target.closest('.courtyard-close')||event.target===dialog)dialog.close();
 });
})();
// Keep the photo credit aligned to the actual photograph, at every viewport size.
(()=>{
 let observer;
 function alignPhotoCredit(){
  observer?.disconnect();
  const photo=document.querySelector('.inspiration-photo');if(!photo)return;
  const image=photo.querySelector('.courtyard-open'),caption=photo.querySelector('figcaption');
  function align(){const frame=photo.getBoundingClientRect(),bounds=image.getBoundingClientRect();caption.style.left=(bounds.left-frame.left)+'px';caption.style.width=bounds.width+'px';caption.style.transform='none'}
  observer=new ResizeObserver(align);observer.observe(photo);observer.observe(image);align();
 }
 new MutationObserver(alignPhotoCredit).observe(document.querySelector('#project-view'),{childList:true});alignPhotoCredit();
})();

// Replay the visual studies' restrained entrance on each visit.
(()=>{
 let observer;
 function prepareDevelopment(){
  observer?.disconnect();const section=document.querySelector('.visual-development');
  if(!section||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  section.classList.add('development-ready');
  observer=new IntersectionObserver(entries=>{for(const entry of entries)section.classList.toggle('development-visible',entry.isIntersecting)},{threshold:.15});observer.observe(section);
 }
 new MutationObserver(prepareDevelopment).observe(document.querySelector('#project-view'),{childList:true});prepareDevelopment();
})();
// Application navigation joins the persistent sidebar, beneath the project index.
(()=>{
 function prepareApplicationNavigation(){
  const page=document.querySelector('.casa-case');if(!page)return;
  const sidebar=page.querySelector('.case-sections'),index=page.querySelector('.application-index');
  if(!sidebar||!index||sidebar.contains(index))return;
  const main=document.createElement('div');main.className='case-main-links';
  [...sidebar.children].forEach(link=>main.append(link));sidebar.append(main,index);
 }
 new MutationObserver(prepareApplicationNavigation).observe(document.querySelector('#project-view'),{childList:true});prepareApplicationNavigation();
})();

// Campaign mockups: a seamless rightward loop, paused while inspecting an image.
(()=>{
 let observer,frame;
 function prepareMockups(){
  observer?.disconnect();cancelAnimationFrame(frame);
  const gallery=document.querySelector('.campaign-mockup-grid');
  if(!gallery)return;
  if(!gallery.dataset.carousel){
   gallery.dataset.carousel='true';gallery.classList.add('campaign-carousel');
   gallery.setAttribute('aria-label','Campaign mockups. Hover or focus an image to enlarge it and pause the carousel.');
   const track=document.createElement('div');track.className='campaign-carousel-track';
   const group=document.createElement('div');group.className='campaign-carousel-group';
   [...gallery.children].forEach(figure=>{figure.tabIndex=0;group.append(figure)});
   const copy=group.cloneNode(true);copy.setAttribute('aria-hidden','true');copy.querySelectorAll('figure').forEach(figure=>figure.tabIndex=-1);copy.querySelectorAll('img').forEach(img=>img.alt='');
   track.append(copy,group,copy.cloneNode(true));gallery.append(track);
  }
  const group=gallery.querySelector('.campaign-carousel-group');
  let controls=gallery.parentElement.querySelector('.campaign-carousel-controls');
  if(!controls){controls=document.createElement('div');controls.className='campaign-carousel-controls';controls.setAttribute('role','group');controls.setAttribute('aria-label','Browse campaign mockups');controls.innerHTML='<button type="button" aria-label="Previous campaign mockup">←</button><button type="button" aria-label="Next campaign mockup">→</button>';gallery.after(controls)}
  gallery.tabIndex=0;
  let visible=false,last=0,manual;
  const motion=matchMedia('(prefers-reduced-motion:reduce)');
  function move(direction){const distance=direction*(group.querySelector('figure').getBoundingClientRect().width+24);manual={remaining:distance,time:0};if(motion.matches){gallery.scrollLeft+=distance;manual=null}}
  controls.children[0].onclick=()=>move(-1);controls.children[1].onclick=()=>move(1);
  gallery.onkeydown=event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move(event.key==='ArrowRight'?1:-1)}};
  function normalize(){const width=group.getBoundingClientRect().width;if(width>0){if(gallery.scrollLeft<width)gallery.scrollLeft+=width;else if(gallery.scrollLeft>=width*2)gallery.scrollLeft-=width}}
  gallery.scrollLeft=group.getBoundingClientRect().width;
  function tick(time){
   if(!gallery.isConnected)return;
   const elapsed=last?Math.min(time-last,50):0;last=time;
   if(manual){const portion=Math.min(1,elapsed/Math.max(16,350-manual.time));const delta=manual.remaining*portion;gallery.scrollLeft+=delta;manual.remaining-=delta;manual.time+=elapsed;if(manual.time>=350||Math.abs(manual.remaining)<.5)manual=null}
   else if(visible&&!motion.matches&&!document.hidden&&!gallery.matches(':hover')&&!controls.matches(':hover')&&!gallery.contains(document.activeElement)&&!controls.contains(document.activeElement)){gallery.scrollLeft-=elapsed*.032}
   normalize();frame=requestAnimationFrame(tick);
  }
  observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting},{threshold:0});observer.observe(gallery);frame=requestAnimationFrame(tick);
 }
 new MutationObserver(prepareMockups).observe(document.querySelector('#project-view'),{childList:true});prepareMockups();
 document.addEventListener('visibilitychange',()=>document.querySelector('.campaign-carousel')?.classList.toggle('is-document-hidden',document.hidden));
})();

// The puzzle gallery starts in the supplied order; manual navigation resets autoplay.
(()=>{
 let cleanups=[];
 function preparePuzzle(){
  cleanups.forEach(cleanup=>cleanup());cleanups=[];document.querySelectorAll('.puzzle-carousel').forEach(gallery=>{
  const images=[...gallery.querySelectorAll('.puzzle-slides img')],label=gallery.querySelector('.puzzle-position'),pause=gallery.querySelector('[data-puzzle="pause"]');
  const isTote=!!gallery.closest('#casa-tote'),kind=isTote?'tote bag':'puzzle box',names=isTote?['FRONT VIEW','INSIDE VIEW','CLOSE-UP']:['SIDE VIEW','SLIDE OPEN','FRONT VIEW'];let index=0,timer,visible=false,hovered=false,paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function paint(){images.forEach((img,i)=>{img.classList.toggle('is-active',i===index);img.setAttribute('aria-hidden',String(i!==index))});label.textContent=String(index+1).padStart(2,'0')+' / 03 — '+names[index];pause.textContent=paused?'PLAY':'PAUSE';pause.setAttribute('aria-label',(paused?'Play ':'Pause ')+kind+' slideshow')}
  function schedule(){clearTimeout(timer);if(visible&&!paused&&!hovered&&!document.hidden)timer=setTimeout(()=>{index=(index+1)%images.length;paint();schedule()},2000)}
  function move(direction){index=(index+direction+images.length)%images.length;paint();schedule()}
  gallery.querySelector('[data-puzzle="previous"]').onclick=()=>move(-1);
  gallery.querySelector('[data-puzzle="next"]').onclick=()=>move(1);
  pause.onclick=()=>{paused=!paused;paint();schedule()};
  gallery.onpointerenter=()=>{hovered=true;schedule()};gallery.onpointerleave=()=>{hovered=false;schedule()};
  gallery.onkeydown=event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();move(event.key==='ArrowRight'?1:-1)}};
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()},{threshold:.3});observer.observe(gallery);
  document.addEventListener('visibilitychange',schedule);paint();
  cleanups.push(()=>{clearTimeout(timer);observer.disconnect();document.removeEventListener('visibilitychange',schedule)});
  });
 }
 new MutationObserver(preparePuzzle).observe(document.querySelector('#project-view'),{childList:true});preparePuzzle();
})();
