import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Etablissement from './pages/gestion/etablissement/Etablissement';
import Prof from "./pages/gestion/prof/Prof"
import InfoProf from './pages/gestion/infoProf/InfoProf';
  const routes = (
    <Router>
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path='g_etablissement' exact element={<Etablissement />} />
       <Route path='g_etablissement/:etab' exact element={<Prof />} />
        <Route path='g_etablissement/:etab/:prof' exact element={<InfoProf />} />


      </Routes>
    </Router>

  )


const App = () => {
  return (
    <div className='h-screen'>
      {routes}
    </div>
  );
}

export default App;
