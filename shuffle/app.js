function getValueFromStyle(str) {
    let regex = /(\d+\.?\d+)|(\d+)/g;
    return regex.exec(str)[0];
}

function moveLeftOrRight(elm, isLeft) {
    let negation = -1;

    let computedStyle = window.getComputedStyle(elm);

    let width = Number(getValueFromStyle(computedStyle.width));
    let marginLeft = Number(getValueFromStyle(computedStyle.marginLeft));
    let marginRight = Number(getValueFromStyle(computedStyle.marginRight));

    let sum = (width + marginLeft + marginRight);

    if (isLeft) {
        sum = sum * negation;
        console.log(sum);
    }

    if (elm.style.transform === null || elm.style.transform === undefined || elm.style.transform === "")
        elm.style.transform = `translate(${sum}px, 0px)`; // 'translate(-120px, 0px)';
    else {
        let elmTransform = elm.style.transform;
        let regex = /([-]?\d+\.?\d+)|([-]?\d+)/g;
        let translatedX = regex.exec(elmTransform)[0];
        let translatedY = regex.exec(elmTransform)[0];
        let newValue = Number(translatedX) + sum;

        // console.log(newValue);
        elm.style.transform = `translate(${newValue}px, ${translatedY}px)`;
    }

}

function moveLeft(elm) {
    moveLeftOrRight(elm, true);
}

function moveRight(elm) {
    moveLeftOrRight(elm);
}

function moveUp(elm) {
    // console.log(elm.style.transform);
    if (elm.style.transform === null || elm.style.transform === undefined || elm.style.transform === "")
        elm.style.transform = 'translate(0px, -20px)';
    else {
        let elmTransform = elm.style.transform;
        let regex = /([-]?\d+\.?\d+)|([-]?\d+)/g;
        let translatedX = regex.exec(elmTransform)[0];
        let translatedY = regex.exec(elmTransform)[0];
        let newValue = Number(translatedY) - 20;

        elm.style.transform = `translate(${translatedX}px, ${newValue}px)`;
    }
}

function moveDown(elm) {
    // console.log(elm.style.transform);
    if (elm.style.transform === null || elm.style.transform === undefined || elm.style.transform === "")
        elm.style.transform = 'translate(0px, 0px)';
    else {
        let elmTransform = elm.style.transform;
        let regex = /([-]?\d+\.?\d+)|([-]?\d+)/g;
        let translatedX = regex.exec(elmTransform)[0];
        let translatedY = regex.exec(elmTransform)[0];
        let newValue = Number(translatedY) + 20;

        elm.style.transform = `translate(${translatedX}px, ${newValue}px)`;
    }
}

function hovered(event) {
    // console.log(event.target.id);

    if (selected && selectedId !== -1) {
        if (event && event.target) {
            let id = event.target.id;
            // console.log(id);

            if (selectedId === id) {
                // console.log("same element");
                return;
            }

            let hoveredItem = document.getElementById(event.target.id);
            let selectedItem = document.getElementById(selectedId);

            let regex1 = /([-]?\d+)/g;
            let hoveredItemStyleTransform = hoveredItem.style.transform;
            let hoveredItemStyleTranslatedX = hoveredItemStyleTransform !== "" ? regex1.exec(hoveredItemStyleTransform)[0] : 0;
            let newValueHoveredItem = Number(hoveredItemStyleTranslatedX) + hoveredItem.offsetLeft;
            // console.log(hoveredItem.offsetLeft, hoveredItemStyleTranslatedX, newValueHoveredItem);

            let regex2 = /([-]?\d+)/g;
            let selectedItemStyleTransform = selectedItem.style.transform;
            let selectedItemStyleTranslatedX = selectedItemStyleTransform !== "" ? regex2.exec(selectedItemStyleTransform)[0] : 0;
            let newValueSelectedItem = Number(selectedItemStyleTranslatedX) + selectedItem.offsetLeft;
            // console.log(selectedItem.offsetLeft, selectedItemStyleTranslatedX, newValueSelectedItem);

            if (newValueSelectedItem > newValueHoveredItem) {
                // console.log("move current item in focus to right");
                moveRight(hoveredItem);
                moveLeft(selectedItem);
            } else {
                // console.log("move current item in focus to left");
                moveLeft(hoveredItem);
                moveRight(selectedItem);
            }
        }
    }


}

function movedOut(event) {
    // if (event && event.target) {
    //     let id = event.target.id;
    //     // console.log(id);
    // }
}

function clicked(event) {
    // console.log(event);
    if (event && event.target) {
        let id = event.target.id;

        if (!selected || id == selectedId) {

            if (ids.has(id)) {

                let elm = document.getElementById(id);
                if (elm) {
                    let cls = elm.getAttribute("class");
                    // console.log(cls);

                    if (cls.includes("select")) {
                        elm.setAttribute("class", "box");
                        selectedId = -1;
                        moveDown(elm);
                        document.body.setAttribute("class", "select");
                    } else {
                        elm.setAttribute("class", "box select");
                        selectedId = id;
                        moveUp(elm);
                        document.body.setAttribute("class", "select");
                    }

                    selected = !selected;
                }
            }
        }
    }
}


var boxes = document.getElementsByClassName("box");
var ids = new Set();

var selected = false;
var selectedId = -1;

for (let idx = 0; idx < boxes.length; idx++) {
    let e1 = boxes[idx];
    ids.add(e1.id);
    e1.addEventListener("click", clicked);
    e1.addEventListener("mouseover", hovered);
    e1.addEventListener("mouseout", movedOut);
}

// var mouseX;

// function onMouseMove(event) {
//     // check whether any box is selected.

//     if (selected && selectedId !== -1) {
//         let elm = document.getElementById(selectedId);

//         // we check whether the mouse crossed the other box.
//         var deltaX = event.clientX - mouseX;

//         if (deltaX < 0) {} else {}

//     }
// }

// // concerned only with X coordinates.
// function onMouseDown(event) {
//     mouseX = event.clientX;
// }
// document.addEventListener("mousedown", onMouseDown);
// document.addEventListener("mousemove", onMouseMove);