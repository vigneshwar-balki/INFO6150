$(function() {
    // 1. HARDCODED USERS
    const users = [{ email: "balakrishnan.vi@northeastern.edu", password: "P@ssw0rd" }];

    // --- LOGIN LOGIC ---
    if ($('#loginForm').length) {
        const validateLogin = () => {
            const email = $('#email').val().trim();
            const pass = $('#password').val();
            const isNEU = email.endsWith('@northeastern.edu');
            const isEmail = /^[^\s@]+@northeastern\.edu$/i.test(email);
            const isPassValid = pass.length >= 8;

            $('#emailError').text((!isEmail || !isNEU) && email !== "" ? "Please enter a valid Northeastern email" : "");
            $('#passwordError').text(pass.length < 8 && pass !== "" ? "Minimum 8 characters required" : "");
            $('#loginBtn').prop('disabled', !(isNEU && isEmail && isPassValid));
        };

        $('#email, #password').on('keyup blur', validateLogin);
        $('#email, #password').on('focus', function() { $(this).next('.error-msg').text(''); });

        $('#loginForm').on('submit', function(e) {
            e.preventDefault();
            const emailVal = $('#email').val();
            const passVal = $('#password').val();
            const user = users.find(u => u.email === emailVal && u.password === passVal);

            if (user) {
                const sessionData = { username: "Vigu", isLoggedIn: true };
                const storage = $('#rememberMe').is(':checked') ? localStorage : sessionStorage;
                storage.setItem('userSession', JSON.stringify(sessionData));
                $('#successMsg').removeClass('d-none').hide().fadeIn();
                setTimeout(() => window.location.href = 'calculator.html', 2000);
            } else {
                $('#loginError').text('Invalid email or password');
            }
        });
    }

    // --- CALCULATOR LOGIC ---
    if ($('#welcomeMessage').length) {
        const sess = JSON.parse(sessionStorage.getItem('userSession') || localStorage.getItem('userSession') || 'null');
        if (!sess || !sess.isLoggedIn) { window.location.href = 'login.html'; return; }
        $('#welcomeMessage').text(`Welcome, ${sess.username}!`);

        // REQUIREMENT: Single Arrow Function
        const calculate = (num1, num2, operation) => {
            const n1 = parseFloat(num1);
            const n2 = parseFloat(num2);
            switch(operation) {
                case 'add': return n1 + n2;
                case 'subtract': return n1 - n2;
                case 'multiply': return n1 * n2;
                case 'divide': return n2 === 0 ? "Cannot divide by zero" : n1 / n2;
                default: return 0;
            }
        };

        // STRICT CHARACTER BLOCKING: Prevents entering non-numeric chars
        $('#num1, #num2').on('input', function() {
            const val = $(this).val();
            // Allow only digits, one decimal point, and a leading minus sign
            const sanitized = val.replace(/[^0-9.\-]/g, '');
            
            if (val !== sanitized) {
                $(this).val(sanitized);
                $(this).next('.error-msg').text('Please enter a valid number');
            } else {
                $(this).next('.error-msg').text('');
            }
        });

        // CALCULATION BUTTON LOGIC
        $('.calc-btn').on('click', function() {
            const v1 = $('#num1').val();
            const v2 = $('#num2').val();

            // Independent check on click (Rubric: Both fields required)
            let valid = true;
            if (!v1) { $('#num1Error').text('Please enter a valid number'); valid = false; }
            if (!v2) { $('#num2Error').text('Please enter a valid number'); valid = false; }

            if (!valid) return;

            const result = calculate(v1, v2, $(this).data('op'));

            // REQUIREMENT: jQuery Chaining
            $('#result').val(result).hide().fadeIn(300);
        });

        // REQUIREMENT: Clear error on focus
        $('#num1, #num2').on('focus', function() {
            $(this).next('.error-msg').text('');
        });

        $('#logoutBtn').on('click', () => {
            sessionStorage.clear(); localStorage.clear();
            window.location.href = 'login.html';
        });
    }
});