const fetchProducts = async (product) => {
    const url = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
    const data = await url.json();

    return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
