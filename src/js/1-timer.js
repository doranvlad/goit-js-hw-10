import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const timerBtn = document.querySelector('button[data-start]');
timerBtn.disabled = true;

const timerInput = document.querySelector('#datetime-picker');

const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0].getTime();

        if (userSelectedDate <= Date.now()) {
            iziToast.error({
            message: 'Please choose a date in the future',
            position: 'topCenter',
            });
            timerBtn.disabled = true
        } else {
            timerBtn.disabled = false
        }
    },
};

flatpickr("#datetime-picker", options);

timerBtn.addEventListener('click', onBtnClick);

function onBtnClick(event) {
    timerBtn.disabled = true;
    timerInput.disabled = true;

    const dateNow = Date.now()
    
    const intervalId = setInterval(() => {
        const [days, hours, minutes, seconds ] = convertMs(userSelectedDate - dateNow);
        timerDays.textContent = days;
        timerHours.textContent = hours;
        timerMinutes.textContent = minutes;
        timerSeconds.textContent = seconds;
        userSelectedDate -= 1000;
        if (userSelectedDate <= dateNow) {
            clearInterval(intervalId);
            iziToast.success({
            message: 'The timer has finished its work',
            position: 'topCenter',
            });
            }
        }, 1000)
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    // console.log({ days, hours, minutes, seconds });
    return [days, hours, minutes, seconds ].map(el => (el < 10) ? '0' + el : el.toString());
}