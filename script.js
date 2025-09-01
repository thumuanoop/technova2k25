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
let activeThemeCard = null;

// Problem statements and descriptions for each theme
const themeProblems = {
    'Tourism': [
        {
            question: "Smart Tourist Guide Application",
            description: "Develop an AI-driven mobile app that personalizes travel itineraries, recommending optimal routes, local attractions, dining options, and accommodations based on user preferences and real-time data."
        },
        {
            question: "Crowd & Queue Management",
            description: "Create an IoT and AI-based system to monitor real-time crowd density at tourist spots and suggest alternative destinations or optimal visiting times to reduce congestion."
        },
        {
            question: "Multilingual Real-Time Translator",
            description: "Build a speech-to-speech translation app to assist tourists in communicating across languages, enhancing their travel experience in diverse regions."
        },
        {
            question: "Accessible Tourism for Differently-Abled",
            description: "Design a platform providing accessibility information and tailored guides for differently-abled travelers, ensuring inclusive tourism experiences."
        },
        {
            question: "Smart Tourism Chatbot",
            description: "Develop a multilingual chatbot integrating maps, transport schedules, and booking systems to assist tourists with real-time travel planning."
        },
        {
            question: "AR for Heritage Tourism",
            description: "Create an AR-based app offering 3D reconstructions and immersive historical narratives to enhance the exploration of cultural heritage sites."
        }
    ],
    'Renewable & Sustainable Energy': [
        {
            question: "Smart Energy Consumption Monitoring",
            description: "Build an IoT and AI system to track and analyze energy usage in real-time, optimizing consumption schedules for households or businesses."
        },
        {
            question: "Energy Saving Challenge App",
            description: "Develop a gamified app that rewards users for reducing energy consumption through challenges and real-time feedback."
        },
        {
            question: "IoT Smart Home Energy System",
            description: "Create an IoT-based system to automatically control home appliances, minimizing energy waste while maintaining user comfort."
        },
        {
            question: "Smart Street Light Controller",
            description: "Design a system that automatically turns street lights on/off or dims them based on motion detection, saving energy in public spaces."
        }
    ],
    'Blockchain & Cybersecurity': [
        {
            question: "Blockchain for Secure Transactions",
            description: "Develop a tamper-proof blockchain platform for secure e-commerce and banking transactions, ensuring data integrity and user trust."
        },
        {
            question: "Next-Gen Authentication",
            description: "Create a passwordless login system using biometrics or cryptographic keys for enhanced security and user convenience."
        },
        {
            question: "Cyber Safety for Children",
            description: "Build a platform with smart parental controls and safe browsing tools to protect children from online threats."
        },
        {
            question: "Blockchain-based Credential Verification",
            description: "Design a secure system for storing and sharing digital certificates using blockchain, preventing fraud and ensuring authenticity."
        },
        {
            question: "Secure Digital Voting Platform",
            description: "Develop a blockchain-based voting system with encryption and biometrics for transparent and secure elections."
        },
        {
            question: "AI-based Fraud Detection",
            description: "Create an ML-powered system to detect anomalies and prevent fraudulent transactions in real-time."
        }
    ],
    'Smart Education': [
        {
            question: "Personalized Learning Recommendation System",
            description: "Build an AI-based platform that suggests personalized learning content based on a student's interests and performance."
        },
        {
            question: "AI Career Advisor",
            description: "Develop an AI tool that provides personalized career guidance by analyzing market trends and individual skills."
        },
        {
            question: "Skill Gap Analysis Tool",
            description: "Create a system to identify skill gaps by comparing user skills with industry demands, offering tailored learning paths."
        },
        {
            question: "Smart Classroom Management",
            description: "Design an IoT-based system to monitor classroom activities, attendance, and resource usage for efficient management."
        },
        {
            question: "Smart Exam Proctoring",
            description: "Build an AI-powered platform for secure online exams, detecting cheating through behavior analysis."
        }
    ],
    'Disaster Management': [
        {
            question: "Wildfire Mapping & Alerting",
            description: "Develop an AI and IoT-based system for early wildfire detection, mapping, and real-time alerts to authorities."
        },
        {
            question: "Crowdsourced Disaster Information",
            description: "Create a platform for citizens to report disaster incidents with location and media, aiding rapid response efforts."
        },
        {
            question: "Offline Communication App",
            description: "Build a Bluetooth or Wi-Fi Direct-based app for communication during disasters when networks are down."
        },
        {
            question: "Resource & Volunteer Management",
            description: "Design a platform to coordinate relief resources and volunteers efficiently during disaster response."
        },
        {
            question: "Damage Assessment via Computer Vision",
            description: "Develop an AI system to analyze satellite or drone images for rapid disaster damage assessment."
        }
    ],
    'Games & Toys': [
        {
            question: "Gamified Learning Platforms",
            description: "Create interactive STEM learning platforms using AR/VR to make education engaging and fun for all ages."
        },
        {
            question: "AI-Powered Career Guidance",
            description: "Develop an AI-driven game that guides students toward career paths through interactive scenarios and skill assessments."
        }
    ],
    'Health Tech': [
        {
            question: "Connected Health Devices",
            description: "Build IoT-based wearables to monitor chronic conditions, providing real-time health data to patients and doctors."
        },
        {
            question: "Mental Health Assistants",
            description: "Create a chatbot and mood-tracking app to support mental health with personalized coping strategies."
        },
        {
            question: "Telemedicine for Rural Areas",
            description: "Develop affordable diagnostic kits and a telemedicine platform for remote healthcare access in rural regions."
        },
        {
            question: "Mental Health Chatbot with Sentiment Analysis",
            description: "Build a chatbot that uses sentiment analysis to provide tailored mental health support and resources."
        },
        {
            question: "Remote Patient Monitoring",
            description: "Create an IoT system for continuous patient monitoring, alerting healthcare providers to critical changes."
        },
        {
            question: "Telemedicine App for Rural Health Centers",
            description: "Develop a telemedicine app to connect rural health centers with specialists for remote consultations."
        }
    ],
    'Heritage & Culture': [
        {
            question: "Music Composition with AI",
            description: "Create an AI-powered tool to compose music inspired by cultural heritage, preserving traditional sounds."
        },
        {
            question: "Digital Museum Guide App",
            description: "Develop a mobile app offering interactive guides and audio tours for museums and cultural sites."
        },
        {
            question: "Multilingual Translation Tool for Tourists",
            description: "Build a translation tool to help tourists understand cultural artifacts and signage in multiple languages."
        },
        {
            question: "Virtual Tour of Heritage Sites (360°)",
            description: "Create a 360° virtual tour platform for exploring heritage sites remotely with immersive details."
        },
        {
            question
