import React from 'react';
import { QuestionType, Question } from '../generated/graphql';
import { AlertCircle } from 'lucide-react';
import { AnswerValue } from '../hooks/useFormFiller';

interface FormQuestionProps {
  question: Question;
  answer: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
  error?: string;
  animationDelay?: string;
}

const FormQuestion: React.FC<FormQuestionProps> = ({
  question,
  answer,
  onChange,
  error,
  animationDelay,
}) => {
  const renderInput = () => {
    switch (question.type) {
      case QuestionType.Text:
        return (
          <input
            type="text"
            placeholder="Your answer"
            className="w-full border-b-2 border-gray-200 outline-none p-2 text-lg focus:border-purple-700 transition-colors"
            onChange={(e) => onChange(e.target.value)}
            value={(answer as string) || ''}
          />
        );

      case QuestionType.MultipleChoice:
        return (
          <div className="space-y-4">
            {question.options?.map((opt, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <input
                  type="radio"
                  name={question.id}
                  className="w-5 h-5 text-purple-700 focus:ring-purple-500 cursor-pointer"
                  value={opt}
                  checked={answer === opt}
                  onChange={(e) => onChange(e.target.value)}
                />
                <span className="text-lg text-gray-700 group-hover:text-gray-900 transition-colors">{opt}</span>
              </label>
            ))}
          </div>
        );

      case QuestionType.Checkbox:
        return (
          <div className="space-y-4">
            {question.options?.map((opt, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-purple-700 rounded focus:ring-purple-500 cursor-pointer"
                  checked={Array.isArray(answer) && answer.includes(opt)}
                  onChange={(e) => {
                    const current = Array.isArray(answer) ? answer : [];
                    const next = e.target.checked
                      ? [...current, opt]
                      : current.filter((o) => o !== opt);
                    onChange(next);
                  }}
                />
                <span className="text-lg text-gray-700 group-hover:text-gray-900 transition-colors">{opt}</span>
              </label>
            ))}
          </div>
        );

      case QuestionType.Date:
        return (
          <input
            type="date"
            className="border-2 border-gray-200 p-3 rounded-lg text-lg focus:border-purple-700 outline-none transition-colors cursor-pointer"
            onChange={(e) => onChange(e.target.value)}
            value={(answer as string) || ''}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-white p-6 md:p-8 rounded-xl shadow-md transition-all duration-300 ${
        error ? 'border-2 border-red-500 ring-4 ring-red-50 ring-opacity-50' : ''
      }`}
      style={{ animationDelay }}
    >
      <label className="block text-xl font-semibold text-gray-800 mb-6">
        {question.title} {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="mt-2">{renderInput()}</div>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-600 animate-bounce">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm font-semibold">{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormQuestion;
