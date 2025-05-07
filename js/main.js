// Smooth Scroll
document.addEventListener('DOMContentLoaded', function() {
    // Sayfa yüklendiğinde body'ye transition class'ı ekle
    document.body.classList.add('page-transition');

    // Scroll animasyonları için Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Animasyonlu elementleri seç ve observer'a ekle
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scroll için navbar linklerini dinle
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form verilerini al
        const formData = new FormData(this);
        
        // Loading durumunu göster
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Gönderiliyor...';
        submitButton.disabled = true;
        
        // AJAX isteği gönder
        fetch('process_form_smtp.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Geri bildirim mesajını göster
            showFeedbackMessage(data.success, data.message);
            
            if (data.success) {
                // Form başarıyla gönderildiyse formu temizle
                this.reset();
            }
        })
        .catch(error => {
            showFeedbackMessage(false, 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        })
        .finally(() => {
            // Loading durumunu kaldır
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        });
    });
}

// Geri bildirim mesajını gösteren fonksiyon
function showFeedbackMessage(success, message) {
    // Önceki mesajı kaldır
    const existingMessage = document.querySelector('.feedback-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Yeni mesaj oluştur
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = `feedback-message alert alert-${success ? 'success' : 'danger'} mt-3`;
    feedbackDiv.textContent = message;
    
    // Mesajı forma ekle
    const form = document.querySelector('.contact-form');
    form.appendChild(feedbackDiv);
    
    // 5 saniye sonra mesajı kaldır
    setTimeout(() => {
        feedbackDiv.remove();
    }, 5000);
}

// Minified JavaScript
const CookieManager={set:function(e,t,n){let o="";n&&(o="; expires="+new Date(Date.now()+864e5*n).toUTCString());document.cookie=e+"="+(t||"")+o+"; path=/"},get:function(e){const t=e+"=";return document.cookie.split(";").reduce((e,n)=>{let o=n.trim();return o.indexOf(t)==0?o.substring(t.length):e},null)},delete:function(e){document.cookie=e+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"}};class CookieBanner{constructor(){this.banner=document.getElementById("cookieConsent"),this.acceptAllBtn=document.getElementById("acceptAllCookies"),this.acceptSelectedBtn=document.getElementById("acceptSelectedCookies"),this.analyticsCb=document.getElementById("analyticsCookies"),this.marketingCb=document.getElementById("marketingCookies"),this.init()}init(){const e=CookieManager.get("cookiePreferences");e?this.applyPreferences(JSON.parse(e)):(this.showBanner(),this.attachEventListeners())}showBanner(){this.banner&&(this.banner.style.display="block",setTimeout(()=>{this.banner.style.opacity="1"},10))}hideBanner(){this.banner&&(this.banner.style.opacity="0",setTimeout(()=>{this.banner.style.display="none"},500))}attachEventListeners(){this.acceptAllBtn&&this.acceptAllBtn.addEventListener("click",()=>{this.savePreferences(!0,!0)}),this.acceptSelectedBtn&&this.acceptSelectedBtn.addEventListener("click",()=>{const e=this.analyticsCb?.checked||!1,t=this.marketingCb?.checked||!1;this.savePreferences(e,t)})}savePreferences(e,t){const n={necessary:!0,analytics:e,marketing:t};CookieManager.set("cookiePreferences",JSON.stringify(n),365),this.applyPreferences(n),this.hideBanner()}applyPreferences(e){e.analytics&&this.loadGoogleAnalytics(),this.analyticsCb&&(this.analyticsCb.checked=e.analytics),this.marketingCb&&(this.marketingCb.checked=e.marketing)}loadGoogleAnalytics(){const e=document.createElement("script");e.async=!0,e.src="https://www.googletagmanager.com/gtag/js?id=G-9NF9L7PCJ0",document.head.appendChild(e),window.dataLayer=window.dataLayer||[],function(){dataLayer.push(arguments)}(),gtag("js",new Date),gtag("config","G-9NF9L7PCJ0")}}document.addEventListener("DOMContentLoaded",()=>{new CookieBanner;const e=document.querySelector(".navbar");window.addEventListener("scroll",()=>{window.scrollY>50?e.classList.add("navbar-scrolled"):e.classList.remove("navbar-scrolled")});const t=document.getElementById("backToTop");window.addEventListener("scroll",()=>{window.pageYOffset>300?t.style.display="flex":t.style.display="none"}),t.addEventListener("click",e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})});const n=document.getElementById("contactForm");n&&n.addEventListener("submit",function(e){e.preventDefault();const t=this,n=document.getElementById("formFeedback"),o=t.querySelector('button[type="submit"]');o.disabled=!0,o.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Gönderiliyor...';const a=new FormData(t);fetch("process_form_smtp.php",{method:"POST",body:a}).then(e=>e.json()).then(e=>{n.classList.remove("d-none","alert-success","alert-danger"),n.classList.add(e.success?"alert-success":"alert-danger"),n.textContent=e.message,e.success&&t.reset()}).catch(()=>{n.classList.remove("d-none","alert-success"),n.classList.add("alert-danger"),n.textContent="Bir hata oluştu. Lütfen daha sonra tekrar deneyin."}).finally(()=>{o.disabled=!1,o.innerHTML="Gönder",setTimeout(()=>{n.classList.add("d-none")},5e3)})});const o=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add("visible")})});document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right").forEach(e=>o.observe(e))}); 