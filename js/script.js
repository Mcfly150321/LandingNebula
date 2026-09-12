document.addEventListener('DOMContentLoaded', () => {
    const BASE_SCALE = 77;
    
    // Función para aplicar el efecto glass
    function addGlassEffect(element, displacementMap, specular) {
        if (!element) return;
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // A. Deformación dinámica
            if (displacementMap) {
                const ratioX = x / rect.width;
                const newScale = 60 + (ratioX * 40);
                displacementMap.setAttribute('scale', newScale);
            }
            
            // B. Brillo especular dinámico
            if (specular) {
                specular.style.background = `radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(255, 255, 255, 0.25) 0%,
                    rgba(255, 255, 255, 0.05) 15%,
                    transparent 1%
                )`;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (displacementMap) {
                displacementMap.setAttribute('scale', BASE_SCALE);
            }
            if (specular) {
                specular.style.background = 'none';
            }
        });
    }

    // === ALL CARDS (Hero, Bento, Showcase, Contact) ===
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        const specular = card.querySelector('.glass-specular');
        const map = card.querySelector('feDisplacementMap');
        addGlassEffect(card, map, specular);
    });
    
    // === I18N SUPPORT ===
    const translations = {
        en: {
            nav_home: "Home",
            nav_about: "About Us",
            nav_clients: "Clients",
            nav_contact: "Contact",
            hero_subtitle: "Accelerating enterprises into the digital era",
            hero_desc: "Architecting bespoke technology infrastructure to modernize and scale commercial operations.",
            hero_btn: "Let's Connect",
            about_label: "ABOUT NEBULA SOFTWARE DEVELOPMENT",
            about_title: "Engineering the Future of Enterprise Software",
            about_company: "NEBULA SOFTWARE DEVELOPMENT is a premier software engineering firm backed by our faith in the Creator God of the universe. Dedicated to catalyzing the digital evolution of businesses in Guatemala, we specialize in architecting robust technological infrastructure — encompassing bespoke software ecosystems, scalable digital platforms, and optimized operational frameworks — designed to modernize and elevate commercial operations to global standards.",
            mission_label: "CORE DIRECTIVE",
            mission_title: "Our Mission",
            mission_text: "Grounded in our core values, our mission is to engineer scalable, enterprise-grade technological solutions that drive digital transformation. By architecting adaptive software ecosystems and implementing flexible investment models optimized for the Guatemalan market, we empower organizations to streamline operations, maximize efficiency, and generate quantifiable economic growth.",
            vision_label: "FUTURE TRAJECTORY",
            vision_title: "Our Vision",
            vision_text: "To become the definitive technological partner for Guatemalan enterprises, recognized for seamlessly bridging the chasm between complex software engineering and pragmatic business execution, thereby orchestrating a nationwide paradigm shift towards absolute digital maturity.",
            clients_label: "DEPLOYMENT SHOWCASE",
            clients_title: "Trusted By: Crea Imagen",
            client_creaimagen: "Leading academy in the beauty and cosmetology industry. We architected and deployed a comprehensive educational management system for them, optimizing their entire operational pipeline—from student lifecycle and academic records to human resources and complex inventory management.",
            contact_label: "INITIATE CONNECTION",
            contact_title: "Let's Build Something.",
            contact_desc: "Drop a message and we'll architect the solution together.",
            contact_name: "Name",
            contact_subject: "Subject",
            contact_message: "Message",
            contact_btn: "SEND MESSAGE",
            neon_heading: "SPACE-GRADE SOFTWARE",
            neon_desc: "Engineered for zero downtime, infinite scalability, and uncompromising security. We build technological foundations that empower continuous commercial growth."
        },
        es: {
            nav_home: "Inicio",
            nav_about: "Nosotros",
            nav_clients: "Clientes",
            nav_contact: "Contacto",
            hero_subtitle: "Acelerando empresas hacia la era digital",
            hero_desc: "Arquitectando infraestructura tecnológica a medida para modernizar y escalar operaciones comerciales.",
            hero_btn: "Conectemos",
            about_label: "SOBRE NEBULA SOFTWARE DEVELOPMENT",
            about_title: "Diseñando el Futuro del Software Empresarial",
            about_company: "NEBULA SOFTWARE DEVELOPMENT es una firma de élite en ingeniería de software, respaldada en nuestra fe en el Dios creador del universo. Dedicados a catalizar la evolución digital de las empresas en Guatemala, nos especializamos en la arquitectura de infraestructura tecnológica robusta —que abarca ecosistemas de software a medida, plataformas digitales escalables y marcos operativos optimizados— diseñada para modernizar y elevar las operaciones comerciales a estándares globales.",
            mission_label: "DIRECTIVA CENTRAL",
            mission_title: "Nuestra Misión",
            mission_text: "Cimentados en nuestros valores fundamentales, nuestra misión es diseñar soluciones tecnológicas escalables de nivel empresarial que impulsen la transformación digital. Mediante la ingeniería de ecosistemas de software adaptables y la implementación de modelos de inversión flexibles optimizados para el mercado guatemalteco, empoderamos a las organizaciones para optimizar procesos, maximizar la eficiencia y generar un crecimiento económico cuantificable.",
            vision_label: "TRAYECTORIA FUTURA",
            vision_title: "Nuestra Visión",
            vision_text: "Ser el socio tecnológico definitivo para las empresas guatemaltecas, reconocidos por acortar la brecha entre la ingeniería de software compleja y la ejecución empresarial pragmática, orquestando así un cambio de paradigma a nivel nacional hacia la madurez digital absoluta.",
            clients_label: "EXHIBICIÓN DE DESPLIEGUE",
            clients_title: "Crea Imagen ha confiado en nosotros",
            client_creaimagen: "Academia líder en la industria de la belleza y la cosmetología. Arquitectamos e implementamos un sistema integral de gestión educativa para ellos, optimizando todo su flujo operativo: desde el ciclo de vida del estudiante y expedientes académicos, hasta recursos humanos y control complejo de inventarios.",
            contact_label: "INICIAR CONEXIÓN",
            contact_title: "Construyamos Algo.",
            contact_desc: "Manda un mensaje y diseñamos la solución juntos.",
            contact_name: "Nombre",
            contact_subject: "Asunto",
            contact_message: "Mensaje",
            contact_btn: "ENVIAR MENSAJE",
            neon_heading: "SOFTWARE DE NIVEL ESPACIAL",
            neon_desc: "Diseñado para cero tiempo de inactividad, escalabilidad infinita y seguridad intransigente. Construimos cimientos tecnológicos que empoderan el crecimiento comercial continuo."
        }
    };

    let currentLang = 'es';
    const langToggleBtn = document.getElementById('langToggle');
    const langToggleEsBtn = document.getElementById('langToggleEsMobile');
    const langToggleEnBtn = document.getElementById('langToggleEnMobile');

    function translatePage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
        document.documentElement.lang = lang;
        if (langToggleBtn) {
            langToggleBtn.textContent = lang === 'en' ? 'ES / EN' : 'EN / ES';
        }
    }

    langToggleBtn?.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'es' : 'en';
        translatePage(currentLang);
    });

    langToggleEsBtn?.addEventListener('click', () => {
        currentLang = 'es';
        translatePage('es');
    });

    langToggleEnBtn?.addEventListener('click', () => {
        currentLang = 'en';
        translatePage('en');
    });

    // Idioma por defecto: Español
    translatePage('es');

    // === CONTACT FORM: open mailto with subject + body ===
    window.sendEmail = function() {
        const name    = (document.getElementById('cf-name')?.value || '').trim();
        const subject = (document.getElementById('cf-subject')?.value || '').trim() || 'Inquiry from Nebula Website';
        const message = (document.getElementById('cf-message')?.value || '').trim();
        const body    = name ? 'Name: ' + name + '\n\n' + message : message;
        window.location.href = 'mailto:info@nebulasd.solutions?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    };

    // === BACKGROUND SCROLL ZOOM ANIMATION ===
    const bgLayer = document.getElementById('bg-layer');
    if (bgLayer) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            
            if (maxScroll > 0) {
                const scrollPercent = scrollPos / maxScroll;
                // Escala desde 1 hasta 1.15 (15% de zoom)
                const scaleValue = 1 + (scrollPercent * 0.65);
                bgLayer.style.transform = `scale(${scaleValue})`;
            }
        });
    }

});