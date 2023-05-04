import MeetTheTeam from "./Team";
import Hero from "./herocomponent"
import OurValues from "./ourvalues";
import Story from "./storycomponent";


const About = ()=>
{
    return (
        <div className="w-full h-full px-10">
            <Hero/>
            <Story/>
            <OurValues/>
            <MeetTheTeam/>
        </div>
    )
}

export default About;