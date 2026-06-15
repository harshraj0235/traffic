/* ═══════════════════════════════════════════
   US TARIFF IMPACT CALCULATOR — APP LOGIC
   Uses shared tariff-data.js for all rates.
   ═══════════════════════════════════════════ */

let priceChart = null;

// ── Main Calculation ──
function calculateTariff() {
    const category = document.getElementById('product-category').value;
    const countryEl = document.getElementById('country-origin');
    const country = countryEl.disabled ? countryEl.value : countryEl.value;
    const price = parseFloat(document.getElementById('purchase-price').value);
    const frequency = document.getElementById('purchase-frequency').value;

    if (!category || !country || !price || price <= 0) {
        shakeElement(document.getElementById('calculate-btn'));
        if (!category) highlightField('product-category');
        if (!country) highlightField('country-origin');
        if (!price || price <= 0) highlightField('purchase-price');
        return;
    }

    const countryData = COUNTRIES[country] || COUNTRIES.other;
    const categoryData = CATEGORIES[category];
    const freqData = FREQUENCY_MULTIPLIERS[frequency];
    if (!categoryData) return;

    let effectiveRate = countryData.baseRate;
    if (country === 'china') effectiveRate += categoryData.chinaAdditional;
    else effectiveRate += categoryData.otherAdjust;
    if (category === 'automotive') effectiveRate = Math.max(effectiveRate, 25);
    effectiveRate = Math.max(effectiveRate, 10);

    const preTariffRate = categoryData.preTariffRate;
    const preTariffPrice = price / (1 + effectiveRate / 100) * (1 + preTariffRate / 100);
    const tariffCostPerItem = price - preTariffPrice;
    const annualTariffCost = tariffCostPerItem * freqData.annual;

    let breakdownParts = [];
    if (country === 'china') {
        breakdownParts.push(`${countryData.baseRate}% base China tariff`);
        if (categoryData.chinaAdditional > 0) breakdownParts.push(`+${categoryData.chinaAdditional}% Section 301 (${categoryData.name})`);
    } else {
        breakdownParts.push(`${countryData.baseRate}% ${countryData.name} tariff`);
        if (categoryData.otherAdjust > 0) breakdownParts.push(`+${categoryData.otherAdjust}% category duty`);
        else if (categoryData.otherAdjust < 0) breakdownParts.push(`${categoryData.otherAdjust}% category adjustment`);
    }

    updateResults({ effectiveRate, preTariffRate, preTariffPrice, tariffCostPerItem, annualTariffCost, price, breakdown: breakdownParts.join(' · '), categoryData, countryData, freqData, frequency });
}

