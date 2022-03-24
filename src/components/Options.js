import React, { useState, useEffect, Fragment,useCallback } from "react";
import { Button } from "@mui/material";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import IconButton from '@mui/material/IconButton';
import "../App.css";
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector, useDispatch } from "react-redux"
import { actionCreators } from "../state/index"
import { bindActionCreators } from "redux";
//import Card from '@mui/material/Card';

const Options = ({ showOptions, setShowOptions }) => {
    const handleSlider = (value) => {
      changeAmount(value);
      console.log("Value changed to " + state.result);
    }

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { changeAmount } = bindActionCreators(actionCreators, dispatch);
  
    //Options Button
    return (
      <div className="optionsContainer">
        <Button variant="contained" onClick={() => {
            setShowOptions(!showOptions);
          }}
          fontSize="medium">
        <SettingsIcon /> 
        Options
        </Button>
        {showOptions && (
          <Fragment>
            <div className="overlay">
              <button
                className="overlayButton"
                onClick={() => {
                  setShowOptions(!showOptions);
                }}
                size="small"
                variant="contained"
                type="button"
              >
                X
              </button>
              <h1 className="optionsTitle">Options</h1>
              <h3 className="label1">Amount of Results</h3>
              <Slider
              sx={{ width: 1/2 }}
                aria-label="Results"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={3}
                max={10}
                value={state.result}
                onChange={e => handleSlider(e.target.value)}
              />
              <h3 className="label1">News Source Type</h3>
              <div className="switches">
              <Switch />
              <Switch />
              <Switch />
              <Switch />
              <Switch />
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  };

export default Options;