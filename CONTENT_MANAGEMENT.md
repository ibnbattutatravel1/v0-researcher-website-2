# Content Management Guide

This document provides instructions for updating the researcher website content with accurate information.

## Data Files to Update

All content is stored in TypeScript files in the `/data` directory. Each file contains placeholder data that should be replaced with real information:

### 1. Publications (`/data/publications.ts`)
- **DOI Links**: Replace empty `doi: ""` fields with actual DOI numbers
- **Citation Counts**: Update `citedBy: 0` with real citation numbers from Google Scholar
- **PDF URLs**: Ensure all `/papers/*.pdf` files exist in the `public/papers/` directory
- **Impact Factors**: Verify journal impact factors are current

### 2. Patents (`/data/patents.ts`)
- **Patent Numbers**: Replace "US Patent Pending" with actual patent numbers when granted
- **Filing Dates**: Update "TBD" with real filing dates
- **Public URLs**: Add real patent URLs from Google Patents or USPTO when available
- **Status**: Update status from "Filed" to "Granted" when appropriate

### 3. Research Projects (`/data/research-projects.ts`)
- **GitHub URLs**: Replace empty `codeUrl: ""` with actual repository URLs
- **Funding Information**: Verify grant amounts and funding sources
- **Collaborators**: Confirm all listed collaborators and institutions

### 4. Talks (`/data/talks.ts`)
- **Video URLs**: Add actual video URLs when presentations are recorded
- **Slide URLs**: Ensure all `/slides/*.pdf` files exist in `public/slides/`
- **Venue Information**: Verify conference names and dates

### 5. Awards (`/data/awards.ts`)
- **Amounts**: Add actual fellowship/grant amounts if publicly available
- **Verification**: Confirm all awards and their details

### 6. Experience (`/data/experiences.ts`)
- **Metrics**: Replace vague achievements with specific, verifiable accomplishments
- **Funding**: Verify any mentioned funding amounts
- **Publications**: Ensure publication counts match actual numbers

## File Management

### Required Directories
Create these directories in the `public/` folder and add the corresponding files:
- `public/papers/` - PDF files of publications
- `public/slides/` - Presentation slide PDFs
- `public/videos/` - Video recordings of talks (optional)
- `public/cv/` - CV/Resume PDF

### Google Scholar Integration
The website includes a Google Scholar sync utility (`/scripts/scholar-sync.js`) that can automatically update publication data. To use it:

1. Update the Google Scholar profile ID in the script
2. Run the script to fetch latest publication data
3. Review and merge the results with existing data

## Content Verification Checklist

- [ ] All DOI links are valid and working
- [ ] Patent numbers are accurate (if granted)
- [ ] GitHub repository URLs are accessible
- [ ] PDF files exist for all referenced papers and slides
- [ ] Citation counts are current (within 6 months)
- [ ] Award information is verifiable
- [ ] Experience achievements are accurate and specific
- [ ] Contact information is up to date

## Regular Maintenance

1. **Monthly**: Update citation counts from Google Scholar
2. **Quarterly**: Review and update research project status
3. **Annually**: Verify all external links and update broken ones
4. **As needed**: Add new publications, talks, awards, and experiences

## External Link Validation

Use tools like `linkchecker` or online link validators to regularly check:
- DOI links to journal articles
- Patent URLs on Google Patents
- GitHub repository links
- Conference and venue websites
- Institutional affiliations

Remember: Academic credibility depends on accurate, verifiable information. Always double-check facts before publishing updates.
