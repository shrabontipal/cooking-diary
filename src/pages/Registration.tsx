import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'

import { Button } from '../components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { useToast } from '../components/ui/use-toast'
import { registerUser } from '../lib/auth'

const formSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

const Registration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const result = registerUser({
      username: data.username,
      email: data.email,
      password: data.password
    });
    
    if (result.success) {
      toast({
        title: "Registration successful!",
        description: "Your account has been created. Welcome to Cooking Diary!",
      });
      navigate('/');
    } else {
      toast({
        title: "Registration failed",
        description: result.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 py-12">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-6 text-purple-700"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <Card className="mx-auto max-w-md border-pink-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-t-xl">
            <CardTitle className="text-3xl font-bold text-center text-purple-700" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Create an Account
            </CardTitle>
            <CardDescription className="text-center text-purple-600" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Join Cooking Diary to save and share your favorite recipes
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-purple-700">Username</FormLabel>
                      <FormControl>
                        <Input placeholder="your_username" {...field} className="border-pink-200 focus-visible:ring-purple-400" />
                      </FormControl>
                      <FormMessage className="text-pink-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-purple-700">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} className="border-pink-200 focus-visible:ring-purple-400" />
                      </FormControl>
                      <FormMessage className="text-pink-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-purple-700">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            {...field} 
                            className="border-pink-200 focus-visible:ring-purple-400 pr-10" 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-pink-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-purple-700">Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            {...field} 
                            className="border-pink-200 focus-visible:ring-purple-400 pr-10" 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-pink-500" />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-pink-500 hover:bg-pink-600 mt-6"
                >
                  Sign Up
                </Button>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex flex-col bg-gradient-to-r from-purple-50 to-pink-50 rounded-b-xl">
            <p className="text-center text-purple-600 mt-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Already have an account? <Button variant="link" className="text-pink-500 p-0" onClick={() => navigate('/login')}>Sign In</Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Registration;
