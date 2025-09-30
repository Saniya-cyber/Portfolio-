// Basic interactivity: theme toggle, mobile nav, project filters, modal, contact form
const body = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const yearEl = document.getElementById('year');
const filters = document.querySelectorAll('.filter');
const projectGrid = document.getElementById('projectsGrid');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalContent = document.getElementById('modalContent');

// set year
yearEl.textContent = new Date().getFullYear();

// theme from localStorage
const savedTheme = localStorage.getItem('theme');
if(savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', ()=>{
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? '' : 'dark';
  if(next) document.documentElement.setAttribute('data-theme', next); else document.documentElement.removeAttribute('data-theme');
  localStorage.setItem('theme', next);
});

// mobile nav
hamburger.addEventListener('click', ()=>{ nav.classList.toggle('open'); });

// typing effect (simple)
const typed = document.getElementById('typed');
const words = ['Robots', 'IoT', 'Web', 'Cybersecurity'];
let idx=0; let char=0; let forward=true;
setInterval(()=>{
  if(forward){
    char++;
    if(char>words[idx].length) { forward=false; setTimeout(()=>{},400); }
  } else { char--; if(char===0){forward=true; idx=(idx+1)%words.length;} }
  typed.textContent = words[idx].slice(0,char);
},120);

// project filters
filters.forEach(btn=> btn.addEventListener('click', ()=>{
  filters.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  Array.from(projectGrid.children).forEach(card=>{
    if(f==='all' || card.dataset.type===f) card.style.display='block'; else card.style.display='none';
  });
}));

// view project modal
document.addEventListener('click', e=>{
  if(e.target.matches('.view-btn')){
    const card = e.target.closest('.card');
    const title = card.dataset.title || card.querySelector('h3').innerText;
    const id = e.target.dataset.id;
    showModal(`<h3>${title}</h3><p>Project details for <strong>id=${id}</strong> — replace with real content.</p><p><strong>Features:</strong></p><ul><li>Demo images</li><li>Code & steps</li><li>Live link</li></ul>`);
  }
});

function showModal(html){ modalContent.innerHTML = html; modal.setAttribute('aria-hidden','false'); }
modalClose.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
modal.addEventListener('click', e=>{ if(e.target===modal) modal.setAttribute('aria-hidden','true'); });

// contact form (client-side validation + send via mailto)
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
form.addEventListener('submit', e=>{
  e.preventDefault();
  const name = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();
  if(!name || !email || !msg){ formStatus.textContent='Please fill all fields.'; return; }
  formStatus.textContent = 'Opening your email client...';
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
  window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
});

// accessibility: smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href.length>1){ e.preventDefault(); document.querySelector(href).scrollIntoView({behavior:'smooth'}); nav.classList.remove('open'); }
  });
});
