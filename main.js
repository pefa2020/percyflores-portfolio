/* ============================================================
   Percy Flores Portfolio - main.js
   ============================================================ */

'use strict';

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Theme Toggle ── */
const html        = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = themeToggle?.querySelector('.theme-icon');

// Restore saved preference (default: dark)
const savedTheme = localStorage.getItem('pf-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
if (themeIcon) themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

themeToggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('pf-theme', next);
  if (themeIcon) themeIcon.textContent = next === 'dark' ? '🌙' : '☀️';
});

/* ── Mobile menu ── */
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

/* ── Typewriter ── */
const phrases = [
  'Cybersecurity Engineer',
  'Network Security Researcher',
  'Full-Stack Developer',
  'Binary Exploitation Practitioner',
  'NJIT Master\'s Student'
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter-text');

function typeLoop() {
  if (!typeEl) return;
  const current = phrases[phraseIdx];
  if (!deleting) {
    typeEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) { deleting = true; return setTimeout(typeLoop, 2200); }
  } else {
    typeEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
  }
  setTimeout(typeLoop, deleting ? 45 : 80);
}
typeLoop();

/* ── Scroll Reveal ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* ── Skill Bars ── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

/* ── Project Filter ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? '' : 'none';
      if (show) card.style.animation = 'none';
    });
  });
});

/* ── Project Modal ── */
const modalOverlay = document.getElementById('modal-overlay');
const modalBody    = document.getElementById('modal-body');

/* ── PDF Viewer ── */
const pdfViewer     = document.getElementById('pdf-viewer-overlay');
const pdfViewerFrame = document.getElementById('pdf-viewer-frame');
const pdfViewerTitle = document.getElementById('pdf-viewer-title');

