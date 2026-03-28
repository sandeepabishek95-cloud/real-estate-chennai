// Property Data
const properties = [
  {
    id: 1,
    title: "Villa in Adyar",
    type: "Villa",
    location: "Adyar, Chennai",
    price: "₹3.5 Crores",
    sqft: 3500,
    parking: "2 Cars",
    lat: 13.0106,
    lng: 80.2314
  },
  {
    id: 2,
    title: "Apartment in T Nagar",
    type: "Apartment",
    location: "T Nagar, Chennai",
    price: "₹1.2 Crores",
    sqft: 1200,
    parking: "1 Car",
    lat: 13.0410,
    lng: 80.2370
  },
  {
    id: 3,
    title: "Land Plot in OMR",
    type: "Land",
    location: "OMR, Chennai",
    price: "₹80 Lakhs",
    sqft: 1000,
    parking: "N/A",
    lat: 12.9500,
    lng: 80.2250
  },
  {
    id: 4,
    title: "Premium Apartment in Velachery",
    type: "Apartment",
    location: "Velachery, Chennai",
    price: "₹2 Crores",
    sqft: 1500,
    parking: "1 Car",
    lat: 12.9860,
    lng: 80.2260
  }
];

// Render Property Listings
const propertyList = document.getElementById("property-list");
function renderProperties(list) {
  propertyList.innerHTML = "";
  list.forEach(prop => {
    const card = document.createElement("a");
    card.href = `property.html?id=${prop.id}`;
    card.className = "card";
    card.innerHTML = `
      <h3>${prop.title}</h3>
      <p>${prop.location}</p>
      <p>₹${prop.price}</p>
      <p>${prop.sqft} sqft | Parking: ${prop.parking}</p>
    `;
    propertyList.appendChild(card);
  });
}

// Filter Function
function applyFilter() {
  const loc = document.getElementById("search-location").value.toLowerCase();
  const type = document.getElementById("filter-type").value;
  const filtered = properties.filter(p => 
    (p.location.toLowerCase().includes(loc) || loc==="") &&
    (p.type === type || type==="")
  );
  renderProperties(filtered);
}

// Initial Render
renderProperties(properties);

// Property Details Page
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
if(id){
  const prop = properties.find(p=>p.id==id);
  if(prop){
    document.getElementById("prop-title").innerText = prop.title;
    const infoDiv = document.getElementById("property-info");
    infoDiv.innerHTML = `
      <p>Location: ${prop.location}</p>
      <p>Type: ${prop.type}</p>
      <p>Price: ₹${prop.price}</p>
      <p>Sqft: ${prop.sqft}</p>
      <p>Parking: ${prop.parking}</p>
      <a href="https://wa.me/917010022388" class="wa-btn">Contact via WhatsApp</a>
    `;

    // Leaflet Map
    const map = L.map('map').setView([prop.lat, prop.lng], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    L.marker([prop.lat, prop.lng]).addTo(map).bindPopup(prop.title).openPopup();
  }
}
