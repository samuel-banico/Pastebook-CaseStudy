import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor() { }

  encrypt(data: any): string { 
    let value = JSON.stringify(data); 
    let key = CryptoJS.lib.WordArray.random(32); // 256-bit key 
    let iv = CryptoJS.lib.WordArray.random(16); // 128-bit IV // Encrypt the data using AES-CBC-Pkcs7 
    let encryptedData = CryptoJS.AES.encrypt(value, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(); // Return the key, IV and ciphertext as a JSON string 
    return JSON.stringify({ key: key.toString(), iv: iv.toString(), data: encryptedData }); 
  }

  decrypt(data: string): any { 
    let parsedData = JSON.parse(data); 
    let key = CryptoJS.enc.Hex.parse(parsedData.key); 
    let iv = CryptoJS.enc.Hex.parse(parsedData.iv); 
    let encryptedData = parsedData.data; 
    try { 
      let bytes = CryptoJS.AES.decrypt(encryptedData, key, { 
        iv: iv, 
        mode: CryptoJS.mode.CBC, 
        padding: CryptoJS.pad.Pkcs7 
      }); 
      let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData); 
    } catch (error) { 
      console.error(error); return null; 
    } 
  }
}

