const {tasks} = require('./Develop/db/db.json');
const express = require('express');
//instatiate the server
const app = express();
//connecting to the database

 




function filterByQuery(query, tasks){

    let filteredResults = tasks;
    
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
          personalityTraitsArray = [query.personalityTraits];
          console.log("string");
          console.log(query.personalityTraits);

        } else {
          personalityTraitsArray = query.personalityTraits;
          console.log(query.personalityTraits);
          console.log("else");

        }
       
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
          // Check the trait against each animal in the filteredResults array.
          // Remember, it is initially a copy of the animalsArray,
          // but here we're updating it for each trait in the .forEach() loop.
          // For each trait being targeted by the filter, the filteredResults
          // array will then contain only the entries that contain the trait,
          // so at the end we'll have an array of animals that have every one 
          // of the traits when the .forEach() loop is finished.
          
          filteredResults = filteredResults.filter(
            tasks => tasks.personalityTraits.indexOf(trait) !== -1
            
          );
        });
      }
    
    if(query.title){
        filteredResults.filter(tasks => tasks.title === query.title)
    }
    return filteredResults;
}

//res is the param//go to http://localhost:3001/api/tasks
app.get('/api/tasks', (req, res) => {
    
    let results = tasks;
    console.log(req.query);

    if(req.query){
        results = filterByQuery(req.query, results)
    }
    //res.send('Hello!');
    res.json(results);
});



app.listen(3001, () => {
console.log(`API server on 3001`)
});