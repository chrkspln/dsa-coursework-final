import Graph from "../utils/Graph";
import VertexForm from "../utils/VertexForm";
import EdgeForm from "../utils/EdgeForm";
import GraphVisualization from "../utils/GraphVisualization";
import {useState} from "react";
import GraphAdjacencyList from "../utils/GraphAdjacencyList";
import './GraphPage.css';

function GraphPage() {
    const [graph, setGraph] = useState(new Graph());

    return (
        <div className="Graph">
            <h1>
                Visualization of Min Cut in GraphPage
            </h1>

            <div className="graph-container">
                <div className="controls">
                    <div>
                        <h2>Add Vertex</h2>
                        <VertexForm
                            onAddVertex={(vertex) => {
                                const updatedGraph = new Graph();
                                Object.assign(updatedGraph, graph);
                                updatedGraph.addVertex(vertex);
                                setGraph(updatedGraph);
                            }}
                        />
                    </div>
                    <div>
                        <h2>Add Edge</h2>
                        <EdgeForm
                            onAddEdge={(vertex1, vertex2, weight) => {
                                const updatedGraph = new Graph();
                                Object.assign(updatedGraph, graph);
                                updatedGraph.addEdge(vertex1, vertex2, weight);
                                setGraph(updatedGraph);
                            }}
                        />
                    </div>
                    <div className="control-buttons">
                        <div className="reset-graph">
                            <h2>Reset Graph</h2>
                            <button
                                onClick={() => {
                                    setGraph(new Graph());
                                }}
                            >
                                Reset
                            </button>
                        </div>
                        <div className="example-graph">
                            <h2>Example Graph</h2>
                            <button
                                onClick={() => {
                                    const updatedGraph = new Graph();
                                    Object.assign(updatedGraph, graph);
                                    updatedGraph.exampleGraph();
                                    setGraph(updatedGraph);
                                }}
                            >
                                Randomize
                            </button>
                        </div>
                        <div className="min-cut">
                            <button
                                onClick={() => {
                                    const updatedGraph = new Graph();
                                    Object.assign(updatedGraph, graph);
                                    updatedGraph.findMinCut();
                                    setGraph(updatedGraph);
                                }}>
                                Calculate Min Cut
                            </button>
                        </div>
                    </div>
                </div>
                <div className="adjacency-list">
                    <GraphAdjacencyList graph={graph}/>
                </div>
                <div className="visualization">
                    <GraphVisualization graph={graph}/>
                </div>
            </div>
        </div>
    )
        ;
}

export default GraphPage;