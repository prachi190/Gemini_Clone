import React, { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    
//we are creating a context api here over our app
//globally we have created a onsent function 
//to use the runchat function and receive the input

    const [input, setInput] = useState(""); // to save input data
    const [recentPrompt, setRecentPrompt] = useState(""); // click on send button input data will be saved in recent prompt
    const [prevPrompt, setPrevPrompts] = useState([]); // to store all the input history and display it in the recent tab
    const [showResult, setShowResult] = useState(false); // true hide the greet text and boxes and display the result
    const [loading, setLoading] = useState(false); //
    const [resultData, setResultData] = useState(""); // to display our result on our webpage


    //for typing effect
    const delayPara =(index,nextWord)=>{
        setTimeout(function(){
            setResultData(prev =>prev + nextWord);
        },75*index)

    }
  

    // to handle the logic of new chat and showing hello screen
    const newChat = ()=>{
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {



        setResultData("")//so that previous result get empty
        setLoading(true)
        setShowResult(true)
          //checking if the data is in the prompt and if not then will generate the response using the input feild to show the prev history of chat in sidebar
          let response;
           if(prompt !==undefined){
              response = await runChat(prompt)
              setRecentPrompt(prompt)
           }
           else{
            setPrevPrompts(prev =>[...prev,input])
            setRecentPrompt(input)
            response = await runChat(input)
           }

    //     setRecentPrompt(input)
    //     setPrevPrompts(prev=>[...prev,input]) // input will be stored that will be used in sidebar sec
    //    const response =  await runChat(input); //getting data in console and showing on console using runchat 
     

       //to handle the logic to display the text with typing effect 
       let responseArray = response.split("**") //storing the array and splitting it by ** 
       let newResponse=""; // as undefined word was using there in starting of response
       for(let i=0;i<responseArray.length;i++){
        //iterating over each word that will be sepated using this star method
        //checking i is even or zero ?
        if(i == 0 || i%2 !==1){
          newResponse += responseArray[i];

        }
        else{
            // putting the data inside star in bold
            newResponse += "<b>" +responseArray[i]+"</b>"
        }
       }
       //creating the logic to start a new line where single star is there
       let newResponse2 = newResponse.split("*").join("</br>")
       let newResponseArray = newResponse2.split(" ");//using space to spilt the string
       for(let i =0;i<newResponseArray.length;i++){

        const nextWord = newResponseArray[i];
        delayPara(i,nextWord+" ");

       }
       setLoading(false) //hide the loading
       setInput(" ")//input feild will be reset
    };

    const contextValue = {
        prevPrompt,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
