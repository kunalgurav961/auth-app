import express from 'express'
import { registerController, loginController, testController } from '../controllers/auth.controllers.js'
const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/test', testController)

export default router