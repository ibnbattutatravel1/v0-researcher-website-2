import { Navigation } from "@/components/navigation"
import { prisma } from "@/lib/prisma"

export async function NavigationServer() {
  const defaults = {
    cvUrl: "/cv/Mohammed_Fouda_CV.pdf",
    contactEmail: "fouda@mefouda.me",
    showResearch: true,
    showPatents: true,
    showAwards: true,
    showExperience: true,
    showTalks: true,
    showContact: true,
  }

  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } })
    return (
      <Navigation
        cvUrl={settings?.cvUrl ?? defaults.cvUrl}
        contactEmail={settings?.contactEmail ?? defaults.contactEmail}
        showResearch={settings?.showResearch ?? defaults.showResearch}
        showPatents={settings?.showPatents ?? defaults.showPatents}
        showAwards={settings?.showAwards ?? defaults.showAwards}
        showExperience={settings?.showExperience ?? defaults.showExperience}
        showTalks={settings?.showTalks ?? defaults.showTalks}
        showContact={settings?.showContact ?? defaults.showContact}
      />
    )
  } catch {
    return <Navigation {...defaults} />
  }
}
