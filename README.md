# ReeferBudz™ Website

The public website for ReeferBudz™, a 21-and-over social community for
cannabis-friendly adults to make friends, discover local connections, and find
their smoke circle.

## Public pages

- Home
- How It Works
- Safety Center
- Our Story
- Community Guidelines
- Contact
- Privacy
- Terms
- Accessibility
- Early Access

## Product boundaries

ReeferBudz focuses on friendship and community. It is not a dating service and
does not sell cannabis or arrange cannabis transactions. The website uses only
the founder-approved brand tokens, production SVG logo masters, and canonical
high-five mascot pair.

## Local development

Requires Node.js 22.13 or later.

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm test
```

The test command creates a production build and verifies every public route,
shared navigation, brand-standard constraints, the mobile menu, and the
early-access workflow.

## Data

Early-access submissions are stored in the site’s Cloudflare D1 database. The
form collects a first name, email address, optional location and interests, and
an explicit 21+ confirmation.
