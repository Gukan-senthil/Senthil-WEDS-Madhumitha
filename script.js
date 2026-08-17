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
            ([label, milliseconds]) => {

                const value =
                    Math.floor(
                        remaining / milliseconds
                    );

                remaining %= milliseconds;

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


    /* -----------------------------------------
       Detect mobile devices
       ----------------------------------------- */

    const userAgent =
        navigator.userAgent || navigator.vendor || window.opera;

    const isAndroid =
        /Android/i.test(userAgent);

    const isIOS =
        /iPhone|iPad|iPod/i.test(userAgent) ||
        (
            navigator.platform === "MacIntel" &&
            navigator.maxTouchPoints > 1
        );


    /* -----------------------------------------
       ANDROID
       Open Google Calendar
       ----------------------------------------- */

    if (isAndroid) {

        const googleCalendarURL =
            button.getAttribute(
                "data-google-calendar-url"
            );

        if (googleCalendarURL) {

            event.preventDefault();

            window.location.href =
                googleCalendarURL;

            return;
        }
    }


    /* -----------------------------------------
       APPLE DEVICES
       Open .ics calendar file
       ----------------------------------------- */

    if (isIOS) {

        /*
         * Do NOT prevent the default action.
         * Safari will handle the .ics file.
         */

        return;
    }


    /* -----------------------------------------
       DESKTOP
       Open/download .ics file
       ----------------------------------------- */

    return;

});
