import React, { useState } from "react";
import '../Css/Main.scss';
import {Dropdown} from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Main(props){

    const [comboToggle,setComboToggle]  = useState(false);
    const [bottomToggle,setBottomToggle] = useState(false);

    return(        
        <div className="main-master">
           
            <div className="main-header">
                <div className="main-header-util">
                    <ul className="main-header-ul">
                        <li className="main-header-ul-li" onClick={()=>{
                                setBottomToggle(!bottomToggle);
                            }}>
                            <div className="main-header-ul-li-trend">
                                <div className="main-header-ul-li-trend-image">
                                </div>
                                <p className="main-header-ul-li-trend-p main-header-ul-li-trend-p-moon">
                                    트렌딩
                                </p>
                            </div>
                        </li>
                        <li className="main-header-ul-li" onClick={()=>{
                                setBottomToggle(!bottomToggle);
                            }}>
                            <div className="main-header-ul-li-latest">
                                <div className="main-header-ul-li-latest-image">

                                </div>
                                <p className="main-header-ul-li-latest-p main-header-ul-li-latest-p-moon">
                                    최신
                                </p>
                            </div>
                        </li>
                        <div className={ bottomToggle ? "main-header-ul-bottom bottom-right" : "main-header-ul-bottom bottom-left"}></div>
                    </ul>
                    
                    <div className="main-header-util-span main-header-util-span-moon" onClick={()=>{
                        setComboToggle(!comboToggle);
                    }}>                           
                        <p className="main-header-util-span-p main-header-util-span-p-moon">이번 주</p>
                        <div className="main-header-util-span-image"></div>
                    </div>
                    <div className={  comboToggle ? "main-header-until-span-dropbox dropbox-show" : "main-header-until-span-dropbox dropbox-none"}>   
                        <ul className="main-header-until-span-dropbox-ul">
                            <li className="main-header-until-span-dropbox-ul-li">오늘</li>
                            <li className="main-header-until-span-dropbox-ul-li">이번 주</li>
                            <li className="main-header-until-span-dropbox-ul-li">이번 달</li>
                            <li className="main-header-until-span-dropbox-ul-li">올해</li>
                        </ul>     
                    </div>
                </div>
                <div className="main-header-option">
                    <div className="main-header-option-dot">                            
                    </div>
                </div>
            </div>
            <div className="main-body">
                <main className="main-body-wrap">
                    <div className="main-card">
                        {
                            props.boardList.map((value,index)=>{
                                return(
                                    <div className="main-card-block main-card-block-moon">
                                        <a className="main-card-a">
                                            <div className="main-card-block-image">
                                                <img src="../Asset/Hoodie.png"></img>
                                            </div>
                                        </a>
                                        <div className="main-card-block-main">
                                            <div className="main-card-block-main-title">
                                            {value.title}
                                            </div>
                                            <div className="main-card-block-main-content">
                                            {value.content}
                                            </div>
                                            <div className="main-card-block-main-date">
                                            {value.date}
                                            </div>
                                        </div>
                                        <div className="main-card-block-tag ">
                                            <div className="main-card-block-tag-id">
                                            {value.id}
                                            </div>
                                            <div className="main-card-block-tag-like">
                                                0
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Main;