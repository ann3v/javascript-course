export let cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
}, {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
}];

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}


const myTimeout = {};

export function addToCart(productId, button){

    if(myTimeout[productId]){
        clearTimeout(myTimeout[productId]);
      }

       document.querySelector(`.js-added-${productId}`).classList.add('opacity-1');

      myTimeout[productId] = setTimeout(() => {
          document.querySelector(`.js-added-${productId}`).classList.remove('opacity-1');
          delete myTimeout[productId];
        }, 2000
      );

      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      const quantity = Number(quantitySelector.value);

      let matchingItem;

      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        cart.push({
          productId,
          quantity,
        });
      };
      saveToStorage();
};

export function removeFromCart(productId){
 const newCart = [];

 cart.forEach((cartItem) =>{
    if (cartItem.productId !== productId){
        newCart.push(cartItem);
    }
 })

 cart = newCart;
 saveToStorage();
}

export function calculateCartQuantity(){
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    
    return cartQuantity;
};

export function updateQuantity(productId, newQuantity){
    let matchingItem;

    cart.forEach((cartItem) => {
      if (cartItem.productId === productId){
        matchingItem = cartItem;
      };
    });

      matchingItem.quantity = newQuantity;
      saveToStorage();
}