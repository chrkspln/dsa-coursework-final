import MinCutGraph from "./MinCutGraph";


class Graph {
    constructor() {
        this.adjacencyList = {};
        this.minCut = {};
        this.historyToAnimate = [];
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex])
            this.adjacencyList[vertex] = [];
    }

    addEdge(vertex1, vertex2, weight = 1) {
        this.adjacencyList[vertex1].push({ node: vertex2, weight });
        this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }

    getAdjacencyList() {
        return this.adjacencyList;
    }

    getHistoryToAnimate() {
        return this.historyToAnimate;
    }

    exampleGraph() {
        this.addVertex('A');
        this.addVertex('B');
        this.addVertex('C');
        this.addVertex('D');
        this.addVertex('E');
        this.addVertex('F');

        this.addEdge('A', 'B', 3);
        this.addEdge('A', 'C', 18);
        this.addEdge('B', 'D', 10);
        this.addEdge('F', 'E', 7);
        this.addEdge('A', 'F', 2);

        return this;
    }

    findMinCut() {
        const { minCut, history, historyToAnimate } = MinCutGraph(this.adjacencyList);
        this.minCut = minCut;
        this.historyToAnimate = historyToAnimate;
    }
}

export default Graph;