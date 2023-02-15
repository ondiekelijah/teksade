import React from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { supabase } from "../supabase";

const AuthPage = () => {
  return (
    <div className=" container mx-auto ">
      <Auth
        supabaseClient={supabase}
        providers={["google", "github"]}
        appearance={{ theme: ThemeSupa }}
        socialLayout="horizontal"
        theme="dark"
      />
    </div>
  );
};

export default AuthPage;
