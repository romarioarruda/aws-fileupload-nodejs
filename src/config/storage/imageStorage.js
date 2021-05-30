const multer = require('multer')
const crypto = require('crypto')
const path = require('path')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

const uploadPath = path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads')

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath)
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err)

                file.key = `${hash.toString('hex')}-${file.originalname}`

                cb(null, file.key)
            })
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'teste-upload',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err)

                const fileName = `${hash.toString('hex')}-${file.originalname}`

                cb(null, fileName)
            })
        }
    })
}

module.exports = { storageTypes }