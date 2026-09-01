import React from 'react';
import { useApp } from '../../context/AppContext';
import { PriorityPill, TaskStatusBadge, ProjectStatusBadge } from '../common/PriorityPill';
import { Avatar, AvatarGroup, ProgressBar } from '../common/Avatar';
import {
  FolderKanban,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Plus,
  Flame,
  Calendar,
  Sparkles,
  TrendingUp,
  Activity,
  Layers,
  ChevronLeft,
  ShieldAlert,
  Play,
  ArrowUpRight
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    currentUser,
    projects,
    tasks,
    users,
    activities,
    setSelectedTaskId,
    setSelectedProjectId,
    setActiveView,
    setIsCreateTaskOpen,
    setIsCreateProjectOpen,
    setIsTemplatesModalOpen,
    moveTaskStatus,
    simulateActivityEvent
  } = useApp();

  // Metrics calculations
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'active').length;
  
  const myAssignedTasks = tasks.filter(t => t.assigneeId === currentUser.id);
  const myActiveTasks = myAssignedTasks.filter(t => t.status !== 'completed');
  const myCompletedTasks = myAssignedTasks.filter(t => t.status === 'completed');

  const todayStr = new Date().toISOString().split('T')[0];
  const overdueTasks = tasks.filter(t => t.status !== 'completed' && t.deadline < todayStr);
  const myOverdueTasks = overdueTasks.filter(t => t.assigneeId === currentUser.id);

  // Up next tasks (urgent and high first)
  const upNextTasks = [...myActiveTasks].sort((a, b) => {
    const priorityWeight = { urgent: 4, high: 3, medium: 2, low: 1 };
    return priorityWeight[b.priority] - priorityWeight[a.priority];
  }).slice(0, 5);

  // Upcoming deadlines in next 7 days
  const upcomingDeadlines = tasks
    .filter(t => t.status !== 'completed' && t.deadline >= todayStr)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 5);

  // Blocked tasks
  const blockedTasks = tasks.filter(t => t.isBlocked && t.status !== 'completed');

  // Real-time live feed (latest 6 activities from AppContext)
  const recentActivities = activities.slice(0, 6);

  const formatRelativeTime = (iso: string) => {
    try {
      const diffMin = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
      if (diffMin < 1) return 'هم‌اکنون';
      if (diffMin < 60) return `${diffMin} دقیقه پیش`;
      const diffHours = Math.floor(diffMin / 60);
      if (diffHours < 24) return `${diffHours} ساعت پیش`;
      return `${Math.floor(diffHours / 24)} روز پیش`;
    } catch {
      return 'اخیراً';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto text-right">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-l from-slate-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 -mt-8 -ml-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-xs mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>میز کار هوشمند سازمان</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              درود، {currentUser.name} عزیز 👋
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
              شما <span className="font-bold text-white">{myActiveTasks.length} تسک فعال</span> در {currentUser.activeProjectsCount} پروژه در جریان دارید.
              {myOverdueTasks.length > 0 ? (
                <span className="text-rose-400 font-bold mr-1">
                  ({myOverdueTasks.length} تسک به پایان مهلت رسیده‌اند!)
                </span>
              ) : (
                <span className="text-emerald-400 font-medium mr-1">
                  تمام زمان‌بندی‌های وظایف شما در وضعیت سبز و منظم قرار دارند.
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              id="dashboard-new-task-btn"
              onClick={() => setIsCreateTaskOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>ایجاد تسک جدید</span>
            </button>
            <button
              id="dashboard-templates-btn"
              onClick={() => setIsTemplatesModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-purple-600/90 hover:bg-purple-600 text-white font-bold text-xs sm:text-sm shadow-md backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>الگوهای آماده پروژه</span>
            </button>
            <button
              id="dashboard-new-project-btn"
              onClick={() => setIsCreateProjectOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <FolderKanban className="w-4 h-4" />
              <span>پروژه جدید</span>
            </button>
          </div>
        </div>
      </div>

      {/* Blocked Tasks Alert (if any exists) */}
      {blockedTasks.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-rose-100 text-rose-700 shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800">
                مانع و بلاکر بحرانی شناسایی شد ({blockedTasks.length} مورد)
              </h4>
              <p className="text-xs text-rose-700 mt-0.5">
                <span className="font-bold">"{blockedTasks[0].title}"</span>: {blockedTasks[0].blockedReason || 'توقف به دلیل وابستگی به سرویس بالادستی'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedTaskId(blockedTasks[0].id)}
            className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shrink-0 cursor-pointer"
          >
            بررسی مانع
          </button>
        </div>
      )}

      {/* 5 Key Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total Projects */}
        <div 
          onClick={() => setActiveView('projects')}
          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group text-right"
        >
          <div className="flex items-center justify-between text-slate-600 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">کل پروژه‌ها</span>
            <div className="p-2 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {totalProjects}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-600 mt-1 font-medium">
            <span className="text-indigo-600 font-bold">{projects.filter(p => p.status === 'planning').length}</span> در حال برنامه‌ریزی
          </div>
        </div>

        {/* Active Projects */}
        <div 
          onClick={() => setActiveView('projects')}
          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group text-right"
        >
          <div className="flex items-center justify-between text-slate-600 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">پروژه‌های فعال</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight">
            {activeProjects}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-600 mt-1 font-medium">
            <span>در حال توسعه فعال</span>
          </div>
        </div>

        {/* Tasks Assigned to Me */}
        <div 
          onClick={() => setActiveView('my-tasks')}
          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group text-right"
        >
          <div className="flex items-center justify-between text-slate-600 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">وظایف محوله من</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 tracking-tight">
            {myActiveTasks.length}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-600 mt-1 font-medium">
            <span className="font-bold text-slate-700">{myAssignedTasks.length}</span> تسک در مجموع
          </div>
        </div>

        {/* Completed Tasks */}
        <div 
          onClick={() => setActiveView('my-tasks')}
          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group text-right"
        >
          <div className="flex items-center justify-between text-slate-600 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">تسک‌های تکمیل‌شده</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {myCompletedTasks.length}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
            <span>+{Math.round((myCompletedTasks.length / (myAssignedTasks.length || 1)) * 100)}٪ تکمیل</span>
          </div>
        </div>

        {/* Overdue Tasks */}
        <div 
          onClick={() => setActiveView('my-tasks')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer group col-span-2 sm:col-span-1 text-right ${
            overdueTasks.length > 0 
              ? 'bg-rose-50/50 border-rose-200 hover:border-rose-300' 
              : 'bg-white border-slate-200/80'
          }`}
        >
          <div className="flex items-center justify-between text-slate-600 mb-3">
            <span className={`text-xs font-bold uppercase tracking-wider ${overdueTasks.length > 0 ? 'text-rose-700' : 'text-slate-600'}`}>
              تسک‌های معوقه
            </span>
            <div className={`p-2 rounded-xl ${overdueTasks.length > 0 ? 'bg-rose-100 text-rose-600' : 'bg-slate-50 text-slate-600'}`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${overdueTasks.length > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
            {overdueTasks.length}
          </div>
          <div className={`flex items-center gap-1 text-[11px] font-bold mt-1 ${overdueTasks.length > 0 ? 'text-rose-600' : 'text-slate-600'}`}>
            <span>{overdueTasks.length > 0 ? 'نیازمند اقدام فوری' : 'بدون تاخیر زمانی'}</span>
          </div>
        </div>
      </div>

      {/* Main Grid Sections: My Tasks & Project Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: "What should I work on now?" My Tasks */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500" />
                  <span>تسک‌های در اولویت من</span>
                </h3>
                <p className="text-xs text-slate-600">
                  وظایف اولویت‌دار اختصاص‌یافته به شما در تمام پروژه‌ها
                </p>
              </div>
              <button
                onClick={() => setActiveView('my-tasks')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <span>مشاهده همه ({myActiveTasks.length})</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {upNextTasks.length === 0 ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-800">همه وظایف انجام شدند!</p>
                <p className="text-xs text-slate-600 mt-0.5">در حال حاضر تسک بازی برای شما وجود ندارد.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upNextTasks.map(task => {
                  const proj = projects.find(p => p.id === task.projectId);
                  const isDueSoon = task.deadline === todayStr;
                  const isPastDue = task.deadline < todayStr;
                  
                  return (
                    <div
                      key={task.id}
                      className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/70 hover:bg-indigo-50/40 border border-slate-200/80 hover:border-indigo-200 transition-all flex items-start justify-between gap-3 group text-right"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        {/* Quick complete checkbox */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveTaskStatus(task.id, 'completed');
                          }}
                          title="تکمیل تسک"
                          className="mt-0.5 w-5 h-5 rounded-md border-2 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 text-emerald-600 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 opacity-0 group-hover:opacity-40 hover:!opacity-100" />
                        </button>

                        <div 
                          className="min-w-0 cursor-pointer"
                          onClick={() => setSelectedTaskId(task.id)}
                        >
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            {proj && (
                              <span 
                                className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm text-white"
                                style={{ backgroundColor: proj.color }}
                              >
                                {proj.key}
                              </span>
                            )}
                            <span className="text-xs sm:text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                              {task.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
                            <span className={`inline-flex items-center gap-1 font-medium ${
                              isPastDue ? 'text-rose-600 font-bold' : isDueSoon ? 'text-amber-600 font-bold' : 'text-slate-600'
                            }`}>
                              <Calendar className="w-3.5 h-3.5" />
                              <span>سررسید: {task.deadline}</span>
                            </span>

                            {task.subtasks.length > 0 && (
                              <span className="text-[11px] text-slate-600">
                                {task.subtasks.filter(s => s.completed).length} از {task.subtasks.length} زیرتسک انجام شد
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <PriorityPill priority={task.priority} size="sm" />
                        <TaskStatusBadge status={task.status} size="sm" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Upcoming Deadlines Radar */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-500" />
                <span>سررسیدهای نزدیک تیم (۷ روز آینده)</span>
              </h3>
              <button
                onClick={() => setActiveView('calendar')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <span>تقویم زمان‌بندی</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {upcomingDeadlines.map(t => {
                const assignee = users.find(u => u.id === t.assigneeId);
                const proj = projects.find(p => p.id === t.projectId);
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTaskId(t.id)}
                    className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition-colors cursor-pointer text-right"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar user={assignee} size="sm" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{t.title}</p>
                        <p className="text-[11px] text-slate-600 truncate">{proj?.name} • واگذار شده به {assignee?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                        {t.deadline}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Project Progress & Real-Time Activity Feed */}
        <div className="lg:col-span-5 space-y-6">
          {/* Project Progress Widget */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-indigo-600" />
                <span>پیشرفت پروژه‌ها</span>
              </h3>
              <button
                onClick={() => setActiveView('projects')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                همه پروژه‌ها
              </button>
            </div>

            <div className="space-y-4">
              {projects.map(proj => {
                const projTasks = tasks.filter(t => t.projectId === proj.id);
                const doneCount = projTasks.filter(t => t.status === 'completed').length;
                
                return (
                  <div
                    key={proj.id}
                    onClick={() => {
                      setSelectedProjectId(proj.id);
                      setActiveView('project-detail');
                    }}
                    className="p-3.5 rounded-2xl bg-slate-50/80 hover:bg-indigo-50/50 border border-slate-200/70 hover:border-indigo-200 transition-all cursor-pointer group text-right"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span 
                          className="w-3 h-3 rounded-xs shrink-0" 
                          style={{ backgroundColor: proj.color }}
                        />
                        <span className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                          {proj.name}
                        </span>
                      </div>
                      <ProjectStatusBadge status={proj.status} size="sm" />
                    </div>

                    <ProgressBar progress={proj.progress} color={proj.color} size="md" showLabel />

                    <div className="flex items-center justify-between mt-2.5 text-[11px] text-slate-600">
                      <span className="font-bold">
                        {doneCount} از {projTasks.length} تسک تکمیل شد
                      </span>
                      <span className="text-slate-600">
                        مهلت: {proj.deadline}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time User Activity Feed Widget on Dashboard */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-600" />
                  <span>فید زنده فعالیت کاربران</span>
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => simulateActivityEvent()}
                  title="شبیه‌سازی فعالیت زنده"
                  className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveView('activity')}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>تاریخچه کامل</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {recentActivities.map((act) => {
                const user = users.find(u => u.id === act.userId);
                return (
                  <div 
                    key={act.id}
                    onClick={() => {
                      if (act.taskId) {
                        setSelectedTaskId(act.taskId);
                      } else if (act.projectId) {
                        setSelectedProjectId(act.projectId);
                        setActiveView('project-detail');
                      }
                    }}
                    className="flex items-start gap-3 text-xs p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer text-right"
                  >
                    <Avatar user={user} size="xs" className="mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="text-slate-800 leading-snug">
                        <span className="font-bold text-slate-900">{user?.name || 'کاربر'}</span>{' '}
                        <span className="font-medium text-slate-600">{act.action}</span>
                      </p>
                      {act.details && (
                        <p className="text-[11px] text-slate-600 line-clamp-1 italic">
                          "{act.details}"
                        </p>
                      )}
                      <p className="text-[10px] text-slate-600 flex items-center justify-between pt-0.5">
                        <span className="truncate max-w-[140px] text-indigo-600 font-bold">{act.projectName || act.taskTitle || ''}</span>
                        <span>{formatRelativeTime(act.timestamp)}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
