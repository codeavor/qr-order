const {
  fixExtras,
  getExtrasId,
  getExtrasPrice,
  getInitializedExtras,
  fixItem,
  combinedPriceId,
  disableSugars,
  checkIfSketos,
} = require("../extraUtils");

const mockSetValue = jest.fn();

describe("extraUtils", () => {
  const values = {
    "Επιλέξτε μέγεθος": "0 7",
    "Επιλέξτε ζάχαρη": "0 1",
    "20 8": false,
    "0 9": true,
  };
  const values2 = {
    "Επιλέξτε μέγεθος": "0 7",
    "Επιλέξτε ζάχαρη": "0 1",
  };
  const sugarValues = {
    "Επιλέξτε ζάχαρη": "0 1",
    "0 4": true,
    "0 5": false,
  };
  const fixedValues = [
    { extra_id: "7", extra_price: 0 },
    { extra_id: "1", extra_price: 0 },
    { extra_id: "9", extra_price: 0 },
  ];
  const extrasId = [{ extra_id: "7" }, { extra_id: "1" }, { extra_id: "9" }];
  const item = {
    id: 1,
    name: "Esspresso",
    price: "1",
    category_id: 1,
    extra_categories: [
      {
        id: 6,
        name: "Επιλέξτε μέγεθος",
        type: "radioButton",
        extras: [
          {
            id: 7,
            name: "Μονός",
            price: null,
          },
          {
            id: 8,
            name: "Διπλός",
            price: "0.4",
          },
        ],
      },
      {
        id: 9,
        name: "Προσθέστε",
        type: "checkBox",
        extras: [
          {
            id: 9,
            name: "Γάλα",
            price: null,
          },
        ],
      },
      {
        id: 7,
        name: "Επιλέξτε ζάχαρη",
        type: "radioButton",
        extras: [
          {
            id: 1,
            name: "Σκέτος",
            price: null,
          },
          {
            id: 2,
            name: "Μέτριος",
            price: null,
          },
        ],
      },
    ],
  };
  const categoryEidosZaxarhs = "Επιλέξτε είδος ζάχαρης";
  const fixedItem = {
    id: 1,
    name: "Esspresso",
    price: "1",
    category_id: 1,
    extra_categories: [
      {
        id: 6,
        name: "Επιλέξτε μέγεθος",
        type: "radioButton",
        extras: [
          {
            id: 7,
            name: "Μονός",
            price: null,
          },
          {
            id: 8,
            name: "Διπλός",
            price: "0.4",
          },
        ],
      },
      {
        id: 7,
        name: "Επιλέξτε ζάχαρη",
        type: "radioButton",
        extras: [
          {
            id: 1,
            name: "Σκέτος",
            price: null,
          },
          {
            id: 2,
            name: "Μέτριος",
            price: null,
          },
        ],
      },
      {
        id: 9,
        name: "Προσθέστε",
        type: "checkBox",
        extras: [
          {
            id: 9,
            name: "Γάλα",
            price: null,
          },
        ],
      },
    ],
  };

  it("fixExtras works correctly", () => {
    expect(fixExtras(values)).toEqual(fixedValues);
    expect(fixExtras(undefined)).toEqual([]);
  });

  it("getExtrasId works correctly", () => {
    expect(getExtrasId(values)).toEqual(extrasId);
    expect(getExtrasId([])).toEqual([]);
  });

  it("getExtrasPrice works correctly", () => {
    expect(getExtrasPrice(values, 1, 1)).toEqual(1);
    expect(getExtrasPrice([], 1, 1)).toEqual(1);
    expect(getExtrasPrice([], undefined, undefined)).toEqual(0);
  });

  it("getInitializedExtras works correctly", () => {
    expect(getInitializedExtras(item.extra_categories)).toEqual(values2);
  });

  it("fixItem works correctly", () => {
    expect(fixItem(item)).toEqual(fixedItem);
  });

  it("combinedPriceId works correctly", () => {
    expect(combinedPriceId(0.1, 1)).toEqual("10 1");
    expect(combinedPriceId(null, 1)).toEqual("0 1");
  });

  it("disableSugars works correctly", () => {
    expect(disableSugars(values2, mockSetValue)).toEqual(true);
    expect(disableSugars(sugarValues, mockSetValue)).toEqual(true);
  });

  it("disableSugars works correctly", () => {
    expect(checkIfSketos(item.extra_categories[0].name, undefined)).toEqual(
      false
    );
    expect(checkIfSketos(item.extra_categories[0].name, {})).toEqual(false);
    expect(checkIfSketos(item.extra_categories[0].name, values2)).toEqual(
      false
    );
    expect(checkIfSketos(categoryEidosZaxarhs, values2)).toEqual(true);
  });
});
