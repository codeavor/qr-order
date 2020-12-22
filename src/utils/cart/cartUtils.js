/**
 * Sorts the extras of an itam by id.
 * @param  {Array<Object>} cart
 * @return {Array<Object>}
 */
export function fixCart(cart) {
  let fixedCart = cart.sort((a, b) => a.id - b.id);
  return fixedCart;
}

/**
 * Calculates the total price of an item.
 * @param  {String} price
 * @param  {Array<Object>} extras
 * @param  {Integer} quantity
 * @return {Float}
 */
export function totalItemPrice(price, extras, quantity) {
  if (price === undefined || extras === undefined || quantity === undefined)
    return 0;
  let extraPrice = extras.reduce(
    (sum, { price }) => parseFloat(sum) + parseFloat(price),
    0
  );
  return (parseFloat(price) + parseFloat(extraPrice)) * parseFloat(quantity);
}

/**
 * Calculates the total price of the cart.
 * @param  {Array<Object>} cart
 * @return {Float}
 */
export function totalCartPrice(cart) {
  if (cart.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    sum += totalItemPrice(item.price, item.extras, item.quantity);
  }
  return sum;
}

/**
 * Combines extras with notes.
 * @param  {Array<Object>} extras
 * @param  {String} notes
 * @return {String}
 */
export function showExtras(extras, notes) {
  let tempExtras = extras.map((extra) => extra.name).join(", ");
  if (notes === "" || notes === null) {
    return tempExtras;
  }
  return tempExtras + ", " + notes;
}
