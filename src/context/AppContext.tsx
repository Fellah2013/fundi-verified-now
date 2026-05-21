import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Fundi, Booking, Transaction, SubscriptionTier } from '../types';
import { INITIAL_FUNDIS } from '../lib/mockData';
import { toast } from 'sonner';

interface AppContextType {
  user: User | null;
  fundis: Fundi[];
  bookings: Booking[];
  transactions: Transaction[];
  login: (email: string, role: string) => void;
  logout: () => void;
  registerUser: (userData: Partial<User>) => void;
  payRegistrationFee: () => void;
  updateSubscription: (tier: SubscriptionTier) => void;
  createBooking: (booking: Omit<Booking, 'id'>) => void;
  completeJob: (bookingId: string) => void;
  withdrawFunds: (amount: number) => void;
  verifyFundi: (fundiId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('tf_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [fundis, setFundis] = useState<Fundi[]>(() => {
    const saved = localStorage.getItem('tf_fundis');
    return saved ? JSON.parse(saved) : INITIAL_FUNDIS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('tf_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('tf_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tf_user', JSON.stringify(user));
    localStorage.setItem('tf_fundis', JSON.stringify(fundis));
    localStorage.setItem('tf_bookings', JSON.stringify(bookings));
    localStorage.setItem('tf_transactions', JSON.stringify(transactions));
  }, [user, fundis, bookings, transactions]);

  const login = (email: string, role: string) => {
    // Simple mock login
    if (email === 'admin@tumafundi.com') {
      setUser({ id: 'admin-1', name: 'System Admin', email, phone: '0700000000', role: 'admin', location: 'Nairobi', isRegistered: true, subscription: 'premium' });
      toast.success('Admin Login Successful');
      return;
    }

    const existingFundi = fundis.find(f => f.email === email);
    if (existingFundi) {
      setUser(existingFundi);
      toast.success(`Welcome back, ${existingFundi.name}`);
      return;
    }

    // Default mock customer login
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      phone: '07XXXXXXXX',
      role: role as any,
      location: 'Nairobi',
      isRegistered: false,
      subscription: 'none',
      walletBalance: 0
    };
    setUser(newUser);
    toast.success('Login Successful');
  };

  const logout = () => {
    setUser(null);
    toast.info('Logged out');
  };

  const registerUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      role: userData.role || 'customer',
      location: userData.location || '',
      isRegistered: false,
      subscription: 'none',
      walletBalance: 0,
      ...userData
    };

    if (newUser.role === 'fundi') {
      const newFundi: Fundi = {
        ...newUser,
        category: 'plumbing',
        skills: [],
        rating: 0,
        jobCount: 0,
        isVerified: false,
        hourlyRate: 500,
        availability: true,
        trustedBadge: false
      };
      setFundis([...fundis, newFundi]);
      setUser(newFundi);
    } else {
      setUser(newUser);
    }
    toast.success('Registration step 1 complete');
  };

  const payRegistrationFee = () => {
    if (!user) return;
    setUser({ ...user, isRegistered: true });
    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      amount: 200,
      type: 'registration',
      status: 'completed',
      date: new Date().toISOString(),
      description: 'Non-refundable registration fee'
    };
    setTransactions([newTx, ...transactions]);
    toast.success('Registration fee paid successfully!');
  };

  const updateSubscription = (tier: SubscriptionTier) => {
    if (!user) return;
    const prices = { none: 0, basic: 300, standard: 500, premium: 1000 };
    setUser({ ...user, subscription: tier });
    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      amount: prices[tier],
      type: 'subscription',
      status: 'completed',
      date: new Date().toISOString(),
      description: `${tier.toUpperCase()} subscription activation`
    };
    setTransactions([newTx, ...transactions]);
    toast.success(`${tier} plan activated!`);
  };

  const createBooking = (bookingData: Omit<Booking, 'id'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending'
    };
    setBookings([newBooking, ...bookings]);
    toast.success(bookingData.type === 'emergency' ? 'Emergency Fundi dispatched!' : 'Booking request sent');
  };

  const completeJob = (bookingId: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'completed' } : b));
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      // Wallet logic for fundi
      const commission = booking.amount * 0.15;
      const earnings = booking.amount - commission;

      setFundis(prev => prev.map(f => {
        if (f.id === booking.fundiId) {
          return {
            ...f,
            jobCount: f.jobCount + 1,
            walletBalance: (f.walletBalance || 0) + earnings
          };
        }
        return f;
      }));

      const newTx: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        userId: booking.fundiId,
        amount: earnings,
        type: 'payment',
        status: 'completed',
        date: new Date().toISOString(),
        description: `Payment for job ${booking.category}`
      };
      setTransactions([newTx, ...transactions]);
      toast.success('Job completed and payment released!');
    }
  };

  const withdrawFunds = (amount: number) => {
    if (!user || (user.walletBalance || 0) < amount) {
      toast.error('Insufficient balance');
      return;
    }
    setUser({ ...user, walletBalance: (user.walletBalance || 0) - amount });
    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      amount: amount,
      type: 'withdrawal',
      status: 'completed',
      date: new Date().toISOString(),
      description: 'Wallet withdrawal to M-Pesa'
    };
    setTransactions([newTx, ...transactions]);
    toast.success(`KES ${amount} withdrawn to M-Pesa`);
  };

  const verifyFundi = (fundiId: string) => {
    setFundis(prev => prev.map(f => f.id === fundiId ? { ...f, isVerified: true, trustedBadge: f.jobCount > 50 } : f));
    toast.success('Fundi verified successfully');
  };

  return (
    <AppContext.Provider value={{
      user, fundis, bookings, transactions,
      login, logout, registerUser, payRegistrationFee, updateSubscription,
      createBooking, completeJob, withdrawFunds, verifyFundi
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};