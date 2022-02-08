const ol = document.querySelector('.cart__items');
let somaTotal = 0;

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

//! Requisito 5 - com ajuda do Erik Lima Turma 19-A
// cria tag soma

function getPrice() {
  const cart = document.querySelector('.cart');
  const criaP = document.createElement('p');
  const criaSpan = document.createElement('span');

  criaP.innerHTML = 'Sub-total: <strong>R$ </strong>';
  criaSpan.className = 'total-price';
  cart.appendChild(criaP);
  criaP.appendChild(criaSpan);
}

//! Requisito 5 - com ajuda do Erik Lima Turma 19-A
// soma valores
// Regex - /\$[0-9]*.[0-9]*/g - https://medium.com/xp-inc/regex-um-guia-pratico-para-express%C3%B5es-regulares-1ac5fa4dd39f
// .match -  https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/match
// .slice - https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

function sumPrices() {
  const totalPrice = document.querySelector('.total-price');
  let textOl = ol.innerText;
  let resultSum = 0;

  textOl = textOl.match(/\$[0-9]*.[0-9]*/g);

  if (textOl === 0 || textOl === null) {
    totalPrice.innerText = 0;
  } else {
    textOl.forEach((price) => {
      resultSum += +price.slice(1);
    });
    somaTotal = resultSum;

    totalPrice.innerText = +somaTotal.toFixed(2);
  }
}

//! Requisito 4 - salva no localStorage

function saveItemLocalStorage() {
  const cartItems = document.querySelector('.cart__items').innerHTML;
  saveCartItems(cartItems);
}

function cartItemClickListener(event) {
  event.target.remove(); 
  sumPrices();
  saveItemLocalStorage();
}

//! Requisito 4 - retorna o conteúdo salvo do localStorage

function getItemLocal() {
  const save = getSavedCartItems();

  if (save) {
    ol.innerHTML = save;
    document.querySelectorAll('.cart__item').forEach((li) => {
      li.addEventListener('click', cartItemClickListener);
    });
  }
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

//! Requisito 2  - function appendProduct, com ajuda do Kleverson Eller - Turma 19-C
// cria objeto conforme pede o requisito, para aparecer no carrinho

async function appendProduct() {
  const objeto = await fetchProducts('computador');
  objeto.results.forEach((elemento) => {
    const criaObj = {
      sku: elemento.id,
      name: elemento.title,
      image: elemento.thumbnail,
  };

  const section = document.querySelector('.items');
  section.appendChild(createProductItemElement(criaObj));
  });
}

//! Requisito 2 - function addButtonsEvent, com ajuda do Roberval Filho - monitoria
// coloca os itens no carrinho de compra 

function addButtonsEvent() {
  const items = document.querySelectorAll('.item');
    items.forEach((item) => {
      const sku = getSkuFromProductItem(item);
      const button = item.querySelector('button');
      button.addEventListener('click', async () => {
        const objeto = await fetchItem(sku);
        const criaObj = {
          sku: objeto.id,
          name: objeto.title,
          salePrice: objeto.price,
        };
        ol.appendChild(createCartItemElement(criaObj));
        saveItemLocalStorage();
        sumPrices();
      });
    }); 
}

//! Requisito 3 - remove todos os itens do carrinho

const buttonRemove = document.querySelector('.empty-cart');
function removeItems() {
  ol.innerHTML = '';
  saveItemLocalStorage();
  sumPrices();
}
buttonRemove.addEventListener('click', removeItems);

function criaLoading() {
  const criaSection = document.createElement('section');
  criaSection.textContent = 'Carregando...';
  criaSection.className = 'loading';
  document.querySelector('.items').appendChild(criaSection);
}

//! Requisito 7 - Adiciona um texto de "carregando" durante uma requisição à API

function encerraLoading() {
document.querySelector('.loading').remove();
}

window.onload = async () => {
  getPrice();
  criaLoading();
  await appendProduct();
  addButtonsEvent();
  getItemLocal();
  encerraLoading();
  sumPrices();
};

//! requisito 10 e 11, com ajuda da Paula Ribeiro - Turma 19-C
