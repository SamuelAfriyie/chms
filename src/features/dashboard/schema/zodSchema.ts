import z from "zod";

export const MemberSchema = z.object({
    firstName: z.string().min(1, { message: "First name cannot be empty" }),
    lastName: z.string().min(1, { message: "Last name cannot be empty" }),
    email: z.string().min(1, { message: "Email cannot be empty" }).refine((e) => {
        return !e.includes("@")
    }, { message: "Invalid email address" }),
    dob: z.date().refine(
        (date) => date <= new Date(),
        { message: 'Date cannot be in the future' }
    ),
    membershipDate: z.date().refine(
        (date) => date <= new Date(),
        { message: 'Membership Date cannot be in the future' }
    ),
    phone: z.string().min(1, { message: "Phone cannot be empty" }),
    gender: z.string().min(1, { message: "Gender cannot be empty" }),
    maritalStatus: z.boolean(),
    baptismStatus: z.string().min(1, { message: "Baptism Status cannot be empty" }),
    membershipStatus: z.string().min(1, { message: "Membership Status cannot be empty" }),
    isActive: z.boolean(),
    address: z.string().min(1, { message: "Address cannot be empty" }),
});

export const VisitorNewConvertSchema = z.object({
    firstName: z.string().min(1, { message: "First name cannot be empty" }),
    lastName: z.string().min(1, { message: "Last name cannot be empty" }),
    email: z.string().min(1, { message: "Email cannot be empty" }).refine((e) => {
        return !e.includes("@")
    }, { message: "Invalid email address" }),
    dob: z.date().refine(
        (date) => date <= new Date(),
        { message: 'Date cannot be in the future' }
    ),
    joinedDate: z.date().refine(
        (date) => date <= new Date(),
        { message: 'Membership Date cannot be in the future' }
    ),
    phone: z.string().min(1, { message: "Phone cannot be empty" }),
    gender: z.string().min(1, { message: "Gender cannot be empty" }),
    maritalStatus: z.boolean(),
    isActive: z.boolean(),
    address: z.string().min(1, { message: "Address cannot be empty" }),
});