
fetch("http://localhost:3000/weather?address=nawada").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
    }
  });
});

const locationForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");

// messageOne.textContent = 'From javascript'

locationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  messageThree.textContent = ''

  fetch("http://localhost:3000/weather?address="+location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = 'Latitude : ' + data.latitude
        messageTwo.textContent = 'Longitude : ' + data.longitude
        messageThree.textContent = 'Location : ' + data.location
      }
    });
  });
});
