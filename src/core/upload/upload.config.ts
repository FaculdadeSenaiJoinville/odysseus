import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

export const UPLOAD_CONFIG = {
	destination: join(__dirname, '..', '..', '..', 'uploads')
  
};
