"use client"

import { useState } from 'react'
import AnimatedBackground from '@/components/animated-background'
import { Button } from '@/components/ui/button'
import { Camera, Upload, ArrowRight, Trophy, User } from 'lucide-react'
import Link from 'next/link'
import { CameraModal } from '@/components/camera-modal'
import { toast } from 'sonner'
import TeachableMachine from '@/components/TeachableMachine' // Import the TeachableMachine component

export default function Home() {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [isTeachableMachineOpen, setIsTeachableMachineOpen] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isWebcamMode, setIsWebcamMode] = useState<boolean>(false) // Track whether webcam mode is active

  const handleCapture = (image: string) => {
    // Here you would typically send the image to your AI model
    toast.success('Image captured successfully!')
    console.log('Captured image:', image)
  }

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const image = e.target?.result as string
          setUploadedImage(image) // Set the uploaded image
          setIsTeachableMachineOpen(true) // Open the output screen
          setIsWebcamMode(false) // Disable webcam mode
        }
        reader.readAsDataURL(file)
      } else {
        toast.error('Please upload an image file')
      }
    }
  }

  return (
    <main className="min-h-screen pt-16">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-12 md:pt-40 md:pb-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              <span className="block">Smart Garbage</span>
              <span className="block text-primary">Detection System</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Join our mission to create a cleaner environment through AI-powered garbage detection. 
              Upload images, earn points, and compete with others while making a real impact.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button 
                size="lg" 
                className="gap-2" 
                onClick={() => {
                  setIsTeachableMachineOpen(true) // Open Teachable Machine for webcam
                  setIsWebcamMode(true) // Enable webcam mode
                  setUploadedImage(null) // Ensure no uploaded image is used
                }}
              >
                <Camera className="h-5 w-5" />
                Start Scanning
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2" 
                onClick={() => {
                  const input = document.createElement('input')
                  input.type = 'file'
                  input.accept = 'image/*'
                  input.onchange = (e) => handleUpload(e as any)
                  input.click()
                }}
              >
                <Upload className="h-5 w-5" />
                Upload Image
              </Button>
            </div>
          </div>

          <div className="mt-32 grid gap-8 md:grid-cols-3">
            <div className="relative bg-card rounded-lg p-6 border">
              <div className="absolute -top-4 left-4 bg-primary rounded-full p-3">
                <Camera className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Real-time Detection</h3>
              <p className="mt-2 text-muted-foreground">
                Use your camera to instantly detect and classify different types of garbage.
              </p>
            </div>
            <div className="relative bg-card rounded-lg p-6 border">
              <div className="absolute -top-4 left-4 bg-primary rounded-full p-3">
                <Trophy className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Earn Points</h3>
              <p className="mt-2 text-muted-foreground">
                Get rewarded for your contributions to environmental cleanliness.
              </p>
            </div>
            <div className="relative bg-card rounded-lg p-6 border">
              <div className="absolute -top-4 left-4 bg-primary rounded-full p-3">
                <User className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Track Progress</h3>
              <p className="mt-2 text-muted-foreground">
                Monitor your impact and compete with others on the leaderboard.
              </p>
            </div>
          </div>

          <div className="mt-32 text-center">
            <Link href="/leaderboard">
              <Button variant="link" className="text-lg gap-2">
                View Leaderboard
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Camera Modal */}
      <CameraModal 
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCapture}
      />

      {/* Teachable Machine Component */}
      {isTeachableMachineOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-full max-w-2xl">
            <TeachableMachine 
              image={isWebcamMode ? undefined : uploadedImage || undefined} 
              onClose={() => {
                setIsTeachableMachineOpen(false)
                setUploadedImage(null) // Reset uploaded image
                setIsWebcamMode(false) // Disable webcam mode
              }} 
            />
          </div>
        </div>
      )}
    </main>
  )
}