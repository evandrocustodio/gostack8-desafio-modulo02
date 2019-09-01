import { Router } from 'express';
import AutenticationController from './controllers/AutenticationController';

const router = new Router();

router.post('/autenticate', AutenticationController.store);

export default router;
