import C from "../../constants";

/**
 * Gets an extras(values) object from Formik and transforms it into a readable object.
 * Radio buttons are represented as: Radio Group Name: "price*100 id".
 * Checkboxes are represented as: "price*100 id": boolean
 * @param  {Object} extras  {Επιλέξτε μέγεθος: "0 7", "20 10": true, ...}
 * @return {Array}         [{extra_id: id(String), extra_price: price(Float)}]
 */
export function fixExtras(extras) {
  if (extras === undefined) return [];
  let extrasArray = [];
  for (let extra in extras) {
    //"Επιλέξτε μέγεθος", "20 10", etc
    let extraAr;
    if (typeof extras[extra] === "boolean") {
      // It's a checkbox
      // if its false, its not checked and so, we dont need it
      if (extras[extra] === false) continue;
      // It's checked, we split the name of the property
      extraAr = extra.toString().split(" ");
    } else {
      // It's a radio button group
      // we split the value
      extraAr = extras[extra].split(" ");
    }

    extrasArray.push({
      extra_id: extraAr[1],
      extra_price: parseFloat(extraAr[0]) / 100,
    });
  }
  return extrasArray;
}

/**
 * Returns only the ids of the selected extras.
 * @param  {Array} extras   [{ extra_id: "7", extra_price: 0 },{ extra_id: "1", extra_price: 0 },]
 * @return {Array}         [{ extra_id: "7" },{ extra_id: "1" },]
 */
export function getExtrasId(extras) {
  if (Array.isArray(extras) && extras.length === 0) return [];
  let extrasIdArray = extras.map((extra) => {
    return { extra_id: extra.extra_id };
  });
  return extrasIdArray;
}

/**
 * Returns only the ids of the selected extras.
 * @param  {Array} extras       [{ extra_id: "7", extra_price: 0 },{ extra_id: "1", extra_price: 0 },]
 * @param  {String} itemPrice   "1"
 * @param  {Integer} quantity   1
 * @return {Float}              1.2
 */
export function getExtrasPrice(extras, itemPrice, quantity) {
  if (Array.isArray(extras) && extras.length === 0)
    if (itemPrice !== undefined && quantity !== undefined)
      return parseFloat(itemPrice) * parseInt(quantity, 10);
    else return 0;
  let sum = parseFloat(itemPrice);
  for (let extra in extras) {
    sum += extras[extra].extra_price;
  }
  return sum * parseInt(quantity, 10);
}

/**
 * Returns the initialValues for Formik
 * @param  {Array} extrasCat    Check tests
 * @return {Object}             The initialValues for Formik
 */
export function getInitializedExtras(extrasCat) {
  let extras = {};
  for (let extraCat of extrasCat) {
    if (extraCat.type !== "radioButton") continue;

    // It is a radio group, pick the first one for Formik
    let firstExtra = extraCat.extras[0];
    extras[extraCat.name] = combinedPriceId(firstExtra.price, firstExtra.id);
  }
  return extras;
}

/**
 * Sorts the extras of an itam by id.
 * @param  {Object} item
 * @return {String}
 */
export function fixItem(item) {
  let categories = item.extra_categories.sort((a, b) => a.id - b.id);

  return { ...item, extra_categories: categories };
}

/**
 * Combines price with id into a string.
 * @param  {Float} price   0.30
 * @param  {Integer} id    2
 * @return {String}        "30 2"
 */
export function combinedPriceId(price, id) {
  return price * 100 + " " + id;
}

/**
 * Used to disable sugar category if Sketos is checked
 * @param  {Object} values        { "Επιλέξτε μέγεθος": "0 7", "Επιλέξτε ζάχαρη": "0 1" }
 * @param  {Function} setValue   Function that set the values of Formik
 * @return {Boolean}
 */
export function disableSugars(values, setValue) {
  let tempValues = { ...values };
  for (let i = 0; i < C.SUGAR_IDS.length; i++) {
    if (tempValues[C.SUGAR_IDS[i]] === true) {
      setValue(C.SUGAR_IDS[i], false);
    }
  }
  return true;
}

/**
 * Used to disable sugar category if Sketos is checked
 * @param  {String} categoryName    "Επιλέξτε είδος ζάχαρης"
 * @param  {Object} values          { "Επιλέξτε μέγεθος": "0 7", "Επιλέξτε ζάχαρη": "0 1" }
 * @return {Boolean}
 */
export function checkIfSketos(categoryName, values) {
  if (values === undefined || Object.keys(values).length === 0) return false;
  return (
    categoryName === C.EPILEKSTE_EIDOS_ZAXARHS &&
    values[C.EPILEKSTE_ZAXARH].split(" ")[1] === C.SKETOS_ID
  );
}
