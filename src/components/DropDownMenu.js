import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from '@material-ui/core/MenuItem';

const DropDownMenu = ({
  visualizeDijkstra,
  createRandomMaze,
  clearPath,
  clearBoard,
}) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateRandomMaze = () => {
    createRandomMaze()
    handleClose()
  };

  const handleClearPath = () => {
    clearPath()
    handleClose()
  };

  const handleClearBoard = () => {
    clearBoard()
    handleClose()
  };

  return (
    <div>
      <MenuIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem id="btn-1" onClick={handleCreateRandomMaze}>Create Random Maze</MenuItem>
        <MenuItem id="btn-2" onClick={handleClearPath}>Clear Path</MenuItem>
        <MenuItem id="btn-3" onClick={handleClearBoard}>Clear Board</MenuItem>
      </Menu>
    </div>
  );
}

export default DropDownMenu;