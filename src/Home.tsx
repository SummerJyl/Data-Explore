import React from 'react';

interface Supplement {
  id: number;
  name: string;
  dosage: string;
  source: string;
  status: 'Optimal' | 'Low';
}

const Home: React.FC = () => {
  // Mock data example (can replace with real API later)
  const mockData: Supplement[] = [
  { id: 1, name: 'Vitamin D', dosage: '2000 IU', source: 'Supplement', status: 'Optimal' },
  { id: 2, name: 'Omega-3', dosage: '1000 mg', source: 'Fish Oil', status: 'Low' },
  { id: 3, name: 'Probiotic', dosage: '5 Billion CFU', source: 'Fermented Food', status: 'Optimal' },
];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6">
        <h1 className="text-2xl font-bold text-gray-800">Bio Health Data Explorer</h1>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-6 py-8">
        {/* Intro / summary */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Welcome!</h2>
          <p className="text-gray-600">
            Explore key bio health metrics and supplement data in one clean dashboard.
          </p>
        </section>

        {/* Data Table */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Supplement Status</h3>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dosage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockData.map(({ id, name, dosage, source, status }) => (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{dosage}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{source}</td>
                    <td className={`px-6 py-4 whitespace-nowrap font-semibold ${
                      status === 'Optimal' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-4 px-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Bio Health Explorer. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
