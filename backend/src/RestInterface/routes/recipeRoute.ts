import express from 'express'
import jwt, { verify } from 'jsonwebtoken';
import { DB } from '../../data/db';
import auth from '../auth/verifyToken';
const router = express.Router();


// Routes
router.get('/', (req,res) => {
    res.send("API is alive")
})
router.get('/recipes', auth, (req, res) => {
    res.json({ data: DB.recipes })
})

router.post('/recipes', auth, async (req, res) => {
    DB.recipes = req.body.recipes
    res.json({ data: DB.recipes })
})


export { router }