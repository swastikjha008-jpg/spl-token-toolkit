// Usage: npm run balance <MINT_ADDRESS> [OWNER_ADDRESS]
const { getAssociatedTokenAddressSync, getAccount, getMint } = require("@solana/spl-token");
const { getConnection, loadKeypair, parsePubkey, arg } = require("./config");

(async () => {
  const connection = getConnection();
  const mint = parsePubkey(arg(2, "MINT_ADDRESS", "mint address"), "mint address");
  const owner = process.argv[3] ? parsePubkey(process.argv[3], "owner") : loadKeypair().publicKey;

  const { decimals } = await getMint(connection, mint);
  const ata = getAssociatedTokenAddressSync(mint, owner);
  const acct = await getAccount(connection, ata);

  console.log("ATA:    ", ata.toBase58());
  console.log("Balance:", Number(acct.amount) / 10 ** decimals);
})().catch((e) => (console.error("Error:", e.message), process.exit(1)));
