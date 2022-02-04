const saveCartItems = (list) => {
  const saved = localStorage.setItem('cartItems', list);
  return saved;
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
