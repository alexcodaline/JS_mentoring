document.addEventListener("DOMContentLoaded", () => {
  const fetchDataBtn = document.getElementById("fetchDataBtn");
  const clearCacheBtn = document.getElementById("clearCacheBtn");
  const resultsContainer = document.getElementById("results-container");
  const statusElement = document.getElementById("status");

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker
      .register("service-worker.js")
      .then((registration) => {
        console.log("Service Worker зареєстровано");
      })
      .catch((error) => {
        console.error("Помилка реєстрації Service Worker", error);
      });
  }

  function updateOnlineStatus() {
    const isOnline = navigator.onLine;
    statusElement.textContent = `Стан: ${isOnline ? "онлайн" : "офлайн"}`;
    statusElement.className = isOnline ? "online" : "offline";
  }

  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
  updateOnlineStatus();

  fetchDataBtn.addEventListener("click", async () => {
    try {
      const startTime = performance.now();

      const response = await fetch("https://api.example.com/data");
      const data = await response.json();
      const endTime = performance.now();
      const timeElapsed = endTime - startTime;
      const source = response.headers.get("x-cache-source") || "network";
      const resultElement = document.createElement("div");
      resultElement.className = source === "cache" ? "cached" : "network";
      resultElement.innerHTML = `
                <p>Час запиту: ${new Date().toLocaleTimeString()}</p>
                <p>Джерело: ${source}</p>
                <p>Час виконання: ${timeElapsed.toFixed(2)} мс</p>
                <pre>${JSON.stringify(data, null, 2)}</pre>
                <hr>
            `;
      resultsContainer.prepend(resultElement);
    } catch (error) {
      resultsContainer.innerHTML = `<p>Помилка: ${error.message}</p>`;
    }
  });

  clearCacheBtn.addEventListener("click", async () => {
    if ("caches" in window) {
      try {
        await caches.delete("api-cache-v1");
        resultsContainer.innerHTML = "<p>Кеш очищено</p>";
      } catch (error) {
        resultsContainer.innerHTML = `<p>Помилка очищення кешу: ${error.message}</p>`;
      }
    }
  });
});

