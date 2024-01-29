
// const path = require('path');
// require('ts-node').register();
// require(path.resolve(__dirname, './findPrimeNumber.worker.js'));
const { parentPort, workerData } = require('worker_threads')
// const isPrime = require('./isPrime.ts')

function isPrime(n) {
    // Corner case 
    if (n <= 1)
        return false;

    // Check from 2 to n-1 
    for (let i = 2; i < n; i++)
        if (n % i == 0)
            return false;

    return true;
}

function findPrimeNumbers(start, range) {
    const primes = [];
    const end = start + range;
    for (let i = start; i < end; i++) {

        if (isPrime(i)) {
            primes.push(i);
        }

    }
    parentPort.postMessage(primes);
}

findPrimeNumbers(workerData.start, workerData.range);