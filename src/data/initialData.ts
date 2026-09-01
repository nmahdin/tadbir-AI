import { User, Project, Task, Team, AppNotification, ProjectTemplate, ActivityLog, SystemRole, PermissionItem } from '../types';

export const INITIAL_CATEGORIES: string[] = [
  'تولید محتوا و رسانه',
  'تحریریه و پایگاه خبری',
  'طراحی گرافیک و هویت بصری',
  'تدوین ویدئو و موشن‌گرافی',
  'پادکست و تولید صوتی',
  'شبکه‌های اجتماعی و انتشار',
  'پویش و کمپین رسانه‌ای',
  'عکاسی و تصویربرداری',
  'روابط عمومی و رویدادها',
  'فناوری و زیرساخت رسانه'
];

export const SYSTEM_PERMISSIONS: PermissionItem[] = [
  // مدیریت کاربران (Users)
  { id: 'users.view', label: 'مشاهده لیست کاربران', description: 'امکان مشاهده اسامی، اطلاعات هویتی و عناوین سازمانی', category: 'users' },
  { id: 'users.view_details', label: 'مشاهده جزئیات و پروفایل کاربر', description: 'دسترسی به لاگ‌ها، مهارت‌ها، سوابق ورود و اطلاعات تماس', category: 'users' },
  { id: 'users.create', label: 'ایجاد کاربر جدید', description: 'امکان تعریف کاربر جدید، تعیین رمز عبور موقت و ارسال مشخصات', category: 'users' },
  { id: 'users.edit', label: 'ویرایش مشخصات کاربر', description: 'ویرایش نام، ایمیل، دپارتمان، مهارت‌ها و نقش سازمانی', category: 'users' },
  { id: 'users.status', label: 'تغییر وضعیت و مسدودسازی', description: 'امکان فعال‌سازی، غیرفعال‌سازی، تعلیق و مسدودسازی حساب', category: 'users' },
  { id: 'users.delete', label: 'حذف کاربر از سیستم', description: 'حذف دائمی رکورد کاربر از سامانه تدبیر', category: 'users' },

  // مدیریت نقش‌ها و ماتریس دسترسی (Roles & Permissions)
  { id: 'roles.view', label: 'مشاهده لیست نقش‌ها', description: 'مشاهده نقش‌های سیستمی و سفارشی و تعداد کاربران منتسب', category: 'roles' },
  { id: 'roles.create', label: 'تعریف نقش جدید', description: 'ایجاد نقش سازمانی جدید با عنوان و رنگ اختصاصی', category: 'roles' },
  { id: 'roles.edit', label: 'ویرایش مشخصات نقش', description: 'تغییر نام، رنگ و توضیحات نقش‌های سازمانی', category: 'roles' },
  { id: 'roles.manage_permissions', label: 'مدیریت مجوزها و ماتریس دسترسی', description: 'تخصیص یا سلب دسترسی‌های عملیاتی از نقش‌ها', category: 'roles' },
  { id: 'roles.delete', label: 'حذف نقش سازمانی', description: 'حذف نقش‌های سفارشی تعریف شده', category: 'roles' },

  // مدیریت پروژه‌ها (Projects)
  { id: 'projects.view', label: 'مشاهده پروژه‌ها', description: 'دسترسی به فهرست پروژه‌ها و جزئیات پیشرفت', category: 'projects' },
  { id: 'projects.create', label: 'ایجاد پروژه جدید', description: 'تعریف پروژه با الگوهای سفارشی، بودجه و تیم', category: 'projects' },
  { id: 'projects.edit', label: 'ویرایش مشخصات پروژه', description: 'تغییر تاریخ‌ها، وضعیت، بودجه، مدیر پروژه و اعضا', category: 'projects' },
  { id: 'projects.delete', label: 'حذف و بایگانی پروژه', description: 'آرشیو کردن یا حذف کامل پروژه و اطلاعات آن', category: 'projects' },

  // مدیریت وظایف (Tasks)
  { id: 'tasks.view', label: 'مشاهده وظایف', description: 'دسترسی به بردهای کانبان، لیست‌ها و تایم‌لاین وظایف', category: 'tasks' },
  { id: 'tasks.create', label: 'تعریف وظیفه جدید', description: 'ایجاد تسک با زیروظایف، برچسب‌ها، فوریت و پیوست‌ها', category: 'tasks' },
  { id: 'tasks.edit', label: 'ویرایش اطلاعات وظیفه', description: 'تغییر عنوان، توضیحات، تخمین زمان و برچسب‌های تسک', category: 'tasks' },
  { id: 'tasks.assign', label: 'تخصیص و تغییر مسئول وظیفه', description: 'واگذاری تسک به افراد تیم و تغییر مجری', category: 'tasks' },
  { id: 'tasks.status', label: 'تغییر وضعیت وظیفه', description: 'انتقال تسک بین ستون‌های کانبان و تکمیل وظایف', category: 'tasks' },
  { id: 'tasks.delete', label: 'حذف وظایف', description: 'حذف تسک‌های منقضی یا اشتباه از برد پروژه', category: 'tasks' },

  // مدیریت تیم‌ها (Teams)
  { id: 'teams.view', label: 'مشاهده ساختار تیم‌ها', description: 'دیدن اعضا، دپارتمان‌ها و سرپرستان تیم', category: 'teams' },
  { id: 'teams.create', label: 'ایجاد تیم جدید', description: 'تشکیل کارگروه‌ها و تیم‌های تخصصی سازمانی', category: 'teams' },
  { id: 'teams.edit', label: 'ویرایش و تخصیص اعضای تیم', description: 'جابجایی اعضا، تعیین سرپرست و تغییر دپارتمان', category: 'teams' },
  { id: 'teams.delete', label: 'انحلال یا حذف تیم', description: 'حذف کارگروه و آزادسازی اعضا', category: 'teams' },

  // دارایی‌های دیجیتال (DAM - Digital Asset Management)
  { id: 'assets.view', label: 'مشاهده فایل‌ها و پوشه‌ها', description: 'دسترسی به محیط مدیریت دارایی‌های دیجیتال و کاوشگر فایل', category: 'dam' },
  { id: 'assets.preview', label: 'پیش‌نمایش محتوای فایل', description: 'مشاهده فایل‌های تصویری، صوتی، ویدئویی و اسناد بدون نیاز به دانلود', category: 'dam' },
  { id: 'assets.download', label: 'دانلود فایل‌ها', description: 'امکان دانلود مستقیم فایل‌ها و نسخه‌های مختلف', category: 'dam' },
  { id: 'assets.upload', label: 'بارگذاری فایل و ایجاد پوشه', description: 'آپلود فایل‌های جدید به مخزن دارایی‌ها و پوشه‌بندی', category: 'dam' },
  { id: 'assets.edit_info', label: 'ویرایش اطلاعات و متادیتا', description: 'تغییر عنوان، برچسب‌ها، دسته‌بندی و انتساب به پروژه/تسک', category: 'dam' },
  { id: 'assets.rename', label: 'تغییر نام فایل و پوشه', description: 'امکان ویرایش نام فایل‌ها و پوشه‌های مخزن', category: 'dam' },
  { id: 'assets.move', label: 'جابه‌جایی و سازماندهی فایل‌ها', description: 'انتقال فایل‌ها بین پوشه‌ها و ساختارهای دایرکتوری', category: 'dam' },
  { id: 'assets.create_version', label: 'ایجاد نسخه جدید فایل', description: 'بارگذاری نسخه به‌روزرسانی شده با ثبت لاگ تغییرات', category: 'dam' },
  { id: 'assets.delete', label: 'حذف فایل و پوشه', description: 'انتقال فایل‌ها به سطل زباله یا حذف دائمی', category: 'dam' },
  { id: 'assets.restore', label: 'بازیابی از سطل زباله', description: 'بازگردانی فایل‌ها و پوشه‌های حذف شده به وضعیت فعال', category: 'dam' },
  { id: 'assets.share', label: 'اشتراک‌گذاری فایل', description: 'ایجاد لینک اشتراک و ارائه دسترسی به اعضا یا تیم‌ها', category: 'dam' },
  { id: 'assets.manage_access', label: 'مدیریت مجوزها و سطوح دسترسی فایل', description: 'تعیین سطح دسترسی (مشاهده، دانلود، ویرایش، مدیریت)', category: 'dam' },

  // پیام‌رسان و گفتگوها (Messaging)
  { id: 'messaging.view', label: 'مشاهده گفتگوها و کانال‌ها', description: 'دسترسی به پیام‌رسان سازمانی و مشاهده پیام‌ها', category: 'messaging' },
  { id: 'messaging.create_chat', label: 'ایجاد گروه، کانال و گفتگوی مستقیم', description: 'تشکیل فضاهای گفتگوی تیمی و کانال‌های موضوعی', category: 'messaging' },
  { id: 'messaging.send_message', label: 'ارسال پیام و پیوست', description: 'ارسال پیام متنی، ویس، تصویر و فایل در گفتگوها', category: 'messaging' },
  { id: 'messaging.delete_message', label: 'حذف پیام‌ها', description: 'حذف پیام‌های ارسالی یا پیام‌های گروهی', category: 'messaging' },
  { id: 'messaging.manage_group', label: 'مدیریت اعضا و اختیارات گروه', description: 'افزودن و حذف اعضا و تنظیم اختیارات ارسال پیام', category: 'messaging' },

  // دبیرخانه و مکاتبات اداری (Secretariat)
  { id: 'secretariat.view', label: 'مشاهده نامه‌ها و کارتابل اداری', description: 'دسترسی به فهرست نامه‌های وارده، صادره و داخلی', category: 'secretariat' },
  { id: 'secretariat.create_letter', label: 'ثبت نامه و ایجاد پیش‌نویس', description: 'ثبت مکاتبه جدید با صدور شماره اندیکاتور و پیوست اسناد', category: 'secretariat' },
  { id: 'secretariat.edit_letter', label: 'ویرایش اطلاعات و متن نامه', description: 'تغییر محتوا، فوریت، طبقه‌بندی و پیوست‌های نامه', category: 'secretariat' },
  { id: 'secretariat.refer_letter', label: 'ارجاع سازمانی و هامش‌نویسی', description: 'ارجاع نامه به اشخاص/تیم‌ها و تعیین مهلت اقدام و دستور کار', category: 'secretariat' },
  { id: 'secretariat.reply_letter', label: 'ثبت پاسخ و عطف مکاتبه', description: 'ایجاد نامه پیرو و پاسخ‌گویی به مکاتبات قبلی', category: 'secretariat' },
  { id: 'secretariat.archive_letter', label: 'بایگانی و مدیریت زونکن‌ها', description: 'طبقه‌بندی اسناد در زونکن‌های بایگانی و کدگذاری اداری', category: 'secretariat' },
  { id: 'secretariat.manage_resolutions', label: 'مدیریت و پیگیری مصوبات', description: 'ثبت مصوبات جلسات هیئت مدیره و تطبیق با تسک‌ها', category: 'secretariat' },

  // اتاق فکر و ایده‌پردازی (Think Tank)
  { id: 'thinktank.view', label: 'مشاهده ایده‌ها و اتاق فکر', description: 'دسترسی به ویترین ایده‌ها، چالش‌ها و جلسات بارش فکری', category: 'thinktank' },
  { id: 'thinktank.create_idea', label: 'ثبت و پیشنهاد ایده جدید', description: 'ارائه طرح، تشریح مسئله و راه‌حل پیشنهادی به اتاق فکر', category: 'thinktank' },
  { id: 'thinktank.edit_idea', label: 'ویرایش مشخصات ایده', description: 'به‌روزرسانی جزئیات، پیوست‌ها و توضیحات تکمیلی طرح', category: 'thinktank' },
  { id: 'thinktank.delete_idea', label: 'حذف ایده', description: 'حذف ایده‌های نامربوط یا منسوخ شده', category: 'thinktank' },
  { id: 'thinktank.manage_meetings', label: 'برگزاری و مدیریت جلسات هم‌اندیشی', description: 'تعریف جلسه بارش فکری، ثبت صورتجلسه و تصمیمات', category: 'thinktank' },
  { id: 'thinktank.vote', label: 'رأی‌دهی و ثبت دیدگاه تخصصی', description: 'شرکت در نظرسنجی‌ها و ثبت ارزیابی و کامنت روی ایده‌ها', category: 'thinktank' },
  { id: 'thinktank.approve_convert', label: 'تأیید ایده و تبدیل به تسک یا پروژه', description: 'تصویب ایده و ارتقای مستقیم آن به پروژه یا وظیفه اجرایی', category: 'thinktank' },

  // گزارش‌ها و تحلیل‌ها (Reports)
  { id: 'reports.view', label: 'مشاهده داشبوردها و گزارش‌های آماری', description: 'دسترسی به نمودارهای پیشرفت، بازدهی و بار کاری پرسنل', category: 'reports' },
  { id: 'reports.export', label: 'استخراج داده‌ها و خروجی اکسل/PDF', description: 'دریافت گزارش‌های مستند و خروجی‌های ساختاریافته', category: 'reports' },

  // تنظیمات سامانه (Settings)
  { id: 'settings.manage', label: 'مدیریت پیکربندی و تنظیمات سامانه', description: 'تنظیمات عمومی سازمان، دوره‌های اسپرینت، تم و امنیت سیستم', category: 'settings' }
];

