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
        4: 999
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

// Utility functions
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