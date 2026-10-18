/* Film project inherits the pamphlet case-study layout and shared interactions. */
function filmProjectPage(){
 const template=document.createElement('template');template.innerHTML=reiProjectPage();
 const page=template.content.querySelector('.rei-case');page.classList.add('film-case');
 page.querySelectorAll('[id]').forEach(el=>el.id=el.id.replace(/^rei-/,'film-'));
 page.querySelectorAll('[href^="#rei-"]').forEach(el=>el.setAttribute('href',el.getAttribute('href').replace('#rei-','#film-')));
 page.querySelectorAll('[aria-labelledby]').forEach(el=>el.setAttribute('aria-labelledby',el.getAttribute('aria-labelledby').replace(/rei-/g,'film-')));
 page.querySelector('h1').textContent='OVEREXPOSED';
 page.querySelector('.case-summary>p').textContent='Overexposed is an experimental short film exploring the pressure to pursue perfection and constant achievement. Through abstract imagery, light becomes a suffocating force while shadow offers refuge, inviting viewers to reconsider the value of rest and vulnerability.';
 const details=page.querySelectorAll('.case-summary dd');details[0].textContent='Overexposed';details[1].textContent='Short Film';
 page.querySelector('.rei-project-note').remove();
 const hero=page.querySelector('.rei-hero-slideshow');hero.className='film-hero-preview';
 hero.innerHTML='<video autoplay muted loop playsinline preload="metadata" poster="assets/film.jpg" aria-label="Overexposed film preview"><source src="assets/gallery-film.mp4" type="video/mp4"></video>';
 const placeholder='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="#e9e9e5"/></svg>');
 page.querySelectorAll('img').forEach(img=>{img.src=placeholder;img.alt='Film project image to be added';img.removeAttribute('width');img.removeAttribute('height')});
 page.querySelector('.rei-research-media').remove();
 page.querySelector('.inspiration-story').insertAdjacentHTML('beforebegin',`<figure class="film-inspiration-quote"><blockquote><p>“Such is the way of our thinking—we find beauty not in the thing itself but in the patterns of shadows, the light and darkness, that one thing against another creates.”</p></blockquote><figcaption>— Jun’ichirō Tanizaki <span>p. 30</span></figcaption></figure>`);
 page.querySelector('.inspiration-context .case-kicker').textContent='INSPIRED BY TANIZAKI';
 page.querySelector('.inspiration-context p').textContent='Jun’ichirō Tanizaki’s idea that beauty lies in shadow resonated with my own thoughts about perfection and achievement. It encouraged me to look beyond light as something desirable and consider darkness as a space for tenderness, imperfection and authenticity.';
 page.querySelector('.inspiration-observation .case-kicker').textContent='A PERSONAL REFLECTION';
 page.querySelector('.inspiration-observation p').textContent='I recognised this tension in my own pursuit of recognition and flawlessness, where vulnerability often felt like something to hide. Extending Tanizaki’s idea inward, I used light to symbolise that relentless pursuit and shadow to suggest refuge, questioning whether fulfilment might lie in accepting what we usually conceal.';
 const briefs=[
  'The film should make viewers feel the oppressive intensity of light and perfection, contrasted with comfort and beauty in shadow, encouraging them to value rest, vulnerability and imperfection.',
  'Communicate through a short moving-image format, using abstraction and symbolism to express an emotional experience rather than a literal narrative. Develop a coherent visual rhythm that supports the concept.',
  'Viewers who recognise the pressures of constant achievement, particularly students and emerging professionals navigating expectations around success and self-worth.'
 ];
 page.querySelectorAll('.case-brief-row p').forEach((p,i)=>p.textContent=briefs[i]);
 page.querySelector('.visual-heading>p').remove();
 page.querySelector('.visual-heading h2').textContent='COLOUR & LIGHTING';
 page.querySelector('.case-sections a[href="#film-development"]').textContent='03 COLOUR & LIGHTING';
 page.querySelector('#film-development').insertAdjacentHTML('afterend','<section class="case-section film-sound-design" id="film-sound" aria-labelledby="film-sound-title"><header class="visual-heading"><div><h2 id="film-sound-title">SOUND DESIGN</h2></div></header><div class="film-sound-copy"><span class="case-kicker">SOUND &amp; EMOTION</span><p>Sound design notes to be added.</p></div></section>');
 const soundTrials=[
  {id:'footsteps',label:'Rapid Footsteps',image:'film-still-1.jpg',alt:'Purple light accompanying the footstep sequence',title:'Building a sense of urgency',method:'Boots stamped on gravel',process:'I manually stamped two boots onto gravel to recreate rapid footsteps, recording the distinct impacts and rough surface texture.',purpose:'The recording accompanies the footstep shots, grounding the abstract imagery in a physical rhythm.'},
  {id:'eye',label:'Eye Movement',image:'film-still-3.jpg',second:'film-still-6.jpg',alt:'Open eye in blue light',title:'Giving movement a sound',method:'Hair dryer through a glass bottle',process:'I directed a hair dryer on a low setting through a glass bottle, varying the airflow to create a shifting, wind-like sound.',purpose:'I tested this sound as an accompaniment to the eye opening and closing, exploring how an ordinarily silent movement could gain a sense of motion.'},
  {id:'shadows',label:'Shadows',image:'film-still-7.jpg',alt:'Soft hand shadow in purple and blue light',title:'Creating a moment of calm',method:'Wet finger around a wine-glass rim',process:'I rubbed a wet finger around the rim of a wine glass to produce an ethereal, resonant tone.',purpose:'Its resemblance to a singing bowl suggests calm and a meditative quality, supporting the restorative feeling I wanted the shadows to offer.'},
  {id:'city',label:'City Mess',image:'film-still-4.jpg',alt:'Hand in intense pink light',title:'Turning everyday noise into pressure',method:'Busy restaurant ambience',process:'I recorded the surrounding sounds while dining in a busy restaurant, capturing overlapping conversations, clattering tableware and the bustle of service.',purpose:'I used this crowded soundscape to evoke an overwhelming social environment, reflecting the pressure to compete, succeed and appear perfect.'}
 ];
 page.querySelector('.film-sound-copy').outerHTML=`<div class="film-sound-workspace"><div class="film-light-tabs film-sound-tabs" role="tablist" aria-label="Sound trials">${soundTrials.map((trial,i)=>`<button type="button" role="tab" id="film-sound-tab-${trial.id}" aria-controls="film-sound-panel-${trial.id}" aria-selected="${i===0}" tabindex="${i===0?0:-1}"><span class="film-trial-number">0${i+1}</span>${trial.label}</button>`).join('')}</div>${soundTrials.map((trial,i)=>`<div class="film-sound-panel" role="tabpanel" id="film-sound-panel-${trial.id}" aria-labelledby="film-sound-tab-${trial.id}" tabindex="0" ${i===0?'':'hidden'}><figure class="film-sound-visual ${trial.second?'film-sound-pair':''}"><img src="assets/${trial.image}" alt="${trial.alt}">${trial.second?`<img src="assets/${trial.second}" alt="Closed eye in blue light">`:''}<figcaption>OVEREXPOSED / SOUND TRIAL 0${i+1}</figcaption></figure><div class="film-sound-notes"><span class="case-kicker">SOUND EXPERIMENT / 0${i+1}</span><dl><div><dt>Sound source</dt><dd>${trial.method}</dd></div><div><dt>Process</dt><dd>${trial.process}</dd></div><div><dt>Intended effect</dt><dd>${trial.purpose}</dd></div></dl></div></div>`).join('')}</div>`;
 const soundRecordings={footsteps:[['rapid-footsteps','Rapid footsteps']],eye:[['eye','Hair dryer through glass bottle']],shadows:[['shadows','Wine glass & water']],city:[['city','Restaurant ambience']]};
 Object.entries(soundRecordings).forEach(([id,recordings])=>{
  page.querySelector(`#film-sound-panel-${id} .film-sound-visual`).insertAdjacentHTML('afterbegin',recordings.map(([file,label])=>`<div class="film-audio-player"><audio preload="metadata" src="assets/film-sound-${file}.m4a"></audio><button type="button" class="film-audio-toggle" aria-label="Play ${label}" aria-pressed="false">▶</button><div class="film-audio-details"><span class="film-audio-label">${label}</span><input class="film-audio-seek" type="range" min="0" max="100" value="0" step=".1" aria-label="Seek ${label}"></div><span class="film-audio-time">0:00</span></div>`).join(''));
 });
 page.querySelector('.case-sections a[href="#film-development"]').insertAdjacentHTML('afterend','<a href="#film-sound">04 SOUND DESIGN</a>');
 page.querySelector('.case-sections a[href="#film-final"]').textContent='05 FINAL PRESENTATION';
 page.querySelector('.case-sections a[href="#film-application"]').textContent='06 APPLICATION';
 page.querySelectorAll('.visual-study').forEach((study,i)=>{const image=study.querySelector('.study-image');image.style.backgroundImage='none';image.setAttribute('aria-label','Film visual study image placeholder');study.querySelector('h3').textContent='Study 0'+(i+1);study.querySelector('p').textContent='Development notes to be added.'});
 const lighting=page.querySelector('.visual-study .study-image');
 lighting.className='film-light-slideshow';lighting.removeAttribute('style');lighting.removeAttribute('role');lighting.setAttribute('aria-label','Purple, yellow and blue lighting studies');
 lighting.innerHTML=[['purple.jpg','Purple'],['yellow.png','Yellow'],['blue.jpg','Blue']].map(([file,label],i)=>`<img class="${i===0?'is-active':''}" src="assets/film-light-${file}" alt="${label} light study" aria-hidden="${i!==0}">`).join('');
 page.querySelectorAll('.visual-study').forEach((study,i)=>{if(i>0)study.remove()});
 const colourStudy=page.querySelector('.visual-study');
 colourStudy.querySelector('h3').remove();
 page.querySelector('.visual-studies').insertAdjacentHTML('afterbegin','<div class="film-neon-label">Neon Colours</div>');
 colourStudy.querySelector('p').textContent='I chose neon hues to evoke the city’s glamour, whilst their glow makes success feel alluring, before increasing brightness turns attraction into discomfort.';
 colourStudy.querySelector('p').insertAdjacentHTML('afterend','<p>For the film’s main colours, I chose purple for luxury and aspiration, golden yellow for warmth and the promise of reward, and electric blue for its cool, artificial intensity.</p>');
 page.querySelectorAll('.rei-font-frame').forEach(frame=>{frame.querySelector('figcaption').textContent='TYPEFACE TO BE ADDED';frame.querySelector('.rei-font-sample').textContent='Overexposed'});
 const exposure=page.querySelector('.moon-study');
 exposure.className='film-exposure-study';exposure.removeAttribute('aria-labelledby');
 exposure.innerHTML=`<div class="film-light-tabs" role="tablist" aria-label="Lighting approaches">
 <button type="button" role="tab" id="film-exposure-tab" aria-controls="film-exposure-panel" aria-selected="true">Overexposed Light</button>
 <button type="button" role="tab" id="film-shadow-tab" aria-controls="film-shadow-panel" aria-selected="false" tabindex="-1">Light &amp; Shadow</button>
 </div><div class="film-light-panel" id="film-exposure-panel" role="tabpanel" aria-labelledby="film-exposure-tab" tabindex="0">
 <div class="film-light-slideshow film-exposure-static"><img class="is-active" src="assets/film-exposure-opening.png" alt="Hand in pale pink overexposed light"></div>
 <div class="film-light-panel-copy"><p>I used overexposure throughout the film’s first half, peaking as the hand struggles in golden paint—light in liquid form—and continuing through the rapid-cut montage.</p><p>I deliberately made the light uncomfortable to watch, exposing how the intoxicating pursuit of success and perfection can become harmful.</p></div>
 </div><div class="film-light-panel" id="film-shadow-panel" role="tabpanel" aria-labelledby="film-shadow-tab" tabindex="0" hidden>
 <div class="film-light-slideshow film-exposure-static"><img class="is-active" src="assets/film-still-7.jpg" alt="Soft hand shadow against purple and blue light"></div>
 <div class="film-light-panel-copy"><p>I used the hand’s shadow to shift attention away from the brightness and towards a softer, less defined presence. Its blurred edges leave room for ambiguity rather than demanding a perfect appearance.</p><p>I intended the audience to feel a moment of relief and rest by giving vulnerability and imperfection a place within the image.</p></div></div>`;
 page.querySelector('.case-final-art').innerHTML='<video class="film-final-video" controls autoplay muted playsinline preload="metadata" aria-label="Overexposed — full film"><source src="assets/film-submission.mp4" type="video/mp4"></video><figcaption class="film-final-caption"><span>OVEREXPOSED / FULL FILM</span><button type="button" class="film-fullscreen-button" aria-label="View Overexposed film in fullscreen">VIEW FULLSCREEN <span aria-hidden="true">⛶</span></button></figcaption>';
 page.querySelector('.application-heading>p').textContent='Overexposed presented in a gallery setting, extending the film into an exhibition context.';
 const stillsSection=page.querySelector('.rei-application-carousel');
 stillsSection.id='film-stills';stillsSection.setAttribute('aria-labelledby','film-stills-title');
 const stillsTitle=stillsSection.querySelector('h3');stillsTitle.id='film-stills-title';stillsTitle.textContent='02 / FILM STILLS';
 const stills=[
  [1,'Abstract purple light'],[2,'Hand reaching towards warm light'],
  [3,'Eye in bright blue light'],[4,'Hand in pink light'],
  [5,'Light bulb in a golden glow'],[6,'Closed eye in blue light'],
  [7,'Hand shadow against purple and blue light'],[8,'Eye in subdued blue light']
 ];
 page.querySelector('.campaign-mockup-grid').innerHTML=stills.map(([number,description],i)=>`<figure><img src="assets/film-still-${number}.jpg" alt="${description}" loading="lazy"><figcaption><span>${String(i+1).padStart(2,'0')}</span></figcaption></figure>`).join('');
 page.querySelector('.rei-spreads').replaceWith(stillsSection);
 page.querySelector('.application-index a').textContent='01 GALLERY PRESENTATION ↘';
 page.querySelector('.case-application').insertAdjacentHTML('afterend',`<section class="film-gallery-application" id="film-application-1" aria-labelledby="film-gallery-title"><h3 class="campaign-mockup-title" id="film-gallery-title">01 / GALLERY PRESENTATION</h3><figure class="film-gallery-media"><video class="film-final-video" controls autoplay muted loop playsinline preload="metadata" aria-label="Overexposed — gallery application"><source src="assets/film-gallery-application.mp4" type="video/mp4"></video><figcaption class="film-final-caption"><span>OVEREXPOSED / GALLERY APPLICATION</span><button type="button" class="film-fullscreen-button" aria-label="View gallery application in fullscreen">VIEW FULLSCREEN <span aria-hidden="true">⛶</span></button></figcaption></figure></section>`);
 const next=page.querySelector('.case-end a');next.href='#project-4';next.textContent='NEXT PROJECT / THE ARTIFICIAL SPOTLIGHT ↗';
 return template.innerHTML;
}

