const {FS} = require('./core')

try {
    const MD = new FS()
    let list
    list = MD.setupMetaData(MD.scan('./src/mds'))
    MD.saveToJson('./src/mds/_meta/documents.json', list.documents)
    MD.saveToJson('./src/mds/_meta/categories.json', list.categories)
    MD.saveToJson('./src/mds/_meta/tags.json', list.tags)
} catch (e) {
    console.error(e)
}
