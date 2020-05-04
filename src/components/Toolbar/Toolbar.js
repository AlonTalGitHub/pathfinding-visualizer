import React, { useState, useEffect } from 'react';

import './Toolbar.css';


export default function Toolbar(props) {

    const { visualizeDijkstra, clearBoard, clearPath, createRandomMaze } = props;
    
    const visualizeAlgorithm = () => { 
        changeButtonClass();
        visualizeDijkstra(); 
    };

    const changeButtonClass = () => {
        for (let i = 0; i < 4; i++) {
            if (i === 0) {
                document.getElementById('btn-0').classList.add('visualize-btn-running');
                document.getElementById('btn-0').classList.remove('visualize-btn');
            } else {
                document.getElementById(`btn-${i}`).classList.add('toolbar-btn-running');
                document.getElementById(`btn-${i}`).classList.remove('toolbar-btn');
            }
            document.getElementById(`btn-${i}`).disabled = true;
        }
    };

    return (
        <div className="toolbar-container">
            <div className="main-logo">Pathfinding Visualizer</div>
            <div className="toolbar-manu">
                <button id="btn-0" className="visualize-btn" onClick={visualizeAlgorithm}>Visualize Dijkstra's!</button>
                <button id="btn-1" className="toolbar-btn" onClick={clearBoard}>Clear Board</button>
                <button id="btn-2" className="toolbar-btn" onClick={clearPath}>Clear Path</button>
                <button id="btn-3" className="toolbar-btn" onClick={createRandomMaze}>Create Random Maze</button>
            </div>
        </div>
    );
}











