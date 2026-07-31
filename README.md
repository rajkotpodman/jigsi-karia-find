# ⚡ CyberDork OSINT Suite v7.0 — Ultimate Matrix Edition

> **An Advanced Web-Based Open Source Intelligence (OSINT) Reconnaissance Engine, Multi-Dork Generator, File Extension Radar, Interactive CLI Terminal, and External Threat Intelligence Portal.**

---

## 📋 Table of Contents

- [Overview & Architecture](#-overview--architecture)
- [Key Features & Modules](#-key-features--modules)
  - [1. Matrix HUD & Command Dashboard](#1-matrix-hud--command-dashboard)
  - [2. CyberDork Pro Reconnaissance Engine](#2-cyberdork-pro-reconnaissance-engine)
  - [3. 700+ File Extension Recon Engine](#3-700-file-extension-recon-engine)
  - [4. Visual Dork Builder & Cryptographic Hash Identifier](#4-visual-dork-builder--cryptographic-hash-identifier)
  - [5. Interactive Cyber Terminal CLI](#5-interactive-cyber-terminal-cli)
  - [6. Integrated OSINT Intelligence Toolkit](#6-integrated-osint-intelligence-toolkit)
  - [7. Local Authentication & History Management](#7-local-authentication--history-management)
  - [8. Python Flask OSINT API Backend](#8-python-flask-osint-api-backend)
- [Project Directory Architecture](#-project-directory-architecture)
- [Visual Canvas & Audio Synthesizer Subsystems](#-visual-canvas--audio-synthesizer-subsystems)
- [Installation & Local Setup](#-installation--local-setup)
- [Docker Containerization](#-docker-containerization)
- [Cloud & Serverless Deployment](#-cloud--serverless-deployment)
- [Interactive Terminal Command Reference](#-interactive-terminal-command-reference)
- [Ethical OSINT Usage & Security Disclaimer](#-ethical-osint-usage--security-disclaimer)

---

## 🌐 Overview & Architecture

**CyberDork OSINT Suite v7.0** is an all-in-one web-based intelligence gathering and threat hunting workspace designed for cybersecurity researchers, penetration testers, red teams, and OSINT analysts.

The application combines a high-performance single-page frontend with rich client-side state persistence, browser-based Web Audio synthesis, interactive HTML5 canvas background rendering, and multi-engine OSINT search launchers.

### Core Architectural Highlights
- **Framework & Build Stack:** Vite, Vanilla ES6+ JavaScript, CSS3 custom variables with scanline overlays, HTML5 Canvas.
- **Data Persistence:** Client-side fallback storage mechanism with `localStorage` fallback to memory store for isolated iframe security contexts.
- **Self-Healing Service Worker:** Built-in clean cache/service-worker unregistration logic to prevent stale browser assets and window object property mutability issues.
- **Dual Runtime Support:** Client-side Web UI + Python Flask REST API server for programmatic automated search dork execution.

---

## 💎 Key Features & Modules

### 1. Matrix HUD & Command Dashboard
- **Matrix Digital Rain Canvas:** Fully responsive green binary glyph stream rendered via HTML5 canvas with dynamic column calculation and custom refresh rates.
- **Cybersecurity HUD Stats:** Real-time metrics highlighting operational dork counts (100+ preset dorks), indexed file extensions (700+ extensions across 14 categories), connected OSINT tools (10+ external platforms), and total execution history.
- **Target Quick-Launch Radar:** Global target input field allowing analysts to set a target domain (e.g., `example.com`), IP address, or keyword across all sub-modules simultaneously.

### 2. CyberDork Pro Reconnaissance Engine
- **Categorized Dork Library:** Pre-loaded with battle-tested Google Dorks categorized into:
  - 📂 *Sensitive Files & Documents*
  - 📁 *Publicly Accessible Directories*
  - ⚠️ *Server Vulnerabilities & Exploits*
  - ⚙️ *Exposed Configuration Files*
  - 🔐 *Exposed Passwords & Credentials*
  - 🗄️ *Database Backups & Dumps*
  - 🔐 *Admin Login Portals & Dashboards*
  - 🌐 *IoT, IP Cameras & Network Devices*
- **Multi-Engine Execution:** Launch single-click searches across Google, Bing, DuckDuckGo, Yahoo, Yandex, and Startpage.
- **Batch Target Dorking:** Automatically interpolates the active target domain directly into dork operators (`site:target.com filetype:env`, `site:target.com inurl:admin`).

### 3. 700+ File Extension Recon Engine
- **Exhaustive Extension Index:** Over 700 distinct file extensions classified into 14 distinct categories:
  1. 🖼️ Images & Graphics
  2. 📄 Documents & Text
  3. 📊 Spreadsheets & Data
  4. 🖥️ Presentations
  5. 🎥 Video & Media
  6. 🎵 Audio & Sound
  7. 📦 Archives & Compressed
  8. ⚙️ Executable & Systems
  9. 🌐 Web & Source Code
  10. 🗄️ Database Files
  11. 📐 CAD & 3D Design
  12. 🔤 Fonts & Typography
  13. 🔐 Security & Crypto
  14. 📋 Logs & Diagnostics
- **Real-Time Filtering:** Live multi-term extension filtering and category matching.
- **One-Click Dork Generator:** Instantly construct `site:<target> filetype:<extension>` queries with single-click clipboard copying or direct multi-engine search execution.

### 4. Visual Dork Builder & Cryptographic Hash Identifier
- **Visual Dork Query Constructor:** GUI form builder for assembling complex Google Search operators:
  - Target domain (`site:`)
  - Title constraints (`intitle:`)
  - URL constraints (`inurl:`)
  - Text body constraints (`intext:`)
  - File format (`filetype:`)
  - Excluded terms (`-term`)
- **Cryptographic Hash Pattern Identifier:** Automated regex-based signature matching engine identifying hash types:
  - **MD5** (32 hex characters)
  - **SHA-1** (40 hex characters)
  - **SHA-256** (64 hex characters)
  - **SHA-512** (128 hex characters)
  - **NTLM** (32 hex uppercase characters)
  - **Bcrypt** (`$2a$`, `$2b$`, `$2y$`)

### 5. Interactive Cyber Terminal CLI
- **Cyberpunk Terminal Overlay:** Full command-line terminal interface supporting interactive CLI commands for power users.
- **Interactive Shell Capabilities:** Execute commands, inspect dork categories, identify hashes, query tools, view search logs, export data, and manage sessions directly via keyboard commands.

### 6. Integrated OSINT Intelligence Toolkit
Direct integration buttons and automated search launchers for top-tier third-party threat intelligence services:
- **VirusTotal:** Hash, domain, and IP reputation lookup.
- **Shodan:** Network intelligence, exposed ports, and IoT banner search.
- **Censys:** Global attack surface mapping and SSL/TLS certificate analysis.
- **SecurityTrails:** Historical DNS records and sub-domain enumeration.
- **Wayback Machine:** Internet Archive historical URL snapshot inspection.
- **IPVoid:** IP blacklist checking and reputation scoring.
- **CentralOps:** Domain Dossier WHOIS, DNS, and traceroute lookup.
- **Truecaller & Phone Lookup:** Phone number intelligence queries.
- **Pastebin Google Search:** Paste site search for leaked credentials or logs.

### 7. Local Authentication & History Management
- **Local User Storage:** Register and authenticate users locally via `localStorage`. Includes standard demo credentials (`admin` / `admin`).
- **Audit History Logging:** Automatic timestamped tracking of executed dork queries, targets, and tool launches.
- **Data Export Suite:** Download OSINT audit trail logs in formatted **JSON** or **CSV** formats.

### 8. Python Flask OSINT API Backend
In addition to the Web GUI, `app.py` provides a REST API server capable of programmatically executing dorks or launching searches from automated security pipelines.

---

## 📂 Project Directory Architecture

```
cyberdork-osint-suite/
├── index.html         # Main CyberDork OSINT Suite v7.0 Application UI
├── index1.html        # Dedicated 700+ File Extension Recon Engine UI
├── app.js             # Core App Controller, Canvas Renderer, Terminal CLI, Event Handlers
├── auth.js            # User Session, Local Storage Authentication Engine
├── dorks.js           # Google Dorks Array Database (Categorized)
├── extensions.js      # 700+ File Extensions Categorized Database
├── tools.js           # OSINT External Tool Integration & Launchers
├── sw.js              # Service Worker Clean-Up & Cache Unregister Script
├── app.py             # Python Flask Automated OSINT REST API Server
├── styles.css         # Cyberpunk Matrix HUD Styling & Animations
├── package.json       # Project Metadata & Build Scripts
├── metadata.json      # Platform Configuration & Capabilities
├── manifest.json      # Web Application Manifest (PWA compliant)
├── Dockerfile         # Multi-Stage Docker Build Configuration (Port 3000)
├── .dockerignore      # Docker Ignore Exclusions
└── README.md          # Exhaustive Project Documentation
```

---

## 🔊 Visual Canvas & Audio Synthesizer Subsystems

### Web Audio Synthesizer (`tools.js` / `L` class)
- Built using the native HTML5 `AudioContext` / `webkitAudioContext` API.
- Generates synthetic cybernetic audio feedback without external audio files:
  - **Click Effect:** Sine wave oscillator dropping from 800 Hz to 300 Hz over 50ms.
  - **Launch Effect:** Sawtooth wave oscillator rising from 200 Hz to 1200 Hz over 150ms.
  - **Mute Toggle:** Global audio mute capability.

### Digital Matrix Rain (`app.js` / `initMatrixCanvas`)
- Renders falling Katakana, Latin, and numeric binary streams on a dark background (`#000500`).
- Dynamically scales on window resize events with auto-recalculated column grids.

---

## ⚙️ Installation & Local Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- *(Optional)* **Python**: 3.8+ (for `app.py` Flask API backend)

### Step 1: Clone Repository
```bash
git clone https://github.com/your-username/cyberdork-osint-suite.git
cd cyberdork-osint-suite
```

### Step 2: Install Node Dependencies
```bash
npm install
```

### Step 3: Launch Local Development Server
```bash
npm run dev
```
The application will start locally at `http://localhost:3000` (or `http://localhost:5173`).

### Step 4: (Optional) Run Python Flask Backend
```bash
pip install flask
python app.py
```
The Python OSINT API server will start on `http://127.0.0.1:5000`.

---

## 🐳 Docker Containerization

The repository includes a multi-stage `Dockerfile` configured to build and serve the application using an optimized Nginx web server on port **3000**.

### Build Docker Image
```bash
docker build -t cyberdork-osint-suite:v7.0 .
```

### Run Docker Container
```bash
docker run -d -p 3000:3000 --name cyberdork-suite cyberdork-osint-suite:v7.0
```

Access the containerized application in your browser at `http://localhost:3000`.

---

## 🚀 Cloud & Serverless Deployment

### 1. Vercel / Netlify / GitHub Pages
- Connect your GitHub repository to Vercel or Netlify.
- Set build command: `npm run build`
- Set publish directory: `dist`
- Deploy instantly!

### 2. Google Cloud Run / AWS ECS / DigitalOcean App Platform
- Use the provided `Dockerfile`.
- Deploy the container image to your container registry and start the service exposing port 3000.

---

## 💻 Interactive Terminal Command Reference

Open the **Terminal CLI** tab inside the app to use command-line interface triggers:

| Command | Usage | Description |
| :--- | :--- | :--- |
| `help` | `help` | List all available CLI commands and usage instructions |
| `clear` | `clear` | Clear the terminal output console |
| `dork` | `dork <category>` | Display dorks for a category (e.g., `dork sensitive`, `dork db`) |
| `hash` | `hash <hash_string>` | Analyze and identify hash type (MD5, SHA1, SHA256, Bcrypt, NTLM) |
| `search` | `search <query> [engine]` | Execute dork search on engine (`google`, `bing`, `duckduckgo`) |
| `tools` | `tools` | List available external threat intelligence lookup tools |
| `history` | `history` | Display recent search execution logs |
| `export` | `export <json\|csv>` | Export search history logs to file download |
| `whoami` | `whoami` | Show current authenticated user session details |
| `auth` | `auth <login\|register\|logout>` | Manage user session state directly from CLI |

---

## 🛡️ Ethical OSINT Usage & Security Disclaimer

> **IMPORTANT DISCLAIMER & NOTICE OF INTENDED USE:**
> 
> CyberDork OSINT Suite v7.0 is created exclusively for **educational purposes, defensive security research, authorized penetration testing, and legitimate threat hunting**.
> 
> - Users are strictly responsible for adhering to all applicable local, national, and international laws governing cybersecurity, privacy, and unauthorized computer access.
> - Google Dorking and publicly available information reconnaissance should **ONLY** be conducted against targets you own or have explicit written authorization to test.
> - The developers and contributors accept no liability and are not responsible for any misuse, damage, or illegal activities conducted with this software suite.

---

### 🌟 Project Metadata
- **Version:** 7.0.0 (Ultimate Matrix Edition)
- **License:** MIT License
- **Author:** OSINT & Cybersecurity Research Operations
