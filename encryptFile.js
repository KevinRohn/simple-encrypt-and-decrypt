// load requirements
var fs = require('fs');
var crypto = require('crypto');

// start at item 2 - 0 = node and 1 = path
var consoleArgs = process.args.slice(2);

// Constants
const minimumKeyLen = 8;
const maximumKeyLen = 48;
const specialCharsRequirement = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";

var inputDataFile;
var outputDataFile;
var secretKey = '';

// original file
if (consoleArgs[0]) {
  inputDataFile = consoleArgs[0];
}
// output file
if (consoleArgs[1]) {
  outputDataFile = consoleArgs[1];
}

// key 
if (consoleArgs[2]) {
  secretKey = consoleArgs[2];
}

// Validate password
function validatePassword(key){
  key.toString();
  // minimum and maximum size
  if (key.min(minimumKeyLen).max(maximumKeyLen)) {
    // has number
    if (hasNumber(key)) {
      if (hasSpecialChar(key)) {

      } else {
        throw new Error('The secret key requires a special character from this character set:' + specialCharsRequirement);
      }

    } else {
      throw new Error('The secret key requires a number');
    }
  } else {
    if (key.length<minimumKeyLen) {
      throw new Error('The secret key is to short');
    } 
    if (key.length>maximumKeyLen) {
      throw new Error('The secret key is to long');
    }
  }
}
// check for number
function hasNumber(myString) {
  return /\d/.test(myString);
}

// check for lower case
function hasLowerCase(str) {
  return (/[a-z]/.test(str));
}

// check for upper case
function hasUpperCase(str) {
  return (/[a-z]/.test(str));
}

// check for special character
var hasSpecialChar = function(string){
 for(i = 0; i < specialCharsRequirement.length;i++){
   if(string.indexOf(specialCharsRequirement[i]) > -1){
       return true
    }
 }
 return false;
}


var key = 'secretKey123#';
var cipher = crypto.Cipher('aes-256-cbc', key);
var input = fs.createReadStream('test.json');
var output = fs.createWriteStream('test.json.enc');

input.pipe(cipher).pipe(output);



// output when encryption is finished
output.on('finish', function() {
  console.log('Encrypted file written to disk!');
});