document.addEventListener('click',async event=>{
 const button=event.target.closest('.film-fullscreen-button');if(!button)return;
 const video=button.closest('figure').querySelector('.film-final-video');
 try{
  if(video.requestFullscreen)await video.requestFullscreen();
  else if(video.webkitEnterFullscreen)video.webkitEnterFullscreen();
 }catch{button.textContent='Use the video’s fullscreen control'}
});

// User-initiated audio previews; only one recording plays at a time.
(()=>{
 const format=time=>`${Math.floor(time/60)}:${String(Math.floor(time%60)).padStart(2,'0')}`;
 function prepareAudio(){
  document.querySelectorAll('.film-audio-player').forEach(player=>{
   if(player.dataset.ready)return;player.dataset.ready='true';
   const audio=player.querySelector('audio'),button=player.querySelector('button'),seek=player.querySelector('input'),time=player.querySelector('.film-audio-time'),label=player.querySelector('.film-audio-label').textContent;
   function paint(){const playing=!audio.paused;button.textContent=playing?'Ⅱ':'▶';button.setAttribute('aria-pressed',String(playing));button.setAttribute('aria-label',`${playing?'Pause':'Play'} ${label}`);player.classList.toggle('is-playing',playing)}
   button.onclick=async()=>{
    if(!audio.paused){audio.pause();return}
    document.querySelectorAll('.film-audio-player audio').forEach(other=>{if(other!==audio)other.pause()});
    try{await audio.play()}catch{time.textContent='Retry'}
   };
   audio.addEventListener('play',paint);audio.addEventListener('pause',paint);audio.addEventListener('ended',paint);
   audio.addEventListener('loadedmetadata',()=>{if(Number.isFinite(audio.duration))time.textContent=format(audio.duration)});
   audio.addEventListener('timeupdate',()=>{if(Number.isFinite(audio.duration)){seek.value=audio.currentTime/audio.duration*100;time.textContent=format(audio.currentTime)}});
   seek.oninput=()=>{if(Number.isFinite(audio.duration))audio.currentTime=Number(seek.value)/100*audio.duration};
  });
 }
 new MutationObserver(prepareAudio).observe(document.querySelector('#project-view'),{childList:true});prepareAudio();
 document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('.film-audio-player audio').forEach(audio=>audio.pause())});
})();

