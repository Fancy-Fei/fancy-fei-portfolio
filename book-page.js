/* Book case study uses the current pamphlet layout without copying its project content. */
function bookProjectPage(){
 const template=document.createElement('template');
 template.innerHTML=reiProjectPage();
 const page=template.content.querySelector('.rei-case');page.classList.add('book-case');
 page.querySelectorAll('[id]').forEach(el=>el.id=el.id.replace(/^rei-/,'book-'));
 page.querySelectorAll('[href^="#rei-"]').forEach(el=>el.setAttribute('href',el.getAttribute('href').replace('#rei-','#book-')));
 page.querySelectorAll('[aria-labelledby]').forEach(el=>el.setAttribute('aria-labelledby',el.getAttribute('aria-labelledby').replace(/rei-/g,'book-')));
 page.querySelector('h1').textContent='THE ARTIFICIAL SPOTLIGHT';
 page.querySelector('.case-summary>p').textContent='This artist’s book examines how social expectations and commercial ideals encourage artificial alterations to food and bodies. From glossy apples and dyed salmon to painted nails and whitened teeth, it questions why enhanced appearances are often valued above natural qualities.';
 const details=page.querySelectorAll('.case-summary dd');details[0].textContent='The Artificial Spotlight';details[1].textContent='Book design';
 page.querySelector('.rei-project-note').remove();
 const hero=page.querySelector('.rei-hero-slideshow');
 hero.setAttribute('aria-label','The Artificial Spotlight book');
 hero.innerHTML='<img class="is-active" src="assets/book-thumbnail.png" alt="The Artificial Spotlight book design" aria-hidden="false">';
 const placeholder='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="#e9e9e5"/></svg>');
 page.querySelectorAll('img:not(.rei-hero-slideshow img)').forEach(img=>{img.src=placeholder;img.alt='Book project image to be added';img.removeAttribute('width');img.removeAttribute('height')});
 page.querySelector('.rei-research-media').remove();
 page.querySelector('.inspiration-context .case-kicker').textContent='A PERSONAL OBSERVATION';
 page.querySelector('.inspiration-context p').textContent='I began noticing how everyday appearances are altered to meet expectations: polished nails and whitened teeth suggest cleanliness, while glossy apples and vividly coloured salmon imply freshness and quality. This prompted me to question the social standards shaping what we consider worthy of the spotlight, when achieving that appearance can conceal authenticity and come at a cost to wellbeing.';
 page.querySelector('.inspiration-observation .case-kicker').textContent='PURPOSE OF THE BOOK';
 page.querySelector('.inspiration-observation p').textContent='The book encourages viewers to question how social and commercial standards shape perceptions of quality, cleanliness and acceptability, inviting more critical consumption and greater acceptance of natural variation.';
 const briefs=[
 'Develop an artist’s book exploring how social and commercial expectations influence the presentation of food and bodies. Encourage readers to question the relationship between appearance and authenticity.',
 'Work within the physical book format and available materials, balancing experimental expression with practical construction, handling and readability.',
 'A general adult audience, particularly readers interested in visual culture and the social pressures surrounding everyday consumption and self-presentation.'
 ];
 page.querySelectorAll('.case-brief-row p').forEach((p,i)=>p.textContent=briefs[i]);
 page.querySelector('.visual-heading>p').textContent='DEVELOPMENT NOTES TO BE ADDED';
 page.querySelectorAll('.visual-study').forEach((study,i)=>{const image=study.querySelector('.study-image');image.style.backgroundImage='none';image.setAttribute('aria-label','Book visual study image placeholder');study.querySelector('h3').textContent='Study 0'+(i+1);study.querySelector('p').textContent='Development notes to be added.'});
 const studies=page.querySelector('.visual-studies');
 const naturalStudy=studies.querySelector('.visual-study');
 studies.querySelectorAll('.visual-study').forEach((study,i)=>{if(i>0)study.remove()});
 naturalStudy.querySelector('h3').textContent='Natural Form: Eucalyptus Oil Prints';
 naturalStudy.querySelector('p').textContent='I used eucalyptus-oil prints to depict the subjects in their natural, unenhanced state. Their raw texture suggests authenticity, while detailed photographic imagery preserves their forms and surface features. I placed them beneath the tracing-paper coatings to act as visual “blueprints” of the original forms concealed by artificial enhancement.';
 studies.classList.add('book-visual-studies');
 studies.querySelectorAll('.visual-study .study-image').forEach(image=>image.remove());
 studies.insertAdjacentHTML('afterbegin',`<div class="book-material-carousel"><div class="book-material-viewport" tabindex="0" aria-label="Vertical material study photographs"><div class="book-material-track">${[['salmon','Salmon'],['mouth','Mouth and teeth'],['apple','Apple'],['hand','Hand']].map(([file,label])=>`<figure><img src="assets/book-study-${file}.jpg" alt="${label} — monochrome material study" loading="lazy"></figure>`).join('')}</div></div><div class="book-material-controls" role="group" aria-label="Browse material studies"><button type="button" data-material-step="-1" aria-label="Previous material study">↑</button><button type="button" data-material-step="1" aria-label="Next material study">↓</button></div></div>`);
 page.querySelectorAll('.rei-font-frame').forEach(frame=>{frame.querySelector('figcaption').textContent='TYPEFACE TO BE ADDED';frame.querySelector('.rei-font-sample').innerHTML='Book<br>Design'});
 page.querySelector('.rei-final-slideshow').setAttribute('aria-label','Book presentation views');
 const captions=['01 / FRONT COVER','02 / OPEN BOOK — OBLIQUE VIEW'];
 page.querySelector('.rei-final-slideshow').innerHTML='<img class="is-active" src="assets/book-final-front.png" alt="Front cover of The Artificial Spotlight artist’s book" aria-hidden="false"><img src="assets/book-final-open.png" alt="Oblique view of the open artist’s book showing its layered pages" aria-hidden="true">';
 page.querySelectorAll('.rei-final-slideshow img').forEach((img,i)=>{img.dataset.caption=captions[i]});
 page.querySelector('.rei-final-caption').textContent=captions[0];
 page.querySelector('.rei-final-controls').setAttribute('aria-label','Book views');
 page.querySelectorAll('[data-rei-final-step]').forEach(button=>button.setAttribute('aria-label',Number(button.dataset.reiFinalStep)<0?'Previous book view':'Next book view'));
 const display=page.querySelector('.rei-spreads');
 display.querySelector('h3').textContent='01 / PROPOSED DISPLAY CONTEXTS';
 display.id='book-display-contexts';
 const contexts=[['book-application-gallery.png','01 / PROPOSED APPLICATION — GALLERY PLINTH DISPLAY','Artist’s book presented on a white plinth in a gallery'],['book-application-library.png','02 / PROPOSED APPLICATION — LIBRARY DISPLAY','Artist’s book displayed on a library reading table']];
 display.querySelectorAll('figure').forEach((figure,i)=>{figure.querySelector('img').src='assets/'+contexts[i][0];figure.querySelector('img').alt=contexts[i][2];figure.querySelector('figcaption').textContent=contexts[i][1]});
 display.querySelectorAll('figure').forEach((figure,i)=>{if(i>0)figure.remove()});
 display.classList.add('book-gallery-only');
 page.querySelector('.case-application').after(display);
 page.querySelector('.application-heading>p').textContent='A proposed gallery display invites readers to encounter The Artificial Spotlight as a physical object. Turning its layered pages reveals the contrast between natural forms and artificial coatings, while the strings and die-cut openings guide attention towards what is displayed and what remains concealed.';
 page.querySelector('.application-index').innerHTML='<a href="#book-display-contexts">01 / PROPOSED DISPLAY CONTEXTS ↘</a>';
 page.querySelector('.rei-application-carousel>h3').textContent='02 / PROPOSED APPLICATIONS';
 page.querySelectorAll('.campaign-mockup-grid figcaption span:last-child').forEach((caption,i)=>caption.textContent='Application 0'+(i+1)+' / Details to be added');
 page.querySelector('.rei-application-carousel').remove();
 const next=page.querySelector('.case-end a');next.href='#project-5';next.textContent='NEXT PROJECT / SONY ↗';
 const development=page.querySelector('#book-development');
 development.querySelector('.visual-heading h2').textContent='MATERIALS & PROCESSES';
 development.insertAdjacentHTML('beforeend',`<article class="book-artificial-overlays" aria-labelledby="book-overlay-title"><div class="book-overlay-copy"><h3 id="book-overlay-title">Artificial Overlays: Material Choice</h3><p>I chose materials that closely mimic the physical qualities or appearance of each artificial coating. Nail polish provides the closest material match, while printed colour and wax echo the colour, gloss and surface appearance of the other enhancements.</p><p>Layered over the eucalyptus-oil prints on tracing paper, these coatings let viewers encounter the contrast between the natural image and its artificial surface. Their visible texture and physical form create a dynamic, engaging experience, making the book’s argument more tangible and memorable.</p></div><div class="book-overlay-grid">${[['book-overlay-colour.jpg','01 / PRINTED COLOUR','Printed orange colour overlay on a salmon image'],['book-overlay-nails.jpg','02 / NAIL POLISH — NAILS','Yellow nail polish applied over the nails on a monochrome hand image'],['book-overlay-teeth.jpg','03 / NAIL POLISH — TEETH','White nail polish applied over teeth on a monochrome mouth image'],['book-overlay-wax.jpg','04 / WAX','Textured red wax applied over a monochrome apple image']].map(([file,label,alt])=>`<figure><img src="assets/${file}" alt="${alt}" loading="lazy"><figcaption>${label}</figcaption></figure>`).join('')}</div></article>`);
 development.querySelector('.visual-heading>p')?.remove();
 development.insertAdjacentHTML('afterend',`<section class="case-section book-construction" id="book-construction" aria-labelledby="book-construction-title"><header class="visual-heading"><div><h2 id="book-construction-title">TYPOGRAPHY &amp; CONSTRUCTION</h2></div></header>${[['Typography Choice','Typeface specimens and explanation to be added.'],['String Composition','String arrangement images and explanation to be added.'],['Die-cutting','Die-cut details and explanation to be added.']].map(([title,note])=>`<article class="book-construction-study"><h3>${title}</h3><div class="book-construction-placeholder">${note}</div></article>`).join('')}</section>`);
 development.insertAdjacentHTML('beforebegin',`<section class="case-section book-draft-experiment" id="book-draft"><div class="book-draft-copy"><div class="case-section-title"><h2>DRAFT EXPERIMENT</h2></div><div class="book-draft-reflection"><h3>Positive</h3><p>The tags suggest social restraint and the fear of imposed labels, reinforcing the book’s concept. The black-and-white palette strengthens this message, using black for concealment and white for exposure.</p><h3>Negative</h3><p>The scattered white tags weaken the intended circular spotlight. A clearer arrangement would strengthen this central device for revealing what is hidden.</p></div></div><div class="book-draft-content"><figure class="book-draft-gallery"><div class="book-draft-slides" aria-label="Draft experiment photographs"><img class="is-active" src="assets/book-draft-label-collage.png" alt="Tag label book design" aria-hidden="false"><img src="assets/book-draft-tags-alone.jpg" alt="Individual fabric tags" aria-hidden="true"></div><figcaption>01 / TAG LABEL BOOK DESIGN</figcaption><div class="book-draft-controls" role="group" aria-label="Draft photographs"><button type="button" data-draft-step="-1" aria-label="Previous draft photograph">←</button><button type="button" data-draft-step="1" aria-label="Next draft photograph">→</button></div></figure></div></section>`);
 const typography=page.querySelector('.book-construction-study .book-construction-placeholder');
 typography.className='book-typography-specimen';
 typography.innerHTML='<figure class="rei-font-frame type-screenshot-frame"><img class="type-screenshot" src="assets/book-type-futura.png" alt="Futura specimen: The Artificial Spotlight in bold, regular and light italic"></figure>';
 development.querySelector('.rei-font-choice').remove();
 development.classList.add('book-material-tabs-section');
 const materialTabs=document.createElement('div');materialTabs.className='film-light-tabs book-process-tabs';materialTabs.setAttribute('role','tablist');materialTabs.setAttribute('aria-label','Materials and processes');
 const materialPanels=[studies,development.querySelector('.book-artificial-overlays')];
 ['01 / Natural Form','02 / Artificial Overlays'].forEach((label,i)=>{const button=document.createElement('button');button.type='button';button.id='book-process-tab-'+i;button.textContent=label;button.setAttribute('role','tab');button.setAttribute('aria-controls','book-process-panel-'+i);button.setAttribute('aria-selected',String(i===0));button.tabIndex=i===0?0:-1;materialTabs.appendChild(button);const panel=materialPanels[i];panel.id='book-process-panel-'+i;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',button.id);panel.tabIndex=0;panel.hidden=i!==0});
 development.querySelector('.visual-heading').after(materialTabs);
 const construction=page.querySelector('.book-construction');
 const constructionTabs=document.createElement('div');constructionTabs.className='film-light-tabs book-process-tabs';constructionTabs.setAttribute('role','tablist');constructionTabs.setAttribute('aria-label','Typography and construction');
 construction.querySelectorAll('.book-construction-study').forEach((panel,i)=>{const heading=panel.querySelector('h3'),tab=document.createElement('button');tab.type='button';tab.id='book-construction-tab-'+i;tab.textContent=String(i+1).padStart(2,'0')+' / '+heading.textContent;tab.setAttribute('role','tab');tab.setAttribute('aria-controls','book-construction-panel-'+i);tab.setAttribute('aria-selected',String(i===0));tab.tabIndex=i===0?0:-1;constructionTabs.appendChild(tab);panel.id='book-construction-panel-'+i;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tab.id);panel.tabIndex=0;panel.hidden=i!==0;heading.remove()});
 construction.querySelector('.visual-heading').after(constructionTabs);
 construction.querySelector('#book-construction-panel-1').innerHTML=`<div class="book-construction-images book-string-images">${[['book-string-open.png','01 / INTERIOR STRING COMPOSITION','White strings connect chemical names to a circular opening across the open book'],['book-string-cover.png','02 / COVER STRING COMPOSITION','White strings form a spotlight-like fan above an opening in the black cover']].map(([file,label,alt])=>`<figure><img src="assets/${file}" alt="${alt}" loading="lazy"><figcaption>${label}</figcaption></figure>`).join('')}</div>`;
 construction.querySelector('#book-construction-panel-2').innerHTML='<div class="book-construction-images book-diecut-image"><figure><img src="assets/book-die-cut.png" alt="Circular die-cut opening revealing a red textured overlay on tracing paper, with white threads attached along the edge" loading="lazy"><figcaption>01 / CIRCULAR DIE-CUT &amp; LAYERED OVERLAY</figcaption></figure></div>';
 const constructionNotes=[
 'I chose Futura for its elegant, minimal appearance and clear, legible letterforms. In its lighter weight, the fine strokes and elongated verticals suggest beams of light, quietly reinforcing the spotlight motif without competing with the book’s textures and imagery.',
 'I used white strings to connect chemical names to the die-cut openings, forming beams that resemble a spotlight. Their physical tension guides the eye from the coatings’ composition to the enhanced surface, making that relationship tangible. I wanted the strings to suggest the pressure of social expectations directing what we place in the spotlight.',
 'I used circular die-cut openings to frame the artificial coatings like a spotlight, while the tracing-paper overlays partly conceal the eucalyptus-oil prints beneath. This selective view reflects how enhanced appearances attract attention while natural qualities remain hidden. Turning the pages invites readers to look beyond the surface and discover what the coating conceals.'
 ];
 constructionNotes.forEach((text,i)=>{const panel=construction.querySelector('#book-construction-panel-'+i);panel.classList.add('book-construction-explained');const paragraph=document.createElement('p');paragraph.className='book-construction-explanation';paragraph.textContent=text;panel.appendChild(paragraph)});
 const bookPages=['p1','p2','p3','apple-p1','apple-p2','apple-p3','hand-p1','hand-p2','hand-p3','mouth-p1','mouth-p2','mouth-p3'];
 page.querySelector('#book-final').insertAdjacentHTML('afterend',`<section class="book-page-viewer" id="book-pages" aria-labelledby="book-pages-title"><h3 class="campaign-mockup-title" id="book-pages-title">02 / BOOK PAGES</h3><figure class="book-page-main"><div class="book-page-empty">BOOK PAGE PHOTOGRAPHS TO BE ADDED</div><button type="button" class="book-page-enlarge" hidden aria-label="Enlarge selected book page"><img alt=""></button><figcaption><span class="book-page-caption" aria-live="polite">THE ARTIFICIAL SPOTLIGHT / PAGE DETAILS</span><span class="book-page-controls"><button type="button" data-book-page-step="-1" disabled aria-label="Previous book page">←</button><span class="book-page-count">— / —</span><button type="button" data-book-page-step="1" disabled aria-label="Next book page">→</button></span></figcaption></figure><div class="book-page-thumbnails" role="group" aria-label="Choose a book page"></div></section>`);
 const pageViewer=page.querySelector('.book-page-viewer');
 pageViewer.querySelector('.book-page-empty').remove();
 const firstPage=pageViewer.querySelector('.book-page-enlarge');firstPage.hidden=false;firstPage.querySelector('img').src='assets/book-page-p1.jpg';firstPage.querySelector('img').alt='Salmon chapter: chemical names and strings framing the coloured overlay';
 pageViewer.querySelector('.book-page-caption').textContent='01 / SALMON — SPOTLIGHT';
 pageViewer.querySelector('.book-page-count').textContent='01 / 12';
 pageViewer.querySelectorAll('[data-book-page-step]').forEach(button=>button.disabled=false);
 const pageLabels=['SALMON — SPOTLIGHT','SALMON — COLOURED OVERLAY','SALMON — NATURAL PRINT','APPLE — SPOTLIGHT','APPLE — WAX OVERLAY','APPLE — NATURAL PRINT','HAND — SPOTLIGHT','HAND — NAIL POLISH OVERLAY','HAND — NATURAL PRINT','MOUTH — SPOTLIGHT','MOUTH — WHITENING OVERLAY','MOUTH — NATURAL PRINT'];
 pageViewer.querySelector('.book-page-thumbnails').innerHTML=bookPages.map((file,i)=>`<button type="button" data-book-page-index="${i}" data-src="assets/book-page-${file}.jpg" data-label="${String(i+1).padStart(2,'0')} / ${pageLabels[i]}" aria-label="Show ${pageLabels[i]}" aria-pressed="${i===0}"><img src="assets/book-page-${file}.jpg" alt="" loading="lazy"><span>${String(i+1).padStart(2,'0')}</span></button>`).join('');
 const navigation=page.querySelector('.case-sections');
 const developmentLink=navigation.querySelector('[href="#book-development"]');
 developmentLink.insertAdjacentHTML('beforebegin','<a href="#book-draft">03 DRAFT EXPERIMENT</a>');
 developmentLink.textContent='04 MATERIALS & PROCESSES';
 developmentLink.insertAdjacentHTML('afterend','<a href="#book-construction">05 TYPOGRAPHY &amp; CONSTRUCTION</a>');
 navigation.querySelector('[href="#book-final"]').textContent='06 FINAL PRESENTATION';
 navigation.querySelector('[href="#book-application"]').textContent='07 APPLICATION';
 return template.innerHTML;
}

