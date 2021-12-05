const TIME_TRACKER_BASE_URL = process.env.TIME_TRACKER_URL ? process.env.TIME_TRACKER_URL : 'http://localhost:8080';

export async function getTimeRecords(query = '') {
    const q = query.trim() == '' ? '' : '?' + query.trim();
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'Accept': 'application/json',
        },
    };

    var results = [];
    await fetch(TIME_TRACKER_BASE_URL + '/records' + q, requestOptions)
        .then(response => results = response.json())
        .catch(error => console.log('error', error));
    return results;
}

export async function addTimeRecord(record) {
    const res = await fetch(TIME_TRACKER_BASE_URL + '/records', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
        },
        credentials: 'omit',
        body: record
    });
    return res.ok;
}


