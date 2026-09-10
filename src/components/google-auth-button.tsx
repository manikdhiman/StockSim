'use client'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
export default function GoogleAuthButton() {
  const handleLogin = async () => {
    const supabase = createClient()    
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback?next=/dashboard`,
      },
    })
  }

  return (
    <Button 
      variant="outline" 
      type="button" 
      className="w-full" 
      onClick={handleLogin}
    >
      {/* You can add a Google Icon SVG here if you like */}
      Sign in with Google
    </Button>
  )
}