document.querySelectorAll('.ph[data-img]').forEach(el=>{
  const f=el.dataset.img,i=new Image();
  i.onload=()=>{el.style.backgroundImage=`url(${f})`;el.classList.add('has');el.innerHTML='';el.dataset.ok=f};
  i.onerror=()=>{el.innerHTML=`<span>Add image:<br><b>${f}</b><br>${el.dataset.note||''}</span>`};
  i.src=f;
});
document.querySelectorAll('audio').forEach(a=>{
  a.addEventListener('error',()=>{if(a.nextElementSibling?.classList.contains('miss'))return;const n=document.createElement('p');n.className='miss';n.textContent='Audio file missing: '+a.getAttribute('src');a.after(n)});
  a.load();
});
const t=document.getElementById('type');
if(t){const s=t.dataset.text;let k=0;if(matchMedia('(prefers-reduced-motion:reduce)').matches){t.textContent=s}else(function w(){t.textContent=s.slice(0,++k);if(k<s.length)setTimeout(w,45)})()}
const ab=document.getElementById('anthem');
if(ab){const au=new Audio('audio/anthem-loop.mp3');au.loop=true;au.onerror=()=>{ab.textContent='Add audio/anthem-loop.mp3'};
 ab.onclick=()=>{if(au.paused){au.play().then(()=>ab.textContent='Stop the music').catch(()=>{})}else{au.pause();ab.textContent='Play the music'}}}
const qb=document.getElementById('qnext');
if(qb){const Q=[["At the risk of sounding ridiculous, the true revolutionary is guided by great feelings of love.","Man and Socialism in Cuba, 1965 (translated)"],["Hasta la victoria siempre.","Farewell letter to Fidel Castro, 1965"],["Many will call me an adventurer, and that I am, only of a different sort: one who risks his skin to prove his platitudes.","Letter to his parents, 1965 (translated)"],["Be capable of feeling deeply any injustice committed against anyone, anywhere in the world.","Letter to his children (translated)"]];
 let n=0;const q=document.getElementById('q'),c=document.getElementById('qc');
 const show=()=>{q.textContent=Q[n][0];c.textContent=Q[n][1];n=(n+1)%Q.length};qb.onclick=show;show()}
const lb=document.getElementById('lb');
if(lb){document.querySelectorAll('.gal .ph').forEach(p=>p.onclick=()=>{if(p.dataset.ok){lb.querySelector('img').src=p.dataset.ok;lb.classList.add('on')}});
 lb.onclick=()=>lb.classList.remove('on');addEventListener('keydown',e=>e.key==='Escape'&&lb.classList.remove('on'))}
const cv=document.getElementById('poster');
if(cv){const x=cv.getContext('2d'),inp=document.getElementById('ptext');
 function star(cx,cy,r){x.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.4:r;x.lineTo(cx+rr*Math.cos(a),cy+rr*Math.sin(a))}x.closePath();x.fill()}
 function draw(){x.fillStyle='#b3141b';x.fillRect(0,0,600,800);x.fillStyle='#17130e';x.fillRect(0,560,600,240);
  x.fillStyle='#e3b23c';star(300,260,170);x.fillStyle='#e6dcc3';x.textAlign='center';
  let w=(inp.value||'Your cause here').toUpperCase(),size=70;x.font=`bold ${size}px "Stardos Stencil",Impact,serif`;
  while(x.measureText(w).width>540&&size>20){size-=4;x.font=`bold ${size}px "Stardos Stencil",Impact,serif`}
  x.fillText(w,300,650);x.font='24px "Special Elite",monospace';x.fillText('HASTA LA VICTORIA SIEMPRE',300,720)}
 inp.oninput=draw;draw();document.fonts?.ready.then(draw);
 document.getElementById('pdl').onclick=()=>{const a=document.createElement('a');a.download='poster.png';a.href=cv.toDataURL();a.click()}}
