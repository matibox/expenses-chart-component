async function fetchData() {
    const response = await fetch('./data.json');
    const data = await response.json();
    return data;
}

fetchData()
    .then(data => setData(data))
    .catch(error => {
        console.error(error);
    });

function setData(data) {
    const towers = document.querySelectorAll('[data-tower]');
    const dailySpendings = document.querySelectorAll('[data-day-spending]');
    const weekdays = document.querySelectorAll('[data-weekday]');

    const todaysDayOfWeek = new Date()
        .toLocaleString('en-US', {
            weekday: 'long',
        })
        .toLowerCase()
        .slice(0, 3);

    for (let i = 0; i < towers.length; i++) {
        const amount = data[i].amount;
        towers[i].style.setProperty('--graph-height', `${amount}%`);
        dailySpendings[i].innerText = `$${amount}`;

        if (weekdays[i].innerText === todaysDayOfWeek) {
            towers[i].style.setProperty('--graph-color', 'var(--cyan)');
        }
    }
}
