// src/components/ProposalList.js
import React from 'react';

const ProposalList = ({ proposals, voteOnProposal }) => {
    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Proposals</h2>
            {proposals.length === 0 ? (
                <p>No proposals available.</p>
            ) : (
                <ul className="space-y-4">
                    {proposals.map((proposal, index) => (
                        <li key={index} className="border p-4 rounded-lg">
                            <p><strong>ID:</strong> {index}</p>
                            <p><strong>Description:</strong> {proposal.description}</p>
                            <p><strong>Votes:</strong> {proposal.voteCount.toString()}</p>
                            <button
                                onClick={() => voteOnProposal(index, 1)}
                                className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                            >
                                Vote
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProposalList;
