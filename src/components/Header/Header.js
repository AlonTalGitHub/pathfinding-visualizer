import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import DropDownMenu from "../DropDownMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  findRouteBtn: {
    backgroundColor: "#1abc9c",
    "&:hover": {
        backgroundColor: "#179B91",
    },
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
  isRunning,
}) => {
  const classes = useStyles();

  const visualizeAlgorithm = () => {
    visualizeDijkstra();
  };

  return (
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            disabled={isRunning}
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
          <Button className={classes.findRouteBtn} id="btn-0" color="inherit" onClick={visualizeAlgorithm} disabled={isRunning}>
            Find Route!
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;