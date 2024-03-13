import Navbar from './components/header/Navbar'
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/login-register/SignUp';
import SignIn from './components/login-register/SignIn';
import AllTransactions from './components/AllTransactions/AllTransactions';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <> <Navbar /> <Home /> <Footer /> </> } />
        <Route path='/login' element={ <SignIn /> } />
        <Route path='/register' element={ <SignUp /> } />
        <Route path='/allTransactions' element={ <><Navbar /> <AllTransactions /><Footer /> </>} />
      </Routes>
    </div>
  );
}

export default App;
