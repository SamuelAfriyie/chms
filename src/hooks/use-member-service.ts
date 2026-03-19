import { configFn } from "@/lib/api/config/axios";
import memberService from "@/lib/api/services/member-service";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface Member {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    phone: string;
    email: string;
    ministry: string;
    joinDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface MemberListResponse {
    data: Member[];
    total: number;
    page: number;
    limit: number;
}

export const useCreateMember = () => {
    return useMutation({
        mutationFn: (data: Record<string, any>) =>
            configFn<Member>(memberService.create(data)),
    });
};

export const useGetMembers = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ["members", params],
        queryFn: () => configFn<MemberListResponse>(memberService.getAll(params)),
    });
};