// Draft experiment slideshow: reset its timer after manual navigation.
(()=>{
 let timer,observer;
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let reschedule=()=>{};
 function prepare(){
  clearTimeout(timer);observer?.disconnect();reschedule=()=>{};
  const gallery=document.querySelector('.book-draft-gallery');if(!gallery)return;
  const images=[...gallery.querySelectorAll('img')],caption=gallery.querySelector('figcaption');
  const labels=['01 / TAG LABEL BOOK DESIGN','02 / INDIVIDUAL FABRIC TAGS'];
  let index=0,visible=false;
  function show(next){index=(next+images.length)%images.length;images.forEach((img,i)=>{img.classList.toggle('is-active',i===index);img.setAttribute('aria-hidden',String(i!==index))});caption.textContent=labels[index]}
  function schedule(){clearTimeout(timer);if(visible&&!document.hidden&&!motion.matches)timer=setTimeout(()=>{show(index+1);schedule()},2000)}
  gallery.querySelectorAll('[data-draft-step]').forEach(button=>button.addEventListener('click',()=>{show(index+Number(button.dataset.draftStep));schedule()}));
  observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()},{threshold:.1});observer.observe(gallery);
  reschedule=schedule;
 }
 new MutationObserver(prepare).observe(document.querySelector('#project-view'),{childList:true});
 document.addEventListener('visibilitychange',()=>reschedule());motion.addEventListener('change',()=>reschedule());prepare();
})();
// Continuously moving vertical loop, matching the application carousel interaction.
(()=>{
 let frame,observer,sizeObserver;
 let align=()=>{};
 function prepare(){
  cancelAnimationFrame(frame);observer?.disconnect();sizeObserver?.disconnect();align=()=>{};
  const gallery=document.querySelector('.book-material-carousel');if(!gallery)return;
  const viewport=gallery.querySelector('.book-material-viewport'),track=gallery.querySelector('.book-material-track');
  const group=document.createElement('div');group.className='book-material-group';
  [...track.children].forEach(figure=>{figure.tabIndex=0;group.append(figure)});
  const copy=group.cloneNode(true);copy.setAttribute('aria-hidden','true');copy.querySelectorAll('figure').forEach(figure=>figure.tabIndex=-1);copy.querySelectorAll('img').forEach(img=>img.alt='');
  track.append(copy,group,copy.cloneNode(true));
  const fontBox=gallery.closest('.visual-development').querySelector('.rei-font-frame:last-child');
  align=()=>{
   if(matchMedia('(max-width:700px)').matches){viewport.style.removeProperty('height');return}
   if(!fontBox){viewport.style.removeProperty('height');return}
   const height=fontBox.getBoundingClientRect().bottom-viewport.getBoundingClientRect().top;
   if(height>0)viewport.style.height=height+'px';
  };
  sizeObserver=new ResizeObserver(align);if(fontBox)sizeObserver.observe(fontBox);sizeObserver.observe(gallery.closest('.visual-development'));
  requestAnimationFrame(align);document.fonts.ready.then(()=>{if(gallery.isConnected)align()});
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let visible=false,last=0,manual=0,manualMode=false;
  function normalize(){const height=group.getBoundingClientRect().height;if(height>0){if(viewport.scrollTop<height)viewport.scrollTop+=height;else if(viewport.scrollTop>=height*2)viewport.scrollTop-=height}}
  viewport.scrollTop=group.getBoundingClientRect().height;
  function move(direction){
   manualMode=true;
   const top=viewport.getBoundingClientRect().top+viewport.clientTop+parseFloat(getComputedStyle(viewport).paddingTop||0);
   const positions=[...track.querySelectorAll('figure')].map(figure=>figure.getBoundingClientRect().top-top+viewport.scrollTop);
   const current=viewport.scrollTop+manual;
   const target=direction>0?positions.find(position=>position>current+2):positions.slice().reverse().find(position=>position<current-2);
   if(target===undefined)return;
   if(motion.matches){viewport.scrollTop=target;manual=0;normalize()}else manual=target-viewport.scrollTop;
  }
  gallery.querySelectorAll('[data-material-step]').forEach(button=>button.onclick=()=>move(Number(button.dataset.materialStep)));
  viewport.onkeydown=event=>{if(event.key==='ArrowUp'||event.key==='ArrowDown'){event.preventDefault();move(event.key==='ArrowUp'?-1:1)}};
  function tick(time){
   if(!gallery.isConnected)return;
   const elapsed=last?Math.min(time-last,50):0;last=time;
   if(Math.abs(manual)>.5){const delta=Math.sign(manual)*Math.min(Math.abs(manual),elapsed*.85);viewport.scrollTop+=delta;manual-=delta}
   else if(Math.abs(manual)>0){viewport.scrollTop+=manual;manual=0}
   else if(visible&&!manualMode&&!motion.matches&&!document.hidden&&!gallery.matches(':hover')&&!gallery.contains(document.activeElement))viewport.scrollTop-=elapsed*.032;
   normalize();frame=requestAnimationFrame(tick);
  }
  observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting},{threshold:0});observer.observe(gallery);frame=requestAnimationFrame(tick);
 }
 window.addEventListener('resize',()=>align());
 new MutationObserver(prepare).observe(document.querySelector('#project-view'),{childList:true});prepare();
})();
(()=>{
 function prepareBookPages(){
  const viewer=document.querySelector('.book-page-viewer');if(!viewer||viewer.dataset.ready)return;viewer.dataset.ready='true';const thumbs=[...viewer.querySelectorAll('[data-book-page-index]')];let index=0;
  const main=viewer.querySelector('.book-page-enlarge img');
  function show(next){index=(next+thumbs.length)%thumbs.length;const selected=thumbs[index];main.src=selected.dataset.src;main.alt=selected.dataset.label;viewer.querySelector('.book-page-caption').textContent=selected.dataset.label;viewer.querySelector('.book-page-count').textContent=String(index+1).padStart(2,'0')+' / '+String(thumbs.length).padStart(2,'0');thumbs.forEach((button,i)=>button.setAttribute('aria-pressed',String(index===i)))}
  const dialog=document.createElement('dialog');dialog.className='book-pages-dialog';dialog.innerHTML='<button type="button" aria-label="Close book page">CLOSE ×</button><img alt="">';viewer.appendChild(dialog);
  viewer.querySelector('.book-page-enlarge').addEventListener('click',()=>{const image=dialog.querySelector('img');image.src=main.src;image.alt=main.alt;dialog.showModal()});dialog.querySelector('button').addEventListener('click',()=>dialog.close());
  thumbs.forEach((button,i)=>button.addEventListener('click',()=>show(i)));viewer.querySelectorAll('[data-book-page-step]').forEach(button=>button.addEventListener('click',()=>show(index+Number(button.dataset.bookPageStep))));
 }
 new MutationObserver(prepareBookPages).observe(document.querySelector('#project-view'),{childList:true});prepareBookPages();
})();