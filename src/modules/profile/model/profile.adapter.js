export function adaptProfileData(profileData) {
    return {
        contact: profileData.contact,
        summary: profileData.summaries?.[0]?.summaries_translations?.[0],
        experiences: profileData.experiences,
        education: profileData.educationGroups,
        skills: profileData.skillGroups
    };
}