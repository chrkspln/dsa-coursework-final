import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import SearchNodeForm from "./SearchNodeForm";

const DoublyLinkedListVisualization = ({ dll }) => {
    const svgRef = useRef();
    const [animationState, setAnimationState] = useState({
        isPlaying: false,
        currentStep: 0,
    });
    const history = dll.historyToAnimate || [];

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const width = 1200;
        const height = 500;

        // DLL nodes and links
        const nodeList = dll.getNodeList();
        const nodes = nodeList.map((node) => ({ id: `${node.id}`, value: node.value,
                                                x: 100 + node.id * 150,
                                                y: height / 2}));
        const links = [];
        nodeList.forEach((node) => {
            if (node.next) {
                links.push({ prv: `${node.id}`, next: `${node.next.id}`, type: 'next' });
            }
            if (node.prv) {
                links.push({ prv: `${node.id}`, next: `${node.prv.id}`, type: 'prev' });
            }
        });

        // Draw links
        svg.append('g')
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('x1', (d) => nodes.find((node) => node.id == d.prv).x)
            .attr('y1', (d) => (d.type == 'next' ? nodes.find((node) => node.id == d.prv).y - 7 : nodes.find((node) => node.id == d.prv).y + 7))
            .attr('x2', (d) => nodes.find((node) => node.id == d.next).x)
            .attr('y2', (d) => (d.type == 'next' ? nodes.find((node) => node.id == d.next).y - 7 : nodes.find((node) => node.id == d.next).y + 7))
            .attr('stroke', (d) => (d.type == 'next' ? 'grey' : 'black'))
            .attr('stroke-width', 4);

        // Draw nodes
        svg.append('g')
            .selectAll('circle')
            .data(nodes)
            .join('circle')
            .attr('cx', (d) => d.x)
            .attr('cy', (d) => d.y)
            .attr('r', 25)
            .attr('fill', 'green')
            .attr('data-id', (d) => d.id);

        // Draw labels for nodes
        const label = svg
            .append('g')
            .selectAll('text')
            .data(nodes)
            .join('text')
            .attr('x', (d) => d.x)
            .attr('y', (d) => d.y + 5)
            .attr('text-anchor', 'middle')
            .attr('dy', 0)
            .attr('fill', 'white')
            .style('font-size', '18px')
            .text((d) => d.value);

    }, [dll]);

    const animateStep = (stepIndex) => {
        const step = history[stepIndex];
        if (!step) return;

        d3.select(`circle[data-id="${step.node}"]`)
            .transition()
            .duration(500)
            .attr('fill', 'red')
            .transition()
            .duration(500)
            .attr('fill', 'green');
    };

    const playAnimation = () => {
        setAnimationState((state) => ({ ...state, isPlaying: true }));
        let stepIndex = animationState.currentStep;

        const interval = setInterval(() => {
            if (stepIndex >= history.length) {
                clearInterval(interval);
                setAnimationState((state) => ({ ...state, isPlaying: false }));
                return;
            }

            animateStep(stepIndex);
            stepIndex++;
            setAnimationState((state) => ({ ...state, currentStep: stepIndex }));
        }, 330);
    };

    const pauseAnimation = () => {
        setAnimationState((state) => ({ ...state, isPlaying: false }));
    };

    const stepForward = () => {
        if (animationState.currentStep < history.length) {
            animateStep(animationState.currentStep);
            setAnimationState((state) => ({ ...state, currentStep: state.currentStep + 1 }));
        }
    };

    const stepBack = () => {
        if (animationState.currentStep > 0) {
            setAnimationState((state) => ({ ...state, currentStep: state.currentStep - 1 }));
        }
    };

    return (
        <>
            <svg
                ref={svgRef}
                width={1200}
                height={500}
                style={{ border: '1px solid black', margin: '0 0 30px 0' }}
            ></svg>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                marginTop: '20px'
            }}>

                <SearchNodeForm
                    onSearchNode={(node) => {
                        dll.searchNode(node);
                        playAnimation();
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button onClick={playAnimation} disabled={animationState.isPlaying}>
                        Почати анімацію
                    </button>
                    <button onClick={pauseAnimation} disabled={!animationState.isPlaying}>
                        Пауза
                    </button>
                    <button onClick={stepBack} disabled={animationState.currentStep === 0}>
                        Крок назад
                    </button>
                    <button onClick={stepForward} disabled={animationState.currentStep >= history.length}>
                        Крок вперед
                    </button>
                </div>

            </div>
        </>
    );
};

export default DoublyLinkedListVisualization;
