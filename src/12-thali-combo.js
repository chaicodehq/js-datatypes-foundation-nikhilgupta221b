/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  if (typeof thali !== "object" || thali === null || typeof thali.name === "undefined" || typeof thali.items === "undefined" || typeof thali.price === "undefined" || typeof thali.isVeg === "undefined") {
    return "";
  }

  let name = thali.name.toUpperCase();

  let price_rounded = thali.price.toFixed(2);

  let veg_type;

  if (thali.isVeg) {
    veg_type = "Veg";
  }
  else {
    veg_type = "Non-Veg";
  }

  let items = thali.items.join(", ");

  return `${name} (${veg_type}) - Items: ${items} - Rs.${price_rounded}`
}

export function getThaliStats(thalis) {
  if (!Array.isArray(thalis) || thalis.length === 0) {
    return null;
  }
  const prices = thalis.map(thali => thali.price)

  const totalThalis = thalis.length;

  const vegCount = thalis.filter(thali => thali.isVeg === true).length;

  const nonVegCount = totalThalis - vegCount;

  const cheapest = Math.min(...prices);
  const costliest = Math.max(...prices);

  const totalCost = thalis.reduce((sum, thali) => sum + thali.price, 0);
  const avgPrice = (totalCost / totalThalis).toFixed(2);
  const names = thalis.map(thali => thali.name);

  return {
    totalThalis, vegCount, nonVegCount, avgPrice, cheapest, costliest, names
  };
}

export function searchThaliMenu(thalis, query) {
  if (!Array.isArray(thalis) || typeof query !== "string") {
    return [];
  }

  const lowerQuery = query.toLowerCase();

  return thalis.filter(thali => {
    const nameMatches = thali.name.toLowerCase().includes(lowerQuery);

    const itemMatches = thali.items.some(item => item.toLowerCase().includes(lowerQuery));

    return nameMatches || itemMatches;
  });
}

export function generateThaliReceipt(customerName, thalis) {
  if (typeof customerName !== "string" || !Array.isArray(thalis) || thalis.length === 0) {
    return "";
  }

  const upperCustomerName = customerName.toUpperCase();

  const total = thalis.reduce((total, thali) => total + thali.price, 0);
  const lineItems = thalis.map(thali => `- ${thali.name} x Rs.${thali.price}`);
  const lineItemsString = lineItems.join("\n")

  const count = thalis.length;

  return `THALI RECEIPT\n---\nCustomer: ${upperCustomerName}\n${lineItemsString}\n---\nTotal: Rs.${total}\nItems: ${count}`;
}
