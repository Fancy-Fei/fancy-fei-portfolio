if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target)}},{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>{e.classList.add('will-reveal');observer.observe(e)})}

// Reveal in reading order, driven continuously by scroll rather than a timed fade.
const statement=document.querySelector('#design-statement');
const statementText=statement.textContent;
statement.textContent='';
const spoken=document.createElement('span');spoken.className='sr-only';spoken.textContent=statementText;statement.append(spoken);
const visual=document.createElement('span');visual.setAttribute('aria-hidden','true');statement.append(visual);
const words=[];
let letterCount=0;
let wordContainer=visual;
statementText.split(' ').forEach((word,index)=>{if(word.toUpperCase()==='BUT'){wordContainer=document.createElement('span');wordContainer.className='statement-continuation';visual.append(wordContainer)}else if(index)wordContainer.append(' ');const wrap=document.createElement('span');wrap.className='fill-word fill-char';if(['PHILOSOPHICALLY','LOGIC'].includes(word.toUpperCase().replace(/[^A-Z]/g,'')))wrap.classList.add('statement-italic');wrap.textContent=word;words.push({element:wrap,start:letterCount,length:word.length});letterCount+=word.length;wordContainer.append(wrap)});
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
let fillQueued=false;
function updateStatementFill(){fillQueued=false;
const section=statement.closest('.intro-statement').getBoundingClientRect();
const clamp=v=>Math.max(0,Math.min(1,v));
const entering=clamp((innerHeight*.85-section.top)/(innerHeight*.85));
const leaving=clamp(section.bottom/(innerHeight*.65));
const aboutSection=document.querySelector('#about').getBoundingClientRect();
const contactSection=document.querySelector('#contact').getBoundingClientRect();
const aboutAmount=Math.min(clamp((innerHeight*.85-aboutSection.top)/(innerHeight*.85)),clamp((contactSection.top-innerHeight*.2)/(innerHeight*.65)));
const amount=Math.max(Math.min(entering,leaving),aboutAmount);const fade=amount*amount*(3-2*amount);
const bg=Math.round(245*(1-fade));
document.body.style.backgroundColor=`rgb(${bg},${bg},${Math.round(243*(1-fade))})`;
document.body.style.color=bg>135?'#191919':'#f5f5f3';
document.body.style.setProperty('--about-copy-color',bg>135?'#777':'#bcbcb8');
const ink=bg>135?25:245,muted=bg>135?Math.max(70,bg-31):Math.min(175,bg+80);
statement.style.setProperty('--statement-ink',`rgb(${ink},${ink},${ink})`);
statement.style.setProperty('--statement-faint',`rgb(${muted},${muted},${muted})`);
const top=statement.getBoundingClientRect().top;const progress=motionPreference.matches?1:Math.max(0,Math.min(1,(innerHeight*.82-section.top)/(innerHeight*.82)));words.forEach(({element,start,length})=>element.style.setProperty('--fill',`${Math.max(0,Math.min(1,(progress*letterCount-start)/length))*100}%`))}
function queueStatementFill(){if(!fillQueued){fillQueued=true;requestAnimationFrame(updateStatementFill)}}
addEventListener('scroll',queueStatementFill,{passive:true});addEventListener('resize',queueStatementFill);addEventListener('hashchange',queueStatementFill);motionPreference.addEventListener('change',queueStatementFill);queueStatementFill();

// Silent looping gallery preview; playback speed is independent of the source film.
const galleryFilm=document.querySelector('#gallery-film');
if(galleryFilm){galleryFilm.muted=true;galleryFilm.defaultPlaybackRate=2;galleryFilm.playbackRate=2;galleryFilm.addEventListener('loadedmetadata',()=>{galleryFilm.playbackRate=2});const videoObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)galleryFilm.play().catch(()=>{});else galleryFilm.pause()}},{threshold:0.01});videoObserver.observe(galleryFilm)}

// Homepage navigation follows scroll direction and briefly returns after settling.
(()=>{
 const header=document.querySelector('.site-header');if(!header)return;
 let previous=Math.max(0,scrollY),direction='up',travel=0,settleTimer,hideTimer;
 const home=()=>!document.body.classList.contains('viewing-project');
 const engaged=()=>header.matches(':hover')||header.contains(document.activeElement);
 function show(){header.classList.remove('home-nav-hidden');header.inert=false}
 function hide(){if(!home()||scrollY<80||engaged())return;header.classList.add('home-nav-hidden');header.inert=true}
 function settled(){if(!home())return;show();clearTimeout(hideTimer);if(direction==='down'&&scrollY>=80)hideTimer=setTimeout(hide,2000)}
 function reset(){clearTimeout(settleTimer);clearTimeout(hideTimer);previous=Math.max(0,scrollY);travel=0;direction='up';show()}
 addEventListener('scroll',()=>{
  const y=Math.max(0,scrollY),delta=y-previous;previous=y;if(!home())return;
  if(Math.abs(delta)>.5){const next=delta>0?'down':'up';travel=next===direction?travel+Math.abs(delta):Math.abs(delta);direction=next;clearTimeout(hideTimer);if(y<80||direction==='up')show();else if(travel>10)hide()}
  clearTimeout(settleTimer);settleTimer=setTimeout(settled,180);
 },{passive:true});
 addEventListener('scrollend',()=>{clearTimeout(settleTimer);settled()});
 header.addEventListener('focusin',()=>{clearTimeout(hideTimer);show()});
 header.addEventListener('mouseenter',()=>{clearTimeout(hideTimer);show()});
 header.addEventListener('focusout',()=>{if(direction==='down')hideTimer=setTimeout(hide,2000)});
 header.addEventListener('mouseleave',()=>{if(direction==='down')hideTimer=setTimeout(hide,2000)});
 addEventListener('hashchange',reset);addEventListener('pageshow',reset);reset();
})();
// About reveals in the same reading order and scroll range as the tagline.
(()=>{
 const section=document.querySelector('#about'),words=[];let count=0,queued=false;
 section.querySelectorAll('.about-name,.about-statement,.about-copy').forEach(paragraph=>{
  const spoken=document.createElement('span');spoken.className='sr-only';spoken.textContent=paragraph.textContent;
  const visual=document.createElement('span');visual.setAttribute('aria-hidden','true');
  while(paragraph.firstChild)visual.append(paragraph.firstChild);
  paragraph.append(spoken,visual);
  const walker=document.createTreeWalker(visual,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  for(const node of nodes){const fragment=document.createDocumentFragment();node.textContent.split(/(\s+)/).forEach(word=>{
   if(!word.trim()){fragment.append(document.createTextNode(word));return}
   const span=document.createElement('span');span.className='about-fill-word';span.textContent=word;words.push({element:span,start:count,length:word.length});count+=word.length;fragment.append(span);
  });node.replaceWith(fragment)}
 });
 function update(){queued=false;const top=section.getBoundingClientRect().top;const progress=motionPreference.matches?1:Math.max(0,Math.min(1,(innerHeight*.82-top)/(innerHeight*.82)));words.forEach(({element,start,length})=>element.style.setProperty('--fill',Math.max(0,Math.min(1,(progress*count-start)/length))*100+'%'))}
 function queue(){if(!queued){queued=true;requestAnimationFrame(update)}}
 addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);addEventListener('hashchange',queue);motionPreference.addEventListener('change',queue);queue();
})();