// Conventional, keyboard-accessible tabs keep both approaches in the same space.
(()=>{
 function prepareTabs(){
  document.querySelectorAll('.film-light-tabs').forEach(tablist=>{
  const tabs=[...tablist.querySelectorAll('[role="tab"]')];
  if(!tabs.length)return;
  function select(index,focus=false){
   tabs.forEach((tab,i)=>{
    const selected=i===index;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;
    const panel=document.getElementById(tab.getAttribute('aria-controls'));panel.hidden=!selected;
    if(!selected)panel.querySelectorAll('audio').forEach(audio=>audio.pause());
   });
   if(focus)tabs[index].focus();
  }
  tabs.forEach((tab,index)=>{
   tab.addEventListener('click',()=>select(index));
   tab.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight')next=(index+1)%tabs.length;
    if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=tabs.length-1;
    if(next!==undefined){event.preventDefault();select(next,true)}
   });
  });
  });
 }
 new MutationObserver(prepareTabs).observe(document.querySelector('#project-view'),{childList:true});prepareTabs();
})();

// Lighting studies crossfade continuously while visible.
(()=>{
 let cleanups=[],resumes=[];
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 function prepare(){
  cleanups.forEach(cleanup=>cleanup());cleanups=[];resumes=[];
  document.querySelectorAll('.film-light-slideshow:not(.film-exposure-static)').forEach(gallery=>{
  let timer,observer;
  const images=[...gallery.querySelectorAll('img')];let index=0,visible=false;
  function schedule(){
   clearTimeout(timer);if(!visible||document.hidden||motion.matches)return;
   timer=setTimeout(()=>{
    images[index].classList.remove('is-active');images[index].setAttribute('aria-hidden','true');
    index=(index+1)%images.length;
    images[index].classList.add('is-active');images[index].setAttribute('aria-hidden','false');schedule();
   },2000);
  }
  resumes.push(schedule);cleanups.push(()=>{clearTimeout(timer);observer?.disconnect()});
  observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()},{threshold:.1});observer.observe(gallery);
  });
 }
 new MutationObserver(prepare).observe(document.querySelector('#project-view'),{childList:true});
 document.addEventListener('visibilitychange',()=>resumes.forEach(resume=>resume()));motion.addEventListener('change',()=>resumes.forEach(resume=>resume()));prepare();
})();

