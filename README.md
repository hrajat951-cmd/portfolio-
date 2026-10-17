# Personal Developer Portfolio — Rajat N Hegde

> **First-Year MCA Student | Aspiring Software Developer**  
> *Poornaprajna Institute of Management (PIM), Udupi, Karnataka*

A fast, fully responsive, and accessible personal developer portfolio website designed for **Rajat N Hegde**. Built purely with **HTML5**, **Vanilla CSS3**, and **ES6+ JavaScript**, this website presents Rajat's authentic academic journey, verified technical proficiencies, featured projects, and career aspirations with precision, dignity, and modern engineering aesthetics.

---

## 🌟 Live Preview & Features

- **Modern Developer Aesthetic:** Tailored **Orange & Charcoal** color palette with subtle animations, card hover elevations, and responsive glassmorphism navigation.
- **Light & Dark Theme Toggle:** Default **Light Theme** with instant switch to **Dark Charcoal Mode**, persisted across visits via `localStorage`.
- **Text-Focused Hero Showcase:** Includes professional headline, location badge (*Udupi, Karnataka*), student personal statement (*"Interest in coding"*), quick social chips, and an interactive developer terminal card.
- **Academic Timeline:**
  - **Master of Computer Applications (MCA):** Poornaprajna Institute of Management (PIM), Udupi, Karnataka (2026–2028, *Pursuing*).
  - **Bachelor of Computer Applications (BCA):** Mangalore University, Karnataka (2023–2026, *Completed*).
- **Verified Technical Proficiency:** Exact, honest expertise ratings (`Basic`) with progress bars and badges for C, C++, Java, Python, R, JavaScript, HTML, CSS, and SQL.
- **Featured Project — AI Meal Planner:**
  - Complete project card with problem statement, architecture highlights, and technology pills (**Java, Python, SQL, HTML, CSS**).
  - **Interactive App Prototype Simulator:** In-browser modal simulation allowing visitors to adjust daily caloric targets (1500–3200 kcal), choose diet preferences (Vegetarian, Balanced, High-Protein), recalculate macronutrients, and view dynamically generated meal plans and grocery checklists.
- **Career Roles & Natural Languages:** Clear alignment toward Software Developer and Web Developer roles; fluent in English and Kannada.
- **Contact & Interaction Channels:**
  - Direct email trigger (`mailto:hrajat951@gmai.com`).
  - Direct telephone dialer (`tel:7619276461`).
  - One-click copy buttons for email and phone with animated toast notifications.
  - Interactive message form with client-side validation.
  - Verified GitHub ([hrajat951-cmd](https://github.com/hrajat951-cmd)) and LinkedIn ([rajat-h-7244aa394](https://www.linkedin.com/in/rajat-h-7244aa394)) profile cards.
- **Curriculum Vitae / Resume Modal:** Formatted CV modal with a dedicated print stylesheet (`@media print`) enabling one-click print or "Save as PDF".
- **Accessibility & Mobile-First Design:** Fully keyboard navigatable (WCAG 2.1 AA compliant), responsive slide-out drawer menu for smartphones, reading progress indicator, and support for `prefers-reduced-motion`.

---

## 📁 Repository Structure

```text
c:\Users\DELL\project1\
├── index.html        # Semantic HTML5 single-page structure with SEO & OpenGraph meta tags
├── styles.css        # Custom Orange & Charcoal design system (variables, layouts, print styles)
├── script.js         # Interactive logic (themes, navigation observer, modals, simulations, toasts)
└── README.md         # Comprehensive documentation and setup guide
```

---

## 🚀 Getting Started & Running Locally

Because this application relies solely on native web standards (zero external build tools, bundlers, or heavy frameworks), you can run and view it instantly:

### Method 1: Direct Browser Opening
Simply double-click [`index.html`](file:///c:/Users/DELL/project1/index.html) or open it directly in any browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Method 2: Using Python HTTP Server (Recommended)
If you have Python installed, serve the folder locally:
```powershell
# In PowerShell or Terminal within the project folder:
python -m http.server 3000
```
Then visit **`http://localhost:3000`** in your browser.

### Method 3: Using Node.js
If you have Node.js installed:
```powershell
npx -y serve .
# or
npx -y http-server -p 3000
```

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Markup & Semantics** | HTML5 | Semantic structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) with ARIA attributes |
| **Styling & Theme** | Vanilla CSS3 | Custom properties (CSS variables), Flexbox, CSS Grid, glassmorphism, `@media print` |
| **Interactivity** | Vanilla JavaScript (ES6+) | `IntersectionObserver`, `localStorage`, Clipboard API, form validation, dynamic DOM rendering |
| **Typography** | Google Fonts | `Outfit` (Headings), `Inter` (Body Copy), `JetBrains Mono` (Terminal & Code Badges) |
| **Icons** | Inline SVG | Lightweight, vector-crisp icons with zero dependency overhead |

---

## ⚙️ Customization Guide

### 1. Modifying Color Schemes
The color palette is managed via CSS variables in [`styles.css`](file:///c:/Users/DELL/project1/styles.css):
```css
:root, [data-theme="light"] {
  --primary-orange: #ea580c;
  --bg-primary: #f8fafc;
  --text-primary: #0f172a;
}

[data-theme="dark"] {
  --primary-orange: #f97316;
  --bg-primary: #0f1117;
  --text-primary: #f8fafc;
}
```

### 2. Updating Contact Information
All contact reference links are located within the hero and contact sections of [`index.html`](file:///c:/Users/DELL/project1/index.html):
- **Email:** `hrajat951@gmai.com`
- **Phone:** `+91 7619276461`
- **GitHub:** `https://github.com/hrajat951-cmd`
- **LinkedIn:** `https://www.linkedin.com/in/rajat-h-7244aa394`

---

## 🎓 Academic Attribution & Student Profile

- **Student:** Rajat N Hegde
- **Degree:** Master of Computer Applications (MCA), 2026–2028
- **Institution:** Poornaprajna Institute of Management (PIM), Udupi, Karnataka
- **Undergraduate:** Bachelor of Computer Applications (BCA), 2023–2026, Mangalore University
- **Core Motivation:** *"Interest in coding"*

---

## 📄 License

This portfolio codebase is created for personal and academic showcase purposes. Free to use, adapt, and build upon for educational projects.
