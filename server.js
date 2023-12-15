const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gv64woe1',
    database: 'BeckFitzgeraldChat'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.post('/submit-user-details', (req, res) => {
    const { name, dateOfBirth, phoneNumber, email } = req.body;
    const query = 'INSERT INTO Users (Name, DateOfBirth, SafePhoneNumber, SafeEmail) VALUES (?, ?, ?, ?)';
    db.query(query, [name, dateOfBirth, phoneNumber, email], (err, result) => {
        if (err) res.status(500).send('Error in saving user details: ' + err);
        else res.status(200).send('User details saved successfully');
    });
});

app.post('/submit-chat-session', (req, res) => {
    const { userId, startTime, endTime, status } = req.body;
    const query = 'INSERT INTO ChatSessions (UserID, StartTime, EndTime, Status) VALUES (?, ?, ?, ?)';
    db.query(query, [userId, startTime, endTime, status], (err, result) => {
        if (err) res.status(500).send('Error in managing chat session: ' + err);
        else res.status(200).send('Chat session created successfully');
    });
});

app.post('/submit-message', (req, res) => {
    const { sessionId, messageText } = req.body;
    const query = 'INSERT INTO Messages (SessionID, MessageText) VALUES (?, ?)';
    db.query(query, [sessionId, messageText], (err, result) => {
        if (err) res.status(500).send('Error in saving message: ' + err);
        else res.status(200).send('Message saved successfully');
    });
});

app.post('/submit-legal-inquiry', (req, res) => {
    const { sessionId, sectorsOfLaw, assetsBreakdown, annualSalary, financialResponsibilities, jointAccounts, additionalInfo } = req.body;
    const query = 'INSERT INTO LegalInquiries (SessionID, SectorsOfLaw, AssetsBreakdown, AnnualSalary, FinancialResponsibilities, JointAccounts, AdditionalInfo) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [sessionId, sectorsOfLaw, assetsBreakdown, annualSalary, financialResponsibilities, jointAccounts, additionalInfo], (err, result) => {
        if (err) res.status(500).send('Error in submitting legal inquiry: ' + err);
        else res.status(200).send('Legal inquiry submitted successfully');
    });
});

app.post('/set-priority', (req, res) => {
    const { sessionId, priorityLevel } = req.body;
    const query = 'INSERT INTO Priority (SessionID, PriorityLevel) VALUES (?, ?)';
    db.query(query, [sessionId, priorityLevel], (err, result) => {
        if (err) res.status(500).send('Error in setting priority: ' + err);
        else res.status(200).send('Priority set successfully');
    });
});

app.post('/upload-file', upload.single('file'), (req, res) => {
    const { sessionId } = req.body;
    const fileDetails = req.file;
    const query = 'INSERT INTO Attachments (SessionID, FilePath, FileType, Description) VALUES (?, ?, ?, ?)';
    db.query(query, [sessionId, fileDetails.path, fileDetails.mimetype, fileDetails.originalname], (err, result) => {
        if (err) res.status(500).send('Error in uploading file: ' + err);
        else res.status(200).send('File uploaded successfully');
    });
});

app.post('/submit-yes-no-response', (req, res) => {
    const { sessionId, responseType, responseText } = req.body;
    const query = 'INSERT INTO UserResponses (SessionID, ResponseType, ResponseText) VALUES (?, "YesNo", ?)';
    db.query(query, [sessionId, responseText], (err, result) => {
        if (err) res.status(500).send('Error in submitting yes/no response: ' + err);
        else res.status(200).send('Yes/No response submitted successfully');
    });
});

app.post('/submit-range-selection', (req, res) => {
    const { sessionId, responseType, responseValue } = req.body;
    const query = 'INSERT INTO UserResponses (SessionID, ResponseType, ResponseText) VALUES (?, "Range", ?)';
    db.query(query, [sessionId, responseValue], (err, result) => {
        if (err) res.status(500).send('Error in submitting range selection: ' + err);
        else res.status(200).send('Range selection submitted successfully');
    });
});

app.post('/submit-selection', (req, res) => {
    const { sessionId, responseType, selectedOptions } = req.body;
    const query = 'INSERT INTO UserResponses (SessionID, ResponseType, ResponseText) VALUES (?, "Selection", ?)';
    db.query(query, [sessionId, selectedOptions], (err, result) => {
        if (err) res.status(500).send('Error in submitting selection: ' + err);
        else res.status(200).send('Selection submitted successfully');
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
