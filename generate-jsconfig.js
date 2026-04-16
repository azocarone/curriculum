import fs from 'fs';

const config = {
    compilerOptions: {
        paths: {
            '@/*': ['./src/*'],
            '@app/*': ['./src/app/*'],
            '@core/*': ['./src/core/*'],
            '@modules/*': ['./src/modules/*'],
            '@shared/*': ['./src/shared/*'],

            // legacy (temporal)
            '@controllers/*': ['./src/controllers/*'],
            '@data/*': ['./src/data/*'],
            '@services/*': ['./src/services/*'],
            '@ui/*': ['./src/ui/*'],
            '@utils/*': ['./src/utils/*'],
        },
    },
};

fs.writeFileSync('jsconfig.json', JSON.stringify(config, null, 2));
console.log('✅ jsconfig.json generado');