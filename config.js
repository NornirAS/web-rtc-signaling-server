import dotenv from 'dotenv';

dotenv.config();

export const ORIGIN = process.env.ORIGIN || 'http://localhost:3000';

export const PORT = process.env.PORT || 4000;

export const TOKEN = process.env.TOKEN;

export const CAMERA_SERVICE_URL = 'https://demo.cioty.com/camera';

export const VIDEO_SERVICE_URL = 'https://demo.cioty.com/video';