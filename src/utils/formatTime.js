import moment from 'moment';
import 'moment-duration-format';

const formatTime = (milliseconds, format = '') => {
  const duration = moment.duration(milliseconds);

  if (format) {
    return duration.format(format);
  }

  if (duration.days() > 0) {
    return duration.format('D h:mm');
  }
  if (duration.hours() > 0) {
    return duration.format('h:mm');
  }

  return duration.format('mm:ss');
};

export default formatTime;

export const getHours = milliseconds => {
  const duration = moment.duration(milliseconds);
  return duration.hours();
};

export const getMinutes = milliseconds => {
  const duration = moment.duration(milliseconds);
  return duration.minutes();
};