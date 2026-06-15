/* ═══════════════════════════════════════════════════════════
   PAGE BUILDER — Shared Component System
   Dynamically builds nav, footer, breadcrumbs, schema,
   year-proofing, internal linking, and common UI elements.
   ═══════════════════════════════════════════════════════════ */

// ── Theme System (runs immediately to prevent FOUC) ──
(function() {
    const saved = localStorage.getItem('tariffcalc-theme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.setAttribute('data-theme', 'light');
    }
})();

function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('tariffcalc-theme', next);
    // Update toggle button icons
    document.querySelectorAll('.theme-icon').forEach(el => {
        el.textContent = next === 'dark' ? '☀️' : '🌙';
    });
}

// ── Dynamic Year Replacement ──
function initDynamicYears() {
    const year = CURRENT_YEAR;
    document.querySelectorAll('[data-year]').forEach(el => {
        el.textContent = el.textContent.replace(/\{YEAR\}/g, year);
    });
    document.querySelectorAll('.dynamic-year').forEach(el => {
        el.textContent = year;
    });
    // Update title tag
    document.title = document.title.replace(/\{YEAR\}/g, year).replace(/2026/g, year);
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = metaDesc.content.replace(/\{YEAR\}/g, year).replace(/2026/g, year);
    }
    // Update last-updated badges
    document.querySelectorAll('.last-updated-date').forEach(el => {
        el.textContent = DATA_LAST_UPDATED;
    });
}

// ── Build Navigation ──
function buildNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navGroups = {
        'Calculators': ALL_PAGES.filter(p => p.url.includes('calculator') || p.url === 'index.html'),
        'Guides': ALL_PAGES.filter(p => p.url.includes('tips') || p.url.includes('timeline') || p.url.includes('how-much')),
        'By Country': ALL_PAGES.filter(p => p.url.includes('country') || p.url.includes('canada') || p.url.includes('uk') || p.url.includes('china') || p.url.includes('comparison'))
    };

    const nav = document.getElementById('main-nav');
    if (!nav) return;

    nav.innerHTML = `
        <div class="nav-container">
            <a href="index.html" class="nav-logo" id="nav-logo">
                <span class="logo-icon">🇺🇸</span>
                <span class="logo-text">TariffCalc</span>
                <span class="logo-badge">${CURRENT_YEAR}</span>
            </a>
            <div class="nav-links" id="nav-links-desktop">
                <a href="index.html" class="nav-link ${currentPage === 'index.html' ? 'active' : ''}">Calculator</a>
                <div class="nav-dropdown">
                    <button class="nav-link nav-dropdown-trigger">Tools ▾</button>
                    <div class="nav-dropdown-menu">
                        ${ALL_PAGES.filter(p => p.priority >= 0.7 && p.url !== 'index.html').map(p => 
                            `<a href="${p.url}" class="nav-dropdown-item ${currentPage === p.url ? 'active' : ''}">
                                <span>${p.icon}</span> ${p.shortTitle}
                            </a>`
                        ).join('')}
                    </div>
                </div>
                <a href="tariff-by-country.html" class="nav-link ${currentPage === 'tariff-by-country.html' ? 'active' : ''}">By Country</a>
                <a href="tariff-savings-tips.html" class="nav-link ${currentPage === 'tariff-savings-tips.html' ? 'active' : ''}">Save Money</a>
                <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle dark/light theme" title="Toggle theme">
                    <span class="theme-icon">${(document.documentElement.getAttribute('data-theme') || 'dark') === 'dark' ? '☀️' : '🌙'}</span>
                </button>
            </div>
            <div class="mobile-controls">
                <button class="theme-toggle mobile-theme-toggle" onclick="toggleTheme()" aria-label="Toggle dark/light theme" title="Toggle theme">
                    <span class="theme-icon">${(document.documentElement.getAttribute('data-theme') || 'dark') === 'dark' ? '☀️' : '🌙'}</span>
                </button>
                <button class="mobile-menu-btn" id="mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="Toggle navigation menu">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
            </div>
        </div>
        <div class="mobile-menu" id="mobile-menu">
            <div class="mobile-menu-inner">
                ${ALL_PAGES.map(p => 
                    `<a href="${p.url}" class="mobile-menu-item ${currentPage === p.url ? 'active' : ''}">
                        <span>${p.icon}</span> ${p.shortTitle}
                    </a>`
                ).join('')}
            </div>
        </div>
    `;
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-menu-btn');
    menu.classList.toggle('open');
    btn.classList.toggle('open');
    document.body.classList.toggle('menu-open');
}

