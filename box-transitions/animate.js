'use strict';

var myApp = myApp || {};

myApp.triggerCount = 0;

let scale_interval_id, slider_interval_id;

function transition_scale(e) {

  myApp.triggerCount += 1;

  // Ignore subsequent requests of button click.
  if (myApp.triggerCount > 2) {
    return;
  }

  let box = document.getElementById("scale_box"),
    childNodes = box.childNodes,
    i = 0;

  scale_interval_id = setInterval(function() {
    setTimeout(function() {
      if (box.hasAttribute("data-state")) {
        box.removeAttribute("data-state");
      } else {
        box.setAttribute("data-state", "scale");
      }
    }, 100);

    setTimeout(function() {
      if (box.hasAttribute("data-state")) {
        box.removeAttribute("data-state");
      } else {
        box.setAttribute("data-state", "scale");
      }
    }, 1000);

    setTimeout(function() {
      //console.log(box.className);
      if (childNodes && childNodes[1] && childNodes[1].textContent === "Facebook") {
        childNodes[1].textContent = "Twitter";
        box.className = box.className.replace(" facebook", " twitter");
      } else if (childNodes && childNodes[1] && childNodes[1].textContent === "Twitter") {
        childNodes[1].textContent = "LinkedIn";
        box.className = box.className.replace(" twitter", " linkedin");
      } else if (childNodes && childNodes[1] && childNodes[1].textContent === "LinkedIn") {
        childNodes[1].textContent = "Reddit";
        box.className = box.className.replace(" linkedin", " reddit");
      } else if (childNodes && childNodes[1] && childNodes[1].textContent === "Reddit") {
        childNodes[1].textContent = "Facebook";
        box.className = box.className.replace(" reddit", " facebook");
      }
    }, 2200);

  }, 2200);
}

function transition_slide(e) {

  myApp.triggerCount += 1;

  // Ignore subsequent requests of button click.
  if (myApp.triggerCount > 2) {
    return;
  }

  let slider_box = document.getElementById("slider_box"),
    boxOnTop = document.getElementById("slider_box_on_top"),
    turnBox2 = false;

  slider_interval_id = setInterval(function() {
    if (!turnBox2) {
      boxOnTop.className = boxOnTop.className.replace(" hidden", "").trim();
    } else {
      slider_box.className = slider_box.className.replace(" hidden", "").trim();
    }

    setTimeout(function() {
      if (!turnBox2) {
        boxOnTop.className = boxOnTop.className.replace(" top", "").trim();
      } else {
        slider_box.className = slider_box.className.replace(" top", "").trim();
      }

      if (slider_box && boxOnTop) {
        let box2_childNodes = slider_box.childNodes,
          boxOnTop_childNodes = boxOnTop.childNodes;

        if (box2_childNodes && !turnBox2) {

          //console.log("box2_childnodes");
          if (box2_childNodes[1].textContent === 'LinkedIn') {
            if (boxOnTop_childNodes) {
              boxOnTop_childNodes[1].textContent = "Twitter";
              boxOnTop.className = boxOnTop.className.replace("reddit", "twitter");
            }
          } else if (box2_childNodes[1].textContent === 'Facebook') {
            if (boxOnTop_childNodes) {
              boxOnTop_childNodes[1].textContent = "Reddit";
              boxOnTop.className = boxOnTop.className.replace("twitter", "reddit");
            }
          }
        }

        if (boxOnTop_childNodes && turnBox2) {
          //console.log("boxontop_childnodes");
          if (boxOnTop_childNodes[1].textContent === 'Twitter') {
            if (box2_childNodes) {
              box2_childNodes[1].textContent = 'Facebook';
              slider_box.className = slider_box.className.replace("linkedin", "facebook");
            }
          } else if (boxOnTop_childNodes[1].textContent === 'Reddit') {
            if (box2_childNodes) {
              box2_childNodes[1].textContent = 'LinkedIn';
              slider_box.className = slider_box.className.replace("facebook", "linkedin");
            }
          }
        }
      }
    }, 500);

    setTimeout(function() {

      if (turnBox2) {
        if (boxOnTop.className.indexOf("top") === -1)
          boxOnTop.className += " top";
      } else {
        if (slider_box.className.indexOf("top") === -1)
          slider_box.className += " top";
      }
      //console.log(`turnBox2: ${turnBox2}`);
    }, 2500);

    setTimeout(function() {
      if (turnBox2) {
        turnBox2 = false;
        if (slider_box.className.indexOf("placeMeOnTop") !== -1) {
          slider_box.className = slider_box.className.replace("placeMeOnTop", "").trim();
        }
      } else {
        if (slider_box.className.indexOf("placeMeOnTop") === -1)
          slider_box.className += " placeMeOnTop";
        turnBox2 = true;
      }
      //console.log(`turnBox2: ${turnBox2}`);
    }, 4000);
  }, 5000);
}

function end_transitions(e) {

  clearInterval(scale_interval_id);
  clearInterval(slider_interval_id);

  myApp.triggerCount = 0;
}

let start_trans = document.getElementById("start");
start_trans.addEventListener('click', transition_scale, false);
start_trans.addEventListener('click', transition_slide, false);

let stop_trans = document.getElementById("stop");
stop_trans.addEventListener('click', end_transitions, false);
