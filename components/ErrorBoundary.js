import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // Log error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    
    // You could add error reporting service integration here
    // Example: Sentry.captureException(error);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-error">Something went wrong</h2>
              <div className="alert alert-error mb-4">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{this.state.error?.message || 'An unexpected error occurred'}</span>
                </div>
              </div>
              {this.state.errorInfo && (
                <div className="collapse bg-base-200 mb-4">
                  <input type="checkbox" /> 
                  <div className="collapse-title text-sm font-medium">
                    Show Error Details
                  </div>
                  <div className="collapse-content">
                    <pre className="text-xs whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </div>
              )}
              <div className="card-actions justify-end">
                <button 
                  className="btn btn-primary"
                  onClick={this.handleReset}
                >
                  Try Again
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node, // Optional fallback component
  onError: PropTypes.func // Optional error callback
};

export default ErrorBoundary; 