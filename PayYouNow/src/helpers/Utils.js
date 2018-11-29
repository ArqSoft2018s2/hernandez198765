import moment from 'moment';

class Utils {
  validateDates = (startDate, endDate) => {
    if (!moment(startDate).isValid()) {
      throw new Error('Error: Invalid Date');
    }
    if (!moment(startDate).isValid()) {
      throw new Error('Error: Invalid Date');
    }
    if (moment(startDate).isAfter(endDate)) {
      throw new Error('Error: Invalid Dates startDate must be before endDate');
    }
  };
}

export default new Utils();
