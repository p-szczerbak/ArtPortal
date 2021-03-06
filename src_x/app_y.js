'use strict';

const util = require('util');
const path = require('path');
const express = require('express');
const swagger = require('swagger-express-middleware');
const Middleware = swagger.Middleware;
const MemoryDataStore = swagger.MemoryDataStore;
const Resource = swagger.Resource;
const db = require('../models/index.js');

let app = express();
let middleware = new Middleware(app);

// Initialize Swagger Express Middleware with our Swagger file
// let swaggerFile = path.join(__dirname, 'PetStore.yaml');
let swaggerFile = path.join(__dirname, 'ArtPortal2.yaml');
middleware.init(swaggerFile, (err) => {


  // sequelize db
  // db.WorkOfArt.create({ name: 'foo', description: 'bar', author: 'this is author', image: 'image/path' }).then(art => {
  //   // console.log(art);
  //   });

  let workOfArtList = [
    {
        name: 'awesome suclpture',
        description: 'fvdfvgvgbbg',
        image: 'path/to/image',
        author: 'Klimt',
        type: 'sculpture'
  },
      {
        name: 'awesome suclpture',
        description: 'fvdfvgvgbbg',
        image: 'path/to/image',
        author: 'Klimt',
        type: 'sculpture'
  },
      {
        name: 'awesome suclpture',
        description: 'fvdfvgvgbbg',
        image: 'path/to/image',
        author: 'Klimt',
        type: 'sculpture'
  }
  ];

  // Create a custom data store with some initial mock data
  let myDB = new MemoryDataStore();
  // myDB.save(
  //   new Resource('/worksOfArt/1', { name: 'Lassie', description: 'dog', image: '../assets/sculpture.jpg', author: 'DaVinci'}),
  //   new Resource('/worksOfArt/3', { name: 'Garfield', description: 'cat', image: '../assets/sculpture.jpg', author: 'Paulina S.'}),
  //   new Resource('/worksOfArt/4', { name: 'Snoopy', description: 'dog', image: '../assets/sculpture.jpg', author: 'Szpieg z krainy deszczowców'}),
  //   new Resource('/worksOfArt/5', { name: 'Hello Kitty', description: 'cat', image: '../assets/sculpture.jpg', author: 'Magda M.'})
  // );

  myDB.save(Resource.parse(workOfArtList));

  // Enable Express' case-sensitive and strict options
  app.enable('case sensitive routing');
  app.enable('strict routing');

  app.use(middleware.metadata());
  app.use(middleware.files(
    {
      caseSensitive: false,
      strict: false
    },
    {
      // Serve the Swagger API from "/swagger/api" instead of "/api-docs"
      apiPath: '/swagger/api',

      // Disable serving the "ArtPortal.yaml" file
      rawFilesPath: false
    }
  ));

  app.use(middleware.parseRequest(
    {
      // Configure the cookie parser to use secure cookies
      cookie: {
        secret: 'MySuperSecureSecretKey'
      },

      // Don't allow JSON content over 100kb (default is 1mb)
      json: {
        limit: '100kb'
      },

      // Change the location for uploaded pet photos (default is the system's temp directory)
      multipart: {
        dest: path.join(__dirname, 'photos')
      }
    }
  ));

  // These two middleware don't have any options (yet)
  app.use(
    middleware.CORS(),
    middleware.validateRequest()
  );

  // Add custom middleware
  // app.patch('/pets/:petName', (req, res, next) => {
  //   if (req.body.name !== req.params.petName) {
  //     // The pet's name has changed, so change its URL.
  //     // Start by deleting the old resource
  //     myDB.delete(new Resource(req.path), (err, pet) => {
  //       if (pet) {
  //         // Merge the new data with the old data
  //         pet.merge(req.body);
  //       }
  //       else {
  //         pet = req.body;
  //       }
  //
  //       // Save the pet with the new URL
  //       myDB.save(new Resource('/pets', req.body.name, pet), (err, pet) => {
  //         // Send the response
  //         res.json(pet.data);
  //       });
  //     });
  //   }
  //   else {
  //     next();
  //   }
  // });

  // Add custom middleware
  app.patch('/worksOfArt/:id', (req, res, next) => {
    if (req.body.name !== req.params.id) {
      // The workOfArt's name has changed, so change its URL.
      // Start by deleting the old resource
      myDB.delete(new Resource(req.path), (err, workOfArt) => {
        if (workOfArt) {
          // Merge the new data with the old data
          workOfArt.merge(req.body);
        }
        else {
          workOfArt = req.body;
        }

        // Save the work of art with the new URL
        myDB.save(new Resource('/worksOfArt', req.body.name, workOfArt), (err, workOfArt) => {
          // Send the response
          res.json(workOfArt.data);
        });
      });
    }
    else {
      next();
    }
  });

  // The mock middleware will use our custom data store,
  // which we already pre-populated with mock data
  app.use(middleware.mock(myDB));

  // Add a custom error handler that returns errors as HTML
  app.use((err, req, res, next) => {
    res.status(err.status);
    res.type('html');
    res.send(util.format('<html><body><h1>%d Error!</h1><p>%s</p></body></html>', err.status, err.message));
  });

  app.listen(8081, () => {
    console.log('The Swagger Art Portal is now running at http://localhost:8081');
  });
});

