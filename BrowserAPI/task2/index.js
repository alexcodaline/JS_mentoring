
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => {
      console.log("Service Worker - ok ");
    })
    .catch((err) => {
      console.error(" Service Worker error", err);
    });
}


const status = document.getElementById("status");

const dbName = "OfflineDB";
let db;


const request = indexedDB.open(dbName, 1);

request.onupgradeneeded = (event) => {
  db = event.target.result;
  db.createObjectStore("offlineData", { autoIncrement: true });
};

request.onsuccess = (event) => {
  db = event.target.result;


  window.addEventListener("online", updateNetworkStatus);
  window.addEventListener("offline", updateNetworkStatus);

  updateNetworkStatus();
};

request.onerror = (event) => {
  console.error("database error", event);
};

function updateNetworkStatus() {
  if (navigator.onLine) {
    status.textContent = "Online";
    syncOfflineData();
  } else {
    status.textContent = "Offline";
  }
}

function saveDataOffline(data) {
  const tx = db.transaction("offlineData", "readwrite");
  const store = tx.objectStore("offlineData");
  store.add(data);
  console.log("data saved!");
}


function syncOfflineData() {
  const tx = db.transaction("offlineData", "readonly");
  const store = tx.objectStore("offlineData");
  const getAll = store.getAll();

  getAll.onsuccess = () => {
    const data = getAll.result;
    if (data.length === 0) return;

    Promise.all(data.map(sendDataToServer)).then(() => {
      const txDelete = db.transaction("offlineData", "readwrite");
      const storeDelete = txDelete.objectStore("offlineData");
      storeDelete.clear();
      console.log("☁️ Усі офлайн-дані синхронізовано");
    });
  };
}

async function sendDataToServer(data) {
  try {
    const res = await fetch("https://example.com/api/save", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.ok
      ? console.log("data send")
      : console.error("sever error");
  } catch (err) {
    console.error("error", err);
  }
}
