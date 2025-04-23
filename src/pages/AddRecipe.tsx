import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Mic, Video, MessageSquare } from 'lucide-react'

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
import { Textarea } from '../components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useToast } from '../components/ui/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

const generateId = () => {
  return Date.now();
};

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long' }),
  source: z.string().optional(),
  tags: z.string().transform(val => val.split(',').map((tag: string) => tag.trim())),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL' }).optional().or(z.literal('')),
  mediaType: z.enum(['text', 'audio', 'video']).default('text'),
  mediaContent: z.any().optional(),
  instructions: z.string().optional(),
  ingredients: z.string().optional(),
  prepTime: z.string().optional(),
  cookTime: z.string().optional(),
  servings: z.string().transform(val => (val ? parseInt(val, 10) : undefined)).optional(),
});


const AddRecipe = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'text' | 'audio' | 'video'>('text');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      source: '',
      tags: '',
      imageUrl: '',
      mediaType: 'text',
      instructions: '',
      ingredients: '',
      prepTime: '',
      cookTime: '',
      servings: '',
    },
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'text' | 'audio' | 'video');
    form.setValue('mediaType', value as 'text' | 'audio' | 'video');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        form.setValue('imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue('mediaContent', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveRecipe = (data: z.infer<typeof formSchema>) => {
    const storedRecipes = localStorage.getItem('recipes');
    const recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
    
    const formattedTags = Array.isArray(data.tags) ? data.tags : 
      typeof data.tags === 'string' ? data.tags.split(',').map((tag: string) => tag.trim()) : [];
    
    const newRecipe = {
      id: generateId(),
      title: data.title,
      description: data.description,
      source: data.source || 'Personal Recipe',
      imageUrl: imagePreview || data.imageUrl || `https://source.unsplash.com/featured/800x600/?${formattedTags[0]?.toLowerCase() || 'food'},cooking`,
      tags: formattedTags,
      instructions: data.instructions ? data.instructions.split('\n') : [],
      ingredients: data.ingredients ? data.ingredients.split('\n') : [],
      prepTime: data.prepTime,
      cookTime: data.cookTime,
      servings: data.servings,
      mediaType: data.mediaType,
      mediaUrl: data.mediaContent
    };
    
    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    
    return newRecipe;
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      const newRecipe = saveRecipe(data);
      
      toast({
        title: "Recipe added successfully!",
        description: `"${newRecipe.title}" has been added to your collection.`,
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Error adding recipe",
        description: "There was a problem saving your recipe. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 text-purple-700"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
      
      <Card className="mx-auto max-w-2xl border-pink-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-t-xl">
          <CardTitle className="text-3xl font-bold text-center text-purple-700" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Add New Recipe
          </CardTitle>
          <CardDescription className="text-center text-purple-600" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Share your culinary creations with the community
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Recipe Information */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-purple-700">Recipe Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Delicious Chocolate Cake" {...field} className="border-pink-200 focus-visible:ring-purple-400" />
                      </FormControl>
                      <FormMessage className="text-pink-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-purple-700">Short Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="A brief description of your recipe" 
                          {...field} 
                          className="border-pink-200 focus-visible:ring-purple-400 min-h-[80px]" 
                        />
                      </FormControl>
                      <FormMessage className="text-pink-500" />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-700">Source (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Family recipe, website, etc." {...field} className="border-pink-200 focus-visible:ring-purple-400" />
                        </FormControl>
                        <FormMessage className="text-pink-500" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-700">Tags (comma separated)</FormLabel>
                        <FormControl>
                          <Input placeholder="Dessert, Chocolate, Easy" {...field} className="border-pink-200 focus-visible:ring-purple-400" />
                        </FormControl>
                        <FormMessage className="text-pink-500" />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Recipe Image */}
                <FormItem>
                  <FormLabel className="text-purple-700">Recipe Image</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="border-pink-200 focus-visible:ring-purple-400"
                      />
                      <p className="text-xs text-purple-500 mt-1">
                        Or provide an image URL below
                      </p>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} className="border-pink-200 focus-visible:ring-purple-400" />
                        </FormControl>
                      )}
                    />
                  </div>
                  {imagePreview && (
                    <div className="mt-2 relative w-40 h-40 overflow-hidden rounded-md border border-pink-200">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </FormItem>
              </div>
              
              {/* Recipe Content Tabs (Text, Audio, Video) */}
              <div className="space-y-4">
                <FormLabel className="text-purple-700">Recipe Content</FormLabel>
                <Tabs defaultValue="text" value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="text" className="flex items-center justify-center">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Text
                    </TabsTrigger>
                    <TabsTrigger value="audio" className="flex items-center justify-center">
                      <Mic className="mr-2 h-4 w-4" />
                      Audio
                    </TabsTrigger>
                    <TabsTrigger value="video" className="flex items-center justify-center">
                      <Video className="mr-2 h-4 w-4" />
                      Video
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="text" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="ingredients"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-purple-700">Ingredients (one per line)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs" 
                              {...field} 
                              className="border-pink-200 focus-visible:ring-purple-400 min-h-[100px]" 
                            />
                          </FormControl>
                          <FormMessage className="text-pink-500" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="instructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-purple-700">Instructions (one step per line)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Preheat oven to 350°F&#10;Mix dry ingredients&#10;Add wet ingredients and stir" 
                              {...field} 
                              className="border-pink-200 focus-visible:ring-purple-400 min-h-[150px]" 
                            />
                          </FormControl>
                          <FormMessage className="text-pink-500" />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="audio" className="space-y-4">
                    <FormItem>
                      <FormLabel className="text-purple-700">Audio Recording</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input 
                            type="file" 
                            accept="audio/*"
                            onChange={handleMediaUpload}
                            className="border-pink-200 focus-visible:ring-purple-400"
                          />
                          <p className="text-sm text-purple-600">
                            Upload an audio file of you explaining the recipe
                          </p>
                        </div>
                      </FormControl>
                      {mediaFile && activeTab === 'audio' && (
                        <div className="mt-2">
                          <p className="text-sm text-green-600">File selected: {mediaFile.name}</p>
                        </div>
                      )}
                    </FormItem>
                  </TabsContent>
                  
                  <TabsContent value="video" className="space-y-4">
                    <FormItem>
                      <FormLabel className="text-purple-700">Video Recording</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input 
                            type="file" 
                            accept="video/*"
                            onChange={handleMediaUpload}
                            className="border-pink-200 focus-visible:ring-purple-400"
                          />
                          <p className="text-sm text-purple-600">
                            Upload a video demonstrating how to prepare the recipe
                          </p>
                        </div>
                      </FormControl>
                      {mediaFile && activeTab === 'video' && (
                        <div className="mt-2">
                          <p className="text-sm text-green-600">File selected: {mediaFile.name}</p>
                        </div>
                      )}
                    </FormItem>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Additional Recipe Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="prepTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-purple-700">Prep Time (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="30" {...field} className="border-pink-200 focus-visible:ring-purple-400" />
                      </FormControl>
                      <FormMessage className="text-pink-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cookTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-purple-700">Cook Time (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="45" {...field} className="border-pink-200 focus-visible:ring-purple-400" />
                      </FormControl>
                      <FormMessage className="text-pink-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="servings"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-purple-700">Servings</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="4" {...field} className="border-pink-200 focus-visible:ring-purple-400" />
                      </FormControl>
                      <FormMessage className="text-pink-500" />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-pink-500 hover:bg-pink-600 mt-6"
              >
                Save Recipe
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddRecipe;
