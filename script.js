// Navigation active sur scroll
const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth'
      });

      removeActive();
      link.parentElement.classList.add('active');
    }
  });
});

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  // Afficher/cacher le bouton retour en haut
  if (window.scrollY > 500) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  // Animation de révélation des éléments au scroll
  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active-reveal');
    }
  });
});

// Effet de révélation au scroll
const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .contact-content');
revealElements.forEach(el => el.classList.add('reveal'));

// Bouton retour en haut
const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #474af0;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

// Effet hover sur les cartes
const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.02)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

// Effet de texte qui tape (typing effect)
const typingElement = document.querySelector('.info-home h3');
if (typingElement) {
  const words = ["Développeur", "Passionné", "Curieux", "Motivé"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);

    typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(type, typingSpeed / 2);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(type, 1000);
    }
  }

  // Ajouter le style pour le curseur
  const style = document.createElement('style');
  style.textContent = `
    .cursor {
      animation: blink 0.7s infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  document.addEventListener('DOMContentLoaded', type);
}

// Animation de l'écran de chargement
document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay = 0) {
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);
  showElement(mainIcon, 400);
  subIcons.forEach((icon, idx) => {
    showElement(icon, 600 + idx * 200);
  });
  showElement(designerText, 1200);

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      // Déclencher automatiquement la révélation des éléments visibles
      revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight) {
          el.classList.add('active-reveal');
        }
      });
    }, 500);
    mainPage.classList.add("visible");
  }, 3000);
});

// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn-send');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;
    
    emailjs.sendForm('service_97gz3vj', 'template_83gc9oc', contactForm)
      .then(() => {
        submitBtn.textContent = 'Message envoyé !';
        submitBtn.style.backgroundColor = '#10b981';
        alert('✅ Votre message a été envoyé avec succès !');
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.disabled = false;
        }, 3000);
      })
      .catch((error) => {
        console.error('Erreur:', error);
        submitBtn.textContent = 'Erreur';
        submitBtn.style.backgroundColor = '#ef4444';
        alert('❌ Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.');
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.disabled = false;
        }, 3000);
      });
  });
}

// Boutons d'action
const btnHome1 = document.querySelector('.btn-home1');
if (btnHome1) {
  btnHome1.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
}

// Bouton téléchargement CV
const downloadCvBtn = document.getElementById('download-cv');
if (downloadCvBtn) {
  downloadCvBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'documents/CV-Sup-de-Vinci-Landry-LHOMME-.pdf';
    link.download = 'CV_Landry_LHOMME.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}