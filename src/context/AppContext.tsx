import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  User, Project, Task, Team, AppNotification, ActiveView, TaskStatus, Role, Priority, ProjectTemplate, ActivityLog, ActivityType, SystemRole, UserStatus,
  DigitalAsset, AssetFolder, DamSubView, AssetCategory, AssetPermissionLevel, AssetAccessRight, AssetVersion, AssetActivity, AssetComment,
  Conversation, ChatMessage, ChatType, ChatFilterCategory, TaskReference, ProjectReference, ChatAttachment, ConversationRole, ConversationMember,
  Idea, IdeaVote, IdeaVoteOption, IdeaComment, IdeaActivity, ThinkTankMeeting, MeetingActionItem, ThinkTankMeetingAgendaItem,
  SecretariatLetter, LetterReferral, LetterWorkflowStep, LetterType, LetterClassification, LetterUrgency, LetterStatus, ReferralActionType, SecretariatResolution, ResolutionStatus, ArchiveDossier, ArchiveCategory
} from '../types';
import { 
  INITIAL_USERS, INITIAL_PROJECTS, INITIAL_TASKS, INITIAL_TEAMS, INITIAL_NOTIFICATIONS, INITIAL_TEMPLATES, INITIAL_ACTIVITIES, INITIAL_ROLES, SYSTEM_PERMISSIONS 
} from '../data/initialData';
import { INITIAL_ASSETS, INITIAL_FOLDERS } from '../data/initialAssets';
import { INITIAL_CONVERSATIONS, INITIAL_MESSAGES } from '../data/initialChatData';
import { INITIAL_IDEAS, INITIAL_THINK_TANK_MEETINGS } from '../data/initialThinkTankData';
import { INITIAL_LETTERS, INITIAL_RESOLUTIONS, INITIAL_ARCHIVE_DOSSIERS } from '../data/initialSecretariatData';

interface AppContextType {
  currentUser: User;
  users: User[];
  projects: Project[];
  tasks: Task[];
  teams: Team[];
  roles: SystemRole[];
  notifications: AppNotification[];
  templates: ProjectTemplate[];
  activities: ActivityLog[];
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  selectedTaskId: string | null;
  setSelectedTaskId: (id: string | null) => void;
  selectedMemberId: string | null;
  setSelectedMemberId: (id: string | null) => void;
  selectedTemplateId: string | null;
  setSelectedTemplateId: (id: string | null) => void;
  selectedUserId: string | null;
  setSelectedUserId: (id: string | null) => void;
  userProfileId: string | null;
  setUserProfileId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCreateTaskOpen: boolean;
  setIsCreateTaskOpen: (open: boolean) => void;
  isCreateProjectOpen: boolean;
  setIsCreateProjectOpen: (open: boolean) => void;
  isEditProjectOpen: boolean;
  setIsEditProjectOpen: (open: boolean) => void;
  projectToEdit: Project | null;
  setProjectToEdit: (proj: Project | null) => void;
  openEditProject: (proj: Project) => void;
  isCreateTeamOpen: boolean;
  setIsCreateTeamOpen: (open: boolean) => void;
  isCreateUserOpen: boolean;
  setIsCreateUserOpen: (open: boolean) => void;
  isEditUserOpen: boolean;
  setIsEditUserOpen: (open: boolean) => void;
  userToEdit: User | null;
  setUserToEdit: (user: User | null) => void;
  isCreateRoleOpen: boolean;
  setIsCreateRoleOpen: (open: boolean) => void;
  isTemplatesModalOpen: boolean;
  setIsTemplatesModalOpen: (open: boolean) => void;
  isTemplateEditorOpen: boolean;
  setIsTemplateEditorOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isLoggedIn: boolean;
  switchUser: (userId: string) => void;
  switchRole: (role: Role) => void;
  loginAs: (user: User) => void;
  logout: () => void;
  
