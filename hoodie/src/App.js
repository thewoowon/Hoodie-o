import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';
import Search from './Components/Search';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link,Route,Routes,Switch } from 'react-router-dom';
import { useNavigate } from "react-router";
import { useMediaQuery} from 'react-responsive';

function App() {
  let navigate = useNavigate();
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [signInPage, setSignInPage] = useState(false);
  let [inputLogInEmail, setInputLogInEmail] = useState("");
  let [inputSignUpEmail, setInputSignUpEmail] = useState("");

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
          <Route path="/" element={<Main boardList={boardList}></Main>}>
          </Route>
          <Route path="/search" element={<Search></Search>}>
          </Route>
          <Route path="/current" element={<Main boardList={boardList}></Main>}>
          </Route>
          <Route path="/:id" element={<Main boardList={boardList}></Main>}></Route>
        </Routes>
        <Footer></Footer>
       <Modal ariaHideApp={false} style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(1, 1, 1, 0.75)',
        },
        content: {
          position: 'absolute',
          transform:'translate(-50%,-50%) scale(0.5)',
          top:'50%',
          left:'50%',
          background: '#111111',
          width:'600px',
          height:'480px',
          border:'none',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '0px',
          display:'flex',
          justifyContent:'center',
          alignItems:'center'          
        },
      }} isOpen={modalIsOpen}>

        
        <div className="modal-left">
          <div className="modal-left-wrap-top">
            <div className="modal-left-wrap-top-image"></div>
          </div>
          <div className="modal-left-wrap-bottom">
            <p className="modal-left-wrap-bottom-p">환영합니다!</p>
          </div>
        </div>
        <div className="modal-right">
          {
            signInPage
            ?
            <div className="modal-right-wrap">
            <div className="modal-right-1" >
              <p className="modal-right-1-p" onClick={
              ()=>{
                setModalIsOpen(false)
              }
            }>X</p>
            </div>
            <div className="modal-right-2">
              <p className="modal-right-2-p">회원가입</p>
            </div>
            <div className="modal-right-3">
              <p className="modal-right-3-p">이메일로 회원가입</p>
            </div>
            <div className="modal-right-4">
              <input className="modal-right-4-input" placeholder="이메일을 입력하세요." onChange={(e)=>{
                setInputSignUpEmail(e.target.value);
              }}></input>
              <a className="modal-right-4-a" href="#" 
              onClick={()=>{axios.post('http://localhost:4000/SignUp',{
                                    email : inputSignUpEmail,
                                }).then((response)=>{
                                  if(response.data.result)
                                  {
                                    alert('입력하신 이메일로 인증 링크를 발송했습니다. 인증을 진행해주세요.');
                                    setModalIsOpen(false);
                                  }
                                  else{
                                    alert('이메일이 이미 존재하거나 올바르지 않습니다.');
                                  }
                                }).catch((err)=>{
                                    console.log(err);
                                })
                            }}>회원가입
              </a>
            </div>
            <div className="modal-right-5">
              <p className="modal-right-5-p">소셜 계정으로 회원가입</p>
            </div>
            <div className="modal-right-6">
              <p className="modal-right-6-p">준비 중입니다.</p>
            </div>
            <div className="modal-right-7">
              <p className="modal-right-7-p">계정이 이미 있으신가요?</p>
              <a className="modal-right-7-a" href="#" onClick={()=>{
                setSignInPage(false);
              }}>로그인</a>
            </div>
          </div>
            :
            <div className="modal-right-wrap">
            <div className="modal-right-1" >
              <p className="modal-right-1-p" onClick={
              ()=>{
                setModalIsOpen(false)
              }
            }>X</p>
            </div>
            <div className="modal-right-2">
              <p className="modal-right-2-p">로그인</p>
            </div>
            <div className="modal-right-3">
              <p className="modal-right-3-p">이메일로 로그인</p>
            </div>
            <div className="modal-right-4">
              <input className="modal-right-4-input" placeholder="이메일을 입력하세요." onChange={(e)=>{
                setInputLogInEmail(e.target.value);
              }}></input>
              <a className="modal-right-4-a" href="#" onClick={()=>{
                        //여기서 jwt database 조회 후 jwt 생성 후 쿠키에 실어 보냄
                        axios.post('http://localhost:4000/Login',{
                            email : inputLogInEmail,
                        }).then((response)=>{
                          if(response.data.token)
                          {
                            alert('로그인이 완료되었습니다.');
                            setModalIsOpen(false);
                          }
                        }).catch((err)=>{
                          alert('로그인이 실패');
                            console.log(err);
                        })

                    }}>로그인</a>
            </div>
            <div className="modal-right-5">
              <p className="modal-right-5-p">소셜 계정으로 로그인</p>
            </div>
            <div className="modal-right-6">
              <p className="modal-right-6-p">준비 중입니다.</p>
            </div>
            <div className="modal-right-7">
              <p className="modal-right-7-p">아직 회원이 아니신가요?</p>
              <a className="modal-right-7-a" href="#" onClick={()=>{
                setSignInPage(true);
              }}>회원가입</a>
            </div>
          </div>
          }
        </div>
      </Modal>
    </div>
  );
}

export default App;
