/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    console.log(9, numbers);
    let largestElement = numbers[0];
    // numbers.forEach(number => {
    //   if(number > largestElement) largestElement = number;
    // }); 
    // for(let i = 0; i<numbers.length; i++) {
    //   if(numbers[i] > largestElement) largestElement = numbers[i];
    // }

    for (const number of numbers) {
      if(number > largestElement) largestElement = number;
    }
    console.log(13, largestElement)
    return largestElement;
}

module.exports = findLargestElement;