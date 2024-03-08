/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  const stringCheck = str.replace(/[^\w]|_\s/g, '').toLowerCase();
  const reveresedStr = stringCheck.split('').reverse().join('');
  if(reveresedStr === stringCheck) return true;
  return false;
}

module.exports = isPalindrome;
