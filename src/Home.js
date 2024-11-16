import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Home = () => {
  const [news, setNews] = useState([]);

  // Fetch news data from backend on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/getNews.php');
      const data = await response.json();
      if (data.success) {
        setNews(data.news);
      } else {
        console.error("Failed to fetch news.");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <p className="text-center lead">
          Your destination to connect, collaborate, and innovate with fellow researchers and funders across the globe.
        </p>
        <p className="text-center">
          At the Research Collaboration Hub, we aim to break down barriers and enable seamless cooperation among 
          researchers, funding agencies, and institutions. Whether you're looking to find funding opportunities, 
          collaborate with peers, or manage your research projects, our platform offers the tools and resources you need 
          to thrive in today's interconnected research landscape.
        </p>

        <div className="row mt-4">
          {/* Latest News Section */}
          <div className="col-md-6">
            <h3>Latest News and Updates</h3>
            <ul className="list-group">
              {news.length > 0 ? (
                news.map((item, index) => (
                  <li key={index} className="list-group-item">
                    <strong>{item.title}:</strong> {item.content}
                    <p className="text-muted">{new Date(item.uploaded_date).toLocaleDateString()}</p>
                  </li>
                ))
              ) : (
                <li className="list-group-item">No news available.</li>
              )}
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-6">
            <h3>Quick Links</h3>
            <ul className="list-group">
              <li className="list-group-item">
                <a href="/login">Login</a>
                <p className="mb-0">Access your account to manage proposals, collaborations, and events.</p>
              </li>
              <li className="list-group-item">
                <a href="/signup">Sign Up</a>
                <p className="mb-0">Join our community and start collaborating with peers and funders.</p>
              </li>
              <li className="list-group-item">
                <a href="/contact">Contact Us</a>
                <p className="mb-0">Need help? Reach out to our support team for assistance.</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Image Slider */}
        <div className="row mt-5">
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://www.taconic.com/content/dam/taconic/legacy/taconic-insights/images/collaborative-research-organizations-are-your-new-cro.jpg" className="d-block w-100" alt="Collaboration" />
              </div>
              <div className="carousel-item">
                <img src="https://media.gettyimages.com/id/1461380702/video/two-programmer-development-engineers-working-on-computers-coding-together.jpg?s=640x640&k=20&c=ZndLJ09tf8lue90YtpL_u3BPZTE_9xCTyyLMUa1W328=" className="d-block w-100" alt="Innovate" />
              </div>
              <div className="carousel-item">
                <img src="https://sites.aub.edu.lb/datavisualization/files/2022/11/research-development-businessman-hologram-concept-futuristic-research-development-businessman-hologram-concept-177206745.jpg" className="d-block w-100" alt="Explore" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* Information Section */}
        <div className="row mt-5">
          <div className="col-md-12">
            <h3 className="text-center">About Our Platform</h3>
            <p className="text-center">
              Our Research Collaboration Hub is a comprehensive platform that connects researchers, funders, and institutions to drive innovation.
              We offer tools for proposal submission, peer connection, event management, and resource sharing to help you advance your research
              initiatives effectively.
            </p>
          </div>
        </div>

        {/* Iframe Section */}
        <div className="row mt-5">
          <div className="col-md-12">
            <h3 className="text-center">Explore More</h3>
            <iframe
              className="w-100"
              height="400"
              src="https://lxc4668.uta.cloud/blog-post/"
              title="Embedded Content"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
