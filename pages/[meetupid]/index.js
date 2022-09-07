import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
    return (
        <MeetupDetail
            image={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg/1200px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg"
            }
            alt={"Central London"}
            title={"A First Meetup"}
            address={"London Eye"}
            description={"First group get together!"}
        />
    );
}
export async function getStaticPaths() {
    return {
        fallback: false,   // identify whether all path params have been defined
        paths: [
            { 
                params: {
                meetupid: 'm1'
                },
            },
            { 
                params: {
                meetupid: 'm2'
                },
            },

        ]
    }
}
export async function getStaticProps(context) {
    const meetupid = context.params;
    console.log(meetupid)
    return {
        props: {
            meetupData: {
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg/1200px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg",
                id: 'm1',
                title: "A First Meetup",
                address: "London Eye",
                description: "First group get together!"
            }
        }
    }
}
export default MeetupDetails;
