import { baseApi } from "@/redux/baseApi";
import { ApiEnvelope, GetUserQuery, IsActive, IUser, UpdateMePayload, UpdateMeResponse, UserListResponse } from "@/types";


export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserListResponse, GetUserQuery | void>({
      query: (q) => {
        const params = new URLSearchParams();
        if (q?.page) params.set("page", String(q.page));
        if (q?.limit) params.set("limit", String(q.limit));
        if (q?.searchTerm) params.set("searchTerm", q.searchTerm);
        if (q?.isActive && q.isActive !== "ALL") params.set("isActive", q.isActive);
        if (q?.role && q.role !== "ALL") params.set("role", q.role);
        return {
          url: `/user/all-users?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (res: ApiEnvelope<IUser[]>) => ({
        data: res.data,
        meta: res.meta || { page: 1, limit: res.data?.length ?? 0, total: res.data?.length ?? 0 },
      })
    }),

    approveRejectUser: builder.mutation<IUser, { id: string; isActive: IsActive }>({
      query: ({ id, isActive }) => ({
        url: `/user/approve-reject/${id}`,
        method: "PATCH",
        data: { isActive },
      }),
      transformResponse: (res: ApiEnvelope<IUser>) => res.data,
    }),

    updateMe: builder.mutation<UpdateMeResponse, UpdateMePayload>({
      query: (body) => ({
        url: "/user/update-me",
        method: "PATCH",
        data: body,
      }),
    }),

  }),
});

export const { useGetUsersQuery, useApproveRejectUserMutation, useUpdateMeMutation } = userApi;
