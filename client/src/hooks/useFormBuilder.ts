import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateFormMutation, QuestionType } from '../generated/graphql';

export interface QuestionDraft {
  id: string;
  type: QuestionType;
  title: string;
  required: boolean;
  options: string[];
}

export const useFormBuilder = () => {
  const navigate = useNavigate();
  const [createForm, { isLoading }] = useCreateFormMutation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<QuestionDraft[]>([]);

  const addQuestion = useCallback(() => {
    setQuestions(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: QuestionType.Text,
        title: '',
        required: false,
        options: [''],
      },
    ]);
  }, []);

  const updateQuestion = useCallback((id: string, updates: Partial<QuestionDraft>) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, ...updates } : q))
    );
  }, []);

  const removeQuestion = useCallback((id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  }, []);

  const addOption = useCallback((qId: string) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === qId ? { ...q, options: [...q.options, ''] } : q
      )
    );
  }, []);

  const updateOption = useCallback((qId: string, oIndex: number, val: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === qId) {
          const newOptions = [...q.options];
          newOptions[oIndex] = val;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  }, []);

  const removeOption = useCallback((qId: string, oIndex: number) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === qId
          ? { ...q, options: q.options.filter((_, i) => i !== oIndex) }
          : q
      )
    );
  }, []);

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a form title');
      return;
    }

    try {
      await createForm({
        title,
        description,
        questions: questions.map(q => ({
          type: q.type,
          title: q.title || 'Untitled Question',
          required: q.required,
          options:
            q.type === QuestionType.MultipleChoice || q.type === QuestionType.Checkbox
              ? q.options.filter(opt => opt.trim() !== '')
              : [],
        })),
      }).unwrap();
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to save form');
    }
  };

  return {
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
  };
};
