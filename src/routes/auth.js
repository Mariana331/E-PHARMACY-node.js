import { Router } from 'express';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post('/register', validateBody, registerUserController);
router.post('/login', validateBody, loginUserController);
router.get('/logout', validateBody, logoutUserController);
router.post('/refresh', refreshUserSessionController);
export default Router;
