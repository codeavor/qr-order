const turnNullToZero = (price) => {
  return price === null ? 0 : price;
};

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
    if (item.order_item_id === tempItem.order_item_id) {
      tempItem.extras.push(item.extras);
      tempItem.extra_price.push(turnNullToZero(item.extra_price));
    } else {
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

export function totalItemPrice(price, extra_price, quantity) {
  if (
    price === undefined ||
    extra_price === undefined ||
    quantity === undefined
  )
    return 0;
  let extraPrice = extra_price.reduce((sum, price) => sum + parseFloat(price));
  return (parseFloat(price) + parseFloat(extraPrice)) * parseFloat(quantity);
}

export function totalCartPrice(cart) {
  if (cart.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    sum += totalItemPrice(item.price, item.extra_price, item.quantity);
  }
  return sum;
}
