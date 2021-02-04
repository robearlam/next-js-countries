export function getAllSubRegions() {
    const subRegionNames = ['subregionA', 'subregionB', 'subregionC']
    return subRegionNames.map(subregionName => {
        return {
            id: subregionName
        }
    })
}