var color = require('bash-color');

console.log(
    'This is ' + 
    color.wrap('placeholder', color.colors.RED, color.styles.bold) +
    ' only!'
);
console.log(
    'functional releases >= ' + 
    color.wrap('0.0.2', color.colors.GREEN, color.styles.bold)
);
console.log('');
process.exit(1);
