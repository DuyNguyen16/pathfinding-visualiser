export const algoList = [
    {
        key: "bfs",
        name: "Breadth-first Search",
        description: "Explores all neighbors at the current depth before moving deeper. Guarantees the shortest path in unweighted graphs.",
    },
    {
        key: "dfs",
        name: "Depth-first Search",
        description: "Explores as far as possible along each branch before backtracking. Does not guarantee the shortest path.",
    },
    {
        key: "dijkstra",
        name: "Dijkstra's Algorithm",
        description: "A weighted graph search algorithm that guarantees the shortest path using a priority queue. Efficient for non-negative weights.",
    },
    {
        key: "astar",
        name: "A* Search",
        description: "An informed search algorithm that uses both the actual distance and estimated cost (heuristic) to reach the goal efficiently.",
    },
];

export const mazeList = [
    {
        key: "recursive-division",
        name: "Recursive Division",
        description: "Divides the grid with walls recursively to form a maze with passages.",
    },
    {
        key: "randomized-dfs",
        name: "Randomised Depth-first Search",
        description: "Uses DFS with randomised directions to create perfect mazes.",
    },
    {
        key: "prims",
        name: "Prim’s Algorithm",
        description: "Generates mazes by growing a tree and adding walls from its edges randomly.",
    },
    {
        key: "ellers",
        name: "Eller’s Algorithm",
        description: "Efficient row-by-row maze generation technique, suitable for large grids.",
    },
];

