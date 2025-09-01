// Pricing data
const pricing = {
    hackathon: {
        1: 199,
        2: 349,
        3: 499,
        4: 649
    },
    coding: {
        1: 149,
        2: 289
    },
    combo: {
        1: 299,
        2: 549,
        3: 799,
        4: 1049
    }
};

// Google Forms URLs
const formUrls = {
    hackathon: 'https://docs.google.com/forms/d/e/1FAIpQLSe5_d-nMZ1Nu4TtHjnwgVA-0-_-V7TMRGJ_xgwa4lIKlRNdAA/viewform?usp=header',
    coding: 'https://docs.google.com/forms/d/e/1FAIpQLSdFSuZsoyLUoY66d_RwBQkLh6obU8PygfS3nvUA_jEUsZQ6IQ/viewform?usp=header',
    combo: 'https://docs.google.com/forms/d/e/1FAIpQLSdhI22TIGOkShGu8kLeI3-AX4QjVD15BbhaNazYtb8xsaVXfQ/viewform?usp=header'
};

// State variables
let selectedEvent = null;
let selectedTeamSize = null;

// Problem statements for each theme
const themeProblems = {
    'Tourism': [
        "Smart Tourist Guide Application – AI-powered app suggesting routes, attractions, food, and stays.",
        "Crowd & Queue Management – IoT/AI system to monitor tourist spot density and suggest alternates.",
        "Multilingual Real-Time Translator – Speech-to-speech translator for tourists.",
        "Accessible Tourism for Differently-Abled – Platform with accessibility info and guides.",
        "Smart Tourism Chatbot – Multilingual chatbot with maps, transport, and booking.",
        "AR for Heritage Tourism – AR-based 3D reconstructions and immersive historical info."
    ],
    'Renewable & Sustainable Energy': [
        "Smart Energy Consumption Monitoring – IoT + AI to track usage and optimize scheduling.",
        "Energy Saving Challenge App – Gamified rewards for reducing consumption.",
        "IoT Smart Home Energy System – Auto-control appliances to save electricity.",
        "Smart Street Light Controller – Auto ON/OFF and dimming based on motion."
    ],
    'Blockchain & Cybersecurity': [
        "Blockchain for Secure Transactions – Tamper-proof e-commerce and banking.",
        "Next-Gen Authentication – Passwordless login with biometrics or cryptographic keys.",
        "Cyber Safety for Children – Smart parental controls and safe browsing tools.",
        "Blockchain-based Credential Verification – Secure certificate storage and sharing.",
        "Secure Digital Voting Platform – Blockchain + encryption + biometrics.",
        "AI-based Fraud Detection – ML models for anomaly detection in transactions."
    ],
    'Smart Education': [
        "Personalized Learning Recommendation System – AI-based content suggestions.",
        "AI Career Advisor – Personalized career guidance with market trends.",
        "Skill Gap Analysis Tool – Identify missing skills vs. industry demand.",
        "Smart Classroom Management – IoT system to monitor classrooms.",
        "Smart Exam Proctoring – AI for secure online exams."
    ],
    'Disaster Management': [
        "Wildfire Mapping & Alerting – AI + IoT early detection system.",
        "Crowdsourced Disaster Information – Citizen-reported incidents with location & media.",
        "Offline Communication App – Bluetooth/Wi-Fi Direct disaster chat.",
        "Resource & Volunteer Management – Platform for better relief coordination.",
        "Damage Assessment via Computer Vision – AI analysis from satellite/drone images."
    ],
    'Games & Toys': [
        "Gamified Learning Platforms – Interactive STEM learning with AR/VR.",
        "AI-Powered Career Guidance – Personalized paths for students."
    ],
    'Health Tech': [
        "Connected Health Devices – IoT/wearables for chronic care.",
        "Mental Health Assistants – Chatbots & mood-tracking apps.",
        "Telemedicine for Rural Areas – Affordable diagnostic kits + remote consults.",
        "Mental Health Chatbot with Sentiment Analysis.",
        "Remote Patient Monitoring – IoT for continuous patient data.",
        "Telemedicine App for Rural Health Centers."
    ],
    'Heritage & Culture': [
        "Music Composition with AI.",
        "Digital Museum Guide App.",
        "Multilingual Translation Tool for Tourists.",
        "Virtual Tour of Heritage Sites (360°).",
        "Gamified Culture Learning App.",
        "Smart Heritage Tourism Planner."
    ],
    'Agriculture, Food Tech & Rural Development': [
        "Pest & Disease Alert System – Upload crop images for diagnosis.",
        "Smart Farming with IoT – Automated irrigation/fertilization.",
        "Rural E-commerce Platforms – Farmers connected directly to buyers.",
        "Crop Yield Prediction – AI/ML with weather & satellite data.",
        "Food Donation & Waste Reduction App.",
        "AI Crop Disease Detection – Computer vision based.",
        "IoT-based Smart Irrigation System."
    ],
    'Transportation & Logistics': [
        "Predictive Analytics for Traffic – Forecasting with IoT + AI.",
        "Smart Public Transport Scheduling with real-time occupancy.",
        "Smart Parking System with Live Updates.",
        "Smart Bus/Train Tracking App.",
        "Carpooling & Ride-Sharing Platform.",
        "Parking Finder App.",
        "Crowdsourced Road Condition Reporter."
    ],
    'Robotics & Drones': [
        "Drone-based Traffic Monitoring Systems.",
        "Drone-assisted Rescue Management.",
        "AI Sign Language Interpreter.",
        "Voice-based Navigation for Public Places."
    ],
    'Fitness & Sports': [
        "Diet & Nutrition Planner – Personalized diet generator.",
        "Community Sports Booking App – Find & book local courts/grounds.",
        "Smart Sports Event Management System – Registrations, scheduling & live updates."
    ]
};

