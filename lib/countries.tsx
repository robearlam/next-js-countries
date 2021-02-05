import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export async function getAllRegionData() {
    const client = new ApolloClient({
        uri: 'https://countries-274616.ew.r.appspot.com/',
        cache: new InMemoryCache()
    });

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
    });

    return data.Region.map(regionData => {
        return {
            id: regionData._id,
            name: regionData.name
        }
    });
}

export function getAllSubRegions() {
    const subRegionNames = ['subregionA', 'subregionB', 'subregionC']

    const client = new ApolloClient({
        uri: 'https://countries-274616.ew.r.appspot.com/',
        cache: new InMemoryCache()
    });

    return subRegionNames.map(subregionName => {
        return {
            id: subregionName
        }
    })
}

export async function getRegionData(regionName) {
    return "Region Name"
}