// Replay the quote when it returns to view, without moving its layout.
(()=>{
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let observer,timer,finish=()=>{};
 function prepareQuote(){
  clearTimeout(timer);observer?.disconnect();finish=()=>{};
  const quote=document.querySelector('.film-inspiration-quote');
  if(!quote||motion.matches)return;
  const letters=[];
  quote.querySelectorAll('blockquote p').forEach(paragraph=>{
   const text=paragraph.textContent;
   const readable=document.createElement('span');readable.className='film-quote-readable';readable.textContent=text;
   const visual=document.createElement('span');visual.setAttribute('aria-hidden','true');
   for(const character of text){const letter=document.createElement('span');letter.className='film-quote-letter';letter.textContent=character;visual.append(letter);letters.push(letter)}
   paragraph.replaceChildren(readable,visual);
  });
  let index=0,visible=false,complete=false;
  finish=()=>{clearTimeout(timer);letters.forEach(letter=>letter.classList.add('is-typed'));complete=true;observer?.disconnect()};
  function type(){
   clearTimeout(timer);
   if(complete||!visible||document.hidden)return;
   letters[index++].classList.add('is-typed');
   if(index===letters.length){complete=true;return}
   timer=setTimeout(type,letters[index-1].textContent.match(/[.!?]/)?180:22);
  }
  observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(!entry.isIntersecting){
     clearTimeout(timer);visible=false;index=0;complete=false;
     letters.forEach(letter=>letter.classList.remove('is-typed'));
    }else if(entry.intersectionRatio>=.25&&!visible){visible=true;type()}
   }
  },{threshold:[0,.25]});
  observer.observe(quote);
  quote._resumeTyping=()=>{if(visible)type()};
 }
 new MutationObserver(prepareQuote).observe(document.querySelector('#project-view'),{childList:true});
 document.addEventListener('visibilitychange',()=>{clearTimeout(timer);if(!document.hidden)document.querySelector('.film-inspiration-quote')?._resumeTyping?.()});
 motion.addEventListener('change',()=>{if(motion.matches)finish()});
 prepareQuote();
})();
