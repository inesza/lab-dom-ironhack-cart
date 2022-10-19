// Calculate subtotal for every product (price * quantity)
function updateSubtotal(product) {
  let price = product.querySelector('.price span').innerHTML;
  let quantity = product.querySelector('.quantity input').value;
  return (product.querySelector('.subtotal span').innerHTML = price * quantity);
}

// Calculate total (total += every subtotal)
function calculateAll() {
  const products = document.querySelectorAll('.product');
  let total = 0;
  products.forEach((product) => {
    updateSubtotal(product);
    total += Number(product.querySelector('.subtotal span').innerHTML);
  });
  return (document.querySelector('#total-value span').innerHTML = total);
}

// Remove a product by clicking on "Remove button"
function removeProduct(event) {
  const target = event.currentTarget;
  let productToRemove = target.closest('.product')
  productToRemove.parentNode.removeChild(productToRemove)
  calculateAll()
}

// Add a new product
function createProduct() {
  let productName = document.querySelector('.create-product input[type="text"]')
  let productPrice = document.querySelector('.create-product input[type="number"]')
  let newProduct = document.querySelector('template').content.cloneNode(true)
  newProduct.querySelector('.name span').innerHTML = productName.value
  newProduct.querySelector('.price span').innerHTML = productPrice.value
  newProduct.querySelector('.quantity input').value = 0
  newProduct.querySelector('.btn-remove').addEventListener('click', removeProduct)
  document.querySelector("#cart tbody").append(newProduct)
  productName.value = null
  productPrice.value = 0
}

// Event listeners to calculate, remove and add
window.addEventListener('load', () => {
  // Trigger calculate event
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  // Trigger remove event
  const removeButtons = document.getElementsByClassName('btn-remove');
  const removeButtonsArray = [...removeButtons]
  removeButtonsArray.forEach((removeBtn) => {
    removeBtn.addEventListener("click", removeProduct);
  });

  // Trigger create event
  const addProduct = document.querySelector('#create')
  addProduct.addEventListener('click', createProduct)
});
