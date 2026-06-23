/* ==========================================================================
   🏥 Bliss Physiotherapy & Women's Health - Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- 1. Mobile Menu Toggle ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      
      // Toggle menu icon between burger and X
      if (isOpen) {
        menuIcon.setAttribute('data-lucide', 'x');
      } else {
        menuIcon.setAttribute('data-lucide', 'menu');
      }
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });

    // Close menu when clicking links
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuIcon.setAttribute('data-lucide', 'menu');
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      });
    });
  }

  // --- 2. Live Clinic Business Hours Status ---
  const liveStatusBadge = document.getElementById('live-status-badge');
  
  function updateClinicStatus() {
    if (!liveStatusBadge) return;
    
    const now = new Date();
    // Jaipur is in IST (UTC+5:30)
    // We get local hours of the machine running the code
    const day = now.getDay(); // 0 = Sunday, 3 = Wednesday, 6 = Saturday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeVal = hours + minutes / 60;
    
    let isOpen = false;
    let message = "";
    
    // Schedule: 10:00 AM (10.0) to 8:00 PM (20.0). Wednesday closed.
    if (day === 3) {
      // Wednesday
      isOpen = false;
      message = "Closed (Weekly Off)";
    } else {
      if (timeVal >= 10 && timeVal < 20) {
        isOpen = true;
        message = "Open Now - Closes at 8 PM";
      } else {
        isOpen = false;
        if (timeVal < 10) {
          message = "Closed - Opens at 10 AM";
        } else {
          message = "Closed - Opens 10 AM Tomorrow";
        }
      }
    }
    
    if (isOpen) {
      liveStatusBadge.className = "status-badge open";
      liveStatusBadge.innerHTML = `<span class="badge-dot"></span> ${message}`;
    } else {
      liveStatusBadge.className = "status-badge closed";
      liveStatusBadge.innerHTML = `<span class="badge-dot"></span> ${message}`;
    }
  }
  
  updateClinicStatus();
  // Update status every 60 seconds
  setInterval(updateClinicStatus, 60000);

  // --- 3. Hero Counter Metrics Animation ---
  const metricNums = document.querySelectorAll('.metric-num');
  
  function animateCounters() {
    metricNums.forEach(num => {
      const target = parseInt(num.getAttribute('data-val'), 10);
      let current = 0;
      const duration = 2000; // 2 seconds
      const steps = 50;
      const increment = target / steps;
      const stepTime = duration / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          num.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          num.textContent = Math.floor(current).toLocaleString();
        }
      }, stepTime);
    });
  }

  // Trigger metrics animation on page load
  animateCounters();

  // --- 4. Interactive Services Filter ---
  const serviceTabs = document.querySelectorAll('.service-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      serviceTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const filterValue = tab.getAttribute('data-filter');
      
      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          // Simple visual fade in
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.4s ease';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --- 5. Conditions We Treat Search & Tags Filter ---
  const conditionSearchInput = document.getElementById('condition-search');
  const clearSearchBtn = document.getElementById('search-clear-btn');
  const conditionPills = document.querySelectorAll('.condition-filter-pill');
  const conditionCards = document.querySelectorAll('.condition-item-card');
  const emptyState = document.getElementById('conditions-empty-state');
  const resetBtn = document.getElementById('reset-conditions-btn');
  
  let currentSearchQuery = "";
  let currentTagFilter = "all";
  
  function filterConditions() {
    let visibleCount = 0;
    
    conditionCards.forEach(card => {
      const cardTags = card.getAttribute('data-tags');
      const cardSearchData = card.getAttribute('data-name').toLowerCase();
      
      const matchesSearch = cardSearchData.includes(currentSearchQuery.toLowerCase());
      const matchesTag = currentTagFilter === 'all' || cardTags.split(' ').includes(currentTagFilter);
      
      if (matchesSearch && matchesTag) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });
    
    // Show/hide empty state
    if (visibleCount === 0) {
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
    }
  }
  
  if (conditionSearchInput) {
    conditionSearchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      
      // Toggle search clear button
      if (currentSearchQuery.length > 0) {
        clearSearchBtn.style.display = 'block';
      } else {
        clearSearchBtn.style.display = 'none';
      }
      
      filterConditions();
    });
  }
  
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      conditionSearchInput.value = "";
      currentSearchQuery = "";
      clearSearchBtn.style.display = 'none';
      filterConditions();
    });
  }
  
  conditionPills.forEach(pill => {
    pill.addEventListener('click', () => {
      conditionPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      
      currentTagFilter = pill.getAttribute('data-tag');
      filterConditions();
    });
  });
  
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      conditionSearchInput.value = "";
      currentSearchQuery = "";
      clearSearchBtn.style.display = 'none';
      
      conditionPills.forEach(p => p.classList.remove('active'));
      conditionPills[0].classList.add('active');
      currentTagFilter = "all";
      
      filterConditions();
    });
  }

  // --- 6. Appointment Booking Engine Validation & Flow ---
  const bookingForm = document.getElementById('appointment-form');
  const bookingSuccessView = document.getElementById('booking-success-view');
  const bookingContainer = document.getElementById('booking-card-container');
  
  // Set minimum date picker values to today
  const dateInput = document.getElementById('appointment-date');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = `${yyyy}-${mm}-${dd}`;
    dateInput.setAttribute('min', formattedToday);
  }
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      
      // Simple custom validation
      const name = document.getElementById('patient-name');
      const phone = document.getElementById('patient-phone');
      const email = document.getElementById('patient-email');
      const service = document.getElementById('physio-service');
      const date = document.getElementById('appointment-date');
      const time = document.getElementById('appointment-time');
      const terms = document.getElementById('terms');
      
      // Reset errors
      document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
      document.querySelectorAll('input, select').forEach(el => el.classList.remove('invalid'));
      
      if (!name.value.trim()) {
        document.getElementById('err-name').style.display = 'block';
        name.classList.add('invalid');
        isValid = false;
      }
      
      const phoneRegex = /^[6-9]\d{9}$/; // 10 digits Indian numbers check
      if (!phone.value.trim() || !phoneRegex.test(phone.value.replace(/\s+/g, ''))) {
        document.getElementById('err-phone').style.display = 'block';
        phone.classList.add('invalid');
        isValid = false;
      }
      
      if (email.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
          document.getElementById('err-email').style.display = 'block';
          email.classList.add('invalid');
          isValid = false;
        }
      }
      
      if (!service.value) {
        document.getElementById('err-service').style.display = 'block';
        service.classList.add('invalid');
        isValid = false;
      }
      
      if (!date.value) {
        document.getElementById('err-date').style.display = 'block';
        date.classList.add('invalid');
        isValid = false;
      }
      
      if (!time.value) {
        document.getElementById('err-time').style.display = 'block';
        time.classList.add('invalid');
        isValid = false;
      }
      
      if (!terms.checked) {
        document.getElementById('err-terms').style.display = 'block';
        isValid = false;
      }
      
      if (isValid) {
        // Submit processing status change
        const submitBtn = bookingForm.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const spinner = submitBtn.querySelector('.spinner');
        
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        spinner.classList.remove('hidden');
        
        // Mock API call timer
        setTimeout(() => {
          // Re-enable submit button elements
          submitBtn.disabled = false;
          btnText.classList.remove('hidden');
          spinner.classList.add('hidden');
          
          // Populate success screen details
          document.getElementById('summary-name').textContent = name.value;
          
          // Date formatting for human readability
          const dateObj = new Date(date.value);
          const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
          const selectedTimeText = time.options[time.selectedIndex].text;
          document.getElementById('summary-datetime').textContent = `${formattedDate} | ${selectedTimeText}`;
          
          // Doctor text mapping
          const docVal = document.getElementById('physio-doctor').value;
          let docName = "First Available Therapist";
          if (docVal === 'dr-richa') docName = "Dr. Richa Sharma (PT)";
          if (docVal === 'dr-amit') docName = "Dr. Amit Verma (PT)";
          document.getElementById('summary-doctor').textContent = docName;
          
          // Generate unique ID
          const randomId = Math.floor(1000 + Math.random() * 9000);
          document.getElementById('summary-id').textContent = `BLISS-${randomId}-PT`;
          
          // Hide form layout, show success overlay
          bookingForm.classList.add('hidden');
          bookingSuccessView.classList.remove('hidden');
        }, 1500);
      }
    });
  }
  
  // Book another session click handling
  const newBookingBtn = document.getElementById('new-booking-btn');
  if (newBookingBtn) {
    newBookingBtn.addEventListener('click', () => {
      bookingForm.reset();
      bookingSuccessView.classList.add('hidden');
      bookingForm.classList.remove('hidden');
    });
  }

  // Mock Calendar Save
  const calendarBtn = document.getElementById('calendar-btn');
  if (calendarBtn) {
    calendarBtn.addEventListener('click', () => {
      alert("Appointment added successfully! Check your device calendar syncing.");
    });
  }

  // --- 7. Patient Portal Resource Switching (Blog / Exercises / FAQ) ---
  const resourceToggleBtns = document.querySelectorAll('.resource-toggle-btn');
  const resourcePanels = document.querySelectorAll('.resource-panel');
  
  resourceToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      resourceToggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const targetId = btn.getAttribute('data-target');
      
      resourcePanels.forEach(panel => {
        if (panel.id === `panel-${targetId}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // --- 8. Accordion FAQ Component ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const parent = q.parentElement;
      const isActive = parent.classList.contains('active');
      
      // Close all open FAQs
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Toggle current
      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });

  // --- 9. Blog Post Modal Database ---
  const blogDatabase = {
    'pelvic-floor': {
      title: "Understanding Pelvic Floor Physiotherapy: Why It Matters",
      author: "Dr. Richa Sharma (PT)",
      readTime: "5 min read",
      date: "June 10, 2026",
      content: `
        <p>The pelvic floor is a critical group of muscles, ligaments, and tissues that stretch like a supportive hammock from your pubic bone in the front to your tailbone at the back. These muscles hold your pelvic organs—including the bladder, uterus, and bowels—in place. When they are weakened or over-strained, daily bodily functions can be disrupted.</p>
        
        <h4>Common Symptoms of Pelvic Floor Dysfunction</h4>
        <p>Many individuals suffer silently, believing these issues are an inevitable part of aging or childbirth. However, pelvic floor physiotherapy can effectively treat: </p>
        <ul>
          <li><strong>Urinary Incontinence:</strong> Leakage when you sneeze, laugh, or exercise (stress incontinence) or sudden urges to go (urge incontinence).</li>
          <li><strong>Pelvic Organ Prolapse:</strong> A heavy feeling or pressure in the pelvic area, where organs drop slightly out of place.</li>
          <li><strong>Pelvic Pain:</strong> Pain in the lower abdomen, hips, or pelvic region during sitting or movement.</li>
        </ul>

        <h4>What to Expect During Pelvic Therapy</h4>
        <p>At Bliss Physiotherapy, evaluations are conducted in a completely private environment. Dr. Richa Sharma evaluates external muscle strength, core activation, and joint alignments. Treatment varies from biofeedback and manual release to custom breathing exercise regimes. Over 85% of patients report dramatic lifestyle improvements within 6 weeks of dedicated therapy.</p>
      `
    },
    'ergonomics': {
      title: "5 Daily Ergonomic Stretches for Jaipur Desk Workers",
      author: "Dr. Amit Verma (PT)",
      readTime: "6 min read",
      date: "June 15, 2026",
      content: `
        <p>With corporate work structures keeping professionals seated for 8-10 hours daily, desk-related physical issues have surged in Jaipur. Neck stiffness, thoracic spine soreness, and tingling in fingers are clear indicators of postural fatigue. Taking five minutes every two hours to stretch can save you months of rehabilitation later.</p>

        <h4>The 5 Critical Office Stretches</h4>
        <ul>
          <li><strong>1. Cervical Retractions (Chin Tucks):</strong> Pull your head straight back (like making a double chin) while looking forward. Hold for 3 seconds. Reps: 10. Relieves neck pressure.</li>
          <li><strong>2. Thoracic Extension:</strong> Sit tall, interlace your hands behind your neck, and gently lean back over the top of your chair. Hold for 5 seconds. Opens chest and stretches the upper spine.</li>
          <li><strong>3. Seated Spinal Twist:</strong> Sit flat. Rotate your torso to the right, using the chair armrest for support. Hold for 10 seconds. Switch sides. Restores rib and low back mobility.</li>
          <li><strong>4. Piriformis Chair Stretch:</strong> Cross your right ankle over your left knee. Keep your back straight, hinge at the hips, and lean forward. You will feel a deep stretch in the hip. Hold for 15 seconds.</li>
          <li><strong>5. Wrist Extensor Stretch:</strong> Extend your right arm straight out, fingers down. Use your left hand to gently pull your hand back. Relieves mouse-hand stiffness.</li>
        </ul>

        <h4>Why Consistent Ergonomic Breaks Help</h4>
        <p>Stretching increases blood flow, resets muscle fibers that are static, and hydrates intervertebral discs. Combine these stretches with a screen positioned at eye level and shoulders rolled back to prevent chronic postural damage.</p>
      `
    },
    'knee-rehab': {
      title: "Post-Surgery Knee Rehab: Phased Guidelines",
      author: "Dr. Amit Verma (PT)",
      readTime: "4 min read",
      date: "June 18, 2026",
      content: `
        <p>Undergoing a knee operation—whether an ACL reconstruction, meniscus repair, or Total Knee Replacement—is only the first step towards walking normally again. The surgical intervention sets the structural foundation, but physical therapy determines your ultimate mobility, joint stability, and strength.</p>

        <h4>Phased Milestones for Rehabilitation</h4>
        <p>A structured rehabilitation plan progresses through distinct phases to ensure safe healing:</p>
        <ul>
          <li><strong>Phase 1 (Weeks 1-2): Pain Control & Extension.</strong> Focus is on reducing swelling, restoring full knee extension (straightening the knee), and activating the quadriceps muscles.</li>
          <li><strong>Phase 2 (Weeks 3-6): Early Mobility & Gait.</strong> Introducing knee flexion (bending) up to 120 degrees, weaning off crutches, and restoring natural heel-to-toe walking mechanics.</li>
          <li><strong>Phase 3 (Weeks 6-12): Strengthening.</strong> Progressive resistance training (squats, step-ups) to rebuild muscle mass and develop hip-knee-ankle coordination.</li>
          <li><strong>Phase 4 (Week 12+): Sport-Specific Power.</strong> Return-to-running protocols, lateral movements, and high-impact sports training.</li>
        </ul>

        <p><strong>A Crucial Warning:</strong> Avoid pushing through sharp joint pain during exercises. Scar tissue needs mobilization, but over-aggressive therapy can trigger joint inflammation, delaying healing. Consult closely with your physical therapist at each milestone.</p>
      `
    }
  };

  const articleModal = document.getElementById('article-modal');
  const modalClose = document.getElementById('modal-close');
  const modalContent = document.getElementById('article-modal-content');
  const blogReadMoreBtns = document.querySelectorAll('.blog-read-more');
  
  if (blogReadMoreBtns && articleModal && modalContent) {
    blogReadMoreBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const articleId = btn.getAttribute('data-article-id');
        const data = blogDatabase[articleId];
        
        if (data) {
          modalContent.innerHTML = `
            <h2>${data.title}</h2>
            <div class="modal-meta-bar">
              <span><i data-lucide="user" class="icon-xs"></i> By ${data.author}</span>
              <span><i data-lucide="clock" class="icon-xs"></i> ${data.readTime}</span>
              <span><i data-lucide="calendar" class="icon-xs"></i> Published ${data.date}</span>
            </div>
            <div class="modal-text-content">
              ${data.content}
            </div>
          `;
          
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
          
          articleModal.classList.remove('hidden');
          document.body.style.overflow = 'hidden'; // Stop background scroll
        }
      });
    });
  }
  
  if (modalClose && articleModal) {
    modalClose.addEventListener('click', () => {
      articleModal.classList.add('hidden');
      document.body.style.overflow = 'auto'; // Re-enable scroll
    });
    
    // Close on background click
    articleModal.addEventListener('click', (e) => {
      if (e.target === articleModal) {
        articleModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // --- 10. Testimonials Slider ---
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('slider-dots');
  
  let currentSlide = 0;
  let sliderInterval;
  
  function setupSlider() {
    if (slides.length === 0) return;
    
    // Spawn Dot indicators
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to review slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetAutoSlider();
      });
      dotsContainer.appendChild(dot);
    });
    
    // Arrows
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        resetAutoSlider();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        resetAutoSlider();
      });
    }
    
    startAutoSlider();
  }
  
  function goToSlide(index) {
    if (slides.length === 0) return;
    
    // Handle index bounds
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }
    
    // Move track using percentage offset
    const track = document.getElementById('testimonials-track');
    if (track) {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Toggle active slide opacity classes
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentSlide);
    });
    
    // Toggle active dot classes
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }
  
  function startAutoSlider() {
    sliderInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000); // Shift review every 5 seconds
  }
  
  function resetAutoSlider() {
    clearInterval(sliderInterval);
    startAutoSlider();
  }
  
  setupSlider();

  // --- 11. WhatsApp Floating Drawer Widget ---
  const waTrigger = document.getElementById('wa-trigger');
  const waClose = document.getElementById('wa-close');
  const waWindow = document.getElementById('wa-window');
  const waSendBtn = document.getElementById('wa-send-btn');
  const waInputBox = document.getElementById('wa-input-box');
  const waMsgTime = document.getElementById('wa-msg-time');
  
  // Set current time inside the Whatsapp initial message bubble
  if (waMsgTime) {
    const today = new Date();
    let hrs = today.getHours();
    let mins = today.getMinutes();
    if (hrs < 10) hrs = '0' + hrs;
    if (mins < 10) mins = '0' + mins;
    waMsgTime.textContent = `${hrs}:${mins}`;
  }
  
  if (waTrigger && waWindow) {
    waTrigger.addEventListener('click', (e) => {
      // Prevent event bubbling if trigger button text itself was clicked
      if (e.target.closest('#wa-close')) return;
      waWindow.classList.toggle('hidden');
    });
  }
  
  if (waClose && waWindow) {
    waClose.addEventListener('click', (e) => {
      e.stopPropagation(); // Stop opening window back again
      waWindow.classList.add('hidden');
    });
  }
  
  function sendWhatsAppMessage() {
    const text = waInputBox.value.trim();
    if (!text) return;
    
    // Construct WhatsApp message url
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/917828064351?text=${encodedText}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
    
    // Clear box and close window
    waInputBox.value = '';
    waWindow.classList.add('hidden');
  }
  
  if (waSendBtn && waInputBox) {
    waSendBtn.addEventListener('click', sendWhatsAppMessage);
    waInputBox.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        sendWhatsAppMessage();
      }
    });
  }

  // --- 12. Active Navigation link tracker (Scrollspy) ---
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let currentActive = "";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 120)) {
        currentActive = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === currentActive) {
        link.classList.add('active');
      }
    });
  });

  // --- 13. Contact Quick Message Form ---
  const contactQuickForm = document.getElementById('contact-quick-form');
  const contactSuccess = document.getElementById('contact-form-success');
  
  if (contactQuickForm && contactSuccess) {
    contactQuickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactQuickForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';
      
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="lucide-send"></i>';
        
        contactQuickForm.reset();
        contactSuccess.classList.remove('hidden');
        
        setTimeout(() => {
          contactSuccess.classList.add('hidden');
        }, 5000);
      }, 1000);
    });
  }
});
