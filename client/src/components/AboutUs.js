import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 bg-light p-5">
        <h1 className="fw-bold text-center text-primary mb-4">
          <i className="bi bi-box-seam-fill me-2"></i>About StockMate
        </h1>

        <p className="fs-5">
          Welcome to <strong>StockMate</strong>! We are dedicated to helping small businesses manage their inventory with ease.
          Our platform provides seamless, intuitive tools for inventory management and streamlining your operations.
        </p>

        <p className="fs-5">
          Our mission is to empower small business owners to grow confidently by offering simple, efficient solutions for tracking and organizing their stock.
          With StockMate, you can focus on what matters—scaling your business.
        </p>

        <hr className="my-4" />

        <h3 className="fw-bold text-secondary mb-3">
          <i className="bi bi-lightbulb-fill me-2"></i>Our Vision
        </h3>
        <p className="fs-5">
          We aim to become the go-to platform for small businesses seeking a reliable and user-friendly inventory system.
          Whether you're running a small shop or managing a warehouse, our solution adapts to your needs.
        </p>

        <h4 className="fw-bold text-secondary mt-4">
          <i className="bi bi-gear-fill me-2"></i>Why We Built StockMate
        </h4>
        <p className="fs-5">
          StockMate was born out of the need for a tool that’s powerful yet affordable.
          We understand not all businesses can afford complex enterprise systems—so we crafted a platform that’s both simple and scalable.
        </p>

        <h4 className="fw-bold text-secondary mt-4">
          <i className="bi bi-people-fill me-2"></i>Community Driven
        </h4>
        <p className="fs-5">
          We believe in listening to our users. Your feedback shapes the way we evolve.
          Our team is constantly improving StockMate based on real-world use and suggestions from small business owners like you.
        </p>

        <h4 className="fw-bold text-secondary mt-4">
          <i className="bi bi-unlock-fill me-2"></i>Accessibility & Simplicity
        </h4>
        <p className="fs-5">
          No tech experience? No problem. Our clean UI, guided setup, and friendly support make it easy to get started in minutes.
          Inventory management should be accessible to everyone—and we’re making that a reality.
        </p>

        <h4 className="fw-bold text-secondary mt-4">
          <i className="bi bi-shield-lock-fill me-2"></i>Security & Trust
        </h4>
        <p className="fs-5">
          Your data is safe with us. StockMate leverages Firebase's secure cloud infrastructure and follows best practices to protect your business information.
        </p>

        <div className="text-center mt-5">
          <h5 className="text-primary fw-bold">Thank you for choosing StockMate.</h5>
          <p className="fs-5">We're proud to be part of your journey and committed to helping your business thrive.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
