/* Rei Kawakubo case study: shares Casa Mila's vertical presentation system. */
function reiProjectPage(){
 const blank=(kind,label)=>`<div class="rei-placeholder ${kind}" role="img" aria-label="${label} image placeholder"></div>`;
 const brief=[
 ['Criteria','Create an immediate visual connection to Kawakubo’s dress through colour, texture and composition. Communicate the tension between fragility and resilience through contrasting visual qualities.'],
 ['Constraints','Translate sculptural forms into a compact printed format while maintaining legibility and a clear reading sequence.'],
 ['Audience','Fashion and design enthusiasts, including newcomers to Kawakubo’s work, interested in experimental fashion and material expression.']
 ].map(([title,description])=>`<div class="case-brief-row"><div><h3>${title}</h3><p>${description}</p></div></div>`).join('');
 const studies=[
 ['visual-L-pam.jpg','Detail of patterned fabric and mesh','Material Resilience','I isolate close-up details of the dress’s substantial polyester fabrics, drawing out deep blue, black, magenta and brown to convey visual weight and resilience.'],
 ['purplemesh-VL-pam.jpg','Detail of lavender fabric and mesh','Delicate Fragility','I layer details of the dress’s mesh over soft lavender to suggest gentle movement and softness, contrasting with the visual weight of the polyester.'],
 ['silver-VL-pam.jpg','Detail of silver-grey material','Avant-Garde Expression','I use silver paper as the pamphlet’s primary backdrop to echo the dress’s unconventional composition and express my interpretation of Kawakubo’s avant-garde aesthetic.']
 ].map(([file,alt,title,description])=>`<article class="visual-study"><div class="study-image rei-material-photo" role="img" aria-label="${alt}" style="background-image:url('assets/${file}')"></div><div><h3>${title}</h3><p>${description}</p></div></article>`).join('');
 const applications=`<section class="case-final-mockups rei-application-carousel" id="rei-application-1" aria-labelledby="rei-application-carousel-title"><h3 class="campaign-mockup-title" id="rei-application-carousel-title">01 / EXHIBITION &amp; ENVIRONMENTAL GRAPHICS</h3><div class="campaign-mockup-grid">${[
 ['rei-application-flags.png','Outdoor exhibition flags','Four freestanding flags displaying the pamphlet artwork outdoors'],
 ['rei-application-gallery.png','Suspended gallery banners','Four textile banners suspended in a gallery interior'],
 ['rei-application-ngv.png','Entrance poster display · NGV','Paired promotional posters flanking the NGV entrance'],
 ['rei-application-facade.png','Large-format façade banners','Four large promotional banners installed across a historic building façade']
 ].map(([file,label,alt])=>`<figure><img src="assets/${file}" alt="${alt}" loading="lazy"><figcaption><span class="mockup-proposal">PROPOSED APPLICATION</span><span>${label}</span></figcaption></figure>`).join('')}</div></section>`;
 return `<div class="casa-case rei-case">
 <a class="case-back" href="#work">← BACK TO ALL WORKS</a>
 <header class="case-split-hero"><div class="case-hero-media"><div class="rei-hero-slideshow" aria-label="Rei Kawakubo pamphlet pages">${[1,2,3,4].map((n,i)=>`<img class="${i===0?'is-active':''}" src="assets/${n===1?'rei-pamphlet-opening-new.jpg':`rei-pamphlet-p${n}.jpg`}" alt="Rei Kawakubo pamphlet, page ${n}" width="480" height="825" aria-hidden="${i!==0}">`).join('')}</div></div><div class="case-hero-copy"><h1>REI KAWAKUBO</h1><div class="case-summary"><span class="case-kicker">DESCRIPTION OF PROJECT</span><p>A pamphlet exploring fragility and resilience through Rei Kawakubo’s Uncertain Future dress (Look 4, 2025). Sculptural volumes, layered fabrics and contrasting opacity guide a closer reading of the garment, inviting viewers to look beyond its unusual silhouette and discover how its materials express both qualities.</p><dl><div><dt>PROJECT</dt><dd>Rei Kawakubo</dd></div><div><dt>DISCIPLINE</dt><dd>Pamphlet design</dd></div></dl><small class="rei-project-note">Independent design project. Not affiliated with Rei Kawakubo or Comme des Garçons.</small></div></div></header>
 <nav class="case-sections" aria-label="Project sections"><a href="#rei-research">01 RESEARCH</a><a href="#rei-brief">02 BRIEF</a><a href="#rei-development">03 DEVELOPMENT</a><a href="#rei-final">04 FINAL PRESENTATION</a><a href="#rei-application">05 APPLICATION</a></nav>
 <section class="case-section inspiration-section" id="rei-research"><div class="inspiration-heading"><h2>INSPIRATION</h2></div><figure class="rei-research-media"><img class="rei-research-image" src="assets/rei-inspiration-finalLL.jpg" alt="Sculptural dress by Rei Kawakubo with layered mesh and colourful fabric" width="1280" height="1672" loading="lazy"></figure><div class="inspiration-story"><div class="inspiration-context"><span class="case-kicker">ABOUT THE ARTIST AND DRESS</span><p>Rei Kawakubo is a Japanese fashion designer and founder of Comme des Garçons. Her Uncertain Future dress (Look 4, 2025) explores the coexistence of fragility and resilience.</p></div><div class="inspiration-observation"><span class="case-kicker">A PERSONAL OBSERVATION</span><p>I interpreted the dress’s theme of fragility and resilience through its materials and colour composition. Soft lavender, grey and white suggest delicacy, contrasting with dense patterns and sculptural structures that I read as expressions of resilience.</p></div></div></section>
 <section class="case-section case-brief" id="rei-brief"><div class="case-section-title"><h2>THE BRIEF</h2></div><div class="case-section-content">${brief}</div></section>
 <section class="case-section visual-development" id="rei-development"><header class="visual-heading"><div><h2>VISUAL LANGUAGE</h2></div><p>INSPIRED BY REI KAWAKUBO AND SELF DEVELOPED</p></header><div class="visual-studies">${studies}</div><aside class="moon-study rei-font-choice" aria-labelledby="rei-font-choice-title"><h3 id="rei-font-choice-title">Font choice</h3><figure class="rei-font-frame"><figcaption>DENGXIAN</figcaption><div class="rei-font-sample rei-font-dengxian"><span class="rei-type-bold">Rei</span><br><span class="rei-type-medium">Kawa</span> <span class="rei-type-light">Kubo</span></div></figure><figure class="rei-font-frame"><figcaption>FOUNDERS GROTESK</figcaption><div class="rei-font-sample rei-font-founders"><span class="rei-type-bold">Rei</span><br><span class="rei-type-medium rei-type-italic">Kawa</span> <span class="rei-type-light">Kubo</span></div></figure></aside></section>
 <section class="case-final" id="rei-final"><div class="case-section-title"><h2>FINAL<br>PRESENTATION</h2></div><figure class="case-final-art"><div class="rei-final-slideshow" aria-label="Final pamphlet: front, back and curtain-open views"><img class="is-active rei-final-front" src="assets/rei-final-front.png" alt="Front view of the folded Rei Kawakubo pamphlet" aria-hidden="false"><img class="rei-final-back" src="assets/rei-final-back.jpg" alt="Back view of the open Rei Kawakubo pamphlet" aria-hidden="true"><img class="rei-final-curtain" src="assets/rei-final-curtain.png" alt="Curtain-open view of the Rei Kawakubo pamphlet" aria-hidden="true"></div><figcaption class="rei-final-caption">01 / FRONT VIEW — FOLDED PAMPHLET</figcaption><div class="rei-final-controls" role="group" aria-label="Pamphlet views"><button type="button" data-rei-final-step="-1" aria-label="Previous pamphlet view">←</button><button type="button" data-rei-final-step="1" aria-label="Next pamphlet view">→</button></div></figure></section>
 <section class="case-final-mockups rei-spreads" aria-labelledby="rei-spreads-title"><h3 class="campaign-mockup-title" id="rei-spreads-title">02 / UNFOLDED PAMPHLET</h3><div class="rei-spread-list"><figure><img src="assets/rei-spread-exterior.png" alt="Complete exterior spread of the Rei Kawakubo pamphlet" loading="lazy"><figcaption>EXTERIOR SPREAD / COVER AND OUTER PANELS</figcaption></figure><figure><img src="assets/rei-spread-interior.jpg" alt="Complete interior spread of the Rei Kawakubo pamphlet" loading="lazy"><figcaption>INTERIOR SPREAD / ARTIST, THEME AND MATERIALS</figcaption></figure></div></section>
 <section class="case-application" id="rei-application"><header class="application-heading"><div class="case-section-title"><h2>APPLICATION</h2></div><p>The pamphlet’s visual language extends into proposed exhibition flags, suspended banners and architectural displays, bringing its contrast of fragility and resilience into gallery and public settings.</p></header><nav class="application-index" aria-label="Application subsections"><a href="#rei-application-1">01 PROPOSED APPLICATIONS ↘</a></nav></section>${applications}
 <footer class="case-end"><a href="#project-2">NEXT PROJECT / CASA MILA ↗</a></footer></div>`;
}

