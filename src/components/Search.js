import "../App.css";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
//import Card from '@mui/material/Card';

const Search = () => {
  let navigate = useNavigate();
  
   const handleSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: "/searchResults",
      search: "?search=" + e.target.password.value,
    });
}

  return (
    <>
    <div className="formContainer">
      <form className="searchForm" action="/searchResults" method="get" onSubmit={handleSubmit}>
        <InputBase type="text" autoComplete="off" name="password"
          sx={{ ml: 1, color: "", width: 3/4, height: 1/1 }}
          placeholder="Powered by OpenAI GPT"
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon className="icb" fontSize="medium" />
        </IconButton>    
      </form>
    </div>      
    </>
  );
};

export default Search;