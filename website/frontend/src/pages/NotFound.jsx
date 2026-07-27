import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Heading from '../components/ui/Heading';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>RedVerse | Error 404</title>
        <meta name="description" content="Page not found in the RedVerse." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <Section className="min-h-[calc(100vh-64px)] flex items-center justify-center relative overflow-hidden">
        {/* Background anomaly effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-[#0B0B0F] to-[#0B0B0F]" />
        
        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Heading level={1} className="text-8xl md:text-9xl mb-4 text-glow text-primary">
              404
            </Heading>
            <Heading level={2} className="mb-6">
              Signal Lost
            </Heading>
            <p className="text-text-muted text-xl max-w-md mx-auto mb-10">
              The coordinates you provided led into an uncharted sector of the void. This data does not exist.
            </p>
            
            <Link to="/">
              <Button variant="primary" size="lg">Return to Base</Button>
            </Link>
          </motion.div>
        </Container>
      </Section>
    </>
  );
};

export default NotFound;
