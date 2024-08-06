import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Components/login';
import Entry from './Components/Entry';
import Chatroom from './Components/Chatroom';
function App() {
  return (
    
        
      <>
          <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Login />}/>

                  <Route path="/Entry" element={<Entry />}/>

                  <Route path="/Chatroom" element={<Chatroom />}/>

                </Routes>
          </BrowserRouter>
          
      </>
        
     
  );
}

export default App;