export const INITIAL_ROLES: SystemRole[] = [
  {
    id: 'role-admin',
    key: 'admin',
    name: 'مدیر کل سیستم (Super Admin)',
    description: 'دسترسی کامل و تام‌الاختیار به کلیه ماژول‌های سامانه تدبیر، مدیریت کاربران، نقش‌ها، پروژه‌ها و زیرساخت.',
    color: '#6366f1',
    isSystem: true,
    isActive: true,
    userCount: 1,
    permissions: SYSTEM_PERMISSIONS.map(p => p.id),
    createdAt: '2026-01-01'
  },
  {
    id: 'role-pm',
    key: 'project_manager',
    name: 'مدیر ارشد پروژه (Project Manager)',
    description: 'اختیار کامل در ایجاد، زمان‌بندی و پایش پروژه‌ها، مدیریت وظایف تیم، مشاهده گزارش‌های تحلیلی و تخصیص منابع.',
    color: '#0ea5e9',
    isSystem: true,
    isActive: true,
    userCount: 1,
    permissions: [
      'users.view', 'users.view_details',
      'roles.view',
      'projects.view', 'projects.create', 'projects.edit',
      'tasks.view', 'tasks.create', 'tasks.edit', 'tasks.assign', 'tasks.status', 'tasks.delete',
      'teams.view', 'teams.edit',
      'assets.view', 'assets.preview', 'assets.download', 'assets.upload', 'assets.edit_info', 'assets.rename', 'assets.move', 'assets.create_version', 'assets.share',
      'messaging.view', 'messaging.create_chat', 'messaging.send_message',
      'secretariat.view', 'secretariat.create_letter', 'secretariat.refer_letter', 'secretariat.manage_resolutions',
      'thinktank.view', 'thinktank.create_idea', 'thinktank.manage_meetings', 'thinktank.vote', 'thinktank.approve_convert',
      'reports.view', 'reports.export'
    ],
    createdAt: '2026-01-01'
  },
  {
    id: 'role-member',
    key: 'team_member',
    name: 'عضو تیم و متخصص فنی (Team Member)',
    description: 'مشاهده پروژه‌های منتسب، مدیریت وظایف واگذار شده، تغییر وضعیت، ثبت دیدگاه، ارتباطات و تبادل فایل.',
    color: '#10b981',
    isSystem: true,
    isActive: true,
    userCount: 4,
    permissions: [
      'users.view',
      'projects.view',
      'tasks.view', 'tasks.status',
      'teams.view',
      'assets.view', 'assets.preview', 'assets.download', 'assets.upload',
      'messaging.view', 'messaging.send_message',
      'secretariat.view',
      'thinktank.view', 'thinktank.create_idea', 'thinktank.vote',
      'reports.view'
    ],
    createdAt: '2026-01-01'
  },
  {
    id: 'role-qa',
    key: 'qa_engineer',
    name: 'کارشناس تضمین کیفیت (QA Lead)',
    description: 'کنترل کیفیت خروجی‌ها، ثبت موانع و باگ‌های بحرانی، تست سناریوهای کاربری و تأیید نهایی وظایف.',
    color: '#f59e0b',
    isSystem: false,
    isActive: true,
    userCount: 1,
    permissions: [
      'users.view',
      'projects.view',
      'tasks.view', 'tasks.create', 'tasks.edit', 'tasks.status',
      'assets.view', 'assets.preview', 'assets.download',
      'messaging.view', 'messaging.send_message',
      'thinktank.view', 'thinktank.create_idea', 'thinktank.vote',
      'reports.view'
    ],
    createdAt: '2026-03-15'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'سارا چنگیزی',
    username: 'sarah.changizi',
    email: 'sarah.changizi@tadbir.ir',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    roleId: 'role-admin',
    status: 'active',
    title: 'معاونت فنی و مدیریت محصول',
    department: 'مدیریت ارشد سامانه',
    activeProjectsCount: 5,
    completedTasksCount: 42,
    workloadPercentage: 75,
    skills: ['برنامه‌ریزی استراتژیک', 'معماری سیستم', 'اسکرام و چابک', 'نقشه راه محصول'],
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    location: 'تهران، ونک',
    lastLogin: '۱۴۰۵/۰۶/۱۰ - ساعت ۱۴:۳۲',
    createdAt: '۱۴۰۴/۰۱/۱۵',
    twoFactorEnabled: true,
    bio: 'راهبر تیم‌های چابک و متخصص معماری سامانه‌های توزیع‌شده با ۱۰ سال سابقه هدایت پروژه‌های ملی.'
  },
  {
    id: 'usr-2',
    name: 'مهرداد وصالی',
    username: 'mehrdad.vesali',
    email: 'mehrdad.vesali@tadbir.ir',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'project_manager',
    roleId: 'role-pm',
    status: 'active',
    title: 'مدیر ارشد پروژه‌های چابک',
    department: 'مدیریت پروژه',
    activeProjectsCount: 3,
    completedTasksCount: 68,
    workloadPercentage: 85,
    skills: ['مدیریت اسپرینت', 'تحلیل ریسک', 'Jira / Linear', 'تسهیل‌گری اسکرام'],
    phone: '۰۹۱۹۲۳۴۵۶۷۸',
    location: 'تهران، سعادت‌آباد',
    lastLogin: '۱۴۰۵/۰۶/۱۰ - ساعت ۰۹:۱۵',
    createdAt: '۱۴۰۴/۰۲/۲۰',
    twoFactorEnabled: true,
    bio: 'مدیر پروژه حرفه‌ای دارای مدارک PMP و Scrum Master، مشتاق شفافیت در گزارش‌دهی و تحویل به‌موقع.'
  },
  {
    id: 'usr-3',
    name: 'علی رضوانی',
    username: 'ali.rezvani',
    email: 'ali.rezvani@tadbir.ir',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'team_member',
    roleId: 'role-member',
    status: 'active',
    title: 'توسعه‌دهنده ارشد فرانت‌اند',
    department: 'تیم مهندسی نرم‌افزار',
    activeProjectsCount: 2,
    completedTasksCount: 54,
    workloadPercentage: 90,
    skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'Next.js', 'بهینه‌سازی کارایی'],
    phone: '۰۹۳۵۱۲۳۴۵۶۷',
    location: 'تهران، یوسف‌آباد',
    lastLogin: '۱۴۰۵/۰۶/۱۰ - ساعت ۱۱:۴۵',
    createdAt: '۱۴۰۴/۰۴/۱۰',
    twoFactorEnabled: false,
    bio: 'توسعه‌دهنده پرشور رابط‌های کاربری مدرن، متمرکز بر سرعت رندر، دسترسی‌پذیری و دیزاین‌سیستم‌های استاندارد.'
  },
  {
    id: 'usr-4',
    name: 'داوود کیانی',
    username: 'davood.kiani',
    email: 'davood.kiani@tadbir.ir',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'team_member',
    roleId: 'role-member',
    status: 'active',
    title: 'توسعه‌دهنده ارشد بک‌اند و زیرساخت',
    department: 'تیم مهندسی نرم‌افزار',
    activeProjectsCount: 3,
    completedTasksCount: 61,
    workloadPercentage: 65,
    skills: ['Node.js', 'Go', 'PostgreSQL', 'GraphQL', 'Kubernetes', 'Redis'],
    phone: '۰۹۳۶۱۱۱۲۲۳۳',
    location: 'اصفهان، چهارباغ',
    lastLogin: '۱۴۰۵/۰۶/۰۹ - ساعت ۲۱:۲۰',
    createdAt: '۱۴۰۴/۰۵/۰۱',
    twoFactorEnabled: true,
    bio: 'مهندس سیستم‌های مقیاس‌پذیر و دیتابیس با تجربه در میکروسرویس‌ها، کشینگ و پیام‌رسانی غیرهمزمان.'
  },
  {
    id: 'usr-5',
    name: 'النا رستمی',
    username: 'elena.rostami',
    email: 'elena.rostami@tadbir.ir',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    role: 'team_member',
    roleId: 'role-member',
    status: 'active',
    title: 'طراح ارشد رابط و تجربه کاربری (UI/UX)',
    department: 'تیم طراحی محصول',
    activeProjectsCount: 2,
    completedTasksCount: 38,
    workloadPercentage: 70,
    skills: ['Figma', 'سیستم دیزاین', 'تست کاربری', 'پروتوتایپ تعاملی'],
    phone: '۰۹۱۲۹۸۷۶۵۴۳',
    location: 'شیراز، ارم',
    lastLogin: '۱۴۰۵/۰۶/۱۰ - ساعت ۱۰:۰۵',
    createdAt: '۱۴۰۴/۰۶/۱۵',
    twoFactorEnabled: false,
    bio: 'طراح رابط و تجربه کاربری با تمرکز بر تعاملات معنادار، سادگی و انتقال مفاهیم به ساده‌ترین شکل بصری.'
  },
  {
    id: 'usr-6',
    name: 'نیما شریفی',
    username: 'nima.sharifi',
    email: 'nima.sharifi@tadbir.ir',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    role: 'team_member',
    roleId: 'role-qa',
    status: 'active',
    title: 'متخصص تضمین کیفیت و تست خودکار (QA)',
    department: 'تضمین کیفیت و تست',
    activeProjectsCount: 4,
    completedTasksCount: 47,
    workloadPercentage: 55,
    skills: ['Playwright', 'Jest', 'Cypress', 'پایپ‌لاین CI/CD', 'تست امنیت'],
    phone: '۰۹۳۰۵۵۵۴۴۳۳',
    location: 'مشهد، وکیل‌آباد',
    lastLogin: '۱۴۰۵/۰۶/۰۸ - ساعت ۱۶:۴۰',
    createdAt: '۱۴۰۴/۰۸/۱۰',
    twoFactorEnabled: false,
    bio: 'مهندس QA و آزمون‌های خودکار با دید دقیق به جزئیات جهت ارتقای ضریب اطمینان و استمرار تحویل نرم‌افزار.'
  },
  {
    id: 'usr-7',
    name: 'مهسا کاظمی',
    username: 'mahsa.kazemi',
    email: 'mahsa.kazemi@tadbir.ir',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    role: 'team_member',
    roleId: 'role-member',
    status: 'pending',
    title: 'کارشناس توسعه بازار و آنبوردینگ',
    department: 'رشد و خدمات مشتریان',
    activeProjectsCount: 1,
    completedTasksCount: 12,
    workloadPercentage: 40,
    skills: ['تحلیل مشتری', 'ارتباطات سازمانی', 'مستندسازی'],
    phone: '۰۹۱۸۴۴۴۳۳۲۲',
    location: 'تبریز، آبرسان',
    lastLogin: '۱۴۰۵/۰۶/۰۵ - ساعت ۱۲:۱۵',
    createdAt: '۱۴۰۵/۰۵/۲۵',
    twoFactorEnabled: false,
    bio: 'همکار جدید تیم ارتباط با مشتریان، در مرحله تکمیل مدارک و آموزش‌های سازمانی سامانه تدبیر.'
  },
  {
    id: 'usr-8',
    name: 'رضا میرزایی',
    username: 'reza.mirzaei',
    email: 'reza.mirzaei@tadbir.ir',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    role: 'team_member',
    roleId: 'role-member',
    status: 'blocked',
    title: 'توسعه‌دهنده سابق برون‌سپاری',
    department: 'تیم مهندسی نرم‌افزار',
    activeProjectsCount: 0,
    completedTasksCount: 29,
    workloadPercentage: 0,
    skills: ['پایتون', 'اسکریپت‌نویسی'],
    phone: '۰۹۱۲۰۰۰۱۱۴۴',
    location: 'کرج، گوهردشت',
    lastLogin: '۱۴۰۵/۰۲/۱۴ - ساعت ۰۸:۰۰',
    createdAt: '۱۴۰۴/۰۹/۰۱',
    twoFactorEnabled: false,
    bio: 'حساب کاربری موقتاً به دلیل اتمام قرارداد برون‌سپاری مسدود شده است.'
  },
  {
    id: 'usr-10',
    name: 'مهدی رضایی',
    username: 'mehdi.rezaei',
    email: 'mehdi.rezaei@tadbir.ir',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    role: 'team_member',
    roleId: 'role-member',
    status: 'active',
    title: 'طراح ارشد رابط کاربری و دیزاین سیستم',
    department: 'تیم طراحی محصول',
    activeProjectsCount: 3,
    completedTasksCount: 45,
    workloadPercentage: 65,
    skills: ['Figma', 'Design System', 'Micro-interactions', 'Prototyping'],
    phone: '۰۹۱۲۱۱۱۴۴۵۵',
    location: 'تهران، نیاوران',
    lastLogin: 'امروز - ساعت ۱۶:۱۰',
    createdAt: '۱۴۰۴/۰۳/۱۰',
    twoFactorEnabled: true,
    bio: 'طراح رابط کاربری و شیفته تعاملات ظریف و سیستم‌های دیزاین مقیاس‌پذیر.'
  },
  {
    id: 'usr-11',
    name: 'علی احمدی',
    username: 'ali.ahmadi',
    email: 'ali.ahmadi@tadbir.ir',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    role: 'team_member',
    roleId: 'role-member',
    status: 'active',
    title: 'توسعه‌دهنده ارشد بک‌اند و API',
    department: 'تیم مهندسی نرم‌افزار',
    activeProjectsCount: 2,
    completedTasksCount: 58,
    workloadPercentage: 80,
    skills: ['Node.js', 'NestJS', 'PostgreSQL', 'Docker', 'Redis'],
    phone: '۰۹۱۹۵۵۵۶۶۷۷',
    location: 'تهران، میرداماد',
    lastLogin: 'امروز - ساعت ۱۵:۴۵',
    createdAt: '۱۴۰۴/۰۱/۲۰',
    twoFactorEnabled: true,
    bio: 'مهندس بک‌اند با تخصص در طراحی وب‌سرویس‌های امن و معماری میکروسرویس.'
  },
  {
    id: 'usr-12',
    name: 'سارا محمدی',
    username: 'sara.mohammadi',
    email: 'sara.mohammadi@tadbir.ir',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'team_member',
    roleId: 'role-member',
    status: 'active',
    title: 'مدیر بازاریابی دیجیتال و رشد',
    department: 'تیم رشد و مارکتینگ',
    activeProjectsCount: 2,
    completedTasksCount: 33,
    workloadPercentage: 70,
    skills: ['Digital Marketing', 'Growth Hacking', 'SEO', 'Data Analytics'],
    phone: '۰۹۳۷۸۸۸۹۹۰۰',
    location: 'تهران، پاسداران',
    lastLogin: 'امروز - ساعت ۱۲:۳۰',
    createdAt: '۱۴۰۴/۰۴/۰۵',
    twoFactorEnabled: false,
    bio: 'راهبر کمپین‌های تبلیغاتی و افزایش شاخص‌های تبدیل و جذب کاربر فعال.'
  },
  {
    id: 'usr-13',
    name: 'محمد کریمی',
    username: 'mohammad.karimi',
    email: 'mohammad.karimi@tadbir.ir',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80',
    role: 'team_member',
    roleId: 'role-qa',
    status: 'active',
    title: 'سرپرست آزمون نرم‌افزار و DevOps',
    department: 'تضمین کیفیت و تست',
    activeProjectsCount: 3,
    completedTasksCount: 51,
    workloadPercentage: 60,
    skills: ['DevOps', 'CI/CD', 'Automated Testing', 'Security Audit'],
    phone: '۰۹۱۲۷۷۷۸۸۹۹',
    location: 'کرج، عظیمیه',
    lastLogin: 'امروز - ساعت ۱۴:۲۰',
    createdAt: '۱۴۰۴/۰۲/۱۵',
    twoFactorEnabled: true,
    bio: 'مهندس DevOps و آزمون نرم‌افزار با تمرکز بر پایپ‌لاین‌های استقرار پیوسته و امنیت داده.'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'بازطراحی پرتال ابری کلود‌سینک ۲.۰',
    key: 'SYNC',
    description: 'طراحی مجدد رابط کاربری وب با قابلیت همگام‌سازی بلادرنگ، چیدمان واکنش‌گرا و سامانه یکپارچه طراحی دیزاین سیستم.',
    projectManagerId: 'usr-2',
    memberIds: ['usr-1', 'usr-2', 'usr-3', 'usr-4', 'usr-5', 'usr-6'],
    startDate: '2026-08-01',
    deadline: '2026-09-30',
    status: 'active',
    progress: 68,
    priority: 'urgent',
    tags: ['فرانت‌اند', 'UI/UX', 'رایانش ابری', 'فاز سوم'],
    color: '#6366f1',
    budget: '۲۵۰,۰۰۰,۰۰۰ تومان',
    category: 'توسعه محصول',
    createdAt: '2026-07-20'
  },
  {
    id: 'proj-2',
    name: 'گیت‌وی امنیتی API و احراز هویت سازمانی',
    key: 'AUTH',
    description: 'میکروسرویس احراز هویت با توان پردازش بالا، پشتیبانی از OAuth 2.0، کنترل دسترسی نقش‌محور (RBAC) و محدودسازی نرخ درخواست.',
    projectManagerId: 'usr-2',
    memberIds: ['usr-1', 'usr-2', 'usr-4', 'usr-6'],
    startDate: '2026-08-10',
    deadline: '2026-10-15',
    status: 'active',
    progress: 45,
    priority: 'high',
    tags: ['امنیت', 'بک‌اند', 'API', 'زیرساخت'],
    color: '#0ea5e9',
    budget: '۱۸۰,۰۰۰,۰۰۰ تومان',
    category: 'زیرساخت ابری',
    createdAt: '2026-08-02'
  },
  {
    id: 'proj-3',
    name: 'اپلیکیشن موبایل اندروید و iOS نسخه ۳.۰',
    key: 'MOBI',
    description: 'تجربه کاربری چندسکویی با حالت آفلاین، ورود بیومتریک، اعلان‌های پوش و ویجت ثبت سریع تسک‌ها.',
    projectManagerId: 'usr-1',
    memberIds: ['usr-1', 'usr-3', 'usr-5'],
    startDate: '2026-09-01',
    deadline: '2026-11-20',
    status: 'planning',
    progress: 15,
    priority: 'medium',
    tags: ['موبایل', 'iOS', 'اندروید', 'React Native'],
    color: '#8b5cf6',
    budget: '۳۰۰,۰۰۰,۰۰۰ تومان',
    category: 'اپلیکیشن موبایل',
    createdAt: '2026-08-25'
  },
  {
    id: 'proj-4',
    name: 'سامانه تحلیل داده و پیش‌بینی بار کاری تیم',
    key: 'DATA',
    description: 'موتور هوشمند توزیع بار کاری، پیش‌بینی سرعت اسپرینت، شناسایی خودکار گلوگاه‌های پروژه و گزارش‌گیری مدیریتی.',
    projectManagerId: 'usr-2',
    memberIds: ['usr-2', 'usr-4', 'usr-5'],
    startDate: '2026-07-15',
    deadline: '2026-09-10',
    status: 'active',
    progress: 82,
    priority: 'high',
    tags: ['تحلیل داده', 'هوش مصنوعی', 'داشبورد مدیریتی'],
    color: '#10b981',
    budget: '۱۴۰,۰۰۰,۰۰۰ تومان',
    category: 'علم داده و هوش تجاری',
    createdAt: '2026-07-10'
  },
  {
    id: 'proj-5',
    name: 'پرتال مستندات و آنبوردینگ مشتریان',
    key: 'DOCS',
    description: 'پرتال تعاملی اسناد فنی همراه با محیط سندباکس اجرای کد، تور ویدیویی مرحله‌به‌مرحله و راهنمای راه‌اندازی.',
    projectManagerId: 'usr-1',
    memberIds: ['usr-1', 'usr-3', 'usr-5'],
    startDate: '2026-06-01',
    deadline: '2026-08-20',
    status: 'completed',
    progress: 100,
    priority: 'low',
    tags: ['مستندات', 'موفقیت مشتری', 'توسعه‌دهندگان'],
    color: '#f59e0b',
    budget: '۶۰,۰۰۰,۰۰۰ تومان',
    category: 'رشد و خدمات مشتریان',
    createdAt: '2026-05-20'
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'tsk-101',
    title: 'طراحی رابط کاربری ورود و مراحل آنبوردینگ در فیگما',
    description: 'تولید کامپوننت‌های فیگما برای صفحات ورود، احراز هویت دو مرحله‌ای (2FA)، مودال دعوت از همکاران و بازیابی گذرواژه همراه با کلیه حالت‌های اعتبارسنجی.',
    projectId: 'proj-1',
    assigneeId: 'usr-5', // النا
    priority: 'urgent',
    status: 'in_progress',
    startDate: '2026-08-24',
    deadline: '2026-09-02',
    estimatedHours: 24,
    loggedHours: 18,
    tags: ['UI/UX', 'Figma', 'احراز هویت'],
    subtasks: [
      { id: 'sub-1', title: 'طراحی وایرفریم مودال تایید دو مرحله‌ای', completed: true },
      { id: 'sub-2', title: 'طراحی حالت‌های ریسپانسیو در موبایل', completed: true },
      { id: 'sub-3', title: 'خروجی متغیرها و توکن‌های CSS دیزاین سیستم', completed: false },
      { id: 'sub-4', title: 'برگزاری جلسه بازبینی با مدیر پروژه', completed: false }
    ],
    comments: [
      {
        id: 'com-1',
        userId: 'usr-2',
        text: 'لطفاً اطمینان حاصل کنید که توکن‌های حالت شب و روز به طور هماهنگ خروجی گرفته شوند.',
        timestamp: '2026-08-28T14:30:00Z'
      },
      {
        id: 'com-2',
        userId: 'usr-5',
        text: 'توکن‌ها با تنظیمات Tailwind و متغیرهای رنگی کاملاً هماهنگ شدند.',
        timestamp: '2026-08-29T09:15:00Z'
      }
    ],
    attachments: [
      {
        id: 'att-1',
        name: 'Auth_Flow_Architecture_v2.fig',
        size: '14.2 MB',
        type: 'figma',
        url: '#',
        uploadDate: '2026-08-27',
        uploadedBy: 'usr-5'
      }
    ],
    activityHistory: [
      { id: 'act-1', userId: 'usr-2', action: 'تسک را ایجاد کرد', timestamp: '2026-08-24T10:00:00Z' },
      { id: 'act-2', userId: 'usr-5', action: 'وضعیت را به در حال انجام تغییر داد', timestamp: '2026-08-25T11:20:00Z' }
    ],
    dependencies: [],
    createdAt: '2026-08-24T10:00:00Z',
    updatedAt: '2026-08-29T09:15:00Z'
  },
  {
    id: 'tsk-102',
    title: 'پیاده‌سازی برد کانبان تعاملی با کشیدن و رها کردن (Drag & Drop)',
    description: 'ساخت برد کانبان چابک با پشتیبانی از کشیدن کارت‌ها بین ستون‌ها، انیمیشن‌های روان، هشدار سقف کار در جریان (WIP) و فیلترهای پیشرفته.',
    projectId: 'proj-1',
    assigneeId: 'usr-3', // علی رضوانی
    priority: 'urgent',
    status: 'in_progress',
    startDate: '2026-08-26',
    deadline: '2026-09-04',
    estimatedHours: 32,
    loggedHours: 22,
    tags: ['فرانت‌اند', 'کانبان', 'React 19', 'انیمیشن'],
    subtasks: [
      { id: 'sub-21', title: 'پیکربندی سنسورهای درگ و دراپ', completed: true },
      { id: 'sub-22', title: 'پیاده‌سازی ترنزیشن‌های حرکتی ۶۰ فریم', completed: true },
      { id: 'sub-23', title: 'افزودن دسترسی‌پذیری کیبورد برای جابجایی کارت‌ها', completed: false },
      { id: 'sub-24', title: 'ذخیره‌سازی وضعیت ستون‌ها در حافظه پایدار', completed: true }
    ],
    comments: [
      {
        id: 'com-11',
        userId: 'usr-3',
        text: 'انیمیشن‌های برد با فریم‌ریت عالی پیاده شدند و حالت‌های مختلف تست شدند.',
        timestamp: '2026-08-30T16:40:00Z'
      }
    ],
    attachments: [],
    activityHistory: [
      { id: 'act-11', userId: 'usr-3', action: 'شروع به انجام تسک کرد', timestamp: '2026-08-26T09:00:00Z' }
    ],
    dependencies: ['tsk-101'],
    createdAt: '2026-08-25T08:00:00Z',
    updatedAt: '2026-08-30T16:40:00Z'
  },
  {
    id: 'tsk-103',
    title: 'رفع خطای انقضای توکن JWT در اتصال وب‌سوکت',
    description: 'رفع باگ بحرانی: در صورت انقضای توکن، اتصال وب‌سوکت در حلقه قطع و وصل مداوم می‌افتد و وضعیت همکاری زنده متوقف می‌شود.',
    projectId: 'proj-2',
    assigneeId: 'usr-4', // داوود
    priority: 'urgent',
    status: 'in_progress',
    startDate: '2026-08-28',
    deadline: '2026-08-30', // Overdue
    estimatedHours: 12,
    loggedHours: 14,
    tags: ['بک‌اند', 'امنیت', 'باگ', 'وب‌سوکت'],
    subtasks: [
      { id: 'sub-31', title: 'شبیه‌سازی شرایط تداخل در تست‌های خودکار', completed: true },
      { id: 'sub-32', title: 'پیاده‌سازی قفل Mutex برای تبادل توکن رفرش', completed: true },
      { id: 'sub-33', title: 'استقرار نسخه پچ روی محیط استیجینگ', completed: false }
    ],
    comments: [
      {
        id: 'com-21',
        userId: 'usr-6',
        text: 'تست‌های رگرسیون شبانه این مورد را ثبت کردند. پچ آماده بررسی است.',
        timestamp: '2026-08-30T18:00:00Z'
      }
    ],
    attachments: [
      {
        id: 'att-21',
        name: 'websocket_trace_dump.log',
        size: '2.4 MB',
        type: 'log',
        url: '#',
        uploadDate: '2026-08-28',
        uploadedBy: 'usr-6'
      }
    ],
    activityHistory: [
      { id: 'act-21', userId: 'usr-4', action: 'این مورد را به عنوان مانع بحرانی علامت‌گذاری کرد', timestamp: '2026-08-28T11:00:00Z' }
    ],
    dependencies: [],
    isBlocked: true,
    blockedReason: 'در انتظار تمدید گواهینامه امنیتی سرور استیجینگ توسط تیم دوآپس',
    createdAt: '2026-08-28T09:00:00Z',
    updatedAt: '2026-08-30T18:00:00Z'
  },
  {
    id: 'tsk-104',
    title: 'پیکربندی تست‌های رگرسیون End-to-End با Playwright',
    description: 'راه‌اندازی سناریوهای آزمون خودکار برای جریان ایجاد پروژه، محدودیت‌های دسترسی نقش‌ها و کشیدن تسک‌ها در پایپ‌لاین CI/CD.',
    projectId: 'proj-1',
    assigneeId: 'usr-6', // نیما
    priority: 'medium',
    status: 'todo',
    startDate: '2026-08-31',
    deadline: '2026-09-08',
    estimatedHours: 20,
    loggedHours: 0,
    tags: ['تضمین کیفیت', 'Playwright', 'CI/CD'],
    subtasks: [
      { id: 'sub-41', title: 'تنظیم رانر GitHub Actions', completed: false },
      { id: 'sub-42', title: 'نگارش سناریوهای مرز دسترسی نقش‌ها', completed: false },
      { id: 'sub-43', title: 'افزودن تست مقایسه اسکرین‌شات‌های بصری', completed: false }
    ],
    comments: [],
    attachments: [],
    activityHistory: [
      { id: 'act-31', userId: 'usr-2', action: 'تسک را به نیما شریفی اختصاص داد', timestamp: '2026-08-30T10:00:00Z' }
    ],
    dependencies: ['tsk-102'],
    createdAt: '2026-08-30T10:00:00Z',
    updatedAt: '2026-08-30T10:00:00Z'
  },
  {
    id: 'tsk-105',
    title: 'توسعه رادار توزیع بار کاری و ظرفیت اعضای تیم',
    description: 'ایجاد کامپوننت تحلیلی محاسبه ظرفیت کاری بر اساس ساعات تخمینی تسک‌های فعال در برابر سقف هفتگی هر عضو تیم.',
    projectId: 'proj-4',
    assigneeId: 'usr-3', // علی
    priority: 'high',
    status: 'review',
    startDate: '2026-08-20',
    deadline: '2026-09-03',
    estimatedHours: 28,
    loggedHours: 26,
    tags: ['تحلیل داده', 'نمودارها', 'فرانت‌اند'],
    subtasks: [
      { id: 'sub-51', title: 'فرمول‌بندی الگوریتم امتیازدهی بار کاری', completed: true },
      { id: 'sub-52', title: 'رسم نوارهای پیشرفت تعاملی SVG', completed: true },
      { id: 'sub-53', title: 'افزودن نشانگر هشدار ظرفیت بحرانی (بیش از ۸۵٪)', completed: true },
      { id: 'sub-54', title: 'خروجی اکسل و JSON از معیارهای تیمی', completed: true }
    ],
    comments: [
      {
        id: 'com-51',
        userId: 'usr-2',
        text: 'بسیار عالی طراحی شده. پول‌ریکوئست را بررسی کردم و بازخوردها ثبت شدند.',
        timestamp: '2026-08-31T08:30:00Z'
      }
    ],
    attachments: [],
    activityHistory: [
      { id: 'act-51', userId: 'usr-3', action: 'برای بازبینی کد ارسال کرد', timestamp: '2026-08-30T17:15:00Z' }
    ],
    dependencies: [],
    createdAt: '2026-08-20T08:00:00Z',
    updatedAt: '2026-08-31T08:30:00Z'
  },
  {
    id: 'tsk-106',
    title: 'بهینه‌سازی ایندکس‌های دیتابیس برای کوئری‌های زیر ۱۰ میلی‌ثانیه',
    description: 'بهینه‌سازی ایندکس‌های ترکیبی PostgreSQL روی وضعیت و مهلت تسک‌ها و تنظیم استخر اتصالات خواندن (Read Replica).',
    projectId: 'proj-2',
    assigneeId: 'usr-4', // داوود
    priority: 'high',
    status: 'completed',
    startDate: '2026-08-15',
    deadline: '2026-08-25',
    estimatedHours: 16,
    loggedHours: 15,
    tags: ['دیتابیس', 'PostgreSQL', 'کارایی'],
    subtasks: [
      { id: 'sub-61', title: 'تحلیل پلن اجرای کوئری با EXPLAIN ANALYZE', completed: true },
      { id: 'sub-62', title: 'اعمال ایندکس‌های جزئی روی تسک‌های فعال', completed: true },
      { id: 'sub-63', title: 'بنچ‌مارک تأخیر زیر بار ترافیکی سنگین', completed: true }
    ],
    comments: [
      {
        id: 'com-61',
        userId: 'usr-4',
        text: 'زمان کوئری P99 از ۱۴۵ میلی‌ثانیه به ۴.۲ میلی‌ثانیه کاهش پیدا کرد.',
        timestamp: '2026-08-25T16:00:00Z'
      }
    ],
    attachments: [
      {
        id: 'att-61',
        name: 'latency_benchmark_report.pdf',
        size: '1.1 MB',
        type: 'pdf',
        url: '#',
        uploadDate: '2026-08-25',
        uploadedBy: 'usr-4'
      }
    ],
    activityHistory: [
      { id: 'act-61', userId: 'usr-4', action: 'تسک را به عنوان تکمیل شده ثبت کرد', timestamp: '2026-08-25T16:30:00Z' }
    ],
    dependencies: [],
    createdAt: '2026-08-15T09:00:00Z',
    updatedAt: '2026-08-25T16:30:00Z'
  },
  {
    id: 'tsk-107',
    title: 'راه‌اندازی سرویس پوش نوتیفیکیشن موبایل (FCM & APNs)',
    description: 'پیکربندی ارسال اعلان‌های لحظه‌ای برای واگذاری تسک‌ها، یادآوری مهلت‌های نزدیک و منشن شدن در دیدگاه‌ها.',
    projectId: 'proj-3',
    assigneeId: 'usr-3', // علی
    priority: 'medium',
    status: 'backlog',
    startDate: '2026-09-05',
    deadline: '2026-09-18',
    estimatedHours: 24,
    loggedHours: 0,
    tags: ['موبایل', 'اعلان‌ها', 'FCM'],
    subtasks: [
      { id: 'sub-71', title: 'تعریف فرمت پیام و لینک‌های عمیق (Deep Linking)', completed: false },
      { id: 'sub-72', title: 'پیاده‌سازی هندلر پس‌زمینه در سیستم عامل iOS', completed: false }
    ],
    comments: [],
    attachments: [],
    activityHistory: [
      { id: 'act-71', userId: 'usr-1', action: 'به بک‌لاگ پروژه موبایل اضافه کرد', timestamp: '2026-08-28T14:00:00Z' }
    ],
    dependencies: [],
    createdAt: '2026-08-28T14:00:00Z',
    updatedAt: '2026-08-28T14:00:00Z'
  },
  {
    id: 'tsk-108',
    title: 'ممیزی و سخت‌گیری دسترسی‌های نقش‌محور (RBAC)',
    description: 'آزمون و تایید مرزهای دسترسی مدیر ارشد، مدیر پروژه و اعضای عادی در تمام عملیات حساس و تب‌های سامانه.',
    projectId: 'proj-2',
    assigneeId: 'usr-6', // نیما
    priority: 'high',
    status: 'completed',
    startDate: '2026-08-18',
    deadline: '2026-08-28',
    estimatedHours: 18,
    loggedHours: 18,
    tags: ['امنیت', 'RBAC', 'ممیزی'],
    subtasks: [
      { id: 'sub-81', title: 'بررسی دسترسی‌های حذف تیم توسط ادمین', completed: true },
      { id: 'sub-82', title: 'تست عدم دسترسی عضو عادی به ویرایش بودجه پروژه', completed: true },
      { id: 'sub-83', title: 'مستندسازی ماتریس دسترسی‌ها و مجوزها', completed: true }
    ],
    comments: [],
    attachments: [],
    activityHistory: [
      { id: 'act-81', userId: 'usr-6', action: 'تمام تست‌های امنیتی را با موفقیت پاس کرد', timestamp: '2026-08-28T15:00:00Z' }
    ],
    dependencies: [],
    createdAt: '2026-08-18T10:00:00Z',
    updatedAt: '2026-08-28T15:00:00Z'
  },
  {
    id: 'tsk-109',
    title: 'پیاده‌سازی تقویم زمان‌بندی جامع با نمای ماهانه و هفتگی',
    description: 'نمایش ماتریس تحویل پروژه‌ها، اسپرینت‌ها و ددلاین تسک‌ها با برچسب‌های رنگی و فیلترهای سریع.',
    projectId: 'proj-1',
    assigneeId: 'usr-3', // علی
    priority: 'medium',
    status: 'todo',
    startDate: '2026-09-01',
    deadline: '2026-09-12',
    estimatedHours: 20,
    loggedHours: 0,
    tags: ['فرانت‌اند', 'تقویم', 'تایم‌لاین'],
    subtasks: [
      { id: 'sub-91', title: 'ساخت گرید تقویم با شماره‌گذاری هفته‌ها', completed: false },
      { id: 'sub-92', title: 'اتصال فیلترهای برچسب پروژه', completed: false },
      { id: 'sub-93', title: 'امکان تعریف سریع تسک مستقیماً از داخل خانه‌های تقویم', completed: false }
    ],
    comments: [],
    attachments: [],
    activityHistory: [
      { id: 'act-91', userId: 'usr-2', action: 'تسک جدید برای علی تعریف کرد', timestamp: '2026-08-30T14:20:00Z' }
    ],
    dependencies: ['tsk-102'],
    createdAt: '2026-08-30T14:20:00Z',
    updatedAt: '2026-08-30T14:20:00Z'
  },
  {
    id: 'tsk-110',
    title: 'انتشار مستندات تعاملی Swagger و محیط سندباکس API',
    description: 'تولید مشخصات OpenAPI 3.1، نمونه کدهای فراخوانی در TypeScript و پایتون و استقرار پرتال خودکار توسعه‌دهندگان.',
    projectId: 'proj-5',
    assigneeId: 'usr-4', // داوود
    priority: 'low',
    status: 'completed',
    startDate: '2026-07-01',
    deadline: '2026-08-15',
    estimatedHours: 30,
    loggedHours: 28,
    tags: ['مستندات', 'OpenAPI', 'تجربه توسعه‌دهنده'],
    subtasks: [
      { id: 'sub-101', title: 'تدوین اسکیماهای OpenAPI 3.1', completed: true },
      { id: 'sub-102', title: 'ساخت کنسول اجرای زنده درخواست‌ها', completed: true },
      { id: 'sub-103', title: 'انتشار لاگ تغییرات و راهنمای مهاجرت', completed: true }
    ],
    comments: [],
    attachments: [],
    activityHistory: [
      { id: 'act-101', userId: 'usr-1', action: 'انتشار نهایی مستندات را تایید کرد', timestamp: '2026-08-15T12:00:00Z' }
    ],
    dependencies: [],
    createdAt: '2026-07-01T09:00:00Z',
    updatedAt: '2026-08-15T12:00:00Z'
  }
];

