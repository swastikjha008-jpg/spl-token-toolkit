// createProgramAddress vs findProgramAddress
//  - findProgramAddressSync: tries bump 255 -> 0, returns the first valid PDA + bump.
//  - createProgramAddressSync: you supply the bump; throws if the result is on the ed25519 curve.
// Usage: npm run pda-compare <OWNER_ADDRESS> <MINT_ADDRESS>
const { PublicKey } = require("@solana/web3.js");
const { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } = require("@solana/spl-token");
const { parsePubkey, arg } = require("./config");

try {
  const user = parsePubkey(arg(2, "OWNER_ADDRESS", "owner address"), "owner address");
  const mint = parsePubkey(arg(3, "MINT_ADDRESS", "mint address"), "mint address");
  const seeds = [user.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()];

  const [found, bump] = PublicKey.findProgramAddressSync(seeds, ASSOCIATED_TOKEN_PROGRAM_ID);
  console.log("findProgramAddressSync   ->", found.toBase58(), `(bump ${bump})`);

  const created = PublicKey.createProgramAddressSync(
    [...seeds, Buffer.from([bump])],
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
  console.log("createProgramAddressSync ->", created.toBase58(), "(bump supplied manually)");

  try {
    PublicKey.createProgramAddressSync(seeds, ASSOCIATED_TOKEN_PROGRAM_ID);
    console.log("createProgramAddressSync without bump succeeded (not guaranteed in general)");
  } catch (e) {
    console.log("createProgramAddressSync without bump failed:", e.message);
  }
} catch (e) {
  console.error("Error:", e.message);
  process.exit(1);
}
