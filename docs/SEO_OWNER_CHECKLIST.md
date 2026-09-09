# Portfolio SEO owner checklist

Production origin: `https://portfolio.elixirflow.in`

## Search-engine setup

- [ ] Verify the production origin in Google Search Console with an owner-controlled method.
- [ ] Submit `https://portfolio.elixirflow.in/sitemap.xml` in Google Search Console.
- [ ] Use URL Inspection on the homepage and request indexing only after the intended production revision is live.
- [ ] Add and verify the site in Bing Webmaster Tools, then submit the same sitemap.
- [ ] Confirm the production CDN or firewall returns the same public HTML, `robots.txt`, and `sitemap.xml` that the application generates.

Indexing is controlled by each search engine. These steps do not guarantee immediate indexing, rankings, AI-search inclusion, or citations.

## Crawler access and AI systems

The production `robots.txt` allows public crawling with the general `User-agent: *` rule. That includes search-discovery crawlers unless an external CDN or firewall blocks them.

- OAI-SearchBot is used for OpenAI search discovery.
- GPTBot is associated with model-training access and is a separate owner preference.
- This repository does not set a separate GPTBot rule, preserving the site's previous general crawler preference.
- If the owner changes that preference later, update the explicit crawler rule and verify the production response. CDN or firewall bot controls must be reviewed separately because repository files cannot configure them.

No `llms.txt` is included. Structured data and crawler access can improve machine readability, but neither guarantees inclusion or citation.

## Measurement and evidence

- [ ] Record a baseline date before evaluating changes.
- [ ] Track impressions, clicks, countries, indexed pages, and genuine enquiries without inventing missing data.
- [ ] Review results after enough traffic has accumulated to make comparison meaningful.
- [ ] Add genuine project evidence, approved repositories, demos, or case studies as they become publicly supportable.
