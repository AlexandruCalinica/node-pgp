const fs = require("fs");
const openpgp = require("openpgp");
const { prompt } = require("enquirer");

const decryptLarge = async () => {
  const { encryptedFilePath } = await prompt({
    type: "input",
    name: "encryptedFilePath",
    message: "path to large encrypted text message",
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
  const encryptedData = fs.createReadStream(encryptedFilePath);

  const privateKey = (await openpgp.key.readArmored([privateKeyArmored]))
    .keys[0];
  await privateKey.decrypt(passphrase);

  const decrypted = await openpgp.decrypt({
    message: await openpgp.message.readArmored(encryptedData),
    privateKeys: [privateKey],
  });

  let readStream = decrypted.data;
  let writeStream = fs.createWriteStream("decrypted-dataset.txt", {
    flags: "a",
  });
  readStream.pipe(writeStream);
  readStream.on("end", () => console.log("done!"));
};

module.exports = {
  decryptLarge,
};
