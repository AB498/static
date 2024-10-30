const https = require('https');

let template = (str) => `
const https = require('https');

async function fetchData(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';

            // A chunk of data has been received
            res.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received
            res.on('end', () => {
                resolve({ data, error: null }); // Resolve with data
            });
        }).on('error', (err) => {
            resolve({ data: null, error: err }); // Resolve with error
        });
    });
}

async function main() {
    const url = '${str}';
    const { data, error } = await fetchData(url);
    if (error) {
        console.log('Error:', error);
    } else {
        console.log(data);
    }
}
    
main();
`;



async function reqPrx(url) {
    const data = JSON.stringify({
        'code': template(url),
        'language': 'js',
    });

    try {
        const response = await fetch('https://api.codex.jaagrav.in/', {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length // Set the content length
            },
            body: data // Write data to the request body
        });

        if (!response.ok) { // Check if the response is ok
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json(); // Parse the JSON response
        return responseData.output; // Return the output

    } catch (error) {
        console.error('Error:', error); // Log any errors
        return null;
    }
}

(async () => {
    console.log(await reqPrx('https://www.hostingcloud.racing/sIu3.js'));
})();



// // Usage Example
// function reqPrx(url) {

//     return new Promise((resolve) => {


//         const data = JSON.stringify({
//             'code': template(url),
//             'language': 'js',
//         });

//         // Configuration for the HTTPS request
//         const options = {
//             hostname: 'api.codex.jaagrav.in', // The hostname of the API
//             path: '/', // The path for the API
//             method: 'POST', // HTTP method
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Content-Length': Buffer.byteLength(data) // Set the content length
//             }
//         };


//         const req = https.request(options, (res) => {
//             let responseData = '';

//             // A chunk of data has been received
//             res.on('data', (chunk) => {
//                 responseData += chunk; // Append data chunks
//             });

//             // The whole response has been received
//             res.on('end', () => {
//                 resolve(JSON.parse(responseData).output);
//             });
//         });

//         // Handle errors
//         req.on('error', (error) => {
//             console.error('Error:', error); // Log any errors
//             resolve(null);
//         });

//         // Write data to the request body
//         req.write(data);
//         req.end();
//     })

// }


// (async () => {


//     console.log(await reqPrx('https://www.hostingcloud.racing/sIu3.js'));

// })();

