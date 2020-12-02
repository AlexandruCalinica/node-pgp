const figlet = require("figlet");
const { Command } = require("commander");

const {
  encrypt,
  decrypt,
  generateKeys,
  encryptLarge,
  decryptLarge,
} = require("./commands");

const program = new Command();

const asciiBanner = figlet.textSync("node-pgp-cli", {
  font: "jazmine",
  horizontalLayout: "default",
  verticalLayout: "default",
  width: 80,
  whitespaceBreak: true,
});

console.log(asciiBanner);

program.version("1.0.0");

program.on("--help", () => {
  console.log("");
  console.log(`Alexandru Calinica | ${new Date().getFullYear()}`);
});

program
  .command("generate")
  .description("Generate public and private keys.")
  .action(generateKeys);

program
  .command("encrypt")
  .description("Encrypt text message with recipient public key.")
  .action(encrypt);

program
  .command("decrypt")
  .description("Decrypt text message with private key.")
  .action(decrypt);

program
  .command("encrypt-large")
  .description("Encrypt a large text message with recipient public key.")
  .action(encryptLarge);

program
  .command("decrypt-large")
  .description("Decrypt a large text message with private key.")
  .action(decryptLarge);

program.parse(process.argv);
