import Layout from '../components/layout'
import Link from 'next/link'
import { getAllSubRegions } from '../lib/countries'
import { GetStaticProps } from 'next'

export default function Home({allsubregions}:{allsubregions:{id:string}[]}) {
    return (
        <Layout>
            <section>
                <h1>Country information</h1>
                <p>This site contains information about various countries, check out the list below!</p>
            </section>
            <section>
                <h2>Subregions</h2>
                <ul>
                    {allsubregions.map(({ id }) => (
                        <li>
                            <Link href={`/subregions/${id}`}>
                                <a>{id}</a>                                    
                            </Link>
                        </li>

                    ))}
                </ul>
            </section>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const allsubregions = getAllSubRegions()
    return {
        props: {
            allsubregions
        }
    }
}