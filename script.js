function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById('profile-pic').src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function addField(containerId) {
    const container = document.getElementById(containerId);

    if (containerId === 'languages-container') {
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.placeholder = 'Νέο πεδίο';
        newInput.style.marginBottom = '10px';
        newInput.style.padding = '8px';
        newInput.style.width = '100%';
        newInput.style.background = 'rgba(255, 255, 255, 0.9)';
        newInput.style.border = 'none';
        newInput.style.color = '#1a3a5a';
        newInput.style.borderRadius = '5px';

        const iconSpan = document.createElement('i');
        iconSpan.className = 'fas fa-globe';
        iconSpan.style.marginRight = '10px';
        iconSpan.style.color = '#ff6f00';

        const newInfoItem = document.createElement('div');
        newInfoItem.className = 'info-item';
        newInfoItem.appendChild(iconSpan);
        newInfoItem.appendChild(newInput);

        container.appendChild(newInfoItem);
    }

    if (containerId === 'skills-container') {
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.placeholder = 'Νέο πεδίο';
        newInput.style.marginBottom = '10px';
        newInput.style.padding = '8px';
        newInput.style.width = '100%';
        newInput.style.background = 'rgba(255, 255, 255, 0.9)';
        newInput.style.border = 'none';
        newInput.style.color = '#1a3a5a';
        newInput.style.borderRadius = '5px';

        const iconSpan = document.createElement('i');
        iconSpan.className = 'fas fa-handshake';
        iconSpan.style.marginRight = '10px';
        iconSpan.style.color = '#ff6f00';

        const newInfoItem = document.createElement('div');
        newInfoItem.className = 'info-item';
        newInfoItem.appendChild(iconSpan);
        newInfoItem.appendChild(newInput);

        container.appendChild(newInfoItem);
    }

    if (containerId !== 'languages-container' && containerId !== 'skills-container') {
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.placeholder = 'Νέο πεδίο';
        newInput.style.marginBottom = '10px';
        newInput.style.padding = '8px';
        newInput.style.width = '100%';
        newInput.style.border = '1px solid #ddd';
        newInput.style.borderRadius = '8px';

        container.appendChild(newInput);
    }
}

function convertLinksAndEmailsToClickable() {
    const portfolioTextarea = document.getElementById('portfolio-textarea');
    const portfolioContent = portfolioTextarea.value;

    // Μετατροπή URLs σε clickable links
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    const withLinks = portfolioContent.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`);

    // Μετατροπή emails σε clickable links
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    const finalContent = withLinks.replace(emailRegex, email => `<a href="mailto:${email}">${email}</a>`);

    // Εμφάνιση του τελικού κειμένου με clickable links μόνο κατά την εκτύπωση
    portfolioTextarea.style.display = 'none'; // Κρύβουμε το textarea κατά την εκτύπωση
    const printContent = document.createElement('div');
    printContent.innerHTML = finalContent;
    printContent.style.border = '1px solid #ddd'; // Προσθήκη περιγράμματος
    printContent.style.borderRadius = '10px'; // Προσθήκη στρογγυλεμένων γωνιών
    printContent.style.padding = '10px'; // Προσθήκη padding
    printContent.style.marginBottom = '10px'; // Προσθήκη margin
    printContent.style.fontFamily = 'Montserrat, sans-serif'; // Χρήση της ίδιας γραμματοσειράς
    printContent.style.fontSize = '14px'; // Χρήση του ίδιου μεγέθους γραμματοσειράς
    portfolioTextarea.parentNode.appendChild(printContent);
}

function prepareForPrint() {
    // Μετατροπή email σε λινκ κατά την εκτύπωση
    const emailInput = document.getElementById('email-input');
    const emailLinkPrint = document.getElementById('email-link-print');
    const email = emailInput.value.trim();
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (gmailRegex.test(email)) {
        emailLinkPrint.href = `mailto:${email}`;
        emailLinkPrint.textContent = email;
        emailLinkPrint.style.display = 'inline';
    } else {
        emailLinkPrint.style.display = 'none';
    }

    // Μετατροπή των links και emails στο Portfolio σε clickable
    convertLinksAndEmailsToClickable();

    // Έλεγχος για κενά πεδία και απόκρυψή τους
    const sectionsToCheck = [
        '.sidebar .info-container',
        '#skills-container',
        '#languages-container',
        '#profile-section',
        '#experience-section',
        '#education-section',
        '#portfolio-section'
    ];

    sectionsToCheck.forEach(sectionId => {
        const section = document.querySelector(sectionId);
        if (section) {
            const inputs = section.querySelectorAll('input, textarea');
            let hasContent = false;

            inputs.forEach(input => {
                if (input.value.trim() !== "") {
                    hasContent = true;
                } else {
                    input.style.display = 'none';
                    if (input.closest('.info-item')) {
                        input.closest('.info-item').style.display = 'none';
                    }
                }
            });

            const textareas = section.querySelectorAll('textarea');
            textareas.forEach(textarea => {
                if (textarea.value.trim() !== "") {
                    hasContent = true;
                } else {
                    textarea.style.display = 'none';
                }
            });

            if (!hasContent) {
                section.style.display = 'none';
                const title = section.previousElementSibling;
                if (title && title.tagName === 'H2') {
                    title.style.display = 'none';
                }
            }
        }
    });

    window.print();

    // Επαναφορά των στοιχείων μετά την εκτύπωση
    sectionsToCheck.forEach(sectionId => {
        const section = document.querySelector(sectionId);
        if (section) {
            section.style.display = '';
            const inputs = section.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.style.display = '';
                if (input.closest('.info-item')) {
                    input.closest('.info-item').style.display = '';
                }
            });

            const title = section.previousElementSibling;
            if (title && title.tagName === 'H2') {
                title.style.display = '';
            }
        }
    });

    // Επαναφορά του email input μετά την εκτύπωση
    emailLinkPrint.style.display = 'none';

    // Επαναφορά του Portfolio textarea μετά την εκτύπωση
    const portfolioTextarea = document.getElementById('portfolio-textarea');
    portfolioTextarea.style.display = '';
    const printContent = portfolioTextarea.parentNode.querySelector('div');
    if (printContent) {
        printContent.remove();
    }
}

// Λογική για τον έλεγχο του ορίου λέξεων
const textarea = document.getElementById('profile-textarea');
const wordLimit = document.getElementById('word-limit');
const maxWords = 100;

textarea.addEventListener('input', function () {
    const words = textarea.value.split(/\s+/).filter(Boolean);
    if (words.length > maxWords) {
        textarea.value = words.slice(0, maxWords).join(' ');
        wordLimit.textContent = `Έχετε φτάσει το μέγιστο όριο λέξεων (${maxWords})`;
        wordLimit.classList.add('error');
    } else {
        wordLimit.textContent = `Λέξεις: ${words.length}/${maxWords}`;
        wordLimit.classList.remove('error');
    }
});

// Εμποδίζουμε την πληκτρολόγηση όταν φτάσει το όριο
textarea.addEventListener('keydown', function (event) {
    const words = textarea.value.split(/\s+/).filter(Boolean);
    if (words.length >= maxWords && event.key !== 'Backspace' && event.key !== 'Delete') {
        event.preventDefault();
    }
});