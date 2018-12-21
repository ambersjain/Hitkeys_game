//Function creates a paragraph with text and returns it
window.createParagraph = function(text) {
  console.log("Creating Paragraph");
  var element = document.createElement("P");
  var textNode = document.createTextNode(text);
  element.appendChild(textNode);
  return element;
}

//Function creates a heading with text and returns it
window.createH1 = function(titleText) {
  console.log("Creating H1");
  var element = document.createElement("H1");

  var textNode = document.createTextNode(titleText);
  element.appendChild(textNode);
  // return the element so the caller can use it
  return element;
}

window.createH2 = function(titleText) {
  console.log("Creating H2");
  var element = document.createElement("H2");

  var textNode = document.createTextNode(titleText);
  element.appendChild(textNode);
  // return the element so the caller can use it
  return element;
}


//Function creates a division tag and returns it
window.createDiv = function() {
  console.log("Creating DIV");
  var element = document.createElement("DIV");
  // return the element so the caller can use it
  return element;
}

//The function creates a span tag
window.createSpan = function(text) {
  var element = document.createElement("SPAN");
  var textNode = document.createTextNode(text);
  element.appendChild(textNode);
  return element;
}

//creates a button with a text 'buttonText' and returns it.
window.createButton = function(buttonText) {
  console.log("Creating BUTTON ");
  var element = document.createElement("BUTTON");
  var t = document.createTextNode(buttonText);
  element.appendChild(t);
  // return the element so the caller can use it
  return element;
}


//The function creates the image and returns it for the caller to use.
window.createImg = function(imageSource) {
  console.log("Creating IMAGE");
  var element = document.createElement("IMG");

  element.setAttribute("width", "150");
  element.setAttribute("height", "150");
  element.setAttribute("src", imageSource);
  // return the element so the caller can use it
  return element;
}
