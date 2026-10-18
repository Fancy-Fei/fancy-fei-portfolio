/* Sony project inherits the pamphlet case-study layout and shared interactions. */
function sonyProjectPage(){
 const template=document.createElement('template');template.innerHTML=reiProjectPage();
 const page=template.content.querySelector('.rei-case');page.classList.add('sony-case');
 page.querySelectorAll('[id]').forEach(el=>el.id=el.id.replace(/^rei-/,'sony-'));
 page.querySelectorAll('[href^="#rei-"]').forEach(el=>el.setAttribute('href',el.getAttribute('href').replace('#rei-','#sony-')));
 page.querySelectorAll('[aria-labelledby]').forEach(el=>el.setAttribute('aria-labelledby',el.getAttribute('aria-labelledby').replace(/rei-/g,'sony-')));
 page.querySelector('h1').textContent='RENEW SONY THROUGH COLOUR';
 page.querySelector('.case-summary>p').textContent='This rebrand promotes Sony’s new True RGB display technology through a refreshed logotype that captures its vivid colour and fine detail, turning the logo itself into an advertisement for the viewing experience.';
 const details=page.querySelectorAll('.case-summary dd');details[0].textContent='Renew SONY through colour';details[1].textContent='Rebranding';
 page.querySelector('.rei-project-note').remove();
 const hero=page.querySelector('.rei-hero-slideshow');
 hero.setAttribute('aria-label','Sony project opening artwork');
 hero.innerHTML='<img class="is-active" alt="Sony project opening image to be added" aria-hidden="false">';
 const placeholder='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="#e9e9e5"/></svg>');
 page.querySelectorAll('img').forEach(img=>{img.src=placeholder;img.alt='Sony project image to be added';img.removeAttribute('width');img.removeAttribute('height')});
 hero.setAttribute('aria-label','Sony opening artwork: S, O, N and Y');
 const openingImages=[['sony-overview.png','S','purple'],['sony-overview-o.png','O','blue'],['sony-overview-n.png','N','green'],['sony-overview-y.png','Y','yellow']];
 hero.innerHTML=openingImages.map(([file,letter,colour],i)=>`<img src="assets/${file}" class="${i===0?'is-active':''}" alt="Sony rebranding artwork with a ${colour}, black and silver ${letter} on white" aria-hidden="${i!==0}">`).join('');
 const reference=page.querySelector('.rei-research-media');
 reference.innerHTML='<img class="rei-research-image" src="assets/sony-bravia-reference.webp" alt="Existing Sony BRAVIA True RGB advertisement showing a television surrounded by red, green and blue light" width="2880" height="1620" loading="lazy"><figcaption>SONY BRAVIA / TRUE RGB<br>Existing advertisement by Sony. Reference image for this project.</figcaption>';
 page.querySelector('.inspiration-context .case-kicker').textContent='CONTEXT';
 page.querySelector('.inspiration-context p').textContent='True RGB is Sony’s new BRAVIA display technology, designed to control red, green and blue colour channels independently to produce a wider range of hues and finer visual detail.';
 page.querySelector('.inspiration-observation p').textContent='I chose True RGB as the focus of my rebrand because I saw an opportunity to bring its innovative qualities into Sony’s visual identity. By expressing the experience of discovering fine detail through vivid colour within the logotype, I wanted the brand itself to offer a glimpse of the viewing experience it promotes.';
 const briefs=['Develop a refreshed Sony logotype and promotional applications that communicate True RGB’s vivid colour and fine detail. Create a cohesive identity that generates interest in the viewing experience while keeping the Sony name recognisable.','Maintain legible letterforms and a consistent visual language across print and digital applications. Provide versions for light and dark backgrounds, ensuring colour and photographic detail reproduce clearly.','Prospective television buyers, particularly film, gaming and home entertainment enthusiasts who value picture quality. Communicate the technology’s visual benefits clearly and immediately.'];
 page.querySelectorAll('.case-brief-row p').forEach((p,i)=>p.textContent=briefs[i]);
 const visual=page.querySelector('#sony-development');
 visual.classList.add('sony-visual-language');
 visual.innerHTML=`<header class="visual-heading"><div><h2>VISUAL LANGUAGE</h2></div></header>
 <article class="sony-language-row"><div class="sony-language-media"><div class="sony-letter-line">${[['sony-overview.png','Purple photographic S'],['sony-overview-o.png','Blue photographic O'],['sony-overview-n.png','Green photographic N'],['sony-overview-y.png','Yellow photographic Y']].map(([file,alt])=>`<figure><img src="assets/${file}" alt="${alt}" loading="lazy"></figure>`).join('')}</div><div class="sony-language-palette">${[['#9c42b5','Purple'],['#357fc4','Blue'],['#4aa34c','Green'],['#d1d538','Yellow']].map(([colour,label])=>`<span><i style="background:${colour}"></i>${label}</span>`).join('')}</div></div><div class="sony-language-copy"><h3>01 / Colour &amp; Detail</h3><p>I paired purple, blue, green and yellow with monochrome photographic textures. The contrast makes colour feel vivid while drawing attention to fine detail, translating the qualities of True RGB into the identity.</p></div></article>
 <article class="sony-language-row"><div class="sony-language-media sony-photo-grid">${[['butterfly','01 / BUTTERFLY','Yellow butterfly with detailed patterned wings on pink flowers'],['flower','02 / FLOWER','Purple flower showing fine petal textures and water droplets'],['bug','03 / BUG','Golden insect macro photograph showing fine hairs and surface detail'],['stone','04 / STONES','Grey patterned stones showing varied shapes and surface textures']].map(([file,label,alt])=>`<figure><button type="button" class="sony-photo-open" aria-label="View ${label} in detail"><img src="assets/sony-source-${file}.jpg" alt="${alt}" loading="lazy"></button><figcaption>${label}</figcaption></figure>`).join('')}</div><div class="sony-language-copy"><h3>02 / Photographic Letterforms</h3><p>I placed photographic details inside the recognisable Sony letterforms, making the logotype itself a space for discovery. I blurred the monochrome areas while keeping the coloured details sharp, suggesting that clarity is found through colour and inviting viewers to look closer.</p></div></article>
 <article class="sony-language-row"><div class="sony-language-media"><div class="sony-contrast-pair"><img src="assets/sony-final-white.jpg" alt="Final Sony logotype on white" loading="lazy"><img src="assets/sony-final-black.jpg" alt="Final Sony logotype on black" loading="lazy"></div></div><div class="sony-language-copy"><h3>03 / Light &amp; Contrast</h3><p>I developed versions for light and dark backgrounds to keep the identity adaptable. Coloured light trails extend the palette beyond the letters, suggesting light travelling from the screen into the surrounding space.</p></div></article>`;
 const languageRows=[...visual.querySelectorAll('.sony-language-row')];
 const languageTabs=document.createElement('div');languageTabs.className='film-light-tabs sony-experiment-tabs sony-language-tabs';languageTabs.setAttribute('role','tablist');languageTabs.setAttribute('aria-label','Visual language topics');
 languageRows.forEach((row,i)=>{
  const title=row.querySelector('h3'),tab=document.createElement('button');tab.type='button';tab.id='sony-language-tab-'+i;tab.textContent=title.textContent;tab.setAttribute('role','tab');tab.setAttribute('aria-controls','sony-language-panel-'+i);tab.setAttribute('aria-selected',String(i===0));tab.tabIndex=i===0?0:-1;languageTabs.appendChild(tab);
  row.id='sony-language-panel-'+i;row.setAttribute('role','tabpanel');row.setAttribute('aria-labelledby',tab.id);row.tabIndex=0;row.hidden=i!==0;title.remove();
 });
 visual.querySelector('.visual-heading').after(languageTabs);
 const experiments=[
  {id:'galaxy',label:'01 / Galaxy & Colour',hero:'sony-draft-galaxy.png',alt:'Pastel mint, pink and violet circular Sony emblem',variants:[['sony-draft-iridescent.png','Iridescent pastel Sony logotype'],['sony-draft-embossed.png','Embossed white Sony logotype']],colours:['#8bf9dd','#efa4ee','#6041ff','#ffffff','#cccccc','#140b26'],design:'I explored Sony’s pursuit of new realities through a planet-like form, using mint, pink and violet to suggest an unfamiliar, galaxy-like world.',evaluation:'The image worked on its own, but its link to Sony’s technology was vague. The playful pastels felt closer to toys or stationery, prompting a more direct connection to the product.'},
  {id:'spectrum',label:'02 / Light Spectrum',hero:'sony-draft-spectrum.jpg',alt:'Sony logotype above a glowing spectrum resembling a rising sun',variants:[['sony-draft-icy-blue.png','Icy blue gradient Sony wordmark'],['sony-draft-sunset.png','Grainy sunset gradient Sony wordmark']],colours:['#fbf4e4','#bdd1f8','#f5c742','#ed792a','#bc377d','#4b2c7d','#140b26'],design:'A semicircular spectrum echoes a rising sun and camera lens, connecting Sony’s screen products with light, excitement and discovery.',evaluation:'The application conveyed light and movement, but the letterforms broke up the spectrum. The metaphor became less clear inside the logo, pointing towards a more direct treatment of colour.'}
 ];
 page.querySelector('#sony-development').insertAdjacentHTML('beforebegin',`<section class="case-section sony-experiments" id="sony-experiment" aria-labelledby="sony-experiment-title"><header class="visual-heading"><div><h2 id="sony-experiment-title">EXPERIMENT</h2></div></header><div class="film-light-tabs sony-experiment-tabs" role="tablist" aria-label="Sony design experiments">${experiments.map((draft,i)=>`<button type="button" role="tab" id="sony-draft-tab-${draft.id}" aria-controls="sony-draft-panel-${draft.id}" aria-selected="${i===0}" tabindex="${i===0?0:-1}">${draft.label}</button>`).join('')}</div>${experiments.map((draft,i)=>`<div class="sony-experiment-panel" role="tabpanel" id="sony-draft-panel-${draft.id}" aria-labelledby="sony-draft-tab-${draft.id}" tabindex="0" ${i===0?'':'hidden'}><div class="sony-draft-artwork"><figure class="sony-draft-application"><img src="assets/${draft.hero}" alt="${draft.alt}" loading="lazy"></figure><div class="sony-draft-variants">${draft.variants.map(([file,alt])=>`<img src="assets/${file}" alt="${alt}" loading="lazy">`).join('')}</div></div><div class="sony-draft-notes"><div><h3>About the design</h3><p>${draft.design}</p></div><div><h3>Evaluation</h3><p>${draft.evaluation}</p></div><div class="sony-draft-palette" aria-label="Draft colour palette">${draft.colours.map(colour=>`<span style="background:${colour}" role="img" aria-label="Colour ${colour}"></span>`).join('')}</div></div></div>`).join('')}</section>`);
 const developmentLink=page.querySelector('.case-sections a[href="#sony-development"]');
 developmentLink.insertAdjacentHTML('beforebegin','<a href="#sony-experiment">03 EXPERIMENT</a>');
 developmentLink.textContent='04 VISUAL LANGUAGE';
 page.querySelector('.case-sections a[href="#sony-final"]').textContent='05 FINAL PRESENTATION';
 page.querySelector('.case-sections a[href="#sony-application"]').textContent='06 APPLICATION';
 const captions=['01 / LOGOTYPE — LIGHT BACKGROUND','02 / LOGOTYPE — DARK BACKGROUND'];
 const finalGallery=page.querySelector('.rei-final-slideshow');
 finalGallery.setAttribute('aria-label','Sony logotype on light and dark backgrounds');
 finalGallery.innerHTML=[['sony-final-white.jpg','Refreshed Sony logotype with coloured photographic details on white'],['sony-final-black.jpg','Refreshed Sony logotype with coloured photographic details on black']].map(([file,alt],i)=>`<img src="assets/${file}" alt="${alt}" class="${i===0?'is-active':''}" aria-hidden="${i!==0}" data-caption="${captions[i]}" loading="lazy">`).join('');
 page.querySelector('.rei-final-caption').textContent=captions[0];
 page.querySelector('.rei-final-controls').setAttribute('aria-label','Sony presentation views');
 page.querySelectorAll('[data-rei-final-step]').forEach(button=>button.setAttribute('aria-label',Number(button.dataset.reiFinalStep)<0?'Previous sony view':'Next sony view'));
 page.querySelector('.rei-spreads').remove();
 page.querySelector('.application-heading>p').textContent='The refreshed identity extends across a television display, product screens, a product collection webpage and a promotional poster series. Vivid colour and photographic detail connect these proposed applications, bringing the viewing experience into both the products and their promotion.';
 page.querySelector('.rei-application-carousel>h3').textContent='02 / DEVICE APPLICATIONS';
 const applicationImages=[
  ['20','01 / HANDHELD GAMING DEVICE','Handheld gaming device displaying the green N artwork'],
  ['21','02 / SMARTPHONE','Sony smartphone displaying the yellow Y artwork'],
  ['19','03 / XPERIA TABLET','Sony Xperia tablet displaying the blue O artwork'],
  ['18','04 / COMPACT CAMERA','Sony compact camera displaying the purple S artwork']
 ];
 page.querySelector('.rei-application-carousel .campaign-mockup-grid').innerHTML=applicationImages.map(([number,label,alt])=>`<figure><img src="assets/sony-application-${number}.jpg" alt="${alt}" loading="lazy"><figcaption><span class="mockup-proposal">PROPOSED APPLICATION</span><span>${label}</span></figcaption></figure>`).join('');
 const posters=[['10','01 / TELEVISION POSTER','Green television campaign poster'],['11','02 / SMARTPHONE POSTER','Yellow smartphone campaign poster'],['08','03 / CAMERA POSTER','Purple camera campaign poster'],['09','04 / TABLET POSTER','Blue tablet campaign poster'],['15','05 / AIRPORT DISPLAY','Television poster on an airport advertising display'],['16','06 / STREET DISPLAY','Smartphone poster displayed beside a pedestrian'],['13','07 / OUTDOOR DISPLAY','Camera poster displayed beside a cycle route'],['14','08 / INTERIOR DISPLAY','Tablet poster on an interior wall display']];
 page.querySelector('.rei-application-carousel').insertAdjacentHTML('afterend',`<section class="sony-posters" id="sony-application-2" aria-labelledby="sony-posters-title"><h3 class="campaign-mockup-title" id="sony-posters-title">03 / POSTER APPLICATION</h3><figure class="sony-poster-main"><a class="sony-poster-enlarge" data-portrait="true" href="assets/sony-poster-10.jpg" target="_blank" rel="noopener" aria-label="Open current poster at full size"><img src="assets/sony-poster-10.jpg" alt="${posters[0][2]}" loading="lazy"></a><figcaption><span class="sony-poster-label" aria-live="polite">${posters[0][1]}</span><span class="sony-poster-controls"><button type="button" data-sony-poster-step="-1" aria-label="Previous poster">←</button><span class="sony-poster-count">01 / 08</span><button type="button" data-sony-poster-step="1" aria-label="Next poster">→</button></span></figcaption></figure><div class="sony-poster-thumbnails" role="group" aria-label="Choose a poster or mockup">${posters.map(([number,label,alt],i)=>`<button type="button" data-sony-poster-index="${i}" data-src="assets/sony-poster-${number}.jpg" data-alt="${alt}" data-label="${label}" aria-label="Show ${label}" aria-pressed="${i===0}"><img src="assets/sony-poster-${number}.jpg" alt="" loading="lazy"><span>${String(i+1).padStart(2,'0')}</span></button>`).join('')}</div><p class="sony-poster-hint">Select a thumbnail or use the arrows. Click the main image to view full size.</p></section>`);
 page.querySelector('.application-index').insertAdjacentHTML('beforeend','<a href="#sony-application-2">02 POSTER APPLICATION ↘</a>');
 page.querySelector('.rei-application-carousel').insertAdjacentHTML('beforebegin','<section class="sony-television" id="sony-television" aria-labelledby="sony-television-title"><h3 class="campaign-mockup-title" id="sony-television-title">01 / TELEVISION DISPLAY</h3><div class="sony-tv-views" role="group" aria-label="Television application views"><button type="button" data-tv-view="room" aria-pressed="true">01 / IN CONTEXT</button><button type="button" data-tv-view="product" aria-pressed="false">02 / PRODUCT VIEW</button></div><figure><button class="sony-television-open" type="button" aria-label="Enlarge television display mockup"><img src="assets/sony-television-room.png" alt="Proposed Sony television identity in a modern white living room" loading="lazy"></button><figcaption><span class="sony-tv-caption">PROPOSED APPLICATION / LIVING ROOM DISPLAY</span><button type="button" class="sony-television-open">VIEW FULL SIZE ↗</button></figcaption></figure></section>');
 page.querySelector('.application-index').innerHTML='<a href="#sony-television">01 TELEVISION DISPLAY ↘</a><a href="#sony-application-1">02 DEVICE APPLICATIONS ↘</a><a href="#sony-application-2">03 POSTER APPLICATION ↘</a>';
 page.querySelector('.rei-application-carousel').insertAdjacentHTML('afterend','<section class="sony-webpage" id="sony-webpage" aria-labelledby="sony-webpage-title"><h3 class="campaign-mockup-title" id="sony-webpage-title">03 / WEBPAGE MOCKUP</h3><div class="sony-tv-views sony-webpage-views" role="group" aria-label="Webpage views"><button type="button" data-web-view="laptop" aria-pressed="true">01 / LAPTOP MOCKUP</button><button type="button" data-web-view="detail" aria-pressed="false">02 / WEBPAGE DETAIL</button></div><figure><button type="button" class="sony-webpage-open sony-webpage-art" aria-label="Enlarge Sony product webpage mockup"><img src="assets/sony-webpage-mockup.png" alt="Laptop displaying a proposed Sony product webpage featuring the camera, Xperia tablet, handheld gaming device and smartphone applications" loading="lazy"></button><figcaption><span>PROPOSED APPLICATION / PRODUCT COLLECTION WEBPAGE</span><button type="button" class="sony-webpage-open">ENLARGE &amp; EXPLORE ↗</button></figcaption></figure></section>');
 page.querySelector('#sony-posters-title').textContent='04 / POSTER APPLICATION';
 page.querySelector('.application-index').innerHTML='<a href="#sony-television">01 TELEVISION DISPLAY ↘</a><a href="#sony-application-1">02 DEVICE APPLICATIONS ↘</a><a href="#sony-webpage">03 WEBPAGE MOCKUP ↘</a><a href="#sony-application-2">04 POSTER APPLICATION ↘</a>';
 const next=page.querySelector('.case-end a');next.href='#project-1';next.textContent='NEXT PROJECT / COMME DES GARÇONS ↗';
 return template.innerHTML;
}

