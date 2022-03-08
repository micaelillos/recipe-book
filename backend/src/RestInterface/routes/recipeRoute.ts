import express from 'express'
import jwt, { verify } from 'jsonwebtoken';
import { DB } from '../../data/db';
import auth from '../auth/verifyToken';
const router = express.Router();
router.use(auth)

// Routes
router.get('/recipes', (req, res) => {
    res.json({ data: DB.recipes })
})

router.post('/recipes', async (req, res) => {
    DB.recipes = req.body.recipes
    res.json({ data: DB.recipes })
})


export { router }