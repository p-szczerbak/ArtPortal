import {beforeMethod, afterResolve, afterReject} from 'aspect.js'

class LoggerAspect {
  @beforeMethod({
    methodNamePattern: /.*/,
    classNamePattern: /WorksOfArt/
  })
  beforeLogger (meta, ...args) {
    console.log(`Invoked ${meta.name} with arguments: ${args.join(', ')}`)
  }
  @afterResolve({
    methodNamePattern: /.*/,
    classNamePattern: /WorksOfArt/
  })
  afterResolveLogger (meta) {
    console.log(`The invocation of ${meta.name}`)
  }
  @afterReject({
    methodNamePattern: /.*/,
    classNamePattern: /WorksOfArt/
  })
  afterRejectLogger (meta) {
    console.log(`Error during the invocation of ${meta.name}`)
  }
}
