/*
async function handleMessage(request, sender) {
  let sites = await browser.topSites.get();

  console.log(sites);
  return {response: sites}
  // sendResponse({response: [sites]});

}
*/

function listenForClicks() {
  document.addEventListener("click", (e) => {

    function colorify(tabs) {
        let c = e.target.textContent;
        browser.tabs.sendMessage(tabs[0].id, {
          command: "colorify",
          colorName: c
        });
    }

    function reset(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "reset",
        });
    }

    function reportError(error) {
      console.error(`Could not colorify: ${error}`);
    }

    if (e.target.classList.contains("color")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(colorify)
        .catch(reportError);
    }
    else if (e.target.classList.contains("reset")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(reset)
        .catch(reportError);
    }
  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/topify.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
