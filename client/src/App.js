import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Cart from './components/Cart/Cart';
import TemplateProvider from './templates/TemplateProvider';
import ContextProvider from './context/ContextProvider';
import DetailView from './components/ItemDetails/DetailView';
import { Box } from '@material-ui/core';
import PlaceOrder from './components/Order/PlaceOrder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    < >
      <TemplateProvider>
        <ContextProvider>
          <Router>
            <Header />
            <ToastContainer
              hideProgressBar
              autoClose={1500} />
            <Box style={{ marginTop: 54 }}>
              <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/cart" exact element={<Cart />} />
                <Route path="/product/:id" exact element={<DetailView />} />
                <Route path="/order" exact element={<PlaceOrder />} />
              </Routes>
            </Box>
          </Router>
        </ContextProvider>
      </TemplateProvider>

    </>
  );
}

export default App;
