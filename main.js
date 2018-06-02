const fetch = require('node-fetch');

const p2 = Promise.reject(new Error("I wanted this to fail!!"));
const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'with a delay');
});

const errorHandler = async (err) => {
  console.error('presumed a network error');
  console.error(err);
  return undefined;
};

const getStuffWithStatus = async () => {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .catch(errorHandler)
    .then((response) => response.json())
    .catch(errorHandler)
    .then((users) => {
      let superUsers = users.map(async (user) => {
        const stat = await p2.catch((err) => 'an error');
        user.stat = stat;
        return user;
      });
      return Promise.all(superUsers);
    });
};

const stuff = getStuffWithStatus().then((stuff) => {
  console.log(stuff);
}).catch(errorHandler);
