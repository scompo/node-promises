const rp = require('request-promise-native');

const p1 = rp('http://scompo.altervista.org');
const p2 = rp('http://scompo.altervista.org');
const p3 = rp('http://scompo.altervista.org');

Promise.all([p1, p2, p3]).then((values) => {
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    console.log(value);
  }
}).catch((err) => {
  console.error(err);
});
