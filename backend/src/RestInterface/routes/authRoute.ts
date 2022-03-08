import express from 'express'
import jwt, { verify } from 'jsonwebtoken';
import { DB } from '../../data/db';
import { User } from '../../models/user.model';
import auth from '../auth/verifyToken';
const router = express.Router();
// router.use(auth)

// Routes
router.post('/register', async (req, res) => {
    const { email, password } = req.body
    let user = new User(email, password)

    if (doesUserExist(user)) {
        res.status(500).send('User already exists')
        return
    }
    const token = jwt.sign({ _id: user.email }, process.env.TOKEN_SECRET ?? 'xyz', { expiresIn: '24h' });
    let expiryDate = new Date()
    expiryDate.setHours(expiryDate.getHours() + 24)
    DB.users.push(user)
    res.json({ data: user, expiryDate, token })
});

router.post('/login', async (req, res) => {
    const user: User = { email: req.body.email, password: req.body.password }
    if (!validateUser(user)) {
        res.status(500).send('Username Or Password is incorrect')
        return
    }
    const token = jwt.sign({ _id: user.email }, process.env.TOKEN_SECRET ?? 'xyz', { expiresIn: '24h' });
    let expiryDate = new Date()
    expiryDate.setHours(expiryDate.getHours() + 24)
    res.json({ data: user, expiryDate, token })
});

const validateUser = (user: User) => {
    for (const u of DB.users) {
        if (user.email === u.email && user.password === u.password)
            return true
    }
    return false
}

const doesUserExist = (user: User) => {
    return DB.users.filter(u => u.email === user.email).length === 1
}

export { router }