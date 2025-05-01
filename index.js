import express from 'express'
import sequelize from './config/db.js'
import homeRouter from './routes/home.routes.js'
import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'

const app = express()
app.use(express.json())
app.use('/ui', homeRouter)
app.use('/user', userRouter)
app.use('/admin', adminRouter)

async function main() {
  await sequelize.sync({
    force: true
  })

  app.listen(4040, () => {

    console.log('application running!')
  })
}

main()

