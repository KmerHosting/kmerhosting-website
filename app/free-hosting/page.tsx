"use client"

import { useState, useCallback } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Check, AlertCircle, Globe, Shield, Zap, HardDrive, Link, Users } from "lucide-react"
import { useDropzone } from "react-dropzone"

interface UploadedFile {
  name: string
  size: number
  type: string
}

export default function FreeHostingPage() {const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [subdomain, setSubdomain] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentProgress, setDeploymentProgress] = useState(0)
  const [isDeployed, setIsDeployed] = useState(false)
  const [deployedUrl, setDeployedUrl] = useState("")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const totalSize = acceptedFiles.reduce((sum, file) => sum + file.size, 0)
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (totalSize > maxSize) {
      alert("Total file size exceeds 10MB limit")
      return
    }

    const files: UploadedFile[] = acceptedFiles.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type || "unknown"
    }))

    setUploadedFiles(prev => [...prev, ...files])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/zip': ['.zip'],
      'application/x-zip-compressed': ['.zip']
    },
    multiple: false,
    maxFiles: 1
  })

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getTotalSize = () => {
    return uploadedFiles.reduce((sum, file) => sum + file.size, 0)
  }

  const handleDeploy = async () => {
    if (!subdomain.trim()) {
      alert("Please enter a subdomain")
      return
    }

    if (uploadedFiles.length === 0) {
      alert("Please upload at least one file")
      return
    }

    setIsDeploying(true)
    setDeploymentProgress(0)

    // Simulate deployment process
    const progressInterval = setInterval(() => {
      setDeploymentProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsDeploying(false)
          setIsDeployed(true)
          setDeployedUrl(`https://${subdomain}.kmerhosting.site`)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const features = [
    {
      icon: Shield,
      title: "Free SSL Certificate",
      description: "Automatic HTTPS"
    },
    {
      icon: Zap,
      title: "Global CDN",
      description: "Fast worldwide delivery"
    },
    {
      icon: Globe,
      title: "Unlimited Bandwidth",
      description: "No traffic limits"
    },
    {
      icon: HardDrive,
      title: "10 MB Storage",
      description: "Perfect for static sites"
    },
    {
      icon: Link,
      title: "Free Subdomain",
      description: "Professional URL"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Help when you need it"
    }
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-muted/30">
        {/* Hero Section */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                {"Free Website Hosting"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {"Deploy your static website for free"}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {!isDeployed ? (
                <div className="grid gap-8 lg:grid-cols-2">
                  {/* Upload Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5" />
                        {"Upload Your Website"}
                      </CardTitle>
                      <CardDescription>{"Upload your HTML, CSS, JS files"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                          isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                        }`}
                      >
                        <input {...getInputProps()} />
                        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        {isDragActive ? (
                          <p className="text-lg font-medium">Drop files here...</p>
                        ) : (
                          <div>
                            <p className="text-lg font-medium mb-2">
                              Drag & drop files here, or click to browse
                            </p>
                            <p className="text-sm text-muted-foreground mb-4">
                              {"Maximum 10MB total file size"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {"Supports: HTML, CSS, JS, images"}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* File List */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">Uploaded Files</h4>
                            <Badge variant="outline">
                              {formatFileSize(getTotalSize())} / 10MB
                            </Badge>
                          </div>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {uploadedFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                                <div className="flex items-center gap-2">
                                  <Check className="h-4 w-4 text-[#07C983]" />
                                  <span className="text-sm font-medium">{file.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    ({formatFileSize(file.size)})
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Subdomain Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        {"Choose Your Subdomain"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="subdomain">Subdomain</Label>
                          <div className="flex items-center mt-2">
                            <Input
                              id="subdomain"
                              value={subdomain}
                              onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                              placeholder="mysite"
                              className="rounded-r-none"
                            />
                            <div className="px-3 py-2 bg-muted border border-l-0 rounded-r-md text-sm text-muted-foreground">
                              .kmerhosting.site
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {"Example: mysite.kmerhosting.site"}
                          </p>
                        </div>

                        {isDeploying && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Deploying...</span>
                              <span className="text-sm text-muted-foreground">{deploymentProgress}%</span>
                            </div>
                            <Progress value={deploymentProgress} className="h-2" />
                          </div>
                        )}

                        <Button 
                          onClick={handleDeploy}
                          className="w-full"
                          disabled={!subdomain.trim() || uploadedFiles.length === 0 || isDeploying}
                        >
                          {isDeploying ? "Deploying..." : "Deploy Now"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                /* Success Section */
                <Card className="text-center">
                  <CardContent className="pt-8">
                    <div className="mb-6">
                      <Check className="h-16 w-16 mx-auto mb-4 text-[#07C983]" />
                      <h2 className="text-2xl font-bold mb-2">Deployment Successful!</h2>
                      <p className="text-muted-foreground">Your website is now live and accessible worldwide.</p>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg mb-6">
                      <p className="text-sm text-muted-foreground mb-2">Your website URL:</p>
                      <a 
                        href={deployedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-mono text-primary hover:underline"
                      >
                        {deployedUrl}
                      </a>
                    </div>

                    <div className="flex gap-4 justify-center">
                      <Button
                        onClick={() => window.open(deployedUrl, '_blank')}
                      >
                        Visit Website
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsDeployed(false)
                          setUploadedFiles([])
                          setSubdomain("")
                          setDeploymentProgress(0)
                        }}
                      >
                        Deploy Another
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{"What You Get"}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="h-6 w-6 text-primary" />
                        <h3 className="font-semibold">{feature.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Important Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#07C983] mt-0.5 flex-shrink-0" />
                      <span><strong>Upload format:</strong> Upload a .zip file containing your project with files at the first three directory levels (HTML, CSS, JavaScript, images, fonts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#07C983] mt-0.5 flex-shrink-0" />
                      <span><strong>Maximum size:</strong> 10MB total for all files</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#07C983] mt-0.5 flex-shrink-0" />
                      <span><strong>No backend:</strong> No server-side processing, databases, or APIs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#07C983] mt-0.5 flex-shrink-0" />
                      <span><strong>Index file:</strong> Include an index.html file as your homepage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#07C983] mt-0.5 flex-shrink-0" />
                      <span><strong>Subdomain:</strong> Choose a unique .kmerhosting.site subdomain</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}