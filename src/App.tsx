import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Capacitor } from '@capacitor/core';
import { dbService } from "./services/dbService";
import { APP_VERSION } from "./utils/version";

import Index from "./pages/Index";
import StudySession from "./pages/StudySession";
import Onboarding from "./pages/Onboarding";
import EditTopics from "./pages/EditTopics";
import Leaderboard from "./pages/Leaderboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import UpdatePassword from "./pages/UpdatePassword";
import UpdateRequired from "./pages/UpdateRequired";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/LoadingScreen";

const queryClient = new QueryClient();

const VersionGuard = ({ children }: { children: React.ReactNode }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkVersion = async () => {
      const required = await dbService.getRequiredVersion();
      if (required && required !== APP_VERSION) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    };
    checkVersion();
  }, []);

  if (isValid === null) return <LoadingScreen message="Kontroluji integritu aplikace..." />;
  if (isValid === false) return <UpdateRequired />;
  
  return <>{children}</>;
};

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
  const { session, hasPaid, loading } = useAuth();
  const location = useLocation();
  
  if (loading) return <LoadingScreen message="Ověřuji tvůj účet..." />;
  
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Pokud uživatel nezaplatil a není na platební stránce, redirect na /payment
  if (!hasPaid && location.pathname !== '/payment') {
    return <Navigate to="/payment" replace />;
  }

  // Pokud uživatel zaplatil a snaží se jít na platbu, redirect do aplikace
  if (hasPaid && location.pathname === '/payment') {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-center" expand={true} richColors />
          <VersionGuard>
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
                  path="/payment" 
                  element={
                    <ProtectedRoute>
                      <Payment />
                    </ProtectedRoute>
                  } 
                />

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
          </VersionGuard>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;