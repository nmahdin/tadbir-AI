import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ProjectTemplate, TemplateTask, Priority, TaskStatus } from '../../types';
import { X, Plus, Trash2, Layers, Check, Sparkles } from 'lucide-react';

export const TemplateEditorModal: React.FC = () => {
  const {
    isTemplateEditorOpen,
    setIsTemplateEditorOpen,
    selectedTemplateId,
    templates,
    addTemplate,
    updateTemplate,
    setIsTemplatesModalOpen
  } = useApp();

  const editingTemplate = selectedTemplateId ? templates.find(t => t.id === selectedTemplateId) : null;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('مهندسی نرم‌افزار');
  const [color, setColor] = useState('#6366f1');
  const [defaultPriority, setDefaultPriority] = useState<Priority>('high');
  const [estimatedDurationDays, setEstimatedDurationDays] = useState(14);
  const [budget, setBudget] = useState('۱۰۰,۰۰۰,۰۰۰ تومان');
  const [tagInput, setTagInput] = useState('اسپرینت, چابک');

  // Stages State
  const [stages, setStages] = useState<{ id: TaskStatus; name: string; color: string }[]>([
    { id: 'backlog', name: 'بک‌لاگ', color: '#94a3b8' },
    { id: 'todo', name: 'برای انجام', color: '#64748b' },
    { id: 'in_progress', name: 'در حال انجام', color: '#3b82f6' },
    { id: 'review', name: 'در حال بازبینی', color: '#8b5cf6' },
    { id: 'completed', name: 'تکمیل شده', color: '#10b981' }
  ]);

  // Tasks State
  const [tasks, setTasks] = useState<TemplateTask[]>([
    {
      id: 'tt-sample-1',
      title: 'برنامه‌ریزی اولیه و مشخص کردن نیازمندی‌ها',
      description: 'تعریف استوری‌های کاربر و تخصیص اهداف اصلی فاز',
      relativeDueDays: 3,
      estimatedHours: 8,
      priority: 'high',
      status: 'todo',
      tags: ['برنامه‌ریزی'],
      subtasks: ['تعریف اهداف فاز', 'تعیین معیارهای موفقیت']
    }
  ]);

  // Task creation form inside modal
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskDueDays, setNewTaskDueDays] = useState(5);
  const [newTaskHours, setNewTaskHours] = useState(8);
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>('medium');
  const [newTaskSubtasks, setNewTaskSubtasks] = useState('');

  useEffect(() => {
    if (editingTemplate) {
      setName(editingTemplate.name);
      setDescription(editingTemplate.description);
      setCategory(editingTemplate.category);
      setColor(editingTemplate.color);
      setDefaultPriority(editingTemplate.defaultPriority);
      setEstimatedDurationDays(editingTemplate.estimatedDurationDays);
      setBudget(editingTemplate.budget || '۱۰۰,۰۰۰,۰۰۰ تومان');
      setTagInput(editingTemplate.tags.join(', '));
      setStages(editingTemplate.stages);
      setTasks(editingTemplate.tasks);
    } else {
      setName('');
      setDescription('');
      setCategory('مهندسی نرم‌افزار');
      setColor('#6366f1');
      setDefaultPriority('high');
      setEstimatedDurationDays(14);
      setBudget('۱۰۰,۰۰۰,۰۰۰ تومان');
      setTagInput('اسپرینت, چابک');
    }
  }, [editingTemplate, isTemplateEditorOpen]);

  if (!isTemplateEditorOpen) return null;

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const subtasks = newTaskSubtasks
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const task: TemplateTask = {
      id: `tt-${Date.now()}`,
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim(),
      relativeDueDays: Number(newTaskDueDays) || 5,
      estimatedHours: Number(newTaskHours) || 8,
      priority: newTaskPriority,
      status: 'todo',
      tags: [category],
      subtasks
    };

    setTasks([...tasks, task]);
    setNewTaskTitle('');
    setNewTaskDesc('');
    setNewTaskSubtasks('');
  };

  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const tags = tagInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (editingTemplate) {
      updateTemplate(editingTemplate.id, {
        name: name.trim(),
        description: description.trim(),
        category,
        color,
        defaultPriority,
        estimatedDurationDays: Number(estimatedDurationDays) || 14,
        budget,
        stages,
        tasks,
        tags: tags.length > 0 ? tags : ['الگو']
      });
    } else {
      addTemplate({
        name: name.trim(),
        description: description.trim(),
        category,
        icon: 'Layers',
        color,
        defaultPriority,
        estimatedDurationDays: Number(estimatedDurationDays) || 14,
        budget,
        stages,
        tasks,
        tags: tags.length > 0 ? tags : ['الگو']
      });
    }

    setIsTemplateEditorOpen(false);
    setIsTemplatesModalOpen(true);
  };

  const colorPalette = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#ef4444'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[90vh] max-h-[850px]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {editingTemplate ? `ویرایش الگوی: ${editingTemplate.name}` : 'تعریف الگوی جدید پروژه'}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                مراحل، تسک‌های پیش‌فرض و چک‌لیست‌های اختصاصی سازمان خود را تنظیم کنید.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsTemplateEditorOpen(false);
              setIsTemplatesModalOpen(true);
            }}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-right">
          {/* General Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">مشخصات عمومی الگو</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  نام الگو *
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: اسپرینت توسعه چابک، کمپین دیجیتال مارکتینگ..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  دسته‌بندی
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:outline-hidden"
                >
                  <option value="مهندسی نرم‌افزار">مهندسی نرم‌افزار</option>
                  <option value="بازاریابی و رشد">بازاریابی و رشد</option>
                  <option value="طراحی محصول">طراحی محصول</option>
                  <option value="امنیت و انطباق">امنیت و انطباق</option>
                  <option value="عمومی">عمومی و مدیریتی</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                توضیحات و اهداف الگو
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="توضیح دهید این الگو برای چه پروژه‌هایی مناسب است و چه مراحلی را شامل می‌شود..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-hidden resize-none"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  مدت زمان تقریبی (روز)
                </label>
                <input
                  type="number"
                  min={1}
                  value={estimatedDurationDays}
                  onChange={(e) => setEstimatedDurationDays(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  اولویت پیش‌فرض
                </label>
                <select
                  value={defaultPriority}
                  onChange={(e) => setDefaultPriority(e.target.value as Priority)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:outline-hidden"
                >
                  <option value="urgent">فوری</option>
                  <option value="high">بالا</option>
                  <option value="medium">متوسط</option>
                  <option value="low">پایین</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  برآورد بودجه
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="مثال: ۱۰۰,۰۰۰,۰۰۰ تومان"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  رنگ تم الگو
                </label>
                <div className="flex items-center gap-1.5 pt-1">
                  {colorPalette.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`w-6 h-6 rounded-full border transition-transform cursor-pointer ${
                        color === c ? 'border-slate-900 scale-110 shadow-xs' : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Predefined Tasks Section */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                تسک‌های از پیش تعریف‌شده الگو ({tasks.length} تسک)
              </h4>
              <span className="text-xs text-slate-600">
                هنگام ایجاد پروژه از این الگو، تمام این تسک‌ها به طور خودکار ساخته می‌شوند.
              </span>
            </div>

            {/* List of Defined Tasks */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {tasks.length === 0 ? (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-600">
                  هنوز تسکی به این الگو افزوده نشده است. از فرم زیر برای افزودن تسک استفاده کنید.
                </div>
              ) : (
                tasks.map((t, idx) => (
                  <div 
                    key={t.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-800 text-[11px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-900">{t.title}</span>
                        <span className="text-[10px] bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                          روز {t.relativeDueDays} • {t.estimatedHours} ساعت
                        </span>
                      </div>
                      {t.description && <p className="text-[11px] text-slate-600 pr-7">{t.description}</p>}
                      {t.subtasks && t.subtasks.length > 0 && (
                        <div className="pr-7 pt-1 flex items-center gap-1.5 flex-wrap">
                          {t.subtasks.map((sub, sIdx) => (
                            <span key={sIdx} className="text-[10px] bg-white text-slate-600 px-1.5 py-0.5 rounded-sm border border-slate-200">
                              ✓ {sub}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveTask(t.id)}
                      className="p-1.5 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="حذف تسک"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Quick Add Task Sub-Form */}
            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/80 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                <Plus className="w-4 h-4 text-indigo-600" />
                <span>افزودن تسک جدید به الگو</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="عنوان تسک پیش‌فرض..."
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    min={1}
                    value={newTaskDueDays}
                    onChange={(e) => setNewTaskDueDays(Number(e.target.value))}
                    placeholder="روز سررسید"
                    title="سررسید (روز پس از شروع پروژه)"
                    className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden"
                  />
                  <input
                    type="number"
                    min={1}
                    value={newTaskHours}
                    onChange={(e) => setNewTaskHours(Number(e.target.value))}
                    placeholder="ساعت کار"
                    title="تخمین ساعت کاری"
                    className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="شرح مختصر وظیفه..."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden"
                />

                <input
                  type="text"
                  value={newTaskSubtasks}
                  onChange={(e) => setNewTaskSubtasks(e.target.value)}
                  placeholder="چک‌لیست‌ها (با کاما یا خط جدید جدا کنید)..."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAddTask}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  افزودن این تسک به لیست الگو
                </button>
              </div>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsTemplateEditorOpen(false);
                setIsTemplatesModalOpen(true);
              }}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
            >
              {editingTemplate ? 'ذخیره تغییرات الگو' : 'ایجاد و ذخیره الگو'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
