const fs = require("fs");
const openpgp = require("openpgp");
const { prompt } = require("enquirer");

openpgp.config.allow_unauthenticated_stream = true;

const decrypt = async () => {
  const { encryptedFilePath } = await prompt({
    type: "input",
    name: "encryptedFilePath",
    message: "path to encrypted file",
  });

  const { privateKeyPath } = await prompt({
    type: "input",
    name: "privateKeyPath",
    message: "path to private key",
  });

  const { passphrase } = await prompt({
    type: "input",
    name: "passphrase",
    message: "passphrase",
  });

  const privateKeyArmored = fs.readFileSync(privateKeyPath);

  const privateKey = (await openpgp.key.readArmored([privateKeyArmored]))
    .keys[0];
  await privateKey.decrypt(passphrase);

  const encryptedData = fs.readFileSync(encryptedFilePath);
  const decrypted = await openpgp.decrypt({
    message: await openpgp.message.readArmored(encryptedData),
    privateKeys: [privateKey],
  });

  console.log(decrypted.data);
};

module.exports = {
  decrypt,
};
