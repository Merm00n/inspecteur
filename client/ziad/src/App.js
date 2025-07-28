import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Etablissement from './pages/gestion/etablissement/Etablissement';
import Prof from "./pages/gestion/prof/Prof"
import InfoProf from './pages/gestion/infoProf/InfoProf';
import Etablissement2 from './pages/consulter/etablissement/Etablissement';
import Prof2 from './pages/consulter/prof/Prof';
import InfoProf2 from './pages/consulter/infoProf/InfoProf';
import { Toaster } from "react-hot-toast";
import DisplayEmploi from './pages/consulter/infoProf/DisplayEmploi';
const routes = (
    <Router>
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path='/g_etablissement' exact element={<Etablissement />} />
        <Route path="/g_etablissement/:etabId/:etab" exact element={<Prof />} />
        <Route path='/g_etablissement/:etabId/:etab/:profId/:prof' exact element={<InfoProf />} />
        <Route path='/etablissements' exact element={<Etablissement2 />} />
        <Route path='/etablissements/:etabId/:etab' exact element={<Prof2 />} />
        <Route path='/etablissements/:etabId/:etab/:profId/:prof' exact element={<InfoProf2 />} />
        <Route path='/etablissements/:etabId/:etab/:profId/:prof/emploi' exact element={<DisplayEmploi />} />
      </Routes>
    </Router>

  )


const App = () => {
  return (

    <div className='h-screen'>
      <Toaster position="top-center" reverseOrder={false} />

      {routes}
    </div>
  );
}

export default App;
