import React, { useState } from 'react';
import axios from 'axios';

const Home = (props) => {
  const BACKEND_URL = props.BACKEND_URL;
  let [message, setMessage] = useState({});
  let [url, setUrl] = useState("");
  let [load, setLoad] = useState(true);
  const submitHandler = async (event) => {
    setLoad(true);
    event.preventDefault();
    const link = event.target.url.value;
    const id = Date.now().toString().slice(-10);
    await axios.post(`${BACKEND_URL}/new`, {
      url: link,
      id: id
    }) 
    .then((response) => {
      if(response.data.success===true){
        setMessage({
          link: `${window.location.href}${id}`,
          txt: `${window.location.href}${id}`
        })
      }
      else{
        setMessage({
          link: '#',
          txt: 'Sorry, some error occurred.'
        })
      }
    })
    .catch((error) => {
      setMessage({
        link: '#',
        txt: 'Some error occurred, try again.'
      })
    })
    setLoad(false);
  }
  const changeHandler = (e) => {
    setUrl(e.target.value);
  }
  return (
    <div>
      <div className='welcome'>Welcome to the URL shortener website.</div>
      <div className='home'>
      <form className='form halves' onSubmit={submitHandler}>
        <p>Enter the Original URL below: </p>
        <textarea name="url" id="url" onChange={changeHandler} value={url} />
        <button type="submit">Shorten</button>
      </form>
      <div className='output halves'>
      {!load && message.link!=='#' && <div className='success'>URL shortened successfully.</div>}
      {!load && message.link==='#' && <div className='success'>Sorry.</div>}
      {!load && <a href={`${message.link}`} rel="noreferrer" className='link' target='_blank'>{`${message.txt}`} &#10555;</a>}
      {!load && message.link!=='#' && <div>
          <div>Original length : {url.length}</div> 
          <div>Reduced length : {message.txt.length}</div>
        </div>}
      </div>
      </div>
    </div>
  )
}

export default Home
