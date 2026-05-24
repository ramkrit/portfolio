# Ramkrit — Developer Portfolio

[![Live Site](https://img.shields.io/badge/Live-Demo-16f2b3?style=for-the-badge)](https://github.com/ramkrit/portfolio)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

Personal portfolio of **Ramkrit** — Full Stack Software Engineer (backend-heavy) with 5+ years of experience building scalable microservices, event-driven systems, and the React.js / Next.js frontends on top.

This repository contains the source for my portfolio website at [linkedin.com/in/ramkrit-ramkrit](https://linkedin.com/in/ramkrit-ramkrit).

---

## ✨ Features

- ⚡ Built with Next.js 16 App Router and React 19
- 🎨 Tailwind CSS 4 for styling, with a dark gradient theme
- 📱 Fully responsive layout for mobile, tablet, and desktop
- 🧱 Sections: Hero, About, Experience, Skills, Projects, Education, Contact
- 📨 Working contact form with **Gmail (SMTP) and Telegram** delivery — configure either or both
- 👥 Multi-recipient email support via a comma-separated env variable
- 🔍 SEO-friendly metadata via the Next.js Metadata API
- 🐳 Docker support for local dev and production
- 🚀 One-click deployment to Vercel or Netlify

## 🧱 Sections

| Section     | What it covers                                                        |
| ----------- | --------------------------------------------------------------------- |
| Hero        | Quick intro and primary call-to-action (Contact / Resume)             |
| About       | Professional summary and what I focus on                              |
| Experience  | Work history at TyrePlex, Acetech, and IT Solutions 4 India           |
| Skills      | Static grid of technologies I use day-to-day                          |
| Projects    | Featured work — Notification Microservice, Zoho Books Automation, LIMS, Zebra WFM, Seagate Logistics |
| Education   | MCA and BCA from IGNOU                                                |
| Contact     | Working contact form (email + Telegram) with social links             |

## 🛠️ Tech Stack

| Layer        | Technologies                                                              |
| ------------ | ------------------------------------------------------------------------- |
| Framework    | Next.js 16 (App Router, Server Components, Server Actions)                |
| UI           | React 19, Tailwind CSS 4, SCSS, Lottie animations, react-icons            |
| Email / Bots | Nodemailer (Gmail SMTP), Telegram Bot API                                 |
| Tooling      | Sharp (image / favicon generation), ESLint, Docker                        |

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ (Node 20+ recommended)
- npm, pnpm, or yarn
- Git

### Local development

```bash
# 1. Clone
git clone https://github.com/ramkrit/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env (see "Environment Variables" below)

# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm run start
```

### Docker

```bash
# Development
docker compose up --build

# Production image
docker build -t ramkrit-portfolio:prod -f Dockerfile.prod .
docker run -p 3000:3000 ramkrit-portfolio:prod
```

## 🔧 Environment Variables

Create a `.env` file in the project root. All variables are optional unless noted.

| Variable               | Description                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`  | Public URL of your deployment (used by the contact form on the client)                            |
| `NEXT_PUBLIC_GTM`      | Google Tag Manager ID (analytics, optional)                                                       |
| `EMAIL_ADDRESS`        | Gmail account that **sends** the contact form messages                                            |
| `GMAIL_PASSKEY`        | Gmail [App Password](https://myaccount.google.com/apppasswords) — not your regular Gmail password |
| `RECIPIENT_EMAILS`     | Comma-separated list of recipients. Falls back to `EMAIL_ADDRESS` when empty.                     |
| `TELEGRAM_BOT_TOKEN`   | Token from `@BotFather` (only needed for Telegram delivery)                                       |
| `TELEGRAM_CHAT_ID`     | Your Telegram chat ID (only needed for Telegram delivery)                                         |

The contact API auto-detects what's configured:

- If **only Gmail** is set, messages are emailed.
- If **only Telegram** is set, messages are sent to your bot.
- If **both** are set, both channels run in parallel; success on either one is treated as a success.
- If **neither** is set, the API returns `503` with a clear "not configured" message.

Multi-recipient example:

```env
EMAIL_ADDRESS=youraddress@gmail.com
GMAIL_PASSKEY=abcd efgh ijkl mnop
RECIPIENT_EMAILS=rkrit851@gmail.com,ramkrit824472@gmail.com
```

## ✏️ Customizing Content

All portfolio content lives in plain JS data files under `utils/data/` — no CMS, no markdown to wrangle:

| File                                | What it controls                                  |
| ----------------------------------- | ------------------------------------------------- |
| `utils/data/personal-data.js`       | Name, designation, bio, profile image, socials    |
| `utils/data/experience.js`          | Work history cards                                |
| `utils/data/skills.js`              | Skills grid (icons resolved via `skill-image.js`) |
| `utils/data/projects-data.js`       | Project cards                                     |
| `utils/data/educations.js`          | Education entries                                 |
| `utils/data/contactsData.js`        | Contact section info / social links               |

### Profile image

Drop your photo in `public/` (e.g. `public/ramkrit.jpg`) and update `personalData.profile`.

### Favicon

A small Sharp-based script generates the favicon and Apple touch icon from your profile photo:

```bash
node scripts/generate-favicon.js
```

This writes `app/icon.png` (256×256) and `app/apple-icon.png` (180×180), which Next.js automatically wires into the document head.

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── api/              # Contact, captcha, and data routes
│   ├── assets/           # Lottie + skill SVGs
│   ├── components/       # Hero, About, Skills, Projects, etc.
│   ├── css/              # Global SCSS
│   ├── icon.png          # Favicon (auto-generated)
│   ├── apple-icon.png    # iOS icon (auto-generated)
│   ├── layout.js
│   └── page.js
├── public/               # Static images and SVGs
├── scripts/
│   └── generate-favicon.js
├── utils/
│   ├── data/             # Editable content
│   ├── skill-image.js    # Skill name → SVG mapping
│   └── ...
└── README.md
```

## ☁️ Deployment

### Vercel (recommended)

1. Push this repo to GitHub.
2. Import it on [vercel.com](https://vercel.com/new).
3. Add the env variables in **Settings → Environment Variables**.
4. Deploy — Vercel handles Next.js natively.

### Netlify

1. Import the GitHub repo on [netlify.com](https://app.netlify.com/start).
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add env variables in **Site Settings → Environment**.

## 📫 Contact

- **Email:** rkrit851@gmail.com
- **Phone:** +91 9818322703
- **LinkedIn:** [linkedin.com/in/ramkrit-ramkrit](https://linkedin.com/in/ramkrit-ramkrit)
- **Location:** Delhi, India

---

© Ramkrit. All rights reserved.
