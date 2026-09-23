export function adaptProfileData(profileData = {}) {
    return {
        contact: profileData.contact,
        summary: profileData.summary,
        experiences: profileData.experiences,
        education: profileData.educationGroups,
        skills: profileData.skillGroups
    };
}