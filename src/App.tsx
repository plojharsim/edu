import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import StudySession from "./pages/StudySession";
import Onboarding from "./pages/Onboarding";
import EditTopics from "./pages/EditTopics";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const profile = localStorage.getItem('user_profile');
  if (!profile) {
    return <Navigate to="/onboarding" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" expand={true} richColors />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/onboarding" element={<Onboarding />} />
            
            {/* App Routes */}
            <Route 
              path="/app" 
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/app/edit" 
              element={
                <ProtectedRoute>
                  <EditTopics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/app/study/:categoryId" 
              element={
                <ProtectedRoute>
                  <StudySession />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/app/study/:categoryId/:topicId" 
              element={
                <ProtectedRoute>
                  <StudySession />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;