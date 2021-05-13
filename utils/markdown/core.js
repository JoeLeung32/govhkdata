const fs = require('fs')

class FS {
    #structure = {
        mdDocument: {
            title: '',
            date: '',
            category: [],
            tag: [],
            langCode: [],
            localPath: '',
            remotePath: '',
        },
        category: {
            title: '',
            urlEncode: '',
            link: [],
        },
        tag: {
            title: '',
            urlEncode: '',
            link: [],
        }
    }

    #md = {
        documents: [],
        categories: [],
        tags: [],
    }

    scan(dirname, remoteParentPath) {
        if (!fs.existsSync(dirname)) {
            throw `${dirname} not exist`
        }
        fs.readdirSync(dirname).forEach(filename => {
            if (['.DS_Store', '_meta'].includes(filename)) return
            const address = `${dirname}/`
            const fileLocalPath = `${address}${filename}`
            let fileRemotePath = fileLocalPath.replace(address, '')
            if (remoteParentPath) {
                fileRemotePath = [remoteParentPath, fileRemotePath].join('/')
            }
            const meta = {...this.#structure.mdDocument}
            meta.localPath = fileLocalPath
            meta.remotePath = fileRemotePath.replace(/(.en|.tc|.sc).md/i, '')
            if (fileRemotePath.match(/(.en|.tc|.sc).md/i)) {
                meta.langCode = [fileRemotePath.match(/(.en|.tc|.sc).md/i)[1].substr(1,2)]
            } else {
                meta.langCode = null
            }
            switch (true) {
                case fs.lstatSync(fileLocalPath).isDirectory(): {
                    this.scan(fileLocalPath, fileRemotePath)
                    break
                }
                case fs.lstatSync(fileLocalPath).isFile(): {
                    const existIndex = this.#md.documents.findIndex(md => md.remotePath === meta.remotePath);
                    console.log(existIndex)
                    if (existIndex < 0) {
                        this.#md.documents.push(meta)
                    } else {
                        this.#md.documents[existIndex].langCode = [
                            ...this.#md.documents[existIndex].langCode,
                            ...meta.langCode,
                        ]
                    }
                    break
                }
            }
        })
        return this.#md
    }

    setupMetaData(list) {
        list.documents.forEach((doc, idx) => {
            const {localPath} = doc
            const content = fs.readFileSync(localPath, 'utf8').split(/\r|\n|\r\n/)
            let metaStart = false
            content.forEach((line) => {
                if (line === '---') {
                    if (metaStart) {
                        metaStart = false
                        return
                    }
                    metaStart = true
                    return
                }
                if (metaStart) {
                    const [key, value] = line.split(':')
                    if (['title', 'date'].includes(key)) {
                        this.#md.documents[idx][key] = value.trim()
                        return
                    }
                    if (['category', 'tag'].includes(key)) {
                        this.#md.documents[idx][key] = value.split(',').map(s => s.trim())
                        if (key === 'category') {
                            doc.category.forEach((c) => {
                                const category = {...this.#structure.category}
                                category.title = c
                                category.urlEncode = encodeURIComponent(c)
                                category.link = [doc.remotePath]
                                if (!this.#md.categories.find(a => a.title === c)) {
                                    this.#md.categories.push(category)
                                } else {
                                    const catIndex = this.#md.categories.findIndex(a => a.title === c)
                                    this.#md.categories[catIndex].link.push(doc.remotePath)
                                }
                            })
                        }
                        if (key === 'tag') {
                            doc.tag.forEach((t) => {
                                const tag = {...this.#structure.tag}
                                tag.title = t
                                tag.urlEncode = encodeURIComponent(t)
                                tag.link = [doc.remotePath]
                                if (!this.#md.tags.find(a => a.title === t)) {
                                    this.#md.tags.push(tag)
                                } else {
                                    const tagIndex = this.#md.tags.findIndex(a => a.title === t)
                                    this.#md.tags[tagIndex].link.push(doc.remotePath)
                                }
                            })
                        }
                    }
                }
            })
        })
        return this.#md
    }

    saveToJson(path, data) {
        if (!data || !data.length) {
            return
        }
        fs.writeFileSync(path, JSON.stringify(data, null, 2))
    }

}

module.exports = {
    FS,
}
