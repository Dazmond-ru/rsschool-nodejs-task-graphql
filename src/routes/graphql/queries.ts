import { GraphQLNonNull, GraphQLObjectType } from 'graphql/index.js';

import prismaClient from './prismaСlient.js';
import { UUIDType } from './types/uuid.js';
import { UserType, UsersType } from './types/user.js';
import { PostType, PostsType } from './types/post.js';
import { ProfileType, ProfilesType } from './types/profile.js';
import { MemberType, MemberTypeId, MembersType } from './types/member.js';

export const Query = new GraphQLObjectType({
  name: 'Query',

  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, { id }) =>
        await prismaClient.user.findFirst({ where: { id } }),
    },

    users: {
      type: UsersType,
      resolve: async () => await prismaClient.user.findMany(),
    },

    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_parent, { id }) =>
        await prismaClient.post.findFirst({ where: { id } }),
    },

    posts: {
      type: PostsType,
      resolve: async () => await prismaClient.post.findMany(),
    },

    profile: {
      type: ProfileType,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, { id }) =>
        await prismaClient.profile.findFirst({ where: { id } }),
    },

    profiles: {
      type: ProfilesType,
      resolve: async () => await prismaClient.profile.findMany({}),
    },

    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
      },
      resolve: async (_parent, { id }) =>
        await prismaClient.memberType.findFirst({ where: { id } }),
    },

    memberTypes: {
      type: MembersType,
      resolve: async () => await prismaClient.memberType.findMany(),
    },
  }),
});
