const body = document.body;
const themeButton = document.getElementById("theme-button");
const langButton = document.getElementById("lang-button");
const statusInfo = document.getElementById("status");
const loginButton = document.getElementById("login-button");

// default
const sessionDefault = {
  theme: "light",
  lang: "en",
  online: false,
};

// init
if (!localStorage.getItem("app")) {
  localStorage.setItem("app", JSON.stringify(sessionDefault));
}
let app = JSON.parse(localStorage.getItem("app"));
// -------------------------------
function updateData() {
  // theme
  if (app.theme === "dark") {
    body.classList.add("dark-theme");
  } else {
    body.classList.remove("dark-theme");
  }

  //   online/offline

  if (app.online) {
    statusInfo.textContent = "Online";
    loginButton.textContent = "LoggOUT";
  } else {
    statusInfo.textContent = "Oflline";
    loginButton.textContent = "LogIn";
  }
}

updateData();

// change theme
themeButton.addEventListener("click", () => {
  if (app.theme === "light") {
    app.theme = "dark";
    body.classList.add("dark-theme");
  } else {
    app.theme = "light";
    body.classList.remove("dark-theme");
  }

  localStorage.setItem("app", JSON.stringify(app));
});
// change status
loginButton.addEventListener("click", () => {
  app.online = !app.online;
  localStorage.setItem("app", JSON.stringify(app));
  updateData();
});

window.addEventListener("storage", (event) => {
  if (event.key === "app") {
    app = JSON.parse(event.newValue);
    updateData();
  }
});
