
import './App.css';
import Appointment from './Pages/Appointment/Appointment';
import Dashboard from './Pages/Dashboard/Dashboard';
import User from './Pages/User/User';

// Importing Routing Component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatRoom } from './Pages/ChatRoom/ChatRoom';
import { Pets } from './Pages/Pets/Pets';
function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
              <Route exact path='/' element={<Dashboard/>} />
              <Route path='/users' element={<User/>} />
              <Route path='/schedule' element={<Appointment/>} />
              <Route path='/chatroom' element={<ChatRoom/>} />
              <Route path='/pets' element = {<Pets/>}/>
            </Routes>
            
        </div>
    </Router>
    
  );
}

export default App;
