import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Task, TaskStatus, Priority } from '../../types';
import { PriorityPill, TaskStatusBadge } from '../common/PriorityPill';
import { Avatar } from '../common/Avatar';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Flame,
  ArrowRight
} from 'lucide-react';

export const MyTasksView: React.FC = () => {
  const {
    currentUser,
    tasks,
    projects,
    users,
    setSelectedTaskId,
    moveTaskStatus,
    setIsCreateTaskOpen
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [timeframeFilter, setTimeframeFilter] = useState<'all' | 'today' | 'overdue' | 'week'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  // My tasks
  const myTasks = tasks.filter(t => t.assigneeId === currentUser.id);

  const filteredTasks = myTasks.filter(t => {
    const matchesSearch =
      !searchTerm ||
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;

    let matchesTimeframe = true;
    if (timeframeFilter === 'today') {
      matchesTimeframe = t.deadline === todayStr;
    } else if (timeframeFilter === 'overdue') {
      matchesTimeframe = t.status !== 'completed' && t.deadline < todayStr;
    } else if (timeframeFilter === 'week') {
      const taskDate = new Date(t.deadline).getTime();
      const now = new Date().getTime();
      matchesTimeframe = taskDate >= now && taskDate <= now + 7 * 86400000;
    }

    return matchesSearch && matchesStatus && matchesPriority && matchesTimeframe;
  });

  const overdueCount = myTasks.filter(t => t.status !== 'completed' && t.deadline < todayStr).length;
  const inProgressCount = myTasks.filter(t => t.status === 'in_progress').length;
  const completedCount = myTasks.filter(t => t.status === 'completed').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <CheckSquare className="w-6 h-6 text-indigo-600" />
            <span>My Tasks & Assignments</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Focus on your active deliverables, deadlines, and priorities
          </p>
        </div>

        <button
          onClick={() => setIsCreateTaskOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Quick Filter Pill Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => { setTimeframeFilter('all'); setStatusFilter('all'); }}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            timeframeFilter === 'all' && statusFilter === 'all'
              ? 'bg-indigo-50/80 border-indigo-300 ring-1 ring-indigo-200'
              : 'bg-white border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">Total Assigned</span>
          <span className="text-xl font-extrabold text-slate-900">{myTasks.length}</span>
        </button>

        <button
          onClick={() => { setTimeframeFilter('all'); setStatusFilter('in_progress'); }}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === 'in_progress'
              ? 'bg-blue-50/80 border-blue-300 ring-1 ring-blue-200'
              : 'bg-white border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">In Progress</span>
          <span className="text-xl font-extrabold text-blue-600">{inProgressCount}</span>
        </button>

        <button
          onClick={() => { setTimeframeFilter('overdue'); setStatusFilter('all'); }}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            timeframeFilter === 'overdue'
              ? 'bg-rose-50 border-rose-300 ring-1 ring-rose-200'
              : 'bg-white border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block">Overdue</span>
            {overdueCount > 0 && <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />}
          </div>
          <span className="text-xl font-extrabold text-rose-600">{overdueCount}</span>
        </button>

        <button
          onClick={() => { setTimeframeFilter('all'); setStatusFilter('completed'); }}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === 'completed'
              ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-200'
              : 'bg-white border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">Completed</span>
          <span className="text-xl font-extrabold text-emerald-600">{completedCount}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-600 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your assigned tasks..."
            className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden"
          >
            <option value="all">All Statuses</option>
            <option value="backlog">Backlog</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Task List Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="py-16 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No matching tasks</h3>
            <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
              There are no tasks matching your current filters.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredTasks.map(task => {
              const proj = projects.find(p => p.id === task.projectId);
              const isPastDue = task.status !== 'completed' && task.deadline < todayStr;
              const isDueToday = task.deadline === todayStr;
              const isCompleted = task.status === 'completed';

              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`p-4 sm:p-5 hover:bg-indigo-50/40 transition-colors flex items-start sm:items-center justify-between gap-4 cursor-pointer ${
                    isCompleted ? 'bg-slate-50/30' : ''
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveTaskStatus(task.id, isCompleted ? 'todo' : 'completed');
                      }}
                      className={`mt-0.5 sm:mt-0 w-5 h-5 rounded-md border-2 transition-colors flex items-center justify-center shrink-0 cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-slate-300 hover:border-emerald-500 bg-white'
                      }`}
                    >
                      {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {proj && (
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.2 rounded-xs text-white"
                            style={{ backgroundColor: proj.color }}
                          >
                            {proj.key}
                          </span>
                        )}
                        <span className={`text-xs sm:text-sm font-bold text-slate-900 ${isCompleted ? 'line-through text-slate-600' : ''}`}>
                          {task.title}
                        </span>
                        {task.isBlocked && (
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-sm border border-rose-200">
                            Blocked
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
                        <span className={`inline-flex items-center gap-1 font-medium ${
                          isPastDue ? 'text-rose-600 font-bold' : isDueToday ? 'text-amber-600 font-bold' : 'text-slate-600'
                        }`}>
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Due {task.deadline}</span>
                          {isPastDue && <span className="text-[10px] uppercase font-bold text-rose-600">(Overdue)</span>}
                        </span>

                        {task.subtasks.length > 0 && (
                          <span className="text-[11px] text-slate-600">
                            {task.subtasks.filter(s => s.completed).length}/{task.subtasks.length} subtasks
                          </span>
                        )}

                        <span className="text-[11px] text-slate-600">
                          Est: {task.estimatedHours}h
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <PriorityPill priority={task.priority} size="sm" />
                    <TaskStatusBadge status={task.status} size="sm" />
                    <ArrowRight className="w-4 h-4 text-slate-600 hover:text-indigo-600 transition-colors hidden sm:block" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
