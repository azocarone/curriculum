export function adaptProfileData(profileData) {
    return {
        profile: profileData,
        contact: {
            profile: profileData,
            translation: profileData.profiles_translations?.[0]
        },
        summary: profileData.summaries?.[0]?.summaries_translations?.[0],
        experiences: profileData.experiences,
        education: profileData.educationGroups,
        skills: profileData.skillGroups
    };
}