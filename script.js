(() => { const k='vynoteka-academy-language'; let lang=localStorage.getItem(k)||'lv'; const setLang=x=>{lang=x;localStorage.setItem(k,x);document.documentElement.lang=x;document.querySelectorAll('[data-lv]').forEach(e=>e.hidden=x!=='lv');document.querySelectorAll('[data-ru]').forEach(e=>e.hidden=x!=='ru');document.getElementById('lvBtn')?.classList.toggle('active',x==='lv');document.getElementById('ruBtn')?.classList.toggle('active',x==='ru')};document.getElementById('lvBtn')?.addEventListener('click',()=>setLang('lv'));document.getElementById('ruBtn')?.addEventListener('click',()=>setLang('ru'));window.openSection=id=>{document.querySelectorAll('.section').forEach(s=>s.classList.toggle('active',s.id===id));document.querySelectorAll('.nav').forEach(n=>n.classList.toggle('active',n.dataset.target===id));let a=[...document.querySelectorAll('.nav')],i=a.findIndex(n=>n.dataset.target===id),p=Math.round((i+1)/a.length*100);if(i>=0){document.getElementById('progressFill').style.width=p+'%';document.getElementById('progressText').textContent=p+'%'}setLang(lang)};document.querySelectorAll('.nav').forEach(n=>n.addEventListener('click',()=>{openSection(n.dataset.target);window.scrollTo({top:0,behavior:'smooth'})}));window.finishExam=()=>{let q=[...document.querySelectorAll('.q')],c=0;q.forEach(x=>{let ok=x.querySelector('input:checked')?.value===x.dataset.a;x.classList.toggle('correct',ok);x.classList.toggle('incorrect',!ok&&!!x.querySelector('input:checked'));if(ok)c++});let s=Math.round(c/q.length*100),pass=s>=80,r=document.getElementById('result');r.className='result '+(pass?'pass':'fail');r.innerHTML='<div class="score">'+s+'%</div><b>'+ (pass?(lang==='lv'?'Tests ir nokārtots!':'Тест пройден!'):(lang==='lv'?'Mēģiniet vēlreiz.':'Попробуйте ещё раз.'))+'</b>'};if(location.pathname.endsWith('sparkling-wine.html')){let bar=document.createElement('div');bar.className='course-homebar';bar.innerHTML='<a href="index.html"><span data-ru>← Все курсы</span><span data-lv>← Visi kursi</span></a>';document.querySelector('.topbar')?.after(bar)}document.querySelectorAll('img[src^="assets/"]').forEach(i=>i.addEventListener('error',()=>i.closest('.hero-side,.label-guide-image,.guide-image-details')?.remove()));setLang(lang)})();

/* Keep the selected lesson heading at the top and add lesson-to-lesson controls to whisky. */
(() => {
  const scrollToModule = id => {
    requestAnimationFrame(() => {
      const section = document.getElementById(id);
      const anchor = section?.querySelector('.heading, .hero');
      if (!anchor) return;
      const header = document.querySelector('.topbar')?.offsetHeight || 0;
      const courseBar = document.querySelector('.course-homebar')?.offsetHeight || 0;
      window.scrollTo({top: Math.max(0, window.scrollY + anchor.getBoundingClientRect().top - header - courseBar - 18), behavior: 'smooth'});
    });
  };

  document.querySelectorAll('.nav').forEach(button => button.addEventListener('click', () => scrollToModule(button.dataset.target)));

  if (!document.querySelector('.whisky-app')) return;
  const navs = [...document.querySelectorAll('.whisky-app .nav')];
  document.querySelectorAll('.whisky-app .content > .section').forEach((section, index) => {
    const navigation = document.createElement('div');
    navigation.className = 'course-navigation';
    if (index > 0) {
      const back = document.createElement('button');
      back.type = 'button'; back.className = 'primary dark course-back';
      back.innerHTML = '<span data-ru>← Назад</span><span data-lv>← Atpakaļ</span>';
      back.addEventListener('click', () => { openSection(navs[index - 1].dataset.target); scrollToModule(navs[index - 1].dataset.target); });
      navigation.appendChild(back);
    }
    if (index < navs.length - 1) {
      const next = document.createElement('button');
      next.type = 'button'; next.className = 'primary dark course-next';
      next.innerHTML = '<span data-ru>Вперёд →</span><span data-lv>Tālāk →</span>';
      next.addEventListener('click', () => { openSection(navs[index + 1].dataset.target); scrollToModule(navs[index + 1].dataset.target); });
      navigation.appendChild(next);
    }
    if (navigation.children.length) section.appendChild(navigation);
  });
  document.querySelectorAll('[data-lv], [data-ru]').forEach(item => { item.hidden = false; });
  const language = document.documentElement.lang || 'lv';
  document.querySelectorAll(language === 'lv' ? '[data-ru]' : '[data-lv]').forEach(item => item.hidden = true);
})();
