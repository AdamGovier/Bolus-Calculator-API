// Packages
import express from 'express';
import bcrypt from 'bcrypt';

// Controllers
import statusController from './Controllers/status.controller.js';
import loginController from './Controllers/login.controller.js';
import getTokenController from './Controllers/getToken.controller.js';
import logoutController from './Controllers/logout.controller.js';

// Management Controllers
import {getHotshots as getHotshotController, acceptHotshot as acceptHotshotController, rejectHotshot as rejectHotshotController} from "./Controllers/hotshotManager.controller.js";

// Middleware
import requireAuth from './middleware/requireAuth.js';

const router = express.Router();

// General Routes
router.get('/status', requireAuth, statusController);
router.post('/login', loginController);
router.post('/refreshToken', getTokenController);
router.delete('/logout', requireAuth, logoutController);

// Management Routes
router.get('/mgmt/hotshot/get/:status', requireAuth, getHotshotController);
router.get('/mgmt/hotshot/get/:status/:keyword', requireAuth, getHotshotController);
router.post('/mgmt/hotshot/approve', requireAuth, acceptHotshotController);
router.post('/mgmt/hotshot/reject', requireAuth, rejectHotshotController);


export default router;