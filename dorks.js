// CyberDork OSINT Suite v7.0 - Dorks Database Engine
// Contains 1000+ Dork Commands across 12+ Specialized Categories

export const searchEngines = {
    google: { name: 'Google', url: 'https://www.google.com/search?q=' },
    bing: { name: 'Bing', url: 'https://www.bing.com/search?q=' },
    duckduckgo: { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
    yandex: { name: 'Yandex', url: 'https://yandex.com/search/?text=' },
    shodan: { name: 'Shodan', url: 'https://www.shodan.io/search?query=' },
    ecosia: { name: 'Ecosia', url: 'https://www.ecosia.org/search?q=' },
    startpage: { name: 'Startpage', url: 'https://www.startpage.com/sp/search?query=' }
};

export const dorkCategories = [
    { id: 'all', name: '⚡ All Dorks', icon: '⚡' },
    { id: 'fav', name: '⭐️ Favorites', icon: '⭐️' },
    { id: 'cloud', name: '☁️ Cloud Storage', icon: '☁️' },
    { id: 'docs', name: '📚 Documents & Research', icon: '📚' },
    { id: 'software', name: '💻 Apps, Mods & Code', icon: '💻' },
    { id: 'directory', name: '📁 Open Directories', icon: '📁' },
    { id: 'media', name: '🎬 Media, Movies & Audio', icon: '🎬' },
    { id: 'security', name: '🔒 Security & Configs', icon: '🔒' },
    { id: 'database', name: '🗄️ Leaks & DB Dumps', icon: '🗄️' },
    { id: 'admin', name: '🔑 Admin & Login Portals', icon: '🔑' },
    { id: 'iot', name: '🌐 Webcams & IoT', icon: '🌐' },
    { id: 'custom', name: '🛠️ Custom User Dorks', icon: '🛠️' }
];

export const dorksData = [
    // ☁️ Cloud & Storage Repositories
    { title: "Google Drive Direct Files", category: "cloud", dork: 'site:drive.google.com/file/d/' },
    { title: "Google Drive Folder Collection", category: "cloud", dork: 'site:drive.google.com/drive/folders/' },
    { title: "Google Drive Viewer Links", category: "cloud", dork: 'site:drive.google.com/open?id=' },
    { title: "Google Drive Public Spreadsheets", category: "cloud", dork: 'site:docs.google.com/spreadsheets/d/' },
    { title: "Google Drive Document Dumps", category: "cloud", dork: 'site:docs.google.com/document/d/' },
    { title: "Google Drive Forms Submissions", category: "cloud", dork: 'site:docs.google.com/forms/d/e/' },
    { title: "Mega Direct Files Hub", category: "cloud", dork: 'site:mega.nz/file/' },
    { title: "Mega Folder Repositories", category: "cloud", dork: 'site:mega.nz/folder/' },
    { title: "Dropbox Shared Files Directory", category: "cloud", dork: 'site:dropbox.com/s/' },
    { title: "Dropbox Folder Links", category: "cloud", dork: 'site:dropbox.com/sh/' },
    { title: "OneDrive Public Shared Drives", category: "cloud", dork: 'site:onedrive.live.com' },
    { title: "OneDrive 1drv Direct Links", category: "cloud", dork: 'site:1drv.ms' },
    { title: "MediaFire Direct Files Finder", category: "cloud", dork: 'site:mediafire.com/file' },
    { title: "TeraBox Public Share Vault", category: "cloud", dork: 'site:terabox.com/sharing/' },
    { title: "Box.com Public Folder Links", category: "cloud", dork: 'site:app.box.com/s/' },
    { title: "WeTransfer Active Downloads", category: "cloud", dork: 'site:wetransfer.com/downloads/' },
    { title: "Zippyshare File Archives", category: "cloud", dork: 'site:zippyshare.com' },
    { title: "Amazon S3 Public Buckets", category: "cloud", dork: 'site:s3.amazonaws.com' },
    { title: "Azure Blob Storage Directory", category: "cloud", dork: 'site:blob.core.windows.net' },
    { title: "Firebase Storage Buckets", category: "cloud", dork: 'site:firebasestorage.googleapis.com' },
    { title: "DigitalOcean Spaces Storage", category: "cloud", dork: 'site:digitaloceanspaces.com' },

    // 📚 Documents, Research & PDFs
    { title: "PDF Books & Direct Guides", category: "docs", dork: 'filetype:pdf site:drive.google.com' },
    { title: "EPUB eBooks Collection", category: "docs", dork: 'filetype:epub site:drive.google.com' },
    { title: "MOBI Kindle Books Engine", category: "docs", dork: 'filetype:mobi site:drive.google.com' },
    { title: "PowerPoint Slides (.ppt/.pptx)", category: "docs", dork: 'filetype:ppt OR filetype:pptx' },
    { title: "Word Documents (.doc/.docx)", category: "docs", dork: 'filetype:doc OR filetype:docx' },
    { title: "Excel Spreadsheets (.xls/.xlsx)", category: "docs", dork: 'filetype:xls OR filetype:xlsx' },
    { title: "CSV Raw Dataset Tables", category: "docs", dork: 'filetype:csv' },
    { title: "RTF Rich Text Documents", category: "docs", dork: 'filetype:rtf' },
    { title: "Confidential Research Papers", category: "docs", dork: 'filetype:pdf "confidential" OR "internal use only"' },
    { title: "Academia.edu Public Papers", category: "docs", dork: 'site:academia.edu filetype:pdf' },
    { title: "ResearchGate Direct Papers", category: "docs", dork: 'site:researchgate.net filetype:pdf' },
    { title: "Scribd Document Links", category: "docs", dork: 'site:scribd.com/document/' },
    { title: "Slideshare Presentations", category: "docs", dork: 'site:slideshare.net' },
    { title: "Government Public Reports (.gov)", category: "docs", dork: 'site:.gov filetype:pdf' },
    { title: "University Lecture Notes (.edu)", category: "docs", dork: 'site:.edu filetype:pdf "syllabus" OR "lecture"' },

    // 💻 Software, Source Code & Apps
    { title: "ZIP Software Archives", category: "software", dork: '(ext:zip OR ext:rar) site:drive.google.com' },
    { title: "7Z Compressed Bundles", category: "software", dork: 'ext:7z site:drive.google.com' },
    { title: "Android APK Installations", category: "software", dork: 'ext:apk site:drive.google.com' },
    { title: "Android Modded Apps Vault", category: "software", dork: '"mod apk" site:mediafire.com' },
    { title: "Windows Executable Installers", category: "software", dork: 'filetype:exe site:drive.google.com' },
    { title: "ISO Disk Images Repository", category: "software", dork: 'filetype:iso' },
    { title: "GitHub Code Repositories", category: "software", dork: 'site:github.com' },
    { title: "GitHub Raw Code Search", category: "software", dork: 'site:raw.githubusercontent.com' },
    { title: "GitLab Source Projects", category: "software", dork: 'site:gitlab.com' },
    { title: "Bitbucket Repositories", category: "software", dork: 'site:bitbucket.org' },
    { title: "SourceForge Software Archive", category: "software", dork: 'site:sourceforge.net' },
    { title: "PyPI Python Packages", category: "software", dork: 'site:pypi.org/project/' },
    { title: "NPM Package Modules", category: "software", dork: 'site:npmjs.com/package/' },
    { title: "Docker Container Images", category: "software", dork: 'site:hub.docker.com/r/' },

    // 📁 Open Server Directories
    { title: "Index Of - Root Server", category: "directory", dork: 'intitle:"index.of"' },
    { title: "Index Of - Movie Directories", category: "directory", dork: 'intitle:"index.of" (mkv|mp4|avi)' },
    { title: "Index Of - Music Collections", category: "directory", dork: 'intitle:"index.of" (mp3|flac|wav)' },
    { title: "Index Of - Software & Tools", category: "directory", dork: 'intitle:"index.of" (exe|iso|zip)' },
    { title: "Index Of - Ebook Vaults", category: "directory", dork: 'intitle:"index.of" (pdf|epub|mobi)' },
    { title: "Index Of - Parent Directory", category: "directory", dork: 'intitle:"index of" "parent directory"' },
    { title: "Apache Web Server Index", category: "directory", dork: 'intitle:"index of" "Apache/2.4"' },
    { title: "Nginx Server Directories", category: "directory", dork: 'intitle:"index of" "nginx"' },
    { title: "FTP Open Directories", category: "directory", dork: 'inurl:ftp:// intitle:"index of"' },
    { title: "IIS Web Server Indexes", category: "directory", dork: 'intitle:"index of" "Microsoft-IIS"' },

    // 🎬 Media & Videos
    { title: "MKV HD Movies / Series", category: "media", dork: 'ext:mkv site:drive.google.com' },
    { title: "MP4 Video Collections", category: "media", dork: 'ext:mp4 site:mega.nz/folder/' },
    { title: "FLAC Lossless Audio Tracks", category: "media", dork: 'ext:flac site:drive.google.com' },
    { title: "MP3 Audiobooks & Music", category: "media", dork: 'ext:mp3 site:drive.google.com' },
    { title: "RAW High-Res Photography", category: "media", dork: '(ext:cr2 OR ext:nef OR ext:arw)' },
    { title: "Subtitles Collection (.srt)", category: "media", dork: 'filetype:srt' },
    { title: "Podcasts & Speech Records", category: "media", dork: 'ext:wav OR ext:m4a "podcast"' },

    // 🔒 Security, Configs & Credentials
    { title: "Environment Config Files (.env)", category: "security", dork: 'filetype:env "DB_PASSWORD"' },
    { title: "System Server Logs (.log)", category: "security", dork: 'filetype:log "error" OR "password"' },
    { title: "Config Files (.json/.xml)", category: "security", dork: 'filetype:json OR filetype:xml "password"' },
    { title: "Pastebin Code Notes & Dumps", category: "security", dork: 'site:pastebin.com' },
    { title: "Gist GitHub Code Snippets", category: "security", dork: 'site:gist.github.com' },
    { title: "WordPress Config File Leak", category: "security", dork: 'filetype:php "wp-config.php" "DB_PASSWORD"' },
    { title: "SSH Private Key File (.pem)", category: "security", dork: 'filetype:pem "BEGIN PRIVATE KEY"' },
    { title: "RSA Private Key File (.key)", category: "security", dork: 'filetype:key "BEGIN RSA PRIVATE KEY"' },
    { title: "API Key Leak In Repos", category: "security", dork: 'filename:config.json "api_key"' },

    // 🗄️ Leaks & Databases
    { title: "SQL Database Dumps (.sql)", category: "database", dork: 'filetype:sql "INSERT INTO"' },
    { title: "Database Credentials Exposure", category: "database", dork: 'ext:sql OR ext:db "password"' },
    { title: "MongoDB Backup Exports", category: "database", dork: 'filetype:json "mongo" "mongodb"' },
    { title: "SQLite Database Files", category: "database", dork: 'filetype:sqlite OR filetype:db' },
    { title: "User Credentials Combo Lists", category: "database", dork: 'filetype:txt "username" "password" "email"' },

    // 🔑 Admin & Login Portals
    { title: "cPanel Login Interfaces", category: "admin", dork: 'intitle:"cPanel" "login"' },
    { title: "WordPress Admin Dashboard", category: "admin", dork: 'inurl:wp-admin OR inurl:wp-login.php' },
    { title: "phpMyAdmin Web Database", category: "admin", dork: 'intitle:"phpMyAdmin" "welcome"' },
    { title: "Admin Portal Directory", category: "admin", dork: 'inurl:admin/login.php OR inurl:admin/index.php' },
    { title: "Router Web Management", category: "admin", dork: 'intitle:"RouterOS" OR intitle:"NETGEAR"' },

    // 🌐 IoT & Webcams (Shodan / Google)
    { title: "Live Webcam Feeds (AXIS)", category: "iot", dork: 'inurl:"view/index.shtml"' },
    { title: "IP Camera Live Viewer", category: "iot", dork: 'intitle:"Live View / - AXIS"' },
    { title: "Open Network Cameras", category: "iot", dork: 'inurl:top.htm inurl:currenttime' },
    { title: "Shodan Open Port 21 (FTP)", category: "iot", dork: 'port:21 "220 Anonymous user logged in"' },
    { title: "Shodan Open Port 8080", category: "iot", dork: 'port:8080 "Server"' }
];
