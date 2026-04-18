export function groupBy(list, key) {
    if (!Array.isArray(list)) return {};

    return list.reduce((acc, item) => {
        const groupKey = item?.[key]?.slug ?? item?.[key] ?? 'others';

        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push(item);

        return acc;
    }, {});
}