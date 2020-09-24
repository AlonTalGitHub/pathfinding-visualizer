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
        <MenuItem id="btn-1" onClick={createRandomMaze}>Create Random Maze</MenuItem>
        <MenuItem id="btn-2" onClick={clearPath}>Clear Path</MenuItem>
        <MenuItem id="btn-3" onClick={clearBoard}>Clear Board</MenuItem>
      </Menu>
    </div>
  );
}

export default DropDownMenu;