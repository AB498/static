const os = require('os');

function getCPUUsage() {
    const cpus = os.cpus();
    const userTime = cpus.reduce((acc, cpu) => acc + cpu.times.user, 0);
    const niceTime = cpus.reduce((acc, cpu) => acc + cpu.times.nice, 0);
    const sysTime = cpus.reduce((acc, cpu) => acc + cpu.times.sys, 0);
    const idleTime = cpus.reduce((acc, cpu) => acc + cpu.times.idle, 0);
    const irqTime = cpus.reduce((acc, cpu) => acc + cpu.times.irq, 0);

    const total = userTime + niceTime + sysTime + idleTime + irqTime;
    const used = total - idleTime;
    return ((1 - idleTime / total) * 100).toFixed(2);
}

function getMemoryUsage() {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    return {
        free: (freeMemory / (1024 ** 3)).toFixed(2),  // in GB
        used: (usedMemory / (1024 ** 3)).toFixed(2),  // in GB
        total: (totalMemory / (1024 ** 3)).toFixed(2) // in GB
    };
}

console.log(`CPU Usage: ${getCPUUsage()}%`);

const memoryUsage = getMemoryUsage();
console.log(`Memory Usage: ${memoryUsage.used} GB used out of ${memoryUsage.total} GB total, ${memoryUsage.free} GB free`);
