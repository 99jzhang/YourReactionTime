import React, { useState, useRef, useEffect } from "react";

function OAuthButton() {
    function navigate(url){
        window.location.href = url;
    }
      
    async function auth(){
        const response =await fetch('http://localhost:3000/oauth',{method:'post'});
      
        const data = await response.json();
        console.log(data);
        navigate(data.url);
    }

    return (
        <div>   
            <button className="btn-auth"  type="button" onClick={()=> auth()}>
                <img className="btn-auth-img" src='../../assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png' alt='google sign in'/>
            </button>
        </div>
        
    );
      
}

export default OAuthButton;