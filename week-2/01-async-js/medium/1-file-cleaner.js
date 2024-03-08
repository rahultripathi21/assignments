// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require('fs');

fs.readFile('read.txt','utf-8', (err, data)=>{
  const newData = data.replace(/\s+/g,' ' );
  fs.writeFile('read.txt',newData,  (err, data)=>{});
})