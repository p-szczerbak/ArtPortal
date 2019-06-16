const {beforeMethod, afterMethod} = require('aspect.js')

export class LoggerAspect {
  @beforeMethod({
    methodNamePattern: /.*/,
    classNamePattern: /WorksOfArt/
  })
  beforeAll (meta, ...args) {
    console.log(`Invoked ${meta.className}.${meta.method.name} with arguments: ${meta.method.args.join(', ')}.`)
    console.time(`<<<<<< ${meta.method.name}`) // Start time measurement
    console.log(`\n>>>>>> ${meta.method.name}() in controller ${meta.className}`)
  }
  @afterMethod({
    methodNamePattern: /.*/,
    classNamePattern: /^WorksOfArt$/
  })
  afterAll (meta) {
    let result = meta.method.result
    console.timeEnd(`<<<<<< ${meta.method.name}`) // End time measurement
  }
  @afterMethod({
    methodNamePattern: /^create$/,
    classNamePattern: /^WorksOfArt$/
  })
  afterCreate (meta) {
    // let result = meta.method.result
    let req = meta.method.args[0].body
    console.log('request: ', req)
    // console.log(`Retrieving ${result.isbn} - ${result.name} has been succeed`);
  }
}
