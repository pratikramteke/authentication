import app from "./app.js"
import config from "./config/config.js"
import connectToDB from "./database.js"

connectToDB()

app.listen(config.PORT, () => {
  console.log(`App listen on http://localhost:${config.PORT}`)
})
