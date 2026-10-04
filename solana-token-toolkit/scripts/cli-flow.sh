#!/usr/bin/env bash
# Same flow using the official Solana + spl-token CLIs.
set -euo pipefail

solana config set --url devnet
solana airdrop 2 || true

# 1. Create the mint (prints the MINT address)
spl-token create-token

# 2. Create your associated token account for that mint
read -rp "Mint address: " MINT
spl-token create-account "$MINT"

# 3. Mint 100 tokens (use the MINT address, NOT the token account address)
spl-token mint "$MINT" 100

spl-token accounts
