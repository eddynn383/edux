module.exports = {
    siteUrl: process.env.APP_URL,
    generateRobotsTxt: true,
    exclude: ['/404'], // Exclude specific pages from the sitemap
    robotsTxtOptions: {
        additionalSitemaps: [
            `${process.env.APP_URL}/sitemap.xml`,
        ],
    },
}