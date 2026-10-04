# Solana Token Toolkit

Small, working toolkit for the SPL token lifecycle on Solana:

1. Create a token mint
2. Create an associated token account (ATA)
3. Mint tokens
4. Check balance
5. Derive ATA / PDA addresses manually (`findProgramAddressSync` vs `createProgramAddressSync`)

Each script mirrors an `spl-token` CLI command.

## Setup

```bash
git clone <your-repo-url>
cd solana-token-toolkit
pnpm install
cp .env.example .env
solana-keygen new          # if you don't have a wallet yet
solana config set --url devnet
solana airdrop 2
```

## Usage

| Command | CLI equivalent | Description |
|---|---|---|
| `pnpm create-mint [decimals]` | `spl-token create-token` | Creates a mint (default 9 decimals) |
| `pnpm create-ata <MINT> [OWNER]` | `spl-token create-account <MINT>` | Creates the ATA |
| `pnpm mint <MINT> <AMOUNT> [OWNER]` | `spl-token mint <MINT> <AMOUNT>` | Mints tokens to the ATA |
| `pnpm balance <MINT> [OWNER]` | `spl-token balance <MINT>` | Shows token balance |
| `pnpm derive-ata <MINT> <OWNER>` | - | Manual ATA derivation |
| `pnpm pda-compare <OWNER> <MINT>` | - | `find` vs `create` program address |

Example:

```bash
pnpm create-mint
pnpm create-ata <MINT>
pnpm mint <MINT> 100
pnpm balance <MINT>
```

Or the plain CLI flow: `./scripts/cli-flow.sh`

## Concepts

- **Mint**: defines the token (supply, decimals, authorities).
- **Token account**: holds a balance of one mint for one owner.
- **ATA**: the canonical token account, a PDA derived from `[owner, TOKEN_PROGRAM_ID, mint]` under the Associated Token Program.
- **findProgramAddress**: searches bumps 255 to 0 and returns the first off-curve address plus its bump.
- **createProgramAddress**: you supply the bump; throws if the result is on the curve.

## Troubleshooting

**`Could not find mint account <address>`**
You passed a token account address to `mint`. Use the **mint** address (printed by `create-token`), not the one printed by `create-account`.

**Keypair not found**
Set `KEYPAIR_PATH` in `.env` or run `solana-keygen new`.

**Airdrop fails**
Devnet is rate-limited; retry later or use https://faucet.solana.com.

## License

MIT
