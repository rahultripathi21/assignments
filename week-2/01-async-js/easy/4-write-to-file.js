// <!-- ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks. -->

const fs = require('fs');
function writeFileAsyncly(fileName){
  return new Promise((resolve, reject)=>{
    fs.writeFile(fileName, 'Heloo new devlopers', (err, data)=> resolve(data));
  })
}

writeFileAsyncly('test.txt').then((value)=>{console.log(value)});


for(let i = 0; i<1000000; i++){
  console.log(i);
}