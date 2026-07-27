import { Component } from 'react';
import Container from './ui/Container';
import Heading from './ui/Heading';
import Button from './ui/Button';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center text-white">
          <Container className="text-center">
            <Heading level={1} className="text-primary mb-4">System Anomaly</Heading>
            <p className="text-text-muted mb-8 text-xl max-w-lg mx-auto">
              A critical error occurred while rendering this module. Our engineers have been notified via the terminal logs.
            </p>
            <Button onClick={() => window.location.reload()} variant="primary">
              Reboot System
            </Button>
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
