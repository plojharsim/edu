import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { dbService } from "@/services/dbService";
import Index from "./pages/Index";
import StudySession from "./pages/StudySession";
import Onboarding from "./pages/Onboarding";
import EditTopics from "./pages/EditTopics";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import UpdatePassword from "./pages/UpdatePassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Komponenta pro sledování speciálních stavů přihlášení (např. obnova hesla)
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

const ProtectedRoute = ({ children, requirePremium = false }: { children: React.ReactNode, requirePremium?: boolean }) => {
  const { session, loading, user } = useAuth();
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const location = useLocation();
  
  useEffect(() => {
    if (user) {
      dbService.getProfile(user.id).then(profile => {
        setIsPremium(!!profile?.is_premium);
      });
    }
  }, [user]);

  if (loading || (user && isPremium === null)) return null;
  
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requirePremium && isPremium === false) {
    return <Navigate to="/pricing" replace />;
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
          <BrowserRouter>
            <AuthHandler />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/pricing" element={<Pricing />} />
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
                  <ProtectedRoute requirePremium={true}>
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