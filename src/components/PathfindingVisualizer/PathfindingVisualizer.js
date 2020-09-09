import React, { useState, useEffect } from 'react';
import Node from '../Node/Node.js';
import Toolbar from '../Toolbar/Toolbar.js';
import NodesIndex from '../NodesIndex/NodesIndex.js';

import dijkstra, { getNodesInShortestPathOrder } from '../../algorithms/dijkstra'

import './PathfindingVisualizer.css';

const START_NODE_ROW = 11;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 11;
const FINISH_NODE_COL = 50;

export default function PathfindingVisualizer(props) {
    
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    
    useEffect(() => {
        resetGrid();
    }, []);
    
    
    const resetGrid = () => {
        const grid = getInitialGrid();
        setGrid(grid);
    }
    
    const getInitialGrid = () => {
        const newGrid = [];
        for (let row = 0; row < 25; row++) {
            const currentRow = [];
            for (let col = 0; col < 60; col++) {
                currentRow.push(createNode(row, col));
            }
            newGrid.push(currentRow);
        }
        return newGrid;
    };
    
    const createRandomMaze = () => {
        const newGrid = [];
        for (let row = 0; row < grid.length; row++) {
            const currentRow = [];
            for (let col = 0; col < grid[row].length; col++) {
                const newNode = createNode(row, col);
                if (!newNode.isStart && !newNode.isFinish) {
                    document.getElementById(`node-${row}-${col}`).className = `node`;
                    newNode.isWall = Math.random() >= 0.7;
                    if (newNode.isWall) {
                        document.getElementById(`node-${row}-${col}`).className = `node node-wall`;
                    }
                }
                if (newNode.isStart) document.getElementById(`node-${row}-${col}`).className = 'node node-start';
                if (newNode.isFinish) document.getElementById(`node-${row}-${col}`).className = 'node node-finish';
                
                currentRow.push(newNode)
            }
            newGrid.push(currentRow)
        }
        setGrid(newGrid);
    }

    const createNode = (row, col) => {
        return {
            row,
            col,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            isShortestPath: false,
            previousNode: null,
        };
    };
    
    const clearBoard = () => {
        const newGrid = [];
        for (let row = 0; row < grid.length; row++) {
            const currentRow = [];
            for (let col = 0; col < grid[row].length; col++) {
                const newNode = createNode(row, col);
                if (!newNode.isStart && !newNode.isFinish) {
                    document.getElementById(`node-${row}-${col}`).className =
                        `node`;
                }
                if (newNode.isStart) document.getElementById(`node-${row}-${col}`).className = 'node node-start';
                if (newNode.isFinish) document.getElementById(`node-${row}-${col}`).className = 'node node-finish';
                
                currentRow.push(newNode)
            }
            newGrid.push(currentRow)
        }
        setGrid(newGrid)
    }

    const clearPath = () => {
        const newGrid = [];
        for (let row = 0; row < grid.length; row++) {
            const currentRow = [];
            for (let col = 0; col < grid[row].length; col++) {
                const node = grid[row][col]
                let newNode = createNode(row, col);
                newNode = { ...newNode, 
                    isStart: node.isStart, 
                    isFinish: node.isFinish, 
                    isWall: node.isWall, 
                }
                if (newNode.isStart) newNode.distance = 0;
                currentRow.push(newNode);
                document.getElementById(`node-${row}-${col}`).classList.remove('node-visited');
                document.getElementById(`node-${row}-${col}`).classList.remove('node-shortest-path');
                if (newNode.isFinish) document.getElementById(`node-${row}-${col}`).className = 'node node-finish'; 

            }
            newGrid.push(currentRow)
        }
        console.log(newGrid);
        setGrid(newGrid);
    }

    const changeButtonClass = () => {
        for (let i = 0; i < 4; i++) {
            if (i === 0) {
                document.getElementById('btn-0').classList.add('visualize-btn');
                document.getElementById('btn-0').classList.remove('visualize-btn-running');
            } else {
                document.getElementById(`btn-${i}`).classList.add('toolbar-btn');
                document.getElementById(`btn-${i}`).classList.remove('toolbar-btn-running');
            }
            document.getElementById(`btn-${i}`).disabled = false;
        }
    };

    const handleMouseDown = (row, col) => { 
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
        setMouseIsPressed(true);
    }

    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
    }

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    }


    const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length - 1) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                const startNodeClass = node.isStart ? 'node-start' : '';
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node node-visited ${startNodeClass}`;
            }, 10 * i);
        }
    };

    const animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                node.isShortestPath = true;
                const startNodeClass = node.isStart ? 'node-start' : '';
                const finishNodeClass = node.isFinish ? 'node-finish' : '';
                const arrowNodeClass = getArrowDirectionClass(node);
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node node-shortest-path ${startNodeClass} ${finishNodeClass} ${arrowNodeClass}`;
                setTimeout(() => {
                    if (!node.isFinish) {
                        document.getElementById(`node-${node.row}-${node.col}`).className =
                            `node node-shortest-path ${startNodeClass} ${finishNodeClass}`;
                    }
                }, 2 * i);
            }, 35 * i);
            if (i === nodesInShortestPathOrder.length - 1) {
                setTimeout(() => {
                    changeButtonClass();
                }, 50 * i);
            }
        }
    };

    const visualizeDijkstra = () => {
        clearPath();
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);        
    };
    
    const getNewGridWithWallToggled = (grid, row, col) => {
        if (grid[row][col].isStart || grid[row][col].isFinish) return grid;
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    };
    
    const getArrowDirectionClass = (node) => {
        const previousNode = node.previousNode;
        if (!previousNode) return '';
        const row = previousNode.row;
        const col = previousNode.col;
    
        const arrowClassName = (row - 1 === node.row)
            ? 'node-arrowup'
            : (col - 1 === node.col)
                ? 'node-arrowleft'
                : (row + 1 === node.row)
                    ? 'node-arrowdown'
                    : 'node-arrowright';
    
        return arrowClassName;
    }

    return (
        <div className="app-body">
            <Toolbar
                visualizeDijkstra={visualizeDijkstra}
                clearBoard={clearBoard} 
                clearPath={clearPath}
                createRandomMaze={createRandomMaze}
                ></Toolbar>
            <NodesIndex></NodesIndex>
            <div className="main-message">Create a Maze and visualize the shortest path with Dijkstra's Algorithm!</div>
            <table className="grid">
                <tbody>
                    {grid.map((row, rowIdx) => {
                        return <tr className="grid-row" key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const { row, col, isFinish, isStart, isWall, isVisited, isShortestPath } = node;
                                return <Node
                                    key={nodeIdx}
                                    row={row}
                                    col={col}
                                    isFinish={isFinish}
                                    isStart={isStart}
                                    isWall={isWall}
                                    isVisited={isVisited}
                                    isShortestPath={isShortestPath}
                                    mouseIsPressed={mouseIsPressed}
                                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                                    onMouseUp={handleMouseUp}
                                ></Node>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}
