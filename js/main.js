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