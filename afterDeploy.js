const request = require('request');

const options = {
  method: 'DELETE',
  url: 'https://api.cloudflare.com/client/v4/zones/XXXXXXXXXXXXXXXXXXX/purge_cache',
  headers: {
    'content-type': 'application/json',
    authorization: 'Bearer XXXXXXXXXXXXXXXXXXXXXXXXXXX',
  },
  body: { purge_everything: true },
  json: true,
};

request(options, (error, response, body) => {
  if (error) throw new Error(error);

  console.log(body);
});
