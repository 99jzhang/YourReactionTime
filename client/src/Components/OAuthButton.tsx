import React, { useState, useRef, useEffect } from "react";
import {AiFillGoogleCircle} from 'react-icons/ai';

function OAuthButton() {
    function navigate(url){
        window.location.href = url;
    }
      
    async function auth(){
        const response = await fetch("http://127.0.0.1:3000/request", {method:'post'});
      
        const data = await response.json();
        console.log(data);
        navigate(data.url);
    }

    return (
        <div>   
            <button className="btn-auth" type="button" onClick={()=> auth()}>
                <AiFillGoogleCircle/>
                Sign in with Google
            </button>
        </div>
        
    );
      
}

export default OAuthButton;