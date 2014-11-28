  var firstRun = true;
  var ref = document.getElementById("watch7-subscription-container");
  var parent = ref.parentElement;
  var next = ref.nextSibling;

  var buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("class", "pi-cast-button-div");
  buttonDiv.setAttribute("style", "display: inline-block; padding-top: 0px; margin-left: 8px; height: 13px;")

  var button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.setAttribute("class", "pi-cast-button");

  var span = document.createElement("span");
  span.innerHTML = "Send to ";

  var image = document.createElement("img");
  image.setAttribute("class", "pi-cast-button-img");
  image.setAttribute("src", "https://upload.wikimedia.org/wikipedia/en/archive/c/cb/20121210222414!Raspberry_Pi_Logo.svg");

  button.appendChild(span);
  button.appendChild(image);

  buttonDiv.appendChild(button);

  


  if (next) parent.insertBefore(buttonDiv, next);
  else parent.appendChild(buttonDiv);

  button.addEventListener("click", function(){
    //console.log(document.URL);
    if(firstRun) {
      chrome.runtime.sendMessage({url:document.URL});
      firstRun = false;
      button.setAttribute("class", "pi-cast-button-disabled");
      button.disabled = true;
      button.style.display = '';
      button.style = '';

      try{
        document.getElementsByClassName("ytp-button ytp-button-pause")[0].click()
      } catch(err) {

      }
      try{
        document.getElementsByClassName("ytp-button ytp-size-toggle-large")[0].click()
      } catch(err) {
        
      }
      
    }

  });