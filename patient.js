
// Initialize time dropdowns
const hourSelect = document.getElementById('appointmentHour');
const minuteSelect = document.getElementById('appointmentMinute');
for (let i = 1; i <= 12; i++) { hourSelect.innerHTML += `<option>${i}</option>`; }
for (let i = 0; i < 60; i++) { minuteSelect.innerHTML += `<option>${i.toString().padStart(2,'0')}</option>`; }

// Sidebar toggle
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const toggleSidebar = document.getElementById('toggleSidebar');
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('hide');
    overlay.classList.toggle('show');
});
overlay.addEventListener('click', () => {
    sidebar.classList.add('hide');
    overlay.classList.remove('show');
});
window.addEventListener('resize', () => {
    window.innerWidth >= 768 ? (sidebar.classList.remove('hide'), overlay.classList.remove('show')) : sidebar.classList.add('hide');
});
window.addEventListener('load', () => {
    window.innerWidth >= 768 ? (sidebar.classList.remove('hide'), overlay.classList.remove('show')) : sidebar.classList.add('hide');
});
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        activateSection(this.getAttribute('data-section'));
        if(window.innerWidth < 768){sidebar.classList.add('hide'); overlay.classList.remove('show');}
    });
});
function activateSection(sectionId){
    navLinks.forEach(l => l.classList.remove('active'));
    const link = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if(link) link.classList.add('active');
    contentSections.forEach(sec => sec.classList.add('d-none'));
    const target = document.getElementById(sectionId);
    if(target) target.classList.remove('d-none');
}
document.getElementById('btnBookAppointment').addEventListener('click', () => activateSection('appointments'));
document.getElementById('btnViewDietChart').addEventListener('click', () => activateSection('diet-charts'));
document.getElementById('btnAccessReports').addEventListener('click', () => activateSection('reports'));

// Doctor Info with more detailed info
const doctorsInfo = {
    "Dr. Varsha": { 
        specialization: "Cardiologist", 
        experience: "10 years", 
        contact: "varsha@example.com", 
        about: "Expert in heart-related treatments.", 
        qualifications: "MBBS, MD (Cardiology)", 
        timings: "9:00 AM - 4:00 PM", 
        location: "City Hospital, Main Street" 
    },
    "Dr. Kumar": { 
        specialization: "Endocrinologist", 
        experience: "8 years", 
        contact: "kumar@example.com", 
        about: "Focuses on hormone disorders.", 
        qualifications: "MBBS, MD (Endocrinology)", 
        timings: "10:00 AM - 5:00 PM", 
        location: "Health Care Clinic, 2nd Avenue" 
    },
    "Dr. Sharma": { 
        specialization: "Nutritionist", 
        experience: "6 years", 
        contact: "sharma@example.com", 
        about: "Provides dietary advice.", 
        qualifications: "BSc Nutrition, MSc Dietetics", 
        timings: "11:00 AM - 6:00 PM", 
        location: "Wellness Center, Park Road" 
    }
};

const patientReportsInfo = {
    "Blood Test": "Hemoglobin: 13.5 g/dL<br>WBC: 6000 /µL<br>Platelets: 250,000 /µL<br>Comments: Normal range.",
    "Diet Plan": "Breakfast: Oatmeal with fruits<br>Lunch: Rice and vegetables<br>Dinner: Soup and salad.",
    "Annual Health Check": "BP: 120/80 mmHg<br>Heart Rate: 72 bpm<br>Cholesterol: 180 mg/dL",
    "Blood Test Report": "Glucose: 95 mg/dL<br>Creatinine: 1.1 mg/dL<br>Comments: Healthy.",
    "Diet Recommendation": "Add more leafy greens and reduce processed foods."
};

const dietChartsInfo = {
    "1": "Breakfast: Poha<br>Lunch: Dal and vegetables<br>Dinner: Fish and salad",
    "2": "Breakfast: Idli<br>Lunch: Rajma and salad<br>Dinner: Soup and bread"
};

