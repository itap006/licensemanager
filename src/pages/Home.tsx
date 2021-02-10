import Container from 'layout/Container';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <div className="flex flex-col">
        <Link to="/products">Products</Link>
        <Link to="/organisations">Organisations</Link>
        <Link to="/productorganisations">Product Organisations</Link>
      </div>
    </Container>
  );
};

export default Home;
