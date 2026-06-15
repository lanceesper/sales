import{i as p,n as f,o as y,a as w,y as L,z as E}from"./components-B4wW-AAZ.js";/* empty css             */document.addEventListener("DOMContentLoaded",()=>{p(),f("home"),S(),M(),y(),$()});function S(){var m,g;const e=document.getElementById("main-content");if(!e)return;const s=[{title:"Jumia Grand Launch",subtitle:"Up to 60% OFF on Electronics, Fashion & More!",cta:"Shop Now",image:"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80"},{title:"New Phones, Best Prices",subtitle:"Latest Samsung, Tecno & iPhones at unbeatable Kenyan prices.",cta:"Browse Phones",image:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80"},{title:"Free Delivery Friday",subtitle:"Enjoy FREE delivery on all orders above KSh 2,000 every Friday!",cta:"Learn More",image:"https://images.unsplash.com/photo-1566576912321-d58ded7a60e4?w=1600&q=80"}],r=s.map((t,o)=>`
      <div class="hero-slide ${o===0?"active":""}" data-index="${o}" style="background-image: linear-gradient(rgba(13, 13, 26, 0.4), rgba(13, 13, 26, 0.8)), url('${t.image}'); background-size: cover; background-position: center;">
        <div class="hero-slide-content container">
          <h1 class="hero-title">${t.title}</h1>
          <p class="hero-subtitle">${t.subtitle}</p>
          <a href="#categories-start" class="btn btn-lg hero-cta">${t.cta}</a>
        </div>
        <div class="hero-slide-overlay"></div>
      </div>`).join(""),a=s.map((t,o)=>`<button class="hero-dot ${o===0?"active":""}" data-index="${o}" aria-label="Go to slide ${o+1}"></button>`).join(""),n=`
    <section class="hero-carousel" id="hero-carousel">
      <div class="hero-slides">
        ${r}
      </div>
      <button class="hero-arrow hero-arrow-prev" id="hero-prev" aria-label="Previous slide">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button class="hero-arrow hero-arrow-next" id="hero-next" aria-label="Next slide">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      <div class="hero-dots" id="hero-dots">
        ${a}
      </div>
    </section>
  `;e.insertAdjacentHTML("beforeend",n);let i=0;const d=s.length;let v;function c(t){const o=document.querySelectorAll(".hero-slide"),b=document.querySelectorAll(".hero-dot");o.forEach(u=>u.classList.remove("active")),b.forEach(u=>u.classList.remove("active")),i=(t%d+d)%d,o[i].classList.add("active"),b[i].classList.add("active")}function l(){v=setInterval(()=>c(i+1),5e3)}function h(){clearInterval(v)}l(),(m=document.getElementById("hero-prev"))==null||m.addEventListener("click",()=>{h(),c(i-1),l()}),(g=document.getElementById("hero-next"))==null||g.addEventListener("click",()=>{h(),c(i+1),l()}),document.querySelectorAll(".hero-dot").forEach(t=>{t.addEventListener("click",()=>{h(),c(parseInt(t.dataset.index)),l()})})}function M(){const e=document.getElementById("main-content");if(!e)return;e.insertAdjacentHTML("beforeend",'<div id="categories-start"></div>');const s=w();let r="";s.forEach(a=>{const n=L(a);n.length>0&&(r+=E(a,n))}),e.insertAdjacentHTML("beforeend",r)}function $(){document.querySelectorAll(".scroll-arrow").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.section,r=document.getElementById(`${s}-row`);if(!r)return;const a=r.clientWidth*.75,n=e.classList.contains("scroll-arrow-left")?-1:1;r.scrollBy({left:n*a,behavior:"smooth"})})})}
