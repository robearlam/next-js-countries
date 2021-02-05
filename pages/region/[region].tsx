import Layout from '../../components/layout'
import { getRegionData, getAllRegionNames } from '../../lib/countries'
import { GetStaticProps, GetStaticPaths } from 'next'

export default function Region({regionData}: {regionData: {name}}) {
    return (
        <Layout>
            <h1>Welcome to {regionData.name}</h1>
        </Layout>
    )    
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const regionData = await getRegionData(params.name as string)
    return {
        props: {
            regionData
        }
    }
}

// export const getStaticPaths: GetStaticPaths = async () => {
//     const paths = getAllRegionNames()
//     return {
//         paths: paths,
//         fallback: false
//     }
// }