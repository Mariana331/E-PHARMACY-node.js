import { Router } from 'express';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  userInfoController,
} from '../controllers/auth.js';
import { loginSchema, registerSchema } from '../validation/auth.js';
import authenticate from '../middlewares/authenticate.js';

import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post('/register', validateBody(registerSchema), registerUserController);
router.post('/login', validateBody(loginSchema), loginUserController);
router.post('/refresh', refreshUserSessionController);

router.use(authenticate);
router.post('/logout', logoutUserController);
router.get('/user-info', userInfoController);

export default router;
