// CyberDork OSINT Suite v7.0 - Interactive OSINT Tools & Cyber Terminal

export class CyberAudioSFX {
    constructor() {
        this.ctx = null;
        this.muted = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
    }

    playClick() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);

            gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.05);
        } catch (e) {
            // Audio ignore
        }
    }

    playLaunch() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(200, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.15);

            gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.15);
        } catch (e) {
            // Audio ignore
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }
}

export const sfx = new CyberAudioSFX();

export function runQuickOSINT(target, service) {
    sfx.playLaunch();
    const encoded = encodeURIComponent(target);
    let url = '';

    switch (service) {
        case 'virustotal':
            url = `https://www.virustotal.com/gui/search/${encoded}`;
            break;
        case 'shodan':
            url = `https://www.shodan.io/search?query=${encoded}`;
            break;
        case 'censys':
            url = `https://search.censys.io/search?resource=hosts&q=${encoded}`;
            break;
        case 'securitytrails':
            url = `https://securitytrails.com/domain/${encoded}/dns`;
            break;
        case 'wayback':
            url = `https://web.archive.org/web/*/${encoded}`;
            break;
        case 'ipvoid':
            url = `https://www.ipvoid.com/ip-blacklist-check/`;
            break;
        case 'centralops':
            url = `https://centralops.net/co/DomainDossier.aspx?addr=${encoded}`;
            break;
        case 'truecaller':
            url = `https://www.truecaller.com/search/in/${encoded}`;
            break;
        case 'google_phone':
            url = `https://www.google.com/search?q=${encoded}+OR+"${target}"+OR+"${target.replace(/(\d{5})(\d{5})/, '$1-$2')}"`;
            break;
        case 'pastebin':
            url = `https://www.google.com/search?q=site:pastebin.com+"${target}"`;
            break;
        default:
            url = `https://www.google.com/search?q=${encoded}`;
    }

    window.open(url, '_blank');
}
