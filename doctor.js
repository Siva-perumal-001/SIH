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
