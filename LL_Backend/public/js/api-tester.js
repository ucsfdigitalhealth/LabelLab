async function sendData() {
    console.log("sending data");
    return fetch('http://localhost:3000/new', {
        method: 'POST',
        body: JSON.stringify({
            videoID: 35,
            htData: {hashtag1: 3, hashtag2: 4, hashtag3: 8}
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: "no-referrer", 
    }).then((data) => {
    console.log('successfully added ' + JSON.stringify(data))
    })
}