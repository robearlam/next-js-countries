import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export async function getAllRegionData() {
    const client = GetGQLClient()
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
    const client = GetGQLClient()
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

export async function getRegionData(regionName) {
    const client = GetGQLClient()
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

export async function getSubRegionData(subregionName) {
  const client = GetGQLClient()
    const { data } = await client.query({
        query: gql`
        {
          Subregion(name: "${subregionName}")
          {
            _id
            name
            region
            {
              name
            }
            countries
            {
              _id
              name
            }
          }
        }
        `
    })
    
    return {
        name: subregionName, 
        region: data.Subregion[0].region.name,       
        countries: data.Subregion[0].countries.map(country => {
            return {
                id: country._id,
                name: country.name
            }
        })
    }
}

export async function getAllSubregionNames() {
  const client = GetGQLClient()
  const { data } = await client.query({
      query: gql`
        {
          Subregion
          {
            name
          }
        }
      `
  })

  return data.Subregion.map(subRegionName => {
      return {
          params: {
              subregion: subRegionName.name
          }
      }
  })
}

export function GetGQLClient() {
    return new ApolloClient({
        uri: 'https://countries-274616.ew.r.appspot.com/',
        cache: new InMemoryCache()
    })
}