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

export const FamilySchema = z.object({
    familyName: z.string().min(1, { message: "Family name cannot be empty" }),
    email: z.string().min(1, { message: "Email cannot be empty" }).refine((e) => {
        return !e.includes("@")
    }, { message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Phone cannot be empty" }),
    status: z.string().min(1, { message: "Family status cannot be empty" }),
    isActive: z.boolean(),
    address: z.string().min(1, { message: "Address cannot be empty" }),
});

export const GroupSchema = z.object({
    groupName: z.string().min(1, { message: "Group name cannot be empty" }),
    category: z.string().min(1, { message: "Category cannot be empty" }),
    status: z.string().min(1, { message: "Family status cannot be empty" }),
    description: z.string().min(1, { message: "Description cannot be empty" }),
});

export const TitheSchema = z.object({
    amount: z.string().min(1, { message: "Amount name cannot be empty" }),
    date: z.string().min(1, { message: "Date cannot be empty" }),
    transactionId: z.string().min(0, { message: "Transaction Id status cannot be empty" }),
    paymentMethod: z.string().min(1, { message: "Payment method cannot be empty" }),
});

export const OfferingSchema = z.object({
    amount: z.string().min(1, { message: "Amount name cannot be empty" }),
    date: z.string().min(1, { message: "Date cannot be empty" }),
    transactionId: z.string().min(0, { message: "Transaction Id status cannot be empty" }),
    paymentMethod: z.string().min(1, { message: "Payment method cannot be empty" }),
    fundName: z.string().min(1, { message: "Fund name method cannot be empty" }),
    reason: z.string().min(0, { message: "Reason method cannot be empty" }),
    isAnonymous: z.boolean()
});