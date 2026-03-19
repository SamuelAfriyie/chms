import CryptoJS from 'crypto-js';

export const SecretManager = {
  encrypt: (value: any): string | null => {
    try {
      const data = JSON.stringify(value);
      const encrypted = CryptoJS.AES.encrypt(data, import.meta.env.VITE_ENCRYPT_KEY as string).toString();
      return encrypted;
    } catch (error) {
      console.error("Encryption failed", error);
      return null;
    }
  },

  decrypt: (encrypted: string): any | null => {
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, import.meta.env.VITE_ENCRYPT_KEY as string);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error("Decryption failed", error);
      return null;
    }
  }
}