// ── Build Breadcrumbs ──
function buildBreadcrumbs(crumbs) {
    // crumbs = [{ label: 'Home', url: 'index.html' }, { label: 'China Tariffs' }]
    const container = document.getElementById('breadcrumbs');
    if (!container || !crumbs || crumbs.length === 0) return;

    container.innerHTML = `
        <nav class="breadcrumb-nav" aria-label="Breadcrumb">
            <ol class="breadcrumb-list" itemscope itemtype="https://schema.org/BreadcrumbList">
                ${crumbs.map((crumb, i) => `
                    <li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                        ${crumb.url 
                            ? `<a href="${crumb.url}" itemprop="item"><span itemprop="name">${crumb.label}</span></a>`
                            : `<span itemprop="name" class="breadcrumb-current">${crumb.label}</span>`
                        }
                        <meta itemprop="position" content="${i + 1}" />
                        ${i < crumbs.length - 1 ? '<span class="breadcrumb-sep">›</span>' : ''}
                    </li>
                `).join('')}
            </ol>
        </nav>
    `;
}

// ── Build Footer ──
function buildFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const calcPages = ALL_PAGES.filter(p => p.url.includes('calculator') || p.url === 'index.html');
    const guidePages = ALL_PAGES.filter(p => !p.url.includes('calculator') && p.url !== 'index.html');

    footer.innerHTML = `
        <div class="footer-container">
            <div class="footer-grid">
                <div class="footer-col">
                    <div class="footer-brand">
                        <span class="logo-icon">🇺🇸</span>
                        <span class="logo-text">TariffCalc</span>
                        <span class="logo-badge">${CURRENT_YEAR}</span>
                    </div>
                    <p class="footer-tagline">Helping consumers in the US, Canada, and UK understand the real cost of import tariffs.</p>
                    <p class="footer-update">Last updated: <strong>${DATA_LAST_UPDATED}</strong> · v${DATA_VERSION}</p>
                </div>
                <div class="footer-col">
                    <h4 class="footer-heading">Calculators</h4>
                    <ul class="footer-links">
                        ${calcPages.map(p => `<li><a href="${p.url}">${p.icon} ${p.shortTitle}</a></li>`).join('')}
                    </ul>
                </div>
                <div class="footer-col">
                    <h4 class="footer-heading">Guides & Tools</h4>
                    <ul class="footer-links">
                        ${guidePages.map(p => `<li><a href="${p.url}">${p.icon} ${p.shortTitle}</a></li>`).join('')}
                    </ul>
                </div>
                <div class="footer-col">
                    <h4 class="footer-heading">Popular Lookups</h4>
                    <ul class="footer-links">
                        <li><a href="iphone-tariff-calculator.html">📱 iPhone Tariff Cost</a></li>
                        <li><a href="shein-temu-tariff-calculator.html">🛍️ Shein & Temu Duties</a></li>
                        <li><a href="car-tariff-calculator.html">🚗 Car Import Tariffs</a></li>
                        <li><a href="grocery-tariff-calculator.html">🥑 Grocery Tariffs</a></li>
                        <li><a href="tariff-savings-tips.html">💡 Tariff Savings Tips</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p class="footer-disclaimer">
                    This calculator provides estimates for educational purposes only. Actual tariff rates vary by specific product classification (HTS code). 
                    Tariff rates are based on publicly available US trade policy data as of ${DATA_LAST_UPDATED}. This site is not affiliated with any government agency.
                    Not financial or legal advice.
                </p>
                <p class="footer-copyright">© ${CURRENT_YEAR} TariffCalc. All rights reserved. | <a href="sitemap.xml">Sitemap</a></p>
            </div>
        </div>
    `;
}

