'use strict';

/* ============================================================
   PHONE INPUT MASKING
   Converts raw digit string to (XXX) XXX-XXXX as user types.
   ============================================================ */
function applyPhoneMask(value) {
    var digits = value.replace(/\D/g, '').substring(0, 10);
    if (digits.length === 0) return '';
    if (digits.length <= 3) return '(' + digits;
    if (digits.length <= 6) return '(' + digits.substring(0, 3) + ') ' + digits.substring(3);
    return '(' + digits.substring(0, 3) + ') ' + digits.substring(3, 6) + '-' + digits.substring(6);
}

/* ============================================================
   VALIDATION FUNCTIONS
   Each accepts a boolean `silent`.
     silent = false → update the DOM error element
     silent = true  → only return true/false (used by checkFormValidity)
   ============================================================ */

function validateTitle(silent) {
    var valid = !!document.querySelector('input[name="title"]:checked');
    if (!silent) {
        document.getElementById('title-error').textContent =
            valid ? '' : 'Please select a title.';
    }
    return valid;
}

function validateFirstName(silent) {
    var val = document.getElementById('firstName').value.trim();
    var msg = '';
    if (!val) {
        msg = 'First Name is required.';
    } else if (val.length < 2) {
        msg = 'First Name must be at least 2 characters.';
    } else if (val.length > 50) {
        msg = 'First Name must be at most 50 characters.';
    } else if (!/^[a-zA-Z\s]+$/.test(val)) {
        msg = 'First Name must contain letters only (no numbers or special characters).';
    }
    if (!silent) {
        document.getElementById('firstName-error').textContent = msg;
    }
    return msg === '';
}

function validateLastName(silent) {
    var val = document.getElementById('lastName').value.trim();
    var msg = '';
    if (!val) {
        msg = 'Last Name is required.';
    } else if (val.length < 2) {
        msg = 'Last Name must be at least 2 characters.';
    } else if (val.length > 50) {
        msg = 'Last Name must be at most 50 characters.';
    } else if (!/^[a-zA-Z\s]+$/.test(val)) {
        msg = 'Last Name must contain letters only (no numbers or special characters).';
    }
    if (!silent) {
        document.getElementById('lastName-error').textContent = msg;
    }
    return msg === '';
}

function validateEmail(silent) {
    var val = document.getElementById('emailId').value.trim();
    var msg = '';
    if (!val) {
        msg = 'Email is required.';
    } else if (!/^[a-zA-Z0-9._%+-]+@northeastern\.edu$/.test(val)) {
        msg = 'Email must be a valid @northeastern.edu address.';
    }
    if (!silent) {
        document.getElementById('emailId-error').textContent = msg;
    }
    return msg === '';
}

function validatePhone(silent) {
    var val = document.getElementById('phoneNumber').value.trim();
    var msg = '';
    if (!val) {
        msg = 'Phone Number is required.';
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(val)) {
        msg = 'Phone must be in (XXX) XXX-XXXX format.';
    }
    if (!silent) {
        document.getElementById('phoneNumber-error').textContent = msg;
    }
    return msg === '';
}

function validateZipcode(silent) {
    var val = document.getElementById('zipcode').value.trim();
    var msg = '';
    if (!val) {
        msg = 'Zipcode is required.';
    } else if (!/^\d{5}$/.test(val)) {
        msg = 'Zipcode must be exactly 5 digits.';
    }
    if (!silent) {
        document.getElementById('zipcode-error').textContent = msg;
    }
    return msg === '';
}

function validateAddress1(silent) {
    var val = document.getElementById('address1').value.trim();
    var msg = '';
    if (!val) {
        msg = 'Street Address 1 is required.';
    } else if (val.length < 5) {
        msg = 'Street Address 1 must be at least 5 characters.';
    } else if (val.length > 100) {
        msg = 'Street Address 1 must be at most 100 characters.';
    } else if (!/^[a-zA-Z0-9\s,.-]+$/.test(val)) {
        msg = 'Street Address 1: only letters, numbers, spaces, commas, periods, and hyphens are allowed.';
    }
    if (!silent) {
        document.getElementById('address1-error').textContent = msg;
    }
    return msg === '';
}

