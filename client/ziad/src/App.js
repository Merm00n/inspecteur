import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/signUp/SignUp';
import Login from './pages/login/Login';
  const routes = (
    <Router>
      <Routes>
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/" exact element={<Login />} />
      </Routes>
    </Router>

  )


const App = () => {
  return (
    <div>
      {routes}
    </div>
  );
}

export default App;
