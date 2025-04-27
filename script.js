document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Event Handling Section
    // ======================
    
    // Button Click Event
    const clickButton = document.getElementById('click-button');
    const clickOutput = document.getElementById('click-output');
    
    clickButton.addEventListener('click', function() {
        clickOutput.textContent = "Button was clicked! 🎉";
        clickOutput.style.color = "#2ecc71";
    });
    
    // Hover Event
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = "You're hovering! ✨";
        hoverOutput.style.color = "#3498db";
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = "Waiting for hover...";
        hoverOutput.style.color = "";
    });
    
    // Keypress Event
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keypress', function(e) {
        keypressOutput.textContent = `You pressed: ${e.key} (KeyCode: ${e.keyCode})`;
        keypressOutput.style.color = "#9b59b6";
    });
    
    // Secret Action (Double Click or Long Press)
    const secretBox = document.querySelector('.secret-box');
    const secretOutput = document.getElementById('secret-output');
    let longPressTimer;
    
    // Double Click
    secretBox.addEventListener('dblclick', function() {
        secretOutput.textContent = "You discovered the double-click secret! 🎊";
        secretOutput.style.color = "#e67e22";
    });
    
    // Long Press
    secretBox.addEventListener('mousedown', function() {
        longPressTimer = setTimeout(function() {
            secretOutput.textContent = "You held it long enough for a secret! 🕵️‍♂️";
            secretOutput.style.color = "#e74c3c";
        }, 1000); // 1 second for long press
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(longPressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(longPressTimer);
    });
    
    // ======================
    // Interactive Elements
    // ======================
    
    // Color Changing Button
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#3498db', '#2ecc71', '#9b59b6', '#e67e22', '#e74c3c'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color Changed! (${colorIndex + 1}/${colors.length})`;
    });
    
    // Image Gallery
    const galleryImages = document.querySelectorAll('.image-gallery img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    }, 3000);
    
    // Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ======================
    // Form Validation
    // ======================
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameInput.classList.add('invalid');
            nameInput.classList.remove('valid');
            nameError.textContent = 'Name is required';
            nameError.style.display = 'block';
            return false;
        } else {
            nameInput.classList.add('valid');
            nameInput.classList.remove('invalid');
            nameError.style.display = 'none';
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            emailInput.classList.remove('invalid');
            emailInput.classList.remove('valid');
            emailError.style.display = 'none';
            return true;
        }
        
        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add('invalid');
            emailInput.classList.remove('valid');
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            return false;
        } else {
            emailInput.classList.add('valid');
            emailInput.classList.remove('invalid');
            emailError.style.display = 'none';
            return true;
        }
    }
    
    function validatePassword() {
        if (passwordInput.value.trim() === '') {
            passwordInput.classList.remove('invalid');
            passwordInput.classList.remove('valid');
            passwordError.style.display = 'none';
            return true;
        }
        
        if (passwordInput.value.length < 8) {
            passwordInput.classList.add('invalid');
            passwordInput.classList.remove('valid');
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordError.style.display = 'block';
            return false;
        } else {
            passwordInput.classList.add('valid');
            passwordInput.classList.remove('invalid');
            passwordError.style.display = 'none';
            return true;
        }
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            form.reset();
            // Remove validation classes
            document.querySelectorAll('input').forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
        } else {
            alert('Please fix the errors in the form before submitting.');
        }
    });
});