// Manual Sony poster viewer keeps the supplied order and supports keyboard navigation.
(()=>{
 function prepareSonyPosters(){
  const section=document.querySelector('.sony-posters');if(!section||section.dataset.ready)return;section.dataset.ready='true';
  const thumbs=[...section.querySelectorAll('[data-sony-poster-index]')],image=section.querySelector('.sony-poster-main img'),link=section.querySelector('.sony-poster-enlarge');let index=0;
  function show(next,focus=false){index=(next+thumbs.length)%thumbs.length;const selected=thumbs[index];image.src=selected.dataset.src;image.alt=selected.dataset.alt;link.href=selected.dataset.src;link.dataset.portrait=String(index<4);section.querySelector('.sony-poster-label').textContent=selected.dataset.label;section.querySelector('.sony-poster-count').textContent=String(index+1).padStart(2,'0')+' / 08';thumbs.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));if(focus)selected.focus()}
  const dialog=document.createElement('dialog');dialog.className='sony-poster-dialog';
  dialog.innerHTML='<button type="button" class="sony-poster-close" aria-label="Close full-size image">CLOSE ×</button><div class="sony-poster-full-crop"><img alt=""></div>';
  section.appendChild(dialog);
  const fullCrop=dialog.querySelector('.sony-poster-full-crop'),fullImage=fullCrop.querySelector('img');
  link.addEventListener('click',event=>{event.preventDefault();fullImage.src=image.src;fullImage.alt=image.alt;fullCrop.dataset.portrait=String(index<4);dialog.showModal();dialog.querySelector('button').focus()});
  dialog.querySelector('button').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
  dialog.addEventListener('keydown',event=>event.stopPropagation());
  thumbs.forEach((button,i)=>button.addEventListener('click',()=>show(i)));
  section.querySelectorAll('[data-sony-poster-step]').forEach(button=>button.addEventListener('click',()=>show(index+Number(button.dataset.sonyPosterStep))));
  section.addEventListener('keydown',event=>{if(event.altKey||event.ctrlKey||event.metaKey)return;let next;if(event.key==='ArrowRight')next=index+1;if(event.key==='ArrowLeft')next=index-1;if(event.key==='Home')next=0;if(event.key==='End')next=thumbs.length-1;if(next!==undefined){event.preventDefault();show(next,event.target.matches('[data-sony-poster-index]'))}});
 }
 new MutationObserver(prepareSonyPosters).observe(document.querySelector('#project-view'),{childList:true});prepareSonyPosters();
})();
(()=>{
 function prepareTelevision(){
  const section=document.querySelector('.sony-television');if(!section||section.dataset.ready)return;section.dataset.ready='true';
  const dialog=document.createElement('dialog');dialog.className='sony-tv-dialog';dialog.innerHTML='<button type="button" aria-label="Close television image">CLOSE ×</button><img src="assets/sony-television-application.jpg" alt="Proposed Sony television display with the refreshed logotype">';section.appendChild(dialog);
  const mainImage=section.querySelector('figure img');
  const views={room:['assets/sony-television-room.png','Proposed Sony television identity in a modern white living room','PROPOSED APPLICATION / LIVING ROOM DISPLAY'],product:['assets/sony-television-application.jpg','Proposed Sony television display showing the photographic logotype and coloured light trails','PROPOSED APPLICATION / PRODUCT VIEW']};
  section.querySelectorAll('[data-tv-view]').forEach(button=>button.addEventListener('click',()=>{const [src,alt,caption]=views[button.dataset.tvView];mainImage.src=src;mainImage.alt=alt;section.querySelector('.sony-tv-caption').textContent=caption;section.querySelectorAll('[data-tv-view]').forEach(view=>view.setAttribute('aria-pressed',String(view===button)))}));
  section.querySelectorAll('.sony-television-open').forEach(button=>button.addEventListener('click',()=>{const fullImage=dialog.querySelector('img');fullImage.src=mainImage.src;fullImage.alt=mainImage.alt;dialog.showModal()}));dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
 }
 new MutationObserver(prepareTelevision).observe(document.querySelector('#project-view'),{childList:true});prepareTelevision();
})();
(()=>{
 function prepareWebpage(){
  const section=document.querySelector('.sony-webpage');if(!section||section.dataset.ready)return;section.dataset.ready='true';
  const dialog=document.createElement('dialog');dialog.className='sony-webpage-dialog';dialog.innerHTML='<div class="sony-webpage-toolbar"><button type="button" class="sony-webpage-zoom" aria-pressed="false">ZOOM IN +</button><button type="button" class="sony-webpage-close">CLOSE ×</button></div><div class="sony-webpage-scroll"><div class="sony-webpage-full"><img src="assets/sony-webpage-mockup.png" alt="Proposed Sony product collection webpage on a laptop"></div></div>';section.appendChild(dialog);
  const zoom=dialog.querySelector('.sony-webpage-zoom');
  const mainImage=section.querySelector('figure img');
  const views={laptop:['assets/sony-webpage-mockup.png','Laptop displaying the proposed Sony product collection webpage'],detail:['assets/sony-webpage-detail.png','Detailed view of the proposed Sony product collection webpage']};
  section.querySelectorAll('[data-web-view]').forEach(button=>button.addEventListener('click',()=>{const [src,alt]=views[button.dataset.webView];mainImage.src=src;mainImage.alt=alt;section.dataset.view=button.dataset.webView;section.querySelectorAll('[data-web-view]').forEach(view=>view.setAttribute('aria-pressed',String(view===button)))}));
  section.querySelectorAll('.sony-webpage-open').forEach(button=>button.addEventListener('click',()=>{const fullImage=dialog.querySelector('.sony-webpage-full img');fullImage.src=mainImage.src;fullImage.alt=mainImage.alt;dialog.dataset.view=section.dataset.view||'laptop';dialog.classList.remove('is-zoomed');zoom.setAttribute('aria-pressed','false');zoom.textContent='ZOOM IN +';dialog.showModal()}));
  zoom.addEventListener('click',()=>{const active=dialog.classList.toggle('is-zoomed');zoom.setAttribute('aria-pressed',String(active));zoom.textContent=active?'FIT TO SCREEN −':'ZOOM IN +'});
  dialog.querySelector('.sony-webpage-close').addEventListener('click',()=>dialog.close());
 }
 new MutationObserver(prepareWebpage).observe(document.querySelector('#project-view'),{childList:true});prepareWebpage();
})();
// Source photographs can be inspected without leaving the case study.
(()=>{
 function preparePhotoDetails(){
  const grid=document.querySelector('.sony-photo-grid');if(!grid||grid.dataset.ready)return;grid.dataset.ready='true';
  const dialog=document.createElement('dialog');dialog.className='sony-photo-dialog';dialog.innerHTML='<div class="sony-photo-toolbar"><span class="sony-photo-title"></span><button type="button" class="sony-photo-zoom" aria-pressed="false">ZOOM IN +</button><button type="button" class="sony-photo-close" aria-label="Close photograph">CLOSE ×</button></div><div class="sony-photo-scroll"><img alt=""></div>';grid.closest('.sony-visual-language').appendChild(dialog);
  const image=dialog.querySelector('img'),zoom=dialog.querySelector('.sony-photo-zoom'),scroll=dialog.querySelector('.sony-photo-scroll');
  grid.querySelectorAll('.sony-photo-open').forEach(button=>button.addEventListener('click',()=>{const source=button.querySelector('img');image.src=source.src;image.alt=source.alt;dialog.querySelector('.sony-photo-title').textContent=button.closest('figure').querySelector('figcaption').textContent;dialog.classList.remove('is-zoomed');zoom.setAttribute('aria-pressed','false');zoom.textContent='ZOOM IN +';dialog.showModal();scroll.scrollTo(0,0)}));
  zoom.addEventListener('click',()=>{const active=dialog.classList.toggle('is-zoomed');zoom.setAttribute('aria-pressed',String(active));zoom.textContent=active?'FIT TO SCREEN −':'ZOOM IN +'});
  dialog.querySelector('.sony-photo-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('keydown',event=>event.stopPropagation());
 }
 new MutationObserver(preparePhotoDetails).observe(document.querySelector('#project-view'),{childList:true});preparePhotoDetails();
})();