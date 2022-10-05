const xero_client = require('xero-node');
//const { xero_client_id, xero_client_secret, xero_tenant_id, xero_access_token } = require('./env-config');

const axios = require('axios')

console.log("rrr1")

//console.log(XeroClient)
//exports.main = async () => {
console.log("rrr2")

const xero = new xero_client.XeroClient({
  clientId: xero_client_id,
  clientSecret: xero_client_secret,
  redirectUris: [`http://localhost/`],
  scopes: 'openid profile email accounting.transactions offline_access'.split(" "),
  state: 'returnPage=my-sweet-dashboard', // custom params (optional)
  // httpTimeout: 3000 // ms (optional)
});
let rdurl = 'http://localhost/'

//sendResponse({
       statusCode: 301,
       headers: {
           "Location": "https://www.example.com"
       }
});

let enc = encodeURIComponent(`Reference="9759941261"`)
console.log(enc)

const get_invs = async((url) => {

  const res = axios({
    method: 'post',
    url: url,
    headers: { Authorization: "<Generated Bearer Token>" },
  })
  console.log(res)

})

get_invs(`https://api.xero.com/api.xro/2.0/Invoices/?where=${enc}`)
  .then(result => console.log(result))





