const request = require('request');

const options = {
  method: 'DELETE',
  url: 'https://api.cloudflare.com/client/v4/zones/f23fd60c8e10242d98d7b083e88ff25d/purge_cache',
  headers: {
    'content-type': 'application/json',
    authorization: 'Bearer crPBYFn4QpBYc6EyYUtsnx5Gm8U5joFzoV1US19d',
  },
  body: { purge_everything: true },
  json: true,
};

request(options, (error, response, body) => {
  if (error) throw new Error(error);

  console.log(body);
});