  // User Management
  addUser: (userData: Partial<User> & { name: string; email: string }) => User;
  updateUser: (userId: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  changeUserStatus: (userId: string, status: UserStatus) => void;
  bulkChangeUserStatus: (userIds: string[], status: UserStatus) => void;
  bulkDeleteUsers: (userIds: string[]) => void;

  // Role Management
  addRole: (roleData: Partial<SystemRole> & { name: string; key: string }) => SystemRole;
  updateRole: (roleId: string, updates: Partial<SystemRole>) => void;
  deleteRole: (roleId: string) => void;
  toggleRolePermission: (roleId: string, permissionId: string) => void;
  hasPermission: (permissionId: string) => boolean;

  // Auth Operations
  registerUser: (data: { name: string; username: string; email: string; phone?: string; password?: string; department?: string; title?: string }) => { success: boolean; user?: User; message?: string };
  loginWithCredentials: (usernameOrEmail: string, password?: string, rememberMe?: boolean) => { success: boolean; user?: User; requires2FA?: boolean; message?: string };
  verify2FA: (code: string) => { success: boolean; message?: string };
  resetPasswordRequest: (email: string) => { success: boolean; message: string };

  // Task Operations
  addTask: (taskData: Partial<Task> & { title: string; projectId: string }) => Task;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  moveTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  addSubtask: (taskId: string, title: string) => void;
  deleteSubtask: (taskId: string, subtaskId: string) => void;
  addComment: (taskId: string, text: string) => void;
  addAttachment: (taskId: string, file: { name: string; size: string; type: string; url?: string }) => void;
  
  // Project Operations
  addProject: (projectData: Partial<Project> & { name: string }) => Project;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;

  // Template Operations
  addTemplate: (templateData: Partial<ProjectTemplate> & { name: string }) => ProjectTemplate;
  updateTemplate: (templateId: string, updates: Partial<ProjectTemplate>) => void;
  deleteTemplate: (templateId: string) => void;
  applyTemplate: (templateId: string, customOptions?: { projectName?: string; projectKey?: string; projectManagerId?: string; startDate?: string }) => Project;
  saveProjectAsTemplate: (projectId: string, templateName: string, description?: string) => ProjectTemplate;

  // Team Operations
  addTeam: (teamData: Partial<Team> & { name: string; department: string }) => Team;
  updateTeam: (teamId: string, updates: Partial<Team>) => void;
  deleteTeam: (teamId: string) => void;
  inviteMember: (memberData: Omit<User, 'id' | 'activeProjectsCount' | 'completedTasksCount' | 'workloadPercentage'>) => User;

  // Notification Operations
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotification: (id: string) => void;
  sendNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  simulateNotificationEvent: (type: 'assignment' | 'overdue' | 'comment' | 'deadline') => void;

  // Digital Asset Management (DAM) State
  assets: DigitalAsset[];
  folders: AssetFolder[];
  damSubView: DamSubView;
  setDamSubView: (view: DamSubView) => void;
  currentFolderId: string | null;
  setCurrentFolderId: (id: string | null) => void;
  previewAssetId: string | null;
  setPreviewAssetId: (id: string | null) => void;
  detailAssetId: string | null;
  setDetailAssetId: (id: string | null) => void;
  versionModalAssetId: string | null;
  setVersionModalAssetId: (id: string | null) => void;
  shareTargetAssetId: string | null;
  setShareTargetAssetId: (id: string | null) => void;
  shareTargetFolderId: string | null;
  setShareTargetFolderId: (id: string | null) => void;
  isUploadAssetOpen: boolean;
  setIsUploadAssetOpen: (open: boolean) => void;
  isEditAssetOpen: boolean;
  setIsEditAssetOpen: (open: boolean) => void;
  assetToEdit: DigitalAsset | null;
  setAssetToEdit: (asset: DigitalAsset | null) => void;
  openEditAsset: (asset: DigitalAsset) => void;
  isCreateFolderOpen: boolean;
  setIsCreateFolderOpen: (open: boolean) => void;
  isEditFolderOpen: boolean;
  setIsEditFolderOpen: (open: boolean) => void;
  folderToEdit: AssetFolder | null;
  setFolderToEdit: (folder: AssetFolder | null) => void;
  openEditFolder: (folder: AssetFolder) => void;

  // Digital Asset Management (DAM) Operations
  uploadAsset: (assetData: Partial<DigitalAsset> & { title: string; fileName: string; size: number }) => DigitalAsset;
  uploadNewVersion: (assetId: string, versionData: { fileName: string; size: number; url?: string; changelog: string }) => void;
  deleteAssetVersion: (assetId: string, versionId: string) => void;
  revertToAssetVersion: (assetId: string, versionId: string) => void;
  updateAsset: (assetId: string, updates: Partial<DigitalAsset>) => void;
  deleteAsset: (assetId: string, permanent?: boolean) => void;
  restoreAsset: (assetId: string) => void;
  emptyTrash: () => void;
  toggleAssetFavorite: (assetId: string) => void;
  addAssetComment: (assetId: string, text: string) => void;
  shareAsset: (
    assetId: string, 
    shareData: { targetId: string; targetType: 'user' | 'team'; access: AssetAccessRight; targetName?: string }, 
    permissionLevel?: AssetPermissionLevel
  ) => void;
  batchDeleteAssets: (assetIds: string[], permanent?: boolean) => void;
  batchRestoreAssets: (assetIds: string[]) => void;
  batchMoveAssets: (assetIds: string[], targetFolderId: string | null) => void;
  downloadAsset: (asset: DigitalAsset) => void;

  // Folder Operations
  createFolder: (folderData: Partial<AssetFolder> & { name: string }) => AssetFolder;
  updateFolder: (folderId: string, updates: Partial<AssetFolder>) => void;
  deleteFolder: (folderId: string) => void;
  toggleFolderFavorite: (folderId: string) => void;

  // Messaging & Chat System
  conversations: Conversation[];
  messages: ChatMessage[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  chatFilter: ChatFilterCategory;
  setChatFilter: (filter: ChatFilterCategory) => void;
  chatSearchQuery: string;
  setChatSearchQuery: (query: string) => void;
  sendMessage: (data: {
    conversationId: string;
    text: string;
    replyToMessageId?: string;
    attachments?: ChatAttachment[];
    taskRef?: TaskReference;
    projectRef?: ProjectReference;
  }) => ChatMessage;
  editMessage: (messageId: string, newText: string) => void;
  deleteMessage: (messageId: string) => void;
  togglePinMessage: (messageId: string) => void;
  toggleStarMessage: (messageId: string) => void;
  toggleMessageReaction: (messageId: string, emoji: string) => void;
  createConversation: (data: Partial<Conversation> & { name: string; type: ChatType; memberIds: string[] }) => Conversation;
  updateConversation: (convId: string, updates: Partial<Conversation>) => void;
  addConversationMembers: (convId: string, memberIds: string[]) => void;
  removeConversationMember: (convId: string, userId: string) => void;
  updateMemberRole: (convId: string, userId: string, role: ConversationRole) => void;
  toggleMuteConversation: (convId: string) => void;
  startDirectChatWithUser: (targetUserId: string) => string;
  openProjectChannel: (projectId: string) => string;

  // Think Tank (اتاق فکر)
  ideas: Idea[];
  thinkTankMeetings: ThinkTankMeeting[];
  selectedIdeaId: string | null;
  setSelectedIdeaId: (id: string | null) => void;
  selectedMeetingId: string | null;
  setSelectedMeetingId: (id: string | null) => void;
  addIdea: (ideaData: Partial<Idea> & { title: string; problemSolved: string; proposedSolution: string }) => Idea;
  updateIdea: (ideaId: string, updates: Partial<Idea>) => void;
  deleteIdea: (ideaId: string) => void;
  voteIdea: (ideaId: string, option: IdeaVoteOption, comment?: string) => void;
  votePollOption: (ideaId: string, optionId: string) => void;
  addIdeaComment: (ideaId: string, text: string, replyToId?: string, assetIds?: string[]) => void;
  toggleIdeaCommentReaction: (ideaId: string, commentId: string, emoji: string) => void;
  createIdeaPoll: (ideaId: string, question: string, options: string[]) => void;
  convertIdeaToProject: (ideaId: string, customData?: { name?: string; key?: string; description?: string }) => Project;
  convertIdeaToTask: (ideaId: string, projectId: string, title?: string) => Task;
  addThinkTankMeeting: (meetingData: Partial<ThinkTankMeeting> & { title: string; date: string; time: string }) => ThinkTankMeeting;
  updateThinkTankMeeting: (meetingId: string, updates: Partial<ThinkTankMeeting>) => void;
  deleteThinkTankMeeting: (meetingId: string) => void;
  addMeetingMinutes: (meetingId: string, minutes: string, decisions: string[], actionItems?: MeetingActionItem[]) => void;
  convertActionItemToTask: (meetingId: string, actionItemId: string, projectId: string) => Task;

  // Secretariat (دبیرخانه)
  secretariatLetters: SecretariatLetter[];
  secretariatResolutions: SecretariatResolution[];
  archiveDossiers: ArchiveDossier[];
  selectedLetterId: string | null;
  setSelectedLetterId: (id: string | null) => void;
  selectedResolutionId: string | null;
  setSelectedResolutionId: (id: string | null) => void;
  addLetter: (letterData: Partial<SecretariatLetter> & { subject: string; content: string; type: LetterType; sender: string; recipient: string }) => SecretariatLetter;
  updateLetter: (letterId: string, updates: Partial<SecretariatLetter>) => void;
  deleteLetter: (letterId: string) => void;
  referLetter: (letterId: string, referralData: { toUserId?: string; toTeamId?: string; department?: string; actionType: ReferralActionType; instructions: string; deadline: string }) => void;
  updateReferralStatus: (letterId: string, referralId: string, status: 'pending' | 'in_progress' | 'completed' | 'rejected', responseNotes?: string) => void;
  convertReferralToTask: (letterId: string, referralId: string, projectId: string) => Task;
  addLetterWorkflowStep: (letterId: string, step: { stageName: string; action: string; notes?: string }) => void;
  replyLetter: (originalLetterId: string, replyData: Partial<SecretariatLetter> & { subject: string; content: string }) => SecretariatLetter;
  archiveLetter: (letterId: string, dossierId: string, boxLocation?: string) => void;
  addResolution: (resData: Partial<SecretariatResolution> & { title: string; content: string; deadline: string; responsibleUserId: string }) => SecretariatResolution;
  updateResolution: (resId: string, updates: Partial<SecretariatResolution>) => void;
  deleteResolution: (resId: string) => void;
  convertResolutionToTask: (resolutionId: string, projectId: string) => Task;
  addArchiveDossier: (dossierData: Partial<ArchiveDossier> & { title: string; category: ArchiveCategory; location: string }) => ArchiveDossier;
  updateArchiveDossier: (dossierId: string, updates: Partial<ArchiveDossier>) => void;
  deleteArchiveDossier: (dossierId: string) => void;

  // Activity Feed Operations
  logActivity: (activity: Omit<ActivityLog, 'id' | 'timestamp'> & { timestamp?: string }) => void;
  simulateActivityEvent: (specificType?: ActivityType) => void;

  // Helper & Reset
  triggerCelebration: () => void;
  resetData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PREFIX = 'tadbir_persian_state_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial from localStorage if present
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}users`);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [roles, setRoles] = useState<SystemRole[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}roles`);
    return saved ? JSON.parse(saved) : INITIAL_ROLES;
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const savedId = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}current_user_id`);
    const found = INITIAL_USERS.find(u => u.id === savedId);
    return found || INITIAL_USERS[0]; // Sarah Changizi (Admin)
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}projects`);
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}tasks`);
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}teams`);
    return saved ? JSON.parse(saved) : INITIAL_TEAMS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [templates, setTemplates] = useState<ProjectTemplate[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}templates`);
    return saved ? JSON.parse(saved) : INITIAL_TEMPLATES;
  });

  const [activities, setActivities] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}activities`);
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  // DAM State
  const [folders, setFolders] = useState<AssetFolder[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}folders`);
    return saved ? JSON.parse(saved) : INITIAL_FOLDERS;
  });

  const [assets, setAssets] = useState<DigitalAsset[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}assets`);
    return saved ? JSON.parse(saved) : INITIAL_ASSETS;
  });

  const [damSubView, setDamSubView] = useState<DamSubView>('all');
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [previewAssetId, setPreviewAssetId] = useState<string | null>(null);
  const [detailAssetId, setDetailAssetId] = useState<string | null>(null);
  const [versionModalAssetId, setVersionModalAssetId] = useState<string | null>(null);
  const [shareTargetAssetId, setShareTargetAssetId] = useState<string | null>(null);
  const [shareTargetFolderId, setShareTargetFolderId] = useState<string | null>(null);
  const [isUploadAssetOpen, setIsUploadAssetOpen] = useState(false);
  const [isEditAssetOpen, setIsEditAssetOpen] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState<DigitalAsset | null>(null);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isEditFolderOpen, setIsEditFolderOpen] = useState(false);
  const [folderToEdit, setFolderToEdit] = useState<AssetFolder | null>(null);

  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userProfileId, setUserProfileId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [isTemplateEditorOpen, setIsTemplateEditorOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [pending2FAUser, setPending2FAUser] = useState<User | null>(null);

  // Messaging & Chat State
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}conversations`);
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}messages`);
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv-dm-1');
  const [chatFilter, setChatFilter] = useState<ChatFilterCategory>('all');
  const [chatSearchQuery, setChatSearchQuery] = useState<string>('');

  // Think Tank (اتاق فکر) State
  const [ideas, setIdeas] = useState<Idea[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}ideas`);
    return saved ? JSON.parse(saved) : INITIAL_IDEAS;
  });

  const [thinkTankMeetings, setThinkTankMeetings] = useState<ThinkTankMeeting[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}thinktank_meetings`);
    return saved ? JSON.parse(saved) : INITIAL_THINK_TANK_MEETINGS;
  });

  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);

  // Secretariat (دبیرخانه) State
  const [secretariatLetters, setSecretariatLetters] = useState<SecretariatLetter[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}secretariat_letters`);
    return saved ? JSON.parse(saved) : INITIAL_LETTERS;
  });

  const [secretariatResolutions, setSecretariatResolutions] = useState<SecretariatResolution[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}secretariat_resolutions`);
    return saved ? JSON.parse(saved) : INITIAL_RESOLUTIONS;
  });

  const [archiveDossiers, setArchiveDossiers] = useState<ArchiveDossier[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}archive_dossiers`);
    return saved ? JSON.parse(saved) : INITIAL_ARCHIVE_DOSSIERS;
  });

  const [selectedLetterId, setSelectedLetterId] = useState<string | null>(null);
  const [selectedResolutionId, setSelectedResolutionId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}conversations`, JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}messages`, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}ideas`, JSON.stringify(ideas));
  }, [ideas]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}thinktank_meetings`, JSON.stringify(thinkTankMeetings));
  }, [thinkTankMeetings]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}secretariat_letters`, JSON.stringify(secretariatLetters));
  }, [secretariatLetters]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}secretariat_resolutions`, JSON.stringify(secretariatResolutions));
  }, [secretariatResolutions]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}archive_dossiers`, JSON.stringify(archiveDossiers));
  }, [archiveDossiers]);

  const openEditProject = (proj: Project) => {
    setProjectToEdit(proj);
    setIsEditProjectOpen(true);
  };

  const openEditAsset = (asset: DigitalAsset) => {
    setAssetToEdit(asset);
    setIsEditAssetOpen(true);
  };

  const openEditFolder = (folder: AssetFolder) => {
    setFolderToEdit(folder);
    setIsEditFolderOpen(true);
  };

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}users`, JSON.stringify(users));
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}roles`, JSON.stringify(roles));
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}current_user_id`, currentUser.id);
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}projects`, JSON.stringify(projects));
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}tasks`, JSON.stringify(tasks));
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}teams`, JSON.stringify(teams));
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}notifications`, JSON.stringify(notifications));
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}templates`, JSON.stringify(templates));
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}activities`, JSON.stringify(activities));
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}folders`, JSON.stringify(folders));
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}assets`, JSON.stringify(assets));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [users, roles, currentUser, projects, tasks, teams, notifications, templates, activities, folders, assets]);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#6366f1', '#10b981', '#3b82f6', '#f59e0b', '#ec4899']
      });
    } catch {
      // Confetti fallback
    }
  };

  const resetData = () => {
    localStorage.clear();
    setUsers(INITIAL_USERS);
    setRoles(INITIAL_ROLES);
    setCurrentUser(INITIAL_USERS[0]);
    setProjects(INITIAL_PROJECTS);
    setTasks(INITIAL_TASKS);
    setTeams(INITIAL_TEAMS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setTemplates(INITIAL_TEMPLATES);
    setActivities(INITIAL_ACTIVITIES);
    setFolders(INITIAL_FOLDERS);
    setAssets(INITIAL_ASSETS);
    setActiveView('dashboard');
    triggerCelebration();
  };

  const logActivity = (activity: Omit<ActivityLog, 'id' | 'timestamp'> & { timestamp?: string }) => {
    const newAct: ActivityLog = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId: activity.userId || currentUser.id,
      action: activity.action,
      type: activity.type || 'status_change',
      timestamp: activity.timestamp || new Date().toISOString(),
      details: activity.details,
      taskId: activity.taskId,
      taskTitle: activity.taskTitle,
      projectId: activity.projectId,
      projectName: activity.projectName
    };
    setActivities(prev => [newAct, ...prev.slice(0, 99)]); // Keep latest 100
  };

  const switchUser = (userId: string) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      logActivity({
        userId: found.id,
        action: `به عنوان "${found.name}" وارد حساب کاربری شد`,
        type: 'auth_login',
        details: `نقش: ${found.title}`
      });
    }
  };

  const switchRole = (role: Role) => {
    const found = users.find(u => u.role === role);
    if (found) {
      setCurrentUser(found);
    } else {
      setCurrentUser(prev => ({ ...prev, role }));
    }
  };

  const loginAs = (user: User) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    setActiveView('dashboard');
    triggerCelebration();
    logActivity({
      userId: user.id,
      action: `وارد سامانه تدبیر شد`,
      type: 'auth_login',
      details: `ورود موفق از پرتال احراز هویت`
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAuthModalOpen(true);
  };

  // User Management Methods
  const addUser = (userData: Partial<User> & { name: string; email: string }): User => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`;
    
    // Generate username from email or name
    const generatedUsername = userData.username || userData.email.split('@')[0].toLowerCase().replace(/[^a-z0-9_.]/g, '');
    
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      username: generatedUsername,
      email: userData.email,
      avatar: userData.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      role: userData.role || 'team_member',
      roleId: userData.roleId || (userData.role === 'admin' ? 'role-admin' : userData.role === 'project_manager' ? 'role-pm' : 'role-member'),
      status: userData.status || 'active',
      title: userData.title || 'عضو تخصصی تیم',
      department: userData.department || 'دپارتمان مهندسی و توسعه',
      activeProjectsCount: 0,
      completedTasksCount: 0,
      workloadPercentage: 0,
      skills: userData.skills && userData.skills.length > 0 ? userData.skills : ['همکاری تیمی', 'سامانه تدبیر'],
      phone: userData.phone || '۰۹۱۲۰۰۰۰۰۰۰',
      location: userData.location || 'تهران، ایران',
      lastLogin: 'هنوز وارد نشده',
      createdAt: formattedDate,
      twoFactorEnabled: userData.twoFactorEnabled || false,
      temporaryPassword: userData.temporaryPassword,
      bio: userData.bio || `کاربر جدید سامانه تدبیر در واحد ${userData.department || 'سازمانی'}`
    };

    setUsers(prev => [newUser, ...prev]);

    // Update role user count
    if (newUser.roleId) {
      setRoles(prev => prev.map(r => r.id === newUser.roleId ? { ...r, userCount: (r.userCount || 0) + 1 } : r));
    }

    logActivity({
      userId: currentUser.id,
      action: `کاربر جدید "${newUser.name}" را در سامانه تدبیر ایجاد کرد`,
      type: 'user_created',
      details: `نام کاربری: @${newUser.username} • ایمیل: ${newUser.email} • نقش: ${newUser.title}`
    });

    sendNotification({
      userId: currentUser.id,
      title: 'کاربر جدید اضافه شد',
      message: `حساب کاربری ${newUser.name} (@${newUser.username}) با موفقیت ایجاد شد.`,
      type: 'assignment'
    });

    return newUser;
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const updated = { ...u, ...updates };
        if (currentUser.id === userId) {
          setCurrentUser(updated);
        }
        return updated;
      }
      return u;
    }));

    const targetUser = users.find(u => u.id === userId);
    logActivity({
      userId: currentUser.id,
      action: `اطلاعات کاربر "${targetUser?.name || 'کاربر'}" را ویرایش کرد`,
      type: 'user_updated',
      details: updates.role ? `تغییر نقش به ${updates.role}` : updates.status ? `تغییر وضعیت به ${updates.status}` : 'به‌روزرسانی مشخصات سازمانی'
    });
  };

  const deleteUser = (userId: string) => {
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return;

    if (targetUser.id === currentUser.id) {
      alert('نمی‌توانید حساب کاربری فعال خود را حذف کنید.');
      return;
    }

    setUsers(prev => prev.filter(u => u.id !== userId));

    // Remove user from teams
    setTeams(prev => prev.map(t => ({
      ...t,
      memberIds: t.memberIds.filter(id => id !== userId)
    })));

    logActivity({
      userId: currentUser.id,
      action: `کاربر "${targetUser.name}" را از سامانه حذف کرد`,
      type: 'user_status_changed',
      details: `حذف حساب کاربری @${targetUser.username || targetUser.email}`
    });
  };

  const changeUserStatus = (userId: string, status: UserStatus) => {
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return;

    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    if (currentUser.id === userId) {
      setCurrentUser(prev => ({ ...prev, status }));
    }

    const statusLabels: Record<UserStatus, string> = {
      active: 'فعال',
      inactive: 'غیرفعال',
      blocked: 'مسدود',
      pending: 'در انتظار تأیید'
    };

    logActivity({
      userId: currentUser.id,
      action: `وضعیت حساب کاربر "${targetUser.name}" را به "${statusLabels[status]}" تغییر داد`,
      type: 'user_status_changed',
      details: `شناسه کاربر: ${userId}`
    });
  };

  const bulkChangeUserStatus = (userIds: string[], status: UserStatus) => {
    setUsers(prev => prev.map(u => userIds.includes(u.id) ? { ...u, status } : u));
    
    const statusLabels: Record<UserStatus, string> = {
      active: 'فعال‌سازی',
      inactive: 'غیرفعال‌سازی',
      blocked: 'مسدودسازی',
      pending: 'تعلیق'
    };

    logActivity({
      userId: currentUser.id,
      action: `عملیات گروهی: ${statusLabels[status]} برای ${userIds.length} کاربر انجام شد`,
      type: 'user_status_changed',
      details: `تعداد کاربران متأثر: ${userIds.length}`
    });
  };

  const bulkDeleteUsers = (userIds: string[]) => {
    // Prevent deleting current user
    const filteredIds = userIds.filter(id => id !== currentUser.id);
    setUsers(prev => prev.filter(u => !filteredIds.includes(u.id)));

    logActivity({
      userId: currentUser.id,
      action: `عملیات گروهی: حذف ${filteredIds.length} کاربر از سامانه تدبیر`,
      type: 'user_status_changed',
      details: `تعداد حذف شده: ${filteredIds.length}`
    });
  };

  // Role Management Methods
  const addRole = (roleData: Partial<SystemRole> & { name: string; key: string }): SystemRole => {
    const newRole: SystemRole = {
      id: `role-${Date.now()}`,
      key: roleData.key || `role_${Date.now()}`,
      name: roleData.name,
      description: roleData.description || 'نقش سفارشی سامانه تدبیر',
      color: roleData.color || '#6366f1',
      isSystem: false,
      userCount: 0,
      permissions: roleData.permissions || ['users.view', 'projects.view', 'tasks.view'],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setRoles(prev => [...prev, newRole]);

    logActivity({
      userId: currentUser.id,
      action: `نقش جدید "${newRole.name}" را در سیستم تعریف کرد`,
      type: 'role_created',
      details: `تعداد دسترسی‌های اولیه: ${newRole.permissions.length}`
    });

    return newRole;
  };

  const updateRole = (roleId: string, updates: Partial<SystemRole>) => {
    setRoles(prev => prev.map(r => r.id === roleId ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r));

    const targetRole = roles.find(r => r.id === roleId);
    logActivity({
      userId: currentUser.id,
      action: `تنظیمات و دسترسی‌های نقش "${targetRole?.name || 'نقش'}" را به‌روزرسانی کرد`,
      type: 'role_updated',
      details: updates.permissions ? `تعداد کل مجوزها: ${updates.permissions.length}` : 'ویرایش مشخصات نقش'
    });
  };

  const deleteRole = (roleId: string) => {
    const targetRole = roles.find(r => r.id === roleId);
    if (!targetRole) return;

    if (targetRole.isSystem) {
      alert('امکان حذف نقش‌های سیستمی و پیش‌فرض وجود ندارد.');
      return;
    }

    setRoles(prev => prev.filter(r => r.id !== roleId));

    logActivity({
      userId: currentUser.id,
      action: `نقش سفارشی "${targetRole.name}" را حذف کرد`,
      type: 'role_updated',
      details: `کلید نقش: ${targetRole.key}`
    });
  };

  const toggleRolePermission = (roleId: string, permissionId: string) => {
    setRoles(prev => prev.map(role => {
      if (role.id === roleId) {
        const has = role.permissions.includes(permissionId);
        const newPerms = has 
          ? role.permissions.filter(p => p !== permissionId)
          : [...role.permissions, permissionId];
        return { ...role, permissions: newPerms };
      }
      return role;
    }));
  };

  const hasPermission = (permissionId: string): boolean => {
    if (currentUser.role === 'admin') return true;
    const currentRoleObj = roles.find(r => r.key === currentUser.role || r.id === currentUser.roleId);
    if (!currentRoleObj) return true;
    return currentRoleObj.permissions.includes(permissionId);
  };

  // Auth Operations
  const registerUser = (data: { name: string; username: string; email: string; phone?: string; password?: string; department?: string; title?: string }) => {
    const existing = users.find(u => u.email.toLowerCase() === data.email.toLowerCase() || (data.username && u.username?.toLowerCase() === data.username.toLowerCase()));
    if (existing) {
      return { success: false, message: 'کاربری با این ایمیل یا نام کاربری از قبل در سامانه تدبیر ثبت شده است.' };
    }

    const created = addUser({
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      title: data.title || 'عضو جدید سازمان',
      department: data.department || 'عمومی',
      role: 'team_member',
      status: 'active',
      twoFactorEnabled: false,
      bio: 'عضو تازه ملحق‌شده به سامانه تدبیر.'
    });

    setCurrentUser(created);
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    triggerCelebration();

    return { success: true, user: created, message: 'ثبت‌نام با موفقیت انجام شد و وارد حساب کاربری شدید.' };
  };

  const loginWithCredentials = (usernameOrEmail: string, password?: string, rememberMe?: boolean) => {
    const query = usernameOrEmail.trim().toLowerCase();
    const found = users.find(u => 
      u.email.toLowerCase() === query || 
      (u.username && u.username.toLowerCase() === query)
    );

    if (!found) {
      return { success: false, message: 'کاربری با این مشخصات در سامانه تدبیر یافت نشد.' };
    }

    if (found.status === 'blocked') {
      return { success: false, message: 'این حساب کاربری به دلیل مسائل امنیتی یا انقضای قرارداد مسدود شده است. لطفاً با مدیر سیستم تماس بگیرید.' };
    }

    if (found.twoFactorEnabled) {
      setPending2FAUser(found);
      return { success: true, requires2FA: true, user: found, message: 'کد احراز هویت دومرحله‌ای به شماره تلفن شما ارسال شد.' };
    }

    // Direct Login
    loginAs(found);
    return { success: true, requires2FA: false, user: found, message: 'ورود با موفقیت انجام شد.' };
  };

  const verify2FA = (code: string) => {
    if (!pending2FAUser) {
      return { success: false, message: 'درخواست ورود منقضی شده است.' };
    }

    // Accepts 6-digit code or test code '123456'
    if (code.length === 6) {
      const user = pending2FAUser;
      setPending2FAUser(null);
      loginAs(user);
      logActivity({
        userId: user.id,
        action: 'کد احراز هویت دومرحله‌ای را با موفقیت تأیید کرد',
        type: 'auth_2fa_verified',
        details: 'ورود امن دو مرحله‌ای سامانه تدبیر'
      });
      return { success: true, message: 'تأیید دو مرحله‌ای با موفقیت انجام شد.' };
    }

    return { success: false, message: 'کد وارد شده صحیح نمی‌باشد (کد آزمایشی: 123456).' };
  };

  const resetPasswordRequest = (email: string) => {
    const found = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!found) {
      return { success: false, message: 'ایمیل وارد شده در سیستم ثبت نشده است.' };
    }

    logActivity({
      userId: found.id,
      action: `درخواست بازیابی گذرواژه برای حساب "${found.name}" ثبت شد`,
      type: 'auth_login',
      details: `ارسال لینک یک‌بارمصرف به ${email}`
    });

    return { success: true, message: `لینک و کد بازیابی رمز عبور به آدرس ${email} ارسال شد.` };
  };

  // Recalculate project progress automatically
  const recalculateProjectProgress = (projectId: string, currentTasks: Task[]) => {
    const projTasks = currentTasks.filter(t => t.projectId === projectId);
    if (projTasks.length === 0) return 0;
    const completed = projTasks.filter(t => t.status === 'completed').length;
    return Math.round((completed / projTasks.length) * 100);
  };

  // Task Operations
  const addTask = (taskData: Partial<Task> & { title: string; projectId: string }): Task => {
    const targetProject = projects.find(p => p.id === taskData.projectId);
    const newTask: Task = {
      id: `tsk-${Date.now()}`,
      title: taskData.title,
      description: taskData.description || '',
      projectId: taskData.projectId,
      assigneeId: taskData.assigneeId || currentUser.id,
      priority: taskData.priority || 'medium',
      status: taskData.status || 'todo',
      startDate: taskData.startDate || new Date().toISOString().split('T')[0],
      deadline: taskData.deadline || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      estimatedHours: taskData.estimatedHours || 8,
      loggedHours: 0,
      tags: taskData.tags && taskData.tags.length > 0 ? taskData.tags : ['تسک'],
      subtasks: taskData.subtasks || [],
      comments: [],
      attachments: [],
      activityHistory: [
        {
          id: `act-${Date.now()}`,
          userId: currentUser.id,
          action: `تسک "${taskData.title}" را ایجاد کرد`,
          type: 'task_created',
          timestamp: new Date().toISOString()
        }
      ],
      dependencies: taskData.dependencies || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTasks(prev => {
      const updated = [newTask, ...prev];
      // Update project progress
      const newProgress = recalculateProjectProgress(taskData.projectId, updated);
      setProjects(projList => 
        projList.map(p => p.id === taskData.projectId ? { ...p, progress: newProgress } : p)
      );
      return updated;
    });

    // Log Activity
    logActivity({
      userId: currentUser.id,
      action: `تسک جدید "${newTask.title}" را ایجاد کرد`,
      type: 'task_created',
      taskId: newTask.id,
      taskTitle: newTask.title,
      projectId: targetProject?.id,
      projectName: targetProject?.name,
      details: newTask.description || `با اولویت ${newTask.priority === 'urgent' ? 'فوری' : newTask.priority === 'high' ? 'بالا' : 'متوسط'}`
    });

    // Notify assignee if not creator
    if (newTask.assigneeId !== currentUser.id) {
      sendNotification({
        userId: newTask.assigneeId,
        title: 'تسک جدید واگذار شد',
        message: `${currentUser.name} شما را به عنوان مسئول تسک "${newTask.title}" انتخاب کرد.`,
        type: 'assignment',
        linkTaskId: newTask.id,
        linkProjectId: newTask.projectId
      });
    }

    return newTask;
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => {
      const updated = prev.map(task => {
        if (task.id === taskId) {
          const updatedTask = {
            ...task,
            ...updates,
            updatedAt: new Date().toISOString(),
            activityHistory: [
              {
                id: `act-${Date.now()}`,
                userId: currentUser.id,
                action: 'مشخصات تسک را ویرایش کرد',
                type: 'status_change',
                timestamp: new Date().toISOString()
              },
              ...task.activityHistory
            ]
          };
          return updatedTask;
        }
        return task;
      });

      const modifiedTask = updated.find(t => t.id === taskId);
      if (modifiedTask) {
        const newProgress = recalculateProjectProgress(modifiedTask.projectId, updated);
        setProjects(projList => 
          projList.map(p => p.id === modifiedTask.projectId ? { ...p, progress: newProgress } : p)
        );
      }
      return updated;
    });
  };

  const deleteTask = (taskId: string) => {
    const target = tasks.find(t => t.id === taskId);
    const targetProject = projects.find(p => p.id === target?.projectId);

    setTasks(prev => {
      const remaining = prev.filter(t => t.id !== taskId);
      if (target) {
        const newProgress = recalculateProjectProgress(target.projectId, remaining);
        setProjects(projList => 
          projList.map(p => p.id === target.projectId ? { ...p, progress: newProgress } : p)
        );
      }
      return remaining;
    });

    if (target) {
      logActivity({
        userId: currentUser.id,
        action: `تسک "${target.title}" را حذف کرد`,
        type: 'status_change',
        projectId: targetProject?.id,
        projectName: targetProject?.name
      });
    }

    if (selectedTaskId === taskId) {
      setSelectedTaskId(null);
    }
  };

  const moveTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    const statusLabels: Record<TaskStatus, string> = {
      backlog: 'در صف بررسی (Backlog)',
      todo: 'برای انجام (To Do)',
      in_progress: 'در حال انجام (In Progress)',
      review: 'در حال بازبینی (Review)',
      completed: 'تکمیل شده (Completed)'
    };

    setTasks(prev => {
      const updated = prev.map(task => {
        if (task.id === taskId) {
          if (task.status === newStatus) return task;
          const isDone = newStatus === 'completed';
          if (isDone) {
            triggerCelebration();
          }
          return {
            ...task,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            activityHistory: [
              {
                id: `act-${Date.now()}`,
                userId: currentUser.id,
                action: `وضعیت تسک را به "${statusLabels[newStatus]}" تغییر داد`,
                type: 'status_change',
                timestamp: new Date().toISOString()
              },
              ...task.activityHistory
            ]
          };
        }
        return task;
      });

      const target = updated.find(t => t.id === taskId);
      if (target) {
        const targetProj = projects.find(p => p.id === target.projectId);
        const newProgress = recalculateProjectProgress(target.projectId, updated);
        setProjects(projList => 
          projList.map(p => p.id === target.projectId ? { ...p, progress: newProgress } : p)
        );

        // Global activity logging
        logActivity({
          userId: currentUser.id,
          action: `وضعیت تسک "${target.title}" را به "${statusLabels[newStatus]}" تغییر داد`,
          type: 'status_change',
          taskId: target.id,
          taskTitle: target.title,
          projectId: targetProj?.id,
          projectName: targetProj?.name,
          details: newStatus === 'completed' ? 'تسک با موفقیت به اتمام رسید 🎉' : undefined
        });

        if (target.assigneeId !== currentUser.id) {
          sendNotification({
            userId: target.assigneeId,
            title: 'تغییر وضعیت تسک',
            message: `تسک "${target.title}" توسط ${currentUser.name} به "${statusLabels[newStatus]}" منتقل شد.`,
            type: 'status_change',
            linkTaskId: target.id,
            linkProjectId: target.projectId
          });
        }
      }
      return updated;
    });
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          const newSubtasks = task.subtasks.map(st => 
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          );
          return {
            ...task,
            subtasks: newSubtasks,
            updatedAt: new Date().toISOString()
          };
        }
        return task;
      })
    );
  };

  const addSubtask = (taskId: string, title: string) => {
    if (!title.trim()) return;
    setTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            subtasks: [
              ...task.subtasks,
              { id: `sub-${Date.now()}`, title: title.trim(), completed: false }
            ],
            updatedAt: new Date().toISOString()
          };
        }
        return task;
      })
    );
  };

  const deleteSubtask = (taskId: string, subtaskId: string) => {
    setTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            subtasks: task.subtasks.filter(st => st.id !== subtaskId),
            updatedAt: new Date().toISOString()
          };
        }
        return task;
      })
    );
  };

  const addComment = (taskId: string, text: string) => {
    if (!text.trim()) return;
    const targetTask = tasks.find(t => t.id === taskId);
    const targetProj = projects.find(p => p.id === targetTask?.projectId);

    setTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          const newComment = {
            id: `com-${Date.now()}`,
            userId: currentUser.id,
            text: text.trim(),
            timestamp: new Date().toISOString()
          };
          return {
            ...task,
            comments: [...task.comments, newComment],
            activityHistory: [
              {
                id: `act-${Date.now()}`,
                userId: currentUser.id,
                action: 'دیدگاه جدیدی اضافه کرد',
                type: 'comment',
                timestamp: new Date().toISOString()
              },
              ...task.activityHistory
            ],
            updatedAt: new Date().toISOString()
          };
        }
        return task;
      })
    );

    // Global activity log
    logActivity({
      userId: currentUser.id,
      action: `دیدگاه جدیدی روی تسک "${targetTask?.title || ''}" ثبت کرد`,
      type: 'comment',
      taskId,
      taskTitle: targetTask?.title,
      projectId: targetProj?.id,
      projectName: targetProj?.name,
      details: text.length > 80 ? `${text.substring(0, 80)}...` : text
    });
  };

  const addAttachment = (taskId: string, file: { name: string; size: string; type: string; url?: string }) => {
    const targetTask = tasks.find(t => t.id === taskId);
    const targetProj = projects.find(p => p.id === targetTask?.projectId);

    setTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          const newAtt = {
            id: `att-${Date.now()}`,
            name: file.name,
            size: file.size,
            type: file.type,
            url: file.url || '#',
            uploadDate: new Date().toISOString().split('T')[0],
            uploadedBy: currentUser.id
          };
          return {
            ...task,
            attachments: [...task.attachments, newAtt],
            activityHistory: [
              {
                id: `act-${Date.now()}`,
                userId: currentUser.id,
                action: `فایل "${file.name}" را پیوست کرد`,
                type: 'attachment',
                timestamp: new Date().toISOString()
              },
              ...task.activityHistory
            ],
            updatedAt: new Date().toISOString()
          };
        }
        return task;
      })
    );

    logActivity({
      userId: currentUser.id,
      action: `فایل پیوست "${file.name}" را آپلود کرد`,
      type: 'attachment',
      taskId,
      taskTitle: targetTask?.title,
      projectId: targetProj?.id,
      projectName: targetProj?.name,
      details: `حجم فایل: ${file.size}`
    });
  };

  // Project Operations
  const addProject = (projectData: Partial<Project> & { name: string }): Project => {
    const key = (projectData.key || projectData.name.substring(0, 4).toUpperCase()).replace(/[^A-Za-z0-9]/g, '');
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: projectData.name,
      key: key || 'PROJ',
      description: projectData.description || '',
      projectManagerId: projectData.projectManagerId || currentUser.id,
      memberIds: projectData.memberIds && projectData.memberIds.length > 0 ? projectData.memberIds : [currentUser.id],
      startDate: projectData.startDate || new Date().toISOString().split('T')[0],
      deadline: projectData.deadline || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      status: projectData.status || 'planning',
      progress: 0,
      priority: (projectData.priority as Priority) || 'medium',
      tags: projectData.tags && projectData.tags.length > 0 ? projectData.tags : ['پروژه'],
      color: projectData.color || '#6366f1',
      budget: projectData.budget || '۱۰۰,۰۰۰,۰۰۰ تومان',
      category: projectData.category || 'توسعه محصول',
      createdAt: new Date().toISOString(),
      templateId: projectData.templateId
    };

    setProjects(prev => [newProject, ...prev]);

    logActivity({
      userId: currentUser.id,
      action: `پروژه جدید "${newProject.name}" را ایجاد کرد`,
      type: 'project_created',
      projectId: newProject.id,
      projectName: newProject.name,
      details: newProject.description
    });

    return newProject;
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev => 
      prev.map(proj => proj.id === projectId ? { ...proj, ...updates } : proj)
    );

    const proj = projects.find(p => p.id === projectId);
    logActivity({
      userId: currentUser.id,
      action: `مشخصات پروژه "${proj?.name || ''}" را به‌روزرسانی کرد`,
      type: 'project_updated',
      projectId,
      projectName: proj?.name
    });
  };

  const deleteProject = (projectId: string) => {
    const proj = projects.find(p => p.id === projectId);
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setTasks(prev => prev.filter(t => t.projectId !== projectId));
    
    if (proj) {
      logActivity({
        userId: currentUser.id,
        action: `پروژه "${proj.name}" را حذف کرد`,
        type: 'project_updated'
      });
    }

    if (selectedProjectId === projectId) {
      setSelectedProjectId(null);
      setActiveView('projects');
    }
  };

  // Template Operations
  const addTemplate = (templateData: Partial<ProjectTemplate> & { name: string }): ProjectTemplate => {
    const newTemplate: ProjectTemplate = {
      id: `tpl-${Date.now()}`,
      name: templateData.name,
      description: templateData.description || '',
      category: templateData.category || 'عمومی',
      icon: templateData.icon || 'Layers',
      color: templateData.color || '#6366f1',
      defaultPriority: templateData.defaultPriority || 'medium',
      estimatedDurationDays: templateData.estimatedDurationDays || 14,
      budget: templateData.budget || '۱۰۰,۰۰۰,۰۰۰ تومان',
      stages: templateData.stages || [
        { id: 'backlog', name: 'بک‌لاگ', color: '#94a3b8' },
        { id: 'todo', name: 'برای انجام', color: '#64748b' },
        { id: 'in_progress', name: 'در حال انجام', color: '#3b82f6' },
        { id: 'review', name: 'بازبینی', color: '#8b5cf6' },
        { id: 'completed', name: 'تکمیل شده', color: '#10b981' }
      ],
      tasks: templateData.tasks || [],
      tags: templateData.tags || ['الگو'],
      isBuiltIn: false,
      createdAt: new Date().toISOString()
    };

    setTemplates(prev => [newTemplate, ...prev]);

    logActivity({
      userId: currentUser.id,
      action: `الگوی سفارشی جدید "${newTemplate.name}" را ذخیره کرد`,
      type: 'template_created',
      details: `${newTemplate.tasks.length} تسک از پیش تعریف شده با مدت تخمینی ${newTemplate.estimatedDurationDays} روز`
    });

    return newTemplate;
  };

  const updateTemplate = (templateId: string, updates: Partial<ProjectTemplate>) => {
    setTemplates(prev => 
      prev.map(tpl => tpl.id === templateId ? { ...tpl, ...updates, updatedAt: new Date().toISOString() } : tpl)
    );
  };

  const deleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  const applyTemplate = (
    templateId: string, 
    customOptions?: { projectName?: string; projectKey?: string; projectManagerId?: string; startDate?: string }
  ): Project => {
    const template = templates.find(t => t.id === templateId) || INITIAL_TEMPLATES[0];
    const startDateStr = customOptions?.startDate || new Date().toISOString().split('T')[0];
    const durationDays = template.estimatedDurationDays || 14;
    const deadlineStr = new Date(new Date(startDateStr).getTime() + durationDays * 86400000).toISOString().split('T')[0];
    const managerId = customOptions?.projectManagerId || currentUser.id;

    // Create the project
    const newProj = addProject({
      name: customOptions?.projectName || template.name,
      key: customOptions?.projectKey || template.name.substring(0, 4).toUpperCase().replace(/[^A-Za-z0-9]/g, '') || 'TPL',
      description: template.description,
      category: template.category,
      color: template.color,
      priority: template.defaultPriority,
      startDate: startDateStr,
      deadline: deadlineStr,
      budget: template.budget,
      tags: template.tags,
      projectManagerId: managerId,
      memberIds: [managerId, 'usr-3', 'usr-4', 'usr-5', 'usr-6'].filter((v, i, a) => a.indexOf(v) === i),
      templateId: template.id
    });

    // Create all predefined tasks from template
    const createdTasks: Task[] = template.tasks.map((tt, idx) => {
      const taskDeadline = new Date(new Date(startDateStr).getTime() + (tt.relativeDueDays || (idx + 1) * 2) * 86400000).toISOString().split('T')[0];
      
      // Auto assign to team members based on suggested role or round-robin
      let assignee = managerId;
      if (tt.suggestedRole) {
        const matchingUser = users.find(u => u.role === tt.suggestedRole);
        if (matchingUser) assignee = matchingUser.id;
      } else {
        const assigneesPool = users.filter(u => u.id !== managerId);
        assignee = assigneesPool[idx % assigneesPool.length]?.id || managerId;
      }

      return {
        id: `tsk-${Date.now()}-${idx}`,
        title: tt.title,
        description: tt.description,
        projectId: newProj.id,
        assigneeId: assignee,
        priority: tt.priority,
        status: tt.status || 'todo',
        startDate: startDateStr,
        deadline: taskDeadline,
        estimatedHours: tt.estimatedHours || 8,
        loggedHours: 0,
        tags: tt.tags || ['الگو'],
        subtasks: (tt.subtasks || []).map((sub, sIdx) => ({
          id: `sub-${Date.now()}-${idx}-${sIdx}`,
          title: sub,
          completed: false
        })),
        comments: [],
        attachments: [],
        activityHistory: [
          {
            id: `act-${Date.now()}-${idx}`,
            userId: currentUser.id,
            action: `از روی الگوی "${template.name}" ایجاد شد`,
            type: 'template_applied',
            timestamp: new Date().toISOString()
          }
        ],
        dependencies: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    });

    setTasks(prev => [...createdTasks, ...prev]);

    logActivity({
      userId: currentUser.id,
      action: `الگوی "${template.name}" را روی پروژه "${newProj.name}" اعمال کرد`,
      type: 'template_applied',
      projectId: newProj.id,
      projectName: newProj.name,
      details: `${createdTasks.length} تسک زمان‌بندی‌شده و چک‌لیست‌های مربوطه به طور خودکار تولید شدند.`
    });

    triggerCelebration();

    return newProj;
  };

  const saveProjectAsTemplate = (projectId: string, templateName: string, description?: string): ProjectTemplate => {
    const proj = projects.find(p => p.id === projectId);
    const projTasks = tasks.filter(t => t.projectId === projectId);

    const templateTasks = projTasks.map((t, idx) => {
      const startMs = new Date(proj?.startDate || new Date()).getTime();
      const dueMs = new Date(t.deadline).getTime();
      const relativeDays = Math.max(1, Math.round((dueMs - startMs) / 86400000));

      return {
        id: `tt-${Date.now()}-${idx}`,
        title: t.title,
        description: t.description,
        relativeDueDays: relativeDays,
        estimatedHours: t.estimatedHours,
        priority: t.priority,
        status: 'todo' as TaskStatus,
        tags: t.tags,
        subtasks: t.subtasks.map(s => s.title)
      };
    });

    const newTemplate = addTemplate({
      name: templateName,
      description: description || proj?.description || `الگوی مشتق شده از پروژه ${proj?.name}`,
      category: proj?.category || 'سفارشی',
      color: proj?.color || '#6366f1',
      defaultPriority: proj?.priority || 'medium',
      estimatedDurationDays: 30,
      budget: proj?.budget,
      tasks: templateTasks,
      tags: proj?.tags || ['الگو']
    });

    return newTemplate;
  };

  // Team Operations
  const addTeam = (teamData: Partial<Team> & { name: string; department: string }): Team => {
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      name: teamData.name,
      description: teamData.description || '',
      leaderId: teamData.leaderId || currentUser.id,
      memberIds: teamData.memberIds || [currentUser.id],
      projectIds: teamData.projectIds || [],
      department: teamData.department || 'مهندسی',
      color: teamData.color || '#6366f1'
    };
    setTeams(prev => [...prev, newTeam]);

    logActivity({
      userId: currentUser.id,
      action: `تیم جدید "${newTeam.name}" را تعریف کرد`,
      type: 'team_update',
      details: `بخش ${newTeam.department} با مدیریت ${users.find(u => u.id === newTeam.leaderId)?.name}`
    });

    return newTeam;
  };

  const updateTeam = (teamId: string, updates: Partial<Team>) => {
    setTeams(prev => 
      prev.map(team => team.id === teamId ? { ...team, ...updates } : team)
    );
  };

  const deleteTeam = (teamId: string) => {
    setTeams(prev => prev.filter(t => t.id !== teamId));
  };

  const inviteMember = (memberData: Omit<User, 'id' | 'activeProjectsCount' | 'completedTasksCount' | 'workloadPercentage'>): User => {
    const newMember: User = {
      ...memberData,
      id: `usr-${Date.now()}`,
      activeProjectsCount: 1,
      completedTasksCount: 0,
      workloadPercentage: 30
    };
    setUsers(prev => [...prev, newMember]);

    logActivity({
      userId: currentUser.id,
      action: `عضو جدید "${newMember.name}" را به سازمان دعوت کرد`,
      type: 'member_assigned',
      details: `عنوان: ${newMember.title} • واحد: ${newMember.department}`
    });

    return newMember;
  };

  // Notification Operations
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const sendNotification = (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const simulateNotificationEvent = (type: 'assignment' | 'overdue' | 'comment' | 'deadline') => {
    const randomProject = projects[0] || INITIAL_PROJECTS[0];
    const randomTask = tasks[0] || INITIAL_TASKS[0];

    switch (type) {
      case 'assignment':
        sendNotification({
          userId: currentUser.id,
          title: 'واگذاری تسک با اولویت بالا',
          message: `مهرداد وصالی شما را به تسک "${randomTask.title}" در پروژه "${randomProject.name}" منصوب کرد.`,
          type: 'assignment',
          linkTaskId: randomTask.id,
          linkProjectId: randomProject.id
        });
        break;
      case 'overdue':
        sendNotification({
          userId: currentUser.id,
          title: '⚠️ هشدار فوری پایان مهلت تسک',
          message: `مهلت تسک "${randomTask.title}" به پایان رسیده است! لطفاً وضعیت را بازبینی کنید.`,
          type: 'overdue',
          linkTaskId: randomTask.id,
          linkProjectId: randomProject.id
        });
        break;
      case 'comment':
        sendNotification({
          userId: currentUser.id,
          title: 'دیدگاه جدید روی پروژه',
          message: `النا رستمی دیدگاه جدیدی ثبت کرد: "طرح‌های به‌روزرسانی شده فیگما آماده بررسی نهایی هستند."`,
          type: 'comment',
          linkTaskId: randomTask.id,
          linkProjectId: randomProject.id
        });
        break;
      case 'deadline':
        sendNotification({
          userId: currentUser.id,
          title: 'نزدیک شدن به موعد تحویل فاز',
          message: `سررسید تحویل فاز اصلی پروژه "${randomProject.name}" تا ۴۸ ساعت آینده فرا می‌رسد.`,
          type: 'deadline',
          linkProjectId: randomProject.id
        });
        break;
    }
  };

  const simulateActivityEvent = (specificType?: ActivityType) => {
    const randomUser = users[Math.floor(Math.random() * users.length)] || users[0];
    const randomProject = projects[Math.floor(Math.random() * projects.length)] || projects[0];
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)] || tasks[0];

    const types: ActivityType[] = specificType ? [specificType] : [
      'status_change', 'comment', 'attachment', 'task_created', 'blocker'
    ];
    const chosenType = types[Math.floor(Math.random() * types.length)];

    let action = '';
    let details = '';

    switch (chosenType) {
      case 'status_change':
        action = `تسک "${randomTask.title}" را به وضعیت در حال بازبینی منتقل کرد`;
        details = 'تمام تست‌های واحد با موفقیت اجرا شدند.';
        break;
      case 'comment':
        action = `دیدگاه جدیدی روی تسک "${randomTask.title}" ثبت کرد`;
        details = 'بهینه‌سازی کدهای بخش استیجینگ انجام شد و آماده ادغام در شاخه اصلی است.';
        break;
      case 'attachment':
        action = `فایل مستندات و نمودار معماری را به تسک "${randomTask.title}" ضمیمه کرد`;
        details = 'فایل Architecture_Diagram_v3.png آپلود شد.';
        break;
      case 'blocker':
        action = `یک مانع در تسک "${randomTask.title}" ثبت کرد`;
        details = 'نیاز به هماهنگی با تیم زیرساخت جهت آزادسازی پورت‌های شبکه';
        break;
      case 'task_created':
        action = `تسک جدیدی در پروژه "${randomProject.name}" ایجاد کرد`;
        details = 'تخمین ساعت: ۱۶ ساعت • اولویت بالا';
        break;
      default:
        action = `اقدام جدیدی در پروژه "${randomProject.name}" به ثبت رساند`;
        details = 'به‌روزرسانی خودکار سیستم چابک';
    }

    logActivity({
      userId: randomUser.id,
      action,
      type: chosenType,
      details,
      taskId: randomTask.id,
      taskTitle: randomTask.title,
      projectId: randomProject.id,
      projectName: randomProject.name
    });
  };

  // ==========================================
  // Digital Asset Management (DAM) Operations
  // ==========================================

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '۰ بایت';
    const k = 1024;
    const sizes = ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const val = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
    const persianDigits = val.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)]);
    return `${persianDigits} ${sizes[i]}`;
  };

  const getCategoryFromExt = (ext: string): AssetCategory => {
    const lower = ext.toLowerCase();
    if (['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif', 'bmp', 'ico', 'tiff'].includes(lower)) return 'image';
    if (['mp4', 'mov', 'avi', 'mkv', 'webm', 'wmv'].includes(lower)) return 'video';
    if (['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a'].includes(lower)) return 'audio';
    if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv', 'md'].includes(lower)) return 'document';
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(lower)) return 'archive';
    return 'other';
  };

  const uploadAsset = (assetData: Partial<DigitalAsset> & { title: string; fileName: string; size: number }): DigitalAsset => {
    const ext = assetData.fileName.split('.').pop()?.toLowerCase() || 'other';
    const category = assetData.category || getCategoryFromExt(ext);
    const sizeFormatted = assetData.sizeFormatted || formatBytes(assetData.size);
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());

    const newAsset: DigitalAsset = {
      id: `ast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: assetData.title,
      fileName: assetData.fileName,
      extension: ext,
      category,
      mimeType: assetData.mimeType || `${category}/${ext}`,
      size: assetData.size,
      sizeFormatted,
      url: assetData.url || '#',
      thumbnailUrl: assetData.thumbnailUrl || (category === 'image' ? assetData.url : undefined),
      folderId: assetData.folderId !== undefined ? assetData.folderId : currentFolderId,
      projectId: assetData.projectId,
      taskId: assetData.taskId,
      tags: assetData.tags || ['General'],
      createdBy: currentUser.id,
      createdAt: dateStr,
      updatedAt: dateStr,
      isFavorite: false,
      isTrash: false,
      permissionLevel: assetData.permissionLevel || 'organization',
      sharedWith: assetData.sharedWith || [],
      currentVersion: 1,
      versions: [
        {
          id: `ver-${Date.now()}-1`,
          versionNumber: 1,
          fileName: assetData.fileName,
          size: assetData.size,
          sizeFormatted,
          url: assetData.url || '#',
          thumbnailUrl: assetData.thumbnailUrl,
          uploadedBy: currentUser.id,
          uploadedAt: dateStr,
          changelog: 'بارگذاری نسخه اولیه فایل در سامانه تدبیر.',
          downloadCount: 0
        }
      ],
      comments: [],
      activities: [
        {
          id: `act-${Date.now()}`,
          userId: currentUser.id,
          action: 'فایل را بارگذاری و ثبت کرد',
          timestamp: dateStr,
          details: `حجم: ${sizeFormatted} • فرمت: ${ext.toUpperCase()}`
        }
      ],
      dimensions: assetData.dimensions,
      duration: assetData.duration,
      downloadCount: 0,
      description: assetData.description || ''
    };

    setAssets(prev => [newAsset, ...prev]);

    if (newAsset.folderId) {
      setFolders(prev => prev.map(f => f.id === newAsset.folderId ? { ...f, itemCount: (f.itemCount || 0) + 1 } : f));
    }

    sendNotification({
      userId: currentUser.id,
      title: 'بارگذاری دارایی جدید',
      message: `فایل "${newAsset.title}" با موفقیت به دارایی‌های دیجیتال اضافه شد.`,
      type: 'system',
      linkProjectId: newAsset.projectId,
      linkTaskId: newAsset.taskId
    });

    logActivity({
      userId: currentUser.id,
      action: `فایل "${newAsset.title}" را به دارایی‌های دیجیتال افزود`,
      type: 'attachment',
      projectId: newAsset.projectId,
      taskId: newAsset.taskId
    });

    return newAsset;
  };

  const uploadNewVersion = (assetId: string, versionData: { fileName: string; size: number; url?: string; changelog: string }) => {
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    const sizeFormatted = formatBytes(versionData.size);

    setAssets(prev => prev.map(asset => {
      if (asset.id !== assetId) return asset;
      const nextVersionNumber = (asset.currentVersion || 1) + 1;
      const newVersion: AssetVersion = {
        id: `ver-${Date.now()}-${nextVersionNumber}`,
        versionNumber: nextVersionNumber,
        fileName: versionData.fileName,
        size: versionData.size,
        sizeFormatted,
        url: versionData.url || asset.url,
        uploadedBy: currentUser.id,
        uploadedAt: dateStr,
        changelog: versionData.changelog || `به‌روزرسانی نسخه ${nextVersionNumber}`,
        downloadCount: 0
      };

      const newActivity: AssetActivity = {
        id: `act-${Date.now()}`,
        userId: currentUser.id,
        action: `نسخه ${nextVersionNumber} فایل را بارگذاری کرد`,
        timestamp: dateStr,
        details: versionData.changelog
      };

      return {
        ...asset,
        fileName: versionData.fileName,
        size: versionData.size,
        sizeFormatted,
        url: versionData.url || asset.url,
        currentVersion: nextVersionNumber,
        updatedAt: dateStr,
        versions: [newVersion, ...asset.versions],
        activities: [newActivity, ...asset.activities]
      };
    }));

    sendNotification({
      userId: currentUser.id,
      title: 'نسخه جدید دارایی',
      message: `نسخه جدیدی برای فایل "${versionData.fileName}" بارگذاری شد.`,
      type: 'system'
    });
  };

  const deleteAssetVersion = (assetId: string, versionId: string) => {
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    setAssets(prev => prev.map(asset => {
      if (asset.id !== assetId) return asset;
      const targetVersion = asset.versions.find(v => v.id === versionId);
      if (!targetVersion) return asset;
      if (asset.versions.length <= 1) {
        return asset; // cannot delete only remaining version
      }
      const remainingVersions = asset.versions.filter(v => v.id !== versionId);
      remainingVersions.sort((a, b) => b.versionNumber - a.versionNumber);
      const topVersion = remainingVersions[0];

      const newActivity: AssetActivity = {
        id: `act-${Date.now()}`,
        userId: currentUser.id,
        action: `نسخه ${targetVersion.versionNumber} فایل را از سیستم حذف کرد`,
        timestamp: dateStr,
        details: `نسخه ${targetVersion.versionNumber} (${targetVersion.fileName}) حذف شد.`
      };

      return {
        ...asset,
        currentVersion: topVersion.versionNumber,
        fileName: topVersion.fileName,
        size: topVersion.size,
        sizeFormatted: topVersion.sizeFormatted,
        url: topVersion.url || asset.url,
        updatedAt: dateStr,
        versions: remainingVersions,
        activities: [newActivity, ...asset.activities]
      };
    }));

    sendNotification({
      userId: currentUser.id,
      title: 'حذف نسخه فایل',
      message: 'نسخه مورد نظر از سیستم حذف شد.',
      type: 'system'
    });
  };

  const revertToAssetVersion = (assetId: string, versionId: string) => {
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    setAssets(prev => prev.map(asset => {
      if (asset.id !== assetId) return asset;
      const targetVersion = asset.versions.find(v => v.id === versionId);
      if (!targetVersion) return asset;

      const newActivity: AssetActivity = {
        id: `act-${Date.now()}`,
        userId: currentUser.id,
        action: `فایل را به نسخه ${targetVersion.versionNumber} بازگردانی کرد`,
        timestamp: dateStr,
        details: `نسخه فعال به v${targetVersion.versionNumber} (${targetVersion.fileName}) تغییر یافت.`
      };

      return {
        ...asset,
        currentVersion: targetVersion.versionNumber,
        fileName: targetVersion.fileName,
        size: targetVersion.size,
        sizeFormatted: targetVersion.sizeFormatted,
        url: targetVersion.url || asset.url,
        updatedAt: dateStr,
        activities: [newActivity, ...asset.activities]
      };
    }));

    sendNotification({
      userId: currentUser.id,
      title: 'بازگردانی نسخه فایل',
      message: 'فایل به نسخه انتخابی بازگردانی شد.',
      type: 'system'
    });
  };

  const updateAsset = (assetId: string, updates: Partial<DigitalAsset>) => {
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    setAssets(prev => prev.map(asset => {
      if (asset.id !== assetId) return asset;
      return {
        ...asset,
        ...updates,
        updatedAt: dateStr
      };
    }));
  };

  const deleteAsset = (assetId: string, permanent: boolean = false) => {
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    if (permanent) {
      setAssets(prev => prev.filter(a => a.id !== assetId));
    } else {
      setAssets(prev => prev.map(a => {
        if (a.id !== assetId) return a;
        return {
          ...a,
          isTrash: true,
          deletedAt: dateStr
        };
      }));
    }
  };

  const restoreAsset = (assetId: string) => {
    setAssets(prev => prev.map(a => {
      if (a.id !== assetId) return a;
      return {
        ...a,
        isTrash: false,
        deletedAt: undefined
      };
    }));
  };

  const emptyTrash = () => {
    setAssets(prev => prev.filter(a => !a.isTrash));
  };

  const toggleAssetFavorite = (assetId: string) => {
    setAssets(prev => prev.map(a => a.id === assetId ? { ...a, isFavorite: !a.isFavorite } : a));
  };

  const addAssetComment = (assetId: string, text: string) => {
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    const newComment: AssetComment = {
      id: `comm-${Date.now()}`,
      userId: currentUser.id,
      text,
      createdAt: dateStr
    };
    setAssets(prev => prev.map(a => {
      if (a.id !== assetId) return a;
      return {
        ...a,
        comments: [...a.comments, newComment]
      };
    }));
  };

  const shareAsset = (
    assetId: string, 
    shareData: { targetId: string; targetType: 'user' | 'team'; access: AssetAccessRight; targetName?: string }, 
    permissionLevel?: AssetPermissionLevel
  ) => {
    setAssets(prev => prev.map(a => {
      if (a.id !== assetId) return a;
      const existing = a.sharedWith.filter(s => !(s.targetId === shareData.targetId && s.targetType === shareData.targetType));
      return {
        ...a,
        permissionLevel: permissionLevel || a.permissionLevel,
        sharedWith: [...existing, shareData]
      };
    }));
  };

  const batchDeleteAssets = (assetIds: string[], permanent: boolean = false) => {
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    if (permanent) {
      setAssets(prev => prev.filter(a => !assetIds.includes(a.id)));
    } else {
      setAssets(prev => prev.map(a => {
        if (!assetIds.includes(a.id)) return a;
        return { ...a, isTrash: true, deletedAt: dateStr };
      }));
    }
  };

  const batchRestoreAssets = (assetIds: string[]) => {
    setAssets(prev => prev.map(a => {
      if (!assetIds.includes(a.id)) return a;
      return { ...a, isTrash: false, deletedAt: undefined };
    }));
  };

  const batchMoveAssets = (assetIds: string[], targetFolderId: string | null) => {
    setAssets(prev => prev.map(a => {
      if (!assetIds.includes(a.id)) return a;
      return { ...a, folderId: targetFolderId };
    }));
  };

  const downloadAsset = (asset: DigitalAsset) => {
    setAssets(prev => prev.map(a => a.id === asset.id ? { ...a, downloadCount: (a.downloadCount || 0) + 1 } : a));
    
    try {
      const link = document.createElement('a');
      link.href = asset.url !== '#' ? asset.url : 'data:text/plain;charset=utf-8,' + encodeURIComponent(`Tadbir DAM Asset: ${asset.title}\nFile: ${asset.fileName}\nVersion: ${asset.currentVersion}\nSize: ${asset.sizeFormatted}`);
      link.download = asset.fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // fallback
    }

    sendNotification({
      userId: currentUser.id,
      title: 'دانلود فایل',
      message: `دانلود فایل "${asset.fileName}" آغاز شد.`,
      type: 'system'
    });
  };

  const createFolder = (folderData: Partial<AssetFolder> & { name: string }): AssetFolder => {
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short' }).format(new Date());
    const newFolder: AssetFolder = {
      id: `fld-${Date.now()}`,
      name: folderData.name,
      parentId: folderData.parentId !== undefined ? folderData.parentId : currentFolderId,
      color: folderData.color || '#6366f1',
      createdBy: currentUser.id,
      createdAt: dateStr,
      projectId: folderData.projectId,
      teamId: folderData.teamId,
      itemCount: 0,
      isFavorite: false,
      sharedWith: folderData.sharedWith || []
    };
    setFolders(prev => [newFolder, ...prev]);
    return newFolder;
  };

  const updateFolder = (folderId: string, updates: Partial<AssetFolder>) => {
    setFolders(prev => prev.map(f => f.id === folderId ? { ...f, ...updates } : f));
  };

  const deleteFolder = (folderId: string) => {
    const folder = folders.find(f => f.id === folderId);
    const parentId = folder ? folder.parentId : null;
    setAssets(prev => prev.map(a => a.folderId === folderId ? { ...a, folderId: parentId } : a));
    setFolders(prev => prev.filter(f => f.id !== folderId));
  };

  const toggleFolderFavorite = (folderId: string) => {
    setFolders(prev => prev.map(f => f.id === folderId ? { ...f, isFavorite: !f.isFavorite } : f));
  };

  // Messaging & Chat Operations
  const sendMessage = (data: {
    conversationId: string;
    text: string;
    replyToMessageId?: string;
    attachments?: ChatAttachment[];
    taskRef?: TaskReference;
    projectRef?: ProjectReference;
  }) => {
    const date = new Date();
    const timeStr = new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit' }).format(date);
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(date);
    
    let replyToMsgObj = undefined;
    if (data.replyToMessageId) {
      const parent = messages.find(m => m.id === data.replyToMessageId);
      if (parent) {
        const sender = users.find(u => u.id === parent.senderId);
        replyToMsgObj = {
          id: parent.id,
          senderName: sender ? sender.name : 'کاربر',
          text: parent.text ? parent.text.slice(0, 80) : 'پیوست'
        };
      }
    }

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: data.conversationId,
      senderId: currentUser.id,
      text: data.text,
      timestamp: timeStr,
      createdAt: date.toISOString(),
      deliveryStatus: 'sent',
      replyToMessageId: data.replyToMessageId,
      replyToMessage: replyToMsgObj,
      attachments: data.attachments,
      taskRef: data.taskRef,
      projectRef: data.projectRef,
      reactions: []
    };

    setMessages(prev => [...prev, newMsg]);

    const previewText = data.text 
      ? (currentUser.role === 'admin' ? `${currentUser.name}: ${data.text}` : data.text)
      : data.attachments && data.attachments.length > 0 
      ? `[پیوست ${data.attachments[0].name}]`
      : data.taskRef
      ? `[ارجاع به تسک ${data.taskRef.title}]`
      : data.projectRef
      ? `[ارجاع به پروژه ${data.projectRef.name}]`
      : 'پیام جدید';

    setConversations(prev => prev.map(conv => {
      if (conv.id !== data.conversationId) return conv;
      return {
        ...conv,
        lastMessage: {
          text: previewText,
          timestamp: timeStr,
          senderId: currentUser.id,
          senderName: currentUser.name
        },
        updatedAt: dateStr
      };
    }));

    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, deliveryStatus: 'delivered' } : m));
    }, 600);
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, deliveryStatus: 'read' } : m));
    }, 1500);

    return newMsg;
  };

  const editMessage = (messageId: string, newText: string) => {
    const timeStr = new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit' }).format(new Date());
    setMessages(prev => prev.map(m => {
      if (m.id !== messageId) return m;
      return {
        ...m,
        text: newText,
        isEdited: true,
        editedAt: timeStr
      };
    }));
  };

  const deleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
  };

  const togglePinMessage = (messageId: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id !== messageId) return m;
      const willPin = !m.isPinned;
      return { ...m, isPinned: willPin };
    }));

    const msg = messages.find(m => m.id === messageId);
    if (msg) {
      setConversations(prev => prev.map(c => {
        if (c.id !== msg.conversationId) return c;
        const currentPins = c.pinnedMessageIds || [];
        const isPinned = currentPins.includes(messageId);
        const newPins = isPinned 
          ? currentPins.filter(id => id !== messageId)
          : [...currentPins, messageId];
        return { ...c, pinnedMessageIds: newPins };
      }));
    }
  };

  const toggleStarMessage = (messageId: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id !== messageId) return m;
      return { ...m, isStarred: !m.isStarred };
    }));
  };

  const toggleMessageReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id !== messageId) return m;
      const reactions = m.reactions ? [...m.reactions] : [];
      const existingReactionIndex = reactions.findIndex(r => r.emoji === emoji);

      if (existingReactionIndex >= 0) {
        const existing = reactions[existingReactionIndex];
        const userHasReacted = existing.userIds.includes(currentUser.id);
        if (userHasReacted) {
          const updatedUserIds = existing.userIds.filter(uid => uid !== currentUser.id);
          if (updatedUserIds.length === 0) {
            reactions.splice(existingReactionIndex, 1);
          } else {
            reactions[existingReactionIndex] = {
              ...existing,
              count: updatedUserIds.length,
              userIds: updatedUserIds
            };
          }
        } else {
          reactions[existingReactionIndex] = {
            ...existing,
            count: existing.count + 1,
            userIds: [...existing.userIds, currentUser.id]
          };
        }
      } else {
        reactions.push({
          emoji,
          count: 1,
          userIds: [currentUser.id]
        });
      }

      return {
        ...m,
        reactions
      };
    }));
  };

  const createConversation = (data: Partial<Conversation> & { name: string; type: ChatType; memberIds: string[] }) => {
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short' }).format(new Date());
    const memberObjects: ConversationMember[] = data.memberIds.map(uid => ({
      userId: uid,
      role: uid === currentUser.id ? 'owner' : 'member',
      joinedAt: dateStr
    }));
    if (!data.memberIds.includes(currentUser.id)) {
      memberObjects.push({
        userId: currentUser.id,
        role: 'owner',
        joinedAt: dateStr
      });
      data.memberIds.push(currentUser.id);
    }

    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      type: data.type,
      name: data.name,
      avatar: data.avatar,
      color: data.color || '#6366f1',
      description: data.description || '',
      projectId: data.projectId,
      teamId: data.teamId,
      members: memberObjects,
      memberIds: data.memberIds,
      unreadCount: 0,
      isMuted: false,
      pinnedMessageIds: [],
      createdAt: dateStr,
      updatedAt: 'همین الان'
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    setActiveView('messages');
    return newConv;
  };

  const updateConversation = (convId: string, updates: Partial<Conversation>) => {
    setConversations(prev => prev.map(c => c.id === convId ? { ...c, ...updates } : c));
  };

  const addConversationMembers = (convId: string, newMemberIds: string[]) => {
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short' }).format(new Date());
    setConversations(prev => prev.map(c => {
      if (c.id !== convId) return c;
      const existingIds = new Set(c.memberIds);
      const toAdd = newMemberIds.filter(id => !existingIds.has(id));
      const newMemberObjs: ConversationMember[] = toAdd.map(id => ({
        userId: id,
        role: 'member',
        joinedAt: dateStr
      }));
      return {
        ...c,
        memberIds: [...c.memberIds, ...toAdd],
        members: [...c.members, ...newMemberObjs]
      };
    }));
  };

  const removeConversationMember = (convId: string, userId: string) => {
    setConversations(prev => prev.map(c => {
      if (c.id !== convId) return c;
      return {
        ...c,
        memberIds: c.memberIds.filter(id => id !== userId),
        members: c.members.filter(m => m.userId !== userId)
      };
    }));
  };

  const updateMemberRole = (convId: string, userId: string, role: ConversationRole) => {
    setConversations(prev => prev.map(c => {
      if (c.id !== convId) return c;
      return {
        ...c,
        members: c.members.map(m => m.userId === userId ? { ...m, role } : m)
      };
    }));
  };

  const toggleMuteConversation = (convId: string) => {
    setConversations(prev => prev.map(c => c.id === convId ? { ...c, isMuted: !c.isMuted } : c));
  };

  const startDirectChatWithUser = (targetUserId: string): string => {
    const existing = conversations.find(
      c => c.type === 'direct' && c.memberIds.includes(currentUser.id) && c.memberIds.includes(targetUserId)
    );
    if (existing) {
      setActiveConversationId(existing.id);
      setActiveView('messages');
      return existing.id;
    }
    const targetUser = users.find(u => u.id === targetUserId);
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short' }).format(new Date());
    const newConv: Conversation = {
      id: `conv-dm-${Date.now()}`,
      type: 'direct',
      name: targetUser ? targetUser.name : 'گفتگوی خصوصی',
      avatar: targetUser ? targetUser.avatar : undefined,
      description: targetUser ? targetUser.title : '',
      members: [
        { userId: currentUser.id, role: 'owner', joinedAt: dateStr },
        { userId: targetUserId, role: 'member', joinedAt: dateStr }
      ],
      memberIds: [currentUser.id, targetUserId],
      unreadCount: 0,
      createdAt: dateStr,
      updatedAt: 'همین الان'
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    setActiveView('messages');
    return newConv.id;
  };

  const openProjectChannel = (projectId: string): string => {
    const existing = conversations.find(c => c.type === 'channel' && c.projectId === projectId);
    if (existing) {
      setActiveConversationId(existing.id);
      setActiveView('messages');
      return existing.id;
    }
    const proj = projects.find(p => p.id === projectId);
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short' }).format(new Date());
    const newChan = createConversation({
      type: 'channel',
      name: proj ? `کانال پروژه ${proj.name} [${proj.key}]` : 'کانال پروژه',
      color: proj ? proj.color : '#6366f1',
      description: proj ? proj.description : 'کانال گفتگوی رسمی پروژه',
      projectId,
      memberIds: proj ? proj.memberIds : [currentUser.id]
    });
    setActiveConversationId(newChan.id);
    setActiveView('messages');
    return newChan.id;
  };

  // ==========================================
  // Think Tank (اتاق فکر) Operations
  // ==========================================
  const addIdea = (ideaData: Partial<Idea> & { title: string; problemSolved: string; proposedSolution: string }): Idea => {
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    const nextCode = `IDEA-${100 + ideas.length + 1}`;
    const newIdea: Idea = {
      id: `idea-${Date.now()}`,
      code: nextCode,
      title: ideaData.title,
      description: ideaData.description || '',
      problemSolved: ideaData.problemSolved,
      proposedSolution: ideaData.proposedSolution,
      creatorId: currentUser.id,
      teamId: ideaData.teamId,
      projectId: ideaData.projectId,
      priority: ideaData.priority || 'medium',
      status: 'submitted',
      tags: ideaData.tags || ['نوآوری'],
      assetIds: ideaData.assetIds || [],
      comments: [],
      activities: [
        {
          id: `act-${Date.now()}`,
          userId: currentUser.id,
          action: `ایده را با عنوان "${ideaData.title}" در اتاق فکر ثبت کرد.`,
          timestamp: dateStr,
          type: 'edit'
        }
      ],
      votes: [
        {
          id: `vote-${Date.now()}`,
          userId: currentUser.id,
          option: 'agree',
          timestamp: dateStr,
          comment: 'پیشنهاد اولیه طراح ایده'
        }
      ],
      hasPoll: !!ideaData.hasPoll,
      pollQuestion: ideaData.pollQuestion,
      pollOptions: ideaData.pollOptions,
      targetDepartment: ideaData.targetDepartment,
      estimatedBudget: ideaData.estimatedBudget,
      estimatedEffort: ideaData.estimatedEffort,
      createdAt: dateStr,
      updatedAt: dateStr
    };

    setIdeas(prev => [newIdea, ...prev]);
    sendNotification({
      userId: currentUser.id,
      title: '💡 ایده جدید در اتاق فکر',
      message: `${currentUser.name} ایده جدیدی با عنوان "${newIdea.title}" ثبت کرد.`,
      type: 'system'
    });
    logActivity({
      type: 'comment',
      action: `ثبت ایده در اتاق فکر (${newIdea.code})`,
      details: `ایده ${newIdea.code} توسط ${currentUser.name} ثبت شد.`,
      userId: currentUser.id
    });
    return newIdea;
  };

  const updateIdea = (ideaId: string, updates: Partial<Idea>) => {
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    setIdeas(prev => prev.map(item => {
      if (item.id !== ideaId) return item;
      const statusChanged = updates.status && updates.status !== item.status;
      const newActs = [...item.activities];
      if (statusChanged) {
        newActs.push({
          id: `act-${Date.now()}`,
          userId: currentUser.id,
          action: `وضعیت ایده را به «${updates.status}» تغییر داد.`,
          timestamp: dateStr,
          type: 'status_change'
        });
      }
      return {
        ...item,
        ...updates,
        activities: newActs,
        updatedAt: dateStr
      };
    }));
  };

  const deleteIdea = (ideaId: string) => {
    setIdeas(prev => prev.filter(item => item.id !== ideaId));
    if (selectedIdeaId === ideaId) setSelectedIdeaId(null);
  };

  const voteIdea = (ideaId: string, option: IdeaVoteOption, comment?: string) => {
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    setIdeas(prev => prev.map(item => {
      if (item.id !== ideaId) return item;
      const existingVoteIdx = item.votes.findIndex(v => v.userId === currentUser.id);
      let updatedVotes = [...item.votes];
      if (existingVoteIdx >= 0) {
        updatedVotes[existingVoteIdx] = {
          ...updatedVotes[existingVoteIdx],
          option,
          comment: comment !== undefined ? comment : updatedVotes[existingVoteIdx].comment,
          timestamp: dateStr
        };
      } else {
        updatedVotes.push({
          id: `vote-${Date.now()}`,
          userId: currentUser.id,
          option,
          timestamp: dateStr,
          comment
        });
      }
      const optionLabels: Record<IdeaVoteOption, string> = {
        agree: 'موافقت',
        disagree: 'مخالفت',
        needs_investigation: 'نیاز به بررسی بیشتر'
      };
      const newAct: IdeaActivity = {
        id: `act-${Date.now()}`,
        userId: currentUser.id,
        action: `رأی «${optionLabels[option]}» خود را ثبت کرد.`,
        timestamp: dateStr,
        type: 'vote'
      };
      return {
        ...item,
        votes: updatedVotes,
        activities: [...item.activities, newAct],
        updatedAt: dateStr
      };
    }));
  };

  const votePollOption = (ideaId: string, optionId: string) => {
    setIdeas(prev => prev.map(item => {
      if (item.id !== ideaId || !item.pollOptions) return item;
      const updatedOpts = item.pollOptions.map(opt => {
        const withoutUser = opt.votes.filter(uId => uId !== currentUser.id);
        if (opt.id === optionId) {
          return { ...opt, votes: [...withoutUser, currentUser.id] };
        }
        return { ...opt, votes: withoutUser };
      });
      return { ...item, pollOptions: updatedOpts };
    }));
  };

  const addIdeaComment = (ideaId: string, text: string, replyToId?: string, assetIds?: string[]) => {
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    setIdeas(prev => prev.map(item => {
      if (item.id !== ideaId) return item;
      let replyToAuthor: string | undefined;
      let replyToText: string | undefined;
      if (replyToId) {
        const targetComm = item.comments.find(c => c.id === replyToId);
        if (targetComm) {
          const authorUser = users.find(u => u.id === targetComm.userId);
          replyToAuthor = authorUser ? authorUser.name : 'کاربر';
          replyToText = targetComm.text.slice(0, 45) + (targetComm.text.length > 45 ? '...' : '');
        }
      }
      const newComment: IdeaComment = {
        id: `comm-${Date.now()}`,
        userId: currentUser.id,
        text,
        timestamp: dateStr,
        replyToId,
        replyToAuthor,
        replyToText,
        reactions: [],
        assetIds
      };
      const newAct: IdeaActivity = {
        id: `act-${Date.now()}`,
        userId: currentUser.id,
        action: 'دیدگاه جدیدی ثبت کرد.',
        timestamp: dateStr,
        type: 'comment'
      };
      return {
        ...item,
        comments: [...item.comments, newComment],
        activities: [...item.activities, newAct],
        updatedAt: dateStr
      };
    }));
  };

  const toggleIdeaCommentReaction = (ideaId: string, commentId: string, emoji: string) => {
    setIdeas(prev => prev.map(item => {
      if (item.id !== ideaId) return item;
      const updatedComments = item.comments.map(c => {
        if (c.id !== commentId) return c;
        const rx = c.reactions || [];
        const existing = rx.find(r => r.emoji === emoji);
        let newRx;
        if (existing) {
          if (existing.userIds.includes(currentUser.id)) {
            const nextUsers = existing.userIds.filter(u => u !== currentUser.id);
            if (nextUsers.length === 0) {
              newRx = rx.filter(r => r.emoji !== emoji);
            } else {
              newRx = rx.map(r => r.emoji === emoji ? { ...r, userIds: nextUsers, count: nextUsers.length } : r);
            }
          } else {
            newRx = rx.map(r => r.emoji === emoji ? { ...r, userIds: [...r.userIds, currentUser.id], count: r.count + 1 } : r);
          }
        } else {
          newRx = [...rx, { emoji, userIds: [currentUser.id], count: 1 }];
        }
        return { ...c, reactions: newRx };
      });
      return { ...item, comments: updatedComments };
    }));
  };

  const createIdeaPoll = (ideaId: string, question: string, options: string[]) => {
    const pollOptions = options.map((opt, idx) => ({
      id: `opt-${Date.now()}-${idx}`,
      text: opt,
      votes: []
    }));
    updateIdea(ideaId, { hasPoll: true, pollQuestion: question, pollOptions });
  };

  const convertIdeaToProject = (ideaId: string, customData?: { name?: string; key?: string; description?: string }): Project => {
    const targetIdea = ideas.find(i => i.id === ideaId);
    if (!targetIdea) throw new Error('Idea not found');
    const newProj = addProject({
      name: customData?.name || `پروژه اجرایی: ${targetIdea.title}`,
      key: customData?.key || targetIdea.code.replace('-', ''),
      description: customData?.description || `${targetIdea.description}\n\nمسئله حل‌شده: ${targetIdea.problemSolved}\nراه‌حل: ${targetIdea.proposedSolution}`,
      priority: targetIdea.priority,
      status: 'planning',
      projectManagerId: currentUser.id,
      memberIds: [currentUser.id, targetIdea.creatorId]
    });
    updateIdea(ideaId, { status: 'in_progress', convertedProjectId: newProj.id });
    triggerCelebration();
    sendNotification({
      userId: currentUser.id,
      title: '🚀 تبدیل ایده به پروژه',
      message: `ایده "${targetIdea.title}" با موفقیت به پروژه سازمانی تبدیل شد.`,
      type: 'system',
      linkProjectId: newProj.id
    });
    return newProj;
  };

  const convertIdeaToTask = (ideaId: string, projectId: string, title?: string): Task => {
    const targetIdea = ideas.find(i => i.id === ideaId);
    if (!targetIdea) throw new Error('Idea not found');
    const newTask = addTask({
      title: title || `پیاده‌سازی: ${targetIdea.title}`,
      description: `خروجی اتاق فکر (${targetIdea.code}):\n${targetIdea.description}\n\nراه‌حل پیشنهادی:\n${targetIdea.proposedSolution}`,
      projectId,
      priority: targetIdea.priority,
      assigneeId: targetIdea.creatorId,
      status: 'todo',
      tags: [...targetIdea.tags, 'اتاق فکر']
    });
    updateIdea(ideaId, { status: 'in_progress', convertedTaskId: newTask.id });
    sendNotification({
      userId: targetIdea.creatorId,
      title: '📋 تبدیل ایده به وظیفه',
      message: `ایده "${targetIdea.title}" به تسک در پروژه مربوطه تبدیل شد.`,
      type: 'assignment',
      linkTaskId: newTask.id
    });
    return newTask;
  };

  const addThinkTankMeeting = (meetingData: Partial<ThinkTankMeeting> & { title: string; date: string; time: string }): ThinkTankMeeting => {
    const newMeeting: ThinkTankMeeting = {
      id: `ttm-${Date.now()}`,
      title: meetingData.title,
      description: meetingData.description,
      date: meetingData.date,
      time: meetingData.time,
      duration: meetingData.duration || '۶۰ دقیقه',
      organizerId: currentUser.id,
      attendeeIds: meetingData.attendeeIds || [currentUser.id],
      agenda: meetingData.agenda || [],
      relatedIdeaIds: meetingData.relatedIdeaIds || [],
      assetIds: meetingData.assetIds || [],
      status: 'scheduled',
      locationType: meetingData.locationType || 'in_person',
      locationDetails: meetingData.locationDetails,
      decisions: [],
      actionItems: [],
      createdAt: new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short' }).format(new Date())
    };
    setThinkTankMeetings(prev => [newMeeting, ...prev]);
    sendNotification({
      userId: currentUser.id,
      title: '📅 جلسه جدید اتاق فکر',
      message: `جلسه "${newMeeting.title}" برای تاریخ ${newMeeting.date} ساعت ${newMeeting.time} هماهنگ شد.`,
      type: 'system'
    });
    return newMeeting;
  };

  const updateThinkTankMeeting = (meetingId: string, updates: Partial<ThinkTankMeeting>) => {
    setThinkTankMeetings(prev => prev.map(m => m.id === meetingId ? { ...m, ...updates } : m));
  };

  const deleteThinkTankMeeting = (meetingId: string) => {
    setThinkTankMeetings(prev => prev.filter(m => m.id !== meetingId));
    if (selectedMeetingId === meetingId) setSelectedMeetingId(null);
  };

  const addMeetingMinutes = (meetingId: string, minutes: string, decisions: string[], actionItems?: MeetingActionItem[]) => {
    setThinkTankMeetings(prev => prev.map(m => {
      if (m.id !== meetingId) return m;
      return {
        ...m,
        status: 'completed',
        minutesSummary: minutes,
        decisions: decisions,
        actionItems: actionItems || m.actionItems
      };
    }));
    sendNotification({
      userId: currentUser.id,
      title: '📝 ثبت صورتجلسه اتاق فکر',
      message: 'صورتجلسه و تصمیمات اتخاذ شده در جلسه با موفقیت نهایی و ذخیره گردید.',
      type: 'system'
    });
  };

  const convertActionItemToTask = (meetingId: string, actionItemId: string, projectId: string): Task => {
    const meeting = thinkTankMeetings.find(m => m.id === meetingId);
    const item = meeting?.actionItems?.find(a => a.id === actionItemId);
    if (!item) throw new Error('Action item not found');
    const newTask = addTask({
      title: item.title,
      description: `اقدام مصوب جلسه اتاق فکر: "${meeting?.title}"\nتاریخ جلسه: ${meeting?.date}`,
      projectId,
      assigneeId: item.assigneeId,
      deadline: item.deadline,
      priority: 'high',
      status: 'todo',
      tags: ['مصوبه اتاق فکر']
    });
    setThinkTankMeetings(prev => prev.map(m => {
      if (m.id !== meetingId || !m.actionItems) return m;
      return {
        ...m,
        actionItems: m.actionItems.map(a => a.id === actionItemId ? { ...a, status: 'converted', convertedTaskId: newTask.id } : a)
      };
    }));
    sendNotification({
      userId: item.assigneeId,
      title: '✅ اقدام جلسه به تسک تبدیل شد',
      message: `تسک "${item.title}" ایجاد و به مسئول مربوطه واگذار گردید.`,
      type: 'assignment',
      linkTaskId: newTask.id
    });
    return newTask;
  };

  // ==========================================
  // Secretariat (دبیرخانه) Operations
  // ==========================================
  const addLetter = (letterData: Partial<SecretariatLetter> & { subject: string; content: string; type: LetterType; sender: string; recipient: string }): SecretariatLetter => {
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short' }).format(new Date());
    const timeStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    const count = secretariatLetters.length + 1;
    const prefix = letterData.type === 'incoming' ? 'دب' : (letterData.type === 'outgoing' ? 'صاد' : 'داخ');
    const letterNumber = `${letterData.type === 'incoming' ? 'وارده: ' : (letterData.type === 'outgoing' ? 'صادره: ' : 'داخلی: ')}${prefix}-۱۴۰۵/${count.toString().padStart(3, '0')}`;
    const indicatNumber = `۱۴۰۵/${count.toString().padStart(3, '0')}`;

    const newLetter: SecretariatLetter = {
      id: `let-${Date.now()}`,
      letterNumber,
      indicatNumber,
      type: letterData.type,
      subject: letterData.subject,
      content: letterData.content,
      sender: letterData.sender,
      senderUserId: letterData.senderUserId || (letterData.type === 'outgoing' ? currentUser.id : undefined),
      recipient: letterData.recipient,
      recipientUserId: letterData.recipientUserId,
      ccList: letterData.ccList || [],
      date: letterData.date || dateStr,
      registeredAt: timeStr,
      classification: letterData.classification || 'normal',
      urgency: letterData.urgency || 'normal',
      status: letterData.status || (letterData.type === 'outgoing' ? 'draft' : 'registered'),
      responseDeadline: letterData.responseDeadline,
      relatedLetterId: letterData.relatedLetterId,
      assetIds: letterData.assetIds || [],
      referrals: [],
      workflow: [
        {
          id: `wf-${Date.now()}`,
          userId: currentUser.id,
          stageName: 'ثبت اولیه در دبیرخانه',
          action: `نامه ${letterData.type === 'incoming' ? 'وارده' : 'صادره'} با شماره ${letterNumber} ثبت شد.`,
          timestamp: timeStr,
          status: 'completed'
        }
      ],
      archiveDossierId: letterData.archiveDossierId,
      archiveBox: letterData.archiveBox,
      tags: letterData.tags || ['مکاتبات'],
      createdAt: timeStr,
      updatedAt: timeStr
    };

    setSecretariatLetters(prev => [newLetter, ...prev]);
    sendNotification({
      userId: currentUser.id,
      title: `📬 ثبت نامه ${letterData.type === 'incoming' ? 'وارده' : 'صادره'} در دبیرخانه`,
      message: `نامه با شماره ${letterNumber} با موضوع "${newLetter.subject}" ثبت شد.`,
      type: 'system'
    });
    return newLetter;
  };

  const updateLetter = (letterId: string, updates: Partial<SecretariatLetter>) => {
    const timeStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    setSecretariatLetters(prev => prev.map(l => l.id === letterId ? { ...l, ...updates, updatedAt: timeStr } : l));
  };

  const deleteLetter = (letterId: string) => {
    setSecretariatLetters(prev => prev.filter(l => l.id !== letterId));
    if (selectedLetterId === letterId) setSelectedLetterId(null);
  };

  const referLetter = (letterId: string, referralData: { toUserId?: string; toTeamId?: string; department?: string; actionType: ReferralActionType; instructions: string; deadline: string }) => {
    const timeStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    const newRef: LetterReferral = {
      id: `ref-${Date.now()}`,
      letterId,
      fromUserId: currentUser.id,
      toUserId: referralData.toUserId,
      toTeamId: referralData.toTeamId,
      department: referralData.department,
      actionType: referralData.actionType,
      instructions: referralData.instructions,
      deadline: referralData.deadline,
      status: 'pending',
      timestamp: timeStr
    };

    const actionLabels: Record<ReferralActionType, string> = {
      review: 'بررسی و اظهار نظر',
      action: 'اقدام لازم',
      response: 'تهیه پاسخ رسمی',
      info: 'جهت استحضار و اطلاع',
      followup: 'پیگیری مستمر'
    };

    const targetUser = users.find(u => u.id === referralData.toUserId);
    const targetName = targetUser ? targetUser.name : (referralData.department || 'واحد مربوطه');

    const newWorkflowStep: LetterWorkflowStep = {
      id: `wf-${Date.now()}`,
      userId: currentUser.id,
      stageName: 'ارجاع سازمانی',
      action: `ارجاع به ${targetName} با دستور: ${actionLabels[referralData.actionType]}`,
      notes: referralData.instructions,
      timestamp: timeStr,
      status: 'completed'
    };

    setSecretariatLetters(prev => prev.map(l => {
      if (l.id !== letterId) return l;
      return {
        ...l,
        status: 'referred',
        referrals: [...l.referrals, newRef],
        workflow: [...l.workflow, newWorkflowStep],
        updatedAt: timeStr
      };
    }));

    if (referralData.toUserId) {
      sendNotification({
        userId: referralData.toUserId,
        title: '📨 ارجاع نامه اداری جدید',
        message: `${currentUser.name} نامه‌ای را با دستور "${referralData.instructions}" به شما ارجاع داد.`,
        type: 'assignment'
      });
    }
  };

  const updateReferralStatus = (letterId: string, referralId: string, status: 'pending' | 'in_progress' | 'completed' | 'rejected', responseNotes?: string) => {
    const timeStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    setSecretariatLetters(prev => prev.map(l => {
      if (l.id !== letterId) return l;
      const updatedRefs = l.referrals.map(r => {
        if (r.id !== referralId) return r;
        return {
          ...r,
          status,
          responseNotes: responseNotes || r.responseNotes,
          completedAt: status === 'completed' ? timeStr : r.completedAt
        };
      });
      const allCompleted = updatedRefs.every(r => r.status === 'completed');
      return {
        ...l,
        status: allCompleted ? 'in_progress' : l.status,
        referrals: updatedRefs,
        updatedAt: timeStr
      };
    }));
  };

  const convertReferralToTask = (letterId: string, referralId: string, projectId: string): Task => {
    const letter = secretariatLetters.find(l => l.id === letterId);
    const referral = letter?.referrals.find(r => r.id === referralId);
    if (!letter || !referral) throw new Error('Referral not found');

    const newTask = addTask({
      title: `اقدام نامه ${letter.letterNumber}: ${letter.subject}`,
      description: `دستور ارجاع دبیرخانه:\n${referral.instructions}\n\nخلاصه نامه:\n${letter.content}`,
      projectId,
      assigneeId: referral.toUserId || currentUser.id,
      deadline: referral.deadline,
      priority: letter.urgency === 'immediate' ? 'urgent' : (letter.urgency === 'urgent' ? 'high' : 'medium'),
      status: 'todo',
      tags: ['دبیرخانه', letter.letterNumber]
    });

    setSecretariatLetters(prev => prev.map(l => {
      if (l.id !== letterId) return l;
      return {
        ...l,
        referrals: l.referrals.map(r => r.id === referralId ? { ...r, convertedTaskId: newTask.id } : r)
      };
    }));

    sendNotification({
      userId: referral.toUserId || currentUser.id,
      title: '📌 ارجاع نامه به وظیفه تبدیل شد',
      message: `تسک مربوط به نامه ${letter.letterNumber} در پروژه ایجاد شد.`,
      type: 'assignment',
      linkTaskId: newTask.id
    });
    return newTask;
  };

  const addLetterWorkflowStep = (letterId: string, step: { stageName: string; action: string; notes?: string }) => {
    const timeStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    const newStep: LetterWorkflowStep = {
      id: `wf-${Date.now()}`,
      userId: currentUser.id,
      stageName: step.stageName,
      action: step.action,
      notes: step.notes,
      timestamp: timeStr,
      status: 'completed'
    };
    setSecretariatLetters(prev => prev.map(l => l.id === letterId ? { ...l, workflow: [...l.workflow, newStep], updatedAt: timeStr } : l));
  };

  const replyLetter = (originalLetterId: string, replyData: Partial<SecretariatLetter> & { subject: string; content: string }): SecretariatLetter => {
    const orig = secretariatLetters.find(l => l.id === originalLetterId);
    const newOutgoing = addLetter({
      ...replyData,
      type: 'outgoing',
      subject: replyData.subject || (orig ? `پاسخ به: ${orig.subject}` : 'پاسخ نامه'),
      recipient: replyData.recipient || (orig ? orig.sender : ''),
      sender: 'سامانه تدبیر',
      relatedLetterId: originalLetterId,
      classification: orig?.classification || 'normal',
      urgency: orig?.urgency || 'normal'
    });
    updateLetter(originalLetterId, { status: 'answered' });
    addLetterWorkflowStep(originalLetterId, {
      stageName: 'پاسخ رسمی',
      action: `پاسخ رسمی با نامه صادره به شماره ${newOutgoing.letterNumber} ارسال گردید.`
    });
    return newOutgoing;
  };

  const archiveLetter = (letterId: string, dossierId: string, boxLocation?: string) => {
    updateLetter(letterId, { status: 'archived', archiveDossierId: dossierId, archiveBox: boxLocation });
    setArchiveDossiers(prev => prev.map(d => {
      if (d.id !== dossierId) return d;
      return {
        ...d,
        letterIds: d.letterIds.includes(letterId) ? d.letterIds : [...d.letterIds, letterId]
      };
    }));
    addLetterWorkflowStep(letterId, {
      stageName: 'بایگانی اسناد',
      action: `نامه در پرونده بایگانی با کد ${dossierId} ذخیره شد.`
    });
  };

  const addResolution = (resData: Partial<SecretariatResolution> & { title: string; content: string; deadline: string; responsibleUserId: string }): SecretariatResolution => {
    const count = secretariatResolutions.length + 1;
    const newRes: SecretariatResolution = {
      id: `res-${Date.now()}`,
      code: `مصوبه م-۱۴۰۵/${count.toString().padStart(2, '0')}`,
      title: resData.title,
      meetingId: resData.meetingId,
      meetingTitle: resData.meetingTitle,
      date: resData.date || new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short' }).format(new Date()),
      content: resData.content,
      responsibleUserId: resData.responsibleUserId,
      department: resData.department,
      deadline: resData.deadline,
      status: 'approved',
      taskIds: [],
      assetIds: resData.assetIds || [],
      notes: resData.notes,
      createdAt: new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short' }).format(new Date())
    };
    setSecretariatResolutions(prev => [newRes, ...prev]);
    sendNotification({
      userId: resData.responsibleUserId || currentUser.id,
      title: '⚖️ مصوبه سازمانی جدید ثبت شد',
      message: `مصوبه "${newRes.title}" با کد ${newRes.code} ثبت گردید.`,
      type: 'system'
    });
    return newRes;
  };

  const updateResolution = (resId: string, updates: Partial<SecretariatResolution>) => {
    setSecretariatResolutions(prev => prev.map(r => r.id === resId ? { ...r, ...updates } : r));
  };

  const deleteResolution = (resId: string) => {
    setSecretariatResolutions(prev => prev.filter(r => r.id !== resId));
    if (selectedResolutionId === resId) setSelectedResolutionId(null);
  };

  const convertResolutionToTask = (resolutionId: string, projectId: string): Task => {
    const res = secretariatResolutions.find(r => r.id === resolutionId);
    if (!res) throw new Error('Resolution not found');
    const newTask = addTask({
      title: `اجرای مصوبه ${res.code}: ${res.title}`,
      description: `متن مصوبه سازمانی:\n${res.content}\n\nمهلت اجرا: ${res.deadline}`,
      projectId,
      assigneeId: res.responsibleUserId,
      deadline: res.deadline,
      priority: 'high',
      status: 'todo',
      tags: ['مصوبه هیئت مدیره', res.code]
    });
    setSecretariatResolutions(prev => prev.map(r => {
      if (r.id !== resolutionId) return r;
      return {
        ...r,
        status: 'in_progress',
        taskIds: [...(r.taskIds || []), newTask.id]
      };
    }));
    sendNotification({
      userId: res.responsibleUserId,
      title: '📋 تسک اجرایی مصوبه ایجاد شد',
      message: `تسک پیگیری مصوبه "${res.title}" به مسئول مربوطه واگذار شد.`,
      type: 'assignment',
      linkTaskId: newTask.id
    });
    return newTask;
  };

  const addArchiveDossier = (dossierData: Partial<ArchiveDossier> & { title: string; category: ArchiveCategory; location: string }): ArchiveDossier => {
    const count = archiveDossiers.length + 1;
    const newDossier: ArchiveDossier = {
      id: `dos-${Date.now()}`,
      code: `DOS-${dossierData.category.toUpperCase().slice(0, 3)}-1405-${count.toString().padStart(2, '0')}`,
      title: dossierData.title,
      category: dossierData.category,
      location: dossierData.location,
      confidentiality: dossierData.confidentiality || 'normal',
      letterIds: dossierData.letterIds || [],
      resolutionIds: dossierData.resolutionIds || [],
      assetIds: dossierData.assetIds || [],
      description: dossierData.description,
      retentionYears: dossierData.retentionYears || 5,
      createdAt: new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short' }).format(new Date()),
      updatedAt: new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short' }).format(new Date())
    };
    setArchiveDossiers(prev => [newDossier, ...prev]);
    return newDossier;
  };

  const updateArchiveDossier = (dossierId: string, updates: Partial<ArchiveDossier>) => {
    setArchiveDossiers(prev => prev.map(d => d.id === dossierId ? { ...d, ...updates, updatedAt: new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short' }).format(new Date()) } : d));
  };

  const deleteArchiveDossier = (dossierId: string) => {
    setArchiveDossiers(prev => prev.filter(d => d.id !== dossierId));
  };


  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        projects,
        tasks,
        teams,
        roles,
        notifications,
        templates,
        activities,
        // DAM
        assets,
        folders,
        damSubView,
        setDamSubView,
        currentFolderId,
        setCurrentFolderId,
        previewAssetId,
        setPreviewAssetId,
        detailAssetId,
        setDetailAssetId,
        versionModalAssetId,
        setVersionModalAssetId,
        shareTargetAssetId,
        setShareTargetAssetId,
        shareTargetFolderId,
        setShareTargetFolderId,
        isUploadAssetOpen,
        setIsUploadAssetOpen,
        isEditAssetOpen,
        setIsEditAssetOpen,
        assetToEdit,
        setAssetToEdit,
        openEditAsset,
        isCreateFolderOpen,
        setIsCreateFolderOpen,
        isEditFolderOpen,
        setIsEditFolderOpen,
        folderToEdit,
        setFolderToEdit,
        openEditFolder,
        uploadAsset,
        uploadNewVersion,
        deleteAssetVersion,
        revertToAssetVersion,
        updateAsset,
        deleteAsset,
        restoreAsset,
        emptyTrash,
        toggleAssetFavorite,
        addAssetComment,
        shareAsset,
        batchDeleteAssets,
        batchRestoreAssets,
        batchMoveAssets,
        downloadAsset,
        createFolder,
        updateFolder,
        deleteFolder,
        toggleFolderFavorite,
        conversations,
        messages,
        activeConversationId,
        setActiveConversationId,
        chatFilter,
        setChatFilter,
        chatSearchQuery,
        setChatSearchQuery,
        sendMessage,
        editMessage,
        deleteMessage,
        togglePinMessage,
        toggleStarMessage,
        toggleMessageReaction,
        createConversation,
        updateConversation,
        addConversationMembers,
        removeConversationMember,
        updateMemberRole,
        toggleMuteConversation,
        startDirectChatWithUser,
        openProjectChannel,
        // Think Tank (اتاق فکر)
        ideas,
        thinkTankMeetings,
        selectedIdeaId,
        setSelectedIdeaId,
        selectedMeetingId,
        setSelectedMeetingId,
        addIdea,
        updateIdea,
        deleteIdea,
        voteIdea,
        votePollOption,
        addIdeaComment,
        toggleIdeaCommentReaction,
        createIdeaPoll,
        convertIdeaToProject,
        convertIdeaToTask,
        addThinkTankMeeting,
        updateThinkTankMeeting,
        deleteThinkTankMeeting,
        addMeetingMinutes,
        convertActionItemToTask,
        // Secretariat (دبیرخانه)
        secretariatLetters,
        secretariatResolutions,
        archiveDossiers,
        selectedLetterId,
        setSelectedLetterId,
        selectedResolutionId,
        setSelectedResolutionId,
        addLetter,
        updateLetter,
        deleteLetter,
        referLetter,
        updateReferralStatus,
        convertReferralToTask,
        addLetterWorkflowStep,
        replyLetter,
        archiveLetter,
        addResolution,
        updateResolution,
        deleteResolution,
        convertResolutionToTask,
        addArchiveDossier,
        updateArchiveDossier,
        deleteArchiveDossier,
        activeView,
        setActiveView,
        selectedProjectId,
        setSelectedProjectId,
        selectedTaskId,
        setSelectedTaskId,
        selectedMemberId,
        setSelectedMemberId,
        selectedTemplateId,
        setSelectedTemplateId,
        selectedUserId,
        setSelectedUserId,
        userProfileId,
        setUserProfileId,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isCreateTaskOpen,
        setIsCreateTaskOpen,
        isCreateProjectOpen,
        setIsCreateProjectOpen,
        isEditProjectOpen,
        setIsEditProjectOpen,
        projectToEdit,
        setProjectToEdit,
        openEditProject,
        isCreateTeamOpen,
        setIsCreateTeamOpen,
        isCreateUserOpen,
        setIsCreateUserOpen,
        isEditUserOpen,
        setIsEditUserOpen,
        userToEdit,
        setUserToEdit,
        isCreateRoleOpen,
        setIsCreateRoleOpen,
        isTemplatesModalOpen,
        setIsTemplatesModalOpen,
        isTemplateEditorOpen,
        setIsTemplateEditorOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isLoggedIn,
        switchUser,
        switchRole,
        loginAs,
        logout,
        addUser,
        updateUser,
        deleteUser,
        changeUserStatus,
        bulkChangeUserStatus,
        bulkDeleteUsers,
        addRole,
        updateRole,
        deleteRole,
        toggleRolePermission,
        hasPermission,
        registerUser,
        loginWithCredentials,
        verify2FA,
        resetPasswordRequest,
        addTask,
        updateTask,
        deleteTask,
        moveTaskStatus,
        toggleSubtask,
        addSubtask,
        deleteSubtask,
        addComment,
        addAttachment,
        addProject,
        updateProject,
        deleteProject,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        applyTemplate,
        saveProjectAsTemplate,
        addTeam,
        updateTeam,
        deleteTeam,
        inviteMember,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotification,
        sendNotification,
        simulateNotificationEvent,
        logActivity,
        simulateActivityEvent,
        triggerCelebration,
        resetData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
