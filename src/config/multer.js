const path = require('path')
const { storageTypes } = require('./storage/imageStorage')

const uploadPath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

module.exports = {
    dest: uploadPath,
    storage: storageTypes[process.env.STORAGE_TYPE],
    limits: {
        fileSize: 2 * 1024 * 1024 // tamanho em bytes = 2 MB
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/png",
            "image/gif"
        ]

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(`Imagem não permitida: ${file.mimetype}`)
        }
    }
}