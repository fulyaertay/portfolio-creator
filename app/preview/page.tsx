"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Download, Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { PortfolioData } from "@/types/portfolio"

export default function PreviewPage() {
  const [portfolioData, setPortfolioData] = useLocalStorage<PortfolioData>("portfolio-data", {
    personal: {
      name: "Your Name",
      title: "Your Profession / Expertise",
      about: "Write a short description about yourself. You can mention your experiences, interests, and goals.",
      photo: "https://placehold.co/300x300",
      email: "example@email.com",
      phone: "+1 555 123 4567",
      location: "New York, USA",
      socialMedia: {
        linkedin: "https://linkedin.com/in/username",
        github: "https://github.com/username",
        twitter: "https://twitter.com/username",
      },
    },
    skills: [
      { name: "Web Development", level: 90 },
      { name: "UI/UX Design", level: 75 },
      { name: "Mobile App Development", level: 60 },
    ],
    projects: [
      {
        title: "E-Commerce Website",
        description: "A comprehensive e-commerce platform developed using React and Node.js.",
        image: "https://placehold.co/300x200",
        link: "https://project-example.com",
      },
      {
        title: "Mobile Fitness App",
        description: "A fitness application developed with Flutter, offering personalized workout programs.",
        image: "https://placehold.co/300x200",
        link: "https://project-example.com",
      },
    ],
    experience: [
      {
        company: "ABC Technology",
        position: "Senior Software Developer",
        date: "2020 - Present",
        description: "Web application development, team leadership, and project management.",
      },
      {
        company: "XYZ Digital",
        position: "Frontend Developer",
        date: "2018 - 2020",
        description: "Designing and developing user interfaces.",
      },
    ],
    theme: {
      primaryColor: "#3b82f6",
      textColor: "#1e293b",
      backgroundColor: "#ffffff",
      accentColor: "#f97316",
    },
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Download as HTML function
  const downloadAsHTML = () => {
    // Generate HTML content
    const htmlContent = generateHTML(portfolioData)

    // Download the file
    const element = document.createElement("a")
    const file = new Blob([htmlContent], { type: "text/html" })
    element.href = URL.createObjectURL(file)
    element.download = `${portfolioData.personal.name.replace(/\s+/g, "-").toLowerCase()}-portfolio.html`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Generate HTML content function
  const generateHTML = (data: PortfolioData) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personal.name} - Portfolio</title>
    <style>
        :root {
            --primary-color: ${data.theme.primaryColor};
            --text-color: ${data.theme.textColor};
            --background-color: ${data.theme.backgroundColor};
            --accent-color: ${data.theme.accentColor};
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            padding: 40px 0;
            text-align: center;
        }
        
        .profile {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 60px;
        }
        
        @media (min-width: 768px) {
            .profile {
                flex-direction: row;
                align-items: flex-start;
                text-align: left;
            }
        }
        
        .profile-image {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            border: 4px solid var(--primary-color);
            object-fit: cover;
            margin-bottom: 20px;
        }
        
        @media (min-width: 768px) {
            .profile-image {
                margin-right: 40px;
                margin-bottom: 0;
            }
        }
        
        .profile-content {
            flex: 1;
        }
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            color: var(--text-color);
        }
        
        h2 {
            font-size: 1.5rem;
            margin-bottom: 20px;
            color: var(--accent-color);
            font-weight: 500;
        }
        
        .section-title {
            font-size: 2rem;
            margin-bottom: 30px;
            text-align: center;
            color: var(--primary-color);
        }
        
        section {
            margin-bottom: 60px;
        }
        
        .contact-info {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-top: 20px;
            justify-content: center;
        }
        
        @media (min-width: 768px) {
            .contact-info {
                justify-content: flex-start;
            }
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .social-links {
            display: flex;
            gap: 15px;
            margin-top: 20px;
            justify-content: center;
        }
        
        @media (min-width: 768px) {
            .social-links {
                justify-content: flex-start;
            }
        }
        
        .social-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid var(--text-color);
            color: var(--text-color);
            text-decoration: none;
        }
        
        .skills {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .skill-item {
            margin-bottom: 20px;
        }
        
        .skill-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }
        
        .skill-bar {
            height: 10px;
            background-color: rgba(0,0,0,0.1);
            border-radius: 5px;
            overflow: hidden;
        }
        
        .skill-progress {
            height: 100%;
            background-color: var(--primary-color);
        }
        
        .projects {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 30px;
            max-width: 1200px;
            margin: 0 auto;
            justify-content: center;
        }
        
        .project-card {
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            background-color: white;
        }
        
        .project-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        
        .project-content {
            padding: 20px;
        }
        
        .project-title {
            font-size: 1.25rem;
            margin-bottom: 10px;
        }
        
        .project-description {
            margin-bottom: 15px;
            font-size: 0.9rem;
        }
        
        .project-link {
            display: inline-block;
            padding: 8px 16px;
            background-color: var(--accent-color);
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
        }
        
        .experience-timeline {
            max-width: 800px;
            margin: 0 auto;
            position: relative;
        }
        
        .experience-timeline::before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 2px;
            background-color: var(--primary-color);
        }
        
        .experience-item {
            position: relative;
            padding-left: 30px;
            margin-bottom: 40px;
        }
        
        .experience-item::before {
            content: '';
            position: absolute;
            left: -4px;
            top: 0;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: var(--primary-color);
        }
        
        .experience-date {
            color: var(--accent-color);
            margin-bottom: 5px;
        }
        
        .experience-position {
            font-size: 1.25rem;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .experience-company {
            font-size: 1.1rem;
            margin-bottom: 10px;
        }
        
        footer {
            text-align: center;
            padding: 20px 0;
            border-top: 1px solid rgba(0,0,0,0.1);
            margin-top: 60px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="profile">
                <img 
  src="${data.personal.photo || "https://placehold.co/300x300"}" 
  alt="${data.personal.name}" 
  class="profile-image" 
  onerror="this.onerror=null; this.src='https://placehold.co/300x300'; console.error('Profile image could not be loaded');"
>
                <div class="profile-content">
                    <h1>${data.personal.name}</h1>
                    <h2>${data.personal.title}</h2>
                    <p>${data.personal.about}</p>
                    
                    <div class="contact-info">
                        <div class="contact-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </svg>
                            <span>${data.personal.email}</span>
                        </div>
                        <div class="contact-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span>${data.personal.phone}</span>
                        </div>
                        <div class="contact-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>${data.personal.location}</span>
                        </div>
                    </div>
                    
                    <div class="social-links">
                        <a href="${data.personal.socialMedia.linkedin}" class="social-link" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect width="4" height="12" x="2" y="9"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                        <a href="${data.personal.socialMedia.github}" class="social-link" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                                <path d="M9 18c-4.51 2-5-2-7-2"></path>
                            </svg>
                        </a>
                        <a href="${data.personal.socialMedia.twitter}" class="social-link" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </header>
        
        <section>
            <h3 class="section-title">My Skills</h3>
            <div class="skills">
                ${data.skills
                  .map(
                    (skill) => `
                    <div class="skill-item">
                        <div class="skill-info">
                            <span>${skill.name}</span>
                            <span>${skill.level}%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: ${skill.level}%"></div>
                        </div>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </section>
        
        <section>
            <h3 class="section-title">My Projects</h3>
            <div class="projects">
                ${data.projects
                  .map(
                    (project) => `
                    <div class="project-card">
                        <img 
  src="${project.image || "https://placehold.co/300x200"}" 
  alt="${project.title}" 
  class="project-image" 
  onerror="this.onerror=null; this.src='https://placehold.co/300x200'; console.error('Project image could not be loaded');"
>
                        <div class="project-content">
                            <h4 class="project-title">${project.title}</h4>
                            <p class="project-description">${project.description}</p>
                            <a href="${project.link}" class="project-link" target="_blank">View Project</a>
                        </div>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </section>
        
        <section>
            <h3 class="section-title">Work Experience</h3>
            <div class="experience-timeline">
                ${data.experience
                  .map(
                    (experience) => `
                    <div class="experience-item">
                        <div class="experience-date">${experience.date}</div>
                        <h4 class="experience-position">${experience.position}</h4>
                        <div class="experience-company">${experience.company}</div>
                        <p>${experience.description}</p>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </section>
        
        <footer>
            <p>&copy; ${new Date().getFullYear()} ${data.personal.name} - All Rights Reserved</p>
            <p style="margin-top: 10px; font-size: 0.8rem;">Created with PortfolioMaker</p>
        </footer>
    </div>
</body>
</html>
    `
  }

  if (!mounted) {
    return null
  }

  return (
    <div
      style={{
        backgroundColor: portfolioData.theme.backgroundColor,
        color: portfolioData.theme.textColor,
      }}
    >
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <Link href="/dashboard">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Editor
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button
              onClick={downloadAsHTML}
              style={{
                backgroundColor: portfolioData.theme.accentColor,
                color: "#fff",
              }}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download as HTML
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center gap-8 py-12">
          <div className="w-full md:w-1/3 flex justify-center">
            <div
              className="relative w-64 h-64 rounded-full overflow-hidden border-4"
              style={{ borderColor: portfolioData.theme.primaryColor }}
            >
              <Image
                src={portfolioData.personal.photo || "https://placehold.co/300x300"}
                alt={portfolioData.personal.name}
                fill
                className="object-cover"
                unoptimized
                onError={(e) => {
                  console.error("Profile image could not be loaded, using default image")
                  const target = e.target as HTMLImageElement
                  target.src = "https://placehold.co/300x300"
                  target.onerror = null // Prevent infinite loop
                }}
              />
            </div>
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">{portfolioData.personal.name}</h1>
            <h2 className="text-xl mb-4" style={{ color: portfolioData.theme.accentColor }}>
              {portfolioData.personal.title}
            </h2>
            <p className="mb-6">{portfolioData.personal.about}</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" style={{ color: portfolioData.theme.primaryColor }} />
                <span>{portfolioData.personal.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" style={{ color: portfolioData.theme.primaryColor }} />
                <span>{portfolioData.personal.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" style={{ color: portfolioData.theme.primaryColor }} />
                <span>{portfolioData.personal.location}</span>
              </div>
            </div>
            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              <a href={portfolioData.personal.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </a>
              <a href={portfolioData.personal.socialMedia.github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </a>
              <a href={portfolioData.personal.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: portfolioData.theme.primaryColor }}>
            My Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {portfolioData.skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <Progress
                  value={skill.level}
                  className="h-2"
                  indicatorClassName="bg-primary"
                  style={
                    {
                      backgroundColor: `${portfolioData.theme.primaryColor}30`,
                      "--tw-progress-fill": portfolioData.theme.primaryColor,
                    } as React.CSSProperties
                  }
                />
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-12 mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: portfolioData.theme.primaryColor }}>
            My Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {portfolioData.projects.map((project, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg h-full">
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image || "https://placehold.co/300x200"}
                    alt={project.title}
                    fill
                    className="object-cover"
                    unoptimized
                    onError={(e) => {
                      console.error(`Project image could not be loaded: ${project.title}, using default image`)
                      const target = e.target as HTMLImageElement
                      target.src = "https://placehold.co/300x200"
                      target.onerror = null // Prevent infinite loop
                    }}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="mb-4 text-sm">{project.description}</p>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Button
                      style={{
                        backgroundColor: portfolioData.theme.accentColor,
                        color: "#fff",
                      }}
                    >
                      View Project
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: portfolioData.theme.primaryColor }}>
            Work Experience
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {portfolioData.experience.map((experience, index) => (
              <div
                key={index}
                className="relative pl-8 pb-8 border-l-2"
                style={{ borderColor: portfolioData.theme.primaryColor }}
              >
                <div
                  className="absolute left-[-8px] top-0 w-4 h-4 rounded-full"
                  style={{ backgroundColor: portfolioData.theme.primaryColor }}
                ></div>
                <div className="mb-1" style={{ color: portfolioData.theme.accentColor }}>
                  {experience.date}
                </div>
                <h3 className="text-xl font-bold">{experience.position}</h3>
                <div className="text-lg mb-2">{experience.company}</div>
                <p>{experience.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 mt-12 border-t text-center">
          <p>
            © {new Date().getFullYear()} {portfolioData.personal.name} - All Rights Reserved
          </p>
        </footer>
      </div>
    </div>
  )
}
