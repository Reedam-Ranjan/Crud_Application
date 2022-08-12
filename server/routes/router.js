const express = require('express');


// We will not use this statement because this statement will create a new application 
// const app = express();

// Instead we will use this statement
const route = express.Router();
const services = require('../services/render');

const controller = require('../controller/controller')

// Sending the response 
// route.get('/', (req, res) =>{
//     res.render('index'); // to render a html file 
//     res.send('Crud Application');
// })


/**
 * @descripton Root Route
 * @method GET
 */
// optimized way to send the response
route.get('/',services.homeRoutes);



// adding a user 
// route.get('/add-user', (req, res) =>{
//     res.render('add_user')
// })

/**
 * @description add users
 * @method GET/ add-user
 */
route.get('/add-user',services.add_user);

// updating a user 
// route.get('/update-user', (req, res) =>{
//     res.render('update_user')
// })

/**
 * @description for update user 
 * @method GET/ update user
 */
route.get('/update-user',services.update_user);


// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);  // this is the type of url parameter   
route.delete('/api/users/:id', controller.delete);


module.exports = route;