export const INITIAL_TEAMS: Team[] = [
  {
    id: 'team-1',
    name: 'تیم هسته فرانت‌اند و دیزاین سیستم',
    description: 'مسئول معماری کلاینت وب، یکپارچگی تجربه کاربری، توکن‌های طراحی، تعاملات بصری و استانداردهای دسترسی‌پذیری.',
    leaderId: 'usr-3', // علی
    memberIds: ['usr-1', 'usr-3', 'usr-5'],
    projectIds: ['proj-1', 'proj-3', 'proj-4'],
    department: 'مهندسی فرانت‌اند',
    color: '#6366f1'
  },
  {
    id: 'team-2',
    name: 'تیم بک‌اند و زیرساخت ابری',
    description: 'طراحی معماری میکروسرویس‌ها، بهینه‌سازی کوئری‌های دیتابیس، پروتکل‌های امنیتی و ارکستراسیون کانتینرها.',
    leaderId: 'usr-4', // داوود
    memberIds: ['usr-1', 'usr-2', 'usr-4', 'usr-6'],
    projectIds: ['proj-2', 'proj-4'],
    department: 'مهندسی بک‌اند',
    color: '#0ea5e9'
  },
  {
    id: 'team-3',
    name: 'تیم استراتژی محصول و تضمین کیفیت',
    description: 'برنامه‌ریزی اسپرینت‌ها، تحقیقات کاربری، پایپ‌لاین آزمون خودکار، تحلیل سرعت تیم و هماهنگی تحویل محصول.',
    leaderId: 'usr-2', // مهرداد
    memberIds: ['usr-1', 'usr-2', 'usr-5', 'usr-6'],
    projectIds: ['proj-1', 'proj-2', 'proj-4', 'proj-5'],
    department: 'مدیریت محصول و QA',
    color: '#10b981'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    userId: 'usr-3', // علی
    title: 'تسک جدید واگذار شد',
    message: 'مهرداد وصالی شما را به عنوان مسئول تسک "پیاده‌سازی برد کانبان تعاملی با کشیدن و رها کردن" انتخاب کرد.',
    type: 'assignment',
    read: false,
    timestamp: '2026-08-30T10:00:00Z',
    linkTaskId: 'tsk-102',
    linkProjectId: 'proj-1'
  },
  {
    id: 'notif-2',
    userId: 'usr-4', // داوود
    title: '⚠️ هشدار عبور از مهلت تسک (Overdue)',
    message: 'مهلت تسک "رفع خطای انقضای توکن JWT در اتصال وب‌سوکت" به پایان رسیده و نیازمند بررسی فوری است.',
    type: 'overdue',
    read: false,
    timestamp: '2026-08-31T00:01:00Z',
    linkTaskId: 'tsk-103',
    linkProjectId: 'proj-2'
  },
  {
    id: 'notif-3',
    userId: 'usr-3', // علی
    title: 'تغییر وضعیت تسک',
    message: 'تسک "توسعه رادار توزیع بار کاری" توسط مهرداد وصالی به وضعیت "در حال بازبینی" منتقل شد.',
    type: 'status_change',
    read: false,
    timestamp: '2026-08-31T08:30:00Z',
    linkTaskId: 'tsk-105',
    linkProjectId: 'proj-4'
  },
  {
    id: 'notif-4',
    userId: 'usr-5', // النا
    title: 'دیدگاه جدید روی تسک',
    message: 'مهرداد وصالی دیدگاهی ثبت کرد: "لطفاً اطمینان حاصل کنید که توکن‌های حالت شب و روز هماهنگ باشند..."',
    type: 'comment',
    read: true,
    timestamp: '2026-08-28T14:30:00Z',
    linkTaskId: 'tsk-101',
    linkProjectId: 'proj-1'
  },
  {
    id: 'notif-5',
    userId: 'usr-3', // علی
    title: 'یادآوری مهلت نزدیک',
    message: 'تسک "طراحی رابط کاربری ورود و مراحل آنبوردینگ" تا ۲ روز دیگر سررسید می‌شود.',
    type: 'deadline',
    read: true,
    timestamp: '2026-08-31T07:00:00Z',
    linkTaskId: 'tsk-101',
    linkProjectId: 'proj-1'
  }
];

