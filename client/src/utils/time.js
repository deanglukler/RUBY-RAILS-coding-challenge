import moment from 'moment';

export const getDate = ts =>
  moment(ts * 1000).format('MMMM Do YYYY, h:mm a');

export const getDay = ts => moment(ts * 1000).format('dddd, MMMM Do YYYY');

export const getDayMin = ts => moment(ts * 1000).format('dddd, Do');

export const getHour = ts => moment(ts * 1000).format('h:mm a');

export const length = (s, e) =>
  `${Math.round(parseFloat((e - s) / 3600) * 10) / 10} hrs`;

export const dateStrToSec = date => moment(date).unix();

export const parseHourFloatBySecs = ts =>
  Math.floor(parseFloat((ts / 3600) * 10)) / 10;
