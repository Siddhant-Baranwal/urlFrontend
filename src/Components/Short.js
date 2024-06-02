import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

const Short = (props) => {
  const BACKEND_URL = props.BACKEND_URL;
  let [msg, setMsg] = useState(true);
  const {id} = useParams();
  const getting = async () => {
    await axios.post(`${BACKEND_URL}/redirect`, {
      uid: id
    })
    .then((response) => {
      if(response.data.success===true){
        window.location.href = response.data.url;
      }
      else{
        setMsg(false);
      }
    })
    .catch((error) => {
      setMsg(false);
    })
  }
  useEffect(() => {
    getting();
  }, [BACKEND_URL, id]);
  return (
    <div className='msg'>
      <img className='gif' src="/invalid.gif" alt="" />
      {msg && <div className='message'>Redirecting....</div>}
      {!msg && <div className='message'>:(</div>}
      {!msg && <div className='message'>Oops, this URL is invalid...</div>}
      {!msg && <div className='message'>Error 404 - The requested URL was not found on this server.</div>}
    </div>
  )
}

export default Short
