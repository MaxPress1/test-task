import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubmitResponseMutation, Form, QuestionType } from '../generated/graphql';

export type AnswerValue = string | string[];

export interface FormAnswers {
  [questionId: string]: AnswerValue;
}

export const useFormFiller = (formId: string, form?: Form | null) => {
  const navigate = useNavigate();
  const [submitResponse, { isLoading: isSubmitting }] = useSubmitResponseMutation();
  const [answers, setAnswers] = useState<FormAnswers>({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAnswerChange = (questionId: string, value: AnswerValue) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (errors[questionId]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[questionId];
        return next;
      });
    }
  };

  const validate = () => {
    if (!form) return false;
    const newErrors: Record<string, string> = {};
    form.questions.forEach(q => {
      if (q.required) {
        const answer = answers[q.id];
        const isEmpty = 
          answer === undefined || 
          answer === '' || 
          (Array.isArray(answer) && answer.length === 0);
          
        if (isEmpty) {
          newErrors[q.id] = 'This question is required';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const answerInputs = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value: typeof value === 'object' ? JSON.stringify(value) : String(value),
    }));

    try {
      await submitResponse({ formId, answers: answerInputs }).unwrap();
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Failed to submit form');
    }
  };

  return {
    answers,
    handleAnswerChange,
    handleSubmit,
    isSubmitting,
    submitted,
    errors,
    navigate,
  };
};
