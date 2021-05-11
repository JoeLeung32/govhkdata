const Ffp = require('ftp')
const fs = require('fs')
const Env = require('./env.json')

const projectDistStructure = {
  keep: [
    'cgi-bin',
    '.htaccess',
  ],
}

class FTP {
  #ftp = new Ffp()
  #list = []

  async rmdir(node) {
    // return new Promise(resolve => {
    this.#ftp.rmdir(node.name, true, () => console.log(`Remove folder: ${node.name}`))
    // })
  }

  async delete(node) {
    // return new Promise(resolve => {
    this.#ftp.delete(node.name, () => console.log(`Remove file: ${node.name}`))
    // })
  }

  async taskRemoveAll() {
    return new Promise(resolve => {
      console.log('FTP Remover')
      this.#list.forEach(async (node) => {
        if (!projectDistStructure.keep.includes(node.name)) {
          switch (node.type) {
            case 'd': {
              await this.rmdir(node)
              break
            }
            default: {
              await this.delete(node)
              break
            }
          }
        }
      })
      resolve()
    })
  }

  taskUpload(list) {
    return new Promise((resolve, reject) => {
      console.log('FTP Uploader')
      if (!list || !list.length) reject('list is empty')
      list.forEach((data) => {
        const {type, localPath, remotePath} = data
        switch (type) {
          case 'd': {
            this.#ftp.mkdir(remotePath, true, (err) => {
              if (err) reject(err)
            })
            break
          }
          default: {
            this.#ftp.put(localPath, remotePath, (err) => {
              if (err) reject(err)
            })
            break
          }
        }
        console.log('FTP Upload: ', type, localPath, remotePath)
      })
      resolve()
    })
  }

  autoDeploy(fileList) {
    console.log('~>list', fileList)
    this.#ftp.connect({
      'host': Env.host,
      'user': Env.user,
      'password': Env.password
    })
    this.#ftp.on('ready', () => {
      this.#ftp.list(async (err, remoteList) => {
        if (err) throw err
        this.#list = remoteList
        await this.taskRemoveAll()
        // this.taskRemoveAll().then(() => {
        //   this.taskUpload(localList).then(() => {
        //     console.log('FTP END')
        //     this.#ftp.end()
        //   })
        // })
        console.log('FTP END')
        this.#ftp.end()
      })
    })
  }
}

class FS {
  #list = []

  scan(dirname) {
    if (!fs.existsSync(dirname)) {
      throw `${dirname} not exist`
    }
    fs.readdirSync(dirname).forEach(filename => {
      const address = `${dirname}/`
      const fileLocalPath = `${address}${filename}`
      const fileRemotePath = fileLocalPath.replace(address, '')
      const meta = {
        type: null,
        name: filename,
        localPath: fileLocalPath,
        remotePath: fileRemotePath,
      }
      switch (true) {
        case fs.lstatSync(fileLocalPath).isDirectory(): {
          meta.type = 'd'
          this.scan(fileLocalPath)
          break
        }
        case fs.lstatSync(fileLocalPath).isFile(): {
          meta.type = '-'
          break
        }
      }
      this.#list.push(meta)
    })
    return this.#list
  }
}

module.exports = {
  FTP,
  FS
}
