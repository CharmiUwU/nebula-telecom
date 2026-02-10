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

// Configurator (combina page)
(function(){
    const fiberGrid=document.getElementById('cfgFiberGrid');
    const linesWrap=document.getElementById('cfgLines');
    const addLineBtn=document.getElementById('cfgAddLine');
    if(!fiberGrid||!linesWrap||!addLineBtn)return;

    const PLANS=[
        {data:'10 GB',price:9},
        {data:'30 GB',price:15},
        {data:'50 GB',price:19},
        {data:'Ilimitados',price:29}
    ];

    let selectedFiber=null; // {speed,price}
    let lines=[]; // [{plan index}]

    function addLine(planIdx){
        if(lines.length>=4)return;
        lines.push({plan:planIdx!==undefined?planIdx:0});
        renderLines();
        updateSummary();
    }

    function removeLine(i){
        lines.splice(i,1);
        renderLines();
        updateSummary();
    }

    function setLinePlan(i,planIdx){
        lines[i].plan=planIdx;
        renderLines();
        updateSummary();
    }

    function renderLines(){
        linesWrap.innerHTML='';
        lines.forEach(function(line,i){
            var card=document.createElement('div');
            card.className='cfg-line-card';
            var planBtns='';
            PLANS.forEach(function(p,pi){
                planBtns+='<button class="cfg-plan-btn'+(line.plan===pi?' active':'')+'" data-line="'+i+'" data-plan="'+pi+'"><span class="cfg-plan-data">'+p.data+'</span><span class="cfg-plan-price">'+p.price+'&euro;/mes</span></button>';
            });
            card.innerHTML='<div class="cfg-line-top"><div class="cfg-line-label"><div class="cfg-line-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></div><span class="cfg-line-name">L&iacute;nea '+(i+1)+'</span></div>'+(lines.length>1?'<button class="cfg-line-remove" data-remove="'+i+'"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>':'')+'</div><div class="cfg-plan-options">'+planBtns+'</div>';
            linesWrap.appendChild(card);
        });

        // event listeners
        linesWrap.querySelectorAll('.cfg-plan-btn').forEach(function(b){
            b.addEventListener('click',function(){
                setLinePlan(parseInt(b.dataset.line),parseInt(b.dataset.plan));
            });
        });
        linesWrap.querySelectorAll('.cfg-line-remove').forEach(function(b){
            b.addEventListener('click',function(){
                removeLine(parseInt(b.dataset.remove));
            });
        });

        // toggle add button
        if(lines.length>=4)addLineBtn.classList.add('hidden');
        else addLineBtn.classList.remove('hidden');
    }

    function updateSummary(){
        var itemsWrap=document.getElementById('cfgSummaryItems');
        var totalsWrap=document.getElementById('cfgSummaryTotals');
        var emptyMsg=document.getElementById('cfgSummaryEmpty');
        var subtotalEl=document.getElementById('cfgSubtotal');
        var discountEl=document.getElementById('cfgDiscount');
        var discountRow=document.getElementById('cfgDiscountRow');
        var lineDiscountEl=document.getElementById('cfgLineDiscount');
        var lineDiscountRow=document.getElementById('cfgLineDiscountRow');
        var totalEl=document.getElementById('cfgTotal');
        if(!itemsWrap)return;

        var html='';
        var subtotal=0;

        if(selectedFiber){
            html+='<div class="cfg-summary-item"><div><span class="cfg-summary-item-label">Fibra '+selectedFiber.label+'</span><span class="cfg-summary-item-sub">Sim&eacute;tricos &middot; Router incluido</span></div><span class="cfg-summary-item-price">'+selectedFiber.price+'&euro;</span></div>';
            subtotal+=selectedFiber.price;
        }

        lines.forEach(function(line,i){
            var p=PLANS[line.plan];
            html+='<div class="cfg-summary-item"><div><span class="cfg-summary-item-label">L&iacute;nea '+(i+1)+'</span><span class="cfg-summary-item-sub">'+p.data+' 5G &middot; Llamadas ilimitadas</span></div><span class="cfg-summary-item-price">'+p.price+'&euro;</span></div>';
            subtotal+=p.price;
        });

        if(!selectedFiber&&lines.length===0){
            itemsWrap.innerHTML='<div class="cfg-summary-empty">Selecciona una fibra para empezar</div>';
            totalsWrap.classList.add('hidden');
            return;
        }

        itemsWrap.innerHTML=html;
        totalsWrap.classList.remove('hidden');

        // discounts
        var comboDiscount=0;
        var lineDiscount=0;
        var hasCombo=selectedFiber&&lines.length>0;

        if(hasCombo){
            comboDiscount=Math.round(subtotal*0.1*100)/100;
            discountRow.classList.remove('hidden');
            discountEl.textContent='\u2212'+comboDiscount.toFixed(2)+'\u20AC';
        }else{
            discountRow.classList.add('hidden');
        }

        // extra line discount: 2€ per line from the 2nd onwards
        var extraLines=lines.length>1?lines.length-1:0;
        if(extraLines>0){
            lineDiscount=extraLines*2;
            lineDiscountRow.classList.remove('hidden');
            lineDiscountEl.textContent='\u2212'+lineDiscount+'\u20AC';
        }else{
            lineDiscountRow.classList.add('hidden');
        }

        subtotalEl.textContent=subtotal+'\u20AC';
        var total=subtotal-comboDiscount-lineDiscount;
        if(total<0)total=0;
        totalEl.textContent=total.toFixed(2)+'\u20AC';
    }

    // 10 Gbps info popup
    var infoPopup=document.getElementById('cfgInfoPopup');
    var infoClose=document.getElementById('cfgInfoClose');
    if(infoClose)infoClose.addEventListener('click',function(){infoPopup.classList.add('hidden')});

    // Fiber selection
    fiberGrid.querySelectorAll('.cfg-fiber-card').forEach(function(card){
        card.addEventListener('click',function(){
            fiberGrid.querySelectorAll('.cfg-fiber-card').forEach(function(c){c.classList.remove('active')});
            card.classList.add('active');
            var speed=card.dataset.fiber;
            var price=parseInt(card.dataset.price);
            var label=speed>=10000?'10 Gbps':speed>=1000?'1 Gbps':speed+' Mbps';
            selectedFiber={speed:speed,price:price,label:label};

            // show/hide 10Gbps info
            if(infoPopup){
                if(parseInt(speed)>=10000)infoPopup.classList.remove('hidden');
                else infoPopup.classList.add('hidden');
            }

            // auto-add first line if none
            if(lines.length===0)addLine(0);
            else updateSummary();
        });
    });

    // Add line
    addLineBtn.addEventListener('click',function(){addLine(0)});

})();

// Cobertura page checker
(function(){
    const input=document.getElementById('cobInput'),btn=document.getElementById('cobBtn'),result=document.getElementById('cobResult');
    if(!input||!btn||!result)return;
    function check(){
        const v=input.value.trim();
        if(!v)return;
        result.classList.remove('hidden');
        const title=document.getElementById('cobResultTitle'),desc=document.getElementById('cobResultDesc');
        if(title)title.textContent='Cobertura disponible en '+v;
        if(desc)desc.textContent='Fibra óptica hasta 10 Gbps y red 5G disponibles en tu zona.';
        result.scrollIntoView({behavior:'smooth',block:'nearest'});
    }
    btn.addEventListener('click',check);
    input.addEventListener('keydown',e=>{if(e.key==='Enter')check()});
})();
