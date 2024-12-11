const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

// יצירת אובייקט Express
const app = express();

// הגדרת פורט השרת
const PORT = 3000;

// הגדרת תיקיית העלאות קבצים
const uploadDirectory = path.join(__dirname, 'uploads');

// הגדרת Multer לאחסון קבצים
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory); // שם התיקייה בה יאוחסנו הקבצים
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // מתן שם ייחודי לקובץ
  }
});

const upload = multer({ storage: storage });

// הוספת middleware כדי לאפשר שימוש ב-body של בקשות (לשלוח נתונים כמו טקסט, קבצים, וכו')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// הגדרת נתיב לדף ראשי
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));  // שולח את הקובץ index.html
});

// נתיבים לדפים השונים
app.get('/welcome.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'welcome.html'));  // שולח את דף ה-welcome
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));  // שולח את דף ה-login
});

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));  // שולח את דף ה-register
});

app.get('/upload-book.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload-book.html'));  // שולח את דף העלאת ספרים
});

app.get('/book-details.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'book-details.html'));  // שולח את דף פרטי הספר
});

app.get('/borrow-history.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'borrow-history.html'));  // שולח את דף היסטוריית ההשאלות
});

app.get('/search-screen.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'search-screen.html'));  // שולח את דף החיפוש
});

// נתיב לקבלת טופס רישום
app.post('/register.html', (req, res) => {
  const { username, email, password } = req.body;

  // כאן תוכל להוסיף את הלוגיקה לשמירת הנתונים במסד נתונים
  console.log('Username:', username);
  console.log('Email:', email);
  console.log('Password:', password);

  // הפניית המשתמש לדף הראשי אחרי ההרשמה
  res.redirect('/');
});

// נתיב לקבלת טופס העלאת ספרים
app.post('/upload-book', upload.single('book-image'), (req, res) => {
  const { bookTitle, bookAuthor, bookCategory, bookCondition } = req.body;
  const bookImage = req.file;

  if (!bookImage) {
    return res.status(400).send('נדרש להעלות תמונה של הספר.');
  }

  // ניתן להוסיף את המידע שנשלח למסד נתונים, למשל:
  console.log('Book Title:', bookTitle);
  console.log('Book Author:', bookAuthor);
  console.log('Book Category:', bookCategory);
  console.log('Book Condition:', bookCondition);
  console.log('Book Image:', bookImage.filename); // שמו של קובץ התמונה שנשמר

  // החזרת תגובה שהספר הועלה בהצלחה
  res.send('הספר הועלה בהצלחה!');
});

// הגדרת פורט עבור השרת
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
