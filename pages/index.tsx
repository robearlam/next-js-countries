import Layout from '../components/layout'
import Link from 'next/link'
import { getAllRegionData } from '../lib/countries'
import { GetStaticProps } from 'next'

export default function Home({allregions}:{allregions:{id: number, name:string}[]}) {
    return (
        <Layout>
            <section>
                <h1>Country information</h1>
                <p>This site contains information about various countries, select one of the region below to begin!</p>
            </section>
            <section>
                <h2>Regions</h2>
                <ul>
                    {allregions.map(({ name, id }) => (
                        <li key={id}>
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