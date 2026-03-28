// Property data example
const properties = {
  1: {
    title: "Adyar House",
    img: "assets/property1.jpg",
    location: "Adyar, Chennai",
    area: "1200 sq.ft",
    price: "₹1.5 Cr",
    lat: 13.0103,
    lng: 80.2495
  },
  2: {
    title: "Velachery Land",
    img: "assets/property2.jpg",
    location: "Velachery, Chennai",
    area: "2000 sq.ft",
    price: "₹2.1 Cr",
    lat: 12.9932,
    lng: 80.2300
  }
};

// Load property info on listing.html
const params = new URLSearchParams(window.location.search);
const propId = params.get("prop");
if (propId && properties[propId]) {
  const prop = properties[propId];
  document.getElementById("prop-title").innerText = prop.title;
  document.getElementById("prop-img").src = prop.img;
  document.getElementById("prop-location").innerText = "Location: " + prop.location;
  document.getElementById("prop-area").innerText = "Area: " + prop.area;
  document.getElementById("prop-price").innerText = "Price: " + prop.price;

  // Initialize map using Leaflet.js
  const mapDiv = document.getElementById("map-container");
  if (mapDiv) {
    const map = L.map('map-container').setView([prop.lat, prop.lng], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    L.marker([prop.lat, prop.lng]).addTo(map)
      .bindPopup(prop.title)
      .openPopup();
  }
}

// Tabs function
function openTab(tabName) {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(t => t.style.display = "none");
  document.getElementById(tabName).style.display = "block";
}
