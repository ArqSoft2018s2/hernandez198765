import rollbarManager from '../manager/rollbarManager';

class LoggerController {
  loggerHandler = (type, data) => {
    if (type === 'ERROR') {
      rollbarManager.rollbarError(data);
    } else {
      rollbarManager.rollbarLog(data);
    }
  };
}

export default new LoggerController();
