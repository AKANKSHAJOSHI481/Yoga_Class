// // server.js

const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express();
const userRoutes = require("./routes/userRoutes");
// require("dotenv").config();

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });
// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     return;
//   }
//   console.log("Connected to MySQL");
// });

app.use(cors())
app.use(express.json())

app.use("/",userRoutes)
app.listen(8081, ()=>{
  console.log('Listening')
})

// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const PORT = 5000;

// app.use(bodyParser.json());

// // Mock function for payment
// const completePayment = (userData, paymentDetails) => {
//   // Implement your payment logic here
//   // This function is a placeholder and should be replaced with actual payment processing logic
//   console.log('Payment completed:', userData, paymentDetails);
//   return true; // Placeholder, replace with actual response
// };

// // Endpoint to enroll users
// app.post('/enroll', (req, res) => {
//     console.log(req.body  )
//   const userData = req.body;

//   // Basic validation
//   if (!userData.name || !userData.age || !userData.selectedBatch) {
//     return res.status(400).json({ error: 'All fields are required.' });
//   }

//   // Validate age
//   if (userData.age < 18 || userData.age > 65) {
//     return res.status(400).json({ error: 'Age must be between 18 and 65.' });
//   }

//   // Assume mock function for payment
//   const paymentDetails = {
//     amount: 500,
//     month: new Date().toLocaleString('en-us', { month: 'long' }),
//   };

//   // Mock payment and store in the database
//   if (completePayment(userData, paymentDetails)) {
//     // Store data in the database (MongoDB, MySQL, etc.)
//     // Implement your database logic here

//     return res.status(200).json({ message: 'Enrollment successful.' });
//   } else {
//     return res.status(500).json({ error: 'Payment failed.' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
