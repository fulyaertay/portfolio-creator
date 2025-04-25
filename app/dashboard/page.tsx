"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Eye, Plus, Trash2, Upload } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { PortfolioData } from "@/types/portfolio"

export default function DashboardPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("personal")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const projeFileInputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Default portfolio data with English content
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

  // Convert file to base64 format
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        try {
          if (typeof reader.result === "string") {
            resolve(reader.result)
          } else {
            reject(new Error("FileReader result is not a string"))
          }
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = (error) => reject(error)
    })
  }

  // Handle profile photo upload
  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      // Check file size (must be less than 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB.",
          variant: "destructive",
        })
        return
      }

      const base64 = await fileToBase64(file)
      setPortfolioData({
        ...portfolioData,
        personal: {
          ...portfolioData.personal,
          photo: base64,
        },
      })

      toast({
        title: "Photo uploaded",
        description: "Your profile photo has been successfully uploaded.",
      })
    } catch (error) {
      console.error("Profile photo upload error:", error)
      toast({
        title: "Error",
        description: "An error occurred while uploading the photo.",
        variant: "destructive",
      })
    }
  }

  // Handle project image upload
  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      // Check file size (must be less than 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB.",
          variant: "destructive",
        })
        return
      }

      const base64 = await fileToBase64(file)
      const updatedProjects = [...portfolioData.projects]
      updatedProjects[index] = {
        ...updatedProjects[index],
        image: base64,
      }

      setPortfolioData({
        ...portfolioData,
        projects: updatedProjects,
      })

      toast({
        title: "Image uploaded",
        description: "Your project image has been successfully uploaded.",
      })
    } catch (error) {
      console.error("Project image upload error:", error)
      toast({
        title: "Error",
        description: "An error occurred while uploading the image.",
        variant: "destructive",
      })
    }
  }

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setPortfolioData({
        ...portfolioData,
        personal: {
          ...portfolioData.personal,
          [parent]: {
            ...(portfolioData.personal[parent as keyof typeof portfolioData.personal] as Record<string, string>),
            [child]: value,
          },
        },
      })
    } else {
      setPortfolioData({
        ...portfolioData,
        personal: {
          ...portfolioData.personal,
          [name]: value,
        },
      })
    }
  }

  const handleSkillChange = (index: number, field: string, value: string | number) => {
    const updatedSkills = [...portfolioData.skills]
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: field === "level" ? Number(value) : value,
    }

    setPortfolioData({
      ...portfolioData,
      skills: updatedSkills,
    })
  }

  const handleAddSkill = () => {
    setPortfolioData({
      ...portfolioData,
      skills: [...portfolioData.skills, { name: "New Skill", level: 50 }],
    })
  }

  const handleDeleteSkill = (index: number) => {
    const updatedSkills = [...portfolioData.skills]
    updatedSkills.splice(index, 1)

    setPortfolioData({
      ...portfolioData,
      skills: updatedSkills,
    })
  }

  const handleProjectChange = (index: number, field: string, value: string) => {
    const updatedProjects = [...portfolioData.projects]
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    }

    setPortfolioData({
      ...portfolioData,
      projects: updatedProjects,
    })
  }

  const handleAddProject = () => {
    setPortfolioData({
      ...portfolioData,
      projects: [
        ...portfolioData.projects,
        {
          title: "New Project",
          description: "Project description",
          image: "https://placehold.co/300x200",
          link: "https://project-example.com",
        },
      ],
    })
  }

  const handleDeleteProject = (index: number) => {
    const updatedProjects = [...portfolioData.projects]
    updatedProjects.splice(index, 1)

    setPortfolioData({
      ...portfolioData,
      projects: updatedProjects,
    })
  }

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const updatedExperience = [...portfolioData.experience]
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    }

    setPortfolioData({
      ...portfolioData,
      experience: updatedExperience,
    })
  }

  const handleAddExperience = () => {
    setPortfolioData({
      ...portfolioData,
      experience: [
        ...portfolioData.experience,
        {
          company: "New Company",
          position: "Position",
          date: "2022 - 2023",
          description: "Job description",
        },
      ],
    })
  }

  const handleDeleteExperience = (index: number) => {
    const updatedExperience = [...portfolioData.experience]
    updatedExperience.splice(index, 1)

    setPortfolioData({
      ...portfolioData,
      experience: updatedExperience,
    })
  }

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPortfolioData({
      ...portfolioData,
      theme: {
        ...portfolioData.theme,
        [name]: value,
      },
    })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Portfolio Editor</h1>
        <div className="flex gap-2">
          <Link href="/preview">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </Link>
          {/* Save button removed - changes are automatically saved */}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Edit your basic information that will appear in your portfolio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={portfolioData.personal.name}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title / Profession</Label>
                  <Input
                    id="title"
                    name="title"
                    value={portfolioData.personal.title}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={portfolioData.personal.email}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={portfolioData.personal.phone}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={portfolioData.personal.location}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo">Photo</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <Input
                        id="photo"
                        name="photo"
                        value={portfolioData.personal.photo}
                        onChange={handlePersonalInfoChange}
                        placeholder="URL or upload from file"
                      />
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleProfileImageUpload}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload File
                      </Button>
                    </div>
                  </div>
                  {portfolioData.personal.photo && (
                    <div className="mt-2">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                        <img
                          src={portfolioData.personal.photo || "/placeholder.svg"}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error("Profile image could not be loaded, using default image")
                            const target = e.target as HTMLImageElement
                            target.src = "https://placehold.co/300x300"
                            target.onerror = null // Prevent infinite loop
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="about">About Me</Label>
                <Textarea
                  id="about"
                  name="about"
                  rows={4}
                  value={portfolioData.personal.about}
                  onChange={handlePersonalInfoChange}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Social Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      name="socialMedia.linkedin"
                      value={portfolioData.personal.socialMedia.linkedin}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      name="socialMedia.github"
                      value={portfolioData.personal.socialMedia.github}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      name="socialMedia.twitter"
                      value={portfolioData.personal.socialMedia.twitter}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Add your skills and expertise levels.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                      <div className="space-y-2">
                        <Label htmlFor={`skill-${index}`}>Skill Name</Label>
                        <Input
                          id={`skill-${index}`}
                          value={skill.name}
                          onChange={(e) => handleSkillChange(index, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`level-${index}`}>Level (%{skill.level})</Label>
                        <Input
                          id={`level-${index}`}
                          type="range"
                          min="0"
                          max="100"
                          value={skill.level}
                          onChange={(e) => handleSkillChange(index, "level", e.target.value)}
                        />
                      </div>
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteSkill(index)} className="mt-6">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddSkill}>
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Add projects you want to showcase in your portfolio.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {portfolioData.projects.map((project, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Project #{index + 1}</h3>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(index)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`project-title-${index}`}>Project Title</Label>
                        <Input
                          id={`project-title-${index}`}
                          value={project.title}
                          onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`project-link-${index}`}>Project Link</Label>
                        <Input
                          id={`project-link-${index}`}
                          value={project.link}
                          onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`project-image-${index}`}>Project Image</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="col-span-2">
                            <Input
                              id={`project-image-${index}`}
                              value={project.image}
                              onChange={(e) => handleProjectChange(index, "image", e.target.value)}
                              placeholder="URL or upload from file"
                            />
                          </div>
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              ref={(el) => (projeFileInputRefs.current[index] = el)}
                              onChange={(e) => handleProjectImageUpload(e, index)}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full"
                              onClick={() => projeFileInputRefs.current[index]?.click()}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload File
                            </Button>
                          </div>
                        </div>
                        {project.image && (
                          <div className="mt-2">
                            <div className="w-full h-32 rounded overflow-hidden border-2 border-gray-200">
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  console.error(
                                    `Project image could not be loaded: ${project.title}, using default image`,
                                  )
                                  const target = e.target as HTMLImageElement
                                  target.src = "https://placehold.co/300x200"
                                  target.onerror = null // Prevent infinite loop
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`project-description-${index}`}>Project Description</Label>
                        <Textarea
                          id={`project-description-${index}`}
                          value={project.description}
                          onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddProject}>
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="experience">
          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Add your past work experience and positions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {portfolioData.experience.map((experience, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Experience #{index + 1}</h3>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteExperience(index)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`company-${index}`}>Company Name</Label>
                        <Input
                          id={`company-${index}`}
                          value={experience.company}
                          onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`position-${index}`}>Position</Label>
                        <Input
                          id={`position-${index}`}
                          value={experience.position}
                          onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`date-${index}`}>Date Range</Label>
                        <Input
                          id={`date-${index}`}
                          value={experience.date}
                          onChange={(e) => handleExperienceChange(index, "date", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`description-${index}`}>Job Description</Label>
                        <Textarea
                          id={`description-${index}`}
                          value={experience.description}
                          onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddExperience}>
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="theme">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the appearance of your portfolio.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        name="primaryColor"
                        type="color"
                        value={portfolioData.theme.primaryColor}
                        onChange={handleThemeChange}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={portfolioData.theme.primaryColor}
                        onChange={handleThemeChange}
                        name="primaryColor"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="textColor">Text Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="textColor"
                        name="textColor"
                        type="color"
                        value={portfolioData.theme.textColor}
                        onChange={handleThemeChange}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={portfolioData.theme.textColor}
                        onChange={handleThemeChange}
                        name="textColor"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="backgroundColor">Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="backgroundColor"
                        name="backgroundColor"
                        type="color"
                        value={portfolioData.theme.backgroundColor}
                        onChange={handleThemeChange}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={portfolioData.theme.backgroundColor}
                        onChange={handleThemeChange}
                        name="backgroundColor"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accentColor"
                        name="accentColor"
                        type="color"
                        value={portfolioData.theme.accentColor}
                        onChange={handleThemeChange}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={portfolioData.theme.accentColor}
                        onChange={handleThemeChange}
                        name="accentColor"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="mt-6 p-4 rounded-lg border"
                style={{
                  backgroundColor: portfolioData.theme.backgroundColor,
                  color: portfolioData.theme.textColor,
                }}
              >
                <h3 className="text-lg font-medium mb-2">Theme Preview</h3>
                <div className="flex gap-2">
                  <div
                    className="p-2 rounded"
                    style={{ backgroundColor: portfolioData.theme.primaryColor, color: "#fff" }}
                  >
                    Primary Color
                  </div>
                  <div
                    className="p-2 rounded"
                    style={{ backgroundColor: portfolioData.theme.accentColor, color: "#fff" }}
                  >
                    Accent Color
                  </div>
                </div>
                <p className="mt-2">This is a sample text content.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