export const INITIAL_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'tpl-scrum',
    name: 'اسپرینت توسعه چابک نرم‌افزار (Scrum Software Sprint)',
    description: 'الگوی استاندارد تیم‌های فنی شامل مراحل تحلیل نیازمندی‌ها، طراحی معماری، پیاده‌سازی بک‌اند و فرانت‌اند، تست‌های خودکار و تحویل نسخه.',
    category: 'مهندسی نرم‌افزار',
    icon: 'Layers',
    color: '#6366f1',
    defaultPriority: 'high',
    estimatedDurationDays: 14,
    budget: '۱۵۰,۰۰۰,۰۰۰ تومان',
    stages: [
      { id: 'backlog', name: 'بک‌لاگ اسپرینت', color: '#94a3b8' },
      { id: 'todo', name: 'برای انجام', color: '#64748b' },
      { id: 'in_progress', name: 'در حال توسعه', color: '#3b82f6' },
      { id: 'review', name: 'بررسی کد و معماری', color: '#8b5cf6' },
      { id: 'completed', name: 'تست شده و مستقر', color: '#10b981' }
    ],
    tags: ['اسکرام', 'اسپرینت', 'نرم‌افزار', 'چابک'],
    isBuiltIn: true,
    createdAt: '2026-08-01',
    tasks: [
      {
        id: 'tt-1',
        title: 'برگزاری جلسه برنامه‌ریزی اسپرینت و اولویت‌بندی نیازمندی‌ها',
        description: 'بررسی استوری‌های کاربر، تخمین ساعت و تخصیص وظایف به اعضای تیم توسعه.',
        relativeDueDays: 2,
        estimatedHours: 8,
        priority: 'high',
        status: 'todo',
        tags: ['اسپرینت', 'برنامه‌ریزی'],
        subtasks: ['تعریف معیارهای پذیرش (Acceptance Criteria)', 'تخمین سایز استوری‌ها', 'تخصیص تسک‌ها'],
        suggestedRole: 'project_manager'
      },
      {
        id: 'tt-2',
        title: 'طراحی معماری پایگاه داده و تعریف قراردادهای API',
        description: 'ایجاد اسکیماهای پایگاه داده و تنظیم مستندات Swagger برای هماهنگی فرانت‌اند و بک‌اند.',
        relativeDueDays: 5,
        estimatedHours: 16,
        priority: 'urgent',
        status: 'todo',
        tags: ['بک‌اند', 'API', 'دیتابیس'],
        subtasks: ['تعریف مایگریشن‌ها', 'طراحی ایندکس‌ها', 'انتشار مستندات OpenAPI'],
        suggestedRole: 'team_member'
      },
      {
        id: 'tt-3',
        title: 'پیاده‌سازی کامپوننت‌های رابط کاربری و اتصال به سرویس‌ها',
        description: 'توسعه صفحات و کامپوننت‌های واکنش‌گرا با تایپ‌اسکریپت و ری‌اکت.',
        relativeDueDays: 9,
        estimatedHours: 24,
        priority: 'high',
        status: 'todo',
        tags: ['فرانت‌اند', 'React', 'UI'],
        subtasks: ['پیاده‌سازی کلاینت API', 'مدیریت خطاها و لودینگ', 'تست ریسپانسیو موبایل'],
        suggestedRole: 'team_member'
      },
      {
        id: 'tt-4',
        title: 'اجرای تست‌های جامع E2E و تضمین کیفیت نهایی',
        description: 'اجرای سناریوهای آزمون خودکار با Playwright و اطمینان از عملکرد بدون خطا.',
        relativeDueDays: 12,
        estimatedHours: 12,
        priority: 'medium',
        status: 'todo',
        tags: ['QA', 'تست', 'CI/CD'],
        subtasks: ['تست جریان اصلی کاربر', 'بررسی لاگ خطاها', 'تست فشار و کارایی'],
        suggestedRole: 'team_member'
      },
      {
        id: 'tt-5',
        title: 'برگزاری جلسه دمو و رترواسپکتیو اسپرینت',
        description: 'نمایش دستاوردها به ذینفعان و بررسی نقاط قوت و فرصت‌های بهبود تیم.',
        relativeDueDays: 14,
        estimatedHours: 4,
        priority: 'medium',
        status: 'todo',
        tags: ['دمو', 'رترو'],
        subtasks: ['آماده‌سازی اسلایدها و دموی زنده', 'جمع‌آوری بازخوردها', 'ثبت اکشن‌آیتم‌ها'],
        suggestedRole: 'project_manager'
      }
    ]
  },
  {
    id: 'tpl-launch',
    name: 'کمپین لانچ و عرضه محصول به بازار (Go-To-Market & Product Launch)',
    description: 'چارچوب جامع برای معرفی محصول جدید به بازار، کمپین‌های تبلیغاتی، هماهنگی رسانه‌ای، آموزش تیم فروش و پشتیبانی مشتریان.',
    category: 'بازاریابی و رشد',
    icon: 'Sparkles',
    color: '#ec4899',
    defaultPriority: 'urgent',
    estimatedDurationDays: 21,
    budget: '۲۰۰,۰۰۰,۰۰۰ تومان',
    stages: [
      { id: 'backlog', name: 'ایده‌پردازی و استراتژی', color: '#94a3b8' },
      { id: 'todo', name: 'آماده‌سازی محتوا و لندینگ', color: '#f59e0b' },
      { id: 'in_progress', name: 'اجرای پیش‌کمپین', color: '#ec4899' },
      { id: 'review', name: 'روز رونمایی (Launch Day)', color: '#8b5cf6' },
      { id: 'completed', name: 'تحلیل نتایج و بازخوردها', color: '#10b981' }
    ],
    tags: ['لانچ', 'مارکتینگ', 'محصول', 'کمپین'],
    isBuiltIn: true,
    createdAt: '2026-08-05',
    tasks: [
      {
        id: 'tt-11',
        title: 'تدوین سند جایگاه‌یابی محصول و پیام‌رسانی اصلی (Value Prop)',
        description: 'مشخص کردن مزیت‌های رقابتی، پرسونای مخاطب هدف و شعار کمپین.',
        relativeDueDays: 4,
        estimatedHours: 12,
        priority: 'urgent',
        status: 'todo',
        tags: ['استراتژی', 'پرسونا'],
        subtasks: ['تحلیل رقبا', 'نگارش بیانیه ارزش', 'تایید مدیریت ارشد'],
        suggestedRole: 'admin'
      },
      {
        id: 'tt-12',
        title: 'طراحی و توسعه لندینگ پیج اختصاصی رونمایی با فرم ثبت‌نام زودهنگام',
        description: 'صفحه فرود با نرخ تبدیل بالا همراه با ویدیو معرفی محصول و گارانتی بازگشت وجه.',
        relativeDueDays: 10,
        estimatedHours: 20,
        priority: 'high',
        status: 'todo',
        tags: ['لندینگ', 'طراحی', 'فرانت‌اند'],
        subtasks: ['طراحی UI لندینگ', 'کدنویسی واکنش‌گرا', 'اتصال به سیستم ایمیل‌مارکتینگ'],
        suggestedRole: 'team_member'
      },
      {
        id: 'tt-13',
        title: 'تولید بسته مطبوعاتی، پست‌های شبکه‌های اجتماعی و تیزر ویدیویی',
        description: 'تهیه بیانیه خبری برای خبرگزاری‌ها و بنرهای تبلیغاتی لینکدین و اینستاگرام.',
        relativeDueDays: 15,
        estimatedHours: 18,
        priority: 'high',
        status: 'todo',
        tags: ['محتوا', 'رسانه', 'ویدیو'],
        subtasks: ['نگارش متن بیانیه خبری', 'تولید موشن‌گرافیک تیزر', 'زمان‌بندی پست‌ها'],
        suggestedRole: 'team_member'
      },
      {
        id: 'tt-14',
        title: 'آموزش تیم فروش و استقرار سیستم پشتیبانی آنلاین',
        description: 'برگزاری کارگاه توجیهی برای کارشناسان پشتیبانی و آماده‌سازی پاسخ‌های پرتکرار (FAQ).',
        relativeDueDays: 18,
        estimatedHours: 10,
        priority: 'medium',
        status: 'todo',
        tags: ['فروش', 'پشتیبانی', 'آموزش'],
        subtasks: ['تدوین راهنمای FAQ', 'تنظیم چت آنلاین لندینگ', 'شبیه‌سازی سناریوهای فروش'],
        suggestedRole: 'project_manager'
      },
      {
        id: 'tt-15',
        title: 'راه‌اندازی کمپین تبلیغاتی کلیکی و پایش نرخ تبدیل روزانه',
        description: 'اجرای تبلیغات سرچ و ریتارگتینگ، اندازه‌گیری CPA و CAC و بهینه‌سازی مداوم.',
        relativeDueDays: 21,
        estimatedHours: 15,
        priority: 'high',
        status: 'todo',
        tags: ['تبلیغات', 'آنالیتیکس', 'رشد'],
        subtasks: ['فعال‌سازی گوگل ادز', 'تنظیم ایونت‌های آنالیتیکس', 'گزارش روزانه جذب کاربر'],
        suggestedRole: 'project_manager'
      }
    ]
  },
  {
    id: 'tpl-design-system',
    name: 'توسعه سیستم دیزاین و استانداردهای UI/UX (Design System Sprint)',
    description: 'طراحی یکپارچه کامپوننت‌های پایه، تایپوگرافی، پالت‌های رنگی، حالت‌های تعاملی و پیاده‌سازی کتابخانه کامپوننت در کد.',
    category: 'طراحی محصول',
    icon: 'FolderKanban',
    color: '#0ea5e9',
    defaultPriority: 'medium',
    estimatedDurationDays: 18,
    budget: '۱۲۰,۰۰۰,۰۰۰ تومان',
    stages: [
      { id: 'backlog', name: 'ممیزی و پژوهش', color: '#94a3b8' },
      { id: 'todo', name: 'طراحی توکن‌های پایه', color: '#0ea5e9' },
      { id: 'in_progress', name: 'ساخت کامپوننت‌ها', color: '#6366f1' },
      { id: 'review', name: 'مستندسازی و استوری‌بوک', color: '#8b5cf6' },
      { id: 'completed', name: 'انتشار بسته NPM', color: '#10b981' }
    ],
    tags: ['دیزاین سیستم', 'UI/UX', 'Figma', 'کامپوننت'],
    isBuiltIn: true,
    createdAt: '2026-08-10',
    tasks: [
      {
        id: 'tt-21',
        title: 'ممیزی بصری رابط کاربری موجود و دسته‌بندی الگوهای تکراری',
        description: 'بررسی تمام دکمه‌ها، فرم‌ها، تایپوگرافی و فاصله‌گذاری‌ها برای یافتن ناهمگونی‌ها.',
        relativeDueDays: 3,
        estimatedHours: 10,
        priority: 'medium',
        status: 'todo',
        tags: ['ممیزی', 'UI'],
        subtasks: ['استخراج اسکرین‌شات‌ها', 'جدول مقایسه رنگ‌ها', 'تعیین مقیاس‌های استاندارد'],
        suggestedRole: 'team_member'
      },
      {
        id: 'tt-22',
        title: 'تعریف توکن‌های طراحی (رنگ، سایه، گوشه‌ها، تایپوگرافی)',
        description: 'ساخت متغیرهای فیگما و همگام‌سازی با فایل تنظیمات Tailwind CSS.',
        relativeDueDays: 7,
        estimatedHours: 16,
        priority: 'high',
        status: 'todo',
        tags: ['توکن', 'Figma', 'Tailwind'],
        subtasks: ['پالت رنگی حالت روز و شب', 'مقیاس‌های تایپوگرافی فارسی', 'متغیرهای اسپیسینگ'],
        suggestedRole: 'team_member'
      },
      {
        id: 'tt-23',
        title: 'کدنویسی کامپوننت‌های پایه (دکمه، اینپوت، مودال، کارت، بج)',
        description: 'توسعه کامپوننت‌های دسترسی‌پذیر (Accessible) با پشتیبانی کامل از RTL.',
        relativeDueDays: 14,
        estimatedHours: 28,
        priority: 'urgent',
        status: 'todo',
        tags: ['React', 'TypeScript', 'RTL'],
        subtasks: ['پشتیبانی از فوکوس کیبورد', 'حالت‌های لودینگ و غیرفعال', 'تست در مرورگرهای مختلف'],
        suggestedRole: 'team_member'
      },
      {
        id: 'tt-24',
        title: 'راه‌اندازی محیط نمایش تعاملی و مستندات آنلاین',
        description: 'ایجاد مستندات برای تیم فنی و طراحان همراه با کدهای آماده کپی.',
        relativeDueDays: 18,
        estimatedHours: 12,
        priority: 'medium',
        status: 'todo',
        tags: ['مستندات', 'Storybook'],
        subtasks: ['نگارش مثال‌های کاربردی', 'تعریف قوانین استفاده از المان‌ها', 'انتشار آنلاین'],
        suggestedRole: 'project_manager'
      }
    ]
  },
  {
    id: 'tpl-security-audit',
    name: 'ممیزی امنیت و تست نفوذ دوره‌ای (Security Audit & Hardening)',
    description: 'ارزیابی آسیب‌پذیری‌های وب و سرور، تست نفوذ لایه اپلیکیشن، بررسی کنترل دسترسی‌ها، امن‌سازی پایگاه داده و تدوین گزارش انطباق.',
    category: 'امنیت و انطباق',
    icon: 'CheckSquare',
    color: '#ef4444',
    defaultPriority: 'urgent',
    estimatedDurationDays: 10,
    budget: '۱۱۰,۰۰۰,۰۰۰ تومان',
    stages: [
      { id: 'backlog', name: 'ارزیابی اولیه دارایی‌ها', color: '#94a3b8' },
      { id: 'todo', name: 'اسکن خودکار آسیب‌پذیری', color: '#f59e0b' },
      { id: 'in_progress', name: 'تست نفوذ دستی', color: '#ef4444' },
      { id: 'review', name: 'اصلاح و اعمال پچ‌های امنیتی', color: '#8b5cf6' },
      { id: 'completed', name: 'صدور گواهی و گزارش نهایی', color: '#10b981' }
    ],
    tags: ['امنیت', 'تست نفوذ', 'ممیزی', 'OWASP'],
    isBuiltIn: true,
    createdAt: '2026-08-12',
    tasks: [
      {
        id: 'tt-31',
        title: 'اسکن آسیب‌پذیری وابستگی‌های نرم‌افزاری (SCA & SAST)',
        description: 'بررسی کتابخانه‌های منبع‌باز پروژه و کشف آسیب‌پذیری‌های CVE ثبت شده.',
        relativeDueDays: 2,
        estimatedHours: 8,
        priority: 'high',
        status: 'todo',
        tags: ['اسکن', 'کد'],
        subtasks: ['اجرای npm audit و Snyk', 'بروزرسانی پکیج‌های منسوخ', 'گزارش ریسک'],
        suggestedRole: 'team_member'
      },
      {
        id: 'tt-32',
        title: 'تست نفوذ وب‌سرویس‌ها طبق چک‌لیست OWASP Top 10',
        description: 'بررسی امکان حملات تزریق SQL، جعل هویت، نشت داده و تداخل نشست‌ها.',
        relativeDueDays: 6,
        estimatedHours: 20,
        priority: 'urgent',
        status: 'todo',
        tags: ['OWASP', 'API', 'تست نفوذ'],
        subtasks: ['آزمون احراز هویت و توکن‌ها', 'تست اعتبارسنجی ورودی‌ها', 'بررسی محدودیت نرخ درخواست'],
        suggestedRole: 'team_member'
      },
      {
        id: 'tt-33',
        title: 'بررسی و امن‌سازی سطوح دسترسی کاربران و رول‌های سیستمی',
        description: 'حذف دسترسی‌های اضافه و فعال‌سازی لاگ کامل فعالیت‌های حساس مدیران.',
        relativeDueDays: 8,
        estimatedHours: 10,
        priority: 'high',
        status: 'todo',
        tags: ['RBAC', 'مجوزها'],
        subtasks: ['بررسی جدول دسترسی‌ها', 'تست ترفیع رتبه غیرمجاز', 'پیکربندی آلارم امنیتی'],
        suggestedRole: 'admin'
      },
      {
        id: 'tt-34',
        title: 'تدوین گزارش رسمی ممیزی امنیت و نقشه راه برطرف‌سازی موارد باقی‌مانده',
        description: 'ارائه گزارش جامع به هیئت مدیره همراه با رتبه‌بندی ریسک‌ها.',
        relativeDueDays: 10,
        estimatedHours: 8,
        priority: 'medium',
        status: 'todo',
        tags: ['گزارش', 'مدیریت'],
        subtasks: ['خلاصه مدیریتی', 'جزئیات فنی پچ‌ها', 'جلسه جمع‌بندی با تیم فنی'],
        suggestedRole: 'project_manager'
      }
    ]
  }
];

