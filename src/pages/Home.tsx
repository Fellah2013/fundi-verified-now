import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CATEGORIES } from '../lib/mockData';
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Star,
  Users,
  Award,
  Facebook,
  Twitter,
  Instagram,
  Mail
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const { user } = useApp();
  const logoUrl = "https://storage.googleapis.com/dala-prod-public-storage/attachments/ab1da22d-5cd6-4d1d-8bd6-481183c231d1/1779221220588_Tuma_Fundi_Logo_Updated.jpeg";

  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary pt-16 pb-24 lg:pt-32 lg:pb-40 text-primary-foreground">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <Badge className="mb-4 bg-white/20 text-white border-none hover:bg-white/30 px-3 py-1">
                Verified Skills on Demand
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
                Your Trusted <br/>
                <span className="text-secondary-foreground bg-white px-2 inline-block -rotate-1 mt-2">Fundi Network</span>
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-lg leading-relaxed">
                Connect with the top 1% of Kenyan artisans. Verified skills, guaranteed reliability, and recurring maintenance for your home or business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/marketplace">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-bold shadow-xl">
                    Find a Fundi
                  </Button>
                </Link>
                <Link to="/booking?type=emergency">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto h-14 px-8 text-lg font-bold border-2 border-primary-foreground">
                    <Zap className="mr-2 h-5 w-5 text-yellow-500 fill-yellow-500" />
                    Tuma Now!
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 opacity-75">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold">2,500+ Verified Fundis</p>
                  <p className="text-primary-foreground/60">Across Nairobi, Mombasa & Kisumu</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10 aspect-[4/5]">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/449c7223-a874-4394-9bd4-f0b311cb6398/hero-fundi-1-e93f9293-1779207987990.webp" 
                  alt="Professional Fundi" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl text-slate-900 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 text-green-700 p-2 rounded-full">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-slate-500">Verified Professional</p>
                      <p className="text-lg font-bold">John Kamau - Master Electrician</p>
                      <div className="flex gap-1 mt-1">
                        {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
                        <span className="text-xs ml-1 font-medium">(150+ reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-10 -right-10 bg-secondary text-secondary-foreground p-8 rounded-full shadow-2xl animate-bounce">
                <p className="text-center">
                  <span className="block text-3xl font-black leading-tight">KES 200</span>
                  <span className="text-xs font-bold uppercase">Registration</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-accent/20 rounded-full blur-2xl"></div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border p-8 md:p-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center lg:border-r">
            <p className="text-4xl font-black text-primary">98%</p>
            <p className="text-muted-foreground font-medium">Satisfaction Rate</p>
          </div>
          <div className="text-center lg:border-r">
            <p className="text-4xl font-black text-primary">15min</p>
            <p className="text-muted-foreground font-medium">Avg Dispatch Time</p>
          </div>
          <div className="text-center lg:border-r">
            <p className="text-4xl font-black text-primary">12k+</p>
            <p className="text-muted-foreground font-medium">Jobs Completed</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black text-primary">24/7</p>
            <p className="text-muted-foreground font-medium">Priority Support</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 mt-12">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black mb-2">Popular Categories</h2>
            <p className="text-muted-foreground">The most requested services in your area</p>
          </div>
          <Link to="/marketplace">
            <Button variant="ghost" className="hidden sm:flex group">
              View all <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={`/marketplace?category=${cat.id}`}>
              <Card className="hover:border-primary transition-all cursor-pointer hover:shadow-lg h-full overflow-hidden">
                <div className="h-24 bg-slate-100 relative overflow-hidden">
                   <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <CardHeader className="p-3 text-center">
                  <CardTitle className="text-sm font-bold truncate">{cat.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Subscriptions */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Membership Plans</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our network and enjoy priority response, discounted rates, and verified professional access.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic */}
            <Card className="flex flex-col border-2 relative">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Basic</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-black">KES 300</span>
                  <span className="text-muted-foreground font-medium"> /mo</span>
                </div>
                <CardDescription className="mt-2">For occasional home maintenance</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Standard booking access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Basic support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Normal response times</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/register?plan=basic" className="w-full">
                  <Button variant="outline" className="w-full">Choose Basic</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Standard */}
            <Card className="flex flex-col border-2 border-primary relative shadow-2xl scale-105 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Standard</CardTitle>
                <div className="mt-4 text-primary">
                  <span className="text-4xl font-black">KES 500</span>
                  <span className="text-muted-foreground font-medium"> /mo</span>
                </div>
                <CardDescription className="mt-2">Ideal for active households</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="font-medium">Faster matching speed</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="font-medium">Discounted service fees</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="font-medium">Priority fundi pool</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/register?plan=standard" className="w-full">
                  <Button className="w-full">Choose Standard</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Premium */}
            <Card className="flex flex-col border-2 relative">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Premium</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-black">KES 1000</span>
                  <span className="text-muted-foreground font-medium"> /mo</span>
                </div>
                <CardDescription className="mt-2">Ultimate peace of mind</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="font-bold">Instant dispatch (24/7)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Dedicated support line</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Top-rated fundis only</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/register?plan=premium" className="w-full">
                  <Button variant="outline" className="w-full">Choose Premium</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Tuma Fundi */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-black mb-8">Why Tuma Fundi wins in Kenya</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="bg-primary/10 text-primary p-4 rounded-2xl shrink-0 h-fit">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Verified Professional Network</h3>
                  <p className="text-muted-foreground">Every fundi undergoes rigorous ID verification, skill grading, and background checks. No more guessing who is entering your home.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-primary/10 text-primary p-4 rounded-2xl shrink-0 h-fit">
                  <Clock className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Guaranteed Response</h3>
                  <p className="text-muted-foreground">Tired of fundis not showing up? Our system tracks attendance and punishes unreliability. Subscribers get guaranteed arrival times.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-primary/10 text-primary p-4 rounded-2xl shrink-0 h-fit">
                  <Zap className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Emergency "Tuma Now"</h3>
                  <p className="text-muted-foreground">Burst pipe at 2 AM? Our emergency button bypasses scheduling to find the nearest available verified professional instantly.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-100 rounded-[3rem] p-12 relative overflow-hidden">
             <div className="relative z-10">
               <div className="bg-white p-6 rounded-2xl shadow-xl border mb-6 flex items-center gap-4">
                  <Award className="h-10 w-10 text-yellow-500" />
                  <div>
                    <p className="font-bold">Trusted Badge System</p>
                    <p className="text-sm text-muted-foreground">Earned by fundis with 95%+ completion score</p>
                  </div>
               </div>
               <div className="bg-white p-6 rounded-2xl shadow-xl border flex items-center gap-4 ml-12">
                  <Users className="h-10 w-10 text-blue-500" />
                  <div>
                    <p className="font-bold">Estate Management</p>
                    <p className="text-sm text-muted-foreground">Bulk subscriptions for apartments & SACCOs</p>
                  </div>
               </div>
             </div>
             <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-64 h-64 bg-primary/10 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 mb-16">
        <div className="bg-primary rounded-[3rem] p-12 lg:p-20 text-primary-foreground text-center overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">Ready to find a reliable fundi?</h2>
            <p className="text-xl mb-10 opacity-80 max-w-2xl mx-auto">
              Register today for just KES 200 and get access to the most trusted network of artisans in the country.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="px-10 h-16 text-lg font-bold">Register Now</Button>
              </Link>
              <Link to="/marketplace">
                <Button size="lg" variant="outline" className="px-10 h-16 text-lg font-bold border-white/30 hover:bg-white/10">Browse Marketplace</Button>
              </Link>
            </div>
          </div>
          {/* Abstract bg shapes */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white rounded-full"></div>
             <div className="absolute bottom-20 right-20 w-40 h-40 border-8 border-white rounded-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
};