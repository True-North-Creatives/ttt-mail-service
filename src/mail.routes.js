import express from 'express';
import { sendConfirmationMail, sendWelcomeMail, sendPasswordResetMail } from './mail.controller';

const router = express.Router();

// Welcome Route
router.post('/welcome/:email', sendWelcomeMail);

router.post('/reset/:email', sendPasswordResetMail);

router.post('/confirm/:email', sendConfirmationMail);

export default router;
