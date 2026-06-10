import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetFormQuery } from '../generated/graphql';
import { useFormFiller } from '../hooks/useFormFiller';
import { CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import FormQuestion from '../components/FormQuestion';

const FormFillerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetFormQuery({ id: id! });
  const {
    answers,
    handleAnswerChange,
    handleSubmit,
    isSubmitting,
    submitted,
    errors,
    navigate,
  } = useFormFiller(id!, data?.form);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mb-4"></div>
        <p className="text-gray-600 font-medium">Loading form...</p>
      </div>
    );
  }

  if (error || !data?.form) {
    return (
      <div className="max-w-2xl mx-auto p-8 mt-10">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-6 h-6" />
          <p className="font-medium">Error loading form. It might have been deleted or does not exist.</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="mt-6 flex items-center gap-2 text-gray-600 hover:text-purple-700 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Go back to Home
        </button>
      </div>
    );
  }

  const form = data.form;

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 mt-20 text-center animate-in fade-in zoom-in duration-300">
        <div className="bg-white p-10 rounded-2xl shadow-xl border-t-8 border-green-500">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-20 h-20 text-green-500" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-xl text-gray-600 mb-8">Your response has been recorded successfully.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-purple-700 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-800 transition-all shadow-lg hover:shadow-purple-200 active:scale-95"
          >
            Go back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border-t-8 border-purple-700 mb-8 animate-in slide-in-from-top duration-500">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{form.title}</h1>
        <p className="text-gray-600 text-lg whitespace-pre-wrap">{form.description}</p>
        <div className="mt-4 border-t pt-4 text-sm text-red-500 font-medium">
          * Required
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {form.questions.map((q, idx) => (
          <FormQuestion
            key={q.id}
            question={q as any}
            answer={answers[q.id]}
            onChange={(val) => handleAnswerChange(q.id, val)}
            error={errors[q.id]}
            animationDelay={`${idx * 100}ms`}
          />
        ))}

        <div className="flex justify-between items-center py-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-gray-600 font-semibold hover:text-purple-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-700 text-white px-10 py-3 rounded-lg font-bold hover:bg-purple-800 disabled:bg-gray-400 transition-all shadow-md active:scale-95"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormFillerPage;
