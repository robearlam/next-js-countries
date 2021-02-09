import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Region, Country, NameData } from './models'

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

    return data.Region.map((regionData: Region) => {
        return {
            _id: regionData._id,
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

    return data.Region.map((regionName: NameData) => {
        return {
            params: {
                region: regionName.name
            }
        }
    })
}

export async function getRegionData(regionName: string) {
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
        subregions: data.Region[0].subregions.map((subregion:Region) => {
            return {
                _id: subregion._id,
                name: subregion.name
            }
        })
    }
}

export async function getSubRegionData(subregionName: string) {
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
        countries: data.Subregion[0].countries.map((country: Country) => {
            return {
                _id: country._id,
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

  return data.Subregion.map((subRegionName: NameData) => {
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