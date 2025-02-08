"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Camera, Medal, Trophy, Edit2, Save } from 'lucide-react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('John Doe')

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="relative">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                {isEditing ? (
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-2xl font-bold w-64"
                  />
                ) : (
                  <CardTitle className="text-2xl">{name}</CardTitle>
                )}
                <CardDescription>Member since March 2024</CardDescription>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <Save className="h-4 w-4" />
                ) : (
                  <Edit2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-card rounded-lg p-4 border text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">1,234</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
              <div className="bg-card rounded-lg p-4 border text-center">
                <Camera className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">56</div>
                <div className="text-sm text-muted-foreground">Scans Made</div>
              </div>
              <div className="bg-card rounded-lg p-4 border text-center">
                <Medal className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">#12</div>
                <div className="text-sm text-muted-foreground">Rank</div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">First Scan 🎯</Badge>
                <Badge variant="secondary">10 Scans 🎯</Badge>
                <Badge variant="secondary">50 Scans 🎯</Badge>
                <Badge variant="secondary">100 Points 🏆</Badge>
                <Badge variant="secondary">Top 20 🌟</Badge>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-card rounded-lg border">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Camera className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Scanned plastic bottle</div>
                      <div className="text-sm text-muted-foreground">2 hours ago</div>
                    </div>
                    <Badge>+10 points</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline">Download Activity Report</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}