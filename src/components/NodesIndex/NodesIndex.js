import React from 'react';
import Node from '../Node/Node.js';

import '../Node/Node.css';
import './NodesIndex.css';


export default function NodesIndex(props) {

    return (
        <div id='mainText'>
        <ul>
          <li className="icon-text">
          <div className="node node-start icon"></div> Start Node</li>
          <li className="icon-text">
            <div className="node node-finish icon"></div> Target Node</li>
          <li className="icon-text">
            <div className="node icon"></div> Unvisited Node</li>
          <li className="icon-text">
            <div className="node node-visited icon"></div> Visited Nodes</li>
          <li className="icon-text">
            <div className="node node-shortest-path icon"></div> Shortest-path Node</li>
          <li className="icon-text">
            <div className="node node-wall icon"></div> Wall Node</li>
        </ul>
      </div>
    );
}


