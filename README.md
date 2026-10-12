# 🚀 Jayant - Personal Developer Portfolio

A premium, modern, and fully responsive personal developer portfolio website designed for **Jayant**, 1st Year B.Tech Computer Science & Engineering student (Batch 2026–2030) at **JECRC University**, Rajasthan, India.

Built using clean, performant, and standards-compliant **HTML5, CSS3, and JavaScript**, featuring a sleek **dark black midnight theme with blue-purple gradients, glassmorphism, glowing accents, and smooth micro-interactions**.

---

## 🌟 Key Features

- **Dark Black & Blue-Purple Aesthetic**: Vercel/Linear-inspired dark canvas (`#06070a`) complemented by neon cyan, indigo, and violet accents with frosted glassmorphism (`backdrop-filter: blur(16px)`).
- **Hero Developer Portrait**: Features Jayant's portrait photo in a glassmorphic card with glowing neon accents and floating badges (`B.Tech CSE Batch 2026-2030` and `JECRC University`).
- **Responsive Navigation**: Fixed glassmorphism header with active Scrollspy link indicators and an animated mobile drawer menu.
- **Dynamic Typewriter Hero**: Automatic typing and erasing cycle highlighting your batch, engineering path, and coding interests.
- **Interactive About Section**: Showcases background at JECRC University, coding interests, fast stat badges (2026-2030, 85.40% in 12th, 82.00% in 10th), and Jayant's profile picture.
- **Stylish Technical Skills Badges**: Cards for **C Language, HTML5, CSS3, JavaScript, Git, and GitHub** complete with icons, category labels, and animated skill bars.
- **Comprehensive Academic Education Timeline**:
  - **B.Tech CSE (1st Year, 2026–2030)** at JECRC University (Currently Enrolled).
  - **Class XII (Senior Secondary)** at **Vidhya Niketan Sen. Sec. School** &bull; **85.40%** (Science Stream).
  - **Class X (Secondary School)** at **Vidhya Niketan Sen. Sec. School** &bull; **82.00%** (Science & Maths Foundation).
- **Projects Showcase**: Interactive cards featuring tech tags, live preview / GitHub links, and detail modals for C and JavaScript projects.
- **Interactive Contact Form**: Complete client-side validation (Name, Email format, Message length counter), loading state animation, inline notifications, and toast alerts.
- **Floating Back-to-Top Button**: Smoothly scrolls back to top when scrolling down.
- **Resume Download Feature**: One-click download button in header, hero, and about sections.

---

## 📁 Project Structure

```text
my first portfolio/
│
├── index.html              # Main semantic HTML5 single-page application
├── style.css               # Fallback root stylesheet for cloud deployment
├── vercel.json             # Vercel deployment configuration
├── css/
│   └── style.css           # Custom CSS3 styling, glassmorphism, responsive grid & animations
├── js/
│   └── main.js             # Vanilla JS: typewriter, navigation, scrollspy, contact validation, modal
├── assets/
│   ├── jayant.jpg          # Jayant's official portrait photo
│   ├── favicon.svg         # Modern gradient "J" monogram favicon
│   └── Jayant_Resume.txt   # Complete updated resume with educational marks & details
├── server.ps1              # Zero-dependency local web server script
├── start-server.bat        # One-click Windows server launcher
└── README.md               # Documentation and customization guide
```

---

## 🚀 Deploying to Vercel

If you deploy this portfolio to **Vercel**:
1. **Framework Preset**: Select **`Other`** (since this is pure static HTML/CSS/JS, no build step needed).
2. **Root Directory**: Leave as `./` (or select the folder containing `index.html` if inside a subfolder in GitHub).
3. **Build Command & Output Directory**: Keep toggles **OFF** / default (do not specify an output directory like `css` or `dist`).
4. **All asset links**: Use relative paths (`./css/style.css`, `./js/main.js`, `./assets/...`), which work across both local preview and Vercel hosting.

---

## 🛠️ How to View and Run

### 1. View via Localhost Server
Open your browser and visit:
👉 **[http://localhost:3000/](http://localhost:3000/)**

To start the server anytime in the future, simply double-click **`start-server.bat`**.

### 2. Direct File Access
You can also directly double-click **`index.html`** in your file manager to open it in Chrome, Edge, Brave, or Firefox.

---

## ✏️ Personal Details Configured

- **Name**: Jayant
- **Degree**: B.Tech in Computer Science & Engineering (1st Year, Batch 2026–2030)
- **University**: JECRC University, Rajasthan, India
- **12th Grade**: Vidhya Niketan Sen. Sec. School &bull; **85.40%**
- **10th Grade**: Vidhya Niketan Sen. Sec. School &bull; **82.00%**
- **Profile Photo**: Added to Hero portrait card and About Me profile card
