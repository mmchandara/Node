// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const personSchema = new mongoose.Schema({
    name: String,
    age: Number
  });
  const Person = mongoose.model('Person', personSchema);
  const person1 = new Person({ name: 'John', age: 1  });
console.log(person1.name, person1.age); 