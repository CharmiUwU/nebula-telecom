/* NEBULA TELECOM */

// Navbar scroll
(function(){
    const nav=document.getElementById('navbar');
    if(!nav)return;
    window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>10));
})();

// Mobile menu
(function(){
    const t=document.getElementById('menuToggle'),m=document.getElementById('mobileMenu');
    if(!t||!m)return;
    t.addEventListener('click',()=>{t.classList.toggle('active');m.classList.toggle('active');document.body.style.overflow=m.classList.contains('active')?'hidden':''});
    m.querySelectorAll('a').forEach(l=>l.addEventListener('click',()=>{t.classList.remove('active');m.classList.remove('active');document.body.style.overflow=''}));
})();

// Plan toggle
(function(){
    const bc=document.getElementById('toggleCombo'),bf=document.getElementById('toggleFibra'),bm=document.getElementById('toggleMovil');
    const gc=document.getElementById('plansCombo'),gf=document.getElementById('plansFibra'),gm=document.getElementById('plansMovil');
    if(!bc||!bf||!bm)return;
    const btns=[bc,bf,bm],grids=[gc,gf,gm];
    function go(i){btns.forEach(b=>b.classList.remove('active'));grids.forEach(g=>g.classList.add('hidden'));btns[i].classList.add('active');grids[i].classList.remove('hidden')}
    bc.addEventListener('click',()=>go(0));bf.addEventListener('click',()=>go(1));bm.addEventListener('click',()=>go(2));
})();

// FAQ accordion
(function(){
    const items=document.querySelectorAll('.faq-item');
    if(!items.length)return;
    items.forEach(item=>{
        const btn=item.querySelector('.faq-q'),ans=item.querySelector('.faq-a');
        if(!btn||!ans)return;
        btn.addEventListener('click',()=>{
            const open=item.classList.contains('active');
            items.forEach(o=>{o.classList.remove('active');const a=o.querySelector('.faq-a');if(a)a.style.maxHeight=null;const b=o.querySelector('.faq-q');if(b)b.setAttribute('aria-expanded','false')});
            if(!open){item.classList.add('active');ans.style.maxHeight=ans.scrollHeight+'px';btn.setAttribute('aria-expanded','true')}
        });
    });
})();

// Smooth scroll
(function(){
    document.querySelectorAll('a[href^="#"]').forEach(l=>{
        l.addEventListener('click',e=>{const t=document.querySelector(l.getAttribute('href'));if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-80,behavior:'smooth'})}});
    });
})();

// Coverage checker
(function(){
    const input=document.getElementById('covInput'),btn=document.getElementById('covBtn'),result=document.getElementById('covResult');
    if(!input||!btn||!result)return;
    function check(){
        const v=input.value.trim();
        if(!v)return;
        result.classList.remove('hidden');
        const title=document.getElementById('covResultTitle'),desc=document.getElementById('covResultDesc');
        if(title)title.textContent='Cobertura disponible en '+v;
        if(desc)desc.textContent='Fibra óptica hasta 10 Gbps y 5G disponibles en tu zona.';
    }
    btn.addEventListener('click',check);
    input.addEventListener('keydown',e=>{if(e.key==='Enter')check()});
})();

// Contact form
(function(){
    const f=document.getElementById('contactForm');
    if(!f)return;
    f.addEventListener('submit',e=>{
        e.preventDefault();
        const b=f.querySelector('button[type="submit"]'),txt=b.textContent;
        b.textContent='Enviando...';b.disabled=true;
        setTimeout(()=>{b.textContent='Solicitud enviada';b.style.background='#059669';b.style.borderColor='#059669';
            setTimeout(()=>{b.textContent=txt;b.style.background='';b.style.borderColor='';b.disabled=false;f.reset()},3000);
        },1500);
    });
})();
