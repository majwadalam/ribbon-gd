"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { V0Button } from "@/components/v0-button"
import { Eye, EyeOff, Github, Mail, User, Building, Check } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

// Complete code string for V0 button - includes the entire component
const SIGNUP_CODE = `"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { V0Button } from "@/components/v0-button"
import { Eye, EyeOff, Github, Mail, User, Building, Check } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function SignUp() {
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false)
  // State for multi-step form progression
  const [currentStep, setCurrentStep] = useState(1)

  // Multi-step form configuration
  const steps = [
    { id: 1, title: "Account", description: "Create your account" },
    { id: 2, title: "Profile", description: "Tell us about yourself" },
    { id: 3, title: "Complete", description: "You're all set!" },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Logo and Name */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-semibold">
            R
          </div>
          <span className="text-2xl font-bold">Ribbon</span>
        </div>

        {/* Progress Steps Indicator */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={\`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium \${
                currentStep >= step.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              }\`}>
                {currentStep > step.id ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.id
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={\`w-20 h-0.5 mx-4 \${
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                }\`} />
              )}
            </div>
          ))}
        </div>

        {/* Main Sign Up Form Card */}
        <Card className="glass-effect">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>
              {steps[currentStep - 1].description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1: Account Creation */}
            {currentStep === 1 && (
              <>
                {/* Social Sign Up Options */}
                <div className="grid gap-2 grid-cols-2">
                  <Button variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
                
                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Email and Password Form */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button 
                    type="button" 
                    className="w-full"
                    onClick={() => setCurrentStep(2)}
                  >
                    Continue
                  </Button>
                </div>
              </>
            )}

            {/* Step 2: Profile Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid gap-2 grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Acme Inc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Job Title</Label>
                  <Input
                    id="role"
                    placeholder="Software Engineer"
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    className="w-full"
                    onClick={() => setCurrentStep(3)}
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Completion */}
            {currentStep === 3 && (
              <div className="text-center space-y-4">
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                {/* Success Message */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Account Created!</h3>
                  <p className="text-muted-foreground text-sm">
                    We've sent a verification email to your inbox. Please check your email and verify your account.
                  </p>
                </div>
                {/* Continue to Login Button */}
                <Button className="w-full" asChild>
                  <Link href="/login">
                    Continue to Login
                  </Link>
                </Button>
              </div>
            )}

            {/* Login Link - Only show on steps 1 and 2 */}
            {currentStep < 3 && (
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* V0 Button for editing */}
        <div className="flex justify-center">
          <V0Button 
            prompt="just render the ui as it is of this page , dont make any changes, just as it is"
            code={SIGNUP_CODE}
            className="text-xs"
          />
        </div>
      </div>
    </div>
  )
}`

export default function SignUp() {
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false)
  // State for multi-step form progression
  const [currentStep, setCurrentStep] = useState(1)

  // Multi-step form configuration
  const steps = [
    { id: 1, title: "Account", description: "Create your account" },
    { id: 2, title: "Profile", description: "Tell us about yourself" },
    { id: 3, title: "Complete", description: "You're all set!" },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Logo and Name */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-semibold">
            R
          </div>
          <span className="text-2xl font-bold">Ribbon</span>
        </div>

        {/* Progress Steps Indicator */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${
                currentStep >= step.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {currentStep > step.id ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.id
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-20 h-0.5 mx-4 ${
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Main Sign Up Form Card */}
        <Card className="glass-effect">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>
              {steps[currentStep - 1].description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1: Account Creation */}
            {currentStep === 1 && (
              <>
                {/* Social Sign Up Options */}
                <div className="grid gap-2 grid-cols-2">
                  <Button variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
                
                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Email and Password Form */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button 
                    type="button" 
                    className="w-full"
                    onClick={() => setCurrentStep(2)}
                  >
                    Continue
                  </Button>
                </div>
              </>
            )}

            {/* Step 2: Profile Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid gap-2 grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Acme Inc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Job Title</Label>
                  <Input
                    id="role"
                    placeholder="Software Engineer"
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    className="w-full"
                    onClick={() => setCurrentStep(3)}
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Completion */}
            {currentStep === 3 && (
              <div className="text-center space-y-4">
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                {/* Success Message */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Account Created!</h3>
                  <p className="text-muted-foreground text-sm">
                    We've sent a verification email to your inbox. Please check your email and verify your account.
                  </p>
                </div>
                {/* Continue to Login Button */}
                <Button className="w-full" asChild>
                  <Link href="/login">
                    Continue to Login
                  </Link>
                </Button>
              </div>
            )}

            {/* Login Link - Only show on steps 1 and 2 */}
            {currentStep < 3 && (
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* V0 Button for editing */}
        <div className="flex justify-center">
          <V0Button 
            prompt="just render the ui as it is of this page , dont make any changes, just as it is"
            code={SIGNUP_CODE}
            className="text-xs"
          />
        </div>
      </div>
    </div>
  )
}