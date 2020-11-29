// extras = {Επιλέξτε μέγεθος: "0 7", ...}
export function fixExtras(extras) {
  if (extras === undefined) return [];
  let extrasArray = [];
  for (let extra in extras) {
    let extraAr;
    if (extras[extra] === false) {
      continue;
    } else if (extras[extra] === true) {
      extraAr = extra.toString().split(" ");
    } else {
      extraAr = extras[extra].split(" ");
    }
    extrasArray.push({
      extra_id: extraAr[1],
      extra_price: parseFloat(extraAr[0]) / 100,
    });
  }
  return extrasArray;
}

// extras = [{ extra_id: "7", extra_price: 0 },{ extra_id: "1", extra_price: 0 },]
export function getExtrasId(extras) {
  if (Array.isArray(extras) && extras.length === 0) return [];
  let extrasIdArray = extras.map((extra) => {
    return { extra_id: extra.extra_id };
  });
  return extrasIdArray;
}

// extras = [{ extra_id: "7", extra_price: 0 },{ extra_id: "1", extra_price: 0 },], itemPrice = 1, quantity = 1
export function getExtrasPrice(extras, itemPrice, quantity) {
  if (Array.isArray(extras) && extras.length === 0) return 0;
  let sum = parseFloat(itemPrice);
  for (let extra in extras) {
    sum += extras[extra].extra_price;
  }
  return sum * parseInt(quantity);
}

export function getInitializedExtras(extrasCat) {
  let extras = {};
  for (let extraCat in extrasCat) {
    if (extrasCat[extraCat].type !== "radioButton") continue;
    extras[extrasCat[extraCat].name] = combinedPriceId(
      extrasCat[extraCat].extras[0].price,
      extrasCat[extraCat].extras[0].id
    );
  }
  return extras;
}

export function fixItem(item) {
  let categories = item.extra_categories.sort((a, b) => a.id - b.id);

  return { ...item, extra_categories: categories };
}

export function combinedPriceId(price, id) {
  // Price = 0.4
  return price * 100 + " " + id;
}
