document.addEventListener('DOMContentLoaded', (event) => {
    const coinValueElement = document.getElementById('coin-value');
    const lionImage = document.getElementById('lion-img');
    const energyValueElement = document.getElementById('energy-value');
    const totalClicksElement = document.getElementById('total-clicks');
    const boostButton = document.getElementById('boost-button'); // Assuming you have a button with id 'boost-button'
    const buyBoostButton = document.getElementById('buy-boost-button'); // Assuming you have a button with id 'buy-boost-button'
    const tapArea = document.getElementById('tap-area'); // Assuming you have a tap area with id 'tap-area'

    // Получаем сохраненные значения из localStorage
    let coinValue = parseInt(localStorage.getItem('coinValue')) || 0;
    let energyValue = parseInt(localStorage.getItem('energyValue')) || 1500;
    let totalClicks = parseInt(localStorage.getItem('totalClicks')) || 0;
    let hasMultiplier = localStorage.getItem('hasMultiplier') === 'true'; // Check if user has purchased multiplier

    // Устанавливаем начальные значения в элементы
    coinValueElement.textContent = coinValue;
    energyValueElement.textContent = `${energyValue}/1500`;
    totalClicksElement.textContent = totalClicks;

    // Обновляем отображение количества монет
    function updateCoinDisplay() {
        coinValueElement.textContent = coinValue.toLocaleString();
    }

    lionImage.addEventListener('click', () => {
        let increment = hasMultiplier ? 2 : 1; // Apply multiplier if user has purchased it
        if (energyValue > 0) {
            coinValue += increment;
            totalClicks++;
            energyValue--;

            // Обновляем отображаемые значения
            updateCoinDisplay();
            energyValueElement.textContent = `${energyValue}/1500`;
            totalClicksElement.textContent = totalClicks;

            // Сохраняем новые значения в localStorage
            localStorage.setItem('coinValue', coinValue);
            localStorage.setItem('energyValue', energyValue);
            localStorage.setItem('totalClicks', totalClicks);
        }
    });

    boostButton.addEventListener('click', () => {
        if (coinValue >= 2000 && !hasMultiplier) { // Check if user can afford and hasn't purchased already
            coinValue -= 2000;
            localStorage.setItem('coinValue', coinValue);
            hasMultiplier = true;
            localStorage.setItem('hasMultiplier', true);
            updateCoinDisplay();
        }
    });

    // Функция для перезарядки энергии
    const rechargeEnergy = () => {
        if (energyValue < 1500) {
            energyValue = Math.min(energyValue + 1, 1500);
            energyValueElement.textContent = `${energyValue}/1500`;
            localStorage.setItem('energyValue', energyValue);
        }
    };

    // Устанавливаем интервал для перезарядки энергии каждую секунду
    setInterval(rechargeEnergy, 1000);

    // Обработчик нажатия на кнопку "buy" для другого буста
    buyBoostButton.addEventListener('click', function() {
        if (coinValue >= 2000) {
            coinValue -= 2000;
            profitPerTap = 2;
            updateCoinDisplay();
            alert('Boost purchased! Profit per tap is now 2.');
        } else {
            alert('Not enough coins to purchase the boost.');
        }
    });

    // Обработчик тапов для другой области
    tapArea.addEventListener('click', function() {
        let increment = hasMultiplier ? 2 : 1; // Apply multiplier if user has purchased it
        coinValue += increment;
        updateCoinDisplay();
    });

    // Инициализация
    updateCoinDisplay();
});
