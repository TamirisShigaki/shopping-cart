const saveCartItems = () => {
  const getLi = document.querySelectorAll('.cart__items li');
  const getItemCart = [...getLi].map((item) => item.innerText);

 localStorage.setItem('cartItems', JSON.stringify(getItemCart));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
