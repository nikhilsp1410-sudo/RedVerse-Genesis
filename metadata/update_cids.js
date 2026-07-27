const fs = require('fs');
const path = require('path');

const metadataDir = path.join('d:', 'RedVerse', 'metadata', 'nft');
const collectionPath = path.join('d:', 'RedVerse', 'metadata', 'collection.json');

const newCID = 'bafybeiagnoixk6uxcykyl2n3oppv2petvypwi4utpjc3qfg5udk7m4eaca';

// 1. Update NFT Metadata
for (let i = 1; i <= 20; i++) {
    const filename = `${i.toString().padStart(3, '0')}.json`;
    const filepath = path.join(metadataDir, filename);
    
    if (fs.existsSync(filepath)) {
        const content = fs.readFileSync(filepath, 'utf8');
        const json = JSON.parse(content);
        
        json.image = `ipfs://${newCID}/${i.toString().padStart(3, '0')}.png`;
        
        fs.writeFileSync(filepath, JSON.stringify(json, null, 2), 'utf8');
        console.log(`Updated ${filename}`);
    } else {
        console.error(`File ${filename} not found`);
    }
}

// 2. Update collection.json
if (fs.existsSync(collectionPath)) {
    const collContent = fs.readFileSync(collectionPath, 'utf8');
    const collJson = JSON.parse(collContent);
    
    if (collJson.image) collJson.image = collJson.image.replace('QmFinalProductionImageCID11111111111', newCID);
    if (collJson.banner_image) collJson.banner_image = collJson.banner_image.replace('QmFinalProductionImageCID11111111111', newCID);
    if (collJson.featured_image) collJson.featured_image = collJson.featured_image.replace('QmFinalProductionImageCID11111111111', newCID);
    
    fs.writeFileSync(collectionPath, JSON.stringify(collJson, null, 2), 'utf8');
    console.log(`Updated collection.json`);
} else {
    console.error(`File collection.json not found`);
}

// 3. Validate
let hasError = false;
const files = fs.readdirSync(metadataDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
    try {
        const content = fs.readFileSync(path.join(metadataDir, file), 'utf8');
        const json = JSON.parse(content);
        
        if (!json.name) throw new Error("Missing 'name'");
        if (!json.description) throw new Error("Missing 'description'");
        if (!json.image) throw new Error("Missing 'image'");
        if (!json.attributes || !Array.isArray(json.attributes)) throw new Error("Missing 'attributes' array");
        if (json.image.includes('QmFinalProductionImageCID11111111111')) throw new Error("Contains placeholder CID");
        if (!json.image.includes(newCID)) throw new Error("Does not contain new CID");
        
        const num = parseInt(file.replace('.json', ''), 10);
        if (json.image !== `ipfs://${newCID}/${num.toString().padStart(3, '0')}.png`) {
            throw new Error(`Incorrect image URI: ${json.image}`);
        }
        
    } catch (e) {
        console.error(`Error in ${file}: ${e.message}`);
        hasError = true;
    }
});

const collValidateContent = fs.readFileSync(collectionPath, 'utf8');
try {
    const coll = JSON.parse(collValidateContent);
    if (!coll.name || !coll.description || !coll.image) throw new Error("Invalid collection.json");
    if (coll.image.includes('QmFinalProductionImageCID11111111111')) throw new Error("Placeholder CID in collection image");
    if (coll.banner_image && coll.banner_image.includes('QmFinalProductionImageCID11111111111')) throw new Error("Placeholder CID in collection banner_image");
    console.log("collection.json is valid.");
} catch(e) {
    console.error(`Error in collection.json: ${e.message}`);
    hasError = true;
}

if (!hasError) {
    console.log("All metadata files are valid ERC721 format and CIDs are updated correctly!");
} else {
    process.exit(1);
}
