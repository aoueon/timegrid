document.addEventListener('DOMContentLoaded', function () {
    timeleft();
    // setInterval(() => {
    //     timeleft();
    // }, 200);
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

    document.querySelectorAll('.f-time').forEach(item => {
        let type = item.dataset.type,
            amount = 0,
            ms = 0,
            start = 0,
            end = 0,
            diff = 0;
        switch (type) {
            case 'hour':
                start = new Date(year, month, day, hour).getTime();
                end = start + msHour;
                diff = time - start;
                amount = diff / msHour;
                break;
            case 'day':
                start = new Date(year, month, day).getTime();
                end = start + msDay;
                diff = time - start;
                amount = diff / msDay;
                break;
            case 'week':
                if ( weekday == 0 ) {
                    start = new Date(year, month, day).getTime();
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
                break;
            case 'century':
                start = new Date(2001, 0).getTime();
                end = new Date(2101, 0).getTime();
                diff = time - start;
                amount = diff / (end - start);
                break;
            case 'millenium':
                start = new Date(2001, 0).getTime();
                end = new Date(3001, 0).getTime();
                diff = time - start;
                amount = diff / (end - start);
                break;
        }

        let percentage = Math.floor(amount * 100);
        if (percentage !== 'undefined') {
            item.querySelector('.f-time-percentage').innerText = percentage;

            // circular progress
            var circleAmount = 76 / 100 * percentage;
            item.querySelector('.f-time-circle-progress').style.strokeDashoffset = (566 - circleAmount) + 'px';

            // bar progrss
            item.querySelector('.a-progress-line').style.width = percentage + '%';
        }
    });
}

// function timeleft() {
//     var d = new Date();
//     var n = d.getMinutes();
//     var s = d.getSeconds();
//     var t = 59 - n;
//     var tf;
//     var sl = 59 - s;
//     var slf;
//     var percentage = 100 - ((((60 - s) + (t * 60)) / 3600) * 100);
//     var percentageLeft = (((60 - s) + (t * 60)) / 3600) * 100;
//     document.querySelector(".time-left").innerHTML = '' + t + '' + '<span class="is-thin">:' + pad(sl, 2) + '</span>';
//     document.getElementsByClassName('percentage-left-progress')[0].value = percentage;
//     document.querySelector(".percentage-left").innerHTML = `${Math.floor(percentage)}%`;
// }