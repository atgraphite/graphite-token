# Graphite Network Developer Hub

<div align="center">
  <h3>Everything you need to start building on Graphite Network</h3>
</div>

## 👋 Welcome

Welcome to the Graphite Network Developer Hub This repository provides essential tools, guides, and resources to help you quickly start building on the Graphite ecosystem. Whether you're an experienced blockchain developer or just beginning your journey, this hub will equip you with everything you need.

## 🚀 Quick Start

### 1. Connect to Graphite Network

Add Graphite Network to your wallet using these network details:

| Setting | Value |
|---------|-------|
| Network Name | Graphite Testnet |
| RPC URL | https://anon-entrypoint-test-1.atgraphite.com |
| Chain ID | 54170 |
| Currency Symbol | @G |
| Block Explorer | test.atgraphite.com |

<details>
<summary>📱 Step-by-step MetaMask Guide</summary>

1. Open MetaMask and click on the network dropdown at the top
2. Select "Add Network"
3. Click "Add Network Manually"
4. Fill in the network details above
5. Click "Save"
</details>

### 2. Get Test Tokens

You'll need @G tokens to interact with the network:

- Visit the [Graphite Faucet](https://faucet.atgraphite.com)
- Enter your wallet address
- Receive test @G tokens directly to your wallet

### 3. Set Up Your Development Environment

Clone this repository and install dependencies:

```bash
git clone https://github.com/graphite-network/graphite-network-setup.git
cd graphite-network-setup
cp .env.example .env
npm install
```

Edit your `.env` file:

```
PRIVATE_KEY=your_private_key
GRAPHITE_RPC_URL=https://anon-entrypoint-test-1.atgraphite.com
```

> 🔒 **Security Note:** Never commit your private key to GitHub or share it publicly

## 🧰 Developer Tools

### Code Examples

#### Connect using Viem

```javascript
import { createPublicClient, http } from 'viem'
import { graphiteTestnet } from './chains'

const client = createPublicClient({
  chain: graphiteTestnet,
  transport: http(process.env.GRAPHITE_RPC_URL),
})

// Now you can use client to interact with Graphite Network
const blockNumber = await client.getBlockNumber()
console.log(`Current block: ${blockNumber}`)
```

#### Connect using ethers.js

```javascript
import { ethers } from 'ethers'

const provider = new ethers.JsonRpcProvider(process.env.GRAPHITE_RPC_URL)

// Basic interaction
async function getNetwork() {
  const network = await provider.getNetwork()
  console.log(`Connected to: ${network.name} (Chain ID: ${network.chainId})`)
}

getNetwork()
```

### Project Structure

This repository is organized as follows:

```
graphite-dev-hub/
├── README.md           # This guide
├── examples/           # Code examples for different languages/frameworks
│   ├── viem/           # Viem.sh examples
│   ├── ethers/         # Ethers.js examples
│   └── wagmi/          # Wagmi hooks examples
├── contracts/          # Sample smart contracts for Graphite
├── scripts/            # Helper scripts for common tasks
└── utils/              # Utility functions and configurations
```

## 📊 Network Resources

| Resource | URL | Description |
|----------|-----|-------------|
| Documentation | [docs.atgraphite.com](https://docs.atgraphite.com) | Official developer documentation |
| Block Explorer | [test.atgraphite.com](https://test.atgraphite.com) | Search transactions, blocks, and addresses |
| Faucet | [faucet.atgraphite.com](https://faucet.atgraphite.com) | Get testnet tokens |
| Status | [TBA](atgraphite.com/marketing-staking-program) | Network status and metrics |

## 🎓 Learning Resources

- [Graphite Architecture Overview](https://docs.atgraphite.com)
- [Smart Contract Development Guide](https://docs.atgraphite.com/build-on-graphite/how-to-deploy-smart-contracts-using-hardhat-a-step-by-step-guide)

## 👨‍💻 Community

Join our growing community of developers:

- [Discord](http://discord.gg/k6kNNeQGv7) - Ask questions and meet other developers
- [Twitter](https://X.com/GraphiteNetwork) - Latest updates and announcements
- [Foundation](https://t.me/graphitenetwork) - Technical discussions and proposals

## 🤝 Contributing

We welcome contributions to this developer hub! See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get started.

## 📜 License

This repository is licensed under the [MIT License](LICENSE).
