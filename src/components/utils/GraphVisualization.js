import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

const GraphVisualization = ({ graph, history }) => {
    const svgRef = useRef();
    const [edgeColors, setEdgeColors] = useState({});

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const width = 1200;
        const height = 500;

        const adjacencyList = graph.getAdjacencyList();

        // Create nodes and links
        const nodes = Object.keys(adjacencyList).map((vertex) => ({ id: vertex }));
        const links = [];
        Object.keys(adjacencyList).forEach((vertex) => {
            adjacencyList[vertex].forEach(({ node, weight }) => {
                if (!links.some((link) => link.source === node && link.target === vertex)) {
                    links.push({ source: vertex, target: node, weight });
                }
            });
        });

        // Create simulation
        const simulation = d3
            .forceSimulation(nodes)
            .force(
                'link',
                d3.forceLink(links).id((d) => d.id).distance(120)
            )
            .force('charge', d3.forceManyBody().strength(-50))
            .force('center', d3.forceCenter(width / 2, height / 2));

        // Draw links (edges)
        const link = svg
            .append('g')
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('data-id', (d) =>
                `${String(d.source.id)}-${String(d.target.id)}`
            )
            .attr('stroke', '#999')
            .attr('stroke-width', (d) => Math.sqrt(d.weight));

        // Draw nodes (vertices)
        const node = svg
            .append('g')
            .selectAll('circle')
            .data(nodes)
            .join('circle')
            .attr('r', 15)
            .attr('fill', 'green')
            .attr('data-id', (d) => d.id)
            .call(
                d3
                    .drag()
                    .on('start', (event, d) => {
                        if (!event.active) simulation.alphaTarget(0.3).restart();
                        d.fx = d.x;
                        d.fy = d.y;
                    })
                    .on('drag', (event, d) => {
                        d.fx = event.x;
                        d.fy = event.y;
                    })
                    .on('end', (event, d) => {
                        if (!event.active) simulation.alphaTarget(0);
                        d.fx = null;
                        d.fy = null;
                    })
            );

        // Draw labels for nodes
        const label = svg
            .append('g')
            .selectAll('text')
            .data(nodes)
            .join('text')
            .attr('text-anchor', 'middle')
            .attr('dy', -15)
            .text((d) => d.id);

        // Update positions on each simulation tick
        simulation.on('tick', () => {
            link
                .attr('x1', (d) => d.source.x)
                .attr('y1', (d) => d.source.y)
                .attr('x2', (d) => d.target.x)
                .attr('y2', (d) => d.target.y);

            node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

            label.attr('x', (d) => d.x).attr('y', (d) => d.y);
        });

        return () => simulation.stop(); // Cleanup on unmount
    }, [graph]); // Re-run effect when graph changes

    useEffect(() => {
        const animateVertexTraversal = async () => {
            for (const step of graph.historyToAnimate) {
                await d3.select(`circle[data-id="${step.vertex}"]`)
                    .transition()
                    .duration(500)
                    .attr('fill', 'red')
                    .transition()
                    .duration(500)
                    .attr('fill', 'green')
                    .end();
            }
        };

        if (graph.historyToAnimate && graph.historyToAnimate.length > 0) {
            animateVertexTraversal().then(() => {
                for (const pair of graph.adjacencyList[graph.minCut.edge.to]) {
                    console.log(graph.minCut.cutValue, pair.node, pair.weight)
                    if (graph.minCut.cutValue == pair.weight) {
                        if (d3.select(`line[data-id="${graph.minCut.edge.to}-${pair.node}"]`).empty()) {
                            d3.select(`line[data-id="${pair.node}-${graph.minCut.edge.to}"]`)
                                .transition()
                                .duration(500)
                                .attr('stroke', 'red')
                                .attr('stroke-width', (d) => Math.sqrt(d.weight));
                            console.log("just tried to change edge", graph.minCut.edge.to, pair.node);
                            console.log(d3.selectAll(`line`));
                        } else {
                            d3.select(`line[data-id="${graph.minCut.edge.to}-${pair.node}"]`)
                                .transition()
                                .duration(500)
                                .attr('stroke', 'red')
                                .attr('stroke-width', (d) => Math.sqrt(d.weight));
                            console.log("just tried to change edge", graph.minCut.edge.to, pair.node);
                            console.log(d3.selectAll(`line`));
                        }
                    }
                }
            });
        }
    }, [graph.historyToAnimate, graph.minCut]); // Re-run animation when historyToAnimate changes

    return (
        <>
            <svg ref={svgRef}
                 width={1200} height={500}
                 style={{border: '1px solid black', margin: '0 0 30px 0'}}>
                {Object.keys(edgeColors).map((key) => {
                    const [source, target] = key.split('-');
                    const edgeColor = edgeColors[key];

                    return (
                        <line
                            key={key}
                            x1={source.x}
                            y1={source.y}
                            x2={target.x}
                            y2={target.y}
                            stroke={edgeColor}
                            strokeWidth="2"
                        />
                    );
                })}
            </svg>
        </>

    )
        ;
};

export default GraphVisualization;
