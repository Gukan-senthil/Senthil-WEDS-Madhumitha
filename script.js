/* =========================================
   WEDDING COUNTDOWN
   ========================================= */

function updateCountdown(targetId, eventTime) {

    const target = document.getElementById(targetId);

    if (!target) return;

    const tick = () => {

        let remaining =
            new Date(eventTime).getTime() - Date.now();

        if (remaining <= 0) {
            target.innerHTML = `
                <div class="countdown-started">
                    The celebration has begun! ❤️
                </div>
            `;
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

                const value = Math.floor(
                    remaining / ms
                );

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


/* =========================================
   ADD TO CALENDAR
   ========================================= */

document.addEventListener("click", function (event) {

    const button =
        event.target.closest(".calendar-button");

    if (!button) return;


    /*
       Android:
       Open Google Calendar event creation page.
    */

    if (/Android/i.test(navigator.userAgent)) {

        const googleCalendarURL =
            button.getAttribute(
                "data-google-calendar-url"
            );

        if (googleCalendarURL) {

            event.preventDefault();

            window.location.href =
                googleCalendarURL;

        }

        return;
    }


    /*
       iPhone / iPad / Mac / Windows:
       Follow the normal .ics link.
    */

});
