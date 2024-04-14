import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  //Here we are using the arrow function if the prev state is true it will
  //return the false state which will be stored in extended
  // and it will change the state

const {onSent,prevPrompt,setRecentPrompt,newChat} = useContext(Context)


//logic handling by clicking on the previous chat we can load our responses
 
const loadPrompt = async(prompt) =>{
  setRecentPrompt(prompt)
    await onSent(prompt)
}

  return (
    <div className="sidebar">
      <div className="top">
        <img  onClick={()=>setExtended(prev=>!prev)} className="menu" src={assets.menu_icon} alt="" />
        <div  onClick={()=>newChat()}className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item,index)=>{
              return(
                <div onClick={()=>loadPrompt(item)} className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p>{item.slice(0,18)}...</p>
              {/**placing item that we are getting using map method */}
            </div>
              )

            })}
           
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended?<p>Help</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended?<p>Activiry</p> :null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended?<p>Settings</p>:null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
