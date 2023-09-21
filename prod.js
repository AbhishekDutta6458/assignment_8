const productList = document.getElementById('productList');
const form = document.getElementById('searchForm');
const searchContent = document.getElementById('searchContent');
const alertMessage = document.getElementById('alertMessage');

async function makeRequest(url) {
  const res = await fetch(url);
  if (res.ok) {
    const data = await res.json();
    return data.products;
  } else {
    throw new Error('Failed to fetch data.');
  }
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('card', 'mt-2');
  card.style.width = '18rem';

  const image = document.createElement('img');
  image.classList.add('card-img-top');
  image.src = product.thumbnail;
  image.alt = 'Card image cap';

  const body = document.createElement('div');
  body.classList.add('card-body');

  const text = document.createElement('p');
  text.classList.add('card-text');
  text.textContent = product.title;

  body.appendChild(text);
  card.appendChild(image);
  card.appendChild(body);

  return card;
}

async function displayProducts(url, container) {
  try {
    const products = await makeRequest(url);
    container.innerHTML = '';
    if (products.length === 0) {
      alertMessage.removeAttribute('hidden');
      alertMessage.textContent = 'No matching results';
    } else {
      alertMessage.setAttribute('hidden', true);
      products.forEach((product) => {
        const card = createProductCard(product);
        container.appendChild(card);
      });
    }
  } catch (error) {
    console.error(error);
    // Display an error message to the user
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchText = e.target.searchText.value;
  const url = searchText ? `https://dummyjson.com/products/search?q=${searchText}` : 'https://dummyjson.com/products';
  displayProducts(url, searchContent);
});

window.onload = (event) => {
  displayProducts('https://dummyjson.com/products', productList);
};
