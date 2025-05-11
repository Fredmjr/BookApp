import React, {useRef} from 'react'
import { Link } from 'react-router-dom';


const Upload = () => {
  const textareaRef = useRef(null);
  
  const handleInput = () => {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
  };


  return (
    <>
    <p>Upload Page</p>

    <textarea className="title" ref={textareaRef } onInput={handleInput} placeholder="#Book Title..."></textarea>
    <button>Save</button>     
    <button><Link to="/Home"><span>Discard</span></Link></button>
    </>
  )
}

export default Upload