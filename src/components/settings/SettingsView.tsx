import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Building,
  Shield,
  Bell,
  Workflow,
  Save,
  RotateCcw,
  CheckCircle2,
  Lock,
  UserCheck,
  Users,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { currentUser, resetData, setActiveView, roles, users } = useApp();
  const [orgName, setOrgName] = useState('سامانه سازمانی تدبیر');
  const [workspaceSlug, setWorkspaceSlug] = useState('tadbir-corp');
  const [defaultSprintLength, setDefaultSprintLength] = useState('2 weeks');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);
  const [mentionAlerts, setMentionAlerts] = useState(true);
  const [twoFactorEnforced, setTwoFactorEnforced] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 text-right" dir="rtl">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-indigo-600" />
          <span>تنظیمات عمومی سامانه تدبیر</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          پیکربندی هویت سازمان، قوانین همکاری، امنیت و اعلانات درون‌برنامه‌ای
        </p>
      </div>

      {/* Quick shortcuts to User & Role management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          onClick={() => setActiveView('user-management')}
          className="p-5 rounded-3xl bg-gradient-to-br from-indigo-50/80 to-white border border-indigo-100 hover:border-indigo-300 shadow-2xs cursor-pointer transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                مدیریت کاربران و دسترسی‌ها
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {users.length} کاربر ثبت‌شده در سامانه تدبیر
              </p>
            </div>
          </div>
          <ArrowLeft className="w-5 h-5 text-indigo-600 group-hover:-translate-x-1 transition-transform" />
        </div>

        <div 
          onClick={() => setActiveView('roles-management')}
          className="p-5 rounded-3xl bg-gradient-to-br from-purple-50/80 to-white border border-purple-100 hover:border-purple-300 shadow-2xs cursor-pointer transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-purple-600 transition-colors">
                ماتریس نقش‌ها و مجوزها (RBAC)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {roles.length} نقش تعریف‌شده با مجوزهای دانه‌بندی‌شده
              </p>
            </div>
          </div>
          <ArrowLeft className="w-5 h-5 text-purple-600 group-hover:-translate-x-1 transition-transform" />
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>تنظیمات با موفقیت ذخیره و در سامانه تدبیر اعمال شد.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Org Profile */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">مشخصات سازمان و فضای کاری</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                نام سازمان / شرکت
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                شناسه دامنه فضای کاری (Slug)
              </label>
              <div className="flex items-center" dir="ltr">
                <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-xs text-slate-500 font-mono">
                  app.tadbir.ir/
                </span>
                <input
                  type="text"
                  value={workspaceSlug}
                  onChange={(e) => setWorkspaceSlug(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-r-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                طول دوره اسپرینت پیش‌فرض
              </label>
              <select
                value={defaultSprintLength}
                onChange={(e) => setDefaultSprintLength(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-hidden font-medium cursor-pointer"
              >
                <option value="1 week">اسپرینت‌های ۱ هفته‌ای</option>
                <option value="2 weeks">اسپرینت‌های ۲ هفته‌ای (استاندارد)</option>
                <option value="3 weeks">اسپرینت‌های ۳ هفته‌ای</option>
                <option value="4 weeks">اسپرینت‌های ۴ هفته‌ای (ماهانه)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Policies */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Lock className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">سیاست‌های امنیتی و احراز هویت</h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">الزام احراز هویت دو مرحله‌ای (2FA) برای تمامی پرسنل</span>
                <span className="text-slate-500">کاربران بدون تأیید پیامکی یا TOTP اجازه ورود به سامانه‌های حساس را نخواهند داشت.</span>
              </div>
              <input
                type="checkbox"
                checked={twoFactorEnforced}
                onChange={(e) => setTwoFactorEnforced(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded-sm"
              />
            </label>
          </div>
        </div>

        {/* Notifications Config */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Bell className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">تنظیمات اعلانات و هشدارها</h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">هشدار تخصیص تسک و وظیفه جدید</span>
                <span className="text-slate-500">ارسال نوتیفیکیشن درون برنامه‌ای و ایمیلی به محض ارجاع کار</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded-sm"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">هشدار سررسید و تسک‌های دارای تأخیر</span>
                <span className="text-slate-500">اعلان ۲۴ ساعت قبل از رسیدن موعد تحویل یا بروز تأخیر</span>
              </div>
              <input
                type="checkbox"
                checked={deadlineReminders}
                onChange={(e) => setDeadlineReminders(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded-sm"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">یادداشت‌ها و منشن‌ها (@mention)</span>
                <span className="text-slate-500">اطلاع‌رسانی بلادرنگ هنگام منشن شدن در دیدگاه‌های پروژه‌ها</span>
              </div>
              <input
                type="checkbox"
                checked={mentionAlerts}
                onChange={(e) => setMentionAlerts(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded-sm"
              />
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={() => {
              if (confirm('آیا مایلید تمام داده‌های آزمایشی سامانه تدبیر به حالت اولیه بازگردانی شوند؟')) {
                resetData();
              }
            }}
            className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>بازنشانی داده‌های نمونه دمو</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>ذخیره تغییرات</span>
          </button>
        </div>
      </form>
    </div>
  );
};
