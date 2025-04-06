
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeCheck, Briefcase, Calendar, Edit, Github, GraduationCap, Mail, MapPin, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

// Form validation schema
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z.string().max(160, { message: "Bio must not be longer than 160 characters." }).optional(),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  location: z.string().optional(),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Default values for the form
const defaultValues: Partial<ProfileFormValues> = {
  name: "John Smith",
  email: "john.smith@example.com",
  bio: "Software developer with a passion for building user-friendly applications.",
  title: "Software Developer",
  location: "San Francisco, CA",
  website: "https://github.com/johnsmith",
};

const Profile = () => {
  const { toast } = useToast();
  const [skills, setSkills] = useState([
    { name: "React", level: "Advanced", verified: true },
    { name: "TypeScript", level: "Intermediate", verified: true },
    { name: "Node.js", level: "Intermediate", verified: false },
    { name: "Python", level: "Beginner", verified: false },
    { name: "UI/UX Design", level: "Beginner", verified: false },
  ]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    console.log(data);
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>
            
            <div className="grid gap-6 md:grid-cols-12">
              {/* Profile Summary Card */}
              <Card className="md:col-span-4">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                      <AvatarFallback className="text-lg bg-mentor-purple text-white">JS</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle>{defaultValues.name}</CardTitle>
                  <CardDescription className="text-base">{defaultValues.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} />
                      <span>{defaultValues.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={16} />
                      <span>{defaultValues.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Github size={16} />
                      <a href={defaultValues.website} className="text-mentor-purple hover:underline">
                        GitHub Profile
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase size={16} />
                      <span>4 years experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <GraduationCap size={16} />
                      <span>B.S. Computer Science</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile information here.
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Email address" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Professional Title</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g. Software Developer" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="location"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Location</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g. San Francisco, CA" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="website"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Website</FormLabel>
                                  <FormControl>
                                    <Input placeholder="https://example.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="bio"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Bio</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Tell us a little about yourself"
                                      className="resize-none"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Brief description for your profile. Max 160 characters.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <DialogFooter>
                              <Button type="submit">Save changes</Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Details */}
              <div className="md:col-span-8 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{defaultValues.bio}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Skills & Expertise</CardTitle>
                      <Button variant="ghost" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Manage Skills
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{skill.name}</span>
                              {skill.verified && (
                                <BadgeCheck size={16} className="text-mentor-purple" />
                              )}
                            </div>
                            <span className="text-sm text-gray-500">{skill.level}</span>
                          </div>
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-mentor-purple" 
                              style={{ 
                                width: skill.level === 'Advanced' ? '90%' : 
                                      skill.level === 'Intermediate' ? '60%' : '30%'
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Learning Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="current">
                      <TabsList className="mb-4">
                        <TabsTrigger value="current">Current Courses</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                        <TabsTrigger value="saved">Saved</TabsTrigger>
                      </TabsList>
                      <TabsContent value="current">
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium">Advanced React Patterns</h3>
                                <p className="text-sm text-gray-500">Frontend Masters</p>
                              </div>
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                In Progress
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-mentor-purple" style={{ width: '65%' }} />
                            </div>
                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                              <span>65% complete</span>
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                Last accessed: 2 days ago
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium">TypeScript for React Developers</h3>
                                <p className="text-sm text-gray-500">Udemy</p>
                              </div>
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                In Progress
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-mentor-purple" style={{ width: '30%' }} />
                            </div>
                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                              <span>30% complete</span>
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                Last accessed: 5 days ago
                              </span>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="completed">
                        <div className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">React Fundamentals</h3>
                              <p className="text-sm text-gray-500">Coursera</p>
                            </div>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Completed
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-green-500" style={{ width: '100%' }} />
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-gray-500">
                            <span>Completed on April 2, 2025</span>
                            <span className="text-mentor-purple">View Certificate</span>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="saved">
                        <div className="text-center py-8 text-gray-500">
                          <User className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                          <h3 className="font-medium text-gray-700 mb-1">No saved courses yet</h3>
                          <p className="text-sm">Browse the learning resources to find courses to save for later.</p>
                          <Button variant="outline" className="mt-4">
                            Browse Courses
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
