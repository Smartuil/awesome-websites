// Filter functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    let app; // Reference to the main app

    // Wait for the main app to initialize
    setTimeout(() => {
        // Get reference to the app instance
        // This is a simple approach - in a larger app you might use a proper event system
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                handleFilterClick(button);
            });
        });
    }, 100);

    function handleFilterClick(clickedButton) {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        clickedButton.classList.add('active');
        
        // Get the category filter
        const category = clickedButton.dataset.category;
        
        // Apply filter - we need to get the app instance
        if (window.awesomeWebsitesApp) {
            window.awesomeWebsitesApp.filterByCategory(category);
        } else {
            // Fallback: try to access the app through the DOM or reinitialize filtering
            applyFilter(category);
        }
    }

    function applyFilter(category) {
        const cards = document.querySelectorAll('.website-card');
        const noResults = document.getElementById('noResults');
        const grid = document.getElementById('websitesGrid');
        
        let visibleCount = 0;
        
        cards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
                visibleCount++;
            } else {
                const cardCategory = card.dataset.category;
                if (cardCategory === category) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            }
        });
        
        // Show/hide no results message
        if (visibleCount === 0) {
            grid.style.display = 'none';
            noResults.style.display = 'block';
        } else {
            grid.style.display = 'grid';
            noResults.style.display = 'none';
        }
    }

    // Add keyboard navigation for filters
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            const activeButton = document.querySelector('.filter-btn.active');
            const buttons = Array.from(filterButtons);
            const currentIndex = buttons.indexOf(activeButton);
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                buttons[currentIndex - 1].click();
            } else if (e.key === 'ArrowRight' && currentIndex < buttons.length - 1) {
                e.preventDefault();
                buttons[currentIndex + 1].click();
            }
        }
    });

    // Make the filter functions globally accessible
    window.filterModule = {
        applyFilter,
        handleFilterClick
    };
});