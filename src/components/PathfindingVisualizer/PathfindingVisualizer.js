import React, { useState, useEffect } from 'react';
import Node from '../Node/Node.js';
import Header from '../Header/Header.js';
import NodesIndex from '../NodesIndex/NodesIndex.js';

import dijkstra, { getNodesInShortestPathOrder } from '../../algorithms/dijkstra'

import './PathfindingVisualizer.css';

const WEB_SCREEN_ROWS = 25;
const WEB_SCREEN_COLUMNS = 60;
const MOBILE_SCREEN_ROWS = 20;
const MOBILE_SCREEN_COLUMNS = 20;

const START_NODE_ROW = 11;
const START_NODE_COL = 7;
const FINISH_NODE_ROW = 11;
const FINISH_NODE_COL = 53;

const MOBILE_START_NODE_ROW = 2;
const MOBILE_START_NODE_COL = 2;
const MOBILE_FINISH_NODE_ROW = 17;
const MOBILE_FINISH_NODE_COL = 17;

export default function PathfindingVisualizer(props) {
    
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    
    useEffect(() => {
        resetGrid();
    }, []);
    
    window.mobileCheck = function() {
        let check = false;
        (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;
        })(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
    
    const resetGrid = () => {
        const grid = getInitialGrid();
        setGrid(grid);
    }
    
    const getInitialGrid = () => {
        const newGrid = [];
        let rows
        let columns
        if (window.mobileCheck()) {
            rows = MOBILE_SCREEN_ROWS
            columns = MOBILE_SCREEN_COLUMNS
        } else {
            rows = WEB_SCREEN_ROWS
            columns = WEB_SCREEN_COLUMNS
        }
        for (let row = 0; row < rows; row++) {
            const currentRow = [];
            for (let col = 0; col < columns; col++) {
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
        if (window.mobileCheck()) {
            return {
                row,
                col,
                isStart: row === MOBILE_START_NODE_ROW && col === MOBILE_START_NODE_COL,
                isFinish: row === MOBILE_FINISH_NODE_ROW && col === MOBILE_FINISH_NODE_COL,
                distance: Infinity,
                isVisited: false,
                isWall: false,
                isShortestPath: false,
                previousNode: null,
            }
        } else {
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
        }
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
        const startNode = window.mobileCheck() ? grid[MOBILE_START_NODE_ROW][MOBILE_START_NODE_COL] : grid[START_NODE_ROW][START_NODE_COL]
        const finishNode = window.mobileCheck() ? grid[MOBILE_FINISH_NODE_ROW][MOBILE_FINISH_NODE_COL] : grid[FINISH_NODE_ROW][FINISH_NODE_COL]
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
            <Header
                visualizeDijkstra={visualizeDijkstra}
                clearBoard={clearBoard} 
                clearPath={clearPath}
                createRandomMaze={createRandomMaze}
                ></Header>
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
