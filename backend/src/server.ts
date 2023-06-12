const express  = require('express') 

const app = express()
const PORT  = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(PORT, () => {
    try {
        console.log(`Connected to PORT: ${PORT}`)
    } catch (error) {
        console.log(`Unable to connect to port:${PORT} with an ${error}`)
    }
})