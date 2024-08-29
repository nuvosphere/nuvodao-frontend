// src/components/NuvoDAOInteraction.js
import React, { useState, useEffect } from 'react';
import { ethers, parseEther, AbiCoder } from 'ethers';
import ProposalList from './ProposalList';

const NuvoDAOInteraction = ({ signer, contractAddress, contractABI }) => {
    const [quorum, setQuorum] = useState("");
    const [proposalDescription, setProposalDescription] = useState("");
    const [proposals, setProposals] = useState([]);
    const [contract, setContract] = useState(null);
    const [notification, setNotification] = useState("");

    useEffect(() => {
        if (signer) {
            const daoContract = new ethers.Contract(contractAddress, contractABI, signer);
            setContract(daoContract);
            fetchProposals(daoContract);
        }
    }, [signer, contractAddress, contractABI]);

    const fetchProposals = async (daoContract) => {
        try {
            const proposalCount = await daoContract.proposalCount();
            const proposalList = [];
            for (let i = 0; i < proposalCount; i++) {
                const proposal = await daoContract.getProposal(i);
                proposalList.push(proposal);
            }
            setProposals(proposalList);
        } catch (error) {
            console.error("Error fetching proposals:", error);
        }
    };

    const getQuorumPercentage = async () => {
        try {
            const quorumPercentage = await contract.quorumPercentage();
            setQuorum(quorumPercentage.toString());
        } catch (error) {
            console.error("Error fetching quorum percentage:", error);
        }
    };

    const createProposal = async () => {
        try {
            const abiCoder = new AbiCoder();
            const tx = await contract.createProposal(
                proposalDescription,
                60 * 60 * 24 * 3, // 3-day voting period
                2, // ProposalType.Governance
                1, // ProposalCategory.Policy
                abiCoder.encode(
                    ["uint256"],
                    [25] // Example: Change quorumPercentage to 25%
                ),
                { value: parseEther("1") }
            );
            await tx.wait();
            setNotification("Proposal created!");
            fetchProposals(contract);
        } catch (error) {
            console.error("Error creating proposal:", error);
            setNotification("Failed to create proposal.");
        }
    };

    const voteOnProposal = async (proposalId, voteCount) => {
        try {
            const tx = await contract.vote(proposalId, voteCount);
            await tx.wait();
            setNotification(`Voted on proposal ${proposalId}!`);
            fetchProposals(contract);
        } catch (error) {
            console.error("Error voting on proposal:", error);
            setNotification(`Failed to vote on proposal ${proposalId}.`);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">NuvoDAO Interaction</h1>
            {notification && (
                <div className="mb-4 p-4 bg-green-200 text-green-800 rounded-lg">
                    {notification}
                </div>
            )}
            <div className="mb-4">
                <button
                    onClick={getQuorumPercentage}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    Get Quorum Percentage
                </button>
                {quorum && <p className="mt-2">Current Quorum: {quorum}%</p>}
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Proposal Description"
                    value={proposalDescription}
                    onChange={(e) => setProposalDescription(e.target.value)}
                    className="border border-gray-300 p-2 rounded-lg w-full"
                />
                <button
                    onClick={createProposal}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Create Proposal
                </button>
            </div>
            <ProposalList proposals={proposals} voteOnProposal={voteOnProposal} />
        </div>
    );
};

export default NuvoDAOInteraction;
