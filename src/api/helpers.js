const buildModelParamsUrl = params => {
    const {daily_ssl, wkly_ssl, mthly_ssl,qrtly_ssl, yrly_ssl, ticker, prior, ma_lag, trainning_years} = params 
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
    return `/${ticker}?seasonalities=${seasonalities}&prior=${prior}&lag=${ma_lag}&start-date=2016-08-01`
}

export {
    buildModelParamsUrl
}

export default {
    buildModelParamsUrl
}