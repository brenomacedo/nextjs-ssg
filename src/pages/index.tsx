import { Microphone } from "../../model/microphone"
import { GetStaticProps, GetServerSideProps } from 'next'
import Link from 'next/link'
import { openDB } from "../openDB"
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

interface IndexProps {
    microphones: Microphone[]
}

export default function Index({ microphones }: IndexProps) {
    return (<div>
        {microphones.map((microphone, index) => (
            <div key={index}>
                <Link href="/microphone/[id]" as={`/microphone/${microphone.id}`}>
                    <a>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                            image={microphone.imageUrl}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {`${microphone.brand} ${microphone.model}`}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                            Share
                            </Button>
                            <Button size="small" color="primary">
                            Learn More
                            </Button>
                        </CardActions>
                    </Card>
                    </a>
                </Link>
            </div>
        ))}
    </div>)
}

export const getStaticProps: GetStaticProps = async ctx => {
    const currentPage = ctx.params?.currentPage || 0
    const currentPageNumber = +(currentPage || 0)

    const min = currentPageNumber * 5
    const max = (currentPageNumber + 1) * 5
    console.log(ctx.params)
    const db = await openDB()
    const microphones = await db.all('select * from microphone where id > ? and id <= ?', min, max)
    return { props: { microphones } }
}

// export const getServerSideProps: GetServerSideProps = async ctx => {
//     const currentPage = ctx.params?.currentPage || 0
//     const currentPageNumber = +(currentPage || 0)

//     const min = currentPageNumber * 5
//     const max = (currentPageNumber + 1) * 5
//     console.log(ctx.params)
//     const db = await openDB()
//     const microphones = await db.all('select * from microphone where id > ? and id <= ?', min, max)
//     return { props: { microphones } }
// }