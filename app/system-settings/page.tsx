"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Bell,
  Cpu,
  HardDrive,
  MemoryStickIcon as Memory,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// --- Dummy Data ---
interface UserProfile {
  name: string
  email: string
  twoFactorEnabled: boolean
}

interface NotificationSettings {
  emailAlerts: boolean
  inAppNotifications: boolean
  pushNotifications: boolean
  frequency: "instant" | "daily" | "weekly"
}

interface SystemPerformance {
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
}

interface HistoricalPerformance {
  month: string
  cpu: number
  memory: number
}

const initialUserProfile: UserProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  twoFactorEnabled: true,
}

const initialNotificationSettings: NotificationSettings = {
  emailAlerts: true,
  inAppNotifications: true,
  pushNotifications: false,
  frequency: "daily",
}

const initialSystemPerformance: SystemPerformance = {
  cpuUsage: 45,
  memoryUsage: 60,
  diskUsage: 75,
}

const initialHistoricalPerformance: HistoricalPerformance[] = [
  { month: "Jan", cpu: 40, memory: 55 },
  { month: "Feb", cpu: 42, memory: 58 },
  { month: "Mar", cpu: 45, memory: 60 },
  { month: "Apr", cpu: 43, memory: 57 },
  { month: "May", cpu: 48, memory: 62 },
  { month: "Jun", cpu: 45, memory: 60 },
]

const chartConfig = {
  cpu: {
    label: "CPU Usage",
    color: "hsl(var(--chart-1))", // teal
  },
  memory: {
    label: "Memory Usage",
    color: "hsl(var(--chart-3))", // blue
  },
}

