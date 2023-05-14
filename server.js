import app from "./src/app.js"
import config from "./src/config/config.js"
import connectToDB from "./src/database.js"
import User from "./src/models/user.model.js"

connectToDB()


app.get("/", async (req, res) => {
  const user = await User.find()
  res.json(user)
})

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body
    console.log(req.body)
    // const user = await User.create({name })
    // console.log(user)
    // res.send('hi')
    
  } catch (error) {
    console.log(error);
  }
})
app.listen(config.PORT, () => {
  console.log(`App listen on http://localhost:${config.PORT}`)
})
