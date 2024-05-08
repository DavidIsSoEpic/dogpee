let cookies = 0;
let upgrades = [
    { name: 'Another Aviad (Ew)', cps: 1, cost: 10 },
    { name: 'Aviads Uncle', cps: 2, cost: 20 },
    { name: 'Aviads left toe 3', cps: 2, cost: 30 },
    { name: 'ANOTHER AVIAD???', cps: 3, cost: 40 }
];
let cookiesPerSecond = 0;
let interval;
let prestigeMultiplier = 1; // Initial Prestige Multiplier

const cookiesDisplay = document.getElementById('cookies');
const cookieButton = document.getElementById('cookieButton');
const upgradeButtons = document.querySelectorAll('.upgradeButton');
const prestigeButton = document.getElementById('prestigeButton');

cookieButton.addEventListener('click', () => {
    cookies++;
    cookiesDisplay.textContent = cookies;
});

upgradeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        let affordableUpgrade = upgrades[index];
        if (affordableUpgrade && cookies >= affordableUpgrade.cost) {
            cookies -= affordableUpgrade.cost;
            cookiesDisplay.textContent = cookies;
            affordableUpgrade.cost *= 2;
            button.textContent = `${affordableUpgrade.name} (Cost: ${affordableUpgrade.cost} cookies)`;
            cookiesPerSecond += affordableUpgrade.cps;
            startCookieProduction();
        } else {
            alert("You don't have enough cookies to buy this upgrade!");
        }
    });
});

prestigeButton.addEventListener('click', () => {
    if (cookies >= 1000000) {
        cookies = 0;
        cookiesDisplay.textContent = cookies;
        prestigeMultiplier *= 2; // Increase prestige multiplier
        alert("Congratulations! You've Prestiged!");
    } else {
        alert("You don't have enough cookies to prestige!");
    }
});

function startCookieProduction() {
    clearInterval(interval);
    interval = setInterval(() => {
        cookies += cookiesPerSecond * prestigeMultiplier; // Apply prestige multiplier
        cookiesDisplay.textContent = cookies;
    }, 1000);
}
function resetUpgradeCosts() {
    upgrades.forEach((upgrade, index) => {
        upgrade.cost = initialUpgradeCosts[index];
        upgradeButtons[index].textContent = `${upgrade.name} (Cost: ${upgrade.cost} cookies)`;
    });
}
