// Equivalent of: spl-token create-account <MINT>
// Usage: npm run create-ata <MINT_ADDRESS> [OWNER_ADDRESS]
const { getOrCreateAssociatedTokenAccount, getMint } = require("@solana/spl-token");
const { getConnection, loadKeypair, parsePubkey, arg } = require("./config");

(async () => {
  const connection = getConnection();
  const mint = parsePubkey(arg(2, "MINT_ADDRESS", "mint address"), "mint address");
  const payer = loadKeypair();
  const owner = process.argv[3] ? parsePubkey(process.argv[3], "owner") : payer.publicKey;

  await getMint(connection, mint); // fails early if this is not a real mint

  const ata = await getOrCreateAssociatedTokenAccount(connection, payer, mint, owner);

  console.log("Owner:                 ", owner.toBase58());
  console.log("Mint:                  ", mint.toBase58());
  console.log("Associated token acct: ", ata.address.toBase58());
})().catch((e) => (console.error("Error:", e.message), process.exit(1)));
