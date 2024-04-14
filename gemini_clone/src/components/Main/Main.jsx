import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context);

  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            {/**
            here we are using the show result 
  if the show result is not true then it will show the hello messgae else this one */}
            {!showResult ?
            <>
          
            <div className="greet">
                <p><span>Hello,Prachi</span></p>
                <p>How can I help you today?</p>

            </div>
            <div className="cards">
                <div className="card">
                    <p>Hi</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Hello</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>WHo are you</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Prachi</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </> : 
            <div className='result '>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {/**
                     * if the result is false display loading icon else result data
                     */}
                    {loading?<>
                    <div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                        </div>
                        </>
                        :
                         <p dangerouslySetInnerHTML={{__html:resultData}}></p>}
                   
                    {/**if we use result data direct without html it will display all tags and html that 
                     * why we are using inner html here
                     */}                
                     </div>
            </div>
}
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                    <div>
                        {/* <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" /> */}
                       {input? <img  onClick={()=>onSent()}src={assets.send_icon} alt="" />:
                       null}
    
                    </div>
                </div>
                <p className='bottom-info'>
                            hiiiaiai
                        </p>
            </div>
        </div>
    </div>
  )
}

export default Main