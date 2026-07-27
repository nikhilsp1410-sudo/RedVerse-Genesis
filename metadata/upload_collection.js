const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../website/backend/.env') });

const pinataJWT = process.env.PINATA_JWT;

if (!pinataJWT) {
    console.error("PINATA_JWT not found in backend/.env!");
    process.exit(1);
}

async function uploadToPinata() {
    try {
        const formData = new FormData();
        const fileStream = fs.createReadStream(path.join(__dirname, 'collection.json'));
        formData.append('file', fileStream, {
            filepath: 'collection.json'
        });

        const metadata = JSON.stringify({
            name: 'RedVerse_Genesis_Collection_V2.json',
        });
        formData.append('pinataMetadata', metadata);

        const options = JSON.stringify({
            cidVersion: 0,
        });
        formData.append('pinataOptions', options);

        console.log("Uploading to Pinata...");
        
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${pinataJWT}`
            }
        });
        
        console.log("Upload successful!");
        console.log("NEW_CID:", res.data.IpfsHash);
    } catch (error) {
        console.error("Error uploading to Pinata:", error.response ? error.response.data : error.message);
    }
}

uploadToPinata();
