import React, { useState, useEffect, Fragment } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import "../App.css";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
//import Card from '@mui/material/Card';

export const Options = (props) => {
  let [showOptions, setShowOptions] = useState(false);
  //Options Button
  return (
    <div className="optionsContainer">
      <SettingsIcon onClick={() => {
          setShowOptions(!showOptions);
        }}
        fontSize="large"
      >
        Options
      </SettingsIcon>
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
              x
            </button>
            <Slider
              aria-label="Results"
              defaultValue={5}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={3}
              max={10}
            />
            <Switch />
            <Switch />
            <Switch />
            <Switch />
            <Switch />
          </div>
        </Fragment>
      )}
    </div>
  );
};

const Search = (props) => {
  //let [showOptions, setShowOptions] = useState(false);

  return (
    <>
    <div className="formContainer">
      <form className="searchForm" action="/searchResults" method="get">
        <InputBase type="text" name="search"
          sx={{ ml: 1, color: "", width: 3/4, height: 1/1 }}
          placeholder="Search..."
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon fontSize="large" />
        </IconButton>
        <IconButton>
          <Options />
        </IconButton>
        
      </form>
    </div>
      {/* <div className="formContainer">
        <form className="searchForm" action="/searchResults" method="get">
          <TextField
            size="small"
            name="search"
            className="searchBar"
            type="text"
            placeholder="Search..."
            fullWidth
          />
          <Button size="medium" variant="contained" type="submit">
            Search
          </Button>
        </form>
      </div> */}
      
    </>
  );
};

export default Search;

//   && <Button onClick={()=>{ setShowOptions(!showOptions) }} size="small" variant="contained" type="button">x</Button>

//<form action="/api/nytresponse/" method="get">
/*onSubmit={handleSubmit}>
                <input name="search" className="searchBar" type="text" placeholder="Search.." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>*/

//let [searchQuery, setSearchQuery] = useState('');
/*    let handleSubmit = (e) => {
        console.log('A name was submitted: ' + searchQuery);
        e.preventDefault();
    }*/

/*
                <Button onClick={()=>{ setShowOptions(!showOptions) }} size="medium" variant="contained" type="button">Options</Button>

*/

/*
{ showOptions && 
                    <Fragment>
                        <div className='overlay'>
                            <button className='overlayButton' onClick={()=>{ setShowOptions(!showOptions) }} size="small" variant="contained" type="button">x</button>
                        </div>

                    </Fragment>
                }



*/
