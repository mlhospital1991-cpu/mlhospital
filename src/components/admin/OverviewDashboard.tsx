"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Calendar as CalendarIcon,
  Activity,
  CheckCircle2,
  ArrowRight,
  MousePointer2,
  Zap,
  ChevronRight
} from "lucide-react";

interface OverviewProps {
  appointments: any[];
  secondOpinions: any[];
  reviews: any[];
  doctors: any[];
}

const OverviewDashboard: React.FC<OverviewProps> = ({ appointments, secondOpinions, reviews, doctors }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [viewMode, setViewMode] = useState<'line' | 'bar'>('line');
  const [mounted, setMounted] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter data based on date range
  const filteredData = useMemo(() => {
    return appointments.filter(a => {
      const date = new Date(a.createdAt);
      if (startDate && date < new Date(startDate)) return false;
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (date > end) return false;
      }
      return true;
    });
  }, [appointments, startDate, endDate]);

  // Chart Data Calculation
  const chartData = useMemo(() => {
    let daysToShow = 7;
    let startPoint = new Date();
    startPoint.setDate(startPoint.getDate() - 6);

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      daysToShow = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);
      startPoint = start;
    } else if (startDate) {
      const start = new Date(startDate);
      daysToShow = Math.max(1, Math.ceil((new Date().getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);
      startPoint = start;
    }

    const maxPoints = 14; 
    const step = Math.ceil(daysToShow / maxPoints);
    const actualPoints = Math.min(daysToShow, maxPoints);

    const points = [];
    for (let i = 0; i < actualPoints; i++) {
      const currentDay = new Date(startPoint);
      currentDay.setDate(startPoint.getDate() + (i * step));
      
      const count = appointments.filter(a => {
        const d = new Date(a.createdAt);
        return d.toDateString() === currentDay.toDateString();
      }).length;

      points.push({
        label: currentDay.toLocaleDateString([], { month: 'short', day: 'numeric' }),
        count
      });
    }

    const maxCount = Math.max(...points.map(p => p.count), 5);
    return points.map(p => ({
      ...p,
      y: 100 - (p.count / maxCount) * 75 - 15,
      height: (p.count / maxCount) * 100
    }));
  }, [appointments, startDate, endDate]);

  const linePath = useMemo(() => {
    if (chartData.length < 2) return "";
    const step = 100 / (chartData.length - 1);
    let d = `M 0 ${chartData[0].y}`;
    for (let i = 0; i < chartData.length - 1; i++) {
      const x1 = i * step;
      const y1 = chartData[i].y;
      const x2 = (i + 1) * step;
      const y2 = chartData[i + 1].y;
      const cp1x = x1 + (x2 - x1) / 2.5;
      const cp1y = y1;
      const cp2x = x1 + (x2 - x1) / 1.66;
      const cp2y = y2;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
    }
    return d;
  }, [chartData]);

  const areaPath = useMemo(() => {
    if (!linePath) return "";
    return `${linePath} L 100 100 L 0 100 Z`;
  }, [linePath]);

  if (!mounted) return <div className="min-h-[400px] flex items-center justify-center text-slate-400 font-bold">Loading Analytics...</div>;

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest rounded-full">System Intelligence</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">Analytics <span className="text-slate-300">Overview</span></h2>
          <p className="text-sm font-medium text-slate-500 mt-2">Historical trends and real-time performance metrics derived from hospital operations.</p>
        </div>

        <div className="flex items-center gap-2 bg-white/50 backdrop-blur-xl p-2 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-50 transition-all">
            <CalendarIcon size={12} className="text-slate-400" />
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent text-[10px] font-bold text-slate-900 outline-none uppercase cursor-pointer"
            />
          </div>
          <ChevronRight size={14} className="text-slate-300" />
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-50 transition-all">
            <CalendarIcon size={12} className="text-slate-400" />
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent text-[10px] font-bold text-slate-900 outline-none uppercase cursor-pointer"
            />
          </div>
          <button 
            onClick={() => { setStartDate(""); setEndDate(""); }}
            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
          >
            <Zap size={14} />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Total Bookings", value: filteredData.length, suffix: "records", icon: Activity, color: "text-indigo-600", bg: "bg-indigo-50/50" },
          { label: "Emergency Ratio", value: filteredData.length > 0 ? Math.round((filteredData.filter(a => a.status === 'emergency').length / filteredData.length) * 100) : 0, suffix: "percent", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50/50" },
          { label: "Action Completed", value: filteredData.length > 0 ? Math.round((filteredData.filter(a => a.status !== 'pending').length / filteredData.length) * 100) : 0, suffix: "percent", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50/50" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between group"
          >
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">{stat.value}</span>
                <span className="text-[10px] font-bold text-slate-300 uppercase">{stat.suffix}</span>
              </div>
            </div>
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
              <stat.icon size={20} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Graph Area */}
      <div className="bg-white rounded-[56px] border border-slate-100 shadow-sm p-2 relative">
        <div className="bg-slate-50/50 rounded-[48px] p-10 lg:p-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-900/10">
                <TrendingUp size={20} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Timeline Analytics</h3>
                <p className="text-xs font-medium text-slate-400">Comparing intake volume across the selected timeframe.</p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
              <button 
                onClick={() => setViewMode('line')}
                className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all ${
                  viewMode === 'line' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Line Graph
              </button>
              <button 
                onClick={() => setViewMode('bar')}
                className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all ${
                  viewMode === 'bar' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Intake Bar
              </button>
            </div>
          </div>

          <div className="h-[400px] w-full relative">
            {viewMode === 'line' ? (
              <svg 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none" 
                className="w-full h-full overflow-visible"
                style={{ shapeRendering: 'geometricPrecision' }}
              >
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {[0, 25, 50, 75, 100].map(val => (
                  <line key={val} x1="0" y1={val} x2="100" y2={val} stroke="#f1f5f9" strokeWidth="0.2" strokeDasharray="1 3" />
                ))}

                <motion.path 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  d={areaPath} 
                  fill="url(#areaGradient)" 
                />

                <AnimatePresence>
                  {hoveredPoint !== null && (
                    <motion.line 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }} 
                      x1={(hoveredPoint * (100 / Math.max(1, chartData.length - 1)))} 
                      y1="0" 
                      x2={(hoveredPoint * (100 / Math.max(1, chartData.length - 1)))} 
                      y2="100" 
                      stroke="#4f46e5" 
                      strokeWidth="0.15" 
                      strokeDasharray="2 2"
                    />
                  )}
                </AnimatePresence>

                {/* Subtle Glow Layer */}
                <motion.path 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  d={linePath} 
                  fill="none" 
                  stroke="#4f46e5" 
                  strokeWidth="1" 
                  filter="url(#glow)"
                />

                {/* Main Sharp Curve */}
                <motion.path 
                  initial={{ pathLength: 0, opacity: 0 }} 
                  animate={{ pathLength: 1, opacity: 1 }} 
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  d={linePath} 
                  fill="none" 
                  stroke="#4f46e5" 
                  strokeWidth="0.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />

                {chartData.map((p, i) => (
                  <g key={i} onMouseEnter={() => setHoveredPoint(i)} onMouseLeave={() => setHoveredPoint(null)}>
                    <rect x={(i * (100 / Math.max(1, chartData.length - 1))) - 2} y="0" width="4" height="100" fill="transparent" className="cursor-pointer" />
                    <motion.circle 
                      initial={{ scale: 0 }} 
                      animate={{ 
                        scale: hoveredPoint === i ? 2.5 : (i === chartData.length - 1 ? 1.8 : 0.6), 
                        opacity: hoveredPoint === i || i === chartData.length - 1 ? 1 : 0.3 
                      }} 
                      cx={chartData.length > 1 ? (i * (100 / (chartData.length - 1))) : 50} 
                      cy={p.y} 
                      r="1.2" 
                      fill={hoveredPoint === i ? "#4f46e5" : "white"} 
                      stroke="#4f46e5" 
                      strokeWidth="0.4" 
                    />
                  </g>
                ))}
              </svg>
            ) : (
              <div className="h-full w-full flex items-end justify-between gap-6 px-4">
                {chartData.map((data, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-6 group relative h-full justify-end" onMouseEnter={() => setHoveredPoint(i)} onMouseLeave={() => setHoveredPoint(null)}>
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${data.height}%` }}
                      className={`w-full rounded-2xl transition-all shadow-sm group-hover:shadow-md ${
                        data.count > 0 ? 'bg-gradient-to-t from-indigo-600 to-indigo-400' : 'bg-slate-200/50'
                      }`}
                      style={{ minHeight: '8px' }}
                    />
                    {data.count > 0 && hoveredPoint === i && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: -20 }}
                        className="absolute top-0 text-[10px] font-black text-indigo-600 bg-white px-2 py-1 rounded-lg border border-indigo-100 shadow-sm"
                      >
                        {data.count}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            <AnimatePresence>
              {hoveredPoint !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute z-30 bg-slate-900/95 backdrop-blur-md text-white p-5 rounded-3xl shadow-2xl pointer-events-none"
                  style={{ 
                    left: `${(hoveredPoint * (100 / Math.max(1, chartData.length - 1)))}%`,
                    top: `${viewMode === 'line' ? chartData[hoveredPoint].y : (100 - chartData[hoveredPoint].height)}%`,
                    transform: 'translate(-50%, -125%)'
                  }}
                >
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">{chartData[hoveredPoint].label}</p>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-black">{chartData[hoveredPoint].count}</div>
                    <div className="text-[10px] font-bold text-indigo-400 uppercase leading-none">New<br/>Intake</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-between mt-12 border-t border-slate-100 pt-8">
            {chartData.map((p, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${hoveredPoint === i ? 'text-indigo-600' : 'text-slate-300'}`}>
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-50 rounded-[48px] p-12 border border-slate-100 flex items-center gap-8 group">
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-slate-900 shadow-sm transition-transform group-hover:rotate-6">
            <MousePointer2 size={24} />
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-900">System Activity</h4>
            <p className="text-sm font-medium text-slate-500 mt-1">Real-time tracking of staff and patient interactions.</p>
          </div>
        </div>
        
        <div className="bg-indigo-600 rounded-[48px] p-12 text-white flex items-center justify-between">
           <div>
             <h4 className="text-lg font-black">Efficiency Index</h4>
             <p className="text-sm text-white/70 mt-1">Calculated based on current processing speeds.</p>
           </div>
           <div className="text-5xl font-black text-white/20 tracking-tighter">
            {filteredData.length > 0 ? Math.round((filteredData.filter(a => a.status === 'completed').length / filteredData.length) * 100) : 0}%
           </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
