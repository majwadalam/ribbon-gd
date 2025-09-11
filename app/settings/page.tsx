"use client"
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Key, 
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X,
  Code,
  ExternalLink
} from 'lucide-react';

// Type definitions
interface ToastType {
  id: string;
  title: string;
  description?: string;
  variant: "default" | "destructive";
  open: boolean;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  bio: string;
  timezone: string;
  avatar: string;
}

interface NotificationSettings {
  marketing: boolean;
  security: boolean;
  payments: boolean;
  realTime: boolean;
  weeklyReports: boolean;
}

interface PasswordData {
  current: string;
  new: string;
  confirm: string;
}

interface ApiKey {
  id: number;
  name: string;
  key: string;
  type: 'production' | 'development';
}

interface Session {
  id: number;
  name: string;
  device: string;
  location: string;
  active: boolean;
}

interface UseToastReturn {
  toasts: ToastType[];
  toast: (options: { title: string; description?: string; variant?: "default" | "destructive" }) => { id: string; dismiss: () => void };
  dismiss: (toastId: string) => void;
}

// Toast Hook
const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const toast = ({ title, description, variant = "default" }: { 
    title: string; 
    description?: string; 
    variant?: "default" | "destructive" 
  }) => {
    const id = Date.now().toString();
    const newToast: ToastType = {
      id,
      title,
      description,
      variant,
      open: true
    };

    setToasts(prev => [...prev, newToast]);

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);

    return {
      id,
      dismiss: () => setToasts(prev => prev.filter(t => t.id !== id))
    };
  };

  const dismiss = (toastId: string) => {
    setToasts(prev => prev.filter(t => t.id !== toastId));
  };

  return { toasts, toast, dismiss };
};

// Toast Component Props
interface ToasterProps {
  toasts: ToastType[];
  dismiss: (toastId: string) => void;
}

