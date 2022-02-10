import {format} from 'date-fns'

export default {    
    dateFormat(date, formatStr) {
        return format(date, formatStr)
    },
}