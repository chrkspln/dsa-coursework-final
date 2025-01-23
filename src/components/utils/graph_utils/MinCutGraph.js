function MinCutGraph(graphAdjacencyList) {
    const minCut = { cutValue: Infinity, partitions: [], edge: null };
    const history = [];
    const historyToAnimate = []
    const vertices = Object.keys(graphAdjacencyList);
    const n = vertices.length;

    const findMinCutPhase = (graph, vertices) => {
        const selected = new Set();
        const weights = {};
        let prevVertex = null;
        let lastVertex = null;

        for (const vertex of vertices) {
            weights[vertex] = 0;
        }

        while (selected.size < vertices.length) {
            let maxWeightVertex = null;

            for (const vertex of vertices) {
                if (!selected.has(vertex) && (maxWeightVertex === null || weights[vertex] > weights[maxWeightVertex])) {
                    maxWeightVertex = vertex;
                }
            }

            if (selected.size === vertices.length - 1) {
                prevVertex = lastVertex;
                lastVertex = maxWeightVertex;
                break;
            }

            selected.add(maxWeightVertex);

            // Record the traversal state
            history.push({
                step: "select_vertex",
                vertex: maxWeightVertex,
                selected: Array.from(selected),
                weights: { ...weights },
            });

            for (const neighbor of graph[maxWeightVertex]) {
                if (!selected.has(neighbor.node)) {
                    weights[neighbor.node] += neighbor.weight;
                }
            }
        }

        // Record the result of this phase
        history.push({
            step: "phase_complete",
            cutValue: weights[lastVertex],
            edge: { from: prevVertex, to: lastVertex },
        });

        historyToAnimate.push(
            {
                vertex: lastVertex,
                weight: weights[lastVertex]
            }
        );

        return { prevVertex, lastVertex, cutValue: weights[lastVertex] };
    };

    const mergeVertices = (graph, vertexA, vertexB) => {
        for (const neighbor of graph[vertexB]) {
            if (!graph[vertexA])
                graph[vertexA] = [];
            const existingEdge = graph[vertexA].find(edge => edge.node === neighbor.node);
            if (existingEdge) {
                existingEdge.weight += neighbor.weight;
            } else {
                graph[vertexA].push({ node: neighbor.node, weight: neighbor.weight });
            }

            if (!graph[neighbor.node])
                graph[neighbor.node] = [];
            const reverseEdge = graph[neighbor.node].find(edge => edge.node === vertexB);
            if (reverseEdge) {
                const reverseToA = graph[neighbor.node].find(edge => edge.node === vertexA);
                if (reverseToA) {
                    reverseToA.weight += reverseEdge.weight;
                } else {
                    graph[neighbor.node].push({ node: vertexA, weight: reverseEdge.weight });
                }
            }
        }

        delete graph[vertexB];
        for (const vertex of Object.keys(graph)) {
            graph[vertex] = graph[vertex].filter(edge => edge.node !== vertexB);
        }
    };

    const graph = JSON.parse(JSON.stringify(graphAdjacencyList));

    for (let i = 0; i < n - 1; i++) {
        const { prevVertex, lastVertex, cutValue } = findMinCutPhase(graph, vertices);

        if (cutValue < minCut.cutValue) {
            minCut.cutValue = cutValue;
            minCut.partitions = [prevVertex, lastVertex];
            minCut.edge = { from: prevVertex, to: lastVertex };
        }

        mergeVertices(graph, prevVertex, lastVertex);
        vertices.splice(vertices.indexOf(lastVertex), 1);

        // Record the state after merging vertices
        history.push({
            step: "merge_vertices",
            merged: { vertexA: prevVertex, vertexB: lastVertex },
            graph: JSON.parse(JSON.stringify(graph)),
        });
    }

    return { minCut, history, historyToAnimate };
}

export default MinCutGraph;