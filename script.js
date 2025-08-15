// Sample job data
const jobData = [
    { id: 1, title: "Marketing Manager", company: "Tech Solutions Ltd", location: "Accra", salary: "GHS 4,000 - 6,000", type: "Full-time", description: "We're looking for an experienced Marketing Manager to lead our digital marketing efforts." },
    { id: 2, title: "Software Developer", company: "Innovate Ghana", location: "Kumasi", salary: "GHS 3,500 - 5,500", type: "Full-time", description: "Join our growing tech team to develop innovative solutions for the Ghanaian market." },
    { id: 3, title: "Finance Assistant", company: "Global Finance Group", location: "Accra", salary: "GHS 2,500 - 3,500", type: "Part-time", description: "Support our finance team with daily accounting operations and reporting." },
    { id: 4, title: "Customer Service Rep", company: "Service First Ghana", location: "Takoradi", salary: "GHS 1,800 - 2,500", type: "Full-time", description: "Provide excellent customer service to our clients across multiple channels." },
    { id: 5, title: "HR Coordinator", company: "People Solutions", location: "Tamale", salary: "GHS 2,800 - 3,800", type: "Contract", description: "Support HR operations and recruitment activities for our Northern Ghana office." },
    { id: 6, title: "Sales Executive", company: "Retail Plus", location: "Accra", salary: "GHS 1,500 + Commission", type: "Full-time", description: "Drive sales and build relationships with clients in the retail sector." }
];

// Tab functionality with accessibility
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        tabBtns.forEach((b, i) => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
            b.setAttribute('tabindex', '-1');
            tabContents[i].classList.remove('active');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        btn.setAttribute('tabindex', '0');
        tabContents[idx].classList.add('active');
    });
    // Keyboard navigation
    btn.addEventListener('keydown', (e) => {
        if (e.key === "ArrowRight") {
            tabBtns[(idx + 1) % tabBtns.length].focus();
        } else if (e.key === "ArrowLeft") {
            tabBtns[(idx - 1 + tabBtns.length) % tabBtns.length].focus();
        }
    });
});

// Charts
window.addEventListener('DOMContentLoaded', () => {
    if (window.Chart) {
        // Startup Costs Chart
        const costCtx = document.getElementById('costChart').getContext('2d');
        new Chart(costCtx, {
            type: 'bar',
            data: {
                labels: ['Platform Development', 'Marketing & Branding', 'Operations (1st Year)'],
                datasets: [{
                    label: 'USD',
                    data: [50000, 20000, 30000],
                    backgroundColor: ['#D4AF37', '#B8860B', '#FFD700'],
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: value => '$' + value.toLocaleString() }
                    }
                }
            }
        });
        // Revenue Projections Chart
        const revenueCtx = document.getElementById('revenueChart').getContext('2d');
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3'],
                datasets: [{
                    label: 'Projected Revenue',
                    data: [150000, 500000, 1200000],
                    borderColor: '#D4AF37',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    fill: true,
                    tension: 0.3,
                    pointBackgroundColor: '#D4AF37',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { ticks: { callback: value => '$' + value.toLocaleString() } }
                }
            }
        });
    }
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Job search functionality
function displayJobs(jobs) {
    const jobResults = document.getElementById('jobResults');
    jobResults.innerHTML = '';
    if (jobs.length === 0) {
        jobResults.innerHTML = '<p class="no-results">No jobs found matching your criteria.</p>';
        return;
    }
    jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <div class="job-meta">
                <span><i class="fas fa-building" aria-hidden="true"></i> ${job.company}</span>
                <span><i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${job.location}</span>
                <span><i class="fas fa-money-bill-wave" aria-hidden="true"></i> ${job.salary}</span>
                <span><i class="fas fa-clock" aria-hidden="true"></i> ${job.type}</span>
            </div>
            <p>${job.description}</p>
            <button class="apply-btn" data-id="${job.id}">Apply Now</button>
        `;
        jobResults.appendChild(jobCard);
    });
    document.querySelectorAll('.apply-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            openModal('Application started for Job ID: ' + this.getAttribute('data-id') + '. You\'ll be redirected to the application form.');
        });
    });
}

// Initial job display
displayJobs(jobData);

// Search functionality
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const keywords = document.getElementById('jobKeywords').value.toLowerCase();
    const location = document.getElementById('jobLocation').value;
    const filteredJobs = jobData.filter(job => {
        const matchesKeyword = job.title.toLowerCase().includes(keywords) ||
                              job.description.toLowerCase().includes(keywords) ||
                              job.company.toLowerCase().includes(keywords);
        const matchesLocation = location === '' || job.location.toLowerCase() === location;
        return matchesKeyword && matchesLocation;
    });
    displayJobs(filteredJobs);
});

// Button functionality
document.getElementById('jobSeekerBtn').addEventListener('click', function() {
    document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('jobKeywords').focus();
});

document.getElementById('postJobBtn').addEventListener('click', function() {
    openModal('Employer registration form will open. Please create an employer account to post jobs.');
});

document.getElementById('employerLoginBtn').addEventListener('click', function() {
    openModal('Employer login form will open. Enter your credentials to access your dashboard.');
});

// Contact modal logic
const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
const closeModal = document.getElementById('closeModal');
const contactForm = document.getElementById('contactForm');
const contactFeedback = document.getElementById('contactFeedback');

contactBtn.addEventListener('click', () => {
    contactModal.style.display = "block";
    contactModal.focus();
});

closeModal.addEventListener('click', () => {
    contactModal.style.display = "none";
    contactFeedback.textContent = "";
});

closeModal.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
        contactModal.style.display = "none";
        contactFeedback.textContent = "";
    }
});

// Modal close on outside click
window.onclick = function(event) {
    if (event.target == contactModal) {
        contactModal.style.display = "none";
        contactFeedback.textContent = "";
    }
};

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    contactFeedback.textContent = "Thank you for contacting us! We'll respond within 24 hours.";
    contactForm.reset();
    setTimeout(() => {
        contactModal.style.display = "none";
        contactFeedback.textContent = "";
    }, 2000);
});

function openModal(message) {
    contactModal.style.display = "block";
    contactFeedback.textContent = message;
    contactModal.focus();
}