"use client"

import { useState } from 'react'
import AnimatedBackground from '@/components/animated-background'
import { Button } from '@/components/ui/button'
import { Camera, Upload, ArrowRight, Trophy, User } from 'lucide-react'
import Link from 'next/link'
import { CameraModal } from '@/components/camera-modal'
import { toast } from 'sonner'
import ImageUploader from '@/components/ImageUploader' // Import the ImageUploader component

export default function Home() {
  const [isCameraOpen, setIsCameraOpen] = useState(false)

  const handleCapture = (image: string) => {
    // Here you would typically send the image to your AI model
    toast.success('Image captured successfully!')
    console.log('Captured image:', image)
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
              <Button size="lg" className="gap-2" onClick={() => setIsCameraOpen(true)}>
                <Camera className="h-5 w-5" />
                Start Scanning
              </Button>
              {/* Replace the Upload Button with the ImageUploader component */}
              <ImageUploader />
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

      <CameraModal 
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCapture}
      />
    </main>
  )
}