function updateResults(data) {
    document.getElementById('results-placeholder').style.display = 'none';
    const rc = document.getElementById('results-content');
    rc.style.display = 'block';
    rc.style.animation = 'none'; void rc.offsetHeight;
    rc.style.animation = 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both';

    const maxRate = 150, pct = Math.min(data.effectiveRate / maxRate, 1);
    const circ = 2 * Math.PI * 54, offset = circ * (1 - pct);
    document.getElementById('rate-circle').style.stroke = getTariffColor(data.effectiveRate);
    document.getElementById('rate-circle').style.strokeDashoffset = offset;
    animateValue('rate-value', 0, data.effectiveRate, 1200, '%');
    document.getElementById('rate-breakdown').textContent = data.breakdown;
    animateValue('extra-cost-value', 0, data.tariffCostPerItem, 1000, '$');

    if (data.frequency === 'once') {
        document.getElementById('annual-cost-value').textContent = 'One-time';
        document.querySelector('#card-annual .cost-card-label').textContent = 'Purchase Type';
    } else {
        animateValue('annual-cost-value', 0, data.annualTariffCost, 1200, '$');
        document.querySelector('#card-annual .cost-card-label').textContent = 'Annual Impact';
    }
    animateValue('pretariff-price-value', 0, data.preTariffPrice, 1000, '$');
    updateChart(data);

    const ctxEl = document.getElementById('context-text');
    let html = data.categoryData.contextFact;
    if (!data.countryData.deminimis && data.price < 800) {
        html += ` <strong>Note:</strong> The de minimis exemption (previously $800 duty-free) has been suspended for ${data.countryData.name}. Even small purchases now face full tariffs.`;
    }
    ctxEl.innerHTML = html;
    if (window.innerWidth < 1024) document.getElementById('results-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateChart(data) {
    const ctx = document.getElementById('price-chart').getContext('2d');
    if (priceChart) priceChart.destroy();
    const base = data.preTariffPrice / (1 + data.preTariffRate / 100);
    const oldTariff = data.preTariffPrice - base;
    priceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Pre-2025 Price', 'Current Price'],
            datasets: [
                { label: 'Base Cost', data: [base, base], backgroundColor: 'rgba(52,211,153,0.6)', borderColor: 'rgba(52,211,153,0.8)', borderWidth: 1, borderRadius: 4 },
                { label: 'Original Duties', data: [oldTariff, oldTariff], backgroundColor: 'rgba(251,191,36,0.5)', borderColor: 'rgba(251,191,36,0.7)', borderWidth: 1, borderRadius: 4 },
                { label: 'NEW Tariff Cost', data: [0, data.tariffCostPerItem], backgroundColor: 'rgba(248,113,113,0.6)', borderColor: 'rgba(248,113,113,0.8)', borderWidth: 1, borderRadius: 4 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#8b95b0', font: { family: "'Inter',sans-serif", size: 11, weight: 500 }, usePointStyle: true, pointStyle: 'rectRounded', padding: 16 } },
                tooltip: { backgroundColor: 'rgba(15,21,40,0.95)', titleColor: '#e8ecf4', bodyColor: '#8b95b0', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, cornerRadius: 8, padding: 12, callbacks: { label: c => `${c.dataset.label}: $${c.parsed.y.toFixed(2)}` } }
            },
            scales: {
                x: { stacked: true, ticks: { color: '#8b95b0', font: { family: "'Inter',sans-serif", size: 12, weight: 600 } }, grid: { display: false }, border: { display: false } },
                y: { stacked: true, ticks: { color: '#5a6480', font: { family: "'JetBrains Mono',monospace", size: 11 }, callback: v => '$' + v.toLocaleString() }, grid: { color: 'rgba(255,255,255,0.04)' }, border: { display: false } }
            },
            animation: { duration: 1200, easing: 'easeOutQuart' }
        }
    });
}

