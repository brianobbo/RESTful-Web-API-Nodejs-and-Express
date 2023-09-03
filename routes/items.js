
/*
Importing Express.js and setting up a router:
This code imports the Express.js library and creates an instance of an Express Router. 
The router is used to define routes and handle HTTP requests.
*/
const express = require('express');
const router = express.Router();

/* 
Defining sample data:
Here, an array named data is defined, containing several objects that represent tasks. 
Each object has properties like id, title, order, completed, and createdOn. 
*/
const data = [
    {id: 1, title: 'Finalize project', order: 1, completed: false, createdOn: new Date()},
    {id: 2, title: 'Book ticket to London', order: 2, completed: false, createdOn: new Date()},
    {id: 3, title: 'Finish last article', order: 3, completed: false, createdOn: new Date()},
    {id: 4, title: 'Get a new t-shirt', order: 4, completed: false, createdOn: new Date()},
    {id: 5, title: 'Create dinner reservation', order: 5, completed: false, createdOn: new Date()},
];


/*
Defining HTTP GET routes:

router.get('/'): This route handles GET requests to the root path ('/'). 
It responds with a status code 200 and sends the data array as JSON in the response.

router.get('/:id'): This route handles GET requests with a dynamic parameter :id. 
It uses req.params.id to find a task object in the data array with a matching id. 
If found, it responds with a status code 200 and sends the found task as JSON. 
If not found, it responds with a status code 404 (Not Found).
*/


// CRUD Operations and HTTP methods


//Read
router.get('/', function (req, res) {
    res.status(200).json(data);
});

//Read by Id
router.get('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// Create
router.post('/', function (req, res) {
    let itemIds = data.map(item => item.id);
    let orderNums = data.map(item => item.order);
  
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
    let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;
  
    let newItem = {
      id: newId,
      title: req.body.title,
      order: newOrderNum,
      completed: false,
      createdOn: new Date()
    };
  
    data.push(newItem);
  
    res.status(201).json(newItem);
  });



// Update

router.put('/:id', function (req, res) {
    let found = data.find(function (item) {
      return item.id === parseInt(req.params.id);
    });
  
    if (found) {
      let updated = {
        id: found.id,
        title: req.body.title,
        order: req.body.order,
        completed: req.body.completed
      };
  
      let targetIndex = data.indexOf(found);
  
      data.splice(targetIndex, 1, updated);
  
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });


// Delete

  router.delete('/:id', function (req, res) {
    let found = data.find(function (item) {
      return item.id === parseInt(req.params.id);
    });
  
    if (found) {
      let targetIndex = data.indexOf(found);
  
      data.splice(targetIndex, 1);
    }
  
    res.sendStatus(204);
  });
  
  module.exports = router;




/* 
Exporting the router:
This code exports the router object so that it can be used in other parts of the application.
*/
module.exports = router;
