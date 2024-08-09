import { BrowserRouter as Router, } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import Public from './Routes/Public';
import AuthProvider from './Context/AuthContext';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <NavBar />
          <Public />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