// ── Household Calculator ──
function calculateHousehold() {
    const income = parseInt(document.getElementById('household-income').value);
    const style = document.getElementById('household-style').value;
    const size = parseInt(document.getElementById('household-size').value);
    const sm = HOUSEHOLD_MULTIPLIERS.styles[style];
    const sizeMul = 1 + (size - 1) * 0.3;
    const importSpend = income * sm.importSpend * sizeMul;
    const cb = JSON.parse(JSON.stringify(HOUSEHOLD_MULTIPLIERS.categoryBreakdown));
    if (size >= 3) cb['Toys & Games'].pct = 0.08;
    if (style === 'luxury') { cb['Electronics'].pct = 0.28; cb['Auto & Transport'].pct = 0.20; cb['Clothing & Shoes'].pct = 0.15; }

    let total = 0; const results = [];
    for (const [name, d] of Object.entries(cb)) {
        const spend = importSpend * d.pct;
        const burden = spend * (d.avgTariff / (100 + d.avgTariff));
        total += burden;
        results.push({ name, amount: burden, percent: d.avgTariff });
    }
    results.sort((a, b) => b.amount - a.amount);

    const rd = document.getElementById('household-results');
    rd.style.display = 'block'; rd.style.animation = 'none'; void rd.offsetHeight;
    rd.style.animation = 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both';
    animateValue('household-total', 0, total, 1500, '$');
    document.getElementById('household-note').textContent = `That's ~$${(total/365).toFixed(2)}/day — about ${(total/income*100).toFixed(1)}% of your household income going to tariffs.`;

    const bd = document.getElementById('household-bars');
    const maxA = results[0].amount;
    bd.innerHTML = results.map(c => `<div class="household-bar-item"><div class="household-bar-label"><span class="household-bar-name">${c.name}</span><span class="household-bar-amount">$${Math.round(c.amount).toLocaleString()}/yr</span></div><div class="household-bar-track"><div class="household-bar-fill" style="width:0%" data-width="${(c.amount/maxA*100).toFixed(1)}%"></div></div></div>`).join('');
    setTimeout(() => { bd.querySelectorAll('.household-bar-fill').forEach(b => { b.style.width = b.dataset.width; }); }, 200);
    rd.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ── Quick Examples ──
function fillExample(category, country, price, frequency) {
    document.getElementById('product-category').value = category;
    const co = document.getElementById('country-origin');
    if (!co.disabled) co.value = country;
    document.getElementById('purchase-price').value = price;
    document.getElementById('purchase-frequency').value = frequency;
    ['product-category','country-origin','purchase-price','purchase-frequency'].forEach((id,i) => {
        const el = document.getElementById(id); if (!el || el.disabled) return;
        setTimeout(() => { el.style.borderColor='var(--accent-blue)'; el.style.boxShadow='0 0 0 3px var(--accent-blue-glow)'; setTimeout(()=>{el.style.borderColor='';el.style.boxShadow='';},600); }, i*100);
    });
    const calc = document.getElementById('calculator');
    if (calc) calc.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => calculateTariff(), 500);
}

// ── Share ──
function shareResults() {
    const rate = document.getElementById('rate-value').textContent;
    const extra = document.getElementById('extra-cost-value').textContent;
    const annual = document.getElementById('annual-cost-value').textContent;
    const text = `🇺🇸 My US Tariff Impact:\n📊 Tariff Rate: ${rate}\n💸 Extra Paying: ${extra}\n📅 Annual: ${annual}\n\nCalculate yours:`;
    if (navigator.share) { navigator.share({ title: 'My US Tariff Impact', text, url: window.location.href }).catch(()=>{}); }
    else if (navigator.clipboard) {
        navigator.clipboard.writeText(text + ' ' + window.location.href).then(() => {
            const b = document.getElementById('share-btn'); const o = b.innerHTML;
            b.innerHTML = '<span>✅ Copied!</span>'; b.style.borderColor='var(--accent-green)';
            setTimeout(() => { b.innerHTML=o; b.style.borderColor=''; }, 2000);
        });
    }
}

// ── Utilities ──
function animateValue(id, start, end, duration, prefix='') {
    const el = document.getElementById(id); if (!el) return;
    const t0 = performance.now(), isP = prefix==='%', isD = prefix==='$';
    function upd(t) {
        const p = Math.min((t-t0)/duration,1), e = 1-Math.pow(1-p,3), c = start+(end-start)*e;
        if (isD) el.textContent = '$'+c.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,',');
        else if (isP) el.textContent = c.toFixed(1)+'%';
        else el.textContent = Math.round(c).toLocaleString();
        if (p<1) requestAnimationFrame(upd);
        else { if(isD) el.textContent='$'+end.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,','); else if(isP) el.textContent=end.toFixed(1)+'%'; }
    }
    requestAnimationFrame(upd);
}
function getTariffColor(r) { return r<15?'#34d399':r<30?'#fbbf24':r<50?'#fb923c':'#f87171'; }
function shakeElement(el) { el.style.animation='shake 0.5s ease'; el.addEventListener('animationend',()=>{el.style.animation='';},{once:true}); }
function highlightField(id) { const el=document.getElementById(id); el.style.borderColor='var(--accent-red)'; el.style.boxShadow='0 0 0 3px var(--accent-red-glow)'; setTimeout(()=>{el.style.borderColor='';el.style.boxShadow='';},2000); }
