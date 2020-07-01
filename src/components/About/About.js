import React from 'react';

/*
* This component it the about page in its entirity (i.e. this is just static content)
*/

const About = (props) => {
    return (
        <div className="jumbotron my-auto">
            <div className="text-center align-middle d-block">
                <h1 className="display-4">About</h1>
                <p>Free boards for running fun and insightful sprint retrospectives</p>
            </div>
        </div>
    );
}

export default About;