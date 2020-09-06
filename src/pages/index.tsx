import { Microphone } from "../../model/microphone"
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { openDB } from "../openDB"

interface IndexProps {
    microphones: Microphone[]
}

export default function Index({ microphones }: IndexProps) {
    return (<div>
        {microphones.map(microphone => (
            <div>
                <Link href="/[id]" as={`/${microphone.id}`}>
                    <a>{microphone.brand} - {microphone.model}</a>
                </Link>
            </div>
        ))}
    </div>)
}

export const getStaticProps: GetStaticProps = async ctx => {
    const db = openDB()
    const microphones = await (await db).all('select * from microphone')
    return { props: { microphones } }
}