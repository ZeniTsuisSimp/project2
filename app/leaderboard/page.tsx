"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Trophy, Medal, Clock } from 'lucide-react'

const MOCK_USERS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    points: 2500,
    scans: 120,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    initials: 'SJ'
  },
  {
    id: 2,
    name: 'Michael Chen',
    points: 2100,
    scans: 98,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    initials: 'MC'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    points: 1900,
    scans: 85,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    initials: 'EW'
  },
  // Add more mock users here
]

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState('all-time')

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
          <p className="text-muted-foreground">
            Top contributors making our environment cleaner
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2" />
              <CardTitle>1st Place</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-primary-foreground">
                <AvatarImage src={MOCK_USERS[0].avatar} />
                <AvatarFallback>{MOCK_USERS[0].initials}</AvatarFallback>
              </Avatar>
              <div className="text-xl font-bold mb-1">{MOCK_USERS[0].name}</div>
              <div className="text-sm opacity-90">{MOCK_USERS[0].points} points</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Medal className="h-8 w-8 mx-auto mb-2" />
              <CardTitle>2nd Place</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-muted">
                <AvatarImage src={MOCK_USERS[1].avatar} />
                <AvatarFallback>{MOCK_USERS[1].initials}</AvatarFallback>
              </Avatar>
              <div className="text-xl font-bold mb-1">{MOCK_USERS[1].name}</div>
              <div className="text-sm text-muted-foreground">{MOCK_USERS[1].points} points</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Medal className="h-8 w-8 mx-auto mb-2" />
              <CardTitle>3rd Place</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-muted">
                <AvatarImage src={MOCK_USERS[2].avatar} />
                <AvatarFallback>{MOCK_USERS[2].initials}</AvatarFallback>
              </Avatar>
              <div className="text-xl font-bold mb-1">{MOCK_USERS[2].name}</div>
              <div className="text-sm text-muted-foreground">{MOCK_USERS[2].points} points</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all-time" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all-time">All Time</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
            <TabsTrigger value="weekly">This Week</TabsTrigger>
          </TabsList>

          <TabsContent value="all-time">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {MOCK_USERS.map((user, index) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-4 p-4 bg-card rounded-lg border"
                    >
                      <div className="text-lg font-bold w-8 text-center">
                        #{index + 1}
                      </div>
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.scans} scans
                        </div>
                      </div>
                      <Badge variant="secondary" className="ml-auto">
                        {user.points} points
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-muted-foreground">
                  Monthly rankings will be updated soon
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-muted-foreground">
                  Weekly rankings will be updated soon
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}