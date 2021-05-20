const router = require('express').Router();

const { filterByQuery, findById, createNewTasks, validateTasks } = require('../../lib/animals');
const { animals } = require('../../Develop/db/db.json');
//res is the param//go to http://localhost:3001/api/tasks
router.get('/tasks', (req, res) => {
    
    let results = tasks;
    console.log(req.query);

    if(req.query){
        results = filterByQuery(req.query, results)
    }
    //res.send('Hello!');
    res.json(results);
});
//params must come after the other get route. this search is singular in search, id
router.get('/tasks/:id', (req, res) => {
    const result = findById(req.params.id, tasks);
    if(result){ res.json(result);
    }
    else{
        res.send(404);
    }
    });
/********************************************************/
//post
router.post('/tasks', (req, res) => {
 // req.body is where our incoming content will be
 //console.log(req.body);
  // set id based on what the next index of the array will be
req.body.id = tasks.length.toString();

if(!validateTasks(req.body)){
    res.status(400).send('Task is not formatted properly.')
    
}else{
const task = createNewTasks(req.body, tasks);
 res.json(task);
}

});
module.exports  = router;