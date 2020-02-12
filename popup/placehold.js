async function handleMessage(request, sender) {
  let sites = await browser.topSites.get();

  console.log(sites);
  return {response: sites}
  // sendResponse({response: [sites]});
}

function listenForClick() {
  document.addEventListener("click", (e) => {

    function color(tabs) {
      let color = e.target.textContent;
      let sites = browser.topSites.get();

      console.log(sites);
      browser.tabs.sendMessage(tabs[0].id, {
        command: color,
        response: sites,
        currentURL: browser.tabs.getCurrent()
      });
    }

    function reportError(error) {
      console.error(`Could not do it: ${error}`);
    }

    if(e.target.classList.contains("reset") == false) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(color).catch(reportError);
    }

  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/main_script.js"})
.then(listenForClick).catch(reportExecuteScriptError);

//browser.runtime.onMessage.addListener(handleMessage);


//browser.runtime.onMessage.addListener(handleMessage);
