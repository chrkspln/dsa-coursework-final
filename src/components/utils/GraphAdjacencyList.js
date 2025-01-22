import React from 'react';
import './utils_styles.css';

const GraphAdjacencyList = ({ graph }) => {
    const adjacencyList = graph.getAdjacencyList();

    const edges = [];
    Object.keys(adjacencyList).forEach((vertex) => {
        adjacencyList[vertex].forEach(({ node, weight }) => {
            if (!edges.some((edge) => edge.includes(`${node}-${vertex}`))) {
                edges.push(`${vertex} - ${node} (weight: ${weight})`);
            }
        });
    });

    return (
        <div className={'graph-lists'}>
            <div className={'graph-adjacency-list'}>
            <h2>adjacencyList</h2>
            <ul>
                {Object.entries(adjacencyList).map(([vertex, edges]) => (
                    <li key={vertex}>
                        {vertex}: [{edges.map((edge) => `${edge.node} (${edge.weight})`).join(', ')}]
                    </li>
                ))}
            </ul>
                </div>
<div className={'graph-edges'}>
            <h2>edges</h2>
            <ul>
                {edges.map((edge, index) => (
                    <li key={index}>{edge}</li>
                ))}
            </ul>
</div>
        </div>
    );
};

export default GraphAdjacencyList;