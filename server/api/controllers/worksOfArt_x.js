'use strict'

// For sequelize and swagger-sequelize:
const swaggerSequelize = require('../models/swaggerSequelize')

// Setup Sequelize-ORM for "WorkOfArt" based on Swagger API specification:
var WorkOfArtModel = swaggerSequelize.sequelize.define('WorkOfArt', swaggerSequelize.swaggerSequelize.generate(swaggerSequelize.swaggerSpec.definitions.WorkOfArt))

// Setup/sync database table:
// force: false => If table already exists, don't touch or update it.
// force: true  => Delete table if it exists. Then create a new table.
WorkOfArtModel.sync({force: false})
  .then(() => { console.log('==>> WorkOfArtModel synched =====================================') })

// Just for Reference: List of important http status codes:
// 200 OK
// 201 CREATED
// 204 NO CONTENT (Indicates success but nothing is in the response body, often used for DELETE and PUT operations.)
// 400 BAD REQUEST (e.g. when data is missing or has wrong data type)
// 401 UNAUTHORIZED (e.g. missing or invalid authentication token)
// 403 FORBIDDEN (anlike a 401 Unauthorized response, authenticating will make no difference)
// 404 NOT FOUND
// 405 METHOD NOT ALLOWED (e.g. requested URL exists, but the requested HTTP method is not applicable. The Allow HTTP header must be set when returning a 405 to indicate the HTTP methods that are supported.
// 409 CONFLICT (e.g. a resource conflict would be caused by fulfilling the request)
// 500 INTERNAL SERVER ERROR (given when no more specific message is suitable)
// 501 Not Implemented

// The following controller methods are exported to be used by the API:

module.exports.create = (req, res) => {
  console.time('<<<<<< create()') // Start time measurement
  const reqWorkOfArt = req.body
  console.log('\n>>>>>> create() in controller worksOfArt.js')
  console.log('reqWorkOfArt:', reqWorkOfArt)
  // res.status(501).json({message:"NOT YET IMPLEMENTED"});

  // Create a new workOfArt, put it into the database and respond with the newly created workOfArt:
  WorkOfArtModel.create(reqWorkOfArt).then((createdWorkOfArt) => {
    res.status(201).json(createdWorkOfArt)
    console.timeEnd('<<<<<< create()') // End time measurement
  })
}

module.exports.readAll = (req, res) => {
  console.time('<<<<<< readAll()') // Start time measurement
  console.log('\n>>>>>> readAll() in controller worksOfArt.js')
  // res.status(501).json({message:"NOT YET IMPLEMENTED"});
  WorkOfArtModel.findAll().then((worksOfArt) => {
    console.log('Controller: worksOfArt.js; Function: readAll(): Responding with an array containing ' + worksOfArt.length + ' elements.')
    res.status(200).json(worksOfArt)
    console.timeEnd('<<<<<< readAll()') // End time measurement
  })
}

module.exports.readById = (req, res) => {
  console.time('<<<<<< readById()') // Start time measurement
  console.log('\n>>>>>> readById() in controller worksOfArt.js')
  const reqId = req.swagger.params.id.value
  console.log('Requested id:', reqId)
  // res.status(501).json({message:"NOT YET IMPLEMENTED"});

  // Search workOfArt with provided reqId:
  WorkOfArtModel
    .findById(reqId) /* Mor generic search .find( { where: { id: reqId } } ) */
    .then((foundWorkOfArt) => {
      if (foundWorkOfArt == null) {
      // WorkOfArt with reqId could not be found
        console.log('WorkOfArt with requested id ' + reqId + ' could NOT be found.')
        res.status(404).json({message: 'The requested workOfArt with id ' + reqId + ' could not be found. You may try another id.'})
        console.timeEnd('<<<<<< readById()') // End time measurement
      } else {
        console.log('WorkOfArt with requested id ' + reqId + ' is found. Responding with object')
        console.log(foundWorkOfArt.dataValues)
        res.json(foundWorkOfArt)
        console.timeEnd('<<<<<< readById()') // End time measurement
      }
    })
}

module.exports.deleteById = (req, res) => {
  console.time('<<<<<< deleteById()') // Start time measurement
  console.log('\n>>>>>> deleteById() in controller worksOfArt.js')
  const reqId = req.swagger.params.id.value
  console.log('Requested id:', reqId)
  // res.status(501).json({message:"NOT YET IMPLEMENTED"});

  WorkOfArtModel
    .destroy({ where: { id: reqId } })
    .then((destoryedCount) => {
      if (destoryedCount === 0) {
      // Strange ... the workOfArt could not be deleted:
        console.log('WorkOfArt with requested id ' + reqId + ' could NOT be deleted!')
        res.status(404).json({message: 'The requested workOfArt with id ' + reqId + ' could not be deleted. You may try another id.'})
        console.timeEnd('<<<<<< deleteById()') // End time measurement
      } else {
      // Successfully deleted ...
        console.log('WorkOfArt with requested id ' + reqId + ' is deleted! Number of deleted objects: ' + destoryedCount)
        res.json({
          success: destoryedCount,
          description: 'WorkOfArt with id ' + reqId + ' is deleted.'
        })
        console.timeEnd('<<<<<< deleteById()') // End time measurement
      }
    })
}

