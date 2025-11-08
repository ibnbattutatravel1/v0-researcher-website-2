"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { publications } from "@/data/publications"

export interface FilterState {
  searchQuery: string
  years: string[]
  venues: string[]
  topics: string[]
  types: string[]
  featured: boolean
  sortBy: "latest" | "oldest" | "citations" | "title"
}

interface PaginationState {
  currentPage: number
  itemsPerPage: number
  isLoading: boolean
}

interface PublicationsContextType {
  filterState: FilterState
  setFilterState: (state: FilterState) => void
  filteredPublications: typeof publications
  totalCount: number
  displayedPublications: typeof publications
  hasMore: boolean
  isLoading: boolean
  loadMore: () => void
}

const PublicationsContext = createContext<PublicationsContextType | undefined>(undefined)

export function PublicationsProvider({ children }: { children: ReactNode }) {
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: "",
    years: [],
    venues: [],
    topics: [],
    types: [],
    featured: false,
    sortBy: "latest",
  })

  const [paginationState, setPaginationState] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 10,
    isLoading: false,
  })

  const filteredPublications = publications.filter((publication) => {
    if (filterState.searchQuery) {
      const query = filterState.searchQuery.toLowerCase()
      const matchesTitle = publication.title.toLowerCase().includes(query)
      const matchesAuthors = publication.authors.some((author) => author.toLowerCase().includes(query))
      const matchesTopics = publication.topics?.some((topic) => topic.toLowerCase().includes(query))
      if (!matchesTitle && !matchesAuthors && !matchesTopics) {
        return false
      }
    }

    if (filterState.featured && !publication.featured) {
      return false
    }

    if (filterState.years.length > 0 && !filterState.years.includes(publication.year.toString())) {
      return false
    }

    if (filterState.venues.length > 0 && !filterState.venues.includes(publication.venue)) {
      return false
    }

    if (filterState.topics.length > 0) {
      const hasMatchingTopic = publication.topics?.some((topic) => filterState.topics.includes(topic))
      if (!hasMatchingTopic) {
        return false
      }
    }

    if (filterState.types.length > 0 && !filterState.types.includes(publication.type)) {
      return false
    }

    return true
  })

  const sortedPublications = [...filteredPublications].sort((a, b) => {
    switch (filterState.sortBy) {
      case "latest":
        return b.year - a.year
      case "oldest":
        return a.year - b.year
      case "citations":
        return (b.citedBy || 0) - (a.citedBy || 0)
      case "title":
        return a.title.localeCompare(b.title)
      default:
        return b.year - a.year
    }
  })

  const displayedPublications = sortedPublications.slice(0, paginationState.currentPage * paginationState.itemsPerPage)
  const hasMore = displayedPublications.length < sortedPublications.length

  const loadMore = () => {
    if (paginationState.isLoading || !hasMore) return

    setPaginationState((prev) => ({ ...prev, isLoading: true }))

    setTimeout(() => {
      setPaginationState((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
        isLoading: false,
      }))
    }, 500)
  }

  const setFilterStateWithReset = (state: FilterState) => {
    setFilterState(state)
    setPaginationState((prev) => ({ ...prev, currentPage: 1 }))
  }

  return (
    <PublicationsContext.Provider
      value={{
        filterState,
        setFilterState: setFilterStateWithReset,
        filteredPublications: sortedPublications,
        totalCount: publications.length,
        displayedPublications,
        hasMore,
        isLoading: paginationState.isLoading,
        loadMore,
      }}
    >
      {children}
    </PublicationsContext.Provider>
  )
}

export function usePublications() {
  const context = useContext(PublicationsContext)
  if (context === undefined) {
    throw new Error("usePublications must be used within a PublicationsProvider")
  }
  return context
}
