const {FTP, FS} = require('./core')

try {
  const DIST = new FS()
  const JOB = new FTP()
  const list = DIST.scan('./dist/govhkdata')
  JOB.autoDeploy(list)
  console.log('~>Ran')
} catch (e) {
  console.error(e)
}
