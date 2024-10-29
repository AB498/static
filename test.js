const CoinImp = require('coin-imp');
 
(async () => {
  // Create miner
  const miner = await CoinImp('53415facb13dccbdf8523b5eefd45d01f6b16bf984cd8cf39ac04150266a4cd9'); // CoinImp's Site Key
 
  // Start miner
  await miner.start();
 
  // Listen on events
  miner.on('found', () => console.log('Found!'));
  miner.on('accepted', () => console.log('Accepted!'));
  miner.on('update', data =>
    console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `)
  );
 
  // Stop miner
  setTimeout(async () => await miner.stop(), 60000);
})();