export default function SystemSettings() {
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile)
  const [password, setPassword] = useState({ current: "", new: "", confirm: "" })
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(initialNotificationSettings)
  const [systemPerformance, setSystemPerformance] = useState<SystemPerformance>(initialSystemPerformance)
  const [historicalPerformance, setHistoricalPerformance] =
    useState<HistoricalPerformance[]>(initialHistoricalPerformance)
  const [profileSaveStatus, setProfileSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [passwordSaveStatus, setPasswordSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [notificationSaveStatus, setNotificationSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  const handleProfileUpdate = async () => {
    setProfileSaveStatus("saving")
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // In a real app, send userProfile to backend
    console.log("Updating profile:", userProfile)
    setProfileSaveStatus("saved")
    setTimeout(() => setProfileSaveStatus("idle"), 2000)
  }

  const handlePasswordChange = async () => {
    setPasswordSaveStatus("saving")
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (password.new === password.confirm && password.new !== "") {
      console.log("Changing password:", password.new)
      setPasswordSaveStatus("saved")
      setPassword({ current: "", new: "", confirm: "" })
    } else {
      setPasswordSaveStatus("error")
    }
    setTimeout(() => setPasswordSaveStatus("idle"), 2000)
  }

  const handleNotificationUpdate = async () => {
    setNotificationSaveStatus("saving")
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // In a real app, send notificationSettings to backend
    console.log("Updating notifications:", notificationSettings)
    setNotificationSaveStatus("saved")
    setTimeout(() => setNotificationSaveStatus("idle"), 2000)
  }

  const refreshPerformanceData = async () => {
    // Simulate fetching real-time data
    await new Promise((resolve) => setTimeout(resolve, 500))
    setSystemPerformance({
      cpuUsage: Math.floor(Math.random() * (80 - 30 + 1)) + 30,
      memoryUsage: Math.floor(Math.random() * (90 - 40 + 1)) + 40,
      diskUsage: Math.floor(Math.random() * (95 - 50 + 1)) + 50,
    })
    // Simulate adding new historical data point
    const newMonth = new Date().toLocaleString("en-US", { month: "short" })
    setHistoricalPerformance((prev) => [
      ...prev.slice(1),
      { month: newMonth, cpu: systemPerformance.cpuUsage, memory: systemPerformance.memoryUsage },
    ])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your application preferences and configurations</p>
          </div>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="account">
              <User className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="performance">
              <Cpu className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">Update your personal details.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                  />
                </div>
                <Button onClick={handleProfileUpdate} className="bg-teal-600 hover:bg-teal-700">
                  {profileSaveStatus === "saving" ? (
                    "Saving..."
                  ) : profileSaveStatus === "saved" ? (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  ) : profileSaveStatus === "error" ? (
                    <AlertCircle className="h-4 w-4 mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {profileSaveStatus === "saved" ? "Saved!" : profileSaveStatus === "error" ? "Error" : "Save Profile"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password & Security</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage your account security settings.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={password.current}
                    onChange={(e) => setPassword({ ...password, current: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={password.new}
                    onChange={(e) => setPassword({ ...password, new: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={password.confirm}
                    onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                  />
                </div>
                <Button onClick={handlePasswordChange} className="bg-teal-600 hover:bg-teal-700">
                  {passwordSaveStatus === "saving" ? (
                    "Saving..."
                  ) : passwordSaveStatus === "saved" ? (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  ) : passwordSaveStatus === "error" ? (
                    <AlertCircle className="h-4 w-4 mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {passwordSaveStatus === "saved"
                    ? "Password Changed!"
                    : passwordSaveStatus === "error"
                      ? "Error Changing Password"
                      : "Change Password"}
                </Button>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <Switch
                    id="two-factor"
                    checked={userProfile.twoFactorEnabled}
                    onCheckedChange={(checked) => setUserProfile({ ...userProfile, twoFactorEnabled: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Customize how you receive alerts and updates.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-alerts">Email Alerts</Label>
                  <Switch
                    id="email-alerts"
                    checked={notificationSettings.emailAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailAlerts: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="in-app-notifications">In-App Notifications</Label>
                  <Switch
                    id="in-app-notifications"
                    checked={notificationSettings.inAppNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, inAppNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <Switch
                    id="push-notifications"
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notification-frequency">Notification Frequency</Label>
                  <Select
                    value={notificationSettings.frequency}
                    onValueChange={(value) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        frequency: value as NotificationSettings["frequency"],
                      })
                    }
                  >
                    <SelectTrigger id="notification-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instant">Instant</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleNotificationUpdate} className="bg-teal-600 hover:bg-teal-700">
                  {notificationSaveStatus === "saving" ? (
                    "Saving..."
                  ) : notificationSaveStatus === "saved" ? (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  ) : notificationSaveStatus === "error" ? (
                    <AlertCircle className="h-4 w-4 mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {notificationSaveStatus === "saved"
                    ? "Settings Saved!"
                    : notificationSaveStatus === "error"
                      ? "Error Saving Settings"
                      : "Save Preferences"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Monitor real-time resource usage and historical trends.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 text-center">
                    <Cpu className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {systemPerformance.cpuUsage}%
                    </div>
                    <p className="text-sm text-gray-600">CPU Usage</p>
                    <Progress value={systemPerformance.cpuUsage} className="h-2 mt-2" />
                  </Card>
                  <Card className="p-4 text-center">
                    <Memory className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {systemPerformance.memoryUsage}%
                    </div>
                    <p className="text-sm text-gray-600">Memory Usage</p>
                    <Progress value={systemPerformance.memoryUsage} className="h-2 mt-2" />
                  </Card>
                  <Card className="p-4 text-center">
                    <HardDrive className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {systemPerformance.diskUsage}%
                    </div>
                    <p className="text-sm text-gray-600">Disk Usage</p>
                    <Progress value={systemPerformance.diskUsage} className="h-2 mt-2" />
                  </Card>
                </div>
                <div className="flex justify-end">
                  <Button onClick={refreshPerformanceData} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Data
                  </Button>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium mb-2">Historical Performance</h3>
                  <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={historicalPerformance} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          domain={[0, 100]}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="cpu"
                          stroke="var(--color-cpu)"
                          fill="var(--color-cpu)"
                          fillOpacity={0.3}
                          name="CPU Usage"
                        />
                        <Area
                          type="monotone"
                          dataKey="memory"
                          stroke="var(--color-memory)"
                          fill="var(--color-memory)"
                          fillOpacity={0.3}
                          name="Memory Usage"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
