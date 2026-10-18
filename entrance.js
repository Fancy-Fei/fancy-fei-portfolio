(()=>{
 if(!document.documentElement.classList.contains('intro-active'))return;
 const overlay=document.createElement('div');overlay.className='entrance';overlay.setAttribute('aria-hidden','true');
 overlay.innerHTML='<div class="entrance-black"></div><div class="entrance-pair">'+[0,1].map(()=>'<span class="entrance-letter"><span class="entrance-outline">F</span><span class="entrance-fill">F</span><span class="entrance-serif">F</span></span>').join('')+'</div>';
 document.body.append(overlay);document.documentElement.classList.add("intro-mounted");
 const finish=()=>{document.querySelector('.hero .stage')?.getAnimations().forEach(a=>a.cancel());document.querySelector('.hero .interaction')?.getAnimations().forEach(a=>a.cancel());document.documentElement.classList.remove('intro-active','intro-mounted');overlay.remove()};
 const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 const animate=(el,frames,options)=>el.animate(frames,{fill:'forwards',...options}).finished;
 async function play(){
  if(document.readyState==="loading")await new Promise(resolve=>document.addEventListener("DOMContentLoaded",resolve,{once:true}));
  await document.fonts.ready;
  const letters=[...overlay.querySelectorAll('.entrance-letter')];
  
  await wait(180);
  await Promise.all(letters.map((el,i)=>animate(el.querySelector('.entrance-fill'),[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(-2px -16px -2px -2px)'}],{duration:700,delay:i*650,easing:'cubic-bezier(.4,0,.2,1)'})));
  await wait(120);
  await Promise.all(letters.flatMap(el=>[
   animate(el.querySelector('.entrance-fill'),[{transform:'skewX(0deg)',opacity:1},{transform:'skewX(-12deg)',opacity:0}],{duration:500}),
   animate(el.querySelector('.entrance-outline'),[{opacity:1},{opacity:0}],{duration:400}),
   animate(el.querySelector('.entrance-serif'),[{opacity:0,transform:'skewX(10deg)'},{opacity:1,transform:'skewX(0deg)'}],{duration:500})
  ]));

  await wait(1000);
  await Promise.all([
   animate(overlay.querySelector('.entrance-black'),[{opacity:1},{opacity:0}],{duration:700,easing:'cubic-bezier(.2,.6,.3,1)'}),
   animate(document.querySelector('.hero .stage'),[
    {transform:'scale(.08)',opacity:1,offset:0,easing:'ease-in'},
    {transform:'scale(.22)',opacity:1,offset:.25,easing:'cubic-bezier(.2,.7,.3,1)'},
    {transform:'scale(1.04)',opacity:1,offset:.8,easing:'ease-out'},
    {transform:'scale(1)',opacity:1,offset:1}
   ],{duration:1600,delay:150,easing:'linear',fill:'both'}),
   animate(document.querySelector('.hero .interaction'),[{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:500,delay:1100,easing:'ease-out'}),
   animate(overlay.querySelector('.entrance-pair'),[{opacity:1},{opacity:0}],{duration:700,easing:'cubic-bezier(.2,.6,.3,1)'})
  ]);
  finish();
 }
 play().catch(finish);
 setTimeout(finish,8500);
})();