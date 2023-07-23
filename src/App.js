import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';
import Search from './components/Search';
import Options from './components/Options'
import Header from './components/Header';
import ApiResultsPage from "./pages/ApiResultsPage";
import { useState } from "react";

function App() {
  let [showOptions, setShowOptions] = useState(false);

  return (
    <Router>
      <div className="App">
        <meta name="viewport" content="initial-scale=1, width=device-width" />
          <Routes>
            <Route path='/' element={<> <Header /><Search /> <Options showOptions={showOptions} setShowOptions={setShowOptions} /></>} />
            <Route path='/searchResults' element={<ApiResultsPage />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;

