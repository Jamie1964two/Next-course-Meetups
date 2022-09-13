import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from 'next/head';
import { Fragment } from "react";

function MeetupDetails(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description"
                description={props.meetupData.description}
                />
                
            </Head>
        <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}

           // image={
            // alt={"Central London"}
            // title={"A First Meetup"}
            // address={"London Eye"}
            // description={"First group get together!"}
        />
        </Fragment>
    );
}
export async function getStaticPaths() {
    const client = await MongoClient.connect(MONGO_DB_CONNECTION);  //process.env.MONGO_DB_CONNECTION  for dev
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close();

    return {
        fallback: false, // identify whether all path params have been defined
        paths: meetups.map((meetup) => ({
            params: { meetupid: meetup._id.toString() },
        })),
    };
}
export async function getStaticProps(context) {
    const meetupid = context.params.meetupid;
    const client = await MongoClient.connect(MONGO_DB_CONNECTION);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupid) });
    client.close();

    console.log(meetupid);
    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                image: selectedMeetup.image,
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                description: selectedMeetup.description,
            }

            // image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg/1200px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg",
            // id: 'm1',
            // title: "A First Meetup",
            // address: "London Eye",
            // description: "First group get together!"
        },
    };
}
export default MeetupDetails;
