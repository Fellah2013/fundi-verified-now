import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { CheckCircle2, ShieldCheck, Smartphone, Landmark, Hammer, ArrowRight, Loader2 } from 'lucide-react';
import { SubscriptionTier } from '../types';
import { motion } from 'framer-motion';

export const Register: React.FC = () => {
  const { registerUser, payRegistrationFee, updateSubscription, user } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const logoUrl = "https://storage.googleapis.com/dala-prod-public-storage/attachments/ab1da22d-5cd6-4d1d-8bd6-481183c231d1/1779221220588_Tuma_Fundi_Logo_Updated.jpeg";
  
  const [step, setStep] = useState(user?.isRegistered ? 3 : (user ? 2 : 1));
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'customer' as 'customer' | 'fundi',
    location: 'Nairobi'
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      registerUser(formData);
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handlePayFee = () => {
    setLoading(true);
    setTimeout(() => {
      payRegistrationFee();
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  const handlePlanSelect = (tier: SubscriptionTier) => {
    setLoading(true);
    setTimeout(() => {
      updateSubscription(tier);
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl min-h-[calc(100-64px)] flex flex-col items-center">
      <Link to="/" className="mb-12 flex flex-col items-center gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-2xl border shadow-lg bg-white p-1">
          <img src={logoUrl} alt="Tuma Fundi Logo" className="h-full w-full object-contain" />
        </div>
        <h1 className="text-xl font-black tracking-tight text-primary">Tuma Fundi <span className="text-muted-foreground font-light text-sm">2.0</span></h1>
      </Link>

      {/* Progress */}
      <div className="w-full flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2"></div>
        {[1, 2, 3].map((s) => (
          <div 
            key={s} 
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              step >= s ? 'bg-primary text-primary-foreground' : 'bg-slate-200 text-slate-500'
            }`}
          >
            {step > s ? <CheckCircle2 className="h-6 w-6" /> : s}
          </div>
        ))}
      </div>

      {step === 1 && (
        <motion.div className="w-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-black">Join Tuma Fundi 2.0</CardTitle>
              <CardDescription>Start your journey toward reliable skilled labor</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => setFormData({...formData, role: 'customer'})}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.role === 'customer' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'}`}
                  >
                    <Smartphone className={`h-8 w-8 mb-2 ${formData.role === 'customer' ? 'text-primary' : 'text-slate-400'}`} />
                    <p className="font-bold">I'm a Customer</p>
                    <p className="text-xs text-muted-foreground">Looking for repairs</p>
                  </div>
                  <div 
                    onClick={() => setFormData({...formData, role: 'fundi'})}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.role === 'fundi' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'}`}
                  >
                    <Hammer className={`h-8 w-8 mb-2 ${formData.role === 'fundi' ? 'text-primary' : 'text-slate-400'}`} />
                    <p className="font-bold">I'm a Fundi</p>
                    <p className="text-xs text-muted-foreground">Offering my skills</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" required placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (M-Pesa)</Label>
                    <Input id="phone" required placeholder="0712 345 678" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" required placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 font-bold" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Continue'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div className="w-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-primary shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Landmark className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-black">Registration Fee</CardTitle>
              <CardDescription>Complete your onboarding with a one-time KES 200 fee</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Onboarding Package</span>
                  <span className="font-black">KES 200.00</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Account verification</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Professional matching activation</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Platform access</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-center font-medium">Payment Method: <span className="text-green-600 font-bold">M-Pesa</span></p>
                <div className="p-4 border-2 border-dashed rounded-xl text-center text-sm text-muted-foreground">
                  You will receive an STK Push on <span className="font-bold text-slate-900">{user?.phone}</span>
                </div>
              </div>

              <Button onClick={handlePayFee} className="w-full h-12 font-bold" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Pay KES 200 via M-Pesa'}
              </Button>
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-xs text-muted-foreground italic">* This is a non-refundable commitment fee</p>
            </CardFooter>
          </Card>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div className="w-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-2">Select Your Plan</h2>
            <p className="text-muted-foreground">Unlock priority features and savings</p>
          </div>
          <div className="grid gap-6">
            {[
              { id: 'basic', name: 'Basic', price: 300, features: ['Standard matching', 'Basic support', 'Normal response time'] },
              { id: 'standard', name: 'Standard', price: 500, features: ['Faster matching', 'Discounted service fees', 'Priority fundi pool'], popular: true },
              { id: 'premium', name: 'Premium', price: 1000, features: ['Instant dispatch (24/7)', 'Dedicated support line', 'Best-rated fundis only'] }
            ].map((plan) => (
              <Card key={plan.id} className={`transition-all ${plan.popular ? 'border-primary ring-1 ring-primary' : ''}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      {plan.name}
                      {plan.popular && <Badge className="text-[10px] uppercase">Popular</Badge>}
                    </CardTitle>
                    <CardDescription>Monthly subscription</CardDescription>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black">KES {plan.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => handlePlanSelect(plan.id as SubscriptionTier)}
                    disabled={loading}
                  >
                    Activate {plan.name} Plan
                  </Button>
                </CardFooter>
              </Card>
            ))}
            <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mt-4 w-full">
              I'll choose later <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};