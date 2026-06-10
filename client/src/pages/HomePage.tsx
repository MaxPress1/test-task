import React from 'react';
import { Link } from 'react-router-dom';
import { useGetFormsQuery } from '../generated/graphql';
import { Plus, FileText, ClipboardList, Eye, Layout } from 'lucide-react';

const HomePage: React.FC = () => {
  const { data, isLoading, error, refetch } = useGetFormsQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mb-4"></div>
        <p className="text-gray-600 font-medium">Loading your forms...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8 mt-10">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex flex-col items-center gap-4">
          <p className="font-medium">Error loading forms. Please check if the server is running.</p>
          <button
            onClick={() => refetch()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-purple-700 p-1.5 rounded-lg">
              <Layout className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-600">
              Google Forms Lite
            </h1>
          </div>
          <Link
            to="/forms/new"
            className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-purple-800 transition-all shadow-md hover:shadow-purple-200 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Create Form</span>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 md:p-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">Recent Forms</h2>
          <span className="text-sm text-gray-500">{data?.forms.length || 0} forms total</span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.forms.map((form) => (
            <div
              key={form.id}
              className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div className="p-6 flex-1">
                <div className="bg-purple-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
                  <FileText className="w-6 h-6 text-purple-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-purple-700 transition-colors">
                  {form.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 h-10">
                  {form.description || 'No description provided.'}
                </p>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <Link
                  to={`/forms/${form.id}/fill`}
                  className="flex items-center gap-1.5 text-blue-600 font-medium hover:text-blue-800 transition-colors text-sm"
                >
                  <Eye className="w-4 h-4" />
                  Fill Form
                </Link>
                <Link
                  to={`/forms/${form.id}/responses`}
                  className="flex items-center gap-1.5 text-purple-700 font-medium hover:text-purple-900 transition-colors text-sm"
                >
                  <ClipboardList className="w-4 h-4" />
                  Responses
                </Link>
              </div>
            </div>
          ))}
        </div>

        {data?.forms.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200 mt-4">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No forms yet</h3>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto">
              Create your first form to start collecting responses from users.
            </p>
            <Link
              to="/forms/new"
              className="inline-flex items-center gap-2 bg-white border-2 border-purple-700 text-purple-700 px-6 py-2 rounded-full font-bold hover:bg-purple-50 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create your first form
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
