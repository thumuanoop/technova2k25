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

// Problem statements and descriptions for each theme
const themeProblems = {
    'Tourism': [
        {
            question: "T1.Smart Tourist Guide Application",
            description: "Develop an AI-driven mobile app that personalizes travel itineraries, recommending optimal routes, local attractions, dining options, and accommodations based on user preferences and real-time data."
        },
        {
            question: "T2.Crowd & Queue Management",
            description: "Create an IoT and AI-based system to monitor real-time crowd density at tourist spots and suggest alternative destinations or optimal visiting times to reduce congestion."
        },
        {
            question: "T3.Multilingual Real-Time Translator",
            description: "Build a speech-to-speech translation app to assist tourists in communicating across languages, enhancing their travel experience in diverse regions."
        },
        {
            question: "T4.Accessible Tourism for Differently-Abled",
            description: "Design a platform providing accessibility information and tailored guides for differently-abled travelers, ensuring inclusive tourism experiences."
        },
        {
            question: "T5.Smart Tourism Chatbot",
            description: "Develop a multilingual chatbot integrating maps, transport schedules, and booking systems to assist tourists with real-time travel planning."
        },
        {
            question: "T6.AR for Heritage Tourism",
            description: "Create an AR-based app offering 3D reconstructions and immersive historical narratives to enhance the exploration of cultural heritage sites."
        }
    ],
    'Renewable & Sustainable Energy': [
        {
            question: "1.Smart Energy Consumption Monitoring",
            description: "Build an IoT and AI system to track and analyze energy usage in real-time, optimizing consumption schedules for households or businesses."
        },
        {
            question: "2.Energy Saving Challenge App",
            description: "Develop a gamified app that rewards users for reducing energy consumption through challenges and real-time feedback."
        },
        {
            question: "3.IoT Smart Home Energy System",
            description: "Create an IoT-based system to automatically control home appliances, minimizing energy waste while maintaining user comfort."
        },
        {
            question: "4.Smart Street Light Controller",
            description: "Design a system that automatically turns street lights on/off or dims them based on motion detection, saving energy in public spaces."
        }
    ],
    'Blockchain & Cybersecurity': [
        {
            question: "1.Blockchain for Secure Transactions",
            description: "Develop a tamper-proof blockchain platform for secure e-commerce and banking transactions, ensuring data integrity and user trust."
        },
        {
            question: "2.Next-Gen Authentication",
            description: "Create a passwordless login system using biometrics or cryptographic keys for enhanced security and user convenience."
        },
        {
            question: "3.Cyber Safety for Children",
            description: "Build a platform with smart parental controls and safe browsing tools to protect children from online threats."
        },
        {
            question: "4.Blockchain-based Credential Verification",
            description: "Design a secure system for storing and sharing digital certificates using blockchain, preventing fraud and ensuring authenticity."
        },
        {
            question: "5.Secure Digital Voting Platform",
            description: "Develop a blockchain-based voting system with encryption and biometrics for transparent and secure elections."
        },
        {
            question: "6.AI-based Fraud Detection",
            description: "Create an ML-powered system to detect anomalies and prevent fraudulent transactions in real-time."
        }
    ],
    'Smart Education': [
        {
            question: "1.Personalized Learning Recommendation System",
            description: "Build an AI-based platform that suggests personalized learning content based on a student's interests and performance."
        },
        {
            question: "2.AI Career Advisor",
            description: "Develop an AI tool that provides personalized career guidance by analyzing market trends and individual skills."
        },
        {
            question: "3.Skill Gap Analysis Tool",
            description: "Create a system to identify skill gaps by comparing user skills with industry demands, offering tailored learning paths."
        },
        {
            question: "4.Smart Classroom Management",
            description: "Design an IoT-based system to monitor classroom activities, attendance, and resource usage for efficient management."
        },
        {
            question: "5.Smart Exam Proctoring",
            description: "Build an AI-powered platform for secure online exams, detecting cheating through behavior analysis."
        }
    ],
    'Disaster Management': [
        {
            question: "1.Wildfire Mapping & Alerting",
            description: "Develop an AI and IoT-based system for early wildfire detection, mapping, and real-time alerts to authorities."
        },
        {
            question: "2.Crowdsourced Disaster Information",
            description: "Create a platform for citizens to report disaster incidents with location and media, aiding rapid response efforts."
        },
        {
            question: "3.Offline Communication App",
            description: "Build a Bluetooth or Wi-Fi Direct-based app for communication during disasters when networks are down."
        },
        {
            question: "4.Resource & Volunteer Management",
            description: "Design a platform to coordinate relief resources and volunteers efficiently during disaster response."
        },
        {
            question: "5.Damage Assessment via Computer Vision",
            description: "Develop an AI system to analyze satellite or drone images for rapid disaster damage assessment."
        }
    ],
    'Games & Toys': [
        {
            question: "1.Gamified Learning Platforms",
            description: "Create interactive STEM learning platforms using AR/VR to make education engaging and fun for all ages."
        },
        {
            question: "2.AI-Powered Career Guidance",
            description: "Develop an AI-driven game that guides students toward career paths through interactive scenarios and skill assessments."
        }
    ],
    'Health Tech': [
        {
            question: "1.Connected Health Devices",
            description: "Build IoT-based wearables to monitor chronic conditions, providing real-time health data to patients and doctors."
        },
        {
            question: "2.Mental Health Assistants",
            description: "Create a chatbot and mood-tracking app to support mental health with personalized coping strategies."
        },
        {
            question: "3.Telemedicine for Rural Areas",
            description: "Develop affordable diagnostic kits and a telemedicine platform for remote healthcare access in rural regions."
        },
        {
            question: "4.Mental Health Chatbot with Sentiment Analysis",
            description: "Build a chatbot that uses sentiment analysis to provide tailored mental health support and resources."
        },
        {
            question: "5.Remote Patient Monitoring",
            description: "Create an IoT system for continuous patient monitoring, alerting healthcare providers to critical changes."
        },
        {
            question: "6.Telemedicine App for Rural Health Centers",
            description: "Develop a telemedicine app to connect rural health centers with specialists for remote consultations."
        }
    ],
    'Heritage & Culture': [
        {
            question: "1.Music Composition with AI",
            description: "Create an AI-powered tool to compose music inspired by cultural heritage, preserving traditional sounds."
        },
        {
            question: "2.Digital Museum Guide App",
            description: "Develop a mobile app offering interactive guides and audio tours for museums and cultural sites."
        },
        {
            question: "3.Multilingual Translation Tool for Tourists",
            description: "Build a translation tool to help tourists understand cultural artifacts and signage in multiple languages."
        },
        {
            question: "4.Virtual Tour of Heritage Sites (360°)",
            description: "Create a 360° virtual tour platform for exploring heritage sites remotely with immersive details."
        },
        {
            question: "5.Gamified Culture Learning App",
            description: "Develop a gamified app to teach users about cultural traditions and history through interactive challenges."
        },
        {
            question: "6.Smart Heritage Tourism Planner",
            description: "Build an AI-based planner for creating personalized heritage tourism itineraries with cultural insights."
        }
    ],
    'Agriculture, Food Tech & Rural Development': [
        {
            question: "1.Pest & Disease Alert System",
            description: "Create an app where farmers upload crop images for AI-based pest and disease diagnosis and alerts."
        },
        {
            question: "2.Smart Farming with IoT",
            description: "Develop an IoT system for automated irrigation and fertilization, optimizing crop growth and resource use."
        },
        {
            question: "3.Rural E-commerce Platforms",
            description: "Build a platform connecting farmers directly to buyers, streamlining agricultural supply chains."
        },
        {
            question: "4.Crop Yield Prediction",
            description: "Create an AI/ML model using weather and satellite data to predict crop yields accurately."
        },
        {
            question: "5.Food Donation & Waste Reduction App",
            description: "Develop an app to coordinate food donations and reduce waste by connecting donors with NGOs."
        },
        {
            question: "6.AI Crop Disease Detection",
            description: "Build a computer vision system to detect crop diseases from images, providing actionable insights."
        },
        {
            question: "7.IoT-based Smart Irrigation System",
            description: "Create an IoT solution for smart irrigation, adjusting water usage based on soil and weather data."
        }
    ],
    'Transportation & Logistics': [
        {
            question: "1.Predictive Analytics for Traffic",
            description: "Develop an IoT and AI-based system to forecast traffic patterns and optimize commuting routes."
        },
        {
            question: "2.Smart Public Transport Scheduling",
            description: "Create a system for real-time public transport scheduling based on occupancy and demand."
        },
        {
            question: "3.Smart Parking System with Live Updates",
            description: "Build an app providing real-time parking availability updates for urban areas."
        },
        {
            question: "4.Smart Bus/Train Tracking App",
            description: "Develop a mobile app for tracking buses or trains in real-time with estimated arrival times."
        },
        {
            question: "5.Carpooling & Ride-Sharing Platform",
            description: "Create a platform to facilitate carpooling and ride-sharing, reducing traffic congestion and emissions."
        }
    ],
    'Robotics & Drones': [
        {
            question: "1.Delivery Drones",
            description: "Design a drone-based delivery system for efficient last-mile logistics in urban and rural areas."
        },
        {
            question: "2.Autonomous Inspection Robot",
            description: "Develop a robot for inspecting infrastructure like bridges or pipelines using AI and sensors."
        },
        {
            question: "3.Disaster Response Drones",
            description: "Create drones for delivering supplies and gathering data in disaster-affected areas."
        },
        {
            question: "4.Agricultural Drones for Crop Monitoring",
            description: "Build drones with imaging technology to monitor crop health and optimize farming practices."
        }
    ],
    'Fitness & Sports': [
        {
            question: "1.Workout Planner with IoT",
            description: "Develop an IoT-based app to create personalized workout plans using wearable device data."
        },
        {
            question: "2.AI-Powered Sports Analytics",
            description: "Build an AI system to analyze athlete performance and provide real-time coaching insights."
        },
        {
            question: "3.Gamified Fitness App",
            description: "Create a mobile app that gamifies fitness goals to motivate users through challenges and rewards."
        },
        {
            question: "4.Injury Prevention System",
            description: "Develop a wearable device and app to monitor biomechanics and prevent sports injuries."
        }
    ]
};

