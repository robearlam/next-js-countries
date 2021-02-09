import Link from 'next/link'
import Layout from '../../components/layout'
import { getSubRegionData, getAllSubregionNames } from '../../lib/countries'
import { GetStaticProps, GetStaticPaths } from 'next'
import { SubRegion } from '../../lib/models'

export default function SubRegionList({ subregionData } : { subregionData: SubRegion}) {
    return (
        <Layout>
            <section>
                <Link href={`/region/${subregionData.region}`}>
                    <a>&lt;- Back</a>
                </Link>
                <h1>Welcome to the '{subregionData.name}' region</h1>
                <p>This subregion contains the following countries listed below:</p>
            </section>
            <section>
                <h2>Countries</h2>
                <ul>
                    {subregionData.countries.map(({ name, _id }) => (
                        <li key={_id}>
                            <Link href={`/country/${name}`}>
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
    const subregionData = await getSubRegionData(params?.subregion as string)
    return {
        props: {
            subregionData: subregionData
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllSubregionNames()
    return {
        paths: paths,
        fallback: false
    }
}