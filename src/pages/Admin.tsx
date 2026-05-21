import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { 
  Users, 
  ShieldCheck, 
  DollarSign, 
  Briefcase, 
  Search, 
  Check, 
  X,
  TrendingUp,
  BarChart3
} from 'lucide-react';

export const Admin: React.FC = () => {
  const { fundis, bookings, transactions, verifyFundi, user } = useApp();
  const [search, setSearch] = useState('');

  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-black mb-4">Access Denied</h1>
        <p className="text-muted-foreground">You do not have administrative privileges.</p>
      </div>
    );
  }

  const stats = [
    { name: 'Total Revenue', value: 'KES 45,200', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Active Fundis', value: fundis.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Jobs Completed', value: bookings.filter(b => b.status === 'completed').length, icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'System Trust', value: '98.5%', icon: ShieldCheck, color: 'text-primary', bg: 'bg-primary/10' },
  ];

  const pendingVerification = fundis.filter(f => !f.isVerified);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2">Admin Control Center</h1>
          <p className="text-muted-foreground">Manage the Tuma Fundi 2.0 ecosystem</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="gap-2"><BarChart3 className="h-4 w-4" /> Export Data</Button>
          <Button className="gap-2"><TrendingUp className="h-4 w-4" /> Growth Insights</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <Card key={stat.name} className="overflow-hidden border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
              <div className={`${stat.bg} ${stat.color} p-2 rounded-xl`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black">{stat.value}</div>
              <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" /> +12% from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Verification Queue */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Fundi Verification Queue</CardTitle>
                <CardDescription>Review and approve new artisan applications</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search applicants..." className="pl-9 h-9" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Artisan</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingVerification.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No pending verifications</TableCell>
                    </TableRow>
                  ) : (
                    pendingVerification.map((f) => (
                      <TableRow key={f.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden">
                              <img src={`https://i.pravatar.cc/150?u=${f.id}`} alt="" />
                            </div>
                            <div className="text-sm">
                              <p className="font-bold">{f.name}</p>
                              <p className="text-xs text-muted-foreground">{f.phone}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize text-xs">{f.category}</TableCell>
                        <TableCell className="text-xs">{f.location}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] uppercase">Unverified</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><X className="h-4 w-4" /></Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600" onClick={() => verifyFundi(f.id)}><Check className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Overview of system-wide payments and fees</CardDescription>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.slice(0, 5).map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="text-xs">{new Date(tx.date).toLocaleDateString()}</TableCell>
                      <TableCell className="capitalize text-xs font-medium">{tx.type}</TableCell>
                      <TableCell className="text-xs font-bold">KES {tx.amount}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-[10px] uppercase">{tx.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-none">
            <CardHeader>
              <CardTitle className="text-lg">Subscription Revenue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-1">
                 <div className="flex justify-between text-xs">
                   <span className="text-slate-400">Basic (300)</span>
                   <span>42%</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[42%]"></div>
                 </div>
               </div>
               <div className="space-y-1">
                 <div className="flex justify-between text-xs">
                   <span className="text-slate-400">Standard (500)</span>
                   <span>38%</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[38%]"></div>
                 </div>
               </div>
               <div className="space-y-1">
                 <div className="flex justify-between text-xs">
                   <span className="text-slate-400">Premium (1000)</span>
                   <span>20%</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 w-[20%]"></div>
                 </div>
               </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold">Revenue Report</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-xs font-bold text-red-700">High Unreliability Alert</p>
                <p className="text-[10px] text-red-600">Fundi #F42 has missed 3 appointments today.</p>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-xl">
                <p className="text-xs font-bold text-yellow-700">M-Pesa API Latency</p>
                <p className="text-[10px] text-yellow-600">Callback response time increased by 400ms.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};