const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let changeColorIntervalId = null;

refs.stopBtn.setAttribute('disabled', true);

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const onClickStart = () => {
  refs.startBtn.setAttribute('disabled', true);
  refs.stopBtn.removeAttribute('disabled');

  changeColorIntervalId = setInterval(() => {
    const bodyColor = getRandomHexColor();

    refs.body.style.backgroundColor = bodyColor;
  }, 1000);
};

const onClickStop = () => {
  clearInterval(changeColorIntervalId);

  refs.stopBtn.setAttribute('disabled', true);
  refs.startBtn.removeAttribute('disabled');
  refs.body.style.backgroundColor = '#fff';
};

refs.startBtn.addEventListener('click', onClickStart);
refs.stopBtn.addEventListener('click', onClickStop);
