import React from 'react';

import './Node.css';


export default function Node(props) {

    const {
        row,
        col,
        isFinish,
        isStart,
        isWall,
        isVisited,
        isShortestPath,
        onMouseDown,
        onMouseEnter,
        onMouseUp,
    } = props;
    const startClassName = isStart ? 'node-start' : '';
    const finishClassName = isFinish ? 'node-finish' : '';
    const wallClassName = isWall ? 'node-wall' : '';
    const visitedClassName = isVisited ? 'node-visited' : '';
    const shortestPathClassName = isShortestPath ? 'node-shortest-path' : '';

    return (
        <td
            id={`node-${row}-${col}`}
            className={`node ${startClassName} ${finishClassName} ${wallClassName} ${visitedClassName} ${shortestPathClassName}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}
        ></td>
    );
}