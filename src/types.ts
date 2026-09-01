export type Role = 'admin' | 'project_manager' | 'team_member' | string;

export type UserStatus = 'active' | 'inactive' | 'blocked' | 'pending';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type ProjectStatus = 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';

export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'review' | 'completed';

export interface User {
  id: string;
  name: string;
  username?: string;
  email: string;
  avatar: string;
  role: Role;
  roleId?: string;
  status: UserStatus;
  title: string;
  department: string;
  activeProjectsCount: number;
  completedTasksCount: number;
  workloadPercentage: number;
  skills: string[];
  phone?: string;
  location?: string;
  lastLogin?: string;
  createdAt: string;
  twoFactorEnabled?: boolean;
  temporaryPassword?: string;
  password?: string;
  bio?: string;
}

export interface PermissionItem {
  id: string;
  label: string;
  description: string;
  category: 'users' | 'projects' | 'teams' | 'tasks' | 'reports' | 'settings';
}

export interface SystemRole {
  id: string;
  key: string;
  name: string;
  description: string;
  color: string;
  isSystem: boolean;
  userCount?: number;
  permissions: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskComment {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
  attachments?: TaskAttachment[];
}

export interface TaskAttachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
  uploadDate: string;
  uploadedBy: string;
}

export type ActivityType = 
  | 'task_created' 
  | 'status_change' 
  | 'comment' 
  | 'attachment' 
  | 'project_created' 
  | 'project_updated' 
  | 'template_created' 
  | 'template_applied' 
  | 'blocker' 
  | 'team_update' 
  | 'member_assigned'
  | 'user_created'
  | 'user_updated'
  | 'user_status_changed'
  | 'role_created'
  | 'role_updated'
  | 'auth_login'
  | 'auth_2fa_verified';

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  type?: ActivityType;
  timestamp: string;
  details?: string;
  taskId?: string;
  taskTitle?: string;
  projectId?: string;
  projectName?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assigneeId: string;
  priority: Priority;
  status: TaskStatus;
  startDate: string;
  deadline: string;
  estimatedHours: number;
  loggedHours?: number;
  tags: string[];
  subtasks: Subtask[];
  comments: TaskComment[];
  attachments: TaskAttachment[];
  activityHistory: ActivityLog[];
  dependencies: string[]; // Task IDs this task depends on
  isBlocked?: boolean;
  blockedReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectStage {
  id: TaskStatus;
  name: string;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  key: string; // e.g. "SYNC", "CORE", "MOB"
  description: string;
  projectManagerId: string;
  memberIds: string[];
  startDate: string;
  deadline: string;
  status: ProjectStatus;
  progress: number; // 0 to 100
  priority: Priority;
  tags: string[];
  color: string;
  budget?: string;
  category: string;
  createdAt: string;
  templateId?: string;
}

export interface TemplateTask {
  id: string;
  title: string;
  description: string;
  relativeDueDays: number; // offset days from project start date
  estimatedHours: number;
  priority: Priority;
  status: TaskStatus;
  tags: string[];
  subtasks: string[];
  suggestedRole?: Role;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  defaultPriority: Priority;
  estimatedDurationDays: number;
  budget?: string;
  stages: { id: TaskStatus; name: string; color: string }[];
  tasks: TemplateTask[];
  tags: string[];
  isBuiltIn?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  leaderId: string;
  memberIds: string[];
  projectIds: string[];
  department: string;
  color: string;
}

export type NotificationType = 'assignment' | 'deadline' | 'status_change' | 'comment' | 'overdue' | 'mention' | 'system';

export function formatBytes(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  timestamp: string;
  linkTaskId?: string;
  linkProjectId?: string;
}

export type ActiveView = 
  | 'dashboard'
  | 'my-tasks'
  | 'projects'
  | 'project-detail'
  | 'assets'
  | 'templates'
  | 'teams'
  | 'calendar'
  | 'activity'
  | 'reports'
  | 'analytics'
  | 'notifications'
  | 'user-management'
  | 'roles-management'
  | 'user-profile'
  | 'settings';

// ==========================================
// Digital Asset Management (DAM) Types
// ==========================================

export type AssetCategory = 'image' | 'video' | 'audio' | 'document' | 'archive' | 'other';

export type AssetPermissionLevel = 'private' | 'team' | 'project' | 'organization';

export type AssetAccessRight = 'view' | 'edit' | 'manage';

export type DamSubView = 
  | 'all' 
  | 'recent' 
  | 'my-folders' 
  | 'shared' 
  | 'project-files' 
  | 'favorites' 
  | 'trash';

export interface AssetVersion {
  id: string;
  versionNumber: number;
  fileName: string;
  size: number; // in bytes
  sizeFormatted: string;
  url: string;
  thumbnailUrl?: string;
  uploadedBy: string; // userId
  uploadedAt: string;
  changelog: string;
  downloadCount?: number;
}

export interface AssetComment {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface AssetActivity {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  details?: string;
}

export interface AssetFolder {
  id: string;
  name: string;
  parentId: string | null;
  color: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  projectId?: string;
  teamId?: string;
  isFavorite?: boolean;
  itemCount?: number;
  sharedWith?: {
    targetId: string;
    targetType: 'user' | 'team';
    targetName?: string;
    access: AssetAccessRight;
  }[];
}

export interface DigitalAsset {
  id: string;
  title: string;
  fileName: string;
  extension: string; // e.g. 'png', 'pdf', 'mp4', 'xlsx', 'zip', 'mp3', 'svg'
  category: AssetCategory;
  mimeType: string;
  size: number; // in bytes
  sizeFormatted: string;
  url: string;
  thumbnailUrl?: string;
  folderId: string | null;
  projectId?: string;
  taskId?: string;
  tags: string[];
  createdBy: string; // userId
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  isTrash: boolean;
  deletedAt?: string;
  permissionLevel: AssetPermissionLevel;
  sharedWith: {
    targetId: string;
    targetType: 'user' | 'team';
    targetName?: string;
    access: AssetAccessRight;
  }[];
  currentVersion: number;
  versions: AssetVersion[];
  comments: AssetComment[];
  activities: AssetActivity[];
  dimensions?: string; // e.g. "1920x1080"
  duration?: string; // e.g. "04:12"
  downloadCount: number;
  description?: string;
}

