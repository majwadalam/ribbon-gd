"use client"

import { V0Button } from "@/components/v0-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { useToast } from "@/lib/use-toast"
import { 
  Users, 
  Plus, 
  Search, 
  MoreHorizontal,
  Mail,
  Shield,
  Crown,
  User,
  Settings,
  Trash2,
  UserX,
  Download,
  RefreshCw
} from "lucide-react"
import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const initialTeamMembers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "admin",
    avatar: "/avatars/01.png",
    status: "active",
    joinedDate: "Jan 2024",
    lastActive: "2 hours ago"
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    role: "editor",
    avatar: "/avatars/02.png",
    status: "active",
    joinedDate: "Feb 2024",
    lastActive: "5 minutes ago"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily@example.com",
    role: "viewer",
    avatar: "/avatars/03.png",
    status: "invited",
    joinedDate: "Mar 2024",
    lastActive: "Never"
  },
  {
    id: "4",
    name: "David Kim",
    email: "david@example.com",
    role: "editor",
    avatar: "/avatars/04.png",
    status: "inactive",
    joinedDate: "Jan 2024",
    lastActive: "2 weeks ago"
  },
]

const roles = [
  {
    value: "admin",
    label: "Admin",
    description: "Full access to all features",
    icon: Crown,
    color: "text-yellow-600"
  },
  {
    value: "editor",
    label: "Editor", 
    description: "Can view and edit content",
    icon: Settings,
    color: "text-blue-600"
  },
  {
    value: "viewer",
    label: "Viewer",
    description: "Can only view content",
    icon: User,
    color: "text-gray-600"
  }
]

const TEAM_CODE = `"use client"

import { V0Button } from "@/components/v0-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { useToast } from "@/lib/use-toast"
import { 
  Users, 
  Plus, 
  Search, 
  MoreHorizontal,
  Mail,
  Shield,
  Crown,
  User,
  Settings,
  Trash2,
  UserX,
  Download,
  RefreshCw
} from "lucide-react"
import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

// Component implementation with team management functionality
export default function Team() {
  // Component logic here...
}`

export default function Team() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [newMember, setNewMember] = useState({
    name: "",
    email: "", 
    role: "viewer"
  })
  
  const { toast } = useToast()

  const getRoleInfo = (role: string) => {
    return roles.find(r => r.value === role) || roles[2]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200"
      case "invited": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "inactive": return "bg-gray-100 text-gray-800 border-gray-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || member.role === selectedRole
    return matchesSearch && matchesRole
  })

  const handleInviteMember = () => {
    if (!newMember.name || !newMember.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    const member = {
      id: (teamMembers.length + 1).toString(),
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      avatar: "",
      status: "invited",
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      lastActive: "Never"
    }

    setTeamMembers([...teamMembers, member])
    setNewMember({ name: "", email: "", role: "viewer" })
    setInviteDialogOpen(false)
    
    toast({
      title: "Invitation Sent",
      description: `Successfully invited ${newMember.name} to join the team.`,
    })
  }

  const handleRemoveMember = (memberId: string, memberName: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== memberId))
    toast({
      title: "Member Removed",
      description: `${memberName} has been removed from the team.`,
    })
  }

  const handleChangeRole = (memberId: string, newRole: string, memberName: string) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === memberId ? { ...member, role: newRole } : member
    ))
    toast({
      title: "Role Updated",
      description: `${memberName}'s role has been changed to ${getRoleInfo(newRole).label}.`,
    })
  }

  const handleSuspendUser = (memberId: string, memberName: string) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === memberId ? { ...member, status: "inactive" } : member
    ))
    toast({
      title: "User Suspended",
      description: `${memberName} has been suspended.`,
      variant: "destructive"
    })
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
    toast({
      title: "Team Data Refreshed",
      description: "Team member information has been updated.",
    })
  }

  const exportTeamData = () => {
    const csvData = teamMembers.map(member => 
      `${member.name},${member.email},${member.role},${member.status},${member.joinedDate},${member.lastActive}`
    ).join('\n')
    
    const blob = new Blob([`Name,Email,Role,Status,Joined Date,Last Active\n${csvData}`], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'team-members.csv'
    a.click()
    
    toast({
      title: "Export Successful",
      description: "Team data has been exported to CSV.",
    })
  }

  // Data for charts
  const roleDistribution = roles.map(role => ({
    name: role.label,
    value: teamMembers.filter(member => member.role === role.value).length,
    color: role.value === 'admin' ? '#EAB308' : role.value === 'editor' ? '#3B82F6' : '#6B7280'
  }))

  const statusData = [
    { name: 'Active', value: teamMembers.filter(m => m.status === 'active').length, color: '#10B981' },
    { name: 'Invited', value: teamMembers.filter(m => m.status === 'invited').length, color: '#F59E0B' },
    { name: 'Inactive', value: teamMembers.filter(m => m.status === 'inactive').length, color: '#6B7280' }
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team members, roles, and permissions.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportTeamData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <V0Button 
            prompt="Create a comprehensive team management interface with user roles, permissions, and member cards"
            code={TEAM_CODE}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              +1 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.filter(m => m.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((teamMembers.filter(m => m.status === 'active').length / teamMembers.length) * 100)}% of total members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.filter(m => m.status === 'invited').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Waiting for response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.filter(m => m.role === 'admin').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Full access members
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Role Distribution</CardTitle>
            <CardDescription>Team members by role</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={roleDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {roleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Member Status</CardTitle>
            <CardDescription>Team member activity status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-muted-foreground" fontSize={12} />
                <YAxis className="text-muted-foreground" fontSize={12} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage your team members and their permissions
              </CardDescription>
            </div>
            <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                  <DialogDescription>
                    Send an invitation to join your team.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newMember.name}
                      onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                      placeholder="colleague@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={newMember.role} onValueChange={(value) => setNewMember({...newMember, role: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            <div className="flex items-center gap-2">
                              <role.icon className={`h-4 w-4 ${role.color}`} />
                              <div>
                                <div className="font-medium">{role.label}</div>
                                <div className="text-xs text-muted-foreground">
                                  {role.description}
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleInviteMember}>Send Invitation</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search members..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredMembers.length} of {teamMembers.length} members
            </p>
          </div>

          <div className="space-y-3">
            {filteredMembers.map((member) => {
              const roleInfo = getRoleInfo(member.role)
              const RoleIcon = roleInfo.icon

              return (
                <Card key={member.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold">{member.name}</h4>
                          <Badge 
                            variant="outline" 
                            className={getStatusColor(member.status)}
                          >
                            {member.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{member.email}</span>
                          <span>•</span>
                          <span>Joined {member.joinedDate}</span>
                          <span>•</span>
                          <span>Active {member.lastActive}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <RoleIcon className={`h-4 w-4 ${roleInfo.color}`} />
                        <span className="font-medium">{roleInfo.label}</span>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => {
                            toast({
                              title: "Email Sent",
                              description: `Email sent to ${member.name}`,
                            })
                          }}>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleChangeRole(member.id, member.role === 'viewer' ? 'editor' : 'viewer', member.name)}>
                            <Settings className="mr-2 h-4 w-4" />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleSuspendUser(member.id, member.name)}>
                            <UserX className="mr-2 h-4 w-4" />
                            Suspend User
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleRemoveMember(member.id, member.name)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}