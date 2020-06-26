document.addEventListener('DOMContentLoaded', function () {
    timeleft();
    setInterval(() => {
        timeleft();
    }, 40);

    document.querySelectorAll('.f-time').forEach(item => {
        item.addEventListener('click', () => {
            let hash = item.dataset.type;
            if ( item.parentElement.classList.contains('is-active') ) {
                document.querySelector('.m-cards').classList.remove('has-active');
                document.querySelectorAll('.f-time').forEach(card => {
                    card.parentElement.classList.remove('is-hidden');
                    card.parentElement.classList.remove('is-active');
                });
                window.location.hash = '';
            } else {
                document.querySelectorAll('.f-time').forEach(card => {
                    card.parentElement.classList.add('is-hidden');
                    card.parentElement.classList.remove('is-active');
                });
                item.parentElement.classList.remove('is-hidden');
                item.parentElement.classList.add('is-active');
                document.querySelector('.m-cards').classList.add('has-active');
                window.location.hash = hash;
            }
        });
    });

    if (window.location.hash) {
        let hash = window.location.hash.replace('#', '');
        document.querySelector(`.f-time[data-type="${hash}"]`).click();
    }

});

function timeleft() {
    let now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth(),
        weekday = now.getDay(),
        day = now.getDate(),
        hour = now.getHours(),
        time = now.getTime(),
        yearLastDigit = year.toString().substring(3);
    
    const msHour = 3600000,
        msDay = 86400000;

    let itemDelay = 0;
    document.querySelectorAll('.f-time').forEach(item => {
        let type = item.dataset.type,
            amount = 0,
            ms = 0,
            start = 0,
            end = 0,
            diff = 0,
            msLeft = 0,
            secondsLeft = 0,
            minutesLeft = 0,
            hoursLeft = 0,
            weeeksLeft = 0,
            monthsLeft = 0;
        
        switch (type) {
            case 'hour':
                start = new Date(year, month, day, hour).getTime();
                end = start + msHour;
                diff = time - start;
                amount = diff / msHour;

                msLeft = Math.round((end - time));
                item.querySelector('.f-time-specs-ms').innerText = numberWithCommas(msLeft);
                secondsLeft = Math.floor((end - time) * 0.001);
                item.querySelector('.f-time-specs-s').innerText = numberWithCommas(secondsLeft);
                minutesLeft = Math.ceil(secondsLeft/60);
                item.querySelector('.f-time-specs-m').innerText = numberWithCommas(minutesLeft);

                break;
            case 'day':
                start = new Date(year, month, day).getTime();
                end = start + msDay;
                diff = time - start;
                amount = diff / msDay;

                secondsLeft = Math.round((end - time) * 0.001);
                item.querySelector('.f-time-specs-s').innerText = numberWithCommas(secondsLeft);
                minutesLeft = Math.round(secondsLeft / 60);
                item.querySelector('.f-time-specs-m').innerText = numberWithCommas(minutesLeft);
                hoursLeft = Math.round(minutesLeft / 60);
                item.querySelector('.f-time-specs-h').innerText = numberWithCommas(hoursLeft);

                break;
            case 'week':
                if ( weekday == 1 ) {
                    start = new Date(year, month, day).getTime();
                } else if ( weekday == 0 ) {
                    let monday = day - 6;
                    if (monday >= 0) {
                        start = new Date(year, month, monday).getTime();
                    } else {
                        start = new Date(year, month).getTime() - (msDay * (monday * -1));
                    }
                } else {
                    let monday = day - weekday + 1;
                    if (monday >= 0) {
                        start = new Date(year, month, monday).getTime();
                    } else {
                        start = new Date(year, month).getTime() - (msDay * (monday * -1));
                    }
                }
                end = start + (msDay * 7);
                diff = time - start;
                amount = diff / (end - start);

                secondsLeft = Math.round((end - time) * 0.001);
                minutesLeft = Math.round(secondsLeft / 60);
                item.querySelector('.f-time-specs-m').innerText = numberWithCommas(minutesLeft);
                hoursLeft = Math.round(minutesLeft / 60);
                item.querySelector('.f-time-specs-h').innerText = numberWithCommas(hoursLeft);
                daysLeft = Math.floor(hoursLeft / 24);
                item.querySelector('.f-time-specs-d').innerText = numberWithCommas(daysLeft);

                break;
            case 'month':
                start = new Date(year, month).getTime();
                if ( month == 11 ) {
                    end = new Date((year + 1), 0).getTime();
                } else {
                    end = new Date(year, (month + 1)).getTime();
                }
                diff = time - start;
                amount = diff / (end - start);

                secondsLeft = Math.round((end - time) * 0.001);
                minutesLeft = Math.round(secondsLeft / 60);
                item.querySelector('.f-time-specs-m').innerText = numberWithCommas(minutesLeft);
                hoursLeft = Math.round(minutesLeft / 60);
                item.querySelector('.f-time-specs-h').innerText = numberWithCommas(hoursLeft);
                daysLeft = Math.floor(hoursLeft / 24);
                item.querySelector('.f-time-specs-d').innerText = numberWithCommas(daysLeft);

                break;
            case 'year':
                if (year % 4 === 0 ) {
                    days = 366;
                } else {
                    days = 365;
                }
                start = new Date(year, 0).getTime();
                end = new Date(year + 1, 0).getTime();
                diff = time - start;
                amount = diff / (end - start);

                secondsLeft = Math.round((end - time) * 0.001);
                minutesLeft = Math.round(secondsLeft / 60);
                hoursLeft = Math.round(minutesLeft / 60);
                daysLeft = Math.ceil(hoursLeft / 24);
                item.querySelector('.f-time-specs-d').innerText = numberWithCommas(daysLeft);
                weeksLeft = Math.floor(daysLeft / 7);
                item.querySelector('.f-time-specs-w').innerText = numberWithCommas(weeksLeft);
                monthsLeft = Math.floor(daysLeft / 30);
                item.querySelector('.f-time-specs-mo').innerText = numberWithCommas(monthsLeft);

                break;
            case 'decade':
                if (yearLastDigit == 1 ) {
                    start = new Date(year, 0).getTime();
                    end = new Date((year + 10), 0).getTime();
                } else if (yearLastDigit == 0) {
                    start = new Date((year - 9), 0).getTime();
                    end = new Date((year + 1), 0).getTime();
                } else {
                    start = new Date((year - (yearLastDigit - 1)), 0).getTime();
                    end = new Date((year + (11 - yearLastDigit)), 0).getTime();
                }
                diff = time - start;
                amount = diff / (end - start);

                secondsLeft = Math.round((end - time) * 0.001);
                minutesLeft = Math.round(secondsLeft / 60);
                hoursLeft = Math.round(minutesLeft / 60);
                daysLeft = Math.ceil(hoursLeft / 24);
                weeksLeft = Math.floor(daysLeft / 7);
                item.querySelector('.f-time-specs-w').innerText = numberWithCommas(weeksLeft);
                monthsLeft = Math.floor(daysLeft / 30);
                item.querySelector('.f-time-specs-mo').innerText = numberWithCommas(monthsLeft);
                yearsLeft = Math.floor(monthsLeft / 12);
                item.querySelector('.f-time-specs-y').innerText = numberWithCommas(yearsLeft);

                break;
            case 'century':
                start = new Date(2001, 0).getTime();
                end = new Date(2101, 0).getTime();
                diff = time - start;
                amount = diff / (end - start);

                secondsLeft = Math.round((end - time) * 0.001);
                minutesLeft = Math.round(secondsLeft / 60);
                hoursLeft = Math.round(minutesLeft / 60);
                daysLeft = Math.ceil(hoursLeft / 24);
                monthsLeft = Math.floor(daysLeft / 30);
                item.querySelector('.f-time-specs-mo').innerText = numberWithCommas(monthsLeft);
                yearsLeft = Math.floor(monthsLeft / 12);
                item.querySelector('.f-time-specs-y').innerText = numberWithCommas(yearsLeft);
                decadesLeft = Math.floor(yearsLeft / 10);
                item.querySelector('.f-time-specs-de').innerText = numberWithCommas(decadesLeft);

                break;
            case 'millenium':
                start = 2001;
                end = 3001;
                diff = year - start;
                amount = diff / 1000;
                item.querySelector('.f-time-specs-y').innerText = numberWithCommas(end - year);
                item.querySelector('.f-time-specs-de').innerText = numberWithCommas(Math.floor((end - year)/10));
                item.querySelector('.f-time-specs-c').innerText = numberWithCommas(Math.floor((end - year) / 100));

                break;
        }

        let percentage = Math.floor(amount * 100);
        if (percentage !== 'undefined') {
            item.querySelector('.f-time-percentage').innerText = percentage;

            let circleAmount = 76 / 100 * percentage;
            setTimeout(() => {
                item.querySelector('.f-time-circle-progress').style.strokeDashoffset = (566 - circleAmount) + 'px';
                item.querySelector('.a-progress-line').style.width = percentage + '%';

                let dynamicWidth = parseInt(item.querySelector('.a-progress-line').style.width);
                let hue = Math.floor(199 - (199 / 100 * dynamicWidth));
                let hueLight = hue + 10;
                
                item.querySelector('.a-progress-line').style.backgroundColor = hslToHex(hue, 56, 52);
                item.querySelector('.a-progress-line').style.boxShadow = '0 0 .5em' + hslToHex(hueLight, 76, 62);
                item.querySelector('.a-progress').style.backgroundColor = hslToHex(hue, 15, 35);
            }, 10 + itemDelay);

            itemDelay += 150;
        }
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}