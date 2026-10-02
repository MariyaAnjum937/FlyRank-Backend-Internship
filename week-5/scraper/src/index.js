const axios = require("axios");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const URL = "https://books.toscrape.com/";
const CACHE_PATH = path.join(
    __dirname,
    "..",
    "cache",
    "catalogue-page-1.html"
);

async function main() {

    let html;

    // Check if cached HTML already exists
    if (fs.existsSync(CACHE_PATH)) {
        html = fs.readFileSync(CACHE_PATH, "utf8");

        console.log("CACHE HIT");
        console.log(`Response size: ${Buffer.byteLength(html)} bytes`);
    } 
    
    // No cache → fetch from website
    else {
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

        html = response.data;

        // Save the fetched HTML as cache
        fs.writeFileSync(CACHE_PATH, html, "utf8");

        console.log(`Response size: ${Buffer.byteLength(html)} bytes`);
    }

    // Parse HTML using Cheerio
    const $ = cheerio.load(html);

    // Find all book links
    const bookLinks = [];

    $("article.product_pod h3 a").each((index, element) => {
        const href = $(element).attr("href");
        bookLinks.push(href);
    });

    console.log(`Discovered on page 1: ${bookLinks.length}`);
}

main().catch((error) => {
    console.error("ERROR:", error.message);
});