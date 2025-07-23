$(document).ready(function() {
    // Typing Animation
    const typingTexts = ['Azure DevOps Engineer', 'Cloud Infrastructure Specialist', 'CI/CD Pipeline Expert', 'Azure Solutions Architect', 'DevOps Automation Engineer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    function typeWriter() {
        const currentText = typingTexts[textIndex];
        
        if (isDeleting) {
            $('.typing-text').text(currentText.substring(0, charIndex - 1));
            charIndex--;
        } else {
            $('.typing-text').text(currentText.substring(0, charIndex + 1));
            charIndex++;
        }

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentText.length) {
            speed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
        }

        setTimeout(typeWriter, speed);
    }

    // Start typing animation
    typeWriter();

    // Mobile Navigation Toggle
    $('.hamburger').click(function() {
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');
    });

    // Close mobile menu when clicking on a link
    $('.nav-link').click(function() {
        $('.hamburger').removeClass('active');
        $('.nav-menu').removeClass('active');
    });

    // Smooth Scrolling for Navigation Links
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Active Navigation Link
    $(window).scroll(function() {
        const scrollPos = $(window).scrollTop() + 100;
        
        $('.nav-link').each(function() {
            const currLink = $(this);
            const refElement = $(currLink.attr('href'));
            
            if (refElement.position() && refElement.position().top <= scrollPos && 
                refElement.position().top + refElement.height() > scrollPos) {
                $('.nav-link').removeClass('active');
                currLink.addClass('active');
            }
        });
    });

    // Navbar Background on Scroll
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Back to Top Button
    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            $('.back-to-top').addClass('show');
        } else {
            $('.back-to-top').removeClass('show');
        }
    });

    $('.back-to-top').click(function() {
        $('html, body').animate({scrollTop: 0}, 1000);
    });

    // Skill Bar Animation
    function animateSkillBars() {
        $('.skill-progress').each(function() {
            const skillBar = $(this);
            const skillWidth = skillBar.data('width');
            
            skillBar.animate({
                width: skillWidth
            }, 2000);
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation classes
                if (element.classList.contains('fade-in')) {
                    element.classList.add('visible');
                }
                if (element.classList.contains('slide-in-left')) {
                    element.classList.add('visible');
                }
                if (element.classList.contains('slide-in-right')) {
                    element.classList.add('visible');
                }
                
                // Animate skill bars when skills section is visible
                if (element.id === 'skills') {
                    setTimeout(animateSkillBars, 500);
                }
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    $('.about-content').addClass('fade-in');
    $('.skill-item').addClass('fade-in');
    $('.timeline-item:nth-child(odd)').addClass('slide-in-left');
    $('.timeline-item:nth-child(even)').addClass('slide-in-right');
    $('.project-card').addClass('fade-in');
    $('.contact-content').addClass('fade-in');

    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    // Observe skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Contact Form Submission
    $('.contact-form form').submit(function(e) {
        e.preventDefault();
        
        // Get form data
        const name = $(this).find('input[type="text"]').val();
        const email = $(this).find('input[type="email"]').val();
        const subject = $(this).find('input[type="text"]:last').val();
        const message = $(this).find('textarea').val();
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        $(this).find('button[type="submit"]').text('Sending...');
        
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            $(this)[0].reset();
            $(this).find('button[type="submit"]').text('Send Message');
        }, 2000);
    });

    // Parallax Effect for Home Section
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        const parallax = $('.home');
        const speed = scrolled * 0.5;
        
        parallax.css('background-position', 'center ' + speed + 'px');
    });

    // Counter Animation for Stats (if you want to add stats)
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.text(Math.floor(current));
        }, 20);
    }

    // Hover Effects for Project Cards
    $('.project-card').hover(
        function() {
            $(this).find('.project-img img').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('.project-img img').css('transform', 'scale(1)');
        }
    );

    // Social Links Hover Effect
    $('.social-icons a, .social-links a').hover(
        function() {
            $(this).css('transform', 'translateY(-3px) scale(1.1)');
        },
        function() {
            $(this).css('transform', 'translateY(0) scale(1)');
        }
    );

    // Add loading animation
    $(window).on('load', function() {
        $('.home-text').css({
            'opacity': '0',
            'transform': 'translateY(50px)'
        }).animate({
            'opacity': '1'
        }, 1000).css('transform', 'translateY(0)');
        
        $('.home-img').css({
            'opacity': '0',
            'transform': 'translateX(50px)'
        }).animate({
            'opacity': '1'
        }, 1000).css('transform', 'translateX(0)');
    });

    // Preloader (optional)
    $(window).on('load', function() {
        $('#preloader').fadeOut('slow');
    });

    // Dynamic Year in Footer
    const currentYear = new Date().getFullYear();
    $('.footer-bottom p').html(function(index, html) {
        return html.replace('2024', currentYear);
    });

    // Scroll Progress Indicator
    $(window).scroll(function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        // You can add a progress bar at the top if desired
        // $('.progress-bar').css('width', scrolled + '%');
    });

    // Lazy Loading for Images (basic implementation)
    $('img').each(function() {
        const img = $(this);
        const src = img.attr('src');
        
        if (src && src.includes('placeholder')) {
            img.on('load', function() {
                img.addClass('loaded');
            });
        }
    });

    // Smooth reveal animation for sections
    function revealSections() {
        $('.section-title').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    }

    $(window).scroll(revealSections);
    revealSections(); // Initial check

    // Add ripple effect to buttons
    $('.btn').click(function(e) {
        const button = $(this);
        const ripple = $('<span class="ripple"></span>');
        
        button.append(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.css({
            width: size,
            height: size,
            left: x,
            top: y
        }).addClass('animate');
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    // Initialize tooltips (if using Bootstrap or custom tooltips)
    $('[data-toggle="tooltip"]').tooltip();

    // Keyboard navigation support
    $(document).keydown(function(e) {
        // ESC key closes mobile menu
        if (e.keyCode === 27) {
            $('.hamburger').removeClass('active');
            $('.nav-menu').removeClass('active');
        }
    });

    // Focus management for accessibility
    $('.nav-link').focus(function() {
        $(this).addClass('focused');
    }).blur(function() {
        $(this).removeClass('focused');
    });

    console.log('Portfolio website loaded successfully! 🚀');
});

// Additional CSS for ripple effect (add to CSS file)
const rippleCSS = `
.btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    pointer-events: none;
}

.ripple.animate {
    animation: ripple-animation 0.6s linear;
}

@keyframes ripple-animation {
    to {
        transform: scale(2);
        opacity: 0;
    }
}
`;

// Inject ripple CSS
if (!document.getElementById('ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = rippleCSS;
    document.head.appendChild(style);
}
