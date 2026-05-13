# Sumer Shinde — Personal Portfolio

A multi-page personal portfolio website showcasing professional experience, technical skills, academic coursework, and personal interests.

---

## Author

**Sumer Shinde**
CS & Mathematics, Northeastern University (Class of 2026) · Boston, MA
[LinkedIn](https://linkedin.com/in/sumershinde22) · [GitHub](https://github.com/sumershinde22) · shinde.su@northeastern.edu

---

## Project Objective

Build a polished, responsive personal homepage that serves as a professional landing page. The site presents:

- **Work history** — co-ops at Chewy, Priceline, and CVS Health, plus university research
- **Projects** — ML, robotics, full-stack, and game-dev work with live charts
- **Skills** — animated progress bars for languages and a badge grid for frameworks/tools
- **Courses** — a searchable/sortable table of Northeastern coursework
- **Hobbies** — hiking and motorcycling with personal photography
- **Interactive ML Explorer** — expandable cards explaining ML concepts used in real projects

The site uses no build step or framework — just plain HTML, CSS, and vanilla JavaScript with Bootstrap 5 loaded from CDN, so it can be opened directly in a browser or served as static files.

---

## Screenshot

### Home — Hero & Experience Timeline
![Home page with particle background, hero text, and experience timeline](assets/media/yosemite.JPG)

> *Replace this placeholder with an actual screenshot once the site is running. See the build instructions below.*

### Pages at a glance

| Page | URL | Description |
|---|---|---|
| Home | `index.html` | Hero, experience timeline, project cards, ML concept explorer |
| About & Skills | `about.html` | Bio, animated skill bars, education |
| Courses & Hobbies | `courses.html` | Coursework table, hiking & motorcycling |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3, Bootstrap 5.3, Google Fonts (Inter) |
| Scripting | Vanilla JavaScript (ES modules) |
| Charts | Chart.js (CDN) |
| Linting | ESLint 9 + eslint-config-prettier |
| Formatting | Prettier 3 |

---

## Project Structure

```
Sumer-Shinde-Homepage/
├── index.html          # Home — hero, experience, projects, ML explorer
├── about.html          # About & Skills — bio, skill bars, education
├── courses.html        # Courses & Hobbies — course table, hobby cards
├── css/
│   ├── style.css       # Home page styles (dark theme, particles, glass cards)
│   ├── about.css       # About page styles
│   └── courses.css     # Courses page styles
├── js/
│   ├── index.js        # Home page entry — wires together all modules
│   ├── main.js         # Shared utilities (navbar active state, theme)
│   ├── theme.js        # Dark/light theme toggle
│   ├── about.js        # Skill bar animation
│   └── courses.js      # Course table filter / ML card accordion
├── assets/
│   └── media/
│       ├── favicon.png
│       ├── yosemite.JPG
│       └── bike.jpeg
├── eslint.config.js
├── .prettierrc
└── package.json
```

---

## Instructions to Build & Run

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later (only needed for the dev server and tooling — the site itself has no build step)

### 1. Clone the repository

```bash
git clone https://github.com/sumershinde22/sumer-shinde-homepage.git
cd sumer-shinde-homepage
```

### 2. Install dev dependencies

```bash
npm install
```

This installs ESLint and Prettier locally. The site itself has no runtime npm dependencies — Bootstrap and Chart.js are loaded from CDN.

### 3. Start the local dev server

```bash
npm run dev
```

This runs `npx serve . -p 3000` and serves the project at **http://localhost:3000**.

Open any of the three pages:

- http://localhost:3000/index.html
- http://localhost:3000/about.html
- http://localhost:3000/courses.html

### 4. (Optional) Open without a server

Because the site uses ES module `import` statements, most browsers require a server to load it correctly (file:// URLs block module imports). Use the dev server above or any other static file server (e.g., VS Code Live Server extension).

---

## Code Quality

```bash
# Lint JavaScript files
npm run lint

# Auto-fix lint issues
npm run lint:fix

# Check formatting
npm run format:check

# Auto-format JavaScript files
npm run format
```

---

## License

MIT — see [LICENSE](LICENSE) for details.
