import{i as B,n as C,o as L,a as E,A,B as f}from"./components-BVa7C6sI.js";/* empty css             */document.addEventListener("DOMContentLoaded",()=>{B(),C("home"),x(),H(),L(),P()});const T={Electronics:[{heading:"TV & VIDEO",items:["Smart TVs","LED TVs","TV Accessories","Projectors","DVD Players"]},{heading:"AUDIO",items:["Speakers","Headphones","Earbuds","Soundbars","Home Theatre"]},{heading:"ACCESSORIES",items:["Power Banks","Chargers","Cables","Memory Cards","Batteries"]}],"Phones & Tablets":[{heading:"SMARTPHONES",items:["Samsung","Tecno","iPhone","Xiaomi","Nokia","Infinix"]},{heading:"TABLETS",items:["Samsung Tablets","iPad","Android Tablets","Kids Tablets"]},{heading:"ACCESSORIES",items:["Phone Cases","Screen Protectors","Chargers","Earphones","Power Banks"]}],Computing:[{heading:"LAPTOPS",items:["HP Laptops","Lenovo Laptops","Dell Laptops","MacBooks","Gaming Laptops"]},{heading:"PERIPHERALS",items:["Keyboards","Mice","Monitors","Printers","Webcams"]},{heading:"STORAGE",items:["Flash Drives","External HDDs","SSDs","Memory Cards","USB Hubs"]}],Fashion:[{heading:"MEN'S FASHION",items:["Shirts","Trousers","Shoes","Watches","Accessories"]},{heading:"WOMEN'S FASHION",items:["Dresses","Tops","Handbags","Shoes","Jewelry"]},{heading:"FOOTWEAR",items:["Sneakers","Sandals","Formal Shoes","Boots","Sports Shoes"]}],"Home & Kitchen":[{heading:"KITCHEN & DINING",items:["Cookware","Kitchen Utensils","Water Dispensers","Cutlery","Storage"]},{heading:"HOME APPLIANCES",items:["Blenders","Kettles","Microwaves","Refrigerators","Cookers"]},{heading:"HOME DECOR",items:["Rugs & Carpets","Wall Art","Curtains","Bedding","Lighting"]}],"Health & Beauty":[{heading:"SKINCARE",items:["Moisturizers","Sunscreen","Serums","Face Wash","Masks"]},{heading:"MAKEUP",items:["Foundation","Lipstick","Mascara","Eyeshadow","Brushes"]},{heading:"PERSONAL CARE",items:["Toothpaste","Deodorant","Hair Care","Perfumes","Shaving"]}],"Sports & Outdoors":[{heading:"FITNESS",items:["Yoga Mats","Dumbbells","Resistance Bands","Skipping Ropes","Gym Wear"]},{heading:"OUTDOOR",items:["Hiking Bags","Camping Gear","Water Bottles","Sunglasses","Hats"]},{heading:"SPORTS",items:["Footballs","Volleyballs","Basketball","Running Shoes","Jerseys"]}],Grocery:[{heading:"DAIRY & EGGS",items:["Fresh Milk","Yoghurt","Cheese","Eggs","Butter"]},{heading:"BEVERAGES",items:["Tea","Coffee","Juice","Water","Soda"]},{heading:"PANTRY",items:["Rice","Cooking Oil","Flour","Sugar","Spices"]}]},y={Electronics:'<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',"Phones & Tablets":'<svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',Computing:'<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M2 17h20"/><path d="M6 21h12"/></svg>',Fashion:'<svg viewBox="0 0 24 24"><path d="M20.38 3.46L16 2 12 5.5 8 2l-4.38 1.46a2 2 0 00-1.34 2.23l1.09 7.97C3.75 16.29 6 18 6 18v3a1 1 0 001 1h10a1 1 0 001-1v-3s2.25-1.71 2.63-4.34l1.09-7.97a2 2 0 00-1.34-2.23z"/></svg>',"Home & Kitchen":'<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',"Health & Beauty":'<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',"Sports & Outdoors":'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',Grocery:'<svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>'};function x(){var v,p;const t=document.getElementById("main-content");if(!t)return;const o=E().map(e=>{const s=y[e]||y.Electronics,n=T[e]||[],d=n.length>0?`
      <div class="sidebar-flyout">
        <div class="flyout-grid">
          ${n.map(S=>`
            <div class="flyout-group">
              <h4>${S.heading}</h4>
              ${S.items.map(M=>`<a href="#">${M}</a>`).join("")}
            </div>
          `).join("")}
        </div>
      </div>
    `:"";return`
      <div class="sidebar-category-item">
        <span class="sidebar-category-icon">${s}</span>
        <span class="sidebar-category-name">${e}</span>
        <span class="sidebar-category-arrow">
          <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </span>
        ${d}
      </div>
    `}).join(""),a=[{title:"Jumia Anniversary Sale",subtitle:"Up to 60% OFF on Electronics, Fashion & More!",cta:"Shop Now",image:"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80"},{title:"New Phones, Best Prices",subtitle:"Latest Samsung, Tecno & iPhones at unbeatable Kenyan prices.",cta:"Browse Phones",image:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80"},{title:"Free Delivery Friday",subtitle:"Enjoy FREE delivery on all orders above KSh 2,000 every Friday!",cta:"Learn More",image:"https://images.unsplash.com/photo-1566576912321-d58ded7a60e4?w=1600&q=80"}],i=a.map((e,s)=>`
      <div class="hero-slide ${s===0?"active":""}" data-index="${s}" style="background-image: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.5)), url('${e.image}'); background-size: cover; background-position: center;">
        <div class="hero-slide-content">
          <h1 class="hero-title">${e.title}</h1>
          <p class="hero-subtitle">${e.subtitle}</p>
          <a href="#categories-start" class="hero-cta">${e.cta}</a>
        </div>
        <div class="hero-slide-overlay"></div>
      </div>`).join(""),b=a.map((e,s)=>`<button class="hero-dot ${s===0?"active":""}" data-index="${s}" aria-label="Go to slide ${s+1}"></button>`).join(""),w=`
    <section class="hero-section" id="hero-section">
      <div class="hero-sidebar" id="hero-sidebar">
        ${o}
      </div>

      <div class="hero-carousel" id="hero-carousel">
        <div class="hero-slides">
          ${i}
        </div>
        <button class="hero-arrow hero-arrow-prev" id="hero-prev" aria-label="Previous slide">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button class="hero-arrow hero-arrow-next" id="hero-next" aria-label="Next slide">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>
        <div class="hero-dots" id="hero-dots">
          ${b}
        </div>
      </div>
    </section>
  `;t.insertAdjacentHTML("beforeend",w);let r=0;const g=a.length;let m;function l(e){const s=document.querySelectorAll(".hero-slide"),n=document.querySelectorAll(".hero-dot");s.forEach(d=>d.classList.remove("active")),n.forEach(d=>d.classList.remove("active")),r=(e%g+g)%g,s[r].classList.add("active"),n[r].classList.add("active")}function h(){m=setInterval(()=>l(r+1),5e3)}function u(){clearInterval(m)}h(),(v=document.getElementById("hero-prev"))==null||v.addEventListener("click",()=>{u(),l(r-1),h()}),(p=document.getElementById("hero-next"))==null||p.addEventListener("click",()=>{u(),l(r+1),h()}),document.querySelectorAll(".hero-dot").forEach(e=>{e.addEventListener("click",()=>{u(),l(parseInt(e.dataset.index)),h()})})}function H(){const t=document.getElementById("main-content");if(!t)return;t.insertAdjacentHTML("beforeend",'<div id="categories-start"></div>');const c=E();let o="";c.forEach(a=>{const i=A(a);i.length>0&&(o+=f(a,i))}),t.insertAdjacentHTML("beforeend",o)}function P(){document.querySelectorAll(".scroll-arrow").forEach(t=>{t.addEventListener("click",()=>{const c=t.dataset.section,o=document.getElementById(`${c}-row`);if(!o)return;const a=o.clientWidth*.75,i=t.classList.contains("scroll-arrow-left")?-1:1;o.scrollBy({left:i*a,behavior:"smooth"})})})}
