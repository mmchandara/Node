// getting-started.js
const mongoose = require('mongoose');
const express = require('express');
const app = express();

//main().catch(err => console.log(err));

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

const Student = mongoose.model('Student', studentSchema);

mongoose.connect('mongodb://127.0.0.1:27017/test');
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

  // try{
  //   mongoose.connect('mongodb://127.0.0.1:27017/test');
    
  // }
  // catch (error) {
  //   res.status(500).json({message: error.message})
  // }

  // async function main() {
  //   await mongoose.connect('mongodb://127.0.0.1:27017/test');
  //   const Person = mongoose.model('Person', personSchema);
  //   person1 = new Person({ name: 'John', age: 1  });
  //   await Person.create(person1);
  //   const people = await Person.find();
  //   console.log(people); 
  //   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  // }

app.use(express.json());

// GET method route
app.get('/api/students/', async (req, res) => {
  try{
    const data = await Student.find();
    res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
});

// POST method route
app.post('/api/students/', async (req, res) => {
  const data = new Student ({
    name:req.body.name,
    age:req.body.age,
    email:req.body.email
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  }
  catch (error) {
    res.status(400).json({message: error.message})
  }
})

// GET ID method route
app.get('/api/students/:id', async (req, res) => {
  try{
    const data = await Student.findById(req.params.id);
    res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
});

// PATCH method route
app.patch('/api/students/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Student.findByIdAndUpdate(
        id, updatedData, options
    )
    res.send(result)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

//DELETE method route
app.delete('/api/students/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Student.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

app.listen(8080);
