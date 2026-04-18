import path from 'path';

export const aliases = {
    '@': path.resolve(process.cwd(), './src'),
    '@app': path.resolve(process.cwd(), './src/app'),
    '@core': path.resolve(process.cwd(), './src/core'),
    '@modules': path.resolve(process.cwd(), './src/modules'),
    '@shared': path.resolve(process.cwd(), './src/shared'),
};