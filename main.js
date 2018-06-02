const fetch = require('node-fetch');

const p1 = fetch('http://scompo.altervista.org');
const p2 = Promise.reject(new Error("I wanted this to fail!!"));
const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'with a delay');
});

const errorHandler = (err) => {
  console.error('presumed a network error');
  console.error(err);
  return undefined;
};

const handleStuff = (values) => {
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    if (value) {
      console.log("returned something: " + i);
    } else {
      console.log("returned nothing: " + i);
    }
  }
};

const getAllData = (promises, callback) => {
  Promise.all(promises).then(callback).catch((err) => {
    console.error('big catch');
    console.error(err);
  });
}

const make3Calls = async () => {
  getAllData([p1.catch(errorHandler), p2.catch(errorHandler), p3.catch(errorHandler)], handleStuff);
};

make3Calls();
