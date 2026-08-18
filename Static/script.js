document.addEventListener('DOMContentLoaded', () => {
    // 1. Interactive Button Selectors (Locality Tier, BHK, Bathrooms)
    setupOptionSelectors('.tier-chips .chip-btn', 'locality_tier');
    setupOptionSelectors('#bedroomSelector .pill-btn', 'bedrooms');
    setupOptionSelectors('#bathroomSelector .pill-btn', 'bathrooms');

    function setupOptionSelectors(buttonSelector, hiddenInputId) {
        const buttons = document.querySelectorAll(buttonSelector);
        const hiddenInput = document.getElementById(hiddenInputId);

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                hiddenInput.value = btn.getAttribute('data-value');
            });
        });
    }

    // 2. Form Submission & Animation
    const form = document.getElementById('predictionForm');
    const predictBtn = document.getElementById('predictBtn');
    const idleState = document.getElementById('idleState');
    const resultState = document.getElementById('resultState');
    const priceDisplay = document.getElementById('predictedPrice');
    const lakhCrDisplay = document.getElementById('lakhCrFormat');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // UI Loading Feedback
        predictBtn.disabled = true;
        predictBtn.innerHTML = `
            <span class="btn-shine"></span>
            <span class="btn-content">
                <i class="fa-solid fa-circle-notch fa-spin"></i> Analyzing Real Estate Data...
            </span>
        `;

        const payload = {
            state: document.getElementById('state').value,
            area: document.getElementById('area').value,
            locality_tier: document.getElementById('locality_tier').value,
            bedrooms: document.getElementById('bedrooms').value,
            bathrooms: document.getElementById('bathrooms').value,
            age: document.getElementById('age').value
        };

        try {
            const res = await fetch('/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data.status === 'success') {
                idleState.classList.add('hidden');
                resultState.classList.remove('hidden');

                const finalPrice = Math.round(data.predicted_price);
                animateCurrencyCounter(priceDisplay, 0, finalPrice, 1100);
                lakhCrDisplay.innerText = formatIndianUnits(finalPrice);
            } else {
                alert('Prediction Error: ' + data.message);
            }
        } catch (err) {
            alert('Server error: Please ensure the Flask app (app.py) is running.');
        } finally {
            predictBtn.disabled = false;
            predictBtn.innerHTML = `
                <span class="btn-shine"></span>
                <span class="btn-content">
                    <i class="fa-solid fa-wand-magic-sparkles"></i> Compute Property Valuation
                </span>
            `;
        }
    });

    // 3. Indian Currency Number Formatting
    function formatIndianUnits(val) {
        if (val >= 10000000) {
            return `≈ ₹${(val / 10000000).toFixed(2)} Crore`;
        } else if (val >= 100000) {
            return `≈ ₹${(val / 100000).toFixed(2)} Lakh`;
        }
        return '';
    }

    // 4. Smooth Counter Animation for Luxury Presentation
    function animateCurrencyCounter(element, start, end, duration) {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease-out cubic curve
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * (end - start) + start);
            element.innerHTML = `₹${current.toLocaleString('en-IN')}`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});