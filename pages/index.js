import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';
//import getAllHandler from './api/getAllmeetups';
//import fetch from 'node-fetch';


const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg/1200px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg',
        address: 'London Eye',
        description: 'First group get together!'
    },
    {
        id: 'm2',
        title: 'Second Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Hong_Kong_Harbour_Night_2019-06-11.jpg/1920px-Hong_Kong_Harbour_Night_2019-06-11.jpg',
        address: 'Hong Kong Harbour',
        description: 'See you all in Hong Kong!'
    },
]

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                name='description'
                content='Browse a huge list of React get-togethers'
                />
            </Head>
        <MeetupList meetups={props.meetups}/>
        </Fragment>
    )
}


// getStaticprops is great for more infrequent content change
//code only runs on the server

export async function getStaticProps() {
    // fetch data from an API
    // get data from db
    const client = await MongoClient.connect(MONGO_DB_CONNECTION);
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
    meetupsCollection.find();
    const meetups = await meetupsCollection.find().toArray();
    client.close();

    //const meetups = await getAllHandler();
    // const meetups = await fetch("./api/getAllMeetups", {
    //     method:'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // });

    return {
        //must return an object
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 10   //re-pregenerate page every 10s after request 
    }
} 


/*
// getServerSideProps runs on every request great for data changing every second (not as fast as staticprops)
export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;
    return {
        props: {
            meetups: DUMMY_MEETUPS
        }
    };
}
*/

export default HomePage;