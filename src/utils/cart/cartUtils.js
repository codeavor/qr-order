const turnNullToZero = (price) => {
  return price === null ? 0 : price;
};

/**
 * Gets the cart from API and transforms it into a form that can be used.
 * Cart from the API spreads the extras to different objects with same item name.
 * This function, trasforms those multiple objects into 1, putting all the extras
 * in an array on the same object. Check the tests for examples.
 * @param  {Array} cart  
 * @return {Array}
 */
export function fixCart(cart) {
  if (cart.length === 0) return cart;
  let tempItem = {
    ...cart[0],
    extras: [cart[0].extras],
    extra_price: [turnNullToZero(cart[0].extra_price)],
  };
  let newCart = [];

  for (let i = 1; i < cart.length; i++) {
    let item = cart[i];
    if (item.order_item_id === tempItem.order_item_id) { // same item, different extra
      // put the extra in the extras array of the item
      tempItem.extras.push(item.extras);
      tempItem.extra_price.push(turnNullToZero(item.extra_price));
    } else { // we have a new item, so create new object
      newCart.push(tempItem);
      tempItem = {
        ...item,
        extras: [item.extras],
        extra_price: [turnNullToZero(item.extra_price)],
      };
    }
  }
  newCart.push(tempItem);
  return newCart;
}

/**
 * Calculates the total price of an item.
 * @param  {String} price 
 * @param  {Array<String>} extra_price
 * @param  {Integer} quantity
 * @return {Float}         
 */
export function totalItemPrice(price, extra_price, quantity) {
  if (
    price === undefined ||
    extra_price === undefined ||
    quantity === undefined
  )
    return 0;
  let extraPrice = extra_price.reduce(
    (sum, price) => parseFloat(sum) + parseFloat(price)
  );
  return (parseFloat(price) + parseFloat(extraPrice)) * parseFloat(quantity);
}

/**
 * Calculates the total price of the cart.
 * @param  {Array} cart  
 * @return {Float}
 */
export function totalCartPrice(cart) {
  if (cart.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    sum += totalItemPrice(item.price, item.extra_price, item.quantity);
  }
  return sum;
}
