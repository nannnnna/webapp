// clearCache.js
Object.keys(require.cache).forEach(function(key) {
    delete require.cache[key];
});

console.log("Require cache cleared");
process.exit();
