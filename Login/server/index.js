const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/employees", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB:", err.message);
});
app.post("/login", (req,res)=>{
    const{email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user =>{
        if(user){
            if(user.password === password) {
              res.json("Successfull!!")
            } else {
              res.json("Oops!! The password is incorrect")
            }
        }
        else
        {
            res.json("Email doesn't exist, PLease register")
        }
    })
})

app.post('/register', async (req, res) => {
  try {
    const employee = await EmployeeModel.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/mood', async (req, res) => {
  const email = 'renu.4521.bojja@gmail.com'; // Hardcoded for testing
  const genrePreferences = {
    Action: 70,
    Comedy: 60,
    Drama: 80,
    Mystery: 40,
    SciFi: 90,
    Romance: 30,
  };
  const selectedMood = 'Energetic';

  try {
    const updatedEmployee = await EmployeeModel.findOneAndUpdate(
      { email },
      { genrePreferences, selectedMood },
      { new: true, runValidators: true }
    );
    console.log("Updated Employee:", updatedEmployee);
    if (updatedEmployee) {
      res.status(200).json({
        message: 'Preferences and mood updated successfully',
        data: updatedEmployee,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating preferences and mood:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});