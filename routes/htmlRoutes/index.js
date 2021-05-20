
const path = require('path');
const router = require('express').Router();
/********************************************************/
//sending us to the homepage at index!!!!!!
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
    //turn back on for challenge.
    //res.sendFile(path.join(__dirname, './Develop/public/index.html'));
})
/****************************************************************/
router.get('/tasks', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
    //res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
})
/***************************************************************/
router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
  });
  
/*************************************************************/
/***********put * last */
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})
router.listen(PORT, () => {
console.log(`API server on port ${PORT}`);
});
module.exports = router;