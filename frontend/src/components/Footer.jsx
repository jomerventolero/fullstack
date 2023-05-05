import React from 'react';

const Footer = () => {
  return (
    <footer className="absolute top-[400%] w-full bg-white text-black font-poppins">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4">
            <img src="\src\assets\celina.png" alt="Celina Plains Logo" className="mb-3 w-[64px]" />
            <h3 className="mb-4">Celina Plains Subdivision</h3>
          </div>
          <div className="col-md-4">
            <h5 className="mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/#about">About Us</a></li>
              <li><a href="https://tawk.to/chat/6453de5bad80445890eb24e7/1gvjte8fi">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-blue-400 text-center py-3">
        <p className="mb-0">&copy; {new Date().getFullYear()} Celina Plains Subdivision. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
