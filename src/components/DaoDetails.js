// src/components/DAODetails.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const DAODetails = ({ signer, contractAddress, contractABI }) => {
    const [details, setDetails] = useState({});
    const [contract, setContract] = useState(null);

    useEffect(() => {
        if (signer) {
            const daoContract = new ethers.Contract(contractAddress, contractABI, signer);
            setContract(daoContract);
            fetchDetails(daoContract);
        }
    }, [signer, contractAddress, contractABI]);

    const fetchDetails = async (daoContract) => {
        try {
            const quorumPercentage = await daoContract.quorumPercentage();
            const proposalFee = await daoContract.proposalFee();
            const executionDelay = await daoContract.executionDelay();
            setDetails({
                quorumPercentage: quorumPercentage.toString(),
                proposalFee: ethers.utils.formatEther(proposalFee),
                executionDelay: executionDelay.toString(),
            });
        } catch (error) {
            console.error("Error fetching DAO details:", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">DAO Details</h2>
            <ul className="space-y-2">
                <li><strong>Quorum Percentage:</strong> {details.quorumPercentage}%</li>
                <li><strong>Proposal Fee:</strong> {details.proposalFee} ETH</li>
                <li><strong>Execution Delay:</strong> {details.executionDelay} seconds</li>
            </ul>
        </div>
    );
};

export default DAODetails;
