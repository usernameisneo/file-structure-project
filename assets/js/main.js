// Main JavaScript file for the File Structure Project

/**
 * DOM Content Loaded Event Listener
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('File Structure Project loaded successfully!');
    
    initializeApp();
    setupEventListeners();
    loadWorkerIfSupported();
});

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('Initializing application...');
    
    // Check if IndexedDB is supported
    if ('indexedDB' in window) {
        console.log('IndexedDB is supported');
        initializeDatabase();
    } else {
        console.warn('IndexedDB is not supported in this browser');
    }
    
    // Initialize navigation
    setupSmoothScrolling();
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Navigation click handlers
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Window resize handler
    window.addEventListener('resize', handleResize);
    
    // Scroll handler for dynamic content
    window.addEventListener('scroll', handleScroll);
}

/**
 * Handle navigation clicks
 */
function handleNavClick(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Setup smooth scrolling
 */
function setupSmoothScrolling() {
    // Add smooth scrolling behavior to HTML element
    document.documentElement.style.scrollBehavior = 'smooth';
}

/**
 * Handle window resize
 */
function handleResize() {
    console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
    // Add responsive behavior here if needed
}

/**
 * Handle scroll events
 */
function handleScroll() {
    // Add scroll-based functionality here
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header');
    
    if (header) {
        if (scrolled > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

/**
 * Initialize database using idb-keyval
 */
function initializeDatabase() {
    // This function will use the idb-keyval library
    // when it's loaded from the vendor directory
    console.log('Database initialization placeholder');
}

/**
 * Load web worker if supported
 */
function loadWorkerIfSupported() {
    if ('Worker' in window) {
        try {
            const worker = new Worker('assets/workers/ingestWorker.js');
            worker.postMessage({ type: 'init' });
            
            worker.onmessage = function(event) {
                console.log('Worker message received:', event.data);
            };
            
            worker.onerror = function(error) {
                console.error('Worker error:', error);
            };
            
            console.log('Web Worker loaded successfully');
        } catch (error) {
            console.warn('Failed to load web worker:', error);
        }
    } else {
        console.warn('Web Workers are not supported in this browser');
    }
}

/**
 * Utility function to load JSON schema
 */
async function loadSchema() {
    try {
        const response = await fetch('assets/schema/backup.schema.json');
        const schema = await response.json();
        console.log('Schema loaded:', schema);
        return schema;
    } catch (error) {
        console.error('Failed to load schema:', error);
        return null;
    }
}

/**
 * Export functions for testing (if module system is used)
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        setupEventListeners,
        loadSchema
    };
}
