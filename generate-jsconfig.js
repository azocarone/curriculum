import fs from 'fs';

const config = {
    compilerOptions: {
        paths: {
            '@/*': ['./src/*'],
            '@app/*': ['./src/app/*'],
            '@core/*': ['./src/core/*'],
            '@modules/*': ['./src/modules/*'],
            '@shared/*': ['./src/shared/*'],
        },
    },
};

fs.writeFileSync('jsconfig.json', JSON.stringify(config, null, 2));
console.log('✅ jsconfig.json generado');