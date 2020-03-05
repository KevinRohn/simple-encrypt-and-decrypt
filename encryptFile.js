// load requirements
var fs = require('fs');
var crypto = require('crypto');

// start at item 2 - 0 = node and 1 = path
var consoleArgs = process.argv.slice(2);

// Constants
const KEY_LENGTH = 32; // 256 bytes 32 chars
const SPECIAL_CHARS_REQ = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";

// arguments
var inputDataFile;
var outputDataFile;
var secretKey = '';

// original file
if (consoleArgs[0]) {
  inputDataFile = consoleArgs[0];
}
// encrypted output file
if (consoleArgs[1]) {
  outputDataFile = consoleArgs[1];
}

// key 
if (consoleArgs[2]) {
  secretKey = consoleArgs[2];
}

// Error text
const errorLowerCaseMissing = 'The secret key requires a lower case character.';
const errorUpperCaseMissing = 'The secret key requires a upper case character.';
const errorSpecialCharacterMissing = 'The secret key requires a special character from the character set: ' + SPECIAL_CHARS_REQ;
const errorNumberMissing = 'The secret key requires a number.';
const errorKeyLength = 'The key length has to be 256 bit (32 characters).';
const errorWhitespace = 'No whitespace allowed.';

// Validate password
function validateKey(key) {
  // has number
  if (hasNumber(key)) {
    // check for special character
    if (hasSpecialChar(key)) {
      // check for lower case
      if (hasLowerCase(key)) {
        // check for upper case
        if (hasUpperCase(key)) {
          // check length
          if (key.length == KEY_LENGTH) {
            if (!hasWhiteSpace(key)) {
              return true;
            } else {
              throw new Error(errorWhitespace);
            }
          } else {
            throw new Error(errorKeyLength + ' input key length: ' + key.length.toString());

          }
        } else {
          throw new Error(errorUpperCaseMissing);
        }
      } else {
        throw new Error(errorLowerCaseMissing);
      }
    } else {
      throw new Error(errorSpecialCharacterMissing);
    }
  } else {
    throw new Error(errorNumberMissing);
  }
  return false;
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
  return (/[A-Z]/.test(str));
}
// check for white space
function hasWhiteSpace(str) {
  return /\s/g.test(str);
}
// check for special character
var hasSpecialChar = function (string) {
  for (i = 0; i < SPECIAL_CHARS_REQ.length; i++) {
    if (string.indexOf(SPECIAL_CHARS_REQ[i]) > -1) {
      return true
    }
  }
  return false;
}

// check if key is valid
if (validateKey(secretKey)) {
  encrypt(secretKey, inputDataFile, outputDataFile);
}

// encryption
function encrypt(key, inputFile, outputFile) {
  let cipher = crypto.Cipher('aes-256-cbc', Buffer.from(key));
  var inputReadFile = fs.createReadStream(inputFile);
  var outputWriteFile = fs.createWriteStream(outputFile);

  inputReadFile.pipe(cipher).pipe(outputWriteFile)

  outputWriteFile.on('finish', function () {
    console.log('Encrypted file written to disk!');
    return true;
  });
}

