// تاریخ شروع آشنایی: 13 شهریور 1404 (معادل 3 سپتامبر 2025)
const startDate = new Date('2025-09-03T00:00:00'); 

const yearsEl = document.getElementById('years');
const monthsEl = document.getElementById('months');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateCounter() {
    const now = new Date();
    let diffInMs = now.getTime() - startDate.getTime(); // تفاوت بر حسب میلی‌ثانیه

    // اگر هنوز به تاریخ مورد نظر نرسیده است
    if (diffInMs < 0) {
        yearsEl.innerText = '00';
        monthsEl.innerText = '00';
        daysEl.innerText = '00';
        hoursEl.innerText = '00';
        minutesEl.innerText = '00';
        secondsEl.innerText = '00';
        return;
    }

    // محاسبه اجزا
    // برای سال، ماه و روز از روش دقیق‌تری استفاده می‌کنیم که ماهیت تاریخ را در نظر می‌گیرد.
    let currentYears = now.getFullYear() - startDate.getFullYear();
    let currentMonths = now.getMonth() - startDate.getMonth();
    let currentDays = now.getDate() - startDate.getDate();

    if (currentDays < 0) {
        currentMonths--;
        currentDays += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); // تعداد روزهای ماه قبل
    }
    if (currentMonths < 0) {
        currentYears--;
        currentMonths += 12;
    }

    // برای ساعت، دقیقه و ثانیه از باقیمانده میلی‌ثانیه‌ها استفاده می‌کنیم
    const secondsTotal = Math.floor(diffInMs / 1000); // کل ثانیه‌ها
    const minutesTotal = Math.floor(secondsTotal / 60); // کل دقیقه‌ها
    const hoursTotal = Math.floor(minutesTotal / 60); // کل ساعت‌ها

    const seconds = secondsTotal % 60;
    const minutes = minutesTotal % 60;
    const hours = hoursTotal % 24;

    // به‌روزرسانی محتوای HTML با استفاده از padStart برای دو رقمی کردن
    yearsEl.innerText = currentYears.toString().padStart(2, '0');
    monthsEl.innerText = currentMonths.toString().padStart(2, '0');
    daysEl.innerText = currentDays.toString().padStart(2, '0');
    hoursEl.innerText = hours.toString().padStart(2, '0');
    minutesEl.innerText = minutes.toString().padStart(2, '0');
    secondsEl.innerText = seconds.toString().padStart(2, '0');
}

// اجرای اولیه
updateCounter();

// به‌روزرسانی شمارشگر هر ثانیه (برای حرکت مداوم)
setInterval(updateCounter, 1000);