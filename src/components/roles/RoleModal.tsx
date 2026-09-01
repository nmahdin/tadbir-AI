import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SystemRole } from '../../types';
import { SYSTEM_PERMISSIONS } from '../../data/initialData';
import { X, Shield, Check, Plus, Palette } from 'lucide-react';

const COLOR_OPTIONS = [
  '#6366f1', // Indigo
  '#3b82f6', // Blue
  '#0ea5e9', // Sky
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6', // Purple
  '#14b8a6', // Teal
  '#ef4444', // Red
  '#64748b'  // Slate
];

export const RoleModal: React.FC = () => {
  const { isCreateRoleOpen, setIsCreateRoleOpen, addRole } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    key: '',
    description: '',
    color: '#6366f1',
    permissions: ['users.view', 'projects.view', 'tasks.view']
  });

  if (!isCreateRoleOpen) return null;

  const handleClose = () => {
    setIsCreateRoleOpen(false);
    setFormData({
      name: '',
      key: '',
      description: '',
      color: '#6366f1',
      permissions: ['users.view', 'projects.view', 'tasks.view']
    });
  };

  const handleTogglePermission = (permId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permId)
        ? prev.permissions.filter(p => p !== permId)
        : [...prev.permissions, permId]
    }));
  };

  const handleSelectAllCategory = (category: string) => {
    const catPerms = SYSTEM_PERMISSIONS.filter(p => p.category === category).map(p => p.id);
    const allSelected = catPerms.every(id => formData.permissions.includes(id));

    if (allSelected) {
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(id => !catPerms.includes(id))
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        permissions: Array.from(new Set([...prev.permissions, ...catPerms]))
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const generatedKey = formData.key.trim() || formData.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');

    addRole({
      name: formData.name.trim(),
      key: generatedKey,
      description: formData.description.trim() || 'نقش سازمانی سامانه تدبیر',
      color: formData.color,
      permissions: formData.permissions
    });

    handleClose();
  };

  const categories = [
    { key: 'users', label: 'مدیریت کاربران و احراز هویت' },
    { key: 'projects', label: 'مدیریت پروژه‌ها و متدولوژی' },
    { key: 'teams', label: 'مدیریت تیم‌ها و اعضا' },
    { key: 'tasks', label: 'مدیریت تسک‌ها و ورک‌فلو' },
    { key: 'reports', label: 'گزارش‌گیری و تحلیل هوشمند' },
    { key: 'settings', label: 'تنظیمات و امنیت سامانه' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden text-right" dir="rtl">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm"
              style={{ backgroundColor: formData.color }}
            >
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                تعریف نقش جدید در سامانه تدبیر
              </h2>
              <p className="text-xs text-slate-500">
                مشخص کردن عنوان نقش، کلید سیستمی و اعطای مجوزهای دسترسی دانه‌بندی‌شده
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                عنوان نقش سازمانی <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="مثال: مدیر فنی / کارشناس ارشد محصول"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-hidden transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                شناسه سیستمی (انگلیسی)
              </label>
              <input
                type="text"
                value={formData.key}
                onChange={e => setFormData({ ...formData, key: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                placeholder="مثال: tech_lead"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-hidden transition-all font-mono text-left"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              توضیحات و دامنه وظایف نقش
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="توضیح کوتاه در مورد هدف و حوزه مسئولیت این نقش..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-hidden transition-all"
            />
          </div>

          {/* Color theme */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-slate-500" />
              <span>رنگ نشانگر نقش</span>
            </label>
            <div className="flex flex-wrap gap-2.5">
              {COLOR_OPTIONS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: c })}
                  className={`w-7 h-7 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                    formData.color === c ? 'ring-3 ring-offset-2 ring-indigo-500 scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: c }}
                >
                  {formData.color === c && <Check className="w-4 h-4 text-white drop-shadow-xs" />}
                </button>
              ))}
            </div>
          </div>

          {/* Permissions Matrix Picker */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-900">
                مجوزهای دسترسی به بخش‌های سامانه ({formData.permissions.length} مجوز انتخاب شده)
              </label>
              <button
                type="button"
                onClick={() => {
                  if (formData.permissions.length === SYSTEM_PERMISSIONS.length) {
                    setFormData(prev => ({ ...prev, permissions: [] }));
                  } else {
                    setFormData(prev => ({ ...prev, permissions: SYSTEM_PERMISSIONS.map(p => p.id) }));
                  }
                }}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer"
              >
                {formData.permissions.length === SYSTEM_PERMISSIONS.length ? 'لغو انتخاب همه' : 'انتخاب تمامی مجوزها'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map(cat => {
                const catPerms = SYSTEM_PERMISSIONS.filter(p => p.category === cat.key);
                const allSelected = catPerms.every(p => formData.permissions.includes(p.id));

                return (
                  <div key={cat.key} className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                      <span className="text-xs font-bold text-slate-800">{cat.label}</span>
                      <button
                        type="button"
                        onClick={() => handleSelectAllCategory(cat.key)}
                        className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        {allSelected ? 'عدم انتخاب' : 'انتخاب همه'}
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {catPerms.map(perm => {
                        const isChecked = formData.permissions.includes(perm.id);
                        return (
                          <label
                            key={perm.id}
                            className="flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleTogglePermission(perm.id)}
                              className="mt-0.5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-bold text-slate-800 block">
                                {perm.label}
                              </span>
                              <span className="text-[11px] text-slate-500 block leading-tight">
                                {perm.description}
                              </span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/70">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/70 transition-colors cursor-pointer"
          >
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold shadow-md shadow-indigo-200 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>ایجاد و ثبت نقش سازمانی</span>
          </button>
        </div>
      </div>
    </div>
  );
};
