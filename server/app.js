'use strict'

var SwaggerExpress = require('swagger-express-mw')
var app = require('express')()
const N3 = require('n3')

module.exports = app // for testing

var config = {
  appRoot: __dirname // required config
}

// For Swagger UI Express
const jsyaml = require('js-yaml')
const path = require('path')
const fs = require('fs')
const swaggerUi = require('swagger-ui-express')
// Read Swagger-API-Spec as YAML and convert it to a JavaScript object:
const swaggerSpec = jsyaml.safeLoad(fs.readFileSync(path.join(__dirname, './api/swagger/swagger.yaml'), 'utf8'))

// Initialize sequelize and swagger-sequelize:
const swaggerSequelize = require('./api/models/swaggerSequelize')

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) { throw err }

  // install middleware
  swaggerExpress.register(app)

  // For Swagger UI Express
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // app.use(cors());
  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });

  // app.use(cors({
  // origin: 'http://localhost:8080',
  // credentials: true
  // }));

  var port = process.env.PORT || 8081
  app.listen(port)

  console.log('Server fired up on http://localhost:' + port)
  console.log('===================================================')
})


//******************************** RDF STORE

let rawdata_triples_jsonld = fs.readFileSync('my_jsonld.jsonld');
let radwata_triples_ttl = fs.readFileSync('my_triples.ttl');
let rawdata_sparql_names = fs.readFileSync('my_sparql_names.rq');
let rawdata_sparql_phone = fs.readFileSync('my_sparql_phone.rq');
let rawdata_sparql_woa = fs.readFileSync('my_sparql_workofart.rq');
let rawdata_sparql_woa_bek = fs.readFileSync('my_sparql_workofart_beksinski.rq');

let triples_jsonld = JSON.parse(rawdata_triples_jsonld);
let triples_ttl = radwata_triples_ttl.toString();
let sparql_names = rawdata_sparql_names.toString();
let sparql_phone = rawdata_sparql_phone.toString();
let sparql_woa = rawdata_sparql_woa.toString();
let sparql_woa_bek = rawdata_sparql_woa_bek.toString();

// Utility function for outputting SELECT results
function outputSPARQLResults (results) {
  for (let row in results) {
    let printedLine = ''
    for (let column in results[row]) {
      printedLine = printedLine + results[row][column].value + ' '
    }
    console.log(printedLine)
  }
}

// Create an rdfstore
var rdfstore = require('rdfstore')

// Define a query to execute.
var listISBNs = 'PREFIX s: <http://schema.org/> \n' +
'PREFIX ls: <http://learningsparql.com/ns/data#> \n' +
'PREFIX wco: <http://www.worldcat.org/title/-/oclc/> \n' +
'PREFIX wci: <http://worldcat.org/isbn/> \n' +
'SELECT ?isbn \n' +
'FROM ls:g1 WHERE { ?book s:isbn ?isbn } '


//******************* TURTLE
rdfstore.create(function (err, store) { // no error handling
  store.load("text/turtle", triples_ttl, function(err,results) {
      console.log('triples amount: ', results)

      store.execute(sparql_names, function (err, results) {
      console.log("\n=== ARTISTS NAMES - TURTLE ===")
      outputSPARQLResults(results)
      })
  });
})


//******************* JSON-LD
rdfstore.create(function (err, store) { // no error handling
  store.load("application/ld+json", triples_jsonld, function(err,results) {
      console.log('triples amount: ', results)

      store.execute(sparql_names, function (err, results) {
      console.log("\n=== ARTISTS NAMES - JSONLD ===")
      outputSPARQLResults(results)
      })
      store.execute(sparql_phone, function (err, results) {
      console.log("\n=== ARTISTS PHONES  - JSONLD ===")
      outputSPARQLResults(results)
      })
      store.execute(sparql_woa, function (err, results) {
      console.log("\n===  works of art  - JSONLD ===")
      outputSPARQLResults(results)
      })
      store.execute(sparql_woa_bek, function (err, results) {
      console.log("\n===  works of art - Beksinski - JSONLD ===")
      outputSPARQLResults(results)
      })
  });
})
  // store.execute(
  //   // Load data about the book Learning SPARQL into named graph g1 in the rdfstore.
  //   'LOAD <http://worldcat.org/oclc/890467322.ttl> \n' +
  //       'INTO GRAPH <http://learningsparql.com/ns/data#g1>', function (err) {
  //     store.setPrefix('s', 'http://schema.org/')
  //     store.setPrefix('ls', 'http://learningsparql.com/ns/data#')
  //     store.setPrefix('wco', 'http://www.worldcat.org/title/-/oclc/')
  //     store.setPrefix('wci', 'http://worldcat.org/isbn/')
  //
	//     store.execute(listISBNs, function (err, results) {
  //       console.log('=== ISBN value ===')
  //       outputSPARQLResults(results)
	//     })
  //   }
  // )
  //
  // store.execute(
  //   // Load data about the book "XML: The Annotated Specification" into the same graph
  //   'LOAD <http://worldcat.org/oclc/40768745.ttl> \
  //       INTO GRAPH <http://learningsparql.com/ns/data#g1>', function (err) {
	//     store.execute(listISBNs, function (err, results) {
  //       console.log("\n=== ISBN values after adding 2nd book's data ===")
  //       outputSPARQLResults(results)
	//     })
  //   }
  // )

//     let jsonld = {
// 		  "@context":
// 		  {
// 			 "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
// 			 "xsd": "http://www.w3.org/2001/XMLSchema#",
// 			 "name": "http://xmlns.com/foaf/0.1/name",
// 			 "age": {"@id": "http://xmlns.com/foaf/0.1/age", "@type": "xsd:integer" },
// 			 "homepage": {"@id": "http://xmlns.com/foaf/0.1/homepage", "@type": "xsd:anyURI" },
// 			 "ex": "http://example.org/people/"
// 		  },
// 		  "@id": "ex:john_smith",
// 		  "name": "John Smith",
// 		  "age": "41",
// 		  "homepage": "http://example.org/home/"
// 		};
//
// store.setPrefix("ex", "http://example.org/people/");
//
// store.load("application/ld+json", jsonld, "ex:test", function(err,results) {
//     console.log('triples amount: ', results)
//   // store.node("ex:john_smith", "ex:test", function(err, graph) {
// 	// // process graph here
//   // });
// });
// })


// store.setPrefix("ex", "http://example.org/");



