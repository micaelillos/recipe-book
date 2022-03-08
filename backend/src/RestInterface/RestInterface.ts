import express from 'express'
import cors from 'cors'
import {router as authRouter} from './routes/authRoute'
import {router as recipeRouter} from './routes/recipeRoute'
import { DB } from '../data/db';

export class RestInterface {
  app: express.Application = express();
  constructor(private port = 3000) {
    this.app.use(express.json())
    this.app.use(cors())

    this.initRoutes()
  }

  initRoutes = () => {
    // Routes
    this.app.use('/auth',authRouter)
    this.app.use('/', recipeRouter)

    this.app.listen(this.port, () => {
      console.log(`RestInterface listening on ${this.port}`);
    });

  }

}
// Create a new express application instance

// // Import routes
// const postsRoute = require('./routes/posts');
// const authRoute = require('./routes/auth');

// app.use('/posts', postsRoute);
// app.use('/auth', authRoute);



// // Connect to DB
// mongoose.connect(
//   process.env.DB_URL ?? '',
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log('connected to db');
//   }
// );