// Two seconds per page, preserving the supplied order and cleaning up on navigation.
(()=>{
 let timer,observer;
 function prepare(){
  clearTimeout(timer);observer?.disconnect();
  const gallery=document.querySelector('.rei-hero-slideshow');if(!gallery)return;
  const images=[...gallery.querySelectorAll('img')];let index=0,visible=false;
  function schedule(){clearTimeout(timer);if(visible&&!document.hidden&&!matchMedia('(prefers-reduced-motion:reduce)').matches)timer=setTimeout(()=>{images[index].classList.remove('is-active');images[index].setAttribute('aria-hidden','true');index=(index+1)%images.length;images[index].classList.add('is-active');images[index].setAttribute('aria-hidden','false');schedule()},2000)}
  observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()},{threshold:.1});observer.observe(gallery);
  gallery._schedule=schedule;
 }
 // This file loads before app.js; the route inserts the first page afterwards.
 const view=document.querySelector('#project-view');new MutationObserver(prepare).observe(view,{childList:true});prepare();
 document.addEventListener('visibilitychange',()=>document.querySelector('.rei-hero-slideshow')?._schedule?.());
})();

// Final presentation: captions and manual controls share the automatic slideshow state.
(()=>{
 let timer,observer,gallery;
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const labels=['01 / FRONT VIEW — FOLDED PAMPHLET','02 / REVERSE VIEW — OPEN SPREAD','03 / CURTAIN-OPEN VIEW — INTERIOR REVEAL'];
 function prepareFinal(){
  clearTimeout(timer);observer?.disconnect();
  gallery=document.querySelector('.rei-final-slideshow');if(!gallery)return;
  const figure=gallery.closest('figure'),caption=figure.querySelector('.rei-final-caption');
  const images=[...gallery.querySelectorAll('img')];let index=0,visible=false;
  function show(next){
   images[index].classList.remove('is-active');images[index].setAttribute('aria-hidden','true');
   index=(next+images.length)%images.length;
   images[index].classList.add('is-active');images[index].setAttribute('aria-hidden','false');
   caption.textContent=images[index].dataset.caption||labels[index];
  }
  function schedule(){
   clearTimeout(timer);
   if(!visible||document.hidden||motion.matches)return;
   timer=setTimeout(()=>{show(index+1);schedule()},3000);
  }
  figure.querySelectorAll('[data-rei-final-step]').forEach(button=>button.addEventListener('click',()=>{
   show(index+Number(button.dataset.reiFinalStep));schedule();
  }));
  gallery._schedule=schedule;
  observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()},{threshold:.1});
  observer.observe(gallery);
 }
 new MutationObserver(prepareFinal).observe(document.querySelector('#project-view'),{childList:true});
 document.addEventListener('visibilitychange',()=>gallery?._schedule?.());
 motion.addEventListener('change',()=>gallery?._schedule?.());
 prepareFinal();
})();