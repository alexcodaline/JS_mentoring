const translations = {
  en: {
    changeTheme: "Change theme",
    changeLang: "Change language",
    login: "Login",
    logout: "Logout",
    online: "Online",
    offline: "Offline",
    dark: "Dark theme",
    light: "Light theme",
  },
  uk: {
    changeTheme: "Змінити тему",
    changeLang: "Змінити мову",
    login: "Увійти",
    logout: "Вийти",
    online: "В мережі",
    offline: "Поза мережею",
    dark: "Темна тема",
    light: "Світла тема",
  },
};

const body = document.body;
const themeButton = document.getElementById("theme-button");
const langButton = document.getElementById("lang-button");
const statusInfo = document.getElementById("status");
const loginButton = document.getElementById("login-button");

const sessionDefault = {
  theme: "light",
  lang: "en",
  online: false,
};

if (!localStorage.getItem("app")) {
  localStorage.setItem("app", JSON.stringify(sessionDefault));
}
let app = JSON.parse(localStorage.getItem("app"));

// quota
try {
  localStorage.setItem("app", JSON.stringify(sessionDefault));
} catch (e) {
  if (e == QUOTA_EXCEEDED_ERR) {
    alert("Quota exceeded!");
  }
}
// update data

function updateData() {
  // theme
  if (app.theme === "dark") {
    body.classList.add("dark-theme");
    themeButton.textContent = translations[app.lang].light;
  } else {
    body.classList.remove("dark-theme");
    themeButton.textContent = translations[app.lang].dark;
  }
// lang translation
  langButton.textContent = translations[app.lang].changeLang;
// online-offline
  if (app.online) {
    statusInfo.textContent = translations[app.lang].online;
    loginButton.textContent = translations[app.lang].logout;
  } else {
    statusInfo.textContent = translations[app.lang].offline;
    loginButton.textContent = translations[app.lang].login;
  }
}

updateData();
// toggle theme
themeButton.addEventListener("click", () => {
  if (app.theme === "light") {
    app.theme = "dark";
  } else {
    app.theme = "light";
  }

  localStorage.setItem("app", JSON.stringify(app));
  updateData();
});
// toggle lang
langButton.addEventListener("click", () => {
  app.lang = app.lang === "en" ? "uk" : "en";
  localStorage.setItem("app", JSON.stringify(app));
  updateData();
});
// toggle online-offline
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

