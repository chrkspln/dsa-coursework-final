import Graph from "../utils/graph_utils/Graph";
import VertexForm from "../utils/graph_utils/VertexForm";
import EdgeForm from "../utils/graph_utils/EdgeForm";
import GraphVisualization from "../utils/graph_utils/GraphVisualization";
import {useState} from "react";
import GraphAdjacencyList from "../utils/graph_utils/GraphAdjacencyList";
import './GraphPage.css';

function GraphPage() {
    const [graph, setGraph] = useState(new Graph());

    return (
        <div className="Graph">
            <h1>
                Візуалізація знаходження мінімального перерізу у графі за допомогою алгоритма Стоера-Вагнера
            </h1>

            <div className="graph-container">
                <div className="controls">
                    <div>
                        <h2>
                            Додати нову вершину
                        </h2>
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
                        <h2>
                            Додати нове ребро
                        </h2>
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
                            <button
                                onClick={() => {
                                    setGraph(new Graph());
                                }}
                            >
                                Скинути налаштування графу
                            </button>
                        </div>
                        <div className="example-graph">
                            <button
                                onClick={() => {
                                    const updatedGraph = new Graph();
                                    Object.assign(updatedGraph, graph);
                                    updatedGraph.exampleGraph();
                                    setGraph(updatedGraph);
                                }}
                            >
                                Приклад графу
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
                                Вирахувати мінімальний переріз графу
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