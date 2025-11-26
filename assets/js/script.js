// Live Crypto Prices (Mock Data - Replace with real API)
const cryptoPrices = [
    { symbol: 'BTC', name: 'Bitcoin', price: 43250.50, change: 2.45 },
    { symbol: 'ETH', name: 'Ethereum', price: 2650.75, change: 1.89 },
    { symbol: 'BNB', name: 'Binance Coin', price: 315.20, change: -0.65 },
    { symbol: 'SOL', name: 'Solana', price: 98.45, change: 3.21 },
    { symbol: 'ADA', name: 'Cardano', price: 0.52, change: 1.25 },
    { symbol: 'XRP', name: 'Ripple', price: 0.62, change: -1.15 },
    { symbol: 'DOT', name: 'Polkadot', price: 7.85, change: 2.10 },
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.085, change: 0.95 }
];

// Load crypto prices on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCryptoPrices();
    initializeAnimations();
    setupNewsletterForm();
});

// Load and display crypto prices
function loadCryptoPrices() {
    const pricesContainer = document.getElementById('cryptoPrices');
    if (!pricesContainer) return;

    pricesContainer.innerHTML = '';
    
    cryptoPrices.forEach(crypto => {
        const priceCard = document.createElement('div');
        priceCard.className = 'col-md-6 col-lg-3';
        priceCard.innerHTML = `
            <div class="price-card">
                <h5>${crypto.symbol}</h5>
                <h3>$${crypto.price.toLocaleString()}</h3>
                <span class="price-change ${crypto.change >= 0 ? 'positive' : 'negative'}">
                    ${crypto.change >= 0 ? '+' : ''}${crypto.change.toFixed(2)}%
                </span>
            </div>
        `;
        pricesContainer.appendChild(priceCard);
    });

    // Update prices every 5 seconds (simulated)
    setInterval(() => {
        updatePrices();
    }, 5000);
}

// Simulate price updates
function updatePrices() {
    const priceCards = document.querySelectorAll('.price-card h3');
    priceCards.forEach((card, index) => {
        const currentPrice = parseFloat(card.textContent.replace('$', '').replace(',', ''));
        const change = (Math.random() - 0.5) * 0.1; // Random change between -5% and +5%
        const newPrice = currentPrice * (1 + change);
        card.textContent = '$' + newPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    });
}

// Initialize scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .use-case-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

// Newsletter form submission
function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing! You will receive our latest updates.');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }
}

// Market page functionality
function initializeMarketPage() {
    // Initialize charts (placeholder - integrate with Chart.js or similar)
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
        // Chart initialization would go here
        container.innerHTML = '<p class="text-center text-muted">Chart will be displayed here. Integrate with Chart.js or TradingView.</p>';
    });
}

// Blog filter functionality
let currentFilter = 'all';

function filterBlogPosts(category, clickedButton) {
    const blogCards = document.querySelectorAll('.blog-card');
    const filterButtons = document.querySelectorAll('button.btn-outline-primary');
    
    // Update current filter
    currentFilter = category;
    
    // Update active button state
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
    
    // Filter blog posts by hiding/showing parent columns
    blogCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const parentCol = card.closest('.col-md-6, .col-lg-4'); // Use closest to find the column parent
        
        if (!parentCol) return;
        
        if (category === 'all' || cardCategory === category) {
            // Show the column by removing the inline display style
            parentCol.style.removeProperty('display');
        } else {
            // Hide the column
            parentCol.style.display = 'none';
        }
    });
    
    // Clear search input when filtering
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
}

// Search functionality
function searchBlogPosts(query) {
    const blogCards = document.querySelectorAll('.blog-card');
    const searchTerm = query.toLowerCase().trim();
    
    // If search is empty, apply current filter
    if (!searchTerm) {
        const activeButton = document.querySelector('button.btn-outline-primary.active');
        if (activeButton) {
            const category = activeButton.getAttribute('onclick')?.match(/'([^']+)'/)?.[1] || 'all';
            filterBlogPosts(category, activeButton);
        } else {
            filterBlogPosts('all', null);
        }
        return;
    }
    
    blogCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const title = card.querySelector('.blog-card-body h5')?.textContent.toLowerCase() || '';
        const content = card.querySelector('.blog-card-body p')?.textContent.toLowerCase() || '';
        const parentCol = card.closest('.col-md-6, .col-lg-4'); // Use closest to find the column parent
        
        if (!parentCol) return;
        
        // Check if matches search AND current filter
        const matchesSearch = title.includes(searchTerm) || content.includes(searchTerm);
        const matchesFilter = currentFilter === 'all' || cardCategory === currentFilter;
        
        if (matchesSearch && matchesFilter) {
            // Show the column by removing the inline display style
            parentCol.style.removeProperty('display');
        } else {
            // Hide the column
            parentCol.style.display = 'none';
        }
    });
}

