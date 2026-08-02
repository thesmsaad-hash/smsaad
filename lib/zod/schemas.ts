import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
});

export const authLoginSchema = z.object({
  email: z.string().email({ message: "Valid email is required." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export const authRegisterSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required." }),
  email: z.string().email({ message: "Valid email is required." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const docContentSchema = z.object({
  title: z.string().min(3, { message: "Title is required." }),
  slug: z.string().min(3, { message: "Slug is required." }),
  category: z.string().min(1, { message: "Category is required." }),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
  description: z.string().min(10, { message: "Description is required." }),
  content: z.string().min(20, { message: "Content must be substantial." }),
});
