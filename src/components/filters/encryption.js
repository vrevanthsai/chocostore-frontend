// encryption
import CryptoJS from "crypto-js";
// encrypting token for secure storage in cookies
export const encryptToken = (token) => {
  try {
    return CryptoJS.AES.encrypt(
      token,
      process.env.REACT_APP_SECRET_KEY
    ).toString();
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

export const decryptToken = (encryptedToken) => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      encryptedToken,
      process.env.REACT_APP_SECRET_KEY
    );
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    // console.log("Decrypted Data:", decryptedData);
    return decryptedData;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};
