/** UnitFlow style: a calm recovery view keeps the workbench trustworthy when an unexpected error occurs. */
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-8">
          <div className="flex w-full max-w-2xl flex-col items-center p-8">
            <AlertTriangle size={48} className="mb-6 shrink-0 text-destructive" />
            <h2 className="mb-4 text-xl">An unexpected error occurred.</h2>
            <div className="mb-6 w-full overflow-auto rounded bg-muted p-4">
              <pre className="whitespace-break-spaces text-sm text-muted-foreground">{this.state.error?.stack}</pre>
            </div>
            <button type="button" onClick={() => window.location.reload()} className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90">
              <RotateCcw size={16} />Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

