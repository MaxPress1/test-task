import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus, Save } from 'lucide-react';
import { useFormBuilder } from '../hooks/useFormBuilder';
import QuestionItem from '../components/QuestionItem';

const FormBuilderPage: React.FC = () => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    questions,
    setQuestions,
    addQuestion,
    updateQuestion,
    removeQuestion,
    addOption,
    updateOption,
    removeOption,
    handleSave,
    isLoading,
  } = useFormBuilder();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-900">Create New Form</h1>

      <div className="bg-white p-6 rounded-lg shadow-md border-t-8 border-purple-700 mb-6">
        <input
          type="text"
          placeholder="Form Title"
          className="text-4xl font-bold w-full border-b focus:border-purple-700 outline-none mb-4 p-2 transition-colors"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Form Description"
          className="w-full border-b focus:border-purple-700 outline-none p-2 resize-none transition-colors"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={questions} strategy={verticalListSortingStrategy}>
          {questions.map((q) => (
            <QuestionItem
              key={q.id}
              q={q}
              onUpdate={updateQuestion}
              onRemove={removeQuestion}
              onAddOption={addOption}
              onUpdateOption={updateOption}
              onRemoveOption={removeOption}
            />
          ))}
        </SortableContext>
      </DndContext>

      <div className="flex justify-between items-center mt-8 sticky bottom-8 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border">
        <button
          type="button"
          onClick={addQuestion}
          className="flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-200 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" /> Add Question
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isLoading || !title.trim()}
          className="flex items-center gap-2 bg-purple-700 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-purple-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
        >
          <Save className="w-5 h-5" /> {isLoading ? 'Saving...' : 'Save Form'}
        </button>
      </div>
    </div>
  );
};

export default FormBuilderPage;
