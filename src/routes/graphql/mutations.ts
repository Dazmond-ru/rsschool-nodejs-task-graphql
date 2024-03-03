import { GraphQLObjectType, GraphQLBoolean } from 'graphql';
import prismaClient from './prismaClient.js';
import { PostType } from './types/post.js';
import { UUIDType } from './types/uuid.js';
import { ChangePostInputType, CreatePostInputType } from './types/postInputs.js';
import { ChangeProfileInputType, CreateProfileInputType } from './types/profileInputs.js';
import { ProfileType } from './types/profile.js';
import { UserType } from './types/user.js';
import { ChangeUserInputType, CreateUserInputType } from './types/userInputs.js';

export const Mutations = new GraphQLObjectType({
  name: 'Mutation',

  fields: () => ({
    createPost: {
      type: PostType,
      args: { dto: { type: CreatePostInputType } },
      resolve: async (_parent, { dto }) => await prismaClient.post.create({ data: dto }),
    },

    changePost: {
      type: PostType,
      args: { id: { type: UUIDType }, dto: { type: ChangePostInputType } },
      resolve: async (_parent, { id, dto }) =>
        await prismaClient.post.update({ where: { id }, data: dto }),
    },

    deletePost: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, { id }) => {
        try {
          await prismaClient.post.delete({ where: { id } });
        } catch (err) {
          return false;
        }

        return true;
      },
    },

    createProfile: {
      type: ProfileType,
      args: { dto: { type: CreateProfileInputType } },
      resolve: async (_parent, { dto }) =>
        await prismaClient.profile.create({ data: dto }),
    },

    changeProfile: {
      type: ProfileType,
      args: { id: { type: UUIDType }, dto: { type: ChangeProfileInputType } },
      resolve: async (_parent, { id, dto }) =>
        await prismaClient.profile.update({ where: { id }, data: dto }),
    },

    deleteProfile: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, { id }) => {
        try {
          await prismaClient.profile.delete({ where: { id } });
        } catch (err) {
          return false;
        }

        return true;
      },
    },

    createUser: {
      type: UserType,
      args: { dto: { type: CreateUserInputType } },
      resolve: async (_parent, { dto }) => await prismaClient.user.create({ data: dto }),
    },

    changeUser: {
      type: UserType,
      args: { id: { type: UUIDType }, dto: { type: ChangeUserInputType } },
      resolve: async (_parent, { id, dto }) =>
        await prismaClient.user.update({ where: { id: id }, data: dto }),
    },

    deleteUser: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, { id }) => {
        try {
          await prismaClient.user.delete({ where: { id: id } });
        } catch (err) {
          return false;
        }

        return true;
      },
    },

    subscribeTo: {
      type: UserType,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
      resolve: async (_parent, { userId, authorId }) => {
        await prismaClient.subscribersOnAuthors.create({
          data: { subscriberId: userId, authorId: authorId },
        });

        return await prismaClient.user.findFirst({ where: { id: userId } });
      },
    },

    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
      resolve: async (_parent, { userId, authorId }) => {
        try {
          await prismaClient.subscribersOnAuthors.deleteMany({
            where: { subscriberId: userId, authorId: authorId },
          });
        } catch {
          return false;
        }

        return true;
      },
    },
  }),
});
