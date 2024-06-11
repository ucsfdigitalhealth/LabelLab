async function sendData() {
    console.log("sending data");
    return fetch('http://localhost:3000/new', {
        method: 'POST',
        body: JSON.stringify({
            videoID: 35,
            htData: {hashtag1: 6, hashtag2: 7, hashtag3: 9, newhashtag4: 5}
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: "no-referrer", 
    }).then((data) => {
    console.log('successfully added ' + JSON.stringify(data))
    })
}