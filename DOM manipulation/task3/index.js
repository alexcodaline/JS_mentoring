const form = document.getElementById("form");
const phoneNumb = document.getElementById("phoneNumb");
const nameContact = document.getElementById("nameContact");
const phoneBook = document.getElementById("phonebook");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (phoneNumb.value.length === 0 || nameContact.value.length === 0) {
    alert("Form is empty");
    return;
  }
//------------------------------------------add new contact
  const contact = document.createElement("li");
  contact.classList.add("contact");
  contact.innerHTML = `
    <span class="phone"><b>Phone:</b> ${phoneNumb.value}</span>
    <span class="name"><b>Name:</b> ${nameContact.value}</span>
    <button class="edit-contact">Edit</button>
    <button class="delete-contact">Delete</button>
  `;
  phoneBook.append(contact);
//   ------------------------------------edit 
  contact.querySelector(".edit-contact").addEventListener("click", (editEvent) => {
    const phoneText = contact.querySelector(".phone");
    const nameText = contact.querySelector(".name");
    if (editEvent.target.textContent === "Edit") {
      phoneText.innerHTML = `<input class="edit-input" value="${phoneText.textContent.replace("Phone: ", "")}" />`;
      nameText.innerHTML = `<input class="edit-input" value="${nameText.textContent.replace("Name: ", "")}" />`;
      editEvent.target.textContent = "Save";
    } else {
      const newPhone = phoneText.querySelector("input").value;
      const newName = nameText.querySelector("input").value;
      phoneText.innerHTML = `Phone: ${newPhone}`;
      nameText.innerHTML = `Name: ${newName}`;
      editEvent.target.textContent = "Edit";
    }
  });

  contact.querySelector(".delete-contact").addEventListener("click", () => {
    contact.remove();
  });


  form.reset();
});