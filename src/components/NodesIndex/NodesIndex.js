import React from 'react';

import '../Node/Node.css';
import './NodesIndex.css';


export default function NodesIndex(props) {

    return (
      <div id='mainText'>
        <ul className="icon-list">
          <li className="icon-text">
            <div className="node-icon node-start icon"></div> Start Node</li>
          <li className="icon-text">
            <div className="node-icon node-finish icon"></div> Target Node</li>
          <li className="icon-text">
            <div className="node-icon icon"></div> Unvisited Node</li>
          <li className="icon-text">
            <div className="node-icon node-visited icon"></div> Visited Node</li>
          <li className="icon-text">
            <div className="node-icon node-shortest-path icon"></div> Route Node</li>
          <li className="icon-text">
            <div className="node-icon node-wall icon"></div> Wall Node</li>
        </ul>
      </div>
    );
}


