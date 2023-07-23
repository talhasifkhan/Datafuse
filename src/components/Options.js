import React, { Fragment } from "react";
import { Button, Select } from "@mui/material";
import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import "../App.css";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { store } from "../state/store";

const Options = () => {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleSlider = (value) => {
    store.dispatch({type: 'changeAmount', payload: value})
  };

  const handleTimeFrame = (value) => {
    store.dispatch({type: 'changeTimeFrame', payload: value})
  };

  const resultAmount = useSelector((state) => state.resultAmount);
  const timeFrame = useSelector((state) => state.timeFrame)

  //Options Button
  return (
    <div className="optionsContainer">
      <Button variant="contained" onClick={handleClickOpen}>
      <SettingsIcon />
        Options
      </Button>
      <Dialog
        disableEscapeKeyDown
        PaperProps={{style: {
          backgroundColor: '#41424C',
        },}}
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth="true"
      >
        <DialogTitle sx={{fontSize: 50, color: "white", textAlign:"center", fontFamily:"inherit"}}>Additional Options</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 3, minWidth: 120 }} >
              <DialogTitle sx={{fontSize: 30, color: "white", fontFamily:"inherit"}}>Amount of Results</DialogTitle>
              <Slider
                sx={{ width: 1/1 }}
                aria-label="Results"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={3}
                max={5}
                value={resultAmount}
                onChange={(e) => handleSlider(e.target.value)}
              />
            </FormControl>
          </Box>
          <DialogTitle sx={{textAlign: "center", color: "white", fontSize:30, fontFamily:"inherit"}}>Time Frame</DialogTitle>
          <FormControl fullWidth>
            <Select
              value={timeFrame}
              onChange={(e) => handleTimeFrame(e.target.value)}
              autoWidth
              label="Time Frame"
            >
              <MenuItem value="">
                <em>-</em>
              </MenuItem>
              <MenuItem value={"1d"}>Past Day</MenuItem>
              <MenuItem value={"7d"}>Past Week</MenuItem>
              <MenuItem value={"1m"}>Past Month</MenuItem>
              <MenuItem value={"12m"}>Past Year</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Options;
