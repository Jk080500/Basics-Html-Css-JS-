const socket = io();

// const form = document.getElementById("searchForm");
// const openBtn = document.getElementById("search-btn");
// const input = document.getElementById("searchInput");

// openBtn.addEventListener("click", () => {
//   form.classList.toggle("active");
//   if (form.classList.contains("active")) {
//     input.focus();
//   }
// });

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("send-location", { latitude, longitude });
    },
    (error) => {
      console.error(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
}

const map = L.map("map").setView([0, 0], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "OpenStreetMap",
}).addTo(map);

const markers = {};

socket.on("receive-location", (data) => {
  const { id, latitude, longitude } = data;
  map.setView([latitude, longitude], 16);
  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
    markers[id].bindPopup("Hey! You Are Here!").openPopup();
  } else {
    markers[id] = L.marker([latitude, longitude]).addTo(map);
  }
});

socket.on("user-disconnected", (id) => {
  if (markers[id]) {
    map.removeLayer(markers[id]);
    delete markers[id];
  }
});

// document.getElementById("search-btn").addEventListener("click", (e) => {
//   e.preventDefault();
//   const searchInput = document.querySelector("#searchInput").value.trim();
// });
