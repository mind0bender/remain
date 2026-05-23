import {Model} from 'mongoose';
import {IVault, VaultMethods} from './vault.types';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface VaultModel extends Model<IVault, {}, VaultMethods> {}
