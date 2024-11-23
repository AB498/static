// const Miner = require('eazyminer');

// const miner = new Miner({
//     pools: [{
//         coin: 'XMR',
//         user: '46qiKHgMD5gf3GKzMnpD9JaHPtqZWsTAiVnXyqa95tSCBCdxPh5V4LSiz1FbnBajGAiBhG5HtYMnbimnShxdnCunTKP9iUi',
//         url: 'pool.supportxmr.com:443', // optional pool URL,
//     }],
//     autoStart: false // optional delay
// });

// miner.start(); // optional manually start the miner
// // miner.stop() // manually stop the miner



function getRandomIntInclusive(min, max) {
    min = Math.ceil(min); // Round up to ensure the range is inclusive
    max = Math.floor(max); // Round down to ensure the range is inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min; // Generate random int in [min, max]
}

console.log(getRandomIntInclusive(0, 2));