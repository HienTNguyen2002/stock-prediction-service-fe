function fetchUrl(url, method = 'GET'){
    let result = {}
    try{
        result = fetch(url,
        {
            method: method
        })
        .then(resp => {
            console.log('fetched')
            return resp.json()
        })
    } catch(exception){
        console.log(exception)
        result = {
            message: exception.message
        }
    }
    return result
}

export {fetchUrl}