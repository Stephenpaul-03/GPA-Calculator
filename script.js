const gradeValues = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C+": 5,
    "C": 4
};

document.addEventListener('DOMContentLoaded', () => {
    const subjectsContainer = document.getElementById('subjectsContainer');
    subjectsContainer.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        addSubject(false);
    }
});

function addSubject(createNew = true) {
    const subjectsContainer = document.getElementById('subjectsContainer');
    const newSubjectRow = document.createElement('div');
    newSubjectRow.classList.add('Subject-Row');
    newSubjectRow.innerHTML = `
        <input type="text" placeholder="Name [Optional]" class="name">
        <input type="text" placeholder="Credits" class="credits">
        <input type="text" placeholder="Grade" class="grade">
    `;
    subjectsContainer.appendChild(newSubjectRow);

    newSubjectRow.scrollIntoView({ behavior: 'smooth', block: 'end' });

    if (createNew) {
        const existingRows = subjectsContainer.querySelectorAll('.Subject-Row');
        if (existingRows.length < 5) {
            subjectsContainer.appendChild(newSubjectRow);
        }
    }
}


function removeSubject() {
    const subjectsContainer = document.getElementById('subjectsContainer');
    if (subjectsContainer.children.length > 3) {
        subjectsContainer.removeChild(subjectsContainer.lastElementChild);
    } else {
        alert('Minimum of 3 subjects required.');
    }
}

function calculateGPA() {
    const credits = document.querySelectorAll('.credits');
    const grades = document.querySelectorAll('.grade');
    const names = document.querySelectorAll('.name');
    let totalCredits = 0;
    let totalScore = 0;

    let tableHeaderHTML = `
        <thead>
            <tr>
                <th>Subject</th>
                <th>Credits</th>
                <th>Grade</th>
                <th>Score</th>
            </tr>
        </thead>
    `;

    let tableBodyHTML = '';
    let footerHTML = '';
    let errorMessages = [];

    credits.forEach((creditElem, index) => {
        const creditsValue = creditElem.value.trim();
        const gradeValue = grades[index].value.trim().toUpperCase();
        const gradeScore = gradeValues[gradeValue];
        const subjectName = names[index].value.trim() || `Subject ${index + 1}`;

        if (creditsValue === '') {
            errorMessages.push(`Empty credits input for ${subjectName}. Please enter a value.`);
            return;
        }

        if (gradeValue === '') {
            errorMessages.push(`Empty grade input for ${subjectName}. Please enter a grade.`);
            return;
        }

        const creditsNumber = parseFloat(creditsValue);
        if (isNaN(creditsNumber) || creditsNumber < 0 || creditsNumber > 5) {
            errorMessages.push(`Credit Value is greater than 5 or lesser than 0 for ${subjectName}. Please enter a value between 0 and 5.`);
            return;
        }

        if (gradeScore === undefined) {
            errorMessages.push(`Invalid grade value for ${subjectName}. Please enter a valid grade.`);
            return;
        }

        const subjectScore = creditsNumber * gradeScore;
        totalCredits += creditsNumber;
        totalScore += subjectScore;

        tableBodyHTML += `
            <tr>
                <td>${subjectName}</td>
                <td>${creditsNumber}</td>
                <td>${gradeValue} [${gradeScore}]</td>
                <td>${subjectScore}</td>
            </tr>
        `;
    });

    if (errorMessages.length > 0) {
        alert(errorMessages.join('\n'));
        document.getElementById('result').innerHTML = '';
        document.getElementById('footer').innerHTML = '';
        return;
    }

    const gpa = (totalCredits > 0) ? (totalScore / totalCredits).toFixed(3) : 0;

    footerHTML = `
        <tr>
            <td colspan="3"><strong>Total Credits</strong></td>
            <td>${totalCredits}</td>
        </tr>
        <tr>
            <td colspan="3"><strong>Total Score</strong></td>
            <td>${totalScore}</td>
        </tr>
        <tr>
            <td colspan="3"><strong>GPA/CGPA</strong></td>
            <td>${gpa}</td>
        </tr>
    `;

    document.getElementById('result').innerHTML = `
        <table>
            ${tableHeaderHTML}
            <tbody>
                ${tableBodyHTML}
            </tbody>
        </table>
    `;
    document.getElementById('footer').innerHTML = footerHTML;
}