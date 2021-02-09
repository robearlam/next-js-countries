import Layout from '../components/layout'
import Link from 'next/link'
import { getAllRegionData } from '../lib/countries'
import { GetStaticProps } from 'next'
import { Region } from '../lib/models'

export default function Home({allregions}: {allregions:Region[]}) {
    return (
        <Layout>
            <section>
                <h1>Country information</h1>
                <p>This site contains information about various countries, select one of the region below to begin!</p>
            </section>
            <section>
                <h2>Regions</h2>
                <ul>
                    {allregions.map(({ name, _id }) => (
                        <li key={_id}>
                            <Link href={`/region/${name}`}>
                                <a>{name}</a>                                    
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const allregions = await getAllRegionData()
    return {
        props: {
            allregions
        }
    }
}