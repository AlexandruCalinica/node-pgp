const fs = require("fs");
const openpgp = require("openpgp");
const { prompt } = require("enquirer");

const encryptLarge = async () => {
  const { largeFile } = await prompt({
    type: "input",
    name: "largeFile",
    message: "path to large file",
  });

  const { publicKeyPath } = await prompt({
    type: "input",
    name: "publicKeyPath",
    message: "path to recipient public key",
  });

  const fileData = fs.createReadStream(largeFile);
  const publicKeyArmored = fs.readFileSync(publicKeyPath);

  const encrypted = await openpgp.encrypt({
    message: openpgp.message.fromBinary(fileData),
    publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys,
  });

  let readStream = encrypted.data;
  let writeStream = fs.createWriteStream("encrypted-dataset.txt", {
    flags: "a",
  });
  readStream.pipe(writeStream);
  readStream.on("end", () => console.log("done!"));
};

module.exports = {
  encryptLarge,
};
