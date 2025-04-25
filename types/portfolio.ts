export interface PortfolioData {
  personal: {
    name: string
    title: string
    about: string
    photo: string
    email: string
    phone: string
    location: string
    socialMedia: {
      linkedin: string
      github: string
      twitter: string
    }
  }
  skills: {
    name: string
    level: number
  }[]
  projects: {
    title: string
    description: string
    image: string
    link: string
  }[]
  experience: {
    company: string
    position: string
    date: string
    description: string
  }[]
  theme: {
    primaryColor: string
    textColor: string
    backgroundColor: string
    accentColor: string
  }
}
