import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
// import SpotifyAPI from './api/SpotifyAPI';

function App() {
   return (
      <div>
         <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/api" element={<API />}/> */}
         </Routes>
      </div>
   );
}

export default App;
