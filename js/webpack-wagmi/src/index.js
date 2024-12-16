// CommonJS require syntax
const { arbitrum, mainnet } = require('@reown/appkit/networks');
const { WagmiAdapter } = require('@reown/appkit-adapter-wagmi');
const { createAppKit } = require('@reown/appkit');

// Get projectId from environment variables (process.env is used in Node.js)
const projectId = "b56e18d47c72ab683b10814fe9495694";
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set');
}

// 2. Create Wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, arbitrum],
  projectId
});

// 3. Create modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  metadata: {
    name: 'Html Example',
    description: 'Html Example',
    url: 'https://reown.com/appkit',
    icons: ['https://avatars.githubusercontent.com/u/179229932?s=200&v=4']
  },
  networks: [mainnet, arbitrum],
  projectId,
  themeMode: 'light'
});

// 4. Trigger modal programmatically
const openConnectModalBtn = document.getElementById('open-connect-modal');
const openNetworkModalBtn = document.getElementById('open-network-modal');

openConnectModalBtn.addEventListener('click', () => modal.open());
openNetworkModalBtn.addEventListener('click', () => modal.open({ view: 'Networks' }));

// 5. Alternatively use w3m component buttons (see index.html)