export const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act-feed-1',
    userId: 'usr-3', // علی رضوانی
    action: 'تسک برد کانبان تعاملی را به وضعیت "در حال انجام" تغییر داد',
    type: 'status_change',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    details: 'انیمیشن‌های درگ و دراپ با موفقیت تست شدند.',
    taskId: 'tsk-102',
    taskTitle: 'پیاده‌سازی برد کانبان تعاملی با کشیدن و رها کردن',
    projectId: 'proj-1',
    projectName: 'بازطراحی پرتال ابری کلود‌سینک ۲.۰'
  },
  {
    id: 'act-feed-2',
    userId: 'usr-2', // مهرداد وصالی
    action: 'دیدگاه جدیدی روی تسک احراز هویت ثبت کرد',
    type: 'comment',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    details: 'لطفاً اطمینان حاصل کنید که توکن‌های حالت شب و روز به طور هماهنگ خروجی گرفته شوند.',
    taskId: 'tsk-101',
    taskTitle: 'طراحی رابط کاربری ورود و مراحل آنبوردینگ در فیگما',
    projectId: 'proj-1',
    projectName: 'بازطراحی پرتال ابری کلود‌سینک ۲.۰'
  },
  {
    id: 'act-feed-3',
    userId: 'usr-4', // داوود کیانی
    action: 'یک مانع بحرانی روی تسک اتصال وب‌سوکت ثبت کرد',
    type: 'blocker',
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
    details: 'در انتظار تمدید گواهینامه امنیتی سرور استیجینگ توسط تیم دوآپس',
    taskId: 'tsk-103',
    taskTitle: 'رفع خطای انقضای توکن JWT در اتصال وب‌سوکت',
    projectId: 'proj-2',
    projectName: 'گیت‌وی امنیتی API و احراز هویت سازمانی'
  },
  {
    id: 'act-feed-4',
    userId: 'usr-5', // النا رستمی
    action: 'فایل ضمیمه معماری طراحی را آپلود کرد',
    type: 'attachment',
    timestamp: new Date(Date.now() - 180 * 60000).toISOString(),
    details: 'فایل Auth_Flow_Architecture_v2.fig با حجم ۱۴.۲ مگابایت افزوده شد.',
    taskId: 'tsk-101',
    taskTitle: 'طراحی رابط کاربری ورود و مراحل آنبوردینگ در فیگما',
    projectId: 'proj-1',
    projectName: 'بازطراحی پرتال ابری کلود‌سینک ۲.۰'
  },
  {
    id: 'act-feed-5',
    userId: 'usr-1', // سارا چنگیزی
    action: 'الگوی جدید "اسپرینت توسعه چابک نرم‌افزار" را ذخیره کرد',
    type: 'template_created',
    timestamp: new Date(Date.now() - 360 * 60000).toISOString(),
    details: 'الگوی ۵ مرحله‌ای شامل ۵ تسک استاندارد فنی با مهلت ۱۴ روزه',
    projectId: 'proj-1',
    projectName: 'بازطراحی پرتال ابری کلود‌سینک ۲.۰'
  },
  {
    id: 'act-feed-6',
    userId: 'usr-2', // مهرداد وصالی
    action: 'تسک توزیع بار کاری را برای بررسی ارسال کرد',
    type: 'status_change',
    timestamp: new Date(Date.now() - 600 * 60000).toISOString(),
    details: 'پول‌ریکوئست شماره ۴۸ برای بازبینی نهایی فرستاده شد.',
    taskId: 'tsk-105',
    taskTitle: 'توسعه رادار توزیع بار کاری و ظرفیت اعضای تیم',
    projectId: 'proj-4',
    projectName: 'سامانه تحلیل داده و پیش‌بینی بار کاری تیم'
  },
  {
    id: 'act-feed-7',
    userId: 'usr-4', // داوود کیانی
    action: 'تسک بهینه‌سازی ایندکس‌های دیتابیس را تکمیل کرد',
    type: 'status_change',
    timestamp: new Date(Date.now() - 1440 * 60000).toISOString(),
    details: 'زمان پاسخ کوئری به ۴.۲ میلی‌ثانیه کاهش یافت.',
    taskId: 'tsk-106',
    taskTitle: 'بهینه‌سازی ایندکس‌های دیتابیس برای کوئری‌های زیر ۱۰ میلی‌ثانیه',
    projectId: 'proj-2',
    projectName: 'گیت‌وی امنیتی API و احراز هویت سازمانی'
  }
];
