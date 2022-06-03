import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function BoardReg(){
    const [value, setValue] = useState('');

  return (
    <ReactQuill theme="snow" value={value} onChange={setValue}/>
  );
}

export default BoardReg;