export const algoList = [
    {
        key: "bfs",
        name: "Breadth-first Search",
        description: (
            <>
                Explores all neighbors at the current depth before moving
                deeper. <b>Guarantees</b> the <b>shortest path</b> in{" "}
                <b>unweighted graphs</b>.
            </>
        ),
    },
    {
        key: "dfs",
        name: "Depth-first Search",
        description: (
            <>
                Explores as far as possible along each branch before
                backtracking. Does <b>not guarantee</b> the <b>shortest path</b>
                .
            </>
        ),
    },
    {
        key: "dijkstra",
        name: "Dijkstra's Algorithm",
        description: (
            <>
                A <b>weighted graph</b> search algorithm that guarantees the{" "}
                <b>shortest path</b> using a priority queue. <b>Efficient</b>{" "}
                for <b>non-negative weights</b>.
            </>
        ),
    },
    {
        key: "astar",
        name: "A* Search",
        description: (
            <>
                An informed search algorithm that uses both the actual distance
                and estimated cost (heuristic) to reach the goal efficiently.
            </>
        ),
    },
];

export const mazeList = [
    {
        key: "recursive-division",
        name: "Recursive Division",
        description: (
            <>
                Divides the grid with walls recursively to form a maze with
                passages.
            </>
        ),
    },
    {
        key: "randomised-dfs",
        name: "Randomised Depth-first Search",
        description: (
            <>Uses DFS with randomised directions to create perfect mazes.</>
        ),
    },
    {
        key: "prims",
        name: "Prim’s Algorithm",
        description: (
            <>
                Generates mazes by growing a tree and adding walls from its
                edges randomly.
            </>
        ),
    },
    {
        key: "random-weight",
        name: "Random Weight Placement",
        description: (
            <>
                Assigns random weights to a portion of the maze's walkable
                paths, adding variability for weighted pathfinding algorithms.
            </>
        ),
    },
    {
        key: "random-maze",
        name: "Basic Random Maze",
        description: (
            <>
                Creates a simple maze by randomly blocking paths, by randomly placing walls on grid.
            </>
        ),
    },
];
