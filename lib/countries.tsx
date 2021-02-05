import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export async function getAllRegionData() {
    const client = new ApolloClient({
        uri: 'https://countries-274616.ew.r.appspot.com/',
        cache: new InMemoryCache()
    })

    const { data } = await client.query({
        query: gql`
          {
            Region
            {
              name
              _id
            }
          }
        `
    })

    return data.Region.map(regionData => {
        return {
            id: regionData._id,
            name: regionData.name
        }
    })
}

export async function getAllRegionNames() {
    const client = new ApolloClient({
        uri: 'https://countries-274616.ew.r.appspot.com/',
        cache: new InMemoryCache()
    })

    const { data } = await client.query({
        query: gql`
          {
            Region
            {
              name
            }
          }
        `
    })

    return data.Region.map(regionName => {
        return {
            params: {
                region: regionName.name
            }
        }
    })
}

// export function getAllSubRegions() {
//     const subRegionNames = ['subregionA', 'subregionB', 'subregionC']
//     return subRegionNames.map(subregionName => {
//         return {
//             id: subregionName
//         }
//     })
// }

export async function getRegionData(regionName) {
    const client = new ApolloClient({
        uri: 'https://countries-274616.ew.r.appspot.com/',
        cache: new InMemoryCache()
    })

    const { data } = await client.query({
        query: gql`
          {
            Region(name:"${regionName}")
            {
              name
              _id
              subregions
              { 
                name 
                _id
              }
            }
          }
        `
    })
    
    return {
        name: regionName,        
        subregions: data.Region[0].subregions.map(subregion => {
            return {
                id: subregion._id,
                name: subregion.name
            }
        })
    }
}