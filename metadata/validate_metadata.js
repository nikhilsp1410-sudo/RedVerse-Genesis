const fs = require('fs');
const path = require('path');

const metadataDir = path.join('d:', 'RedVerse', 'metadata', 'nft');
const files = fs.readdirSync(metadataDir).filter(f => f.endsWith('.json'));

console.log(`Found ${files.length} JSON files. Validating ERC721 format...`);

let hasError = false;
files.forEach(file => {
    try {
        const content = fs.readFileSync(path.join(metadataDir, file), 'utf8');
        const json = JSON.parse(content);
        
        if (!json.name) throw new Error("Missing 'name'");
        if (!json.description) throw new Error("Missing 'description'");
        if (!json.image) throw new Error("Missing 'image'");
        if (!json.attributes || !Array.isArray(json.attributes)) throw new Error("Missing 'attributes' array");
        
    } catch (e) {
        console.error(`Error in ${file}: ${e.message}`);
        hasError = true;
    }
});

const collectionContent = fs.readFileSync(path.join('d:', 'RedVerse', 'metadata', 'collection.json'), 'utf8');
try {
    const coll = JSON.parse(collectionContent);
    if (!coll.name || !coll.description || !coll.image) throw new Error("Invalid collection.json");
    console.log("collection.json is valid.");
} catch(e) {
    console.error(`Error in collection.json: ${e.message}`);
    hasError = true;
}

if (!hasError) {
    console.log("All metadata files are valid ERC721 format!");
} else {
    process.exit(1);
}
