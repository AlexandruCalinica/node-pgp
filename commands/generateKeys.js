const fs = require("fs");
const openpgp = require("openpgp");
const { prompt } = require("enquirer");

const generateKeys = async () => {
  console.log(`
    This wizard will walk you through
    generating a public and a private
    PGP encryption keys.

    In order to succesfully complete all steps
    you need to provide a name(username, random string, etc..),
    an email address and a secure passphrase which 
    will be used in conjuction with the private key
    for decryption.
  `);
  const { name } = await prompt({
    type: "input",
    name: "name",
    message: "Name used for signature",
  });

  console.log(`
    Email address is used for creating an ecnryption signature.
  `);
  const { email } = await prompt({
    type: "input",
    name: "email",
    message: "Email address used for signature",
  });

  console.log(`
    Please make sure to note this passphrase down and
    to keep it secure. If you loose this passphrase 
    you will not be able to decrypt messages/files encrypted
    with your public key.
  `);
  const passphrase = await prompt({
    type: "input",
    name: "passphrase",
    message: "Passphrase used for signature",
  });

  const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
    userIds: [{ ...name, ...email }],
    curve: "ed25519",
    ...passphrase,
  });
  console.log(privateKeyArmored);
  fs.writeFileSync("privateKey.txt", privateKeyArmored);
  console.log(publicKeyArmored);
  fs.writeFileSync("publicKey.txt", publicKeyArmored);
};

module.exports = {
  generateKeys,
};
