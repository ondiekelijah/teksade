import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export const SignUpFrom = () => {
  const supabase = createClientComponentClient()
  return (
    <div className="">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#4338CA',
              },
            },
          },
        }}
        providers={['google', 'github']}
        socialLayout="horizontal"
      />
    </div>
  )

};
