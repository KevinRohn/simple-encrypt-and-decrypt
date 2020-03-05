var fs = require('fs');
var crypto = require('crypto');

// start at item 2 - 0 = node and 1 = path
var consoleArgs = process.argv.slice(2);

// arguments
var encryptedInputFile;
var decryptedOutputFile;
var secretKey = '';

// encrypted input file
if (consoleArgs[0]) {
  encryptedInputFile = consoleArgs[0];
}
// decrypted output file
if (consoleArgs[1]) {
  decryptedOutputFile = consoleArgs[1];
}
// key 
if (consoleArgs[2]) {
  secretKey = consoleArgs[2];
}

function decrypt(key) {
  let cipher = crypto.Decipher('aes-256-cbc', key);
  var inputReadFile = fs.createReadStream(encryptedInputFile);
  var outputWriteFile = fs.createWriteStream(decryptedOutputFile);
  
  inputReadFile.pipe(cipher).pipe(outputWriteFile)

  outputWriteFile.on('finish', function () {
    console.log('Decrypted file written to disk!');
    return true;
  });  
}

decrypt(secretKey);