// Wallet dashboard calculations
function calculatePortfolioValue() {
    // Mock portfolio data
    const portfolio = [
        { symbol: 'BTC', amount: 0.5, price: 43250 },
        { symbol: 'ETH', amount: 2.5, price: 2650 },
        { symbol: 'SOL', amount: 10, price: 98.45 }
    ];

    let totalValue = 0;
    portfolio.forEach(asset => {
        totalValue += asset.amount * asset.price;
    });

    const portfolioElement = document.querySelector('.portfolio-value');
    if (portfolioElement) {
        portfolioElement.textContent = '$' + totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }
}

// Initialize wallet dashboard
if (window.location.pathname.includes('wallet.html')) {
    calculatePortfolioValue();
}

// Initialize market page
if (window.location.pathname.includes('market.html')) {
    initializeMarketPage();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// AI Chatbox Functions
function toggleChatbox() {
    const chatbox = document.getElementById('aiChatbox');
    const toggle = document.getElementById('chatboxToggle');
    
    if (chatbox.classList.contains('active')) {
        chatbox.classList.remove('active');
        toggle.classList.remove('hidden');
    } else {
        chatbox.classList.add('active');
        toggle.classList.add('hidden');
        // Focus on input when opening
        setTimeout(() => {
            document.getElementById('chatboxInput').focus();
        }, 300);
    }
}

function handleChatboxKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatboxMessage();
    }
}

function sendChatboxMessage() {
    const input = document.getElementById('chatboxInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI response after a delay
    setTimeout(() => {
        hideTypingIndicator();
        const response = getAIResponse(message);
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000);
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatboxMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatarIcon = sender === 'bot' ? 'bi-robot' : 'bi-person-fill';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="bi ${avatarIcon}"></i>
        </div>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatboxMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="bi bi-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function getAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Predefined responses based on keywords
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return "Hello! I'm here to help you with cryptocurrency trading, blockchain technology, and our platform. What would you like to know?";
    }
    
    if (message.includes('price') || message.includes('bitcoin') || message.includes('btc') || message.includes('ethereum') || message.includes('eth')) {
        return "You can check live cryptocurrency prices on our Market page. We provide real-time data for Bitcoin, Ethereum, and 200+ other cryptocurrencies. Would you like to know more about a specific coin?";
    }
    
    if (message.includes('trade') || message.includes('trading') || message.includes('buy') || message.includes('sell')) {
        return "Our platform offers fast and secure cryptocurrency trading with low fees starting from 0.1%. You can trade spot, futures, and margin trading. Would you like help getting started with trading?";
    }
    
    if (message.includes('wallet') || message.includes('security') || message.includes('safe')) {
        return "We use bank-level security with multi-signature wallets, cold storage, and insurance protection. Your assets are protected with industry-leading security measures. Is there a specific security feature you'd like to know about?";
    }
    
    if (message.includes('fee') || message.includes('cost') || message.includes('charge')) {
        return "Our trading fees are very competitive, starting from 0.1% with volume-based discounts available. We also offer low gas fees for NFT transactions. Would you like more details about our fee structure?";
    }
    
    if (message.includes('nft') || message.includes('marketplace')) {
        return "Our NFT marketplace supports multiple blockchain networks with low gas fees. You can buy, sell, and trade NFTs easily. Would you like to explore our NFT marketplace?";
    }
    
    if (message.includes('staking') || message.includes('yield') || message.includes('earn')) {
        return "We offer competitive staking rewards with attractive APY rates on multiple cryptocurrencies. You can earn passive income through our staking platform. Which cryptocurrency are you interested in staking?";
    }
    
    if (message.includes('help') || message.includes('support') || message.includes('problem')) {
        return "I'm here to help! You can reach our 24/7 customer support via live chat, email, or phone. For immediate assistance, visit our Help Center or Contact page. What specific issue can I help you with?";
    }
    
    if (message.includes('account') || message.includes('register') || message.includes('sign up') || message.includes('login')) {
        return "You can create an account by clicking the 'Sign Up' button in the navigation bar. The registration process is quick and secure. Already have an account? Just click 'Login' to access your dashboard.";
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
        return "You're welcome! If you have any more questions, feel free to ask. I'm here to help you with anything related to cryptocurrency and our platform.";
    }
    
    // Default response
    return "That's an interesting question! I can help you with cryptocurrency trading, blockchain technology, platform features, security, fees, NFTs, staking, and more. Could you provide more details about what you'd like to know?";
}


