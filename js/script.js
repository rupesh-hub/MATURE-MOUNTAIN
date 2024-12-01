document.addEventListener('DOMContentLoaded', function() {
    // Load the navbar
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            initializeNavbar();
        })
        .catch(error => console.error('Error loading navbar:', error));

    function initializeNavbar() {
        const menuToggle = document.getElementById('menu-toggle');
        const navList = document.querySelector('.nav-list');
        const hamburgerIcon = document.querySelector('.hamburger-icon');

        function toggleMenu() {
            if (menuToggle.checked) {
                navList.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                navList.style.display = 'none';
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        }

        menuToggle.addEventListener('change', toggleMenu);

        // Close menu when clicking on a nav item
        navList.addEventListener('click', function(event) {
            if (event.target.tagName === 'A') {
                menuToggle.checked = false;
                toggleMenu();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navList.contains(event.target) ||
                hamburgerIcon.contains(event.target);
            if (!isClickInside && menuToggle.checked) {
                menuToggle.checked = false;
                toggleMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navList.style.display = 'flex';
            } else {
                navList.style.display = menuToggle.checked ? 'flex' : 'none';
            }
        });

        // Initial call to set correct display on page load
        if (window.innerWidth > 768) {
            navList.style.display = 'flex';
        } else {
            navList.style.display = 'none';
        }

        // Ensure the hamburger icon works
        hamburgerIcon.addEventListener('click', function(event) {
            event.preventDefault();
            menuToggle.checked = !menuToggle.checked;
            toggleMenu();
        });
    }

    // Slideshow functionality
    let slideIndex = 0;
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");

    if (slides.length > 0 && dots.length > 0) {
        showSlides();
    }

    function showSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
        setTimeout(showSlides, 2000); // Change image every 2 seconds
    }
});

// Function to change slide manually (if needed)
function currentSlide(n) {
    slideIndex = n - 1;
    showSlides();
}