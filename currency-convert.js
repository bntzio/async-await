const axios = require('axios');

const getExchangeRate = (from, to) => {
  return axios.get(`https://api.fixer.io/latest?base=${from}`).then((response) => {
    return response.data.rates[to];
  });
}

const getCountries = (currencyCode) => {
  return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
    return response.data.map((country) => country.name);
  });
};

const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to).then((tempCountries) => {
    countries = tempCountries;
    return getExchangeRate(from, to);
  }).then((rate) => {
    const exchangedAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
  });
};


// async/await version!!!
const convertCurrencyAlt = async (from, to, amount) => {
  const countries = await getCountries(to);
  const rate = await getExchangeRate(from, to);

  const exchangedAmount = amount * rate;

  return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
};

convertCurrencyAlt('CAD', 'EUR', 700).then((status) => {
  console.log(status);
}).catch((e) => {
  const { status, statusText } = e.response;
  console.log('Error:', status, statusText);
});

// convertCurrency('CAD', 'USD', 100).then((status) => {
//   console.log(status);
// });

// getExchangeRate('MXN', 'USD').then((rate) => {
//   console.log(rate);
// });

// getCountries('USD').then((countries) => {
//   console.log(countries);
// });
