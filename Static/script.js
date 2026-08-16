document.getElementById('predictionForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const predictBtn = document.getElementById('predictBtn');
    const placeholder = document.getElementById('placeholderText');
    const outputContent = document.getElementById('outputContent');
    const priceDisplay = document.getElementById('predictedPrice');

    // UI Loading state
    predictBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing...`;
    predictBtn.disabled = true;

    const payload = {
        area: document.getElementById('area').value,
        bedrooms: document.getElementById('bedrooms').value,
        bathrooms: document.getElementById('bathrooms').value,
        location: document.getElementById('location').value,
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

            // Animated counter effect
            animateValue(priceDisplay, 0, data.predicted_price, 1000);
        } else {
            alert('Prediction error: ' + data.message);
        }
    } catch (err) {
        alert('Server connection failed. Make sure app.py is running.');
    } finally {
        predictBtn.innerHTML = `<span>Calculate Market Estimate</span> <i class="fa-solid fa-wand-magic-sparkles"></i>`;
        predictBtn.disabled = false;
    }
});

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentVal = Math.floor(progress * (end - start) + start);
        obj.innerHTML = `$${currentVal.toLocaleString()}`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}