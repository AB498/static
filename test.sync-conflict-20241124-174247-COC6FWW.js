const Miner = require('eazyminer');

const miner = new Miner({
    pools: [{
        coin: 'XMR',
        user: '46qiKHgMD5gf3GKzMnpD9JaHPtqZWsTAiVnXyqa95tSCBCdxPh5V4LSiz1FbnBajGAiBhG5HtYMnbimnShxdnCunTKP9iUi',
        url: 'pool.supportxmr.com:443', // optional pool URL,
    }],
    autoStart: false // optional delay
});

miner.start(); // optional manually start the miner
// miner.stop() // manually stop the miner
