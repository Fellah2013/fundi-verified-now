import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { CATEGORIES } from '../lib/mockData';
import { 
  Zap, 
  Calendar, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, fundis, createBooking } = useApp();
  
  const typeParam = searchParams.get('type') || 'scheduled';
  const fundiIdParam = searchParams.get('fundiId');

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingType, setBookingType] = useState<'emergency' | 'scheduled'>(typeParam as any);
  const [selectedCategory, setSelectedCategory] = useState(fundis.find(f => f.id === fundiIdParam)?.category || '');
  const [selectedFundi, setSelectedFundi] = useState(fundiIdParam || '');
  
  const [formData, setFormData] = useState({
    location: user?.location || '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00'
  });

  const fundi = fundis.find(f => f.id === selectedFundi);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    
    setLoading(true);
    
    // Auto-match if emergency or no fundi selected
    let targetFundiId = selectedFundi;
    if (bookingType === 'emergency' || !targetFundiId) {
      const availableFundis = fundis.filter(f => f.availability && (selectedCategory ? f.category === selectedCategory : true));
      targetFundiId = availableFundis[Math.floor(Math.random() * availableFundis.length)]?.id || fundis[0].id;
    }

    const targetFundi = fundis.find(f => f.id === targetFundiId)!;

    setTimeout(() => {
      createBooking({
        customerId: user.id,
        fundiId: targetFundiId,
        category: selectedCategory || targetFundi.category,
        status: 'pending',
        type: bookingType,
        date: formData.date,
        description: formData.description,
        amount: targetFundi.hourlyRate * 2, // Mock 2 hours
        location: formData.location
      });
      setLoading(false);
      setStep(3);
    }, 2500);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-black mb-2">
          {bookingType === 'emergency' ? 'Emergency Request' : 'Schedule a Fundi'}
        </h1>
        <p className="text-muted-foreground">
          {bookingType === 'emergency' ? 'We will dispatch the nearest verified professional instantly.' : 'Choose your preferred date and time for a service.'}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                {/* Type Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Request Type</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div 
                      onClick={() => setBookingType('scheduled')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${bookingType === 'scheduled' ? 'border-primary bg-primary/5' : 'border-slate-100'}`}
                    >
                      <Calendar className={`h-8 w-8 ${bookingType === 'scheduled' ? 'text-primary' : 'text-slate-400'}`} />
                      <span className="font-bold">Scheduled</span>
                    </div>
                    <div 
                      onClick={() => setBookingType('emergency')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${bookingType === 'emergency' ? 'border-destructive bg-destructive/5' : 'border-slate-100'}`}
                    >
                      <Zap className={`h-8 w-8 ${bookingType === 'emergency' ? 'text-destructive' : 'text-slate-400'}`} />
                      <span className="font-bold">Emergency</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Category Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What do you need help with?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`p-3 rounded-xl border text-sm font-medium transition-all ${selectedCategory === cat.id ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-slate-50'}`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Button className="w-full h-14 text-lg font-bold" onClick={() => setStep(2)} disabled={!selectedCategory}>
                  Next: Job Details <ChevronRight className="ml-2" />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                    <CardDescription>Tell us more about the task</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label>Location / Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-10" 
                            placeholder="Apartment, Street, Area" 
                            value={formData.location}
                            onChange={e => setFormData({...formData, location: e.target.value})}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Input 
                            type="date" 
                            value={formData.date}
                            onChange={e => setFormData({...formData, date: e.target.value})}
                            required
                            disabled={bookingType === 'emergency'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Time</Label>
                          <Input 
                            type="time" 
                            value={formData.time}
                            onChange={e => setFormData({...formData, time: e.target.value})}
                            required
                            disabled={bookingType === 'emergency'}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Describe the problem</Label>
                        <Textarea 
                          placeholder="e.g. My kitchen sink is leaking and there's water everywhere..."
                          rows={4}
                          value={formData.description}
                          onChange={e => setFormData({...formData, description: e.target.value})}
                          required
                        />
                      </div>

                      {bookingType === 'emergency' && (
                        <div className="bg-destructive/10 text-destructive p-4 rounded-xl flex gap-3">
                          <AlertTriangle className="h-5 w-5 shrink-0" />
                          <p className="text-sm font-medium">Emergency requests incur a 20% priority surcharge but guarantee response within 30 minutes.</p>
                        </div>
                      )}

                      <div className="flex gap-4">
                        <Button variant="outline" type="button" onClick={() => setStep(1)} className="w-1/3 h-14">Back</Button>
                        <Button className={`w-2/3 h-14 text-lg font-bold ${bookingType === 'emergency' ? 'bg-destructive hover:bg-destructive/90' : ''}`} disabled={loading}>
                          {loading ? <Loader2 className="mr-2 animate-spin" /> : (bookingType === 'emergency' ? 'Tuma Now!' : 'Confirm Booking')}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <Card className="border-green-200 bg-green-50/50">
                  <CardContent className="pt-12 pb-12">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h2 className="text-3xl font-black mb-2 text-green-900">Request Sent!</h2>
                    <p className="text-green-700 mb-8 max-w-sm mx-auto">
                      {bookingType === 'emergency' 
                        ? 'We have dispatched the nearest fundi to your location. You will receive an SMS with their details shortly.'
                        : 'Your booking has been sent. The fundi will confirm your appointment within the hour.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
                      <Button variant="outline" onClick={() => navigate('/marketplace')}>Find More Fundis</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Summary Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service</span>
                <span className="font-bold capitalize">{selectedCategory || 'Not selected'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type</span>
                <span className={`font-bold capitalize ${bookingType === 'emergency' ? 'text-destructive' : ''}`}>{bookingType}</span>
              </div>
              {fundi && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fundi</span>
                  <span className="font-bold">{fundi.name}</span>
                </div>
              )}
              <div className="border-t pt-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs uppercase font-bold text-muted-foreground">Estimated Cost</p>
                    <p className="text-2xl font-black">KES {bookingType === 'emergency' ? '1,500' : '800'}</p>
                  </div>
                  <Badge variant="secondary">Pay after job</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" /> Escrow Protection
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your payment is only released to the fundi after you confirm the job is completed to your satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};