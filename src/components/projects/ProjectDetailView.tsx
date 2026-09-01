import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KanbanBoard } from './KanbanBoard';
import { ProjectListView } from './ProjectListView';
import { ProjectCalendarView } from './ProjectCalendarView';
import { ProjectAssetsTab } from '../dam/ProjectAssetsTab';
import { PriorityPill, ProjectStatusBadge } from '../common/PriorityPill';
import { Avatar, AvatarGroup, ProgressBar } from '../common/Avatar';
import {
  ArrowRight,
  Kanban,
  List,
  Calendar,
  Plus,
  Users2,
  Trash2,
  Edit3,
  Clock,
  DollarSign,
  Filter,
  CheckCircle2,
  Tag,
  FolderOpen
} from 'lucide-react';

export const ProjectDetailView: React.FC = () => {
  const {
    selectedProjectId,
    projects,
    tasks,
    assets,
    users,
    currentUser,
    setActiveView,
    setSelectedProjectId,
    setIsCreateTaskOpen,
    openEditProject,
    deleteProject
  } = useApp();

  const [activeTab, setActiveTab] = useState<'kanban' | 'list' | 'calendar' | 'assets'>('kanban');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const project = projects.find(p => p.id === selectedProjectId) || projects[0];

  if (!project) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 m-6">
        <p className="text-slate-600 font-bold">پروژه‌ای انتخاب نشده یا یافت نشد.</p>
        <button
          onClick={() => setActiveView('projects')}
          className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          بازگشت به فهرست پروژه‌ها
        </button>
      </div>
    );
  }

  const pm = users.find(u => u.id === project.projectManagerId);
  const members = users.filter(u => project.memberIds.includes(u.id));
  const projectTasks = tasks.filter(t => t.projectId === project.id);
  const completedTasks = projectTasks.filter(t => t.status === 'completed');
  const projectAssets = assets ? assets.filter(a => a.projectId === project.id && !a.isTrash) : [];

  const canManageProject = currentUser.role === 'admin' || currentUser.id === project.projectManagerId;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 text-right">
      {/* Back button */}
      <button
        onClick={() => {
          setSelectedProjectId(null);
          setActiveView('projects');
        }}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
      >
        <ArrowRight className="w-4 h-4" />
        <span>بازگشت به سبد پروژه‌ها</span>
      </button>

      {/* Project Overview Card Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 min-w-0 max-w-3xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span
                className="px-2.5 py-1 rounded-lg text-white font-bold text-xs tracking-wider font-mono"
                style={{ backgroundColor: project.color }}
              >
                {project.key}
              </span>
              <ProjectStatusBadge status={project.status} size="md" />
              <PriorityPill priority={project.priority} size="md" />
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                {project.category}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {project.name}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons & Manager Card */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-end gap-3 shrink-0">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                id="project-add-task-btn"
                onClick={() => setIsCreateTaskOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-200 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>وظیفه جدید</span>
              </button>

              <button
                onClick={() => openEditProject(project)}
                title="ویرایش و تنظیمات پروژه"
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Edit3 className="w-4 h-4" />
                <span>ویرایش پروژه</span>
              </button>

              {canManageProject && (
                <button
                  onClick={() => openEditProject(project)}
                  title="حذف پروژه"
                  className="p-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Manager info chip */}
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-3">
              <Avatar user={pm} size="md" />
              <div>
                <span className="text-[10px] font-bold text-slate-500 block">
                  مدیر و سرپرست پروژه
                </span>
                <span className="text-xs font-bold text-slate-800">{pm?.name || 'تعیین نشده'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Meta Bar: Dates, Progress, Team */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
          {/* Progress */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>پیشرفت اسپرینت</span>
              <span className="text-indigo-600 font-mono">{project.progress}٪</span>
            </div>
            <ProgressBar progress={project.progress} color={project.color} size="md" />
            <div className="text-[11px] text-slate-600 font-medium">
              {completedTasks.length} از {projectTasks.length} وظیفه تکمیل شده
            </div>
          </div>

          {/* Timeline & Budget */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1">
            <span className="text-[10px] font-bold text-slate-500">بازه زمانی و سررسید</span>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>{project.startDate} ← {project.deadline}</span>
            </div>
            {project.budget && (
              <div className="text-[11px] text-slate-600 pt-0.5">
                بودجه تخصیص‌یافته: <span className="font-semibold text-slate-800">{project.budget}</span>
              </div>
            )}
          </div>

          {/* Assigned Members Stack */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 block mb-1">
                تیم اختصاصی
              </span>
              <span className="text-xs font-bold text-slate-800">{members.length} عضو فعال</span>
            </div>
            <AvatarGroup users={members} max={4} size="md" />
          </div>
        </div>
      </div>

      {/* View Switcher Tabs & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Tabs: Kanban, List, Calendar, Assets */}
        <div className="inline-flex p-1 bg-slate-200/80 rounded-2xl border border-slate-200">
          <button
            id="tab-kanban"
            onClick={() => setActiveTab('kanban')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'kanban'
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Kanban className="w-4 h-4" />
            <span>تخته کانبان</span>
          </button>

          <button
            id="tab-list"
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'list'
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-4 h-4" />
            <span>نمای فهرست (لیست)</span>
          </button>

          <button
            id="tab-calendar"
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>تقویم و سررسیدها</span>
          </button>

          <button
            id="tab-assets"
            onClick={() => setActiveTab('assets')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'assets'
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>فایل‌ها و دارایی‌ها (DAM)</span>
            {projectAssets.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-800">
                {projectAssets.length}
              </span>
            )}
          </button>
        </div>

        {/* Filters (Shown for task tabs) */}
        {activeTab !== 'assets' && (
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Assignee Filter */}
            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden"
            >
              <option value="all">تمام مسئولین اجرایی</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>

            {/* Priority Filter */}
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden"
            >
              <option value="all">تمام اولویت‌ها</option>
              <option value="urgent">فوری</option>
              <option value="high">بالا</option>
              <option value="medium">متوسط</option>
              <option value="low">پایین</option>
            </select>
          </div>
        )}
      </div>

      {/* Render Active View Tab */}
      <div>
        {activeTab === 'kanban' && (
          <KanbanBoard 
            projectId={project.id} 
            filterAssignee={filterAssignee} 
            filterPriority={filterPriority} 
          />
        )}
        {activeTab === 'list' && (
          <ProjectListView 
            projectId={project.id} 
            filterAssignee={filterAssignee} 
            filterPriority={filterPriority} 
          />
        )}
        {activeTab === 'calendar' && (
          <ProjectCalendarView 
            projectId={project.id} 
            filterAssignee={filterAssignee} 
          />
        )}
        {activeTab === 'assets' && (
          <ProjectAssetsTab projectId={project.id} />
        )}
      </div>
    </div>
  );
};
