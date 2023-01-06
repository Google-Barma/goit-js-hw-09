import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  if (shouldResolve) {
    return new Promise(resolve => {
      setTimeout(() => resolve({ position, delay }), delay);
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject({ position, delay }), delay);
    });
  }
}

const onSubmit = e => {
  e.preventDefault();

  const delay = e?.target.delay?.value;
  const step = e?.target.step?.value;
  const amount = e?.target.amount?.value;
  let currentDelay = Number(delay);

  for (let i = 1; i <= amount; i++) {
    if (i !== 1) {
      currentDelay += Number(step);
    }

    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
          timeout: 4000,
        });
      })
      .catch(({ position, delay }) => {
        // console.log(err, 'error');
        Notify.warning(`Rejected promise ${position} in ${delay}ms`, {
          timeout: 4000,
        });
      });
  }
};

form.addEventListener('submit', onSubmit);
