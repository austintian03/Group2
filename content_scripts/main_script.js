/*
function handleResponse(message) {

    console.log(message.response);
}

function handleError(error) {
    console.log(`Error: ${error}`);
}

function sendMessage(e) {
    const sending = browser.runtime.sendMessage({content: "request for topSites"});
    sending.then(handleResponse, handleError);
}
*/
//window.addEventListener('click', sendMessage);

(function() {
  if(window.hasRun) {
    return;
  }
  window.hasRun = true;

  function setBgColor(colorName) {
    document.body.style.border = "5px solid red";
  }

  function removeColor() {
    document.body.style.border = "5px solid black";
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "colorify" && ) {
      setBgColor(message.colorName);
    } else if (message.command === "reset") {
      removeColor();
    }
  });
})
