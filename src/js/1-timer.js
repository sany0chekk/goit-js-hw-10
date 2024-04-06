import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimeInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');

let userSelectedDate;
let timerInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      iziToast.warning({
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimeInput, options);

startButton.addEventListener('click', event => {
  const days = document.querySelector('[data-days]'),
    hours = document.querySelector('[data-hours]'),
    minutes = document.querySelector('[data-minutes]'),
    seconds = document.querySelector('[data-seconds]');

  startButton.disabled = true;
  datetimeInput.disabled = true;

  timerInterval = setInterval(() => {
    const currentDate = Date.now();
    const distance = userSelectedDate - currentDate;
    const timerData = convertMs(distance);

    if (distance < 0) {
      clearInterval(timerInterval);
      datetimeInput.disabled = false;
      return;
    }

    days.textContent = addLeadingZero(timerData.days);
    hours.textContent = addLeadingZero(timerData.hours);
    minutes.textContent = addLeadingZero(timerData.minutes);
    seconds.textContent = addLeadingZero(timerData.seconds);
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
