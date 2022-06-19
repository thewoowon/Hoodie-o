import React from "react";
import Modal from 'react-modal';
import {useEffect,useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../_helpers';
import { authActions } from '../_store';


function ModalComponent(props){
    let [inputLogInEmail, setInputLogInEmail] = useState("");
    let [inputSignUpEmail, setInputSignUpEmail] = useState("");
    const [signInPage, setSignInPage] = useState(false);
    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.user);
    const authError = useSelector(x => x.auth.error);

    return(
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
          }} isOpen={props.modalIsOpen}>
    
            
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
                props.signInPage
                ?
                <div className="modal-right-wrap">
                <div className="modal-right-1" >
                  <p className="modal-right-1-p" onClick={
                  ()=>{
                    props.setModalIsOpen(false)
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
                                        props.setModalIsOpen(false);
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
                    props.setModalIsOpen(false)
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

                            //dispatch(authActions.login({ inputLogInEmail }));

                            axios.post('http://localhost:4000/Login',{
                                email : inputLogInEmail,
                            }).then((response)=>{
                              if(response.data.token)
                              {
                                alert('로그인이 완료되었습니다.');
                                //여기서 토큰을 발급받고 저장한다.
                                // Token 저장 위치는
                                localStorage.setItem("token",response.data.token);
                                props.setModalIsOpen(false);
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
    )
}

export default ModalComponent;