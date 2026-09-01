import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SystemRole } from '../../types';
import { SYSTEM_PERMISSIONS } from '../../data/initialData';
import { 
  ShieldCheck, 
  Shield, 
  Plus, 
  Check, 
  X, 
  Lock, 
  Users, 
  Edit, 
  Trash2, 
  Sparkles, 
  Sliders, 
  CheckCircle2,
  Info
} from 'lucide-react';

export const RoleManagementView: React.FC = () => {
  const { 
    roles, 
    users, 
    toggleRolePermission, 
    deleteRole, 
    setIsCreateRoleOpen, 
    setActiveView 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedRoleDetail, setSelectedRoleDetail] = useState<SystemRole | null>(null);

  const categories = [
    { key: 'all', label: 'همه دسته‌بندی‌ها' },
    { key: 'users', label: 'کاربران و هویت' },
    { key: 'projects', label: 'پروژه‌ها و الگوها' },
    { key: 'teams', label: 'تیم‌ها و ساختار' },
    { key: 'tasks', label: 'تسک‌ها و ورک‌فلو' },
    { key: 'reports', label: 'گزارش‌ها و تحلیل' },
    { key: 'settings', label: 'تنظیمات و امنیت' }
  ];

  const filteredPermissions = activeCategory === 'all'
    ? SYSTEM_PERMISSIONS
    : SYSTEM_PERMISSIONS.filter(p => p.category === activeCategory);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 text-right" dir="rtl">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-100">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
                مدیریت نقش‌ها و ماتریس دسترسی‌ها (RBAC)
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs font-extrabold border border-purple-200">
                امنیت سازمانی
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              تعریف نقش‌های سفارشی، تعیین حیطه اختیارات و تخصیص بلادرنگ مجوزهای دسترسی
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setActiveView('user-management')}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
          >
            <Users className="w-4 h-4 text-indigo-600" />
            <span>مشاهده لیست کاربران</span>
          </button>

          <button
            onClick={() => setIsCreateRoleOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-indigo-200 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>تعریف نقش سازمانی جدید</span>
          </button>
        </div>
      </div>

      {/* Role Cards Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map(role => {
          const userCount = users.filter(u => u.roleId === role.id || u.role === role.key).length;

          return (
            <div
              key={role.id}
              className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:border-indigo-300 transition-all"
            >
              <div 
                className="absolute top-0 right-0 left-0 h-1.5"
                style={{ backgroundColor: role.color }}
              />

              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-xs"
                      style={{ backgroundColor: role.color }}
                    >
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-sm">{role.name}</h3>
                      <span className="font-mono text-[10px] text-slate-400 block" dir="ltr">
                        {role.key}
                      </span>
                    </div>
                  </div>

                  {role.isSystem ? (
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-400" />
                      سیستمی
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                      سفارشی
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed min-h-[32px]">
                  {role.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{userCount} کاربر فعال</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-bold">
                    {role.permissions.length} مجوز
                  </span>

                  {!role.isSystem && (
                    <button
                      onClick={() => {
                        if (confirm(`آیا از حذف نقش "${role.name}" اطمینان دارید؟`)) {
                          deleteRole(role.id);
                        }
                      }}
                      title="حذف نقش سفارشی"
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Permissions Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Matrix Header & Filters */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>ماتریس بلادرنگ مجوزها (Role-Permission Matrix)</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              با کلیک روی هر خانه، مجوز دسترسی برای آن نقش فعال یا غیرفعال می‌شود.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 text-xs font-extrabold">
                <th className="p-4 min-w-[240px]">مجوز دسترسی / عملیات سیستم</th>
                <th className="p-4 min-w-[140px]">دسته‌بندی</th>
                {roles.map(r => (
                  <th key={r.id} className="p-4 text-center min-w-[110px]">
                    <div className="flex flex-col items-center">
                      <span className="font-extrabold text-xs text-slate-900">{r.name}</span>
                      <span 
                        className="w-2 h-2 rounded-full mt-1" 
                        style={{ backgroundColor: r.color }} 
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredPermissions.map(perm => {
                return (
                  <tr key={perm.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Permission Info */}
                    <td className="p-4">
                      <div>
                        <span className="font-extrabold text-slate-900 block">{perm.label}</span>
                        <span className="text-[11px] text-slate-500 block mt-0.5">{perm.description}</span>
                        <code className="text-[10px] font-mono text-indigo-600/80" dir="ltr">
                          {perm.id}
                        </code>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold">
                        {perm.category === 'users' ? 'کاربران' :
                         perm.category === 'projects' ? 'پروژه‌ها' :
                         perm.category === 'teams' ? 'تیم‌ها' :
                         perm.category === 'tasks' ? 'تسک‌ها' :
                         perm.category === 'reports' ? 'گزارش‌ها' : 'تنظیمات'}
                      </span>
                    </td>

                    {/* Role Checkboxes */}
                    {roles.map(role => {
                      const hasPerm = role.permissions.includes(perm.id);
                      const isSuperAdmin = role.key === 'admin';

                      return (
                        <td key={role.id} className="p-4 text-center">
                          <button
                            disabled={isSuperAdmin}
                            onClick={() => toggleRolePermission(role.id, perm.id)}
                            className={`w-7 h-7 rounded-xl mx-auto flex items-center justify-center transition-all cursor-pointer ${
                              hasPerm
                                ? 'bg-indigo-600 text-white shadow-xs hover:bg-indigo-700'
                                : 'bg-slate-100 text-slate-300 hover:bg-slate-200'
                            } ${isSuperAdmin ? 'cursor-not-allowed opacity-90' : ''}`}
                            title={isSuperAdmin ? 'مدیر ارشد به تمامی مجوزها دسترسی دارد' : hasPerm ? 'کلیک جهت لغو مجوز' : 'کلیک جهت اعطای مجوز'}
                          >
                            {hasPerm ? <Check className="w-4 h-4 stroke-[3]" /> : <X className="w-3.5 h-3.5 opacity-40" />}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="p-4 bg-slate-50/70 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-600" />
            <span>
              تمام تغییرات در مجوزهای دسترسی بلافاصله در نشست‌های کاربران فعال اعمال می‌گردد.
            </span>
          </div>
          <span className="text-[11px]">سامانه تدبیر • مدل امنیتی مبتنی بر نقش (RBAC)</span>
        </div>
      </div>
    </div>
  );
};
