import { useEffect } from "react";

function Scrolling() {
  useEffect(() => {
    // Bootstrap carousel requires initialization if not using data attributes fully
    const bootstrap = require('bootstrap/dist/js/bootstrap.bundle.min.js');
    new bootstrap.Carousel(document.getElementById("carouselExample"), {
      interval: 5000,
      ride: "carousel",
    });
  }, []);

  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner text-center">
        <div className="carousel-item active">
          <label className="form-label fs-3" style={{ fontFamily: "Montserrat" }}>
            Best Quiz App
          </label>
        </div>
        <div className="carousel-item">
          <label className="form-label fs-3" style={{ fontFamily: "Montserrat" }}>
            Quiz App with Emotion Detection
          </label>
        </div>
      </div>
    </div>
  );
}

export default Scrolling;
