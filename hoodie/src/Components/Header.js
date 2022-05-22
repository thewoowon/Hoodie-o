import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import '../Css/Header.scss';
import Find from '../Asset/Find.svg';

function Header(props){
    let navigate = useNavigate();
    let [loginToggle,SetLoginToggle] = useState(false);
    let [loginHeaderToggle,SetLoginHeaderToggle] = useState(false);

    useEffect(()=>{
        //여기서는 session값을 요청하고 읽어와야 합니다.
        
    },[])

    return(
        <div className="header-master">
            <div className="header-wrap">
                <div className="header-logo">
                    <a className="header-logo-image" href="#" onClick={()=>{
                        navigate("/")
                    }}></a>
                </div>
                {
                    loginHeaderToggle
                    ?
                    <div className="header-util">
                        <div className="header-switch-body-color"></div>
                        <div className="header-scope"></div>
                        <div className="header-new-script">
                            <p className="header-new-script-p">새 글 작성</p>
                        </div>
                        <div className="header-my-info">
                            <div className="header-my-info-image">
                                <div className="header-my-info-image-div"></div>
                            </div>
                            <div className="header-my-info-chevron">
                                <div className="header-my-info-chevron-div" onClick={()=>{

                                }}></div>
                            </div>
                            {
                                loginToggle 
                                ?
                                <div>인적사항 토글 박스</div>
                                :
                                null
                            }
                        </div>
                    </div>
                    :
                    <div className="header-util">
                        <div className="header-switch-body-color-wrap">
                            <a className="header-switch-body-color moon" href="#" onClick={(e)=>{
                                
                                if(e.target.classList[1] === "moon")
                                {
                                    document.getElementsByClassName('header-switch-body-color')[0].classList.remove("moon");
                                    document.getElementsByClassName('header-switch-body-color')[0].classList.add("sun");
                                    document.getElementsByTagName("body")[0].style.backgroundColor = "rgba(246,246,246,1)";
                                    document.getElementsByClassName("header-new-script-auth")[0].classList.remove("header-new-script-auth-moon");
                                    document.getElementsByClassName("header-new-script-auth")[0].classList.add("header-new-script-auth-sun");

                                    if(window.location.pathname.indexOf("search")>-1)
                                    {
                                        document.getElementsByClassName('search-wrap')[0].classList.remove("search-wrap-moon");
                                        document.getElementsByClassName('search-wrap')[0].classList.add("search-wrap-sun"); 
                                        document.getElementsByClassName('search-input')[0].classList.remove("search-input-moon");
                                        document.getElementsByClassName('search-input')[0].classList.add("search-input-sun"); 
                                    }
                                    else if(window.location.pathname.indexOf("current")>-1)
                                    {

                                    }
                                    else
                                    {
                                        document.getElementsByClassName('main-header-util-span')[0].classList.remove("main-header-util-span-moon");
                                        document.getElementsByClassName('main-header-util-span')[0].classList.add("main-header-util-span-sun");
    
                                        document.getElementsByClassName('main-header-util-span-p')[0].classList.remove("main-header-util-span-p-moon");
                                        document.getElementsByClassName('main-header-util-span-p')[0].classList.add("main-header-util-span-p-sun");
    
                                        document.getElementsByClassName('main-header-ul-li-latest-p')[0].classList.remove("main-header-ul-li-latest-p-moon");
                                        document.getElementsByClassName('main-header-ul-li-latest-p')[0].classList.add("main-header-ul-li-latest-p-sun");
    
                                        document.getElementsByClassName('main-header-ul-li-trend-p')[0].classList.remove("main-header-ul-li-trend-p-moon");
                                        document.getElementsByClassName('main-header-ul-li-trend-p')[0].classList.add("main-header-ul-li-trend-p-sun");  

                                        let mainCard = document.getElementsByClassName('main-card-block');

                                        for (let index = 0; index < mainCard.length; index++) {
                                            const element = mainCard[index];
                                            element.classList.remove("main-card-block-moon");
                                            element.classList.add("main-card-block-sun");
                                        }
                                    }
                                }
                                else
                                {
                                    document.getElementsByClassName('header-switch-body-color')[0].classList.remove("sun");
                                    document.getElementsByClassName('header-switch-body-color')[0].classList.add("moon");
                                    document.getElementsByTagName("body")[0].style.backgroundColor = "black";
                                    document.getElementsByClassName("header-new-script-auth")[0].classList.remove("header-new-script-auth-sun")
                                    document.getElementsByClassName("header-new-script-auth")[0].classList.add("header-new-script-auth-moon")


                                    if(window.location.pathname.indexOf("search")>-1)
                                    {
                                        document.getElementsByClassName('search-wrap')[0].classList.remove("search-wrap-sun");
                                        document.getElementsByClassName('search-wrap')[0].classList.add("search-wrap-moon"); 
                                        document.getElementsByClassName('search-input')[0].classList.remove("search-input-sun");
                                        document.getElementsByClassName('search-input')[0].classList.add("search-input-moon"); 
                                    }
                                    else if(window.location.pathname.indexOf("current")>-1)
                                    {

                                    }
                                    else
                                    {
                                        document.getElementsByClassName('main-header-util-span')[0].classList.remove("main-header-util-span-sun");
                                        document.getElementsByClassName('main-header-util-span')[0].classList.add("main-header-util-span-moon");
    
                                        document.getElementsByClassName('main-header-util-span-p')[0].classList.remove("main-header-util-span-p-sun");
                                        document.getElementsByClassName('main-header-util-span-p')[0].classList.add("main-header-util-span-p-moon");
    
                                        document.getElementsByClassName('main-header-ul-li-latest-p')[0].classList.remove("main-header-ul-li-latest-p-sun");
                                        document.getElementsByClassName('main-header-ul-li-latest-p')[0].classList.add("main-header-ul-li-latest-p-moon");
    
                                        document.getElementsByClassName('main-header-ul-li-trend-p')[0].classList.remove("main-header-ul-li-trend-p-sun");
                                        document.getElementsByClassName('main-header-ul-li-trend-p')[0].classList.add("main-header-ul-li-trend-p-moon");

                                        let mainCard = document.getElementsByClassName('main-card-block');

                                        for (let index = 0; index < mainCard.length; index++) {
                                            const element = mainCard[index];
                                            element.classList.remove("main-card-block-sun");
                                            element.classList.add("main-card-block-moon");
                                        }
                                    }
                                }
                                //클릭 하고 css가 바뀌어야하므로
                            }}></a>
                        </div>
                        <div className="header-scope-wrap">

                            <img src={Find} className="header-scope" alt="Find" onClick={()=>{
                                navigate("./search")
                            }}/>
                        </div>
                        <a className="header-new-script-auth header-new-script-auth-moon" href="#" onClick={()=>{
                            props.setModalIsOpen(!props.modalIsOpen) //현재 모달의 보이고 안보이고를 설정
                        }}>
                            로그인
                        </a>
                    </div>

                }
            </div>
        </div>
    )
}

export default Header;