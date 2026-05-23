import {Schema, Types} from 'mongoose';
import {IVault, VaultMethods} from './vault.types';
import {VaultModel} from './vault.model';

const VaultSchema = new Schema<IVault, VaultModel, VaultMethods>(
	{
		owner: {
			type: Types.ObjectId,
			required: true,
			index: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 120,
		},
		description: {
			type: String,
			maxlength: 500,
		},
		sharedWith: [
			{
				type: Types.ObjectId,
				ref: 'User',
				index: true,
			},
		],
		capsuleCount: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

export default VaultSchema;
