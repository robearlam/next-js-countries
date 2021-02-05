import Layout from '../../components/layout'
import Link from 'next/link'
import { getRegionData, getAllRegionNames } from '../../lib/countries'
import { GetStaticProps, GetStaticPaths } from 'next'

export default function Region({regionData}: {regionData: {name, subregions}}) {
    return (
        <Layout>
            <h1></h1>

            <section>
                <h1>Welcome to the '{regionData.name}' region</h1>
                <p>This region contains the following subregions listed below:</p>
            </section>
            <section>
                <h2>Regions</h2>
                <ul>
                    {regionData.subregions.map(({ name, id }) => (
                        <li>
                            <Link href={`/region/${regionData.name}/subregion/${name}`}>
                                <a>{name}</a>                                    
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
            
        </Layout>
    )    
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const regionData = await getRegionData(params.region as string)
    return {
        props: {
            regionData
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllRegionNames()
    return {
        paths: paths,
        fallback: false
    }
}