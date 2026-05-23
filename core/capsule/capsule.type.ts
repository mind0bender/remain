import {Types} from 'mongoose';

export interface ICapsule {
	vault: Types.ObjectId;
	owner: Types.ObjectId;
	title: string;
	content?: string;
	isPinned: boolean;
	createdAt: Date;
	updatedAt: Date;
}
