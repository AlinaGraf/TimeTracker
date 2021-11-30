const TIME_TRACKER_BASE_URL = 'http://localhost:8080';

export async function getTimeRecords(query = '') {
    const q = query.trim() == '' ? '' : '?' + query.trim();
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };
    var res = [];
    fetch(TIME_TRACKER_BASE_URL + '/records' + q, requestOptions)
        .then(response => response.text())
        .then(result => res = result.json())
        .catch(error => console.log('error', error));

    return res;
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


