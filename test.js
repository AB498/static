const CoinImp = require('coin-hive');
 
(async () => {
  // Create miner
  const miner = await CoinImp('a5f009879c378a1a5fbe1510f5a17dafac00af74e406b136140ec763f77b83fb'); // CoinImp's Site Key
 
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
