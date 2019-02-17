import moment from 'moment'

export const getDate = ts => moment(ts * 1000).format("dddd, MMMM Do YYYY, h:mm a")

export const getDay = ts => moment(ts * 1000).format("dddd, MMMM Do YYYY")

export const getHour = ts => moment(ts * 1000).format("h:mm a")

export const length = (s, e) => `${(e - s) / 60} mins`

export const dateStrToSec = date => moment(date).unix()

// will return the unix secs of beginning of date
// export const flattenDateSecs = ts => moment(moment(ts * 1000).format('l')).unix()
