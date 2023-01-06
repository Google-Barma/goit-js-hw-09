import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

let selectedDate = null;

let timeLeft = { days: 00, hours: 00, minutes: 00, seconds: 00 };
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();
    const selectedDateInMs = Date.parse(selectedDates[0]);

    if (selectedDateInMs < currentDate) {
      Notify.warning(
        `Please choose a date in the future. Selected date: ${selectedDates[0]}`
      );
      startBtn.setAttribute('disabled', true);
      return;
    }

    if (startBtn.hasAttribute('disabled')) {
      startBtn.removeAttribute('disabled');
    }

    selectedDate = selectedDateInMs;
  },
};

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day)
    .toString()
    .padStart(2, '0');

  const hours = Math.floor((ms % day) / hour)
    .toString()
    .padStart(2, '0');

  const minutes = Math.floor(((ms % day) % hour) / minute)
    .toString()
    .padStart(2, '0');

  const seconds = Math.floor((((ms % day) % hour) % minute) / second)
    .toString()
    .padStart(2, '0');

  return { days, hours, minutes, seconds };
};

const calculate = selectedDate => {
  if (selectedDate <= Date.now() + 900) {
    clearInterval(timerId);
    timeLeft = convertMs(0);
  }
  return selectedDate - Date.now();
};

const onClickBtn = () => {
  if (selectedDate <= Date.now()) {
    Notify.warning(`Please choose a date`);
    return;
  }

  timerId = setInterval(() => {
    timeLeft = convertMs(calculate(selectedDate));

    days.textContent = timeLeft.days;
    hours.textContent = timeLeft.hours;
    minutes.textContent = timeLeft.minutes;
    seconds.textContent = timeLeft.seconds;
  }, 1000);
};

flatpickr('#datetime-picker', options);
startBtn.addEventListener('click', onClickBtn);
