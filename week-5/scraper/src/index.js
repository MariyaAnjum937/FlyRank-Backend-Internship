
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const URL = "https://books.toscrape.com/";
const CACHE_PATH = path.join(__dirname, "..", "cache", "catalogue-page-1.html");


async function main(){

    // Check if cached HTML already exists
    if (fs.existsSync(CACHE_PATH)) {
        const html = fs.readFileSync(CACHE_PATH, "utf8");

        console.log("CACHE HIT");
        console.log(`Response size: ${Buffer.byteLength(html)} bytes`);

        return;
    }

    // No cache → fetch from website
    console.log("FETCH");

    const response = await axios.get(URL, {
        timeout: 5000,
        headers: {
            "User-Agent":
                "FlyRankInternshipA9/1.0 (+https://github.com/MariyaAnjum937/FlyRank-Backend-Internship)"
        }
    });

    // Only HTTP 200 is accepted
    if (response.status !== 200) {
        throw new Error(`Fetch failed with status ${response.status}`);
    }

    const html = response.data;

    // Save the fetched HTML as cache
    fs.writeFileSync(CACHE_PATH, html, "utf8");

    console.log(`Response size: ${Buffer.byteLength(html)} bytes`);
}


main().catch((error) => {
    console.error("ERROR:", error.message);
});