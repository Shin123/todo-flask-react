import logo from './logo.svg';
import './App.css';
import { TodoPage } from './Pages/TodoPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Show } from './Pages/Show';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' exact element={<TodoPage />} />
          <Route path='/:id' element={<Show />} />
        </Routes>
      </Router>

      <ToastContainer position='bottom-right' />
    </div>
  );
}

export default App;