// Utility functions
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    const isClickInsideMenu = navLinks.contains(event.target) || menuToggle.contains(event.target);
    
    if (!isClickInsideMenu && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Close menu when clicking a navigation link or home button
document.querySelectorAll('.nav-links button, .nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('active');
    });
});

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function showThemes() {
    document.getElementById('main-page').classList.add('hidden');
    document.getElementById('themes-page').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function showMain() {
    document.getElementById('themes-page').classList.add('hidden');
    document.getElementById('main-page').classList.remove('hidden');
    window.scrollTo(0, 0);
}

// Theme overlay hover handling
document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        const theme = card.getAttribute('data-theme');
        const overlay = card.querySelector('.theme-overlay');
        const content = card.querySelector('.theme-overlay-content');
        if (themeProblems[theme]) {
            content.innerHTML = themeProblems[theme].map(p => `<p>• ${p}</p>`).join('');
            overlay.classList.remove('hidden');
        }
    });

    card.addEventListener('mouseout', () => {
        const overlay = card.querySelector('.theme-overlay');
        overlay.classList.add('hidden');
    });
});

function selectEvent(eventType) {
    // Clear previous selections
    document.querySelectorAll('.event-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Select new event
    selectedEvent = eventType;
    document.getElementById('event-' + eventType).classList.add('selected');
    
    // Reset team size if coding competition and team size > 2
    if (eventType === 'coding' && selectedTeamSize && selectedTeamSize > 2) {
        selectedTeamSize = null;
        document.querySelectorAll('.team-option').forEach(option => {
            option.classList.remove('selected');
        });
    }
    
    // Update team options based on event type
    updateTeamOptions();
    updatePricing();
}

function updateTeamOptions() {
    const team3 = document.getElementById('team-3');
    const team4 = document.getElementById('team-4');
    
    if (selectedEvent === 'coding') {
        team3.classList.add('disabled');
        team4.classList.add('disabled');
    } else {
        team3.classList.remove('disabled');
        team4.classList.remove('disabled');
    }
}

function selectTeamSize(size) {
    // Check if size is allowed for selected event
    if (selectedEvent === 'coding' && size > 2) {
        return;
    }
    
    // Clear previous selections
    document.querySelectorAll('.team-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Select new team size
    selectedTeamSize = size;
    document.getElementById('team-' + size).classList.add('selected');
    
    updatePricing();
}

function updatePricing() {
    const pricingDisplay = document.getElementById('pricing-display');
    const priceAmount = document.getElementById('price-amount');
    const priceDetails = document.getElementById('price-details');
    
    if (selectedEvent && selectedTeamSize && pricing[selectedEvent][selectedTeamSize]) {
        const price = pricing[selectedEvent][selectedTeamSize];
        priceAmount.textContent = '₹' + price;
        priceDetails.textContent = selectedEvent.charAt(0).toUpperCase() + selectedEvent.slice(1) + ' - ' + selectedTeamSize + ' member' + (selectedTeamSize > 1 ? 's' : '');
        pricingDisplay.classList.remove('hidden');
    } else {
        pricingDisplay.classList.add('hidden');
    }
}

function redirectToForm() {
    if (selectedEvent && formUrls[selectedEvent]) {
        window.open(formUrls[selectedEvent], '_blank');
    }
}
