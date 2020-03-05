# simple-encrypt-and-decrypt
Simple file encryption and decryption (Also works with large files)

## Usage:

encrypt file:
```
    node encryptFile.js path/to/input-file path/to/encrypted-output-file 'secretkey'
```

decrypt file:
```
    node decryptFile.js path/to/encrypted-input-file /path/to/decrypted-output-file 'secretkey'
```

### example
encrypt file:
```
    node encryptFile.js test.json test.json.enc 'This!sMySup3rSecret#P4ssword1234'
```

decrypt file:
```
    node decryptFile.js test.json.enc test-plain.json 'This!sMySup3rSecret#P4ssword1234'
```

## Info
The secret key has to match the following rules:
- 32 Characters long (256 bytes)
- Must contain at least a Special char from this character set: 
```
<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=
```
- Must contain at least a upper character
- Must contain at least a lower character
- Must contain at least a number

Encryption is done with AES256 and can be changed in the source code.

# ToDo
- [ ] Add Salt
- [ ] vector with random bytes
- [ ] Use secret with env variable instead with passing by argument (Risky - Clean your history after usage)
