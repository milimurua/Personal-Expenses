import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import Expenses from './pages/Expenses';

export default function App() {
  return (
    <Router>
      <AppNavbar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/wallet" element={<Wallet/>}/>
        <Route path="/expenses" element={<Expenses/>}/>
      </Routes>
    </Router>
  );
}