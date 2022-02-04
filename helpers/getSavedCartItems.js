const getSavedCartItems = () => {
  const getSaved = localStorage.getItem('cartItems');
  return getSaved;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
