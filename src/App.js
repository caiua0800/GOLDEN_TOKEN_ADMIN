import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './Components/SideBar';
import Home from './Components/Home/Home';
import Clients from './Components/Clients/Clients';
import Users from './Components/Users/Users';
import Contratos from './Components/Contratos/Contratos';
import Depositos from './Components/Depositos/Depositos';
import Login from './Components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import {store} from './redux/store'; // Import your Redux store
import { useEffect } from 'react';
import { loginUser } from './redux/actions';
import SignUpPage from './Components/CreateClient';
import Saques from './Components/Saques/Saques';
import Validacao from './Components/Validacao';
import CreateNews from './Components/CreateNews';
import Rendimento from './Components/Rendimento/Rendimentos';
import SaquesFeitos from './Components/SaquesFeitos';
import HomeFuncoes from './Components/Funcoes/Home/Home'
import DynamicChart from './Components/Funcoes/GraficoFisica/DynamicChart';
import HomeController from './Components/ControladorPlataforma.js/Home';
import { SpeedInsights } from "@vercel/speed-insights/react"
const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Usuários", path: "/usuarios" },
  { name: "Clientes", path: "/clientes" },
  { name: "Contratos", path: "/contratos" },
  { name: "Validar Depósitos", path: "/depositos" },
  { name: "Validar Saques", path: "/saques" },
  { name: "Saques Feitos", path: "/saquesFeitos" },
  { name: "Validação Doc.", path: "/validacao" },
  { name: "Notícias", path: "/noticias" },
  { name: "Rendimentos", path: "/rendimentos" },
  { name: "Controlador", path: "/controller" },
  { name: "Funções", path: "/funcoes" }
];

function App() {
  const currentUser = useSelector(state => state.userReducer.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser && localStorage.getItem('user')) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      dispatch(loginUser(storedUser.EMAIL, storedUser.PASS));
    }
  }, [currentUser, dispatch]);


  return (
    <Router>
      <div className="App">
      <SpeedInsights />
        {currentUser ? (
          <>
            <SideBar NAV_LINKS={NAV_LINKS} />
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/home" element={<Home />} /> */}
              <Route path="/clientes" element={<Clients />} />
              <Route path="/usuarios" element={<Users />} />
              <Route path="/contratos" element={<Contratos />} />
              <Route path="/depositos" element={<Depositos />} />
              <Route path="/noticias" element={<CreateNews />} />
              <Route path="/criarcliente" element={<SignUpPage />} />
              <Route path="/saques" element={<Saques />} />
              <Route path="/validacao" element={<Validacao />} />
              <Route path="/rendimentos" element={<Rendimento />} />
              <Route path="/saquesFeitos" element={<SaquesFeitos />} />
              <Route path="/funcoes" element={<HomeFuncoes />} />
              <Route path="/fisica" element={<DynamicChart />} />
              <Route path="/controller" element={<HomeController />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Root;
