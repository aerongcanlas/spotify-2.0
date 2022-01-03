import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
// import SpotifyAPI from './api/SpotifyAPI';

function App() {
   // const location = useLocation();
   // const [foo, setFoo] = useState(null);

   // useEffect(() => {
   //    fetch("/express_backend")
   //    .then((response) => response.status === 200 ? setFoo({data: response.express}) : null)
   //    .catch((error) => console.log(error))
   // }, [location]);

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