function openPdfViewer(src, title) {
  pdfViewerFrame.src = src;
  pdfViewerTitle.textContent = title;
  pdfViewer.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closePdfViewer() {
  pdfViewer.classList.remove('open');
  pdfViewerFrame.src = '';
  document.body.style.overflow = '';
}
document.getElementById('pdf-viewer-close')?.addEventListener('click', closePdfViewer);
pdfViewer?.addEventListener('click', (e) => { if (e.target === pdfViewer) closePdfViewer(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && pdfViewer?.classList.contains('open')) closePdfViewer(); });

const projectData = {
  prismont: {
    title: 'Prismont - Enterprise AI Governance Platform',
    course: 'Founded Startup | 2026',
    overview: 'As Co-Founder, I am architecting and building Prismont, a comprehensive governance layer for Enterprise AI. The platform provides organizations with interlocking systems to model constraints, execute within governed boundaries, and deliver adversarially-verified decisions through a Context Engine and an Agent Board composed of seven adversarial auditors.',
    highlights: [
      'Engineered the Context Engine: a secure, organization-specific profile enforcing risk thresholds and operational policies',
      'Developed the Agent Board: a multi-agent adversarial auditor network that stress-tests AI proposals across legal, financial, and compliance dimensions',
      'Designed the Arena: a rigorously governed execution environment ensuring all prompts are fully tracked within a defensible audit trail',
      'Deployed production-ready platform infrastructure at prismontai.com ensuring high-availability and zero black-box logic'
    ],
    tools: ['Next.js', 'AI SDK', 'Agentic Workflows', 'Enterprise Infrastructure', 'Cloud Architecture'],
    files: [
      { label: 'Visit Live Platform', path: 'https://prismontai.com', type: 'link' },
      { label: 'Prismont LinkedIn', path: 'https://www.linkedin.com/company/prismont/', type: 'link' }
    ]
  },
  merck: {
    title: 'Merck AI Scenario Planning Chatbot',
    course: 'CS 491 - Senior Capstone | Spring 2025',
    overview: 'Developed a production-grade AI-powered chatbot for Merck that enables project managers to interact with Microsoft Project plan files using natural language. As Lead Developer, Percy Flores built the core agentic framework and all tool-calling infrastructure.',
    highlights: [
      'Architected an agentic LLM system using the AI SDK with support for complex, multi-step tool-calling workflows',
      'Built 9 specialized tool functions enabling the LLM to shift task dates, detect weekend conflicts, filter by timeframes, and recompute critical paths',
      'Implemented full-stack architecture using Next.js App Router, React Server Components, Vercel Blob for file storage, and Neon (Postgres) for persistence',
      'Designed and shipped responsive UI components using Shadcn/ui and Radix UI primitives',
      'Delivered a functional prototype enabling "what-if" scheduling analysis through a conversational interface'
    ],
    tools: ['Next.js', 'React', 'AI SDK', 'Vercel Blob', 'Neon Postgres', 'Shadcn/ui', 'Tailwind CSS', 'TypeScript'],
    files: [
      { label: 'CS 491 Final Paper (HTML)', path: './reports/cs491-report.html', type: 'pdf' },
      { label: 'CS 491 Final Paper (Official PDF)', path: './Copy of CS 491 Final Paper.pdf', type: 'pdf' }
    ]
  },
  arp: {
    title: 'ARP Poisoning Attack Lab',
    course: 'CS 646 - Network Protocols & Security | Spring 2026',
    overview: 'Performed a controlled ARP Poisoning (Man-in-the-Middle) attack in a virtual machine environment, intercepting and analyzing network traffic between hosts. Proposed real-world mitigations based on findings.',
    highlights: [
      'Configured and exploited ARP cache poisoning in a sandboxed VM network to redirect traffic through an attacker-controlled node',
      'Captured and analyzed intercepted packets using Wireshark to demonstrate MITM data exposure',
      'Documented full attack lifecycle: reconnaissance, poisoning, interception, and restoration',
      'Proposed defense strategies including dynamic ARP inspection (DAI), static ARP entries, and 802.1X port authentication'
    ],
    tools: ['Wireshark', 'Linux VM', 'ARP', 'Python', 'Networking Protocols'],
    files: [
      { label: 'Full Lab Report (Google Doc)', path: 'https://docs.google.com/document/d/18npG6iiGUACk-l5rVNzs2pXTlTBUrNzkemu6FkFpRBM/edit?usp=sharing', type: 'link' }
    ]
  },
  cisco: {
    title: 'Multi-Router Network Configuration',
    course: 'CS 646 - Network Protocols & Security | Spring 2026',
    overview: 'Designed and implemented a multi-router network topology using Cisco Packet Tracer, applying Variable Length Subnet Masking (VLSM) to optimize IP address allocation across five network segments.',
    highlights: [
      'Applied VLSM subnetting to segment a network into five subnets across routers R1 and R2',
      'Configured router interfaces (G0/0, G0/1, S0/0/0) with correct IP addresses, subnet masks, and default gateways',
      'Verified end-to-end connectivity using Packet Tracer simulation mode',
      'Documented full address table with interface assignments for each network device'
    ],
    tools: ['Cisco Packet Tracer', 'VLSM', 'IPv4', 'Subnetting', 'Router Configuration'],
    files: [
      { label: 'Network Address Table (Google Doc)', path: 'https://docs.google.com/document/d/1kORE84PribdnG_0LSdjEIhCZVlqOKWsbzfFdajd_5dU/edit?usp=sharing', type: 'link' },
      { label: 'Cisco Packet Tracer File (.pkt)', path: './project.pkt', type: 'download' }
    ]
  },
  frodo: {
    title: 'Command Injection Exploit - Frodo Lab',
    course: 'CS 647 - Counter Hacking Techniques | Fall 2025',
    overview: 'Identified and exploited a command injection vulnerability in the iPrint application running as the Frodo user. Used dynamic analysis tools to trace system calls and craft a payload that spawned an interactive shell.',
    highlights: [
      'Used ltrace and strace to trace library calls and system-level interactions of the target binary',
      'Identified failure to sanitize user input before passing to a system() call',
      'Crafted backtick-injected payload to execute arbitrary commands within the application context',
      'Enumerated sudo permissions using sudo -l to escalate and retrieve the flag',
      'Recommended mitigations: revoke unnecessary sudo permissions, replace system() with exec-family calls'
    ],
    tools: ['GDB', 'ltrace', 'strace', 'Linux', 'Bash', 'sudo'],
    files: [
      { label: 'Frodo Assessment Report (HTML)', path: './reports/frodo-report.html', type: 'pdf' }
    ]
  },
  merry: {
    title: 'Stack Buffer Overflow - Merry Lab',
    course: 'CS 647 - Counter Hacking Techniques | Fall 2025',
    overview: 'Exploited a classic stack-based buffer overflow in the retAddr3 binary to redirect program execution to the hidden getFlag function, retrieving merryflag.txt. ASLR, SSP, and DEP were disabled for this deterministic lab environment.',
    highlights: [
      'Disassembled the binary with GDB to identify the unsafe strcpy() call and locate the getFlag function address (0x565563c2)',
      'Determined the exact padding (108 bytes) required to overflow the buffer and overwrite the saved return address',
      'Crafted a Perl-generated payload with little-endian encoded function address',
      'Exploit command: ./retAddr3 $(perl -e \'print "A"x108 . "\\xc2\\x63\\x55\\x56"\')',
      'Proposed mitigations: enable ASLR/SSP/DEP, replace strcpy() with strncpy(), conduct regular code reviews'
    ],
    tools: ['GDB', 'Perl', 'Assembly', 'x86 Architecture', 'Linux'],
    files: [
      { label: 'Merry Assessment Report (HTML)', path: './reports/merry-report.html', type: 'pdf' }
    ]
  },
  sam: {
    title: 'Shellcode Injection - Sam Lab',
    course: 'CS 647 - Counter Hacking Techniques | Fall 2025',
    overview: 'Advanced beyond simple return-address redirection by injecting custom shellcode into a vulnerable buffer. Crafted a NOP sled + shellcode payload to gain an interactive shell as the Sam user.',
    highlights: [
      'Analyzed stack layout with GDB to determine NOP sled size, shellcode position, and return address target',
      'Crafted a three-part payload: 132-byte NOP sled + custom shell.bin shellcode + padding and return address (0xffffcee0)',
      'Exploit command: ./helloVuln5 $(perl -e \'print "\\x90"x132\')$(cat shell.bin)$(perl -e \'print "A"x10 . "\\xe0\\xce\\xff\\xff"\')',
      'Successfully spawned an interactive /bin/sh shell within the target user context',
      'Proposed industry mitigations: DEP (W^X pages), ASLR, stack canaries, and memory-safe languages'
    ],
    tools: ['GDB', 'Shellcode', 'NOP Sled', 'Perl', 'x86 Assembly', 'Linux'],
    files: [
      { label: 'Sam Assessment Report (HTML)', path: './reports/sam-report.html', type: 'pdf' }
    ]
  },
  pippin: {
    title: 'Digital Forensics & SSH Exploitation - Pippin Lab',
    course: 'CS 647 - Counter Hacking Techniques | Fall 2025',
    overview: 'Performed layered digital forensics on a series of obfuscated nested archives to extract a hidden SSH private key, gain unauthorized account access, and subsequently harvest credentials via an exposed SMB service.',
    highlights: [
      'Used the file command to identify hidden archive types within SaveForPippin.zip (tar, gzip, bzip2, xz layers)',
      'Recursively extracted nested archives using tar, unzip, and decompress utilities',
      'Discovered an SSH private key concealed through security-by-obscurity practices',
      'Used the extracted SSH key to gain shell access to the Pippin account',
      'Located a .csv credential file and leveraged smbclient to authenticate to a local SMB share and retrieve the flag'
    ],
    tools: ['SSH', 'smbclient', 'tar', 'file', 'Bash', 'Linux Forensics'],
    files: [
      { label: 'Pippin Assessment Report (HTML)', path: './reports/pippin-report.html', type: 'pdf' }
    ]
  },
  legolas: {
    title: 'ASLR + SSP + DEP Triple Bypass - Legolas Lab',
    course: 'CS 647 - Counter Hacking Techniques | Fall 2025',
    overview: 'The most advanced lab in the series - bypassed all three modern memory protections (ASLR, Stack Smashing Protection, and DEP/NX) simultaneously using a format string vulnerability combined with return-to-libc exploitation.',
    highlights: [
      'Identified a format string vulnerability via unsafe printf() allowing arbitrary read of stack memory',
      'Leaked the stack canary (SSP bypass) and libc base address (ASLR bypass) using %p format specifiers',
      'Chained a return-to-libc attack: set up the stack to call system("/bin/sh") within the already-loaded libc',
      'Bypassed DEP because no shellcode was injected - only existing executable code (libc) was reused (ROP technique)',
      'Implemented graceful exit to avoid SIGABRT from SSP detection after flag retrieval'
    ],
    tools: ['GDB', 'Format String Exploit', 'Return-to-libc', 'ASLR', 'SSP', 'DEP/NX', 'Linux'],
    files: [
      { label: 'Legolas Assessment Report (HTML)', path: './reports/legolas-report.html', type: 'pdf' }
    ]
  }
};

function openModal(key) {
  const data = projectData[key];
  if (!data) return;

  const filesHtml = data.files && data.files.length ? `
    <div class="modal-section">
      <h3>📂 Verify the Work</h3>
      <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:12px;">Click below to open the actual source documents - the exact reports submitted for this work.</p>
      <div class="modal-file-links">
        ${data.files.map(f => {
          if (f.type === 'pdf') {
            return `
              <div class="modal-file-row">
                <span class="modal-file-icon">📄</span>
                <span class="modal-file-name">${f.label}</span>
                <div class="modal-file-actions">
                  <button class="modal-file-btn btn-view-pdf" data-src="${f.path}" data-title="${f.label}">View Inline</button>
                  <a class="modal-file-btn" href="${f.path}" download target="_blank">Download</a>
                </div>
              </div>`;
          } else if (f.type === 'link') {
            return `
              <div class="modal-file-row">
                <span class="modal-file-icon">🔗</span>
                <span class="modal-file-name">${f.label}</span>
                <div class="modal-file-actions">
                  <a class="modal-file-btn" href="${f.path}" target="_blank" rel="noopener">Open Document</a>
                </div>
              </div>`;
          } else {
            return `
              <div class="modal-file-row">
                <span class="modal-file-icon">💾</span>
                <span class="modal-file-name">${f.label}</span>
                <div class="modal-file-actions">
                  <a class="modal-file-btn" href="${f.path}" download>Download</a>
                </div>
              </div>`;
          }
        }).join('')}
      </div>
    </div>` : '';

  modalBody.innerHTML = `
    <div class="modal-header">
      <div>
        <p class="modal-course">${data.course}</p>
        <h2>${data.title}</h2>
      </div>
      <button class="modal-close" id="modal-close-btn" aria-label="Close modal">✕</button>
    </div>
    ${filesHtml}
    <div class="modal-section">
      <h3>Overview</h3>
      <p>${data.overview}</p>
    </div>
    <div class="modal-section">
      <h3>Key Achievements</h3>
      <ul>${data.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <h3>Tools & Technologies</h3>
      <div class="modal-tools">${data.tools.map(t => `<span class="modal-tool">${t}</span>`).join('')}</div>
    </div>
  `;
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);

  // Wire up PDF view buttons
  document.querySelectorAll('.btn-view-pdf').forEach(btn => {
    btn.addEventListener('click', () => openPdfViewer(btn.dataset.src, btn.dataset.title));
  });
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

modalOverlay?.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.key));
});

/* ── Global PDF viewer buttons (Documents section) ── */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-view-pdf');
  if (btn && btn.dataset.src) openPdfViewer(btn.dataset.src, btn.dataset.title || '');
});

/* ── Terminal animation ── */
const terminalLines = document.querySelectorAll('.t-line');
terminalLines.forEach((line, i) => {
  line.style.opacity = '0';
  setTimeout(() => {
    line.style.transition = 'opacity 0.4s';
    line.style.opacity = '1';
  }, 600 + i * 350);
});

/* ── Smooth active nav highlight ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current
      ? 'var(--text-primary)' : '';
  });
}, { passive: true });

console.log('%cPercy Flores - Portfolio', 'color:#3b82f6;font-size:1.5rem;font-weight:900;');
console.log('%cCybersecurity | Networking | Full-Stack Engineering', 'color:#06b6d4;font-size:0.9rem;');
