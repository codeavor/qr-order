export function fixExtras(extras) {
  if (extras === undefined) return [];
  let extrasArray = [];
  for (let extra in extras) {
    let extraAr;
    if (extras[extra] === true) {
      extraAr = extra.toString().split(" ");
    } else if (extras[extra] === false) {
      continue;
    } else {
      extraAr = extras[extra].split(" ");
    }
    extrasArray.push({ extra_id: extraAr[1], extra_price: extraAr[0] });
  }
  return extrasArray;
}

export function getExtrasId(extras) {
  if (extras === []) return [];
  let extrasIdArray = extras.map((extra) => {
    return { extra_id: extra.extra_id };
  });
  return extrasIdArray;
}

export function getExtrasPrice(extras, itemPrice, quantity) {
  if (extras === []) return 0;
  let sum = parseFloat(itemPrice);
  for (let extra in extras) {
    sum += parseFloat(extras[extra].extra_price) / 100;
  }
  return sum * parseInt(quantity);
}

export function getInitializedExtras(extrasCat) {
  let extras = {};
  for (let extraCat in extrasCat) {
    if (extrasCat[extraCat].type !== "radioButton") continue;
    extras[extrasCat[extraCat].name] =
      extrasCat[extraCat].extras[0].price * 100 +
      " " +
      extrasCat[extraCat].extras[0].id;
  }
  return extras;
}

export function fixItem(item) {
  let categories = item.extra_categories.sort((a, b) => a.id - b.id);

  return { ...item, extra_categories: categories };
}
