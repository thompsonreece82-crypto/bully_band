(() => {
  'use strict';
  const config = window.BULLAI_CONFIG || {};
  const poster = document.querySelector('.poster');
  const toast = document.querySelector('.toast');
  let toastTimer;
  function notify(message){
    if(!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2200);
  }
  function safeUrl(value){
    if(typeof value !== 'string' || !value.trim()) return null;
    try { const parsed = new URL(value.trim()); return ['http:','https:'].includes(parsed.protocol) ? parsed.href : null; }
    catch { return null; }
  }
  document.querySelectorAll('[data-social]').forEach((el) => {
    const network = el.dataset.social;
    const url = safeUrl((config.socials || {})[network]);
    const label = el.dataset.label || network;
    if(url){
      const link = document.createElement('a');
      link.className = el.className;
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `Open Bullaí on ${label} (new tab)`);
      link.dataset.hint = label.toUpperCase() + ' ↗';
      link.innerHTML = '<span class="hotspot__sr">' + label.replace(/</g,'&lt;') + '</span>';
      el.replaceWith(link);
    } else {
      el.addEventListener('click', () => notify(label.toUpperCase() + ' — LINK COMING SOON'));
    }
  });
  const eventHub = document.querySelector('[data-events-hub]');
  if(eventHub){
    const url = safeUrl(config.eventsHubUrl);
    if(url) {
      eventHub.href = url;
      eventHub.target = '_blank';
      eventHub.rel = 'noopener noreferrer';
      eventHub.textContent = 'ALL DATES / TICKETS ↗';
    } else {
      eventHub.removeAttribute('href');
      eventHub.role = 'button';
      eventHub.tabIndex = 0;
      eventHub.classList.add('is-unset');
      eventHub.textContent = 'TICKET LINK COMING SOON';
      const click = () => notify('THE SHOWS LINK IS COMING SOON');
      eventHub.addEventListener('click',click);
      eventHub.addEventListener('keydown',e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();click();} });
    }
  }
  const eventList = document.querySelector('[data-event-list]');
  if(eventList){
    const today = new Date();today.setHours(0,0,0,0);
    const all = Array.isArray(window.BULLAI_EVENTS) ? window.BULLAI_EVENTS : [];
    const future = all.filter(ev => ev && /^\d{4}-\d{2}-\d{2}$/.test(ev.date || '') && new Date(ev.date+'T12:00:00') >= today)
      .sort((a,b) => a.date.localeCompare(b.date));
    if(future.length===0){
      const empty = document.createElement('p');empty.className='empty-events';empty.textContent='NO DATES YET. WATCH THIS SPACE.';eventList.append(empty);
    } else future.forEach(ev => {
      const item = document.createElement('div');item.className='event-item';
      const date = document.createElement('span');date.className='event-item__date';
      const d = new Date(ev.date+'T12:00:00');
      date.textContent = d.toLocaleDateString('en-GB',{day:'2-digit',month:'short'}).toUpperCase();
      const info = document.createElement('div');
      const name = document.createElement('div');name.className='event-item__name';name.textContent=ev.city||'TBA';
      const sub = document.createElement('div');sub.className='event-item__sub';sub.textContent=[ev.venue,ev.time].filter(Boolean).join(' · ') || 'VENUE TBA';
      info.append(name,sub);item.append(date,info);
      const url = safeUrl(ev.ticketUrl);
      if(url){const a=document.createElement('a');a.className='event-item__btn';a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='TICKETS ↗';item.append(a);}
      eventList.append(item);
    });
  }
  if(!poster) return;
  // Mouse-responsive paper cutouts, not a moving background: hit areas remain perfectly lined up.
  const cutouts = Array.from(poster.querySelectorAll('.cutout'));
  const note = poster.querySelector('.hover-note');
  const hoverItems = poster.querySelectorAll('.hotspot');
  hoverItems.forEach((el) => {
    el.addEventListener('pointerenter', () => {if(note){note.textContent=el.dataset.hint||'';note.classList.add('is-visible');}});
    el.addEventListener('pointerleave', () => {if(note)note.classList.remove('is-visible');});
    el.addEventListener('focus',()=>{if(note){note.textContent=el.dataset.hint||'';note.classList.add('is-visible');}});
    el.addEventListener('blur',()=>{if(note)note.classList.remove('is-visible');});
  });
  if(!window.matchMedia('(pointer:fine)').matches || window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  let nextFrame=0;
  poster.addEventListener('pointermove', event => {
    if(nextFrame) return;
    const rect=poster.getBoundingClientRect(), x=(event.clientX-rect.left)/rect.width, y=(event.clientY-rect.top)/rect.height;
    nextFrame=requestAnimationFrame(()=>{
      poster.style.setProperty('--px',(x*100).toFixed(1)+'%');
      poster.style.setProperty('--py',(y*100).toFixed(1)+'%');
      for(const el of cutouts){
        const pos=(el.dataset.center||'50,50').split(',').map(Number);
        const dx=x-pos[0]/100,dy=y-pos[1]/100,d=Math.hypot(dx*1.1,dy*1.35);
        const strength=Math.max(0,1-d/.31),mult=Math.min(rect.width/500,1.4);
        el.style.setProperty('--dx', (dx*26*strength*mult).toFixed(2)+'px');
        el.style.setProperty('--dy',(dy*25*strength*mult).toFixed(2)+'px');
        el.style.setProperty('--angle',(dx*6*strength).toFixed(2)+'deg');
        el.style.setProperty('--scale',(1+.038*strength).toFixed(3));
        el.style.filter=`drop-shadow(${(-dx*15*strength).toFixed(1)}px ${(dy*12*strength).toFixed(1)}px ${Math.round(5*strength)}px rgba(255,73,217,${(.65*strength).toFixed(2)}))`;
      }
      nextFrame=0;
    });
  });
  poster.addEventListener('pointerleave',()=>{
    for(const el of cutouts){el.style.setProperty('--dx','0px');el.style.setProperty('--dy','0px');el.style.setProperty('--angle','0deg');el.style.setProperty('--scale','1');el.style.filter='';}
  });
})();
