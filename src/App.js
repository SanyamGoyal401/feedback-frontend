import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './screens/login/Login.js';
import Signup from './screens/signup/Signup.js';
import Error from './screens/error/Error';
import Home from './screens/home/Home';
import AddModal from './modals/addProduct/AddModal';
import EditModal from './modals/editProduct/EditModal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<Error/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<AddModal/>}/>
        <Route path='/edit' element={<EditModal/>}/>

      </Routes>
    </Router>
  );
}

export default App;
