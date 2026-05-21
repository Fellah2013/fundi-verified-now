import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CATEGORIES } from '../lib/mockData';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Filter, 
  Zap, 
  Hammer,
  Clock,
  ChevronRight,
  Droplets,
  Zap as ZapIcon,
  Hammer as HammerIcon,
  BrickWall,
  Paintbrush,
  Sparkles,
  Monitor,
  Bug,
  Leaf,
  Grid,
  Shield,
  Truck,
  Home
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Droplets: <Droplets className="h-4 w-4" />,
  Zap: <ZapIcon className="h-4 w-4" />,
  Hammer: <HammerIcon className="h-4 w-4" />,
  BrickWall: <BrickWall className="h-4 w-4" />,
  Paintbrush: <Paintbrush className="h-4 w-4" />,
  Sparkles: <Sparkles className="h-4 w-4" />,
  Monitor: <Monitor className="h-4 w-4" />,
  Bug: <Bug className="h-4 w-4" />,
  Leaf: <Leaf className="h-4 w-4" />,
  Grid: <Grid className="h-4 w-4" />,
  Shield: <Shield className="h-4 w-4" />,
  Truck: <Truck className="h-4 w-4" />,
  Home: <Home className="h-4 w-4" />
};

export const Marketplace: React.FC = () => {
  const { fundis } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  
  const categoryFilter = searchParams.get('category') || 'all';

  const selectedCategoryData = useMemo(() => {
    return CATEGORIES.find(c => c.id === categoryFilter);
  }, [categoryFilter]);

  const filteredFundis = useMemo(() => {
    return fundis.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) || 
                            f.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = categoryFilter === 'all' || f.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [fundis, search, categoryFilter]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2">Marketplace</h1>
          <p className="text-muted-foreground">Find verified artisans for your next project</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Link to="/booking?type=emergency" className="flex-1 md:flex-none">
            <Button variant="destructive" className="w-full gap-2 shadow-lg shadow-destructive/20 h-12">
              <Zap className="h-5 w-5 fill-current" />
              Tuma Now (Emergency)
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="space-y-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search skills or name..." 
              className="pl-10 h-12"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Filter className="h-4 w-4" /> Categories
            </h3>
            <div className="space-y-1">
              <button 
                onClick={() => setSearchParams({})}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${categoryFilter === 'all' ? 'bg-primary text-primary-foreground font-bold' : 'hover:bg-slate-100'}`}
              >
                All Categories
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setSearchParams({ category: cat.id })}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${categoryFilter === cat.id ? 'bg-primary text-primary-foreground font-bold' : 'hover:bg-slate-100'}`}
                >
                  <div className="flex items-center gap-2">
                    {iconMap[cat.icon]}
                    {cat.name}
                  </div>
                  <Badge variant="secondary" className="text-[10px] bg-slate-200/50">
                    {fundis.filter(f => f.category === cat.id).length}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          {selectedCategoryData && (
            <div className="bg-slate-50 p-6 rounded-2xl border">
              <h4 className="font-bold text-sm mb-2">About {selectedCategoryData.name}</h4>
              {selectedCategoryData.description && (
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  {selectedCategoryData.description}
                </p>
              )}
              
              <h4 className="font-bold text-sm mb-4">Services</h4>
              <ul className="space-y-4">
                {selectedCategoryData.services.map((service, idx) => (
                  <li key={idx} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="text-xs font-bold">{service.name}</span>
                    </div>
                    {service.description && (
                      <p className="text-[10px] text-muted-foreground pl-3.5">
                        {service.description}
                      </p>
                    )}
                    {service.action && (
                      <div className="pl-3.5">
                        <Link to="/booking">
                          <Button variant="outline" size="sm" className="h-7 text-[10px] px-2 py-0">
                            {service.action}
                          </Button>
                        </Link>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" /> Tuma Trust™
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every fundi on this list has passed a 12-point verification check including National ID and skill grading.
            </p>
          </div>
        </aside>

        {/* Listings */}
        <div className="lg:col-span-3">
          {filteredFundis.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed">
              <Hammer className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-xl font-bold">No fundis found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
              <Button variant="link" onClick={() => {setSearchParams({}); setSearch('');}}>Clear all filters</Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredFundis.map((fundi) => (
                <Card key={fundi.id} className="group hover:border-primary transition-all overflow-hidden flex flex-col h-full">
                  <CardHeader className="p-0 relative">
                    <div className="h-32 bg-slate-100 overflow-hidden">
                       <img 
                        src={`https://images.unsplash.com/photo-${fundi.category === 'plumbing' ? '1584622650111-993a426fbf0a' : (fundi.category === 'electrical' ? '1621905251189-08b45d6a269e' : (fundi.category === 'roofing-ceiling' ? '1632759145351-1d592919f522' : '1581578731548-c64695ce6958'))}?w=400&auto=format&fit=crop`} 
                        alt="work" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-6 left-4 flex gap-2">
                      <div className="w-16 h-16 rounded-2xl border-4 border-white overflow-hidden shadow-lg bg-white">
                        <img src={`https://i.pravatar.cc/150?u=${fundi.id}`} alt={fundi.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-8 pb-4 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg flex items-center gap-2">
                          {fundi.name}
                          {fundi.trustedBadge && <ShieldCheck className="h-4 w-4 text-primary fill-primary/10" />}
                        </h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {fundi.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-yellow-500 font-bold">
                          <Star className="h-4 w-4 fill-current" /> {fundi.rating}
                        </div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">{fundi.jobCount} Jobs</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-4">
                      {fundi.skills.slice(0, 3).map(skill => (
                        <Badge key={skill} variant="secondary" className="text-[10px] font-normal">{skill}</Badge>
                      ))}
                      {fundi.skills.length > 3 && <Badge variant="secondary" className="text-[10px] font-normal">+{fundi.skills.length - 3}</Badge>}
                    </div>

                    <div className="mt-6 p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                       <div>
                         <p className="text-[10px] uppercase font-bold text-muted-foreground">Starting from</p>
                         <p className="font-black text-lg">KES {fundi.hourlyRate}<span className="text-xs font-normal">/hr</span></p>
                       </div>
                       <Badge variant={fundi.availability ? "outline" : "secondary"} className={fundi.availability ? "text-green-600 border-green-200" : ""}>
                         {fundi.availability ? "Available Now" : "Busy"}
                       </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link to={`/booking?fundiId=${fundi.id}`} className="w-full">
                      <Button className="w-full group" disabled={!fundi.availability}>
                        Book Now <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};