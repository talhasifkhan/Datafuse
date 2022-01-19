import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';
import Search from './components/Search';
import Header from './components/Header';
import ApiResultsPage from "./pages/ApiResultsPage";

function App() {
  return (
    <Router>
      <div className="App">
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <Header />
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/searchResults' element={<ApiResultsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;

