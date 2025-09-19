import React from 'react';

const AboutUs = () => {
  return (
    <>
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-body p-5">
              <h1 className="card-title mb-4">About Us</h1>
              <div className="mb-4">
                <h2 className="h4">Our Mission</h2>
                <p>
                  We aim to help people better understand their emotional states through
                  interactive technology and psychological principles.
                </p>
              </div>
              <div className="mb-4">
                <h2 className="h4">How It Works</h2>
                <p>
                  Our system uses facial recognition technology to detect emotions while
                  you answer questions, providing insights into your emotional responses.
                </p>
              </div>
              <div>
                <h2 className="h4">The Team</h2>
                <p>
                  We're a group of developers and psychologists passionate about
                  emotional well-being and technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</>
  );
};

export default AboutUs;