require('dotenv').config()

const express = require('express')
const multer = require('multer')
const path = require('path')
const multerConfig = require('./config/multer')
const mogoose = require('mongoose')
require('./config/mongo')

const ImageUpload = require('./models/imageUpload')


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
)

app.get('/', async (req, resp) => {
    const images = await ImageUpload.find()
        
    return resp.json(images)
})

app.delete('/delete/:id', async (req, resp) => {
    const image = await ImageUpload.findById(req.params.id)

    await image.remove()

    return resp.send('Imagem deletada com sucesso!!!')
})

app.post('/upload', multer(multerConfig).single('file'), async (req, resp) => {
    const { originalname: name, size, key, location: url = '' } = req.file

    const imagePost = await ImageUpload.create({
        name,
        size,
        key,
        url
    })
    resp.send(imagePost)
})


const port = 3000
app.listen(port, () => {
    console.log(`Escutando na porta ${port}`)
})