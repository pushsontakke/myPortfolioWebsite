import { readFileSync } from "node:fs";

const productionOrigin = "https://portfolio.elixirflow.in";
const outputDirectory = ".next/server/app";

const homeHtml = readFileSync(`${outputDirectory}/index.html`, "utf8");
const notFoundHtml = readFileSync(`${outputDirectory}/_not-found.html`, "utf8");
const robotsText = readFileSync(`${outputDirectory}/robots.txt.body`, "utf8");
const sitemapXml = readFileSync(`${outputDirectory}/sitemap.xml.body`, "utf8");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function matches(source, expression) {
  return [...source.matchAll(expression)];
}

const homeTitles = matches(homeHtml, /<title>([^<]+)<\/title>/g);
const homeCanonicals = matches(
  homeHtml,
  /<link rel="canonical" href="([^"]+)"\/>/g,
);

assert(homeTitles.length === 1, "Homepage must contain exactly one title.");
assert(
  homeCanonicals.length === 1,
  "Homepage must contain exactly one canonical URL.",
);
assert(
  homeCanonicals[0][1] === productionOrigin,
  `Unexpected canonical URL: ${homeCanonicals[0][1]}`,
);
assert(
  !/<meta name="robots" content="[^"]*noindex/i.test(homeHtml),
  "Production homepage must not contain noindex.",
);

const notFoundTitles = matches(notFoundHtml, /<title>([^<]+)<\/title>/g);
const notFoundCanonicals = matches(
  notFoundHtml,
  /<link rel="canonical" href="([^"]+)"\/>/g,
);

assert(notFoundTitles.length === 1, "Not-found output must contain one title.");
assert(
  notFoundCanonicals.length === 0,
  "Not-found output must not inherit the homepage canonical.",
);
assert(
  /<meta name="robots" content="noindex"\/>/.test(notFoundHtml),
  "Not-found output must contain noindex.",
);

const sitemapUrls = matches(sitemapXml, /<loc>([^<]+)<\/loc>/g).map(
  (match) => match[1],
);

assert(sitemapUrls.length === 1, "Sitemap must contain only the homepage.");
assert(
  sitemapUrls[0] === `${productionOrigin}/`,
  `Unexpected sitemap URL: ${sitemapUrls[0]}`,
);
assert(
  new URL(sitemapUrls[0]).hash === "",
  "Sitemap URLs must not contain fragments.",
);

assert(/User-Agent: \*\nAllow: \//.test(robotsText), "Robots must allow public crawling.");
assert(
  robotsText.includes(`Sitemap: ${productionOrigin}/sitemap.xml`),
  "Robots must reference the canonical sitemap.",
);

const jsonLdBlocks = matches(
  homeHtml,
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
);

assert(jsonLdBlocks.length === 1, "Homepage must contain one JSON-LD block.");
const jsonLd = JSON.parse(jsonLdBlocks[0][1]);
const graphTypes = jsonLd["@graph"].map((entry) => entry["@type"]);
assert(
  graphTypes.join(",") === "ProfilePage,WebSite",
  `Unexpected JSON-LD graph: ${graphTypes.join(",")}`,
);
assert(
  jsonLd["@graph"].every((entry) => entry["@id"].startsWith(productionOrigin)),
  "Structured-data entity IDs must use the canonical origin.",
);

for (const output of [homeHtml, robotsText, sitemapXml]) {
  assert(
    !output.toLowerCase().includes("agentwrights.com"),
    "Generated SEO output references an unintended replacement domain.",
  );
}

console.log("SEO regression checks passed.");
