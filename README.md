# Mohammed E. Fouda - Research Website

A modern, accessible website showcasing the research and professional work of Dr. Mohammed E. Fouda, Applied Research Lead at Rain AI.

## Features

- **Futurist Lab Design**: Dark theme with glassmorphism effects and electric cyan accents
- **Publications Management**: Automated sync with Google Scholar, BibTeX generation
- **Research Projects**: Filterable project showcase with detailed information
- **Patents Portfolio**: Comprehensive intellectual property display
- **Awards & Recognition**: Professional achievements and honors
- **Experience Timeline**: Industry and academic career progression
- **Contact System**: Professional contact form with spam protection
- **Admin Interface**: Content management and Google Scholar integration

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui with custom glassmorphism theme
- **Typography**: Inter (headings/body) and JetBrains Mono (code)
- **Analytics**: Vercel Analytics
- **Deployment**: Optimized for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd fouda-website
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Content Management

### Publications

Publications are managed through the admin interface at `/admin`. The system supports:

- **Google Scholar Integration**: Automatic sync with Scholar profile (ID: 1mr8HxoAAAAJ)
- **Manual Overrides**: Edit publication details, featured status, and metadata
- **BibTeX Generation**: Automatic generation and export of citation formats
- **Filtering**: By year, venue, topic, and publication type

To update publications:

1. Visit `/admin` and go to the Scholar Sync tab
2. Click "Sync Now" to fetch latest data from Google Scholar
3. Review and edit publications in the Publications tab
4. Toggle "Featured" status for homepage display

### Research Projects

Research projects are stored in `data/research-projects.ts`. To add or modify projects:

1. Edit the file directly or use the admin interface
2. Include: title, description, role, status, funding, collaborators, themes
3. Add links to papers, code repositories, and presentation slides

### Other Content

- **Patents**: Edit `data/patents.ts`
- **Awards**: Edit `data/awards.ts` 
- **Experience**: Edit `data/experiences.ts`
- **Talks**: Edit `data/talks.ts`

## Design System

The website uses a custom design system with:

### Colors
- **Background**: #0A0C10 (near-black)
- **Foreground**: #E6E8EB (light gray)
- **Accent**: #42E8E0 (electric cyan)
- **Surfaces**: rgba(255,255,255,0.04) with glassmorphism

### Typography
- **Headings**: Inter (font-sans)
- **Body**: Inter (font-sans)
- **Code**: JetBrains Mono (font-mono)

### Components
- **Glass Cards**: Subtle blur with 1px borders
- **Glow Effects**: Cyan glow on hover for interactive elements
- **Responsive Grid**: 12-column system, max-width 1200px

## Performance

The website is optimized for:
- **Lighthouse Score**: 95+ on mobile and desktop
- **First Load JS**: <100KB
- **Image Optimization**: Lazy loading and responsive images
- **SEO**: Semantic HTML, JSON-LD structured data, OpenGraph

## Accessibility

- **WCAG 2.1 AA Compliance**: High contrast ratios and keyboard navigation
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus rings and skip-to-content links

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project:
\`\`\`bash
npm run build
\`\`\`

2. Export static files:
\`\`\`bash
npm run export
\`\`\`

3. Deploy the `out` directory to your hosting provider

## Environment Variables

For Google Scholar integration and other features:

\`\`\`env
NEXT_PUBLIC_SCHOLAR_USER_ID=1mr8HxoAAAAJ
NEXT_PUBLIC_SITE_URL=https://mefouda.me
\`\`\`

## Contributing

This is a personal website, but suggestions and bug reports are welcome:

1. Open an issue for bugs or feature requests
2. Follow the existing code style and design patterns
3. Test accessibility and performance changes

## License

© 2024 Mohammed E. Fouda. All rights reserved.

## Contact

For questions about the website or research collaborations:
- Email: fouda@mefouda.me
- LinkedIn: [linkedin.com/in/mefouda](https://linkedin.com/in/mefouda)
- Google Scholar: [1mr8HxoAAAAJ](https://scholar.google.com/citations?user=1mr8HxoAAAAJ)
