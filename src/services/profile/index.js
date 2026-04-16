import { profileServiceV1 } from '@/services/profile/v1/profile-service-v1.js';
import { profileServiceV2 } from '@/services/profile/v2/profile-service-v2.js';

const SERVICES = {
    v1: profileServiceV1,
    v2: profileServiceV2 
};

export const profileService = {
    get(version = 'v2') {
        const service = SERVICES[version];

        if (!service) {
            throw new Error(`La versión "${version}" de ProfileService no es compatible`);
        }

        return service;
    },

    async fetchFullProfile(identifier, lang, version = 'v2') {
        return this.get(version).fetchFullProfile(identifier, lang);
    }
};