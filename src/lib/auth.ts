
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // If user is logged in, check if they're an admin
        if (session?.user) {
          setTimeout(async () => {
            try {
              const { data, error } = await supabase.rpc('is_admin');
              if (!error) {
                setIsAdmin(!!data);
              }
            } catch (err) {
              console.error("Error checking admin status:", err);
            }
          }, 0);
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // If user is logged in, check if they're an admin
      if (session?.user) {
        supabase.rpc('is_admin').then(({ data, error }) => {
          if (!error) {
            setIsAdmin(!!data);
          }
        });
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, session, loading, isAdmin };
}

export function useRequireAuth(redirectTo: string = "/auth") {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate(redirectTo);
    }
  }, [user, loading, navigate, redirectTo]);

  return { user, loading };
}

export function useRequireAdmin(redirectTo: string = "/") {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth");
      } else if (!isAdmin) {
        navigate(redirectTo);
      }
    }
  }, [user, loading, isAdmin, navigate, redirectTo]);

  return { user, loading, isAdmin };
}