// Add events
function addAllEvents(){
    // Dashboard doctor details -> open appointments section and show modal
    document.querySelectorAll('.doctor-details-dashboard').forEach(btn => {
        btn.addEventListener('click', e => {
            const row = e.target.closest('tr');
            const doctor = row.children[1].textContent;
            activateSection('appointments');
            setTimeout(() => {
                const info = doctorsInfo[doctor];
                if(info){
                    document.getElementById('doctorDetailsContent').innerHTML = `
                        <p><strong>Name:</strong> ${doctor}</p>
                        <p><strong>Specialization:</strong> ${info.specialization}</p>
                        <p><strong>Experience:</strong> ${info.experience}</p>
                        <p><strong>Contact:</strong> ${info.contact}</p>
                        <p><strong>About:</strong> ${info.about}</p>
                        <p><strong>Qualifications:</strong> ${info.qualifications}</p>
                        <p><strong>Clinic Timings:</strong> ${info.timings}</p>
                        <p><strong>Location:</strong> ${info.location}</p>
                    `;
                    new bootstrap.Modal(document.getElementById('doctorDetailsModal')).show();
                }
            }, 100);
        });
    });

    // Appointments & Today schedule doctor details
    document.querySelectorAll('#appointments .doctor-details, #todayScheduleTable .doctor-details').forEach(btn => {
        btn.addEventListener('click', e => {
            const row = e.target.closest('tr');
            const doctor = row.children[2].textContent;
            const info = doctorsInfo[doctor];
            if(info){
                document.getElementById('doctorDetailsContent').innerHTML = `
                    <p><strong>Name:</strong> ${doctor}</p>
                    <p><strong>Specialization:</strong> ${info.specialization}</p>
                    <p><strong>Experience:</strong> ${info.experience}</p>
                    <p><strong>Contact:</strong> ${info.contact}</p>
                    <p><strong>About:</strong> ${info.about}</p>
                    <p><strong>Qualifications:</strong> ${info.qualifications}</p>
                    <p><strong>Clinic Timings:</strong> ${info.timings}</p>
                    <p><strong>Location:</strong> ${info.location}</p>
                `;
                new bootstrap.Modal(document.getElementById('doctorDetailsModal')).show();
            }
        });
    });

    document.querySelectorAll('#latestReportsTable .report-view, #reportsTable .report-view').forEach(btn => {
        btn.addEventListener('click', e => {
            const row = e.target.closest('tr');
            const name = row.children[0].textContent;
            const content = patientReportsInfo[name] || "No details.";
            document.getElementById('patientReportContent').innerHTML = `<p><strong>${name}</strong></p>${content}`;
            new bootstrap.Modal(document.getElementById('patientReportModal')).show();

            document.getElementById('downloadReport').onclick = () => {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                let text = `${name}\n\n` + content.replace(/<br>/g, "\n").replace(/<[^>]*>/g, "");
                doc.text(text, 10, 10);
                doc.save(`${name}.pdf`);
            };
        });
    });

    document.querySelectorAll('.view-diet').forEach(btn => {
        btn.addEventListener('click', e => {
            const row = e.target.closest('tr');
            const chartNo = row.children[0].textContent;
            const content = dietChartsInfo[chartNo] || "No details.";
            document.getElementById('dietChartContent').innerHTML = `<p><strong>Diet Chart ${chartNo}</strong></p>${content}`;
            new bootstrap.Modal(document.getElementById('dietChartModal')).show();

            document.getElementById('downloadDietChart').onclick = () => {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                let text = `Diet Chart ${chartNo}\n\n` + content.replace(/<br>/g, "\n").replace(/<[^>]*>/g, "");
                doc.text(text, 10, 10);
                doc.save(`Diet_Chart_${chartNo}.pdf`);
            };
        });
    });
}
addAllEvents();

// Appointment form
document.getElementById('appointmentForm').addEventListener('submit', e => {
    e.preventDefault();
    const date = document.getElementById('appointmentDate').value;
    const hour = document.getElementById('appointmentHour').value;
    const minute = document.getElementById('appointmentMinute').value;
    const ampm = document.getElementById('appointmentAMPM').value;
    const time = `${hour}:${minute} ${ampm}`;
    const doctor = document.getElementById('appointmentDoctor').value;
    const table = document.getElementById('appointmentsTable').querySelector('tbody');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${date}</td><td>${time}</td><td>${doctor}</td><td><span class="badge bg-warning text-dark">Pending</span></td><td><button class="btn btn-outline-primary btn-sm doctor-details">Doctor Details</button></td>`;
    table.appendChild(row);
    addAllEvents();
    bootstrap.Modal.getInstance(document.getElementById('newAppointmentModal')).hide();
});

// Edit profile
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
document.getElementById('editProfileBtn').addEventListener('click', () => {
    document.getElementById('editName').value = profileName.textContent.replace('Name: ', '');
    document.getElementById('editEmail').value = profileEmail.textContent.replace('Email: ', '');
    new bootstrap.Modal(document.getElementById('editProfileModal')).show();
});
document.getElementById('editProfileForm').addEventListener('submit', e => {
    e.preventDefault();
    profileName.textContent = "Name: " + document.getElementById('editName').value;
    profileEmail.textContent = "Email: " + document.getElementById('editEmail').value;
    bootstrap.Modal.getInstance(document.getElementById('editProfileModal')).hide();
});
