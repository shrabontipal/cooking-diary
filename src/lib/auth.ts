import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  createdAt: z.string().datetime(),
});

export type User = z.infer<typeof userSchema>;

export type CurrentUser = {
  id: number;
  username: string;
  email: string;
  isLoggedIn: boolean;
};

const USERS_STORAGE_KEY = 'cookingDiaryUsers';
const CURRENT_USER_KEY = 'cookingDiaryCurrentUser';

/**
 * Register a new user
 */
export const registerUser = (userData: Omit<User, 'id' | 'createdAt'>): { success: boolean; message?: string } => {
  try {
    const existingUsersJSON = localStorage.getItem(USERS_STORAGE_KEY);
    const existingUsers: User[] = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];
    
    const userExists = existingUsers.some(user => user.email === userData.email);
    
    if (userExists) {
      return { 
        success: false, 
        message: 'A user with this email already exists. Please use a different email or login.' 
      };
    }
    
    const newUser: User = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    
    const currentUser: CurrentUser = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      isLoggedIn: true,
    };
    
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    
    return { success: true };
  } catch (error) {
    console.error('Error registering user:', error);
    return { 
      success: false, 
      message: 'Failed to register user. Please try again.' 
    };
  }
};

/**
 * Login a user
 */
export const loginUser = (email: string, password: string): { success: boolean; message?: string; user?: CurrentUser } => {
  try {
    const usersJSON = localStorage.getItem(USERS_STORAGE_KEY);
    const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return { 
        success: false, 
        message: 'Invalid email or password. Please try again.' 
      };
    }
    
    const currentUser: CurrentUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      isLoggedIn: true,
    };
    
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    
    return { 
      success: true, 
      user: currentUser 
    };
  } catch (error) {
    console.error('Error logging in:', error);
    return { 
      success: false, 
      message: 'Login failed. Please try again.' 
    };
  }
};

/**
 * Get the current logged in user
 */
export const getCurrentUser = (): CurrentUser | null => {
  try {
    const currentUserJSON = localStorage.getItem(CURRENT_USER_KEY);
    return currentUserJSON ? JSON.parse(currentUserJSON) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Logout the current user
 */
export const logoutUser = (): { success: boolean } => {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error);
    return { success: false };
  }
};

/**
 * Check if a user is logged in
 */
export const isLoggedIn = (): boolean => {
  const currentUser = getCurrentUser();
  return !!currentUser?.isLoggedIn;
};
