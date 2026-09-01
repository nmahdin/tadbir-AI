import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Users2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  Filter,
  Calendar
} from 'lucide-react';
import { ProgressBar } from '../common/Avatar';

export const AnalyticsView: React.FC = () => {
  const { projects, tasks, users, teams } = useApp();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | 'all'>('30d');

  // Filtered tasks
  const filteredTasks = selectedProjectId === 'all'
    ? tasks
    : tasks.filter(t => t.projectId === selectedProjectId);

  // Status breakdown
  const statusCounts = {
    backlog: filteredTasks.filter(t => t.status === 'backlog').length,
    todo: filteredTasks.filter(t => t.status === 'todo').length,
    in_progress: filteredTasks.filter(t => t.status === 'in_progress').length,
    review: filteredTasks.filter(t => t.status === 'review').length,
    completed: filteredTasks.filter(t => t.status === 'completed').length,
  };

  const statusPieData = [
    { name: 'Backlog', value: statusCounts.backlog, color: '#94a3b8' },
    { name: 'To Do', value: statusCounts.todo, color: '#6366f1' },
    { name: 'In Progress', value: statusCounts.in_progress, color: '#3b82f6' },
    { name: 'In Review', value: statusCounts.review, color: '#a855f7' },
    { name: 'Completed', value: statusCounts.completed, color: '#10b981' },
  ].filter(d => d.value > 0);

  // Priority Breakdown
  const priorityData = [
    { name: 'Urgent', count: filteredTasks.filter(t => t.priority === 'urgent').length, fill: '#ef4444' },
    { name: 'High', count: filteredTasks.filter(t => t.priority === 'high').length, fill: '#f97316' },
    { name: 'Medium', count: filteredTasks.filter(t => t.priority === 'medium').length, fill: '#3b82f6' },
    { name: 'Low', count: filteredTasks.filter(t => t.priority === 'low').length, fill: '#64748b' },
  ];

  // Project Progress Bar Data
  const projectProgressData = projects.map(p => ({
    name: p.name.length > 15 ? `${p.name.substring(0, 14)}...` : p.name,
    progress: p.progress,
    tasksCount: tasks.filter(t => t.projectId === p.id).length,
    fill: p.color
  }));

  // Team Workload Data
  const teamWorkloadData = users.map(u => ({
    name: u.name.split(' ')[0],
    workload: u.workloadPercentage,
    activeTasks: tasks.filter(t => t.assigneeId === u.id && t.status !== 'completed').length
  }));

  // Burn-up / Cumulative Completion Trend (Sample Timeline)
  const burnUpData = [
    { week: 'Week 1', completed: 4, planned: 8 },
    { week: 'Week 2', completed: 9, planned: 14 },
    { week: 'Week 3', completed: 15, planned: 19 },
    { week: 'Week 4', completed: 22, planned: 24 },
    { week: 'Week 5', completed: 28, planned: 30 },
  ];

  // Key KPI metrics
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(t => t.status === 'completed').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const blockedTasks = filteredTasks.filter(t => t.isBlocked).length;
  const totalEstimatedHours = filteredTasks.reduce((sum, t) => sum + t.estimatedHours, 0);

  const handleExportCSV = () => {
    const headers = ['Task ID', 'Title', 'Project ID', 'Status', 'Priority', 'Deadline', 'Est Hours'];
    const rows = filteredTasks.map(t => [
      t.id,
      `"${t.title.replace(/"/g, '""')}"`,
      t.projectId,
      t.status,
      t.priority,
      t.deadline,
      t.estimatedHours
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `project_analytics_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            <span>Reports & Performance Analytics</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Executive metrics on velocity, task throughput, and resource allocation
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Project Filter */}
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden"
          >
            <option value="all">All Projects Combined</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          {/* Export Report */}
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Highlight Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-bold uppercase tracking-wider">Completion Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{completionRate}%</p>
          <p className="text-[11px] text-slate-600">{completedTasks} of {totalTasks} tasks closed</p>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-bold uppercase tracking-wider">Active Tasks</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-extrabold text-indigo-600">{totalTasks - completedTasks}</p>
          <p className="text-[11px] text-slate-600">In backlog, progress or review</p>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-bold uppercase tracking-wider">Blocked Issues</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <p className={`text-2xl font-extrabold ${blockedTasks > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
            {blockedTasks}
          </p>
          <p className="text-[11px] text-slate-600">Requiring escalation</p>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-bold uppercase tracking-wider">Est. Effort</span>
            <Users2 className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{totalEstimatedHours} <span className="text-sm font-normal text-slate-600">hrs</span></p>
          <p className="text-[11px] text-slate-600">Total scoped development time</p>
        </div>
      </div>

      {/* Row 1 Charts: Task Status Breakdown & Sprint Burn-up Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status Breakdown (Donut) */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Task Stage Distribution</h3>
              <p className="text-xs text-slate-600">Current state of deliverables</p>
            </div>
            <PieChartIcon className="w-4 h-4 text-indigo-600" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any) => [`${value} tasks`, name]}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sprint Completion Trend / Velocity */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Cumulative Task Velocity</h3>
              <p className="text-xs text-slate-600">Planned vs Completed deliverables over sprints</p>
            </div>
            <BarChart3 className="w-4 h-4 text-indigo-600" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={burnUpData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="planned" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorPlanned)" name="Target Sprints" />
                <Area type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorCompleted)" name="Completed Tasks" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2 Charts: Team Workload Capacity & Projects Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Workload Balance */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Member Workload & Capacity</h3>
              <p className="text-xs text-slate-600">Capacity utilization % per contributor</p>
            </div>
            <Users2 className="w-4 h-4 text-indigo-600" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamWorkloadData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  formatter={(val: any) => [`${val}% Load`, 'Workload']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Bar dataKey="workload" fill="#6366f1" radius={[6, 6, 0, 0]} name="Capacity %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Health / Progress Comparison */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Projects Progress Health</h3>
              <p className="text-xs text-slate-600">Overall completion across organizational initiatives</p>
            </div>
            <BarChart3 className="w-4 h-4 text-indigo-600" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectProgressData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={100} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Progress']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Bar dataKey="progress" fill="#0ea5e9" radius={[0, 6, 6, 0]} name="Progress %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
