function updateCountdown(targetId, eventTime) {
    const target = document.getElementById(targetId);

    if (!target) return;

    const tick = () => {
        let remaining =
            new Date(eventTime).getTime() - Date.now();

        if (remaining <= 0) {
            target.textContent =
                "The celebration has begun!";
            return;
        }

        const units = [
            ["days", 86400000],
            ["hours", 3600000],
            ["minutes", 60000],
            ["seconds", 1000]
        ];

        target.innerHTML = units.map(
            ([label, ms]) => {
                const value =
                    Math.floor(remaining / ms);

                remaining %= ms;

                return `
                    <div>
                        <b>${String(value).padStart(2, "0")}</b>
                        <span>${label}</span>
                    </div>
                `;
            }
        ).join("");
    };

    tick();
    setInterval(tick, 1000);
}
