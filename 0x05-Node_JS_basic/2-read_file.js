const fs = require('fs');

function countStudents(path) {
    let content;

    try {
        content = fs.readFileSync(path, 'utf8');
    } catch (err) {
        throw new Error('Cannot load the database');
    }

    content = content.split('\r\n').filter(Boolean); // Split and remove empty lines
    let students = content.map(item => item.split(','));

    const NUMBER_OF_STUDENTS = students.length - 1; // Exclude header line
    console.log(`Number of students: ${NUMBER_OF_STUDENTS}`);

    const fields = {};
    for (let i = 1; i < students.length; i++) { // Start from index 1 to skip header line
        const [firstname, lastname, age, field] = students[i];
        if (!fields[field]) fields[field] = [];
        fields[field].push(firstname);
    }

    for (const key of Object.keys(fields)) {
        console.log(`Number of students in ${key}: ${fields[key].length}. List: ${fields[key].join(', ')}`);
    }
}

module.exports = countStudents;

