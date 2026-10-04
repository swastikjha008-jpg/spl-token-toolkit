// Equivalent of: spl-token create-token
// Usage: npm run create-mint [decimals]
const { createMint } = require("@solana/spl-token");
const { getConnection, loadKeypair } = require("./config");

(async () => {
  const connection = getConnection();
  const payer = loadKeypair();
  const decimals = Number(process.argv[2] ?? 9);

  const mint = await createMint(connection, payer, payer.publicKey, null, decimals);

  console.log("Mint address:", mint.toBase58());
  console.log("Decimals:    ", decimals);
  console.log("\nSave it:  MINT_ADDRESS=" + mint.toBase58());
})().catch((e) => (console.error("Error:", e.message), process.exit(1)));
