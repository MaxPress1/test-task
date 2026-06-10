import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { QuestionType } from '../generated/graphql';
import { Plus, Trash, GripVertical } from 'lucide-react';
import { QuestionDraft } from '../hooks/useFormBuilder';

const inputBaseClasses = "border-b outline-none p-2 transition-all focus:border-blue-500";
const actionButtonClasses = "p-1.5 rounded transition-colors";

interface Props {
  q: QuestionDraft;
  onUpdate: (id: string, updates: Partial<QuestionDraft>) => void;
  onRemove: (id: string) => void;
  onAddOption: (id: string) => void;
  onUpdateOption: (qId: string, oIndex: number, val: string) => void;
  onRemoveOption: (qId: string, oIndex: number) => void;
}

const QuestionItem: React.FC<Props> = ({
  q,
  onUpdate,
  onRemove,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: q.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  const isChoiceType = q.type === QuestionType.MultipleChoice || q.type === QuestionType.Checkbox;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-6 rounded-lg shadow-md mb-6 border-l-4 border-blue-500 group relative animate-in fade-in slide-in-from-left duration-300"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute left-1/2 -top-3 -translate-x-1/2 bg-white border rounded p-1 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm"
      >
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Question Title"
          className={`flex-1 text-xl font-semibold ${inputBaseClasses}`}
          value={q.title}
          onChange={(e) => onUpdate(q.id, { title: e.target.value })}
        />
        <select
          className="border p-2 rounded-lg bg-gray-50 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20"
          value={q.type}
          onChange={(e) => onUpdate(q.id, { type: e.target.value as QuestionType })}
        >
          <option value={QuestionType.Text}>Text</option>
          <option value={QuestionType.MultipleChoice}>Multiple Choice</option>
          <option value={QuestionType.Checkbox}>Checkbox</option>
          <option value={QuestionType.Date}>Date</option>
        </select>
      </div>

      {isChoiceType && (
        <div className="ml-2 sm:ml-4 space-y-3 mb-6">
          {q.options.map((opt, oIndex) => (
            <div key={oIndex} className="flex items-center gap-3 animate-in fade-in duration-200">
              <div
                className={`flex-shrink-0 ${
                  q.type === QuestionType.MultipleChoice
                    ? 'w-4 h-4 rounded-full border-2 border-gray-300'
                    : 'w-4 h-4 border-2 border-gray-300 rounded-sm'
                }`}
              />
              <input
                type="text"
                placeholder={`Option ${oIndex + 1}`}
                className={`flex-1 ${inputBaseClasses} py-1`}
                value={opt}
                onChange={(e) => onUpdateOption(q.id, oIndex, e.target.value)}
              />
              <button
                type="button"
                onClick={() => onRemoveOption(q.id, oIndex)}
                className={`${actionButtonClasses} hover:bg-red-50 text-gray-400 hover:text-red-500`}
                title="Remove option"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onAddOption(q.id)}
            className="text-blue-600 text-sm font-semibold hover:text-blue-800 flex items-center gap-1.5 px-2 py-1 rounded hover:bg-blue-50 transition-colors mt-2"
          >
            <Plus className="w-4 h-4" /> Add Option
          </button>
        </div>
      )}

      <div className="flex justify-end items-center gap-6 border-t pt-4">
        <label className="flex items-center gap-2 cursor-pointer group/label">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 checked:bg-blue-600 checked:border-blue-600 transition-all"
              checked={q.required}
              onChange={(e) => onUpdate(q.id, { required: e.target.checked })}
            />
            <svg className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <span className="text-sm font-medium text-gray-600 group-hover/label:text-gray-900 transition-colors">Required</span>
        </label>
        <div className="w-px h-6 bg-gray-200" />
        <button
          type="button"
          onClick={() => onRemove(q.id)}
          className={`${actionButtonClasses} hover:bg-red-50 text-gray-500 hover:text-red-600`}
          title="Delete question"
        >
          <Trash className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default QuestionItem;
