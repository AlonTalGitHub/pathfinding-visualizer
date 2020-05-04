
export default function dijkstra(grid, startNode, finishNode) {

    const unvisitedNodes = getAllNodes(grid);

    const visitedNodesInOrder = [];
    startNode.distance = 0;
    buildMinHeap(unvisitedNodes);

    while (unvisitedNodes.length) {
        const visitedNode = extractMin(unvisitedNodes);
        if (!visitedNode) return visitedNodesInOrder;

        if (visitedNode.isWall) continue;
        
        if (visitedNode.distance === Infinity) return visitedNodesInOrder;

        visitedNode.isVisited = true;
        visitedNodesInOrder.push(visitedNode);

        if (visitedNode === finishNode) return visitedNodesInOrder;
        updateAdjacentNodes(unvisitedNodes, visitedNode, visitedNodesInOrder);

    }
    return visitedNodesInOrder;
}

function updateAdjacentNodes(unvisitedNodes, visitedNode, visitedNodesInOrder) {
    if (unvisitedNodes.length <= 1) {
        visitedNodesInOrder.push(unvisitedNodes.pop());
        return;
    }
    let adjacentCount = 0;
    
    for (const node of unvisitedNodes) {
        if (node.isWall) continue;
        if ((((node.row === visitedNode.row) && (node.col === visitedNode.col + 1 || node.col === visitedNode.col - 1)) ||
        ((node.col === visitedNode.col) && (node.row === visitedNode.row + 1 || node.row === visitedNode.row - 1)))) {
            if (node.distance > visitedNode.distance + 1) {
                node.distance = visitedNode.distance + 1;
                buildMinHeap(unvisitedNodes);
                node.previousNode = visitedNode;
                adjacentCount++;
            }
        }
    }
    
    if (adjacentCount === 0) { }
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

function createTestGrid() {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        grid[row] = [];
        for (let col = 0; col < 50; col++) {
            if (row === 10 && col === 15) {
                grid[row].push({ row, col, isStart: true, isFinish: false, isWall: false, isVisited: false, distance: Infinity })
            } else if (row === 10 && col === 35) {
                grid[row].push({ row, col, isStart: false, isFinish: true, isWall: false, isVisited: false, distance: Infinity })
            } else {
                let isWall = false;
                if (col === 28 && row !== getRandomIntFromInterval(0, 10) && row !== getRandomIntFromInterval(11, 19)) isWall = true;
                grid[row].push({ row, col, isStart: false, isFinish: false, isWall, isVisited: false, distance: Infinity })
            }
            
        }
    }
    return grid;
}

function getStartNode(grid) {
    for (const row of grid) {
        for (const node of row) {
            if (node.isStart === true) return node;
        }
    }
}

function getFinishNode(grid) {
    for (const row of grid) {
        for (const node of row) {
            if (node.isFinish === true) return node;
        }
    }
}


export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

function getRandomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is exclusive and the minimum is inclusive
}

/*************** Heap Helper functions ***************/

function buildMinHeap(nodes) {
    const size = nodes.length;
    
    for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
        minHeapify(nodes, size, i)
    }
    
    return nodes;
}

function minHeapify(nodes, size, i) {
    let smallest = i;
    let left = i * 2 + 1;
    let right = left + 1;

    if (right < size && nodes[right].distance < nodes[smallest].distance) {
        smallest = right
    }
    
    if (left < size && nodes[left].distance < nodes[smallest].distance) {
        smallest = left;
    }
    
    if (smallest !== i) {
        const temp = nodes[i];
        nodes[i] = nodes[smallest];
        nodes[smallest] = temp;
        minHeapify(nodes, size, smallest);
    }
    return nodes
    
}

function extractMin(nodes) {
    const minNode = nodes[0];
    nodes[0] = nodes.pop()
    let size = nodes.length - 1;
    minHeapify(nodes, size, 0);
    
    return minNode;
}

