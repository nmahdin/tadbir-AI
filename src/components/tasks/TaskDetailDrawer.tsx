import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Task, TaskStatus, Priority } from '../../types';
import { PriorityPill, TaskStatusBadge } from '../common/PriorityPill';
import { Avatar } from '../common/Avatar';
import {
  X,
  Calendar,
  Clock,
  User,
  FolderKanban,
  Tag,
  CheckSquare,
  Plus,
  Trash2,
  Paperclip,
  MessageSquare,
  Send,
  History,
  AlertTriangle,
  Link as LinkIcon,
  CheckCircle2,
  Upload,
  Sparkles
} from 'lucide-react';

export const TaskDetailDrawer: React.FC = () => {
  const {
    selectedTaskId,
    setSelectedTaskId,
    tasks,
    projects,
    users,
    currentUser,
    updateTask,
    deleteTask,
    moveTaskStatus,
    toggleSubtask,
    addSubtask,
    deleteSubtask,
    addComment,
    addAttachment
  } = useApp();

  const [newSubtaskText, setNewSubtaskText] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [isAddingAttachment, setIsAddingAttachment] = useState(false);
  const [attachmentName, setAttachmentName] = useState('');

  if (!selectedTaskId) return null;

  const task = tasks.find(t => t.id === selectedTaskId);
  if (!task) return null;

  const project = projects.find(p => p.id === task.projectId);
  const assignee = users.find(u => u.id === task.assigneeId);
  const completedSubtasks = task.subtasks.filter(s => s.completed).length;

  const handleSubtaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskText.trim()) return;
    addSubtask(task.id, newSubtaskText.trim());
    setNewSubtaskText('');
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    addComment(task.id, newCommentText.trim());
    setNewCommentText('');
  };

  const handleAttachmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attachmentName.trim()) return;
    addAttachment(task.id, {
      name: attachmentName.trim(),
      size: `${(Math.random() * 4 + 0.5).toFixed(1)} MB`,
      type: 'document',
      url: '#'
    });
    setAttachmentName('');
    setIsAddingAttachment(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            {project && (
              <span
                className="px-2.5 py-1 rounded-md text-white text-xs font-bold"
                style={{ backgroundColor: project.color }}
              >
                {project.key}
              </span>
            )}
            <span className="text-xs font-mono text-slate-600 font-semibold">{task.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const nextStatus = task.status === 'completed' ? 'todo' : 'completed';
                moveTaskStatus(task.id, nextStatus);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                task.status === 'completed'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{task.status === 'completed' ? 'Completed' : 'Mark Done'}</span>
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              title="Delete Task"
              className="p-1.5 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSelectedTaskId(null)}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Blocker Banner */}
          {task.isBlocked && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-rose-800 mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Task is Blocked</span>
              </div>
              <p className="text-xs text-rose-700">{task.blockedReason || 'Blocked by upstream dependency'}</p>
              <button
                onClick={() => updateTask(task.id, { isBlocked: false, blockedReason: undefined })}
                className="mt-2 text-xs font-semibold text-rose-800 underline cursor-pointer"
              >
                Mark as Unblocked
              </button>
            </div>
          )}

          {/* Title input / display */}
          <div>
            <input
              type="text"
              value={task.title}
              onChange={(e) => updateTask(task.id, { title: e.target.value })}
              className="w-full text-lg sm:text-xl font-extrabold text-slate-900 border-b border-transparent hover:border-slate-200 focus:border-indigo-500 focus:outline-hidden py-1 transition-all"
            />
          </div>

          {/* Core Properties Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
            {/* Status */}
            <div>
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Status
              </label>
              <select
                value={task.status}
                onChange={(e) => moveTaskStatus(task.id, e.target.value as TaskStatus)}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-800 focus:outline-hidden"
              >
                <option value="backlog">Backlog</option>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Review</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Priority
              </label>
              <select
                value={task.priority}
                onChange={(e) => updateTask(task.id, { priority: e.target.value as Priority })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-800 focus:outline-hidden"
              >
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Assignee */}
            <div>
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Assignee
              </label>
              <select
                value={task.assigneeId}
                onChange={(e) => updateTask(task.id, { assigneeId: e.target.value })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-hidden"
              >
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>

            {/* Project */}
            <div>
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Project
              </label>
              <select
                value={task.projectId}
                onChange={(e) => updateTask(task.id, { projectId: e.target.value })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-hidden truncate"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Deadline */}
            <div>
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Deadline
              </label>
              <input
                type="date"
                value={task.deadline}
                onChange={(e) => updateTask(task.id, { deadline: e.target.value })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-hidden"
              />
            </div>

            {/* Estimated Hours */}
            <div>
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Estimated (Hrs)
              </label>
              <input
                type="number"
                min="1"
                max="200"
                value={task.estimatedHours}
                onChange={(e) => updateTask(task.id, { estimatedHours: Number(e.target.value) })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Detailed Description
            </label>
            <textarea
              rows={3}
              value={task.description}
              onChange={(e) => updateTask(task.id, { description: e.target.value })}
              placeholder="Add comprehensive specifications, context, and requirements..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-hidden resize-y leading-relaxed"
            />
          </div>

          {/* Subtasks / Checklist Section */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Subtasks Checklist
                </h4>
              </div>
              <span className="text-xs font-bold text-slate-600">
                {completedSubtasks}/{task.subtasks.length} Completed
              </span>
            </div>

            {/* Subtask items list */}
            <div className="space-y-1.5">
              {task.subtasks.map(st => (
                <div
                  key={st.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 group text-xs"
                >
                  <label className="flex items-center gap-2.5 flex-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={st.completed}
                      onChange={() => toggleSubtask(task.id, st.id)}
                      className="w-4 h-4 rounded-sm text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className={st.completed ? 'line-through text-slate-600' : 'font-medium text-slate-800'}>
                      {st.title}
                    </span>
                  </label>
                  <button
                    onClick={() => deleteSubtask(task.id, st.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-600 hover:text-rose-600 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add subtask input */}
            <form onSubmit={handleSubtaskSubmit} className="flex gap-2 pt-2 border-t border-slate-100">
              <input
                type="text"
                value={newSubtaskText}
                onChange={(e) => setNewSubtaskText(e.target.value)}
                placeholder="Add new subtask item..."
                className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Add
              </button>
            </form>
          </div>

          {/* Attachments Section */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Attachments ({task.attachments.length})
                </h4>
              </div>
              <button
                onClick={() => setIsAddingAttachment(true)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload File</span>
              </button>
            </div>

            {isAddingAttachment && (
              <form onSubmit={handleAttachmentSubmit} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex gap-2">
                <input
                  autoFocus
                  type="text"
                  value={attachmentName}
                  onChange={(e) => setAttachmentName(e.target.value)}
                  placeholder="e.g. Design_Mockups_v3.pdf"
                  className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Attach
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingAttachment(false)}
                  className="px-2 py-1.5 text-xs text-slate-600"
                >
                  Cancel
                </button>
              </form>
            )}

            <div className="space-y-1.5">
              {task.attachments.map(att => (
                <div
                  key={att.id}
                  className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Paperclip className="w-4 h-4 text-slate-600 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 truncate">{att.name}</p>
                      <p className="text-[10px] text-slate-600">{att.size} • Uploaded {att.uploadDate}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Simulated download for file: ${att.name}`)}
                    className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
                  >
                    Download
                  </button>
                </div>
              ))}
              {task.attachments.length === 0 && !isAddingAttachment && (
                <p className="text-xs text-slate-600 text-center py-2">No attachments uploaded yet.</p>
              )}
            </div>
          </div>

          {/* Comments & Discussion */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Comments & Collaboration ({task.comments.length})
              </h4>
            </div>

            {/* Comment Thread */}
            <div className="space-y-3">
              {task.comments.map(c => {
                const commentAuthor = users.find(u => u.id === c.userId);
                return (
                  <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar user={commentAuthor} size="xs" />
                        <span className="text-xs font-bold text-slate-900">{commentAuthor?.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-600">
                        {new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed pl-7">{c.text}</p>
                  </div>
                );
              })}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2 pt-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder={`Reply as ${currentUser.name}...`}
                className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>
          </div>

          {/* Activity History Audit */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <History className="w-3.5 h-3.5 text-slate-600" />
              <span>Activity History</span>
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-600">
              {task.activityHistory.slice(0, 5).map(act => {
                const user = users.find(u => u.id === act.userId);
                return (
                  <div key={act.id} className="flex items-center justify-between">
                    <span>
                      <span className="font-semibold text-slate-800">{user?.name || 'User'}</span> {act.action}
                    </span>
                    <span className="text-slate-600">
                      {new Date(act.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
