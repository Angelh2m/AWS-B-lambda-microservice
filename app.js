
'use strict'
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.json({
        ok: true
    })
})

// app.listen(3000) // <-- comment this line out from your app

module.exports = app // export your app so aws-serverless-express can use it