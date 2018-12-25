var moment = require('moment')
const buildModelParamsUrl = params => {
    const {daily_ssl, wkly_ssl, mthly_ssl,qrtly_ssl, yrly_ssl, ticker, prior, ma_lag, training_years, label, start_date} = params 
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
    console.log(start_date, moment(start_date).format('DD-MM-YYYY'))
    const date = moment(start_date).format('YYYY-MM-DD')
    seasonalities = seasonalities.substring(0, seasonalities.length-1)
    return `/${ticker}?seasonalities=${seasonalities}&prior=${prior}&lag=${ma_lag}&start-date=${date}&label=${label}&training_years=${training_years}`
}

export {
    buildModelParamsUrl
}

export default {
    buildModelParamsUrl
}