const fs = require("fs");
const openpgp = require("openpgp");
const { prompt } = require("enquirer");

const encrypt = async () => {
  const { plainFile } = await prompt({
    type: "input",
    name: "plainFile",
    message: "path to plain text file",
  });

  const { publicKeyPath } = await prompt({
    type: "input",
    name: "publicKeyPath",
    message: "path to recipient public key",
  });

  const publicKeyArmored = fs.readFileSync(publicKeyPath);

  const plainData = fs.readFileSync(`${plainFile}`);
  const encrypted = await openpgp.encrypt({
    message: openpgp.message.fromText(plainData),
    publicKeys: (await openpgp.key.readArmored(`${publicKeyArmored}`)).keys,
  });

  fs.writeFileSync("encrypted.txt", encrypted.data);
};

module.exports = {
  encrypt,
};
