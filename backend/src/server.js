import express from 'express'
import cors from 'cors'
import { corsOptions } from './config/cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from './config/mongodb'
import { env } from './config/environment'
import { APIs_V1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()
  app.use(cors(corsOptions))
  app.use(express.json())
  app.use('/v1', APIs_V1)

  app.use(errorHandlingMiddleware)

  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`3. Production: Hi ${env.AUTHOR}, Backend Server is running successfully at ${process.env.PORT}/`)
    })
  } else {
    app.listen(env.APP_PORT, env.APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(`3. Hi, ${env.AUTHOR}, Backend Server is running successfully at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
    })
  }
  exitHook(() => {
    console.log('4. Server is shutting down...')
    CLOSE_DB()
    console.log('5. Disconnecting from MongoDB Cloud Atlas...')
  })
}


console.log('1. Connecting to MongoDB Cloud Atlas!')
CONNECT_DB()
  .then(() => console.log('2. Connected to MongoDB Cloud Atlas!'))
  .then(() => START_SERVER())
  .catch(error =>  {
    console.error(error);
    process.exit(0);
  })

