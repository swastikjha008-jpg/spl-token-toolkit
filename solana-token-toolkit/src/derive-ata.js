// Find the associated token account for a user + mint, manually and via the helper.
// Usage: npm run derive-ata <MINT_ADDRESS> <OWNER_ADDRESS>
const { PublicKey } = require("@solana/web3.js");
const {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} = require("@solana/spl-token");
const { parsePubkey, arg } = require("./config");

// ATA = PDA of [owner, TOKEN_PROGRAM_ID, mint] under the Associated Token Program
function getAssociatedTokenAddress(mintAddress, ownerAddress) {
  return PublicKey.findProgramAddressSync(
    [ownerAddress.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mintAddress.toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
}

try {
  const mint = parsePubkey(arg(2, "MINT_ADDRESS", "mint address"), "mint address");
  const owner = parsePubkey(arg(3, "OWNER_ADDRESS", "owner address"), "owner address");

  const [manual, bump] = getAssociatedTokenAddress(mint, owner);
  const viaHelper = getAssociatedTokenAddressSync(mint, owner);

  console.log("Associated Token Address (manual): ", manual.toBase58());
  console.log("Bump:                              ", bump);
  console.log("Associated Token Address (helper): ", viaHelper.toBase58());
  console.log("Match:                             ", manual.equals(viaHelper));
} catch (e) {
  console.error("Error:", e.message);
  process.exit(1);
}
