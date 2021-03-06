import Layout from '../../components/layout'
import Link from 'next/link'
import { getRegionData, getAllRegionNames } from '../../lib/countries'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Region } from '../../lib/models'

export default function RegionList({regionData}: {regionData: Region}) {
    return (
        <Layout>
            <section>
                <Link href="/">
                    <a>&lt;- Back</a>
                </Link>
                <h1>Welcome to the '{regionData.name}' region</h1>
                <p>This region contains the following subregions listed below:</p>
            </section>
            <section>
                <h2>Regions</h2>
                <ul>
                    {regionData.subregions.map(({ name, _id }) => (
                        <li key={_id}>
                            <Link href={`/subregion/${name}`}>
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
    const regionData = await getRegionData(params?.region as string)
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