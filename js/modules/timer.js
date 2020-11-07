function timer(time) {
    const deadline = time;

    function getTimeRemaining(endtime) {
        const time = Date.parse(endtime) - Date.parse(new Date()),
            day = Math.floor(time / (1000 * 60 * 60 * 24)),
            hours = Math.floor(time / (1000 * 60 * 60) % 24),
            minutes = Math.floor((time / 1000 / 60) % 60),
            seconds = Math.floor((time / 1000) % 60);

        return {
            'total': time,
            'day': day,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setTimer(selector, endTime) {
        const timer = document.querySelector(selector),
            day = timer.querySelector('#days'),
            minutes = timer.querySelector('#minutes'),
            hours = timer.querySelector('#hours'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateTimer, 1000);

        updateTimer();

        function updateTimer() {
            const time = getTimeRemaining(endTime);
            day.innerHTML = getZero(time.day);
            hours.innerHTML = getZero(time.hours);
            minutes.innerHTML = getZero(time.minutes);
            seconds.innerHTML = getZero(time.seconds);

            if (time.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setTimer('.timer', deadline);
}
export default timer;