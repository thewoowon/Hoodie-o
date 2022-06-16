import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';
import Search from './Components/Search';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link,Route,Routes,Switch, useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery} from 'react-responsive';
import { history } from './_helpers';
import { PrivateRoute } from './_components';
import ModalComponent from './Components/Modal';

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [boardList,setBoardList] = useState([]);

  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 }) // 일반 데스크탑, 랩탑
  const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 }) // 와이드 스크린

  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 }) // 태블릿 랩탑
  const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 })

  const isPortrait = useMediaQuery({ orientation: 'portrait' })
  const isRetina = useMediaQuery({ minResolution: '2dppx' })


  useEffect(()=>{
    axios.get('http://localhost:4000/').then((response)=>{
      if(response.data)
      {
        setBoardList([...response.data.result]);
      }
    })
  },[])

  return (
    <div className="App">
       <Header setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen}></Header>
        <Routes>
          <Route path="/" element={<PrivateRoute><Main boardList={boardList}></Main></PrivateRoute> }>
          </Route>
          <Route path="/search" element={<Search></Search>}>
          </Route>
          <Route path="/current" element={<Main boardList={boardList}></Main>}>
          </Route>
          <Route path="/:id" element={<Main boardList={boardList}></Main>}></Route>
        </Routes>
        <Footer></Footer>
        <ModalComponent modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}></ModalComponent>
    </div>
  );
}

export default App;
