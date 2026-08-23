/**
 * UnitFlow style: a navigable measurement workbench built with React JSX.
 */
import { lazy, Suspense } from "react";
import { Toaster } from "sonner";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { AppLayout } from "./components/AppLayout.jsx";
import { UnitFlowProvider } from "./contexts/UnitFlowContext.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Converters = lazy(() => import("./pages/Converters.jsx"));
const Category = lazy(() => import("./pages/Category.jsx"));
const History = lazy(() => import("./pages/History.jsx"));
const Favorites = lazy(() => import("./pages/Favorites.jsx"));
const Settings = lazy(() => import("./pages/Settings.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function Router() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="route-loading" aria-label="Loading page"><span />Loading workspace</div>}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/converters" component={Converters} />
          <Route path="/converter/:category/:pair" component={Category} />
          <Route path="/converter/:category" component={Category} />
          <Route path="/history" component={History} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/settings" component={Settings} />
          <Route path="/about" component={About} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </AppLayout>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <UnitFlowProvider>
        <Toaster richColors position="bottom-right" closeButton />
        <Router />
      </UnitFlowProvider>
    </ErrorBoundary>
  );
}

