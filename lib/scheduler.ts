// Client-side scheduler for automatic updates
export class PublicationScheduler {
  private intervalId: NodeJS.Timeout | null = null
  private readonly checkInterval = 60 * 60 * 1000 // Check every hour

  start() {
    if (this.intervalId) return // Already running

    console.log("[v0] Starting publication scheduler")

    // Check immediately on start
    this.checkForUpdates()

    // Then check every hour
    this.intervalId = setInterval(() => {
      this.checkForUpdates()
    }, this.checkInterval)
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
      console.log("[v0] Stopped publication scheduler")
    }
  }

  private async checkForUpdates() {
    try {
      console.log("[v0] Checking for publication updates")

      const response = await fetch("/api/auto-sync", {
        method: "POST",
      })

      const result = await response.json()

      if (response.ok && result.message.includes("updated successfully")) {
        console.log("[v0] Publications updated automatically")

        // Notify user of update (optional)
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("Publications Updated", {
            body: "Your Google Scholar publications have been synchronized.",
            icon: "/favicon.ico",
          })
        }

        // Optionally reload the page or update state
        // window.location.reload();
      }
    } catch (error) {
      console.error("[v0] Auto-update check failed:", error)
    }
  }

  async requestNotificationPermission() {
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission()
    }
  }
}

// Global scheduler instance
export const publicationScheduler = new PublicationScheduler()
