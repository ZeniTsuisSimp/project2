"use client"

import { useState, useRef, useEffect } from 'react'
import { Camera, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

export function CameraModal({ 
  isOpen, 
  onClose,
  onCapture 
}: { 
  isOpen: boolean
  onClose: () => void
  onCapture: (image: string) => void 
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)

  const startCamera = async () => {
    try {
      setError(null)
      // First check if the browser supports getUserMedia
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Camera access is not supported by your browser')
      }

      // Request camera access with both environment and user facing options
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })

      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to access camera'
      setError(errorMessage)
      toast.error(errorMessage)
      // Don't close immediately to show the error state
      setTimeout(onClose, 2000)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setError(null)
  }

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0)
        const image = canvas.toDataURL('image/jpeg', 0.8) // Added quality parameter
        onCapture(image)
        stopCamera()
        onClose()
      }
    }
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  // Start camera when dialog opens
  useEffect(() => {
    if (isOpen) {
      startCamera()
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        stopCamera()
        onClose()
      }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan Garbage</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          {error ? (
            <div className="absolute inset-0 flex items-center justify-center text-white bg-red-500/10">
              <p className="text-center px-4">{error}</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex justify-center gap-4">
          <Button 
            onClick={captureImage} 
            className="gap-2"
            disabled={!stream || !!error}
          >
            <Camera className="h-4 w-4" />
            Capture
          </Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}