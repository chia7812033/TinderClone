import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum Genders {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER"
}



type EagerMatch = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Match, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly isMatch: boolean;
  readonly user1ID: string;
  readonly user2ID: string;
  readonly users?: (UserMatch | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMatch = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Match, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly isMatch: boolean;
  readonly user1ID: string;
  readonly user2ID: string;
  readonly users: AsyncCollection<UserMatch>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Match = LazyLoading extends LazyLoadingDisabled ? EagerMatch : LazyMatch

export declare const Match: (new (init: ModelInit<Match>) => Match) & {
  copyOf(source: Match, mutator: (draft: MutableModel<Match>) => MutableModel<Match> | void): Match;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly bio: string;
  readonly gender: Genders | keyof typeof Genders;
  readonly lookingFor: Genders | keyof typeof Genders;
  readonly sub?: string | null;
  readonly matches?: (UserMatch | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly bio: string;
  readonly gender: Genders | keyof typeof Genders;
  readonly lookingFor: Genders | keyof typeof Genders;
  readonly sub?: string | null;
  readonly matches: AsyncCollection<UserMatch>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerUserMatch = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserMatch, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly matchId?: string | null;
  readonly userId?: string | null;
  readonly match: Match;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserMatch = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserMatch, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly matchId?: string | null;
  readonly userId?: string | null;
  readonly match: AsyncItem<Match>;
  readonly user: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserMatch = LazyLoading extends LazyLoadingDisabled ? EagerUserMatch : LazyUserMatch

export declare const UserMatch: (new (init: ModelInit<UserMatch>) => UserMatch) & {
  copyOf(source: UserMatch, mutator: (draft: MutableModel<UserMatch>) => MutableModel<UserMatch> | void): UserMatch;
}