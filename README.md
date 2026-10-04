<div align="center">

# 🪙 Solana Token Lab

**Create a mint, make token accounts, mint tokens, and derive ATAs/PDAs by hand, all from simple Node.js scripts.**

![Solana](https://img.shields.io/badge/Solana-9945FF?style=for-the-badge&logo=solana&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</div>

---

## ✨ Features

- 🏭 **Create a token mint** with custom decimals (`spl-token create-token`)
- 👛 **Create associated token accounts** (`spl-token create-account`)
- 🪙 **Mint tokens** to any wallet (`spl-token mint`)
- 📊 **Check balances** for any mint/owner
- 🧮 **Derive an ATA manually** with `findProgramAddressSync` and compare it with the helper
- 🔍 **`findProgramAddress` vs `createProgramAddress`** demo
- 🔐 **Zero-setup wallet**: auto-creates a git-ignored `wallet.json` and airdrops devnet SOL
- 🛡️ **Friendly errors**: validates inputs before touching the network

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Blockchain | [Solana](https://solana.com) (devnet by default) |
| Runtime | [Node.js](https://nodejs.org) >= 18 |
| Package manager | [pnpm](https://pnpm.io) |
| Solana SDK | [`@solana/web3.js`](https://github.com/solana-labs/solana-web3.js) |
| Token SDK | [`@solana/spl-token`](https://github.com/solana-labs/solana-program-library/tree/master/token/js) |
| Config | [`dotenv`](https://github.com/motdotla/dotenv) |
| Scripting | Bash (`scripts/cli-flow.sh`) |

## 🚀 Quick Start

```bash
git clone https://github.com/swastikjha008-jpg/solana-token-lab.git
cd solana-token-lab
pnpm install
cp .env.example .env      # Windows: copy .env.example .env
pnpm wallet               # creates wallet.json + devnet airdrop
```

Then run the full flow:

```bash
pnpm create-mint                 # prints MINT address
pnpm create-ata <MINT>           # creates your token account
pnpm mint <MINT> 100             # mints 100 tokens
pnpm balance <MINT>              # shows balance
```

> No Solana CLI required. If you already have one, its wallet (`~/.config/solana/id.json`) is used automatically.

## 📜 Commands

| Command | CLI equivalent | What it does |
|---|---|---|
| `pnpm wallet` | `solana address` / `solana balance` | Shows wallet and balance, airdrops on devnet if low |
| `pnpm create-mint [decimals]` | `spl-token create-token` | Creates a mint (default 9 decimals) |
| `pnpm create-ata <MINT> [OWNER]` | `spl-token create-account <MINT>` | Creates the associated token account |
| `pnpm mint <MINT> <AMOUNT> [OWNER]` | `spl-token mint <MINT> <AMOUNT>` | Mints tokens to the ATA |
| `pnpm balance <MINT> [OWNER]` | `spl-token balance <MINT>` | Shows the token balance |
| `pnpm derive-ata <MINT> <OWNER>` | - | Manual ATA derivation |
| `pnpm pda-compare <OWNER> <MINT>` | - | `find` vs `create` program address |

Prefer the official CLI? Run `./scripts/cli-flow.sh` for the same flow with `solana` + `spl-token`.

## ⚙️ Configuration

Copy `.env.example` to `.env`:

| Variable | Default | Description |
|---|---|---|
| `SOLANA_RPC` | `devnet` | `devnet`, `testnet`, `mainnet-beta`, or a full RPC URL |
| `KEYPAIR_PATH` | *(auto)* | Wallet file. Order: this path, then Solana CLI wallet, then `./wallet.json` |
| `MINT_ADDRESS` | - | Optional default mint for scripts |
| `OWNER_ADDRESS` | - | Optional default owner |

## 📁 Project Structure

```
solana-token-lab/
├── src/
│   ├── config.js        # connection, wallet loading, airdrop, helpers
│   ├── create-mint.js   # create the token mint
│   ├── create-ata.js    # create associated token account
│   ├── mint-tokens.js   # mint tokens
│   ├── balance.js       # token balance
│   ├── derive-ata.js    # manual ATA derivation
│   ├── pda-compare.js   # findProgramAddress vs createProgramAddress
│   ├── wallet.js        # wallet info + airdrop
│   └── quiet.js         # hides a harmless bigint-buffer warning
├── scripts/
│   └── cli-flow.sh      # same flow with the official CLIs
├── pnpm-workspace.yaml  # build-script policy for pnpm 10+
├── .env.example
└── package.json
```

## 🧠 Concepts

- **Mint**: defines the token (supply, decimals, authorities).
- **Token account**: holds one owner's balance of one mint.
- **ATA (Associated Token Account)**: the canonical token account, a PDA derived from `[owner, TOKEN_PROGRAM_ID, mint]` under the Associated Token Program.
- **`findProgramAddressSync`**: tries bumps 255 down to 0 and returns the first valid off-curve address with its bump.
- **`createProgramAddressSync`**: you supply the bump; it throws if the result lands on the ed25519 curve.

## 🩹 Troubleshooting

| Problem | Fix |
|---|---|
| `Could not find mint account` | You passed a token account address. Use the **mint** address from `create-mint`. |
| Airdrop fails | Devnet is rate-limited. Paste your address (`pnpm wallet`) into [faucet.solana.com](https://faucet.solana.com). |
| `ERR_PNPM_IGNORED_BUILDS` | Keep `pnpm-workspace.yaml` in the repo root (it sets `allowBuilds`). |
| `ERR_PNPM_NO_PKG_MANIFEST` | You are in the wrong folder. `cd` into the one containing `package.json`. |

## 🔒 Security

- `wallet.json` and `.env` are git-ignored. **Never commit a keypair.**
- Defaults to **devnet**. Double-check `SOLANA_RPC` before using mainnet.

## 📄 License

[MIT](./LICENSE)

---

<div align="center">Built by <a href="https://github.com/swastikjha008-jpg">Swastik</a> · Learning Solana the hands-on way ⚡</div>