// Toast Component
const Toaster: React.FC<ToasterProps> = ({ toasts, dismiss }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 shadow-lg transition-all animate-in slide-in-from-top-2 ${
            toast.variant === "destructive"
              ? "border-red-200 bg-red-50 text-red-900"
              : "border-green-200 bg-green-50 text-green-900"
          }`}
        >
          <div className="flex items-center space-x-2">
            {toast.variant === "destructive" ? (
              <X className="h-4 w-4 text-red-500" />
            ) : (
              <Check className="h-4 w-4 text-green-500" />
            )}
            <div>
              {toast.title && <div className="text-sm font-semibold">{toast.title}</div>}
              {toast.description && <div className="text-sm">{toast.description}</div>}
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={() => dismiss(toast.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

const Settings: React.FC = () => {
  const { toasts, toast, dismiss } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile State
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    company: 'Acme Inc.',
    bio: 'Software engineer passionate about building great user experiences.',
    timezone: 'utc-5',
    avatar: '/avatars/01.png'
  });

  // Notification States
  const [notifications, setNotifications] = useState<NotificationSettings>({
    marketing: false,
    security: true,
    payments: true,
    realTime: true,
    weeklyReports: false
  });

  // Security States
  const [passwords, setPasswords] = useState<PasswordData>({
    current: '',
    new: '',
    confirm: ''
  });

  // API States
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: 1, name: 'Production API Key', key: 'rk_live_51H7vX2eZvKYlo2C...', type: 'production' },
    { id: 2, name: 'Development API Key', key: 'rk_test_4eC39HqLyjWDarjtT1zdp7dc', type: 'development' }
  ]);

  // Active Sessions State
  const [sessions, setSessions] = useState<Session[]>([
    { id: 1, name: 'Current Session', device: 'Chrome on MacOS', location: 'San Francisco, CA', active: true },
    { id: 2, name: 'iPhone', device: 'Mobile App', location: 'Last seen 2 hours ago', active: false }
  ]);

  // Handle Profile Updates
  const handleProfileUpdate = (field: keyof ProfileData, value: string): void => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const saveProfile = (): void => {
    toast({
      title: "Success",
      description: "Profile updated successfully!",
      variant: "default"
    });
  };

  // Handle Avatar Upload
  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit
        toast({
          title: "Error",
          description: "File size must be less than 1MB",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string;
        if (result) {
          setProfileData(prev => ({ ...prev, avatar: result }));
          toast({
            title: "Success",
            description: "Avatar uploaded successfully!",
            variant: "default"
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Notification Updates
  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean): void => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Success",
      description: "Notification preferences updated!",
      variant: "default"
    });
  };

  // Handle Password Update
  const updatePassword = (): void => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast({
        title: "Error",
        description: "Please fill in all password fields",
        variant: "destructive"
      });
      return;
    }

    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive"
      });
      return;
    }

    if (passwords.new.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive"
      });
      return;
    }

    setPasswords({ current: '', new: '', confirm: '' });
    toast({
      title: "Success",
      description: "Password updated successfully!",
      variant: "default"
    });
  };

  // Handle Session Revoke
  const revokeSession = (sessionId: number): void => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    toast({
      title: "Success",
      description: "Session revoked successfully!",
      variant: "default"
    });
  };

  // Handle API Key Actions
  const generateApiKey = (): void => {
    const newKey: ApiKey = {
      id: apiKeys.length + 1,
      name: `API Key ${apiKeys.length + 1}`,
      key: `rk_${Math.random().toString(36).substring(2, 15)}`,
      type: 'development'
    };
    setApiKeys(prev => [...prev, newKey]);
    toast({
      title: "Success",
      description: "New API key generated!",
      variant: "default"
    });
  };

  const deleteApiKey = (keyId: number): void => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId));
    toast({
      title: "Success",
      description: "API key deleted successfully!",
      variant: "default"
    });
  };

  return (
    <>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account settings and preferences.
            </p>
          </div>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
                    const registryUrl = `${baseUrl}/r/settings.json`
                    const v0Url = `https://v0.dev/chat/api/open?url=${encodeURIComponent(registryUrl)}`
                    window.open(v0Url, '_blank', 'noopener,noreferrer')
                  }}
                  className="flex items-center gap-2"
                  aria-label="Open in v0"
                >
                  <Code className="h-4 w-4" />
                  <span className="hidden sm:inline">Open in v0</span>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open this component in v0 for AI-powered editing</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your profile information and how others see you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profileData.avatar} />
                      <AvatarFallback>
                        {profileData.firstName[0]}{profileData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Photo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, GIF or PNG. 1MB Max.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={profileData.firstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProfileUpdate('firstName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={profileData.lastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProfileUpdate('lastName', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profileData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProfileUpdate('email', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      value={profileData.company}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProfileUpdate('company', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      value={profileData.bio}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleProfileUpdate('bio', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={profileData.timezone} 
                      onValueChange={(value: string) => handleProfileUpdate('timezone', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-8">Pacific Standard Time (UTC-8)</SelectItem>
                        <SelectItem value="utc-7">Mountain Standard Time (UTC-7)</SelectItem>
                        <SelectItem value="utc-6">Central Standard Time (UTC-6)</SelectItem>
                        <SelectItem value="utc-5">Eastern Standard Time (UTC-5)</SelectItem>
                        <SelectItem value="utc+0">Greenwich Mean Time (UTC+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={saveProfile}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Plan</span>
                    <Badge>Pro</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Member since</span>
                    <span className="text-sm text-muted-foreground">Jan 2024</span>
                  </div>
                  <Separator />
                  <Button variant="outline" className="w-full">
                    Upgrade Plan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive and how.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Marketing emails</div>
                        <div className="text-sm text-muted-foreground">
                          Receive emails about new products and features
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.marketing}
                        onCheckedChange={(checked: boolean) => handleNotificationChange('marketing', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Security alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Get notified about account security events
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.security}
                        onCheckedChange={(checked: boolean) => handleNotificationChange('security', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Payment notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Alerts about billing and payments
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.payments}
                        onCheckedChange={(checked: boolean) => handleNotificationChange('payments', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Push Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Real-time updates</div>
                        <div className="text-sm text-muted-foreground">
                          Get instant notifications for important events
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.realTime}
                        onCheckedChange={(checked: boolean) => handleNotificationChange('realTime', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Weekly reports</div>
                        <div className="text-sm text-muted-foreground">
                          Summary of your account activity
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.weeklyReports}
                        onCheckedChange={(checked: boolean) => handleNotificationChange('weeklyReports', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password to keep your account secure.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      type="password" 
                      value={passwords.current}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type="password" 
                      value={passwords.new}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      value={passwords.confirm}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                    />
                  </div>
                  <Button onClick={updatePassword}>Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Authenticator App</div>
                      <div className="text-sm text-muted-foreground">
                        Use an authenticator app to generate codes
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => toast({
                        title: "2FA Setup",
                        description: "Two-factor authentication setup started!",
                        variant: "default"
                      })}
                    >
                      Setup
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>
                    Manage your active sessions across devices.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{session.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {session.device} • {session.location}
                        </div>
                      </div>
                      {session.active ? (
                        <Badge variant="secondary">Active</Badge>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => revokeSession(session.id)}
                        >
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>
                    Manage your subscription and billing details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Pro Plan</div>
                      <div className="text-sm text-muted-foreground">
                        $29/month • Next billing date: Feb 15, 2024
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => toast({
                          title: "Plan Change",
                          description: "Plan change initiated!",
                          variant: "default"
                        })}
                      >
                        Change Plan
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => toast({
                          title: "Cancellation",
                          description: "Subscription cancellation processed!",
                          variant: "destructive"
                        })}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your payment methods and billing information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-6 w-6" />
                      <div>
                        <div className="font-medium">•••• •••• •••• 4242</div>
                        <div className="text-sm text-muted-foreground">
                          Expires 12/2025
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">Default</Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast({
                          title: "Payment Method",
                          description: "Payment method edit initiated!",
                          variant: "default"
                        })}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => toast({
                      title: "Payment Method",
                      description: "Add payment method initiated!",
                      variant: "default"
                    })}
                  >
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>
                  Manage API keys for accessing our services programmatically.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Key className="h-5 w-5" />
                        <div>
                          <div className="font-medium">{apiKey.name}</div>
                          <div className="text-sm text-muted-foreground font-mono">
                            {apiKey.type === 'production' && showApiKey ? apiKey.key : `${apiKey.key.substring(0, 12)}...`}
                            {apiKey.type === 'development' && `${apiKey.key.substring(0, 12)}...`}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {apiKey.type === 'production' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowApiKey(!showApiKey)}
                          >
                            {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteApiKey(apiKey.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button onClick={generateApiKey}>Generate New Key</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Toaster toasts={toasts} dismiss={dismiss} />
    </>
  );
};

export default Settings;