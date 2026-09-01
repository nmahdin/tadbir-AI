/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopNavbar } from './components/layout/TopNavbar';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { AuthModal } from './components/auth/AuthModal';

// Views
import { DashboardView } from './components/dashboard/DashboardView';
import { ProjectsView } from './components/projects/ProjectsView';
import { ProjectDetailView } from './components/projects/ProjectDetailView';
import { MyTasksView } from './components/tasks/MyTasksView';
import { TeamsView } from './components/teams/TeamsView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { ActivityView } from './components/activity/ActivityView';
import { SettingsView } from './components/settings/SettingsView';
import { ProjectCalendarView } from './components/projects/ProjectCalendarView';
import { UserManagementView } from './components/users/UserManagementView';
import { RoleManagementView } from './components/roles/RoleManagementView';
import { UserProfileView } from './components/users/UserProfileView';
import { DamMainView } from './components/dam/DamMainView';

// Modals & Drawers
import { TaskDetailDrawer } from './components/tasks/TaskDetailDrawer';
import { CreateTaskModal } from './components/tasks/CreateTaskModal';
import { CreateProjectModal } from './components/projects/CreateProjectModal';
import { CreateTeamModal } from './components/teams/CreateTeamModal';
import { MemberDetailModal } from './components/teams/MemberDetailModal';
import { TemplatesModal } from './components/templates/TemplatesModal';
import { TemplateEditorModal } from './components/templates/TemplateEditorModal';
import { UserModal } from './components/users/UserModal';
import { RoleModal } from './components/roles/RoleModal';

const MainLayout: React.FC = () => {
  const { activeView } = useApp();

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'projects':
        return <ProjectsView />;
      case 'project-detail':
        return <ProjectDetailView />;
      case 'assets':
        return (
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <DamMainView />
          </div>
        );
      case 'my-tasks':
        return <MyTasksView />;
      case 'teams':
        return <TeamsView />;
      case 'calendar':
        return <ProjectCalendarView />;
      case 'analytics':
      case 'reports':
        return <AnalyticsView />;
      case 'activity':
        return <ActivityView />;
      case 'settings':
        return <SettingsView />;
      case 'user-management':
        return <UserManagementView />;
      case 'roles-management':
        return <RoleManagementView />;
      case 'user-profile':
        return <UserProfileView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 font-sans antialiased text-right" dir="rtl">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar />

        {/* Scrollable View Canvas */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden focus:outline-hidden">
          {renderActiveView()}
        </main>
      </div>

      {/* Modals & Overlays */}
      <GlobalSearchModal />
      <AuthModal />
      <TaskDetailDrawer />
      <CreateTaskModal />
      <CreateProjectModal />
      <CreateTeamModal />
      <MemberDetailModal />
      <TemplatesModal />
      <TemplateEditorModal />
      <UserModal />
      <RoleModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
