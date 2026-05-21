import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Smartphone, Mail, Lock, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export const Login: React.FC = () => {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logoUrl = "https://storage.googleapis.com/dala-prod-public-storage/attachments/ab1da22d-5cd6-4d1d-8bd6-481183c231d1/1779221220588_Tuma_Fundi_Logo_Updated.jpeg";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, 'customer');
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col justify-center items-center min-h-[calc(100-64px)]">
      <Link to="/" className="mb-8 flex flex-col items-center gap-4">
        <div className="h-20 w-20 overflow-hidden rounded-2xl border shadow-xl bg-white p-1">
          <img src={logoUrl} alt="Tuma Fundi Logo" className="h-full w-full object-contain" />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-primary">Tuma Fundi <span className="text-muted-foreground font-light text-base">2.0</span></h1>
      </Link>

      <Card className="w-full max-w-md shadow-2xl border-2">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-black">Welcome Back</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-10 h-12"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="#" className="text-xs text-primary font-bold">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-10 h-12" required />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 font-bold" disabled={loading}>
              {loading ? <Loader2 className="mr-2 animate-spin" /> : 'Login'}
            </Button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-12 font-bold" type="button">
               <Smartphone className="mr-2 h-4 w-4" /> M-Pesa Phone Number
            </Button>
          </form>
        </CardContent>
        <CardHeader className="pt-0 text-center text-sm">
           <p className="text-muted-foreground">Don't have an account? <Link to="/register" className="text-primary font-bold">Register here</Link></p>
           <p className="text-xs mt-4 text-muted-foreground italic">Try admin@tumafundi.com for Admin View</p>
        </CardHeader>
      </Card>
    </div>
  );
};