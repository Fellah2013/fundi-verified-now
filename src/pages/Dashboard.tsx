import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { 
  Wallet, 
  History, 
  Settings, 
  Star, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ArrowUpRight, 
  ArrowDownLeft,
  ShieldCheck,
  TrendingUp,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user, bookings, transactions, completeJob, withdrawFunds, logout } = useApp();
  const navigate = useNavigate();
  const [withdrawAmount, setWithdrawAmount] = useState('');

  if (!user) {
    navigate('/login');
    return null;
  }

  const userBookings = user.role === 'customer' 
    ? bookings.filter(b => b.customerId === user.id)
    : bookings.filter(b => b.fundiId === user.id);

  const userTransactions = transactions.filter(t => t.userId === user.id);

  return (
    <div className="container mx-auto px-4 py-8 max-6xl mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-white p-8 rounded-[2rem] border shadow-sm">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-primary/10 shadow-xl bg-slate-100">
             <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black">{user.name}</h1>
              {user.subscription !== 'none' && (
                <Badge className="bg-primary text-primary-foreground uppercase text-[10px]">
                  {user.subscription} Member
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-4 w-4" /> {user.location} • {user.role.toUpperCase()}
            </p>
            {!user.isRegistered && (
              <Badge variant="destructive" className="mt-2">Pending Registration Fee</Badge>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" /> Log out
          </Button>
          {user.role === 'customer' ? (
            <Button className="rounded-xl px-6" onClick={() => navigate('/marketplace')}>
              Find a Fundi
            </Button>
          ) : (
            <Button className="rounded-xl px-6">Edit Profile</Button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Col: Main content */}
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="bg-slate-100 p-1 rounded-xl mb-6">
              <TabsTrigger value="bookings" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <History className="h-4 w-4 mr-2" /> {user.role === 'fundi' ? 'My Jobs' : 'My Bookings'}
              </TabsTrigger>
              <TabsTrigger value="wallet" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Wallet className="h-4 w-4 mr-2" /> Wallet & Payments
              </TabsTrigger>
              <TabsTrigger value="settings" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Settings className="h-4 w-4 mr-2" /> Profile Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="space-y-4">
              {userBookings.length === 0 ? (
                <Card className="p-12 text-center border-dashed">
                  <Clock className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                  <h3 className="text-xl font-bold">No history yet</h3>
                  <p className="text-muted-foreground">Your {user.role === 'fundi' ? 'jobs' : 'bookings'} will appear here.</p>
                </Card>
              ) : (
                userBookings.map(booking => (
                  <Card key={booking.id} className="overflow-hidden hover:border-primary transition-colors">
                    <div className="flex items-center gap-4 p-5">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                         {booking.category === 'plumbing' ? <TrendingUp className="text-primary" /> : <Clock className="text-primary" />}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold capitalize">{booking.category} Service</h4>
                          <Badge variant={booking.status === 'completed' ? 'secondary' : (booking.status === 'pending' ? 'outline' : 'default')}>
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{booking.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                          <span>ID: {booking.id}</span>
                          <span>•</span>
                          <span>{booking.date}</span>
                          <span>•</span>
                          <span className="text-slate-900">KES {booking.amount}</span>
                        </div>
                      </div>
                      {user.role === 'fundi' && booking.status === 'pending' && (
                        <Button size="sm" onClick={() => completeJob(booking.id)}>Complete</Button>
                      )}
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="wallet" className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="bg-primary text-primary-foreground">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-primary-foreground/70">Total Earnings</CardDescription>
                    <CardTitle className="text-4xl font-black">KES {user.walletBalance || 0}</CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <p className="text-xs opacity-70">Available for instant withdrawal</p>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Withdraw to M-Pesa</CardDescription>
                    <div className="flex gap-2 mt-2">
                      <Input 
                        placeholder="Amount" 
                        type="number" 
                        value={withdrawAmount} 
                        onChange={e => setWithdrawAmount(e.target.value)} 
                      />
                      <Button onClick={() => withdrawFunds(Number(withdrawAmount))}>Withdraw</Button>
                    </div>
                  </CardHeader>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold">Recent Transactions</h3>
                {userTransactions.map(tx => (
                  <div key={tx.id} className="flex justify-between items-center p-4 bg-white rounded-xl border">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${tx.type === 'payment' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'}`}>
                        {tx.type === 'payment' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-bold text-sm capitalize">{tx.type}</p>
                        <p className="text-[10px] text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-black ${tx.type === 'payment' ? 'text-green-600' : 'text-slate-900'}`}>
                        {tx.type === 'payment' ? '+' : '-'} KES {tx.amount}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{tx.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Col: Sidebar info */}
        <div className="space-y-6">
          {/* Subscription Info */}
          <Card className="overflow-hidden">
            <div className="h-2 bg-primary"></div>
            <CardHeader>
              <CardTitle className="text-lg">Membership</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Active Plan</span>
                <Badge variant="secondary" className="capitalize">{user.subscription}</Badge>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Benefits</p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Priority Matching</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Verified Pros Only</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full" onClick={() => navigate('/register?step=3')}>Upgrade Plan</Button>
            </CardContent>
          </Card>

          {/* Verification Status (for fundis) */}
          {user.role === 'fundi' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-full flex items-center justify-center ${user.isRegistered ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                     <ShieldCheck />
                   </div>
                   <div>
                     <p className="text-sm font-bold">Background Check</p>
                     <p className="text-[10px] text-muted-foreground">{user.isRegistered ? 'Completed' : 'Pending Payment'}</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 opacity-50">
                   <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                     <Star />
                   </div>
                   <div>
                     <p className="text-sm font-bold">Skill Assessment</p>
                     <p className="text-[10px] text-muted-foreground">Pending Review</p>
                   </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-4 rounded-2xl border text-center">
                <p className="text-xs text-muted-foreground font-medium">Jobs</p>
                <p className="text-2xl font-black">{userBookings.length}</p>
             </div>
             <div className="bg-white p-4 rounded-2xl border text-center">
                <p className="text-xs text-muted-foreground font-medium">Points</p>
                <p className="text-2xl font-black">120</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};