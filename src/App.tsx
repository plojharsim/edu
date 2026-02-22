import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Capacitor } from '@capacitor/core';
import Index from "./pages/Index";
import StudySession from "./pages/StudySession";
import Onboarding from "./pages/Onboarding";
import EditTopics from "./pages/EditTopics";
import Leaderboard from "./pages/Leaderboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import UpdatePassword from "./pages/UpdatePassword";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/LoadingScreen";
import VersionCheck from "./components/VersionCheck";

const queryClient = new QueryClient();

const AuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        navigate("/update-password");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return null;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();
  
  if (loading) return <LoadingScreen message="Ověřuji tvůj účet..." />;
  
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <VersionCheck />
          <Toaster />
          <Sonner position="top-center" expand={true} richColors />
          <BrowserRouter>
            <AuthHandler />
            <Routes>
              <Route 
                path="/" 
                element={
                  Capacitor.isNativePlatform() 
                    ? <Navigate to="/app" replace /> 
                    : <Landing />
                } 
              />
              
              <Route path="/login" element={<Login />} />
              <Route 
                path="/update-password" 
                element={
                  <ProtectedRoute>
                    <UpdatePassword />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/onboarding" 
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/app" 
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/app/leaderboard" 
                element={
                  <ProtectedRoute>
                    <Leaderboard />
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
    </AuthProvider>
  </QueryClientProvider>
);

export default App;