// ------------------- Sidebar Logic -------------------
const links = document.querySelectorAll('#menu .nav-link');
const sections = document.querySelectorAll('.content-section');

function showSection(sectionId) {
  // Hide all sections
  sections.forEach(section => section.classList.add('d-none'));

  // Show selected section
  document.getElementById(sectionId).classList.remove('d-none');

  // Update active link
  links.forEach(l => l.classList.remove('active'));
  links.forEach(l => {
    if (l.getAttribute('data-section') === sectionId) {
      l.classList.add('active');
    }
  });

  // If patient section is opened, refresh list
  if (sectionId === "patients") {
    initPatientList();
    showPatientList();
  }
}

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-section');
    showSection(sectionId);
  });
});

// ------------------- Patient Management Logic -------------------

// Sample patient data with lifestyle and family history
let patients = [
  {
    name: "John Smith",
    age: 45,
    gender: "Male",
    prakriti: "Vata",
    vikriti: "Pitta",
    lifestyle: "High (medidation and diet maintain)",
    familyHistory: "Diabetes",
    lastVisit: "2025-09-10",
    complaint: "Chronic back pain"
  },
  {
    name: "Jane Doe",
    age: 32,
    gender: "Female",
    prakriti: "Kapha",
    vikriti: "Kapha",
    lifestyle: "Moderate (medidation and diet maintain)",
    familyHistory: "Asthma",
    lastVisit: "2025-09-08",
    complaint: "Frequent headaches"
  },
  {
    name: "Michael Johnson",
    age: 50,
    gender: "Male",
    prakriti: "Pitta",
    vikriti: "Vata",
    lifestyle: "Low (not a proper plan)",
    familyHistory: "None",
    lastVisit: "2025-09-06",
    complaint: "Joint stiffness"
  },
  {
    name: "Emily Davis",
    age: 29,
    gender: "Female",
    prakriti: "Vata",
    vikriti: "Pitta",
    lifestyle: "High (medidation and diet maintain)",
    familyHistory: "Heart Disease",
    lastVisit: "2025-09-05",
    complaint: "Insomnia"
  },
  {
    name: "Chris Brown",
    age: 40,
    gender: "Male",
    prakriti: "Kapha",
    vikriti: "Vata",
    lifestyle: "Moderate (medidation and diet maintain)",
    familyHistory: "Diabetes",
    lastVisit: "2025-09-04",
    complaint: "Digestive issues"
  }
];

// Initialize patient table
function initPatientList() {
  const tbody = document.getElementById("patient-table-body");
  if (!tbody) return; // If table not present yet
  tbody.innerHTML = "";

  patients.forEach((p, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.age}</td>
        <td>${p.lastVisit}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="showPatientProfile(${i})">View Profile</button>
        </td>
      </tr>
    `;
  });
}

// Filtering patients by search and filters
function filterPatients() {
  const search = document.getElementById("patient-search").value.toLowerCase();
  const gender = document.getElementById("filter-gender").value;
  const dosha = document.getElementById("filter-dosha").value;

  const filtered = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(search);
    const matchesGender = !gender || patient.gender === gender;
    const matchesDosha =
      !dosha || patient.prakriti === dosha || patient.vikriti === dosha;
    return matchesSearch && matchesGender && matchesDosha;
  });

  const tbody = document.getElementById("patient-table-body");
  tbody.innerHTML = "";
  filtered.forEach((p, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.age}</td>
        <td>${p.lastVisit}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="showPatientProfile(${i})">View Profile</button>
        </td>
      </tr>
    `;
  });
}

// Show list view
function showPatientList() {
  document.getElementById("patient-list-view").classList.remove("d-none");
  document.getElementById("patient-profile-view").classList.add("d-none");
  document.getElementById("add-patient-view").classList.add("d-none");
}

// Show profile view
function showPatientProfile(index) {
  const p = patients[index];

  // Fill data
  document.getElementById("profile-name").innerText = p.name;
  document.getElementById("summary-name").innerText = p.name;
  document.getElementById("summary-age").innerText = p.age;
  document.getElementById("summary-gender").innerText = p.gender;
  document.getElementById("summary-prakriti").innerText = p.prakriti;
  document.getElementById("summary-vikriti").innerText = p.vikriti;
  document.getElementById("summary-lifestyle").innerText = p.lifestyle;
  document.getElementById("summary-history").innerText = p.familyHistory;
  document.getElementById("summary-complaint").innerText = p.complaint;

  // Switch views
  document.getElementById("patient-list-view").classList.add("d-none");
  document.getElementById("patient-profile-view").classList.remove("d-none");
  document.getElementById("add-patient-view").classList.add("d-none");
}

