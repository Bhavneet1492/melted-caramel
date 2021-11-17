const submitBtn = document.getElementById("submit");
const errMessage = document.getElementById("err");
let Name = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let subject = document.getElementById("subject");
let message = document.getElementById("message");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (Name.value === "") {
    Name.Value = "None";
  }
  if (email.value === "") {
    email.value = "None";
  }
  if (subject.value === "") {
    subject.value = "None";
  }
  if (phone.value === "") {
    errMessage.innerHTML = `
    <h1 style="color:red;font-size:1rem;">Please enter your phone number</h1>`;
  }
  phone.value = phone.value.replace(/[^0-9]/g, "");
  if (phone.value.length !== 10) {
    errMessage.innerHTML = `
    <h1 style="color:red;font-size:1rem;">Please enter a valid phone number</h1>`;
  }

  if (message.value === "") {
    errMessage.innerHTML = `
    <h1 style="color:red;font-size:1rem;">Please enter your message</h1>`;
  }

  if (phone.value.length === 10) {
    let formData = {
      name: Name.value,
      email: email.value,
      phone: phone.value,
      subject: subject.value,
      message: message.value,
    };
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = function () {
      console.log(xhr.responseText);
      if (xhr.responseText == "success") {
        alert("Message sent successfully!");
        Name.value = "";
        email.value = "";
        message.value = "";
        phone.value = "";
        subject.value = "";
      } else {
        alert("something went wrong :(");
      }
    };
    xhr.send(JSON.stringify(formData));
  }
});
