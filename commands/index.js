const { encrypt } = require("./encrypt");
const { decrypt } = require("./decrypt");
const { generateKeys } = require("./generateKeys");
const { encryptLarge } = require("./encryptLarge");
const { decryptLarge } = require("./decryptLarge");

module.exports = {
  encrypt,
  decrypt,
  generateKeys,
  encryptLarge,
  decryptLarge,
};
