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
import { format, addMonths, subMonths, startOfMonth, getDaysInMonth, getDay, isSameDay, parseISO } from 'date-fns-jalali';

export const ProjectCalendarView: React.FC<{ projectId?: string; filterAssignee?: string }> = ({
  projectId,
  filterAssignee = 'all'
}) => {
  const { tasks, projects, users, setSelectedTaskId, setIsCreateTaskOpen } = useApp();
  
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // Filter tasks
  const relevantTasks = tasks.filter(t => {
    const matchesProj = !projectId || t.projectId === projectId;
    const matchesAssignee = filterAssignee === 'all' || t.assigneeId === filterAssignee;
    return matchesProj && matchesAssignee;
  });

  const monthName = format(currentDate, 'MMMM yyyy');
  const daysInMonth = getDaysInMonth(currentDate);
  const start = startOfMonth(currentDate);
  // getDay returns 0 for Sunday, 6 for Saturday. In Jalali, Saturday is the first day (0)
  // Let's adjust so Saturday = 0, Friday = 6
  let firstDayIndex = getDay(start) + 1;
  if (firstDayIndex === 7) firstDayIndex = 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 space-y-4" dir="rtl">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {monthName}
            </h3>
            <p className="text-xs text-slate-600">برنامه زمان‌بندی پروژه‌ها و سررسیدها</p>
          </div>
        </div>
        <div className="flex items-center gap-2" dir="ltr">
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
            امروز
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
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-600 py-2 border-b border-slate-100">
        <div>شنبه</div>
        <div>یک‌شنبه</div>
        <div>دوشنبه</div>
        <div>سه‌شنبه</div>
        <div>چهارشنبه</div>
        <div>پنج‌شنبه</div>
        <div>جمعه</div>
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
          const currentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - Number(format(currentDate, 'd')) + day);
          
          const dayTasks = relevantTasks.filter(t => {
            if (!t.deadline) return false;
            try {
               const deadlineDate = new Date(t.deadline);
               return isSameDay(deadlineDate, currentDayDate);
            } catch (e) {
               return false;
            }
          });
          const isToday = isSameDay(currentDayDate, new Date());

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
                    {dayTasks.length} {dayTasks.length === 1 ? 'تسک' : 'تسک'}
                  </span>
                )}
              </div>
              <div className="space-y-1 overflow-y-auto max-h-20 text-right">
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