// Show add form view
function showAddPatientForm() {
  document.getElementById("patient-list-view").classList.add("d-none");
  document.getElementById("patient-profile-view").classList.add("d-none");
  document.getElementById("add-patient-view").classList.remove("d-none");
}

// Save new patient
function saveNewPatient(event) {
  event.preventDefault();

  const newPatient = {
    name: document.getElementById("new-name").value,
    age: document.getElementById("new-age").value,
    gender: document.getElementById("new-gender").value,
    prakriti: document.getElementById("new-prakriti").value,
    vikriti: document.getElementById("new-vikriti").value,
    lifestyle: document.getElementById("new-lifestyle").value, // New field
    familyHistory: document.getElementById("disease-history").value, // New field
    complaint: document.getElementById("new-complaint").value,
    lastVisit: new Date().toISOString().split("T")[0]
  };

  patients.push(newPatient);
  initPatientList();
  showPatientList();

  // Reset form
  document.getElementById("add-patient-form").reset();
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  initPatientList();
});

// ---------------- Sample Data ----------------
const dietPatients = [
  { id: 1, name: "John Smith", vikriti: "Pitta", disease: "Diabetes" },
  { id: 2, name: "Jane Doe", vikriti: "Vata", disease: "Hypertension" },
  { id: 3, name: "Michael Lee", vikriti: "Kapha", disease: "Arthritis" }
];

const foods = [
  { id: 1, name: "Brown Rice", calories: 216, protein: 5, carbs: 45, fats: 2, zone: "South" },
  { id: 2, name: "Chapathi", calories: 120, protein: 3, carbs: 25, fats: 1, zone: "North" },
  { id: 3, name: "Dosa", calories: 133, protein: 2.7, carbs: 17, fats: 5, zone: "South" },
  { id: 4, name: "Upma", calories: 150, protein: 3, carbs: 30, fats: 4, zone: "South" },
  { id: 5, name: "Poha", calories: 130, protein: 2.5, carbs: 28, fats: 1.5, zone: "West" },
  { id: 6, name: "Idli", calories: 58, protein: 1.6, carbs: 12, fats: 0.4, zone: "South" }
];

// ---------------- Global State ----------------
let dietChart = { breakfast: [], lunch: [], dinner: [], snacks: [] };
const savedDietCharts = {};
let currentPopup = null;

// ---------------- Initialization ----------------
document.addEventListener("DOMContentLoaded", () => {
  populatePatientDropdown();
  renderFoodTable();
});

// ---------------- Populate patient dropdown ----------------
function populatePatientDropdown() {
  const select = document.getElementById("patientSelect");
  select.innerHTML = '<option value="">Select a Patient</option>';
  dietPatients.forEach(p => {
    select.innerHTML += `<option value="${p.id}">${p.name}</option>`;
  });
}

// ---------------- Handle patient change ----------------
function handlePatientChange() {
  const patientId = document.getElementById("patientSelect").value;
  const patient = dietPatients.find(p => p.id == patientId);

  if (patient) {
    document.getElementById("patientName").innerText = patient.name;
    document.getElementById("patientVikriti").innerText = patient.vikriti;
    document.getElementById("patientDisease").innerText = patient.disease;
  } else {
    document.getElementById("patientName").innerText = "-";
    document.getElementById("patientVikriti").innerText = "-";
    document.getElementById("patientDisease").innerText = "-";
  }

  // Reset current meal planner when switching patients
  resetMealPlanner();
  renderSavedCharts();
}

// ---------------- Reset meal planner ----------------
function resetMealPlanner() {
  dietChart = { breakfast: [], lunch: [], dinner: [], snacks: [] };
  ["breakfast", "lunch", "dinner", "snacks"].forEach(meal => {
    document.getElementById(meal).innerHTML = "";
  });
}

