// Equivalent of: spl-token mint <MINT> <AMOUNT>
// Usage: npm run mint <MINT_ADDRESS> <AMOUNT> [OWNER_ADDRESS]
//
// NOTE: <MINT_ADDRESS> must be the MINT, not the token account address.
// Passing the token account gives: "Could not find mint account".
const { getMint, getOrCreateAssociatedTokenAccount, mintTo } = require("@solana/spl-token");
const { getConnection, loadKeypair, parsePubkey, arg } = require("./config");

(async () => {
  const connection = getConnection();
  const mint = parsePubkey(arg(2, "MINT_ADDRESS", "mint address"), "mint address");
  const amount = Number(arg(3, "MINT_AMOUNT", "amount"));
  if (!Number.isFinite(amount) || amount <= 0) throw new Error("Amount must be a positive number");

  const payer = loadKeypair();
  const owner = process.argv[4] ? parsePubkey(process.argv[4], "owner") : payer.publicKey;

  let mintInfo;
  try {
    mintInfo = await getMint(connection, mint);
  } catch {
    throw new Error(
      `Could not find mint account ${mint.toBase58()}. Did you pass a token account instead of the mint?`
    );
  }

  const ata = await getOrCreateAssociatedTokenAccount(connection, payer, mint, owner);
  const raw = BigInt(Math.round(amount * 10 ** mintInfo.decimals));

  const sig = await mintTo(connection, payer, mint, ata.address, payer, raw);

  console.log(`Minted ${amount} tokens`);
  console.log("  Token:    ", mint.toBase58());
  console.log("  Recipient:", ata.address.toBase58());
  console.log("  Signature:", sig);
})().catch((e) => (console.error("Error:", e.message), process.exit(1)));