module.exports.updateOrCreate = (req, res) => {
  console.time('<<<<<< updateOrCreate()') // Start time measurement
  console.log('\n>>>>>> updateOrCreate() in controller worksOfArt.js')
  const reqId = req.swagger.params.id.value
  const reqWorkOfArt = req.body
  console.log('Requested id:', reqId)
  console.log('Requested contents:', reqWorkOfArt)
  // res.status(501).json({message:"NOT YET IMPLEMENTED"});
  WorkOfArtModel
    .findOrCreate({ where: { id: reqId }, defaults: reqWorkOfArt })
    .spread((workOfArt, created) => {
      if (created) {
      // New workOfArt has been created, but most likely with wrong id:
        let createdId = workOfArt.id
        if (createdId === reqId) {
          console.log('createdId AND reqId: ' + createdId)
          // Status code 201: Successfully created
          console.log('New workOfArt has been created:', workOfArt.dataValues)
          res.status(201).json(workOfArt)
          console.timeEnd('<<<<<< updateOrCreate()') // End time measurement
        } else {
          console.warn('createdId:' + createdId + ' BUT reqId:' + reqId)
          // To change the id, workOfArt.updateAttributes() is not enough.
          // We need WorkOfArtModle.update() for this:
          WorkOfArtModel.update({id: reqId}, {where: {id: createdId}}).then((affectedRowsCount) => {
            if (affectedRowsCount > 0) {
            // Success: id has been changed. Need to read latest values from data base:
              WorkOfArtModel
                .findById(reqId) /* Allgemeine Suche: .find( { where: { id: reqId } } ) */
                .then((foundWorkOfArt) => {
                  if (foundWorkOfArt == null) {
                    // PROBLEM: Id could not be updated, even though affectedRowsCount indicates, it is:
                    console.timeEnd('<<<<<< updateOrCreate()') // End time measurement
                    throw new Error('ERROR in updateOrCreate(): New workOfArt with id ' + createdId + ' should have been updated to new id ' + reqId + ', but is not ...')
                  } else {
                    // Status code 201: Successfully created (and updated)
                    console.log('New workOfArt has been created, id has been corrected:', foundWorkOfArt.dataValues)
                    res.status(201).json(foundWorkOfArt)
                    console.timeEnd('<<<<<< updateOrCreate()') // End time measurement
                  }
                })
            } else {
            // PROBLEM: Id could not be updated!
              console.timeEnd('<<<<<< updateOrCreate()') // End time measurement
              throw new Error('ERROR in updateOrCreate(): New workOfArt with id ' + createdId + ' could not be updated to new id ' + reqId)
            }
          })
        }
      } else {
      // WorkOfArt has been found. Need to update:
        workOfArt.updateAttributes(reqWorkOfArt).then((updatedWorkOfArt) => {
        // Status Code 200: Successfully updated
          console.log('Existing workOfArt has been updated:', updatedWorkOfArt.dataValues)
          res.json(updatedWorkOfArt)
          console.timeEnd('<<<<<< updateOrCreate()') // End time measurement
        })
      }
    })
}

module.exports.updateById = (req, res) => {
  console.time('<<<<<< updateById()') // Start time measurement
  console.log('\n>>>>>> updateById() in controller worksOfArt.js')
  const reqId = req.swagger.params.id.value
  const reqWorkOfArt = req.body
  console.log('Requested id:', reqId)
  console.log('Requested contents:', reqWorkOfArt)
  // res.status(501).json({message:"NOT YET IMPLEMENTED"});

  WorkOfArtModel
    .findById(reqId) /* More generic search would be: .find( { where: { id: id } } ) */
    .then((foundWorkOfArt) => {
      if (foundWorkOfArt == null) {
      // WorkOfArt with reqId could not be found
        console.log('WorkOfArt with requested id ' + reqId + ' could NOT be found.')
        res.status(404).json({message: 'The requested workOfArt with id ' + reqId + ' could not be found. You may try another id.'})
        console.timeEnd('<<<<<< updateById()') // End time measurement
      } else {
        foundWorkOfArt.updateAttributes(reqWorkOfArt).then((updatedWorkOfArt) => {
        // Status Code 200: Successfully updated
          console.log('Existing workOfArt has been updated:', updatedWorkOfArt.dataValues)
          res.json(updatedWorkOfArt)
          console.timeEnd('<<<<<< updateById()') // End time measurement
        })
      }
    })
}