function validateAddress2(silent) {
    var val = document.getElementById('address2').value;
    /* Always update the live counter on input events (non-silent calls) */
    if (!silent) {
        document.getElementById('address2-counter').textContent =
            val.length + '/20 characters used';
    }
    var msg = val.length > 20 ? 'Street Address 2 must be at most 20 characters.' : '';
    if (!silent) {
        document.getElementById('address2-error').textContent = msg;
    }
    return msg === '';
}

function validateSource(silent) {
    var checked = document.querySelectorAll('input[name="source"]:checked');
    var valid = checked.length > 0;
    if (!silent) {
        document.getElementById('source-error').textContent =
            valid ? '' : 'Please select at least one option.';
    }
    return valid;
}

function validateDrink(silent) {
    var val = document.getElementById('drink').value;
    var valid = val !== '';
    if (!silent) {
        document.getElementById('drink-error').textContent =
            valid ? '' : 'Please select a drink.';
    }
    return valid;
}

function validateSpecialInstructions(silent) {
    var largeSizeCb = document.getElementById('largeSize');
    var container = document.getElementById('special-instructions-container');
    /* Only required when the checkbox exists, is checked, and container is visible */
    if (!largeSizeCb || !largeSizeCb.checked || container.classList.contains('hidden')) {
        return true;
    }
    var val = document.getElementById('specialInstructions').value.trim();
    var valid = val.length > 0;
    if (!silent) {
        document.getElementById('specialInstructions-error').textContent =
            valid ? '' : 'Special Instructions are required when Large Size is selected.';
    }
    return valid;
}

function validateComments(silent) {
    var val = document.getElementById('comments').value.trim();
    var msg = '';
    if (!val) {
        msg = 'Comments are required.';
    } else if (val.length < 10) {
        msg = 'Comments must be at least 10 characters.';
    } else if (val.length > 500) {
        msg = 'Comments must be at most 500 characters.';
    }
    if (!silent) {
        document.getElementById('comments-error').textContent = msg;
    }
    return msg === '';
}

/* ============================================================
   FORM VALIDITY CHECK
   Silently tests every field; enables or disables submit button.
   ============================================================ */
function checkFormValidity() {
    var allValid =
        validateTitle(true) &&
        validateFirstName(true) &&
        validateLastName(true) &&
        validateEmail(true) &&
        validatePhone(true) &&
        validateZipcode(true) &&
        validateAddress1(true) &&
        validateAddress2(true) &&
        validateSource(true) &&
        validateDrink(true) &&
        validateSpecialInstructions(true) &&
        validateComments(true);

    document.getElementById('submit-btn').disabled = !allValid;
}

/* ============================================================
   LARGE SIZE CHECKBOX — dynamically injected / removed
   ============================================================ */
function createLargeSizeCheckbox() {
    var container = document.getElementById('large-size-container');
    container.innerHTML = '';

    var row = document.createElement('div');
    row.className = 'form-row';

    var emptyLabel = document.createElement('label');

    var cbWrap = document.createElement('div');
    cbWrap.className = 'inline-group';

    var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.name = 'largeSize';
    cb.id = 'largeSize';
    cb.value = 'Yes';

    var cbLabel = document.createElement('label');
    cbLabel.htmlFor = 'largeSize';
    cbLabel.className = 'inline-label';
    cbLabel.textContent = 'Large size (75c extra)';

    cbWrap.appendChild(cb);
    cbWrap.appendChild(cbLabel);
    row.appendChild(emptyLabel);
    row.appendChild(cbWrap);
    container.appendChild(row);

    cb.addEventListener('change', function () {
        var specialContainer = document.getElementById('special-instructions-container');
        if (this.checked) {
            specialContainer.classList.remove('hidden');
        } else {
            specialContainer.classList.add('hidden');
            document.getElementById('specialInstructions').value = '';
            document.getElementById('specialInstructions-error').textContent = '';
        }
        validateSpecialInstructions(false);
        checkFormValidity();
    });
}

function removeLargeSizeCheckbox() {
    document.getElementById('large-size-container').innerHTML = '';
    var specialContainer = document.getElementById('special-instructions-container');
    specialContainer.classList.add('hidden');
    document.getElementById('specialInstructions').value = '';
    document.getElementById('specialInstructions-error').textContent = '';
}

