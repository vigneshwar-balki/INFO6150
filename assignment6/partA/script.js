// part A login validation and session handling

$(function() {
    const users = [
        { email: "alice@northeastern.edu", password: "password123" },
        { email: "bob@northeastern.edu", password: "securepwd" }
    ];

    const $email = $('#email');
    const $password = $('#password');
    const $loginBtn = $('#loginBtn');
    const $emailError = $('#emailError');
    const $passwordError = $('#passwordError');
    const $loginError = $('#loginError');

    function validateEmail() {
        const val = $email.val().trim();
        if (!val) {
            $emailError.text('Please enter a valid Northeastern email');
            return false;
        }
        const re = /^[^@\s]+@northeastern\.edu$/i;
        if (!re.test(val)) {
            $emailError.text('Please enter a valid Northeastern email');
            return false;
        }
        $emailError.text('');
        return true;
    }

    function validatePassword() {
        const val = $password.val();
        if (!val) {
            $passwordError.text('Password is required');
            return false;
        }
        if (val.length < 8) {
            $passwordError.text('Password must be at least 8 characters');
            return false;
        }
        $passwordError.text('');
        return true;
    }

    function updateLoginState() {
        const ok = validateEmail() && validatePassword();
        $loginBtn.prop('disabled', !ok);
    }

    $email.on('keyup blur', validateEmail).on('focus', () => $emailError.text(''));
    $password.on('keyup blur', validatePassword).on('focus', () => $passwordError.text(''));

    $email.add($password).on('keyup blur', updateLoginState);

    $('#loginForm').submit(function(e) {
        e.preventDefault();
        $loginError.text('');

        if (!validateEmail() || !validatePassword()) {
            return;
        }

        const emailVal = $email.val().trim();
        const passVal = $password.val();
        const match = users.find(u => u.email === emailVal && u.password === passVal);
        if (!match) {
            $loginError.text('Invalid email or password');
            return;
        }

        const username = emailVal.split('@')[0];
        const session = {
            username,
            email: emailVal,
            loginTimestamp: Date.now(),
            isLoggedIn: true
        };
        if ($('#rememberMe').is(':checked')) {
            localStorage.setItem('userSession', JSON.stringify(session));
        } else {
            sessionStorage.setItem('userSession', JSON.stringify(session));
        }

        // show success and redirect
        $loginError.removeClass('text-danger').addClass('text-success').text('Login successful, redirecting...');
        $('.card').fadeOut(1000, () => {
            setTimeout(() => {
                window.location.href = 'calculator.html';
            }, 2000);
        });
    });
});