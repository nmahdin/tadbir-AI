import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Task, Priority } from '../../types';
import { PriorityPill } from '../common/PriorityPill';
import { Avatar } from '../common/Avatar';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Plus
} from 'lucide-react';

export const ProjectCalendarView: React.FC<{ projectId?: string; filterAssignee?: string }> = ({
  projectId,
  filterAssignee = 'all'
}) => {
  const { tasks, projects, users, setSelectedTaskId, setIsCreateTaskOpen } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // August 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Filter tasks
  const relevantTasks = tasks.filter(t => {
    const matchesProj = !projectId || t.projectId === projectId;
    const matchesAssignee = filterAssignee === 'all' || t.assigneeId === filterAssignee;
    return matchesProj && matchesAssignee;
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {monthNames[month]} {year}
            </h3>
            <p className="text-xs text-slate-600">Timeline & Deadline Schedule</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
          >
            Today
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-600 uppercase tracking-wider py-2 border-b border-slate-100">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Days Matrix */}
      <div className="grid grid-cols-7 gap-2 auto-rows-fr">
        {/* Leading empty cells */}
        {Array.from({ length: firstDayIndex }).map((_, idx) => (
          <div key={`empty-${idx}`} className="min-h-[100px] p-2 rounded-xl bg-slate-50/40 border border-slate-100/60" />
        ))}

        {/* Days of month */}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayTasks = relevantTasks.filter(t => t.deadline === dateString);
          const isToday = day === 31 && month === 7 && year === 2026; // Demo active today

          return (
            <div
              key={`day-${day}`}
              className={`min-h-[100px] sm:min-h-[110px] p-2 rounded-xl border flex flex-col justify-between transition-colors ${
                isToday 
                  ? 'bg-indigo-50/40 border-indigo-300 ring-1 ring-indigo-200' 
                  : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-bold ${isToday ? 'w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center' : 'text-slate-700'}`}>
                  {day}
                </span>
                {dayTasks.length > 0 && (
                  <span className="text-[10px] font-bold text-slate-600">
                    {dayTasks.length} {dayTasks.length === 1 ? 'task' : 'tasks'}
                  </span>
                )}
              </div>

              <div className="space-y-1 overflow-y-auto max-h-20">
                {dayTasks.map(task => {
                  const proj = projects.find(p => p.id === task.projectId);
                  return (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTaskId(task.id)}
                      title={`${task.title} (${task.priority})`}
                      className="px-1.5 py-1 rounded-md text-[10px] font-bold truncate text-slate-800 bg-slate-100 hover:bg-indigo-100 hover:text-indigo-800 border border-slate-200/80 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      {proj && (
                        <span 
                          className="w-1.5 h-1.5 rounded-full shrink-0" 
                          style={{ backgroundColor: proj.color }}
                        />
                      )}
                      <span className="truncate">{task.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
