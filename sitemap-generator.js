const path = require("path");
const fs = require("fs");
const axios = require("axios");
const Sitemap = require("react-router-sitemap").default;

const hostname = "https://booking4u.in";

// Function to fetch dynamic venue names
async function fetchVenueRoutes() {
    try {
        const response = await axios.get("https://api.booking4u.in/api/box/get"); // Adjust API endpoint

        if (!Array.isArray(response.data)) {
            console.error("❌ API did not return an array. Check API response.");
            return [];
        }

        const venues = response.data;

        // Log the response for debugging

        // Generate formatted URLs
        return venues.map(venue => {
            const formattedName = venue.name.replace(/\s+/g, "-").toLowerCase();
            return `/box-details/${formattedName}`;
        });

    } catch (error) {
        console.error("❌ Error fetching venues:", error.message);
        return [];
    }
}

// Generate Sitemap
async function generateSitemap() {
    const staticRoutes = [
        "/", 
        "/venues", 
        "/contact", 
        "/my-bookings"
    ];

    const dynamicRoutes = await fetchVenueRoutes();

    console.log("🔄 Generating sitemap with routes:", [...staticRoutes, ...dynamicRoutes]);

    const sitemap = new Sitemap([...staticRoutes, ...dynamicRoutes])
        .build(hostname)
        .save(path.resolve(__dirname, "public", "sitemap.xml"));

    console.log("✅ Sitemap successfully generated at /public/sitemap.xml");
}

// Run the script
generateSitemap();
