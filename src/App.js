import './App.css';
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import BidProduct from './components/BidProduct';
import Products from './components/Products';
import Nav from './components/Nav';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('https://auction-api-micky.herokuapp.com');

function App() {
  return (
    <Router>
      <div>
        <Nav/>
        <Routes>
           <Route path="/" element = {<Home />} />
           <Route path="/products" element = {<Products />} />
           <Route
             path="/products/add" element = {<AddProduct socket={socket}/>} 
            />
           
           {/* Uses dynamic routing */}
           <Route
             path="/products/bid/:name/:price" element = {<BidProduct socket={socket}/>} 
            />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
