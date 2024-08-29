// src/App.js
import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import NuvoDAOInteraction from './components/NuvoDAOInteraction';
import DAODetails from './components/DAODetails';
import contractABI from './abi/NuvoDAO.json'; // Your actual ABI file

const App = () => {
    const [signer, setSigner] = useState(null);

    const handleWalletConnected = (connectedSigner) => {
        setSigner(connectedSigner);
    };

    return (
        <div className="App">
            {!signer ? (
                <WalletConnect onWalletConnected={handleWalletConnected} />
            ) : (
                <div>
                    <DAODetails
                        signer={signer}
                        contractAddress="0xYourContractAddressHere" // Replace with your actual contract address
                        contractABI={contractABI}
                    />
                    <NuvoDAOInteraction
                        signer={signer}
                        contractAddress="0xYourContractAddressHere" // Replace with your actual contract address
                        contractABI={contractABI}
                    />
                </div>
            )}
        </div>
    );
};

export default App;
