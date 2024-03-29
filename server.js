//we need fs to overwrite the json file
const fs = require('fs');
const path = require('path');
/**************************************************/
const {tasks} = require('./db/db.json');
const express = require('express');
const e = require('express');
//must use env for heroku
const PORT = process.env.PORT || 3001;
//instatiate the server
const app = express();
//connecting to the database

/***********************************************************/
//middleware
// parse incoming string or array data to post body to database!!!It takes incoming POST data and converts it to key/value. extended means array data nested in it as well
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//this ensure the Develop folder with css and java is used
app.use(express.static('public'));
/**********************************************************/

//validation 
function validateTasks(task) {
if(!task.title || typeof task.title !== 'string'){
    console.log(typeof task.title);
    return false;

}
if(!task.text || typeof task.text !== 'string'){
    console.log(typeof task.text);
    return false;
}
return true;
}
/******************************************************/
function filterByQuery(query, tasks){

    let filteredResults = tasks;
    
    /*if (query.personalityTraits) {
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
            tasks =>console.log(tasks.personalityTraits.indexOf(trait)) !== -1,
            
            
          );
        });
      }*/
    
    if(query.title){
        filteredResults.filter(tasks => tasks.title === query.title)
    }
    return filteredResults;
}
//the [0] just zeroes in on the array.
function findById(id, tasksArray){
    const result = tasksArray.filter(task => task.id === id)[0];
    return result;
}

//adding to the tasks array
function createNewTasks(body, tasksArray){
    const task =  body;
tasksArray.push(task);  
//overwriting original tasks json file
fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    //we need to save the JavaScript array data as JSON, so we use JSON.stringify
    //()The null argument means we don't want to edit any of our existing data; 
    //if we did, we could pass something in there. The 2 indicates we want to create white 
    //space between our values to make it more readable.
    JSON.stringify({ tasks: tasksArray }, null, 2)
);
    return task;
}



//res is the param//go to http://localhost:3001/api/tasks
app.get('/api/notes', (req, res) => {
    
    let results = tasks;
    console.log(req.query);

    if(req.query){
        results = filterByQuery(req.query, results)
    }
    //res.send('Hello!');
    res.json(results);
});
//params must come after the other get route. this search is singular in search, id
app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, tasks);
    if(result){ res.json(result);
    }
    else{
        res.send(404);
    }
    });
/********************************************************/
//post
app.post('/api/notes', (req, res) => {
    console.log(req.body);
 // req.body is where our incoming content will be
 console.log(req.body);
  // set id based on what the next index of the array will be
  
req.body.id = tasks.length.toString();

if(!validateTasks(req.body)){
    res.status(400).send('Task is not formatted properly.')
    
}else{
const task = createNewTasks(req.body, tasks);
 res.json(task);
}

});
///delete
app.delete('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, tasks);
    if (result !== -1) {
        tasks.splice(result, 1);
        res.status(204).send();
      } else {
        res.status(404).send();
      }
});
/********************************************************/
//sending us to the homepage at index!!!!!!
app.get('/notes', (req, res) => {
    //res.sendFile(path.join(__dirname, './public/index.html'));
    //turn back on for challenge.
    res.sendFile(path.join(__dirname, './public/notes.html'));
})
/****************************************************************/
app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, './public/animals.html'));
    res.sendFile(path.join(__dirname, './public/index.html'))
})
/***************************************************************/
/*app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
  });
  
/*************************************************************/
/***********put * last */
/*app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});*/
app.listen(PORT, () => {
console.log(`API server on port ${PORT}`);
});
















/*
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
//we need fs to overwrite the json file
//const fs = require('fs');
//const path = require('path');
const {tasks} = require('./Develop/db/db.json');
const express = require('express');
const e = require('express');
//must use env for heroku
const PORT = process.env.PORT || 3001;
//instatiate the server
const app = express();
//connecting to the database

//middleware
// parse incoming string or array data to post body to database!!!It takes incoming POST data and converts it to key/value. extended means array data nested in it as well
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//this ensure the public folder with css and java is used
app.use(express.static('public'));
 

*/