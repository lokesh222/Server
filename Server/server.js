const express = require("express")
const cors = require("cors")
const routerUser = require("./router/user")


const app = express()
app.use(express.json())
app.use(cors("*"))
app.use("/Users", routerUser)


app.listen(4000, "0.0.0.0", () => {
  console.log("Server started at port 4000")
})
