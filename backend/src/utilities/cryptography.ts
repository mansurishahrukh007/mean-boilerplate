import * as crypto from 'crypto';
import { jwtSecret } from '../config/common';
const aesjs = require('aes-js');

export function encrypt(data: string) {
  try {
    const cipher = crypto.createCipher('aes256', jwtSecret);
    let crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  } catch (Exception) {
    return '';
  }
}

// decrypt encrypted data
export function decrypt(data: string) {
  try {
    const decipher = crypto.createDecipher('aes256', jwtSecret);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  } catch (Exception) {
    return '';
  }
}

// normal text to encrypted string
export function encryptPassword(salt: string, password: string) {
  return crypto.createHmac('sha1', salt).update(password).digest('hex');
}

// verify normal string is valid compare to encrypted string
export function checkPassword(password: string, salt: string, hashedPassword: string) {
  return encryptPassword(salt, password) === hashedPassword;
}

export function generateSaltString() {
  return crypto.randomBytes(32).toString('hex'); /** convert to hexadecimal format */
  // .slice(0, 16);   /** return required number of characters */
}

export function AESEncryption(key_string: string, iv_string: string, data: string) {
  // var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  // var key = new Buffer('QWERTYUIOPASDFGH', 'binary');
  const key = aesjs.utils.utf8.toBytes(key_string);

  const iv = aesjs.utils.utf8.toBytes(iv_string);
  // Convert text to bytes
  // const text = 'ABCDEFGHIJKL';
  const textBytes = aesjs.utils.utf8.toBytes(data);

  // The counter is optional, and if omitted will begin at 1
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, iv);
  const encryptedBytes = aesCtr.encrypt(textBytes);

  // To print or store the binary data, you may convert it to hex
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
}
export function AESDecryption(key_string: string, iv_string: string, data: string) {
  const key = aesjs.utils.utf8.toBytes(key_string);

  const iv = aesjs.utils.utf8.toBytes(iv_string);

  // When ready to decrypt the hex string, convert it back to bytes
  const encryptedBytes = aesjs.utils.hex.toBytes(data);

  // The counter mode of operation maintains internal state, so to
  // decrypt a new instance must be instantiated.
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, iv);
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);

  // Convert our bytes back into text
  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  return decryptedText;
}
