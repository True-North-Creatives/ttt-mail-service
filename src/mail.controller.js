import httpStatus from 'http-status';
import logger from 'ttt-packages/lib/config/logger';
import mailService from './mail.service';

/**
 * For sending welcome mail, arguments needed {email in params}
 * {name in payload}
 * @param {Object} req
 * @param {Object} res
 */
export const sendWelcomeMail = async (req, res) => {
  try {
    await mailService({
      templateName: 'Welcome',
      from: 'don\'t reply <hi@timetotrain.fit>',
      to: req.params.email,
      subject: 'Its Time to Train 💪',
    }, req.body);
    logger.info(`Welcome mail sent to: ${req.params.email}`);
    return res.status(httpStatus.OK).send();
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`Error occurred while sending welcome mail to: ${req.params.email}, error: ${e}`);
  }
};

/**
 * For sendig send password reset mail,
 * argument needed {email in params}
 * {name and redirecturl in payload}
 * @param {*} req
 * @param {*} res
 */
export const sendPasswordResetMail = async (req, res) => {
  try {
    await mailService({
      templateName: 'password-reset',
      from: 'don\'t reply <hi@timetotrain.fit>',
      to: req.params.email,
      subject: 'Reset Password',
    }, req.body);
    logger.info(`Password reset mail sent to: ${req.params.email}`);
    return res.status(httpStatus.OK).send();
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`Error occurred while sending password mail to: ${req.params.email}, error: ${e}`);
  }
};

/**
 * For sending Confirmation mail,
 * argument needed {email in params}
 * {redirecturl in payload}
 * @param {Object} req
 * @param {Object} res
 */
export const sendConfirmationMail = async (req, res) => {
  try {
    await mailService({
      templateName: 'confirm-email',
      from: 'don\'t reply <hi@timetotrain.fit>',
      to: req.params.email,
      subject: 'Account activation',
    }, req.body);
    logger.info(`Confirmation mail sent to: ${req.params.email}`);
    return res.status(httpStatus.OK).send();
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`Error occurred while sending confirm mail to: ${req.params.email}, error: ${e}`);
  }
};
