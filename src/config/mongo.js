const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(e => {
        const msgError = 'ERRO: não foi possível conectar ao mongodb!'

        console.log('\x1b[41m%s\x1b[37m]]',msgError,'\x1b[0m')
    })