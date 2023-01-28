
import './App.css';
import Appointment from './Pages/Appointment/Appointment';
import Dashboard from './Pages/Dashboard/Dashboard';
import User from './Pages/User/User';

// Importing Routing Component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Pets } from './Pages/Pets/Pets';
import Clinic from './Pages/Clinic/Clinic';
import { VirtualRoom } from './Pages/VirtualRoom/VirtualRoom';
import ChatRoom from './Pages/ChatRoom/ChatRoom'
import PetProfile from './Pages/PetProfile/PetProfile';
import Register from './Pages/Register/Register';

function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
              <Route exact path='/' element={<Dashboard/>} />
              <Route path='/register' element={<Register/>} />
              <Route exact path='/clinic' element={<Clinic/>} />
              <Route path='/users' element={<User/>} />
              <Route path='/schedule' element={<Appointment/>} />
              <Route path='/chatroom' element={<ChatRoom/>} />
              <Route path= '/virtualroom' element={<VirtualRoom/>}/>
              <Route path='/pets' element = {<Pets/>}/>
              <Route path='/pets/profile' element={<PetProfile/>}/>
            </Routes>
            
        </div>
    </Router>
    
  );
}

export default App;
