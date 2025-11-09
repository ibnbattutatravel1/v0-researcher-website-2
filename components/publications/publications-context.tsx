"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Publication } from "@/data/publications"

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
  filteredPublications: Publication[]
  totalCount: number
  displayedPublications: Publication[]
  hasMore: boolean
  isLoading: boolean
  loadMore: () => void
}

const PublicationsContext = createContext<PublicationsContextType | undefined>(undefined)

export function PublicationsProvider({ children }: { children: ReactNode }) {
  const [allPublications, setAllPublications] = useState<Publication[]>([])
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

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        setPaginationState((p) => ({ ...p, isLoading: true }))
        const res = await fetch("/api/publications", { cache: "no-store" })
        const data: Publication[] = await res.json()
        if (mounted) setAllPublications(data)
      } finally {
        if (mounted) setPaginationState((p) => ({ ...p, isLoading: false }))
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  const filteredPublications = allPublications.filter((publication) => {
    if (filterState.searchQuery) {
      const query = filterState.searchQuery.toLowerCase()
      const matchesTitle = publication.title.toLowerCase().includes(query)
      const matchesAuthors = publication.authors.some((author) => author.toLowerCase().includes(query))
      const matchesTopic = publication.topic?.toLowerCase().includes(query)
      if (!matchesTitle && !matchesAuthors && !matchesTopic) {
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

    if (filterState.topics.length > 0 && !filterState.topics.includes(publication.topic)) {
      return false
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
        return (b.citations || 0) - (a.citations || 0)
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
        totalCount: allPublications.length,
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
