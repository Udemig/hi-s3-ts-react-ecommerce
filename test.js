const mainTaxon = "/api/v2/shop/taxons/womens_t_shirts"

const parsedTaxon = mainTaxon.split('/')
console.log(parsedTaxon)

const reversedTaxon = parsedTaxon.reverse()
console.log(reversedTaxon)

console.log(reversedTaxon[0])