/* ============================================================
   RESET HELPER  (runs after native form reset)
   ============================================================ */
function afterReset() {
    document.getElementById('address2-counter').textContent = '0/20 characters used';
    removeLargeSizeCheckbox();
    document.querySelectorAll('.error-msg').forEach(function (el) {
        el.textContent = '';
    });
    document.getElementById('submit-btn').disabled = true;
}

/* ============================================================
   SUBMIT HANDLER
   ============================================================ */
function handleSubmit(e) {
    e.preventDefault();

    /* Final guard: re-run all validators visibly in case of edge cases */
    var allValid =
        validateTitle(false) &&
        validateFirstName(false) &&
        validateLastName(false) &&
        validateEmail(false) &&
        validatePhone(false) &&
        validateZipcode(false) &&
        validateAddress1(false) &&
        validateAddress2(false) &&
        validateSource(false) &&
        validateDrink(false) &&
        validateSpecialInstructions(false) &&
        validateComments(false);

    if (!allValid) return;

    /* Gather form values */
    var title       = document.querySelector('input[name="title"]:checked').value;
    var firstName   = document.getElementById('firstName').value.trim();
    var lastName    = document.getElementById('lastName').value.trim();
    var emailId     = document.getElementById('emailId').value.trim();
    var phoneNumber = document.getElementById('phoneNumber').value.trim();
    var zipcode     = document.getElementById('zipcode').value.trim();
    var address1    = document.getElementById('address1').value.trim();
    var address2    = document.getElementById('address2').value.trim();
    var comments    = document.getElementById('comments').value.trim();

    var sources = Array.from(document.querySelectorAll('input[name="source"]:checked'))
                       .map(function (cb) { return cb.value; })
                       .join(', ');

    var drink = document.getElementById('drink').value;

    var largeSizeCb = document.getElementById('largeSize');
    var largeSize   = (largeSizeCb && largeSizeCb.checked) ? 'Yes' : 'No';

    var specialContainer = document.getElementById('special-instructions-container');
    var specialInstructions = (largeSizeCb && largeSizeCb.checked &&
                                !specialContainer.classList.contains('hidden'))
        ? document.getElementById('specialInstructions').value.trim()
        : '';

    /* Append row to results table */
    var tableContainer = document.getElementById('table-container');
    tableContainer.classList.remove('hidden');

    var tbody = document.getElementById('results-tbody');
    var row   = tbody.insertRow();
    var data  = [
        title, firstName, lastName, emailId, phoneNumber, zipcode,
        address1, address2, comments, sources, drink, largeSize, specialInstructions
    ];
    data.forEach(function (val) {
        var cell = row.insertCell();
        cell.textContent = val;
    });

    /* Clear form and reset UI state */
    document.getElementById('feedback-form').reset();
    afterReset();
}

/* ============================================================
   AI FAQ CHATBOT
   ============================================================ */
var FAQ_RULES = [
    {
        keywords: ['email'],
        response: 'You must use your Northeastern email ending in @northeastern.edu'
    },
    {
        keywords: ['phone'],
        response: 'Phone number must be in format (XXX) XXX-XXXX. Just type digits and it formats automatically.'
    },
    {
        keywords: ['zip'],
        response: 'Zip code must be exactly 5 digits.'
    },
    {
        keywords: ['required', 'mandatory'],
        response: 'All fields are required except Street Address 2.'
    },
    {
        keywords: ['address'],
        response: 'Street Address 2 is optional. If left blank, it will show as empty in the results table.'
    },
    {
        keywords: ['drink'],
        response: 'Select a drink from the dropdown. If you want large size, check the checkbox and add special instructions.'
    }
];

function getFAQResponse(msg) {
    var lower = msg.toLowerCase();
    for (var i = 0; i < FAQ_RULES.length; i++) {
        var rule = FAQ_RULES[i];
        for (var j = 0; j < rule.keywords.length; j++) {
            if (lower.indexOf(rule.keywords[j]) !== -1) {
                return rule.response;
            }
        }
    }
    return 'Sorry, I do not know that yet. Please check the form instructions.';
}

