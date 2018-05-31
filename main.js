const rp = require('request-promise-native');

const p1 = rp('http://scompo.altervista.org');
const p2 = Promise.reject(new Error("fail"));
const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'with a delay');
});

const errorHandler = (err) => {
  console.error('small catch 1');
  console.error(err);
  return undefined;
}

const promises = [p1.catch(errorHandler), p2.catch(errorHandler), p3.catch(errorHandler)];

const getAllData = (promises) => {
  Promise.all(promises).then((values) => {
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      console.log(value);
    }
  }).catch((err) => {
    console.error('big catch');
    console.error(err);
  });
}
