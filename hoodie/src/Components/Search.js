import React from "react";
import '../Css/Search.css';
import {Dropdown} from 'react-bootstrap';
import Find from '../Asset/Find.svg';

function Search(){
    return(        
        <div className="search-master">
            <div className="search-wrap search-wrap-moon">
                <img src={Find} className="search-svg" ></img>
                <input className="search-input search-input-moon" placeholder="검색어를 입력하세요" onFocus={(e)=>{
                document.getElementsByClassName("search-wrap")[0].classList.add("search-wrap-border");
            }} ></input>
            </div>
        </div>
    )
}

export default Search;