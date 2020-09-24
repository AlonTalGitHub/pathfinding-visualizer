import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

import DropDownMenu from "../DropDownMenu";
// import "./Header.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({
  visualizeDijkstra,
  clearBoard,
  clearPath,
  createRandomMaze,
}) => {
  const classes = useStyles();

  const visualizeAlgorithm = () => {
    changeButtonClass();
    visualizeDijkstra();
  };

  const changeButtonClass = () => {
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        document.getElementById("btn-0").classList.add("visualize-btn-running");
        document.getElementById("btn-0").classList.remove("visualize-btn");
      } else {
        document
          .getElementById(`btn-${i}`)
          .classList.add("toolbar-btn-running");
        document.getElementById(`btn-${i}`).classList.remove("toolbar-btn");
      }
      document.getElementById(`btn-${i}`).disabled = true;
    }
  };

  //   return (
  //     <div className="toolbar-container">
  //       <div className="main-logo">Route Finder</div>
  //       <div className="toolbar-manu">
  //         <button
  //           id="btn-0"
  //           className="visualize-btn"
  //           onClick={visualizeAlgorithm}
  //         >
  //           Visualize Dijkstra's!
  //         </button>
  //         <button id="btn-1" className="toolbar-btn" onClick={clearBoard}>
  //           Clear Board
  //         </button>
  //         <button id="btn-2" className="toolbar-btn" onClick={clearPath}>
  //           Clear Path
  //         </button>
  //         <button id="btn-3" className="toolbar-btn" onClick={createRandomMaze}>
  //           Create Random Maze
  //         </button>
  //       </div>
  //     </div>
  //   );
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <DropDownMenu
              clearBoard={clearBoard}
              clearPath={clearPath}
              createRandomMaze={createRandomMaze}
            />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Route Finder
          </Typography>
          <Button id="btn-0" color="inherit" onClick={visualizeAlgorithm}>
            Find Route!
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
