import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Landingpage from './Pages/Landingpage';
import Header from './Components/Header'
import Footer from './Components/Footer'
import History from './Pages/History';


function App() {
  return (
    <div className="App">
      <Header></Header>
     <Routes>
        <Route path='' element={<Landingpage></Landingpage>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/watch-history' element={<History></History>}></Route>
     </Routes>
      <Footer></Footer>
     </div>
  );
}

export default App;
