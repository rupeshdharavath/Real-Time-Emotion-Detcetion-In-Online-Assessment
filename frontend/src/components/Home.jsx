import React from 'react';
import Scrolling from './Scrolling';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Scrolling />
            <div className="container my-1">
                {/* JAVA */}
                <div className="row my-5" style={{ border: "2px solidrgb(7, 7, 7)", borderRadius: "20px", borderWidth: "5px", fontWeight: "500" }}>
                    <div className="col-3">
                        <img src="java.jpeg" alt="Java Quiz" />
                    </div>
                    <div className="col-7 fs-2 my-3">
                        <label className="form-label">JAVA QUIZ</label>
                        <div className="fs-5">
                            <label className="form-label">TOPICS: OOPs concepts, inheritance, functions</label>
                        </div>
                        <div className="fs-6">
                            <label className="form-label">MAX Marks: 15</label>
                        </div>
                    </div>
                    <div className="col-2 my-5">
                        <Link className="btn btn-dark btn-lg" to="/quiz/java">Write Test</Link>
                    </div>
                </div>

                {/* DS */}
                <div className="row my-5" style={{ border: "2px solid #e6e6fa", borderRadius: "20px", borderWidth: "5px", fontWeight: "500" }}>
                    <div className="col-3">
                        <img src="ds.png" alt="DS Quiz" />
                    </div>
                    <div className="col-7 fs-2 my-3">
                        <label className="form-label">DS QUIZ</label>
                        <div className="fs-5">
                            <label className="form-label">TOPICS: Lists, Stacks, Queues</label>
                        </div>
                        <div className="fs-6">
                            <label className="form-label">MAX Marks: 15</label>
                        </div>
                    </div>
                    <div className="col-2 my-5">
                        <Link className="btn btn-dark btn-lg" to="/quiz/ds">Write Test</Link>
                    </div>
                </div>

                {/* CPP */}
                <div className="row my-5" style={{ border: "2px solid #e6e6fa", borderRadius: "20px", borderWidth: "5px", fontWeight: "500" }}>
                    <div className="col-3">
                        <img src="cpp.png" alt="CPP Quiz" />
                    </div>
                    <div className="col-7 fs-2 my-3">
                        <label className="form-label">CPP QUIZ</label>
                        <div className="fs-5">
                            <label className="form-label">TOPICS: OOPs concepts, inheritance, functions</label>
                        </div>
                        <div className="fs-6">
                            <label className="form-label">MAX Marks: 15</label>
                        </div>
                    </div>
                    <div className="col-2 my-5">
                        <Link className="btn btn-dark btn-lg" to="/quiz/cpp">Write Test</Link>
                    </div>
                </div>

                {/* ML */}
                <div className="row my-5" style={{ border: "2px solid #e6e6fa", borderRadius: "20px", borderWidth: "5px", fontWeight: "500" }}>
                    <div className="col-3">
                        <img src="ml.png" alt="ML Quiz" />
                    </div>
                    <div className="col-7 fs-2 my-3">
                        <label className="form-label">ML QUIZ</label>
                        <div className="fs-5">
                            <label className="form-label">TOPICS: Types of ML, Data preprocessing</label>
                        </div>
                        <div className="fs-6">
                            <label className="form-label">MAX Marks: 15</label>
                        </div>
                    </div>
                    <div className="col-2 my-5">
                        <Link className="btn btn-dark btn-lg" to="/quiz/ml">Write Test</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;