'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const getPromiseResult = new Promise((resolve, reject) => {
    const delay = event.target.delay.value;
    setTimeout(() => {
      if (event.target.state.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  getPromiseResult
    .then(time => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${time}ms`,
        position: 'topRight',
      });
    })
    .catch(time => {
      iziToast.error({
        message: `❌ Rejected promise in ${time}ms`,
        position: 'topRight',
      });
    });
});
