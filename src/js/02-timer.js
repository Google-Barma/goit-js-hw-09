import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

class Timer {
  constructor({ updateDate }) {
    this.isActive = true;
    this.selectedDate = 0;
    this.timerId = null;
    this.updateMarkup = updateDate;
  }

  setSelectedDate(date) {
    this.selectedDate = date;
    this.isActive = false;
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.timerId = setInterval(() => {
      const currentDate = Date.now();
      const dateDelta = this.selectedDate - currentDate;
      const time = this.convertMs(dateDelta);
      this.isActive = true;

      if (dateDelta <= 0) {
        this.updateMarkup(this.convertMs(0));
        clearInterval(this.timerId);
        Notify.success('Time is finished!!!');

        return;
      }

      this.updateMarkup(time);
    }, 1000);
  }

  convertMs(ms) {
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
  }
}

const updateClock = date => {
  days.textContent = date.days;
  hours.textContent = date.hours;
  minutes.textContent = date.minutes;
  seconds.textContent = date.seconds;
};

const timer = new Timer({ updateDate: updateClock });
const pickerOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();
    const selectedDate = selectedDates[0];

    if (selectedDate - currentDate <= 0) {
      Notify.warning('Please choose a date in the future');
      return;
    }

    timer.setSelectedDate(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', pickerOptions);
startBtn.addEventListener('click', timer.start.bind(timer));
