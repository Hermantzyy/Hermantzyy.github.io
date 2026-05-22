const FishWeightCalculator = {
    init() {
        document.getElementById('calculateWeightBtn')?.addEventListener('click', () => this.calculate());
        document.getElementById('calculateRodBtn')?.addEventListener('click', () => this.recommendRod());
        document.getElementById('calculateDistanceBtn')?.addEventListener('click', () => this.calculateDistance());
        document.getElementById('calculateTimeBtn')?.addEventListener('click', () => this.bestTime());
    },

    calculate() {
        const length = parseFloat(document.getElementById('fishLength').value);
        const type = document.getElementById('fishType').value;

        if (!length || length <= 0) {
            showToast('Masukkan panjang ikan yang valid', 'error');
            return;
        }

        const coefficients = {
            lele: 0.012,
            mas: 0.0155,
            nila: 0.014,
            patin: 0.011,
            gurame: 0.018,
            trout: 0.009
        };

        const estimatedWeight = (length * length * length * coefficients[type] / 1000).toFixed(2);
        const resultBox = document.getElementById('weightResult');
        resultBox.innerHTML = `
            <div style="text-align: center;">
                <strong>Estimasi Berat: ${estimatedWeight} kg</strong>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">
                    ${type.toUpperCase()} dengan panjang ${length}cm
                </p>
            </div>
        `;
        resultBox.classList.add('show');
    },

    recommendRod() {
        const weight = parseFloat(document.getElementById('targetWeight').value);
        const waterType = document.getElementById('waterType').value;

        if (!weight || weight <= 0) {
            showToast('Masukkan berat target yang valid', 'error');
            return;
        }

        let recommendation = '';
        if (weight < 2) {
            recommendation = 'Joran Ringan (5-15lb) - Cocok untuk ikan kecil';
        } else if (weight < 5) {
            recommendation = 'Joran Sedang (15-30lb) - Ideal untuk sebagian besar ikan';
        } else if (weight < 15) {
            recommendation = 'Joran Berat (30-50lb) - Untuk ikan besar';
        } else {
            recommendation = 'Joran Extra Berat (50lb+) - Untuk ikan monster';
        }

        const resultBox = document.getElementById('rodResult');
        resultBox.innerHTML = `<strong>${recommendation}</strong>`;
        resultBox.classList.add('show');
    },

    calculateDistance() {
        const weight = parseFloat(document.getElementById('baitWeight').value);
        const power = document.getElementById('rodPower').value;

        if (!weight || weight <= 0) {
            showToast('Masukkan bobot umpan yang valid', 'error');
            return;
        }

        const powerMultiplier = { light: 1, medium: 1.5, heavy: 2 };
        const baseDistance = 20 + (weight * 0.5);
        const distance = (baseDistance * powerMultiplier[power]).toFixed(1);

        const resultBox = document.getElementById('distanceResult');
        resultBox.innerHTML = `<strong>Jangkauan: ${distance} meter</strong>`;
        resultBox.classList.add('show');
    },

    bestTime() {
        const date = new Date(document.getElementById('fishingDate').value);
        const location = document.getElementById('location').value;

        if (!date || date.getTime() === new Date('Invalid Date').getTime()) {
            showToast('Pilih tanggal yang valid', 'error');
            return;
        }

        const times = ['04:00 - 07:00', '16:00 - 19:00'];
        const locations = { jakarta: 'Jakarta', bandung: 'Bandung', surabaya: 'Surabaya', medan: 'Medan' };

        const resultBox = document.getElementById('timeResult');
        resultBox.innerHTML = `
            <div style="text-align: left;">
                <strong>Waktu Terbaik untuk ${locations[location]}:</strong><br>
                🌅 Pagi: ${times[0]}<br>
                🌅 Sore: ${times[1]}<br>
                <small style="margin-top: 0.5rem; display: block;">Produktivitas: 90%+</small>
            </div>
        `;
        resultBox.classList.add('show');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    FishWeightCalculator.init();
});