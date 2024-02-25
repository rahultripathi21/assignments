/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  const result = {}
  transactions.forEach(trasaction => {
    category = trasaction?.category;
    price = trasaction?.price;
    result[category] = (result[category] || 0 )+price;
  });

  let ans = [];
  Object.entries(result).forEach(obj =>{
    // console.log(24, obj);
    ans.push({ category: obj[0], totalSpent: obj[1] })
  })

  return ans;
}

module.exports = calculateTotalSpentByCategory;
