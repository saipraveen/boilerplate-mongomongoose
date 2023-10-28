require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({name: "Sai Praveen OS", age: 35, favoriteFoods: ["Poori", "Masala Dosa"]});
  // person.save((err, data) => {
  //   if(err) return console.error(err);
  //   done(null, data);
  // });
  person.save()
    .then(data => done(null, data))
    .catch(err => console.error(err));
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople)
    .then(data => done(null, data))
    .catch(err => console.error(err));
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName})
    .then(data => done(null, data))
    .catch(err => console.error(err));
};

const findOneByFood = (food, done) => {
  console.log(food);
  Person.findOne({favoriteFoods: food})
    .then(data => {
      console.log("data -- ", data);
      done(null, data);
    })
    .catch(err => console.error(err));
};

const findPersonById = (personId, done) => {
  Person.findById(personId)
    .then(data => done(null, data))
    .catch(err => console.error(err));
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId)
    .then(person => {
      person.favoriteFoods.push(foodToAdd);
      person.save()
        .then(data => done(null, data))
    })
    .catch(err => console.error(err));
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    {name: personName},
    {age: 20},
    {new: true, runValidators: true}
  )
    .then(person => done(null, person))
    .catch(err => console.error(err));
};

const removeById = (personId, done) => {
  Person.findOneAndRemove(
    {_id: personId}
  )
    .then(data => done(null, data))
    .catch(err => console.error(err));
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({name: nameToRemove})
    .then(data => done(null, data))
    .catch(err => console.error(err));
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
    .find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({name: true, favoriteFoods: true})
    .exec()
    .then(data => done(null, data))
    .catch(err => console.error(err));
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
