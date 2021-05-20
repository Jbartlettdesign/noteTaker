const fs = require("fs");
const path = require("path");

function validateTasks(task) {
    if(!task.title || typeof task.name !== 'string'){
        return false;
    }
    if(!task.text || typeof task.text !== 'string'){
        return false;
    }
    return true;
    }
    /******************************************************/
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
                tasks =>console.log(tasks.personalityTraits.indexOf(trait)) !== -1,
                
                
              );
            });
          }
        
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
        path.join(__dirname, '../Develop/db/db.json'),
        //we need to save the JavaScript array data as JSON, so we use JSON.stringify
        //()The null argument means we don't want to edit any of our existing data; 
        //if we did, we could pass something in there. The 2 indicates we want to create white 
        //space between our values to make it more readable.
        JSON.stringify({ tasks: tasksArray }, null, 2)
    );
        return task;
    }
    module.exports = {
        filterByQuery,
        findById,
        createNewTasks,
        validateTasks
      };