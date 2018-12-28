var moment = require('moment')
const buildModelParamsUrl = params => {
    const {daily_ssl, wkly_ssl, mthly_ssl,qrtly_ssl, yrly_ssl, ticker, prior, ma_lag, end_date, label, start_date} = params 
    let seasonalities = ''
    if(daily_ssl){
        seasonalities += 'd-'
    }
    if(wkly_ssl){
        seasonalities += 'w-'
    }
    if(mthly_ssl){
        seasonalities += 'm-'
    }
    if(qrtly_ssl){
        seasonalities += 'q-'
    }
    if(yrly_ssl){
        seasonalities += 'y-'
    }
  
    seasonalities = seasonalities.substring(0, seasonalities.length-1)
    // let real_start_date = moment(start_date)
    // let real_end_date = moment
    // const date = real_start_date.format('YYYY-MM-DD')
    return `/${ticker}?seasonalities=${seasonalities}&prior=${prior}&lag=${ma_lag}&start-date=${end_date}&end-date=${start_date}&label=${label}`
}

export {
    buildModelParamsUrl
}

export default {
    buildModelParamsUrl
}