// ── Build Related Calculators Section ──
function buildRelatedCalculators(currentSlug, relatedSlugs) {
    const container = document.getElementById('related-calculators');
    if (!container) return;

    const related = relatedSlugs 
        ? ALL_PAGES.filter(p => relatedSlugs.some(s => p.url.includes(s)))
        : ALL_PAGES.filter(p => p.url !== currentSlug && p.priority >= 0.7).slice(0, 6);

    container.innerHTML = `
        <div class="section-container">
            <div class="section-header">
                <h2 class="section-title">More Tariff Calculators</h2>
                <p class="section-desc">Explore our other free tariff tools and calculators.</p>
            </div>
            <div class="related-grid">
                ${related.map(p => `
                    <a href="${p.url}" class="related-card" id="related-${p.url.replace('.html','')}">
                        <span class="related-icon">${p.icon}</span>
                        <span class="related-title">${p.title}</span>
                        <span class="related-desc">${p.description}</span>
                        <span class="related-arrow">→</span>
                    </a>
                `).join('')}
            </div>
        </div>
    `;
}

// ── Build Internal Links Section (SEO) ──
function buildInternalLinks() {
    const container = document.getElementById('internal-links');
    if (!container) return;

    container.innerHTML = `
        <div class="section-container">
            <div class="internal-links-grid">
                <div class="il-group">
                    <h3>By Product</h3>
                    <ul>
                        <li><a href="iphone-tariff-calculator.html">iPhone Tariff Calculator</a></li>
                        <li><a href="laptop-tariff-calculator.html">Laptop Tariff Calculator</a></li>
                        <li><a href="electronics-tariff-calculator.html">Electronics Tariff Calculator</a></li>
                        <li><a href="car-tariff-calculator.html">Car Tariff Calculator</a></li>
                        <li><a href="clothing-tariff-calculator.html">Clothing Tariff Calculator</a></li>
                        <li><a href="grocery-tariff-calculator.html">Grocery Tariff Calculator</a></li>
                        <li><a href="furniture-tariff-calculator.html">Furniture Tariff Calculator</a></li>
                        <li><a href="toys-tariff-calculator.html">Toys Tariff Calculator</a></li>
                    </ul>
                </div>
                <div class="il-group">
                    <h3>By Country</h3>
                    <ul>
                        <li><a href="china-tariff-calculator.html">China Tariff Calculator</a></li>
                        <li><a href="tariff-by-country.html">All Country Tariff Rates</a></li>
                        <li><a href="canada-tariff-calculator.html">Canada Tariff Calculator</a></li>
                        <li><a href="uk-import-duty-calculator.html">UK Import Duty Calculator</a></li>
                        <li><a href="tariff-comparison-tool.html">Compare Countries</a></li>
                    </ul>
                </div>
                <div class="il-group">
                    <h3>By Topic</h3>
                    <ul>
                        <li><a href="how-much-tariffs-cost-me.html">How Much Tariffs Cost Me</a></li>
                        <li><a href="de-minimis-calculator.html">De Minimis Rule Changes</a></li>
                        <li><a href="shein-temu-tariff-calculator.html">Shein & Temu Tariffs</a></li>
                        <li><a href="online-shopping-tariff-calculator.html">Online Shopping Tariffs</a></li>
                        <li><a href="import-duty-calculator.html">Import Duty Calculator</a></li>
                        <li><a href="tariff-savings-tips.html">How to Save Money</a></li>
                        <li><a href="tariff-timeline.html">Tariff Timeline</a></li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// ── Inject JSON-LD Schema ──
function injectSchema(schemas) {
    schemas.forEach(schema => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    });
}

function buildWebAppSchema(pageTitle, pageDesc, pageUrl) {
    return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": pageTitle,
        "description": pageDesc,
        "url": pageUrl || window.location.href,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "dateModified": DATA_LAST_UPDATED
    };
}

function buildFAQSchema(faqs) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
    };
}

function buildWebApplicationSchema(name, description, url) {
    return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": name || "US Tariff Calculator",
        "description": description || "Free consumer tariff impact calculator for American shoppers",
        "url": url || "https://tariffcalc.us",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "browserRequirements": "Requires JavaScript",
        "softwareVersion": DATA_VERSION,
        "dateModified": DATA_LAST_UPDATED,
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "creator": {
            "@type": "Organization",
            "name": "TariffCalc",
            "url": "https://tariffcalc.us"
        }
    };
}

function buildArticleSchema(title, description, url, datePublished) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "url": url,
        "datePublished": datePublished || DATA_LAST_UPDATED,
        "dateModified": DATA_LAST_UPDATED,
        "author": {
            "@type": "Organization",
            "name": "TariffCalc",
            "url": "https://tariffcalc.us"
        },
        "publisher": {
            "@type": "Organization",
            "name": "TariffCalc",
            "url": "https://tariffcalc.us"
        }
    };
}

function buildOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "TariffCalc",
        "url": "https://tariffcalc.us",
        "description": "Free consumer tariff calculators helping Americans understand the real cost of US import tariffs.",
        "logo": "https://tariffcalc.us/logo.png",
        "sameAs": []
    };
}

function buildSiteNavigationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        "name": "Main Navigation",
        "hasPart": ALL_PAGES.filter(p => p.priority >= 0.7).map(p => ({
            "@type": "WebPage",
            "name": p.title,
            "url": "https://tariffcalc.us/" + p.url
        }))
    };
}

function buildBreadcrumbSchema(crumbs, baseUrl) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": crumbs.map((crumb, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": crumb.label,
            "item": crumb.url ? (baseUrl || '') + crumb.url : undefined
        }))
    };
}

// ── Build Product Examples Grid ──
function buildProductExamples(filterCategory, filterCountry, maxItems) {
    let examples = PRODUCT_EXAMPLES.sort((a, b) => b.popularity - a.popularity);
    if (filterCategory) examples = examples.filter(e => e.category === filterCategory);
    if (filterCountry) examples = examples.filter(e => e.country === filterCountry);
    if (maxItems) examples = examples.slice(0, maxItems);

    const container = document.getElementById('product-examples');
    if (!container) return;

    container.innerHTML = `
        <div class="section-container">
            <div class="section-header">
                <h2 class="section-title">Real-World Tariff Examples</h2>
                <p class="section-desc">Click any product to calculate its tariff impact instantly.</p>
            </div>
            <div class="examples-grid">
                ${examples.map(ex => `
                    <button class="example-card" onclick="fillExample('${ex.category}','${ex.country}',${ex.price},'${ex.frequency}')">
                        <div class="example-emoji">${ex.emoji}</div>
                        <div class="example-info">
                            <span class="example-name">${ex.name}</span>
                            <span class="example-detail">${COUNTRIES[ex.country]?.flag || '🌐'} ${COUNTRIES[ex.country]?.name || 'Other'} · ${formatUSD(ex.price)}</span>
                        </div>
                        <span class="example-arrow">→</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// ── Build Country Rates Table ──
function buildCountryTable(container_id) {
    const container = document.getElementById(container_id || 'country-rates-table');
    if (!container) return;

    const countries = Object.entries(COUNTRIES).filter(([k]) => k !== 'other').sort((a, b) => b[1].baseRate - a[1].baseRate);

    container.innerHTML = `
        <div class="table-wrapper">
            <table class="tariff-table" id="tariff-rates-table">
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Base Tariff Rate</th>
                        <th>Tariff Type</th>
                        <th>Top Exports to US</th>
                        <th>De Minimis</th>
                    </tr>
                </thead>
                <tbody>
                    ${countries.map(([key, c]) => `
                        <tr class="table-row" data-country="${key}">
                            <td class="td-country"><span class="td-flag">${c.flag}</span> ${c.name}</td>
                            <td class="td-rate"><span class="rate-badge rate-${getRateLevel(c.baseRate)}">${c.baseRate}%</span></td>
                            <td class="td-type">${c.section301 ? 'IEEPA + Section 301' : c.ieepRate > 0 ? 'IEEPA' : 'Reciprocal'}</td>
                            <td class="td-exports">${c.topExports.slice(0, 3).join(', ')}</td>
                            <td class="td-deminimis">${c.deminimis ? '✅ $800' : '❌ Suspended'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function getRateLevel(rate) {
    if (rate <= 10) return 'low';
    if (rate <= 25) return 'medium';
    if (rate <= 35) return 'high';
    return 'extreme';
}

// ── Build Tariff Timeline ──
function buildTimeline(containerId) {
    const container = document.getElementById(containerId || 'tariff-timeline');
    if (!container) return;

    container.innerHTML = TARIFF_TIMELINE.map((item, i) => `
        <div class="timeline-item ${item.impact === 'current' ? 'active' : ''}" id="timeline-${i}">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <span class="timeline-date">${item.date}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <span class="timeline-impact-badge impact-${item.impact}">${item.impact === 'current' ? '🟢 Current' : item.impact === 'critical' ? '🔴 Critical' : item.impact === 'high' ? '🟠 High Impact' : '🟡 Medium'}</span>
            </div>
        </div>
    `).join('');
}

// ── Build Savings Tips ──
function buildSavingsTips(containerId) {
    const container = document.getElementById(containerId || 'savings-tips-grid');
    if (!container) return;

    container.innerHTML = SAVINGS_TIPS.map((tip, i) => `
        <div class="tip-card" id="tip-${i}">
            <div class="tip-icon">${tip.icon}</div>
            <div class="tip-content">
                <h3 class="tip-title">${tip.title}</h3>
                <p class="tip-desc">${tip.description}</p>
                <span class="tip-impact impact-${tip.impact.toLowerCase()}">${tip.impact} Impact</span>
            </div>
        </div>
    `).join('');
}

// ── Scroll Reveal ──
function initScrollReveal() {
    const elements = document.querySelectorAll(
        '.section-header, .calc-panel, .example-card, .affected-card, .timeline-item, .faq-item, .household-card, .stat-card, .related-card, .tip-card, .content-card, .product-hero-card'
    );
    elements.forEach(el => el.classList.add('scroll-reveal'));
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => { entry.target.classList.add('revealed'); }, index * 40);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    elements.forEach(el => observer.observe(el));
}

// ── Smooth Navbar ──
function initNavbar() {
    const navbar = document.getElementById('main-nav');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ── URL Parameter Pre-filling ──
function initURLParams() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    const country = params.get('country');
    const price = params.get('price');
    const freq = params.get('frequency');

    if (cat) { const el = document.getElementById('product-category'); if (el) el.value = cat; }
    if (country) { const el = document.getElementById('country-origin'); if (el) el.value = country; }
    if (price) { const el = document.getElementById('purchase-price'); if (el) el.value = price; }
    if (freq) { const el = document.getElementById('purchase-frequency'); if (el) el.value = freq; }

    if (cat && country && price) {
        setTimeout(() => { if (typeof calculateTariff === 'function') calculateTariff(); }, 300);
    }
}

// ── Page Pre-fill (for sub-pages with locked fields) ──
function prefillCalculator(options) {
    if (options.category) {
        const el = document.getElementById('product-category');
        if (el) { el.value = options.category; if (options.lockCategory) el.disabled = true; }
    }
    if (options.country) {
        const el = document.getElementById('country-origin');
        if (el) { el.value = options.country; if (options.lockCountry) el.disabled = true; }
    }
    if (options.price) {
        const el = document.getElementById('purchase-price');
        if (el) el.value = options.price;
    }
    if (options.frequency) {
        const el = document.getElementById('purchase-frequency');
        if (el) el.value = options.frequency;
    }
}

// ── Common Init (call on every page) ──
function initPage(options = {}) {
    buildNavigation();
    buildFooter();
    initDynamicYears();
    initNavbar();
    initScrollReveal();
    initURLParams();

    if (options.breadcrumbs) buildBreadcrumbs(options.breadcrumbs);
    if (options.relatedCalculators) buildRelatedCalculators(options.currentSlug, options.relatedCalculators);
    if (options.prefill) prefillCalculator(options.prefill);

    // Always inject Organization + SiteNavigation schema
    const allSchemas = [
        buildOrganizationSchema(),
        buildSiteNavigationSchema(),
        ...(options.schemas || [])
    ];
    injectSchema(allSchemas);

    if (options.buildInternalLinks) buildInternalLinks();
    if (options.buildTimeline) buildTimeline(options.timelineContainer);
    if (options.buildSavingsTips) buildSavingsTips(options.tipsContainer);
    if (options.buildCountryTable) buildCountryTable(options.countryTableContainer);
    if (options.buildExamples) buildProductExamples(options.exampleCategory, options.exampleCountry, options.exampleMax);

    // SEO: Verify canonical URL exists, add if missing
    if (!document.querySelector('link[rel="canonical"]')) {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = window.location.href.split('?')[0];
        document.head.appendChild(link);
    }

    // SEO: Add Open Graph type if missing
    if (!document.querySelector('meta[property="og:type"]')) {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:type');
        meta.content = 'website';
        document.head.appendChild(meta);
    }

    // SEO: Add og:site_name if missing
    if (!document.querySelector('meta[property="og:site_name"]')) {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:site_name');
        meta.content = 'TariffCalc — US Tariff Impact Calculator';
        document.head.appendChild(meta);
    }

    // SEO: Add og:url if missing
    if (!document.querySelector('meta[property="og:url"]')) {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:url');
        meta.content = window.location.href.split('?')[0];
        document.head.appendChild(meta);
    }

    // SEO: Add twitter:card if missing
    if (!document.querySelector('meta[name="twitter:card"]')) {
        const meta = document.createElement('meta');
        meta.name = 'twitter:card';
        meta.content = 'summary_large_image';
        document.head.appendChild(meta);
    }

    // SEO: Inject "Last Updated" badge into footer
    const footerDisclaimer = document.querySelector('.footer-disclaimer');
    if (footerDisclaimer && typeof DATA_LAST_UPDATED !== 'undefined') {
        const badge = document.createElement('p');
        badge.style.cssText = 'font-size:0.75rem;color:var(--text-muted);margin-top:8px;';
        badge.innerHTML = `📅 Tariff data last updated: <strong>${DATA_LAST_UPDATED}</strong> · Data version: ${DATA_VERSION}`;
        footerDisclaimer.parentNode.insertBefore(badge, footerDisclaimer.nextSibling);
    }

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
            if (!localStorage.getItem('tariffcalc-theme')) {
                document.documentElement.setAttribute('data-theme', e.matches ? 'light' : 'dark');
                document.querySelectorAll('.theme-icon').forEach(el => {
                    el.textContent = e.matches ? '🌙' : '☀️';
                });
            }
        });
    }

    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `@keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-8px); } 40% { transform: translateX(8px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }`;
    document.head.appendChild(style);

    // SVG Gradient for rate ring
    const svg = document.querySelector('.rate-svg');
    if (svg) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'rateGradient');
        gradient.setAttribute('x1', '0%'); gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%'); gradient.setAttribute('y2', '0%');
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%'); stop1.setAttribute('stop-color', '#f87171');
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%'); stop2.setAttribute('stop-color', '#fb923c');
        gradient.appendChild(stop1); gradient.appendChild(stop2);
        defs.appendChild(gradient); svg.insertBefore(defs, svg.firstChild);
    }
}
