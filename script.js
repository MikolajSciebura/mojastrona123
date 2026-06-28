document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scroll Engine (Native with refinements)
    const header = document.querySelector('.rs-header');

    // 2. High-Fidelity Parallax
    const initParallax = () => {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;

            // Hero Parallax
            const heroTitle = document.querySelector('.rs-title-main');
            const heroSubtitle = document.querySelector('.rs-subtitle');
            const shard1 = document.querySelector('.shard-1');

            if (heroTitle) heroTitle.style.transform = `translateY(${scrolled * 0.4}px)`;
            if (heroSubtitle) heroSubtitle.style.transform = `translateY(${scrolled * 0.2}px)`;
            if (shard1) shard1.style.transform = `scale(${1.1 + scrolled * 0.0005}) translateY(${scrolled * 0.1}px)`;

            // Header Scroll Class
            if (scrolled > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    };
    initParallax();

    // 3. Advanced Reveal Engine
    const initReveal = () => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    // Optional: unobserve if we only want animation once
                    // observer.unobserve(entry.target);
                } else {
                    // Re-enable if we want repeating animations
                    entry.target.classList.remove('aos-animate');
                }
            });
        }, observerOptions);

        document.querySelectorAll('[data-aos-custom], .reveal-wrap').forEach(el => {
            observer.observe(el);
        });
    };
    initReveal();

    // 4. Premium Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const overlay = document.querySelector('.rs-overlay');
    const navLinks = document.querySelectorAll('.rs-nav a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
        });
    }

    // 5. Card Hover Tilt Effect
    const cards = document.querySelectorAll('.rs-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    // 6. Form Handling (Preserving original logic with visual polish)
    const valuationForm = document.getElementById('valuation-form');
    if (valuationForm) {
        valuationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = valuationForm.querySelector('.rs-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span class="rs-btn-inner">PROCESOWANIE...</span>';

            // Simulate/Send logic (omitted for brevity, keep existing send.php call)
            const formData = new FormData(valuationForm);
            try {
                const res = await fetch('send.php', { method: 'POST', body: formData });
                const text = await res.text();
                if (text === "OK") {
                    btn.innerHTML = '<span class="rs-btn-inner">WYSŁANO!</span>';
                    valuationForm.reset();
                } else {
                    btn.innerHTML = '<span class="rs-btn-inner">BŁĄD!</span>';
                }
            } catch {
                btn.innerHTML = '<span class="rs-btn-inner">BŁĄD SIECI</span>';
            }

            setTimeout(() => { btn.innerHTML = originalText; }, 3000);
        });
    }

    // 7. Dynamic Background Glow (Optimized with RequestAnimationFrame)
    let rafId = null;
    document.addEventListener('mousemove', (e) => {
        if (rafId) return;

        rafId = requestAnimationFrame(() => {
            const x = e.clientX;
            const y = e.clientY;
            document.body.style.background = `radial-gradient(circle at ${x}px ${y}px, #050a18 0%, #02050a 50%)`;
            rafId = null;
        });
    });
});
