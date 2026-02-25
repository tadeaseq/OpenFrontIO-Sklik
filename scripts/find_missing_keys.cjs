const fs = require('fs');

const en = JSON.parse(fs.readFileSync('resources/lang/en.json', 'utf8'));
const cs = JSON.parse(fs.readFileSync('resources/lang/cs.json', 'utf8'));

function findMissing(source, target, path = '') {
    let missing = [];
    for (const key in source) {
        const fullPath = path ? `${path}.${key}` : key;
        if (!(key in target)) {
            missing.push(fullPath);
        } else if (typeof source[key] === 'object' && source[key] !== null) {
            if (typeof target[key] === 'object' && target[key] !== null) {
                missing = missing.concat(findMissing(source[key], target[key], fullPath));
            } else {
                // Type mismatch
                missing.push(`${fullPath} (type mismatch: expected object, got ${typeof target[key]})`);
            }
        }
    }
    return missing;
}

const missingKeys = findMissing(en, cs);

if (missingKeys.length > 0) {
    console.log('Missing or mismatched keys in cs.json:');
    missingKeys.forEach(key => console.log(` - ${key}`));
} else {
    console.log('No missing keys found in cs.json.');
}
