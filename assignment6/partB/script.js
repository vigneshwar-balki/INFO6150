$(function() {
    let totalSeconds = 0;
    let isRunning = false;
    let timerInterval = null;
    let sessions = JSON.parse(localStorage.getItem('stopwatchSessions')) || [];

    // Set default date to today
    $('#eventDate').val(new Date().toISOString().split('T')[0]);

    // --- MODERN JS: PROMISE-BASED DELAY ---
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // --- MODERN JS: ASYNC TIMER LOOP ---
    async function runTimer() {
        while (isRunning) {
            await wait(1000); // Async wait
            if (isRunning) {
                totalSeconds++;
                updateDisplay();
            }
        }
    }

    function updateDisplay() {
        const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const s = String(totalSeconds % 60).padStart(2, '0');
        $('#timerDisplay').text(`${h}:${m}:${s}`);
    }

    // --- VALIDATION LOGIC ---
    function validate() {
        const date = $('#eventDate').val();
        const name = $('#eventName').val().trim();
        const nameRegex = /^[a-zA-Z0-9\s\-\']+$/;
        let isValid = true;

        $('.error-msg').text('');

        if (!date) {
            $('#dateError').text('Please select a date');
            isValid = false;
        }

        if (!name) {
            $('#nameError').text('Event name is required');
            isValid = false;
        } else if (name.length < 3) {
            $('#nameError').text('Event name must be at least 3 characters');
            isValid = false;
        } else if (name.length > 100) {
            $('#nameError').text('Event name too long (max 100 characters)');
            isValid = false;
        } else if (!nameRegex.test(name)) {
            $('#nameError').text('Event name contains invalid characters');
            isValid = false;
        }

        return isValid;
    }

    // --- EVENT HANDLERS ---
    $('#startBtn').on('click', async function() {
        if (!validate()) return;

        isRunning = true;
        $(this).prop('disabled', true);
        $('#pauseBtn, #stopBtn').prop('disabled', false);
        $('#eventDate, #eventName').prop('disabled', true);

        await runTimer(); // Start Async loop
    });

    $('#pauseBtn').on('click', function() {
        isRunning = !isRunning;
        $(this).text(isRunning ? 'Pause' : 'Resume');
        if (isRunning) runTimer();
    });

    $('#stopBtn').on('click', function() {
        isRunning = false;
        
        const session = {
            date: $('#eventDate').val(),
            name: $('#eventName').val(),
            time: $('#timerDisplay').text(),
            rawSeconds: totalSeconds
        };

        sessions.unshift(session); // Most recent first
        localStorage.setItem('stopwatchSessions', JSON.stringify(sessions));
        
        resetTimer();
        renderHistory();
    });

    $('#resetBtn').on('click', resetTimer);

    function resetTimer() {
        isRunning = false;
        totalSeconds = 0;
        updateDisplay();
        $('#startBtn, #eventDate, #eventName').prop('disabled', false);
        $('#pauseBtn, #stopBtn').prop('disabled', true);
        $('#pauseBtn').text('Pause');
        $('.error-msg').text('');
    }

    // --- STATISTICS & HISTORY ---
    function renderHistory() {
        const $list = $('#historyList');
        $list.empty();
        
        if (sessions.length === 0) {
            $('#noHistory').show();
            return;
        }
        $('#noHistory').hide();

        let totalAccumulatedSecs = 0;

        sessions.forEach(s => {
            totalAccumulatedSecs += s.rawSeconds;
            $list.append(`
                <div class="history-item">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <small class="text-primary fw-bold">${s.date}</small>
                            <h5 class="mb-0">${s.name}</h5>
                        </div>
                        <h4 class="mb-0 fw-bold">${s.time}</h4>
                    </div>
                </div>
            `);
        });

        // Update Stats
        $('#totalCount').text(sessions.length);
        const h = String(Math.floor(totalAccumulatedSecs / 3600)).padStart(2, '0');
        const m = String(Math.floor((totalAccumulatedSecs % 3600) / 60)).padStart(2, '0');
        const s = String(totalAccumulatedSecs % 60).padStart(2, '0');
        $('#totalTime').text(`${h}:${m}:${s}`);
    }

    // Clear error on focus (Requirement)
    $('#eventDate, #eventName').on('focus', function() {
        $(this).next('.error-msg').text('');
    });

    renderHistory();
});