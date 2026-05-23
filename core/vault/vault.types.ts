import {Types} from 'mongoose';

export interface IVault {
	owner: Types.ObjectId;
	name: string;
	description: string;
	sharedWith: Types.ObjectId[];
	capsuleCount: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface VaultMethods {}
