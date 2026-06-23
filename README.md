# 🏥 Bliss Physiotherapy & Women's Health Clinic Website

A premium, fully responsive, and modern business website built for **Bliss Physiotherapy & Women's Health** in Chitrakoot, Jaipur. This website combines clinical authority with human warmth, using modern design systems, clean animations, and interactive client workflows.

## 🔗 Live Demo & Deployment
If GitHub Pages is enabled, the website will be accessible live at:
**[https://aryan13a.github.io/bliss-physiotherapy/](https://aryan13a.github.io/bliss-physiotherapy/)**

---

## 🎨 Design & Style Tokens
* **Primary (Navy Blue):** `#0D3B66` — Instills clinical credibility, trust, and authority.
* **Secondary (Teal):** `#00A896` — Warmth, rehabilitation, and women's health.
* **Accent (Mint/Sage):** `#02C39A` — Highlights, recovery actions, and active indicators.
* **Backgrounds:** Clean white (`#FFFFFF`) and Alabaster Mint-Grey (`#F4F7F6`).
* **Typography:** `Outfit` (Headings) & `Plus Jakarta Sans` (Body Text) loaded from Google Fonts.
* **Icons:** Powered by [Lucide Icons](https://lucide.dev/).

---

## ✨ Features & Interactivities Included

1. **Sticky Nav Bar**: Always visible with a prominent "Book Appointment" CTA. Collapses into a clean burger drawer on mobile viewports.
2. **Live Opening Hours Badge**: Computes clinic open/closed status in real-time based on local time (*Mon - Sat 10:00 AM - 8:00 PM, Wednesday Closed*).
3. **Animated Clinic Statistics**: Features ticking counter numbers showing years of experience, happy patient recoveries, and expert staff ratios.
4. **Interactive Services Hub**: Filters service cards dynamically (e.g., *Women's Health*, *Spine*, *Sports Injuries*, *Advanced Modalities*) with custom categories.
5. **Conditions Index & Search**: Real-time searching with tag filters for physical issues, listing symptoms and custom success rates. Shows an interactive empty state with a reset trigger if search fails.
6. **Online Scheduling Engine**: A structured appointment form containing validation errors, loading state spinner, and an automatic appointment receipt showing random generated receipt IDs.
7. **Overlay Health Blog Reader**: Loads full articles in a glassmorphic pop-up card without changing pages, speeding up performance.
8. **Testimonials Carousel**: Slides smoothly between reviews left by real Google users (*Akash Singh, Gayatri Sharma, Pratibbha Sharma*).
9. **Jaipur Clinic Map**: Embedded Google Maps frame centered on Chitrakoot Jaipur near Akshardham Temple with directions.
10. **WhatsApp Assistant**: A floating chat widget in the bottom-right corner. Allows typing queries and redirects directly to WhatsApp Web/App prefilled with the text.

---

## ⚙️ Running Locally
Since this is a static site with no heavy dependencies or compile steps, you can run it instantly:

1. **Option A: File Explorer (Direct)**
   Double-click the `index.html` file inside this directory to open it in any web browser.

2. **Option B: Local Web Server (Recommended)**
   If you have Python installed, open your terminal in this directory and run:
   ```bash
   python -m http.server 8000
   ```
   Then navigate to **`http://localhost:8000`** in your browser.

---

## 📂 Repository Layout
```
├── assets/
│   ├── clinic_interior.jpg
│   ├── dr_richa_sharma.jpg
│   ├── dr_amit_verma.jpg
│   ├── rehab_session.jpg
│   └── womens_health.jpg
├── index.html
├── style.css
├── app.js
└── README.md
```
