import z from "zod";

export const MemberSchema = z.object({
    firstName: z.string().min(1, { message: "First name cannot be empty" }),
    lastName: z.string().min(1, { message: "Last name cannot be empty" }),
    email: z.string().min(1, { message: "Email cannot be empty" }),
    dob: z.date().refine(
        (date) => date <= new Date(),
        { message: 'Date cannot be in the future' }
    ),
    joinDate: z.date().refine(
        (date) => date <= new Date(),
        { message: 'Join date cannot be in the future' }
    ),
    phone: z.string().min(1, { message: "Phone cannot be empty" }),
    gender: z.string().min(1, { message: "Gender cannot be empty" }),
    maritalStatus: z.boolean(),
    ministry: z.string().min(1, { message: "Ministry cannot be empty" }),
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
    memberId: z.string().min(1, { message: "Member is required" }),
    amount: z.string().min(1, { message: "Amount cannot be empty" }),
    date: z.string().min(1, { message: "Date cannot be empty" }),
    reference: z.string().min(0),
    paymentMethod: z.string().min(1, { message: "Payment method cannot be empty" }),
});

export const OfferingSchema = z.object({
    memberId: z.string().min(1, { message: "Member is required" }),
    amount: z.string().min(1, { message: "Amount cannot be empty" }),
    date: z.string().min(1, { message: "Date cannot be empty" }),
    reference: z.string().min(0),
    paymentMethod: z.string().min(1, { message: "Payment method cannot be empty" }),
});

export const ContributionSchema = z.object({
    memberId: z.string().min(1, { message: "Member ID cannot be empty" }),
    contributionType: z.string().min(1, { message: "Contribution type cannot be empty" }),
    amount: z.string().min(1, { message: "Amount cannot be empty" }),
    paymentMethod: z.string().min(1, { message: "Payment method cannot be empty" }),
    reference: z.string().min(0),
    date: z.string().min(1, { message: "Date cannot be empty" }),
});

export const ExpenseSchema = z.object({
    title: z.string().min(1, { message: "Title cannot be empty" }),
    description: z.string().min(0),
    amount: z.string().min(1, { message: "Amount cannot be empty" }),
    category: z.string().min(1, { message: "Category cannot be empty" }),
    department: z.string().min(1, { message: "Department cannot be empty" }),
    expenseDate: z.string().min(1, { message: "Expense date cannot be empty" }),
});

export const DepartmentSchema = z.object({
    name: z.string().min(1, { message: "Department name cannot be empty" }),
    description: z.string().min(0),
});

export const AssignLeaderSchema = z.object({
    leaderId: z.string().min(1, { message: "Leader ID cannot be empty" }),
});

export const FacilitatorSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    role: z.string().min(1, { message: "Role cannot be empty" }),
    ministryType: z.string().min(1, { message: "Ministry type cannot be empty" }),
    phone: z.string().min(1, { message: "Phone cannot be empty" }),
    email: z.string().min(1, { message: "Email cannot be empty" }),
});