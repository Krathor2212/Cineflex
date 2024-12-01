import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './components/Home';
import Detail from './components/Details';
import Disney from './components/Disney';
import Marvel from './components/Marvel';
import Pixar from './components/Pixar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        

        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/disney" element={<Disney />} />
        <Route path="/marvel" element={<Marvel />} />
        <Route path="/pixar" element={<Pixar />} />
      </Routes>
    </Router>
  );
}

export default App;
