var fs = require('fs');
var crypto = require('crypto');

var key = 'secretKey123#';
var cipher = crypto.Decipher('aes-256-cbc', key);
var input = fs.createReadStream('test.json.enc');
var output = fs.createWriteStream('testdecrypted.json');

input.pipe(cipher).pipe(output);

output.on('finish', function() {
  console.log('Encrypted file written to disk!');
});