function appendChatMessage(text, type) {
    var messagesDiv = document.getElementById('chat-messages');
    var div = document.createElement('div');
    div.className = type === 'user' ? 'msg-user' : 'msg-bot';
    div.textContent = text;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendChatMessage() {
    var input = document.getElementById('chat-input');
    var msg = input.value.trim();
    if (!msg) return;
    appendChatMessage(msg, 'user');
    input.value = '';
    var response = getFAQResponse(msg);
    setTimeout(function () {
        appendChatMessage(response, 'bot');
    }, 300);
}

/* ============================================================
   INIT — wire up all event listeners after DOM is ready
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

    /* ----- Title (radio) — validate on change and blur ----- */
    document.querySelectorAll('input[name="title"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            validateTitle(false);
            checkFormValidity();
        });
        radio.addEventListener('blur', function () {
            validateTitle(false);
            checkFormValidity();
        });
    });

    /* ----- First Name ----- */
    document.getElementById('firstName').addEventListener('keyup', function () {
        validateFirstName(false);
        checkFormValidity();
    });

    /* ----- Last Name ----- */
    document.getElementById('lastName').addEventListener('keyup', function () {
        validateLastName(false);
        checkFormValidity();
    });

    /* ----- Email ----- */
    document.getElementById('emailId').addEventListener('keyup', function () {
        validateEmail(false);
        checkFormValidity();
    });

    /* ----- Phone — input masking + validation ----- */
    document.getElementById('phoneNumber').addEventListener('input', function () {
        var formatted = applyPhoneMask(this.value);
        this.value = formatted;
        /* Move cursor to end so masking does not feel jarring */
        this.setSelectionRange(formatted.length, formatted.length);
        validatePhone(false);
        checkFormValidity();
    });

    /* ----- Zipcode ----- */
    document.getElementById('zipcode').addEventListener('keyup', function () {
        validateZipcode(false);
        checkFormValidity();
    });

    /* ----- Street Address 1 ----- */
    document.getElementById('address1').addEventListener('keyup', function () {
        validateAddress1(false);
        checkFormValidity();
    });

    /* ----- Street Address 2 — live counter on every keystroke ----- */
    document.getElementById('address2').addEventListener('keyup', function () {
        validateAddress2(false);
        checkFormValidity();
    });

    /* ----- How Did You Hear checkboxes ----- */
    document.querySelectorAll('input[name="source"]').forEach(function (cb) {
        cb.addEventListener('change', function () {
            validateSource(false);
            checkFormValidity();
        });
    });

    /* ----- Drink select — dynamically add/remove large-size checkbox ----- */
    document.getElementById('drink').addEventListener('change', function () {
        if (this.value) {
            createLargeSizeCheckbox();
        } else {
            removeLargeSizeCheckbox();
        }
        validateDrink(false);
        validateSpecialInstructions(false);
        checkFormValidity();
    });

    /* ----- Special Instructions (event bound here as fallback; main listener
             is added inside createLargeSizeCheckbox) ----- */
    document.getElementById('specialInstructions').addEventListener('keyup', function () {
        validateSpecialInstructions(false);
        checkFormValidity();
    });

    /* ----- Comments ----- */
    document.getElementById('comments').addEventListener('keyup', function () {
        validateComments(false);
        checkFormValidity();
    });

    /* ----- Form submit ----- */
    document.getElementById('feedback-form').addEventListener('submit', handleSubmit);

    /* ----- Form reset — clean up custom state after native reset fires ----- */
    document.getElementById('feedback-form').addEventListener('reset', function () {
        setTimeout(afterReset, 0);
    });

    /* ----- AI Assistant button ----- */
    document.getElementById('ai-assistant-btn').addEventListener('click', function () {
        var chatWindow = document.getElementById('chat-window');
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            document.getElementById('chat-input').focus();
        }
    });

    /* ----- Close chat ----- */
    document.getElementById('close-chat').addEventListener('click', function () {
        document.getElementById('chat-window').classList.add('hidden');
    });

    /* ----- Chat send button ----- */
    document.getElementById('chat-send').addEventListener('click', sendChatMessage);

    /* ----- Chat input Enter key ----- */
    document.getElementById('chat-input').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
});
