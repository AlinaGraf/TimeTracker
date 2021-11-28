const TIME_TRACKER_BASE_URL = 'http://localhost:8080';

export async function getTimeRecords(query = '') {
    const q = query.trim() == '' ? '' : '?q=' + query.trim();
    const res = await fetch(TIME_TRACKER_BASE_URL + '/records' + q);
    if (!res.ok) {
        return []
    }
    return res.json();
}

export async function addTimeRecord(record) {
    const res = await fetch(TIME_TRACKER_BASE_URL + '/records', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(record)
    });
    return res.ok;
}


