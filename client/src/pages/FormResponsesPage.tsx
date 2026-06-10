import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetResponsesQuery, useGetFormQuery } from '../generated/graphql';

const FormResponsesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: formData, isLoading: isFormLoading } = useGetFormQuery({ id: id! });
  const { data: responsesData, isLoading: isResponsesLoading } = useGetResponsesQuery({ formId: id! });

  if (isFormLoading || isResponsesLoading) return <div className="p-8">Loading responses...</div>;

  const form = formData?.form;
  const responses = responsesData?.responses || [];

  const formatValue = (val: string) => {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed.join(', ');
      return String(parsed);
    } catch {
      return val;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Responses: {form?.title}</h1>
      <p className="text-gray-600 mb-8">{responses.length} responses</p>

      <div className="space-y-8">
        {responses.map((resp) => (
          <div key={resp.id} className="border rounded-lg p-6 shadow-sm bg-white">
            <p className="text-sm text-gray-400 mb-4 border-b pb-2">
              Submitted at: {new Date(resp.submittedAt).toLocaleString()}
            </p>
            <div className="grid gap-4">
              {form?.questions.map((q) => {
                const answer = resp.answers.find((a) => a.questionId === q.id);
                return (
                  <div key={q.id}>
                    <p className="font-semibold text-gray-700">{q.title}</p>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded mt-1">
                      {answer ? formatValue(answer.value) : <span className="text-gray-400">No answer</span>}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {responses.length === 0 && (
          <p className="text-center text-gray-500 py-12 border-2 border-dashed rounded-lg">
            No responses yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default FormResponsesPage;