// Toggle mobile menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Show main page
function showMain() {
    document.getElementById('main-page').classList.remove('hidden');
    document.getElementById('themes-page').classList.add('hidden');
    document.querySelector('.nav-links').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Show themes page
function showThemes() {
    document.getElementById('main-page').classList.add('hidden');
    document.getElementById('themes-page').classList.remove('hidden');
    document.querySelector('.nav-links').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show problem statements overlay
function showProblemStatements(theme) {
    const overlay = document.getElementById('problem-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayContent = document.getElementById('overlay-content');

    overlayTitle.textContent = theme;
    overlayContent.innerHTML = '';

    const problems = themeProblems[theme];
    problems.forEach(problem => {
        const box = document.createElement('div');
        box.className = 'problem-box';
        box.innerHTML = `
            <h3 class="problem-heading">${problem.question}</h3>
            <p class="problem-description">${problem.description}</p>
        `;
        overlayContent.appendChild(box);
    });

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Initialize theme cards
function initializeThemeCards() {
    const themeCards = document.querySelectorAll('.theme-card');
    const overlay = document.getElementById('problem-overlay');
    const closeOverlay = document.getElementById('close-overlay');

    themeCards.forEach(card => {
        card.addEventListener('click', () => {
            const theme = card.getAttribute('data-theme');
            showProblemStatements(theme);
        });
    });

    closeOverlay.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Select event type
function selectEvent(eventType) {
    selectedEvent = eventType;
    document.querySelectorAll('.event-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    document.getElementById(`event-${eventType}`).classList.add('selected');

    updateTeamOptions();
    updatePricing();
}

// Update team size options based on event type
function updateTeamOptions() {
    const teamOptions = document.querySelectorAll('.team-option');
    teamOptions.forEach(opt => {
        const size = parseInt(opt.id.split('-')[1]);
        opt.classList.remove('disabled', 'selected');
        if (selectedEvent === 'coding' && size > 2) {
            opt.classList.add('disabled');
        }
    });
    selectedTeamSize = null;
    updatePricing();
}

// Select team size
function selectTeamSize(size) {
    if (selectedEvent === 'coding' && size > 2) return;
    selectedTeamSize = size;
    document.querySelectorAll('.team-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    document.getElementById(`team-${size}`).classList.add('selected');
    updatePricing();
}

// Update pricing display
function updatePricing() {
    const pricingDisplay = document.getElementById('pricing-display');
    const priceAmount = document.getElementById('price-amount');
    const priceDetails = document.getElementById('price-details');

    if (selectedEvent && selectedTeamSize) {
        const price = pricing[selectedEvent][selectedTeamSize];
        priceAmount.textContent = `₹${price}`;
        priceDetails.textContent = `Registration for ${selectedTeamSize} member${selectedTeamSize > 1 ? 's' : ''} in ${selectedEvent.charAt(0).toUpperCase() + selectedEvent.slice(1)}`;
        pricingDisplay.classList.remove('hidden');
    } else {
        pricingDisplay.classList.add('hidden');
    }
}

// Redirect to Google Form
function redirectToForm() {
    if (selectedEvent) {
        window.open(formUrls[selectedEvent], '_blank');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeThemeCards();
});
