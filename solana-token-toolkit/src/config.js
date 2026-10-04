require("dotenv").config();
const fs = require("fs");
const os = require("os");
const path = require("path");
const { Connection, Keypair, PublicKey, clusterApiUrl } = require("@solana/web3.js");

function getConnection() {
  const rpc = process.env.SOLANA_RPC || "devnet";
  const url = /^https?:\/\//.test(rpc) ? rpc : clusterApiUrl(rpc);
  return new Connection(url, "confirmed");
}

function loadKeypair() {
  const p =
    process.env.KEYPAIR_PATH || path.join(os.homedir(), ".config", "solana", "id.json");
  if (!fs.existsSync(p)) {
    throw new Error(`Keypair not found at ${p}. Run "solana-keygen new" or set KEYPAIR_PATH.`);
  }
  return Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(p, "utf8"))));
}

function parsePubkey(value, label) {
  try {
    return new PublicKey(value);
  } catch {
    throw new Error(`Invalid ${label}: "${value}"`);
  }
}

/** CLI arg first, then env var. */
function arg(index, envName, label) {
  const v = process.argv[index] || process.env[envName];
  if (!v) throw new Error(`Missing ${label}. Pass it as an argument or set ${envName} in .env`);
  return v;
}

module.exports = { getConnection, loadKeypair, parsePubkey, arg };
