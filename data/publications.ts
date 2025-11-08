export interface Publication {
  id: string
  title: string
  authors: string[]
  venue: string
  year: number
  type: "journal" | "conference" | "workshop" | "patent" | "preprint"
  topic: "neuromorphic-computing" | "memristive-devices" | "fractional-order-circuits" | "ai-hardware" | "other"
  citations: number
  impactFactor?: number
  featured: boolean
  url?: string
  abstract?: string
  doi?: string
  pdfUrl?: string
  bibtex?: string
}

export const scholarProfile = {
  name: "Mohammed E. Fouda",
  affiliation: "Rain AI",
  totalCitations: 4263,
  hIndex: 35,
  i10Index: 93,
}

export const publications: Publication[] = [
  {
    id: "neural-coding-spiking-neural-networks",
    title: "Neural coding in spiking neural networks: A comparative study for robust neuromorphic systems",
    authors: ["Wenzhe Guo", "Mohammed E. Fouda", "Ahmed M. Eltawil", "Khaled Nabil Salama"],
    venue: "Frontiers in Neuroscience",
    year: 2021,
    type: "journal",
    topic: "neuromorphic-computing",
    citations: 351,
    impactFactor: 4.3,
    featured: true,
    doi: "10.3389/fnins.2021.638474",
    pdfUrl: "https://www.frontiersin.org/articles/10.3389/fnins.2021.638474/pdf",
    bibtex: `@article{guo2021neural,
  title={Neural coding in spiking neural networks: A comparative study for robust neuromorphic systems},
  author={Guo, Wenzhe and Fouda, Mohammed E and Eltawil, Ahmed M and Salama, Khaled Nabil},
  journal={Frontiers in Neuroscience},
  volume={15},
  pages={638474},
  year={2021},
  publisher={Frontiers}
}`,
  },
  {
    id: "efficient-training-spiking-neural-networks",
    title: "Efficient training of spiking neural networks with temporally-truncated local backpropagation through time",
    authors: ["Wenzhe Guo", "Mohammed E. Fouda", "Ahmed M. Eltawil", "Khaled Nabil Salama"],
    venue: "Frontiers in Neuroscience",
    year: 2023,
    type: "journal",
    topic: "neuromorphic-computing",
    citations: 15,
    impactFactor: 4.3,
    featured: true,
    doi: "10.3389/fnins.2023.1047008",
    pdfUrl: "https://www.frontiersin.org/articles/10.3389/fnins.2023.1047008/pdf",
    bibtex: `@article{guo2023efficient,
  title={Efficient training of spiking neural networks with temporally-truncated local backpropagation through time},
  author={Guo, Wenzhe and Fouda, Mohammed E and Eltawil, Ahmed M and Salama, Khaled Nabil},
  journal={Frontiers in Neuroscience},
  volume={17},
  pages={1047008},
  year={2023},
  publisher={Frontiers}
}`,
  },
  {
    id: "mathematical-modeling-memristor",
    title: "On the mathematical modeling of memristor, memcapacitor, and meminductor",
    authors: ["Ahmed G. Radwan", "Mohammed E. Fouda"],
    venue: "Springer International Publishing",
    year: 2015,
    type: "journal",
    topic: "memristive-devices",
    citations: 181,
    impactFactor: 5.0,
    featured: true,
    doi: "10.1007/978-3-319-17491-4",
    bibtex: `@book{radwan2015mathematical,
  title={On the mathematical modeling of memristor, memcapacitor, and meminductor},
  author={Radwan, Ahmed G and Fouda, Mohammed E},
  year={2015},
  publisher={Springer International Publishing}
}`,
  },
  {
    id: "fractional-order-supercapacitors-review",
    title: "Review of fractional-order electrical characterization of supercapacitors",
    authors: [
      "A. Allagui",
      "T.J. Freeborn",
      "A.S. Elwakil",
      "Mohammed E. Fouda",
      "B.J. Maundy",
      "A.G. Radwan",
      "Z. Said",
      "M.E. Abdelkareem",
    ],
    venue: "Journal of Power Sources",
    year: 2018,
    type: "journal",
    topic: "fractional-order-circuits",
    citations: 169,
    impactFactor: 9.2,
    featured: true,
    doi: "10.1016/j.jpowsour.2018.08.047",
    bibtex: `@article{allagui2018review,
  title={Review of fractional-order electrical characterization of supercapacitors},
  author={Allagui, A and Freeborn, TJ and Elwakil, AS and Fouda, Mohammed E and Maundy, BJ and Radwan, AG and Said, Z and Abdelkareem, ME},
  journal={Journal of Power Sources},
  volume={400},
  pages={457--467},
  year={2018},
  publisher={Elsevier}
}`,
  },
  {
    id: "double-loop-hysteresis-memristive",
    title: "A simple model of double-loop hysteresis behavior in memristive elements",
    authors: ["A.S. Elwakil", "Mohammed E. Fouda", "A.G. Radwan"],
    venue: "IEEE Transactions on Circuits and Systems II: Express Briefs",
    year: 2013,
    type: "journal",
    topic: "memristive-devices",
    citations: 158,
    impactFactor: 3.9,
    featured: false,
  },
  {
    id: "power-energy-fractional-order-storage",
    title: "Power and energy analysis of fractional-order electrical energy storage devices",
    authors: ["Mohammed E. Fouda", "A.S. Elwakil", "A.G. Radwan", "A. Allagui"],
    venue: "Energy",
    year: 2016,
    type: "journal",
    topic: "fractional-order-circuits",
    citations: 135,
    impactFactor: 9.0,
    featured: false,
  },
]

export const lastSyncTime = new Date().toISOString()

export const publicationMetrics = {
  totalPublications: publications.length,
  totalCitations: scholarProfile.totalCitations,
  hIndex: scholarProfile.hIndex,
  i10Index: scholarProfile.i10Index,
  citationsSince2020: 3160,
  hIndexSince2020: 29,
  i10IndexSince2020: 80,
}

export const getFeaturedPublications = () => {
  return publications
    .filter((pub) => pub.featured && (pub.impactFactor || 0) > 4.0)
    .sort((a, b) => b.citations - a.citations)
    .slice(0, 3)
}
