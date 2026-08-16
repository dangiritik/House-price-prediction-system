document.getElementById('predictionForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const predictBtn = document.getElementById('predictBtn');
    const placeholder = document.getElementById('placeholderText');
    const outputContent = document.getElementById('outputContent');
    const priceDisplay = document.getElementById('predictedPrice');
    const lakhCrDisplay = document.getElementById('lakhCrFormat');

    predictBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Calculating Valuation...`;
    predictBtn.disabled = true;

    const payload = {
        state: document.getElementById('state').value,
        area: document.getElementById('area').value,
        bedrooms: document.getElementById('bedrooms').value,
        bathrooms: document.getElementById('bathrooms').value,
        locality_tier: document.getElementById('locality_tier').value,
        age: document.getElementById('age').value
    };

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (data.status === 'success') {
            placeholder.classList.add('hidden');
            outputContent.classList.remove('hidden');

            const finalVal = Math.round(data.predicted_price);
            animateIndianRupee(priceDisplay, 0, finalVal, 900);
            lakhCrDisplay.innerText = formatToIndianUnits(finalVal);
        } else {
            alert('Prediction error: ' + data.message);
        }
    } catch (err) {
        alert('Server unreachable. Ensure app.py is running.');
    } finally {
        predictBtn.innerHTML = `<span>Calculate Market Value</span> <i class="fa-solid fa-indian-rupee-sign"></i>`;
        predictBtn.disabled = false;
    }
});

function formatToIndianUnits(val) {
    if (val >= 10000000) {
        return `≈ ₹${(val / 10000000).toFixed(2)} Crore`;
    } else if (val >= 100000) {
        return `≈ ₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return '';
}

function animateIndianRupee(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentVal = Math.floor(progress * (end - start) + start);
        obj.innerHTML = `₹${currentVal.toLocaleString('en-IN')}`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}