// ---------------- Food Table Rendering ----------------
function renderFoodTable(filteredFoods = foods) {
  const tbody = document.getElementById("foodTableBody");
  tbody.innerHTML = "";

  filteredFoods.forEach(food => {
    tbody.innerHTML += `
      <tr>
        <td>${food.name}</td>
        <td>${food.calories}</td>
        <td>${food.protein}</td>
        <td>${food.carbs}</td>
        <td>${food.fats}</td>
        <td>${food.zone}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="showMealSelector(event, ${food.id})">
            Add
          </button>
        </td>
      </tr>
    `;
  });
}

// ---------------- Filtering Foods ----------------
function filterFoods() {
  const query = document.getElementById("foodSearch").value.toLowerCase();
  const zone = document.getElementById("zoneFilter").value;

  const filtered = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(query);
    const matchesZone = !zone || food.zone === zone;
    return matchesSearch && matchesZone;
  });

  renderFoodTable(filtered);
}

// ---------------- Floating Meal Selector ----------------
function showMealSelector(event, foodId) {
  // Remove any existing popup
  if (currentPopup) {
    currentPopup.remove();
    currentPopup = null;
  }

  // Create popup
  const popup = document.createElement('div');
  popup.classList.add('meal-selector-floating');
  popup.innerHTML = `
    <button class="btn btn-sm btn-outline-primary" onclick="addFoodToMeal('${foodId}', 'breakfast')">Breakfast</button>
    <button class="btn btn-sm btn-outline-primary" onclick="addFoodToMeal('${foodId}', 'lunch')">Lunch</button>
    <button class="btn btn-sm btn-outline-primary" onclick="addFoodToMeal('${foodId}', 'dinner')">Dinner</button>
    <button class="btn btn-sm btn-outline-primary" onclick="addFoodToMeal('${foodId}', 'snacks')">Snacks</button>
  `;

  document.body.appendChild(popup);

  // Position floating popup near button
  const rect = event.target.getBoundingClientRect();
  popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
  popup.style.left = `${rect.left + window.scrollX}px`;

  currentPopup = popup;

  // Close popup when clicking outside
  document.addEventListener('click', function handler(e) {
    if (!popup.contains(e.target) && e.target !== event.target) {
      popup.remove();
      currentPopup = null;
      document.removeEventListener('click', handler);
    }
  });
}

// ---------------- Add & Remove Foods ----------------
function addFoodToMeal(foodId, mealType) {
  const food = foods.find(f => f.id == foodId);
  if (!food) return;

  dietChart[mealType].push(food);
  renderMealSection(mealType);

  if (currentPopup) {
    currentPopup.remove();
    currentPopup = null;
  }
}

function renderMealSection(mealType) {
  const container = document.getElementById(mealType);
  container.innerHTML = "";

  dietChart[mealType].forEach((food, index) => {
    container.innerHTML += `
      <div class="meal-item">
        <span>${food.name}</span>
        <button onclick="removeFoodFromMeal('${mealType}', ${index})">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
  });
}

function removeFoodFromMeal(mealType, index) {
  dietChart[mealType].splice(index, 1);
  renderMealSection(mealType);
}

// ---------------- Save Diet Chart ----------------
function saveDietChart() {
  const patientId = document.getElementById("patientSelect").value;
  if (!patientId) {
    alert("Please select a patient before saving.");
    return;
  }

  if (!savedDietCharts[patientId]) {
    savedDietCharts[patientId] = [];
  }

  savedDietCharts[patientId].push(JSON.parse(JSON.stringify(dietChart)));
  resetMealPlanner();
  renderSavedCharts();
  alert("Diet chart saved successfully!");
}

// ---------------- Saved Charts Rendering ----------------
function renderSavedCharts() {
  const patientId = document.getElementById("patientSelect").value;
  const container = document.getElementById("savedDietCharts");

  if (!container) return;

  if (!patientId) {
    container.innerHTML = `<p class="text-muted">Select a patient to view saved diet charts.</p>`;
    return;
  }

  const lists = savedDietCharts[patientId];
  const patient = dietPatients.find(p => p.id == patientId) || { name: 'Unknown' };

  if (!lists || lists.length === 0) {
    container.innerHTML = `<p class="text-muted">No diet charts saved yet for <strong>${patient.name}</strong>.</p>`;
    return;
  }

  let html = `<h5>Saved Diet Charts for ${patient.name}</h5><div class="saved-diet-list mt-2">`;
  lists.forEach((chart, idx) => {
    html += `
      <div class="diet-entry">
        <div>
          <strong>${patient.name}</strong>
          <div class="text-muted small">Diet Chart #${idx + 1}</div>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-success me-2" onclick="viewDietChart('${patientId}', ${idx})">View</button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteSavedChart('${patientId}', ${idx})">Delete</button>
        </div>
      </div>
    `;
  });
  html += `</div>`;
  container.innerHTML = html;
}

function deleteSavedChart(patientId, index) {
  if (!savedDietCharts[patientId]) return;
  if (!confirm('Delete this diet chart?')) return;
  savedDietCharts[patientId].splice(index, 1);
  renderSavedCharts();
}

// ---------------- Ensure Modal Exists ----------------
function ensureDietChartModal() {
  if (document.getElementById('dietChartModal')) return;

  const modalHtml = `
  <div class="modal fade" id="dietChartModal" tabindex="-1" aria-labelledby="dietChartModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="dietChartModalLabel">Diet Chart Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="dietChartModalBody"></div>
        <div class="modal-footer">
          <button class="btn btn-outline-primary" id="printDietChartBtn">
            <i class="fas fa-print"></i> Print
          </button>
          <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  document.getElementById('printDietChartBtn').addEventListener('click', printDietChart);
}

// ---------------- View Diet Chart Modal ----------------
function viewDietChart(patientId, chartIndex) {
  ensureDietChartModal();

  if (!savedDietCharts[patientId] || !savedDietCharts[patientId][chartIndex]) {
    alert('Diet chart not found.');
    return;
  }

  const patient = dietPatients.find(p => p.id == patientId) || { name: 'Unknown', vikriti: '-', disease: '-' };
  const chart = savedDietCharts[patientId][chartIndex];

  let content = `
    <div class="diet-chart-print">
      <h4>${patient.name} — Diet Chart #${chartIndex + 1}</h4>
      <div class="row mb-2">
        <div class="col"><strong>Vikriti:</strong> ${patient.vikriti}</div>
        <div class="col"><strong>Disease:</strong> ${patient.disease}</div>
        <div class="col text-end"><strong>Saved on:</strong> ${new Date().toLocaleString()}</div>
      </div>
      <hr/>
  `;

  function mealTable(mealName, items) {
    if (!items || items.length === 0) return `<p class="text-muted">No items for ${mealName}.</p>`;
    let rows = items.map(i => `
      <tr>
        <td>${i.name}</td>
        <td class="text-end">${i.calories ?? '-'}</td>
        <td class="text-end">${i.protein ?? '-'}</td>
        <td class="text-end">${i.carbs ?? '-'}</td>
        <td class="text-end">${i.fats ?? '-'}</td>
      </tr>
    `).join('');
    return `
      <h5 style="margin-top:12px;">${mealName}</h5>
      <div class="table-responsive">
        <table class="table table-sm table-bordered">
          <thead class="table-light">
            <tr>
              <th>Dish</th>
              <th class="text-end">Calories</th>
              <th class="text-end">Protein (g)</th>
              <th class="text-end">Carbs (g)</th>
              <th class="text-end">Fats (g)</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  }

  content += mealTable('Breakfast', chart.breakfast);
  content += mealTable('Lunch', chart.lunch);
  content += mealTable('Dinner', chart.dinner);
  content += mealTable('Snacks', chart.snacks);

  content += `</div>`;

  document.getElementById('dietChartModalBody').innerHTML = content;
  const modalEl = document.getElementById('dietChartModal');
  const bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
  bsModal.show();
}

// ---------------- Print Diet Chart ----------------
function printDietChart() {
  const modalBody = document.getElementById("dietChartModalBody");
  if (!modalBody) return;

  const printContent = modalBody.innerHTML;
  const win = window.open('', '_blank', 'width=900,height=700');
  win.document.write(`
    <html>
      <head>
        <title>Print Diet Chart</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #222; }
          h4 { text-align:center; margin-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 6px 8px; border: 1px solid #ddd; }
          thead th { background: #f8f9fa; }
        </style>
      </head>
      <body>${printContent}</body>
    </html>
  `);
  win.document.close();
  win.focus();
  setTimeout(() => { win.print(); win.close(); }, 400);
}
