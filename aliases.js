import path from 'path';

export const aliases = {
    '@': path.resolve(process.cwd(), './src'),

    '@app': path.resolve(process.cwd(), './src/app'),
    '@core': path.resolve(process.cwd(), './src/core'),
    '@modules': path.resolve(process.cwd(), './src/modules'),
    '@shared': path.resolve(process.cwd(), './src/shared'),

    // ⚠️ legacy (puedes eliminar después)
    '@controllers': path.resolve(process.cwd(), './src/controllers'),
    '@data': path.resolve(process.cwd(), './src/data'),
    '@services': path.resolve(process.cwd(), './src/services'),
    '@ui': path.resolve(process.cwd(), './src/ui'),
    '@utils': path.resolve(process.cwd(), './src/utils'),
};