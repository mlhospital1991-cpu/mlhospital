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

  const maxCount = useMemo(() => {
    return Math.max(...chartData.map(p => p.count), 5);
  }, [chartData]);

  const gridLevels = useMemo(() => {
    return [
      { y: 10, label: maxCount },
      { y: 28.75, label: Math.round(maxCount * 0.75) },
      { y: 47.5, label: Math.round(maxCount * 0.5) },
      { y: 66.25, label: Math.round(maxCount * 0.25) },
      { y: 85, label: 0 }
    ];
  }, [maxCount]);

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
      <div className="bg-white rounded-[40px] border border-slate-100/80 shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-2 relative">
        <div className="bg-slate-50/30 backdrop-blur-3xl rounded-[36px] p-8 lg:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-900/10">
                <TrendingUp size={20} className="text-brand-teal" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Timeline Analytics</h3>
                <p className="text-xs font-medium text-slate-400">Comparing intake volume across the selected timeframe.</p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
              <button 
                onClick={() => setViewMode('line')}
                className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  viewMode === 'line' 
                    ? 'bg-brand-blue-deep text-white shadow-lg shadow-brand-blue-deep/20' 
                    : 'text-slate-400 hover:text-brand-blue-deep hover:bg-slate-50'
                }`}
              >
                Line Graph
              </button>
              <button 
                onClick={() => setViewMode('bar')}
                className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  viewMode === 'bar' 
                    ? 'bg-brand-blue-deep text-white shadow-lg shadow-brand-blue-deep/20' 
                    : 'text-slate-400 hover:text-brand-blue-deep hover:bg-slate-50'
                }`}
              >
                Intake Bar
              </button>
            </div>
          </div>

          <div className="w-full flex flex-col select-none">
            {/* Top row: Y-Axis + Chart */}
            <div className="h-[300px] w-full flex relative">
              {/* Y-Axis Labels Column */}
              <div className="w-12 h-full relative text-[10px] font-black text-slate-400/80 pr-3 border-r border-slate-100/50 select-none pointer-events-none">
                {gridLevels.map((level, idx) => (
                  <div 
                    key={idx} 
                    className="absolute right-3 -translate-y-1/2 flex items-center gap-1.5"
                    style={{ top: `${level.y}%` }}
                  >
                    <span>{level.label}</span>
                    <span className="w-1 h-[1px] bg-slate-200" />
                  </div>
                ))}
              </div>

              {/* Chart Area Wrapper */}
              <div className="flex-1 h-full relative ml-4">
                {/* Gridlines in background */}
                <div className="absolute inset-0 pointer-events-none">
                  {gridLevels.map((level, idx) => (
                    <div 
                      key={idx} 
                      className="absolute left-0 right-0 border-t border-slate-200/40 border-dashed"
                      style={{ top: `${level.y}%` }}
                    />
                  ))}
                </div>

                {/* Empty State Overlay */}
                {filteredData.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-200/50 shadow-[0_15px_30px_rgba(0,0,0,0.03)] flex items-center gap-3 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-slate-400" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">No intake activity recorded for this period</span>
                    </div>
                  </div>
                )}

                {viewMode === 'line' ? (
                  <svg 
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none" 
                    className="w-full h-full overflow-visible"
                    style={{ shapeRendering: 'geometricPrecision' }}
                  >
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#00B9F1" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#4f46e5" />
                      </linearGradient>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00B9F1" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#002E6E" stopOpacity="0.0" />
                      </linearGradient>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1.2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    <motion.path 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      d={areaPath} 
                      fill="url(#areaGradient)" 
                    />

                    {/* Subtle Glow Layer */}
                    <motion.path 
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.35 }}
                      d={linePath} 
                      fill="none" 
                      stroke="url(#chartGradient)" 
                      strokeWidth="1.5" 
                      filter="url(#glow)"
                    />

                    {/* Main Sharp Curve */}
                    <motion.path 
                      initial={{ pathLength: 0, opacity: 0 }} 
                      animate={{ pathLength: 1, opacity: 1 }} 
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      d={linePath} 
                      fill="none" 
                      stroke="url(#chartGradient)" 
                      strokeWidth="0.6" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />

                    {chartData.map((p, i) => {
                      const cx = chartData.length > 1 ? (i * (100 / (chartData.length - 1))) : 50;
                      return (
                        <g key={i} onMouseEnter={() => setHoveredPoint(i)} onMouseLeave={() => setHoveredPoint(null)}>
                          <rect x={cx - 2} y="0" width="4" height="100" fill="transparent" className="cursor-pointer" />
                        </g>
                      );
                    })}
                  </svg>
                ) : (
                  <div className="h-full w-full flex items-end justify-between gap-6 px-4 relative">
                    {chartData.map((data, i) => (
                      <div 
                        key={i} 
                        className="flex-1 h-full relative group cursor-pointer" 
                        onMouseEnter={() => setHoveredPoint(i)} 
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        {/* Hover column background */}
                        {hoveredPoint === i && (
                          <div className="absolute inset-0 bg-slate-100/40 rounded-2xl -z-10 transition-colors" />
                        )}
                        
                        {/* The Bar */}
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${85 - data.y}%` }}
                          className={`absolute left-0 right-0 rounded-t-xl transition-all duration-300 shadow-sm group-hover:shadow-[0_0_20px_rgba(0,185,241,0.35)] ${
                            data.count > 0 
                              ? 'bg-gradient-to-t from-brand-teal via-[#3b82f6] to-[#4f46e5]' 
                              : 'bg-slate-200/40 border-t border-slate-200/50'
                          }`}
                          style={{ 
                            bottom: '15%',
                            minHeight: data.count > 0 ? '4px' : '2px'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* HTML Interactive Overlays (prevents scale distortion in stretched SVG) */}
                {viewMode === 'line' && (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Hover vertical guide line */}
                    {hoveredPoint !== null && (
                      <div 
                        className="absolute top-0 bottom-[15%] w-[1.5px] border-l border-brand-teal/40 border-dashed -translate-x-1/2 transition-all duration-75"
                        style={{ left: `${hoveredPoint * (100 / Math.max(1, chartData.length - 1))}%` }}
                      />
                    )}

                    {/* Interactive Circles & Ripples */}
                    {chartData.map((p, i) => {
                      const isLast = i === chartData.length - 1;
                      const isHovered = hoveredPoint === i;
                      const cx = chartData.length > 1 ? (i * (100 / (chartData.length - 1))) : 50;
                      return (
                        <div 
                          key={i}
                          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                          style={{ left: `${cx}%`, top: `${p.y}%` }}
                        >
                          {/* Pulsing Ripple effect for hovered point or last point */}
                          {(isHovered || (isLast && hoveredPoint === null)) && (
                            <span className="absolute w-8 h-8 rounded-full bg-brand-teal/20 border border-brand-teal/40 animate-ping duration-1000" />
                          )}

                          {/* Outer node circle */}
                          <div 
                            className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                              isHovered 
                                ? 'bg-brand-teal border-white scale-125 shadow-[0_0_12px_rgba(0,185,241,0.5)]' 
                                : isLast 
                                  ? 'bg-white border-brand-teal scale-110 shadow-[0_0_8px_rgba(0,185,241,0.3)]' 
                                  : 'bg-white border-brand-teal/50 opacity-60'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <AnimatePresence>
                  {hoveredPoint !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute z-30 bg-slate-900/90 dark:bg-slate-950/90 border border-slate-800/80 backdrop-blur-xl text-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] pointer-events-none"
                      style={{ 
                        left: `${(hoveredPoint * (100 / Math.max(1, chartData.length - 1)))}%`,
                        top: `${chartData[hoveredPoint].y}%`,
                        transform: 'translate(-50%, -120%)'
                      }}
                    >
                      <div className="flex flex-col gap-1 min-w-[80px]">
                        <span className="text-[9px] font-black text-brand-teal uppercase tracking-[0.2em]">{chartData[hoveredPoint].label}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-brand-teal shadow-[0_0_8px_#00B9F1] animate-pulse" />
                          <span className="text-xl font-black text-white">{chartData[hoveredPoint].count}</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">New<br/>Intake</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom row: X-Axis Labels */}
            <div className="flex justify-between mt-6 border-t border-slate-100/80 pt-4 ml-16 pr-2">
              {chartData.map((p, i) => (
                <div key={i} className="flex flex-col items-center" style={{ width: 0, overflow: 'visible' }}>
                  <span className={`text-[9px] font-black uppercase tracking-widest transition-all duration-200 whitespace-nowrap -translate-x-1/2 ${
                    hoveredPoint === i ? 'text-brand-teal scale-110 font-extrabold' : 'text-slate-400'
                  }`}>
                    {p.label}
                  </span>
                </div>
              ))}
            </div>
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
