/* eslint-disable react/prop-types */

const CompaniesTable = ({ companies, onActionClick, isPending }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
            <th className="py-3 px-6 text-left">Company ID</th>
            <th className="py-3 px-6 text-left">Company Name</th>
            <th className="py-3 px-6 text-left">Company Email</th>
            <th className="py-3 px-6 text-left">Company Address</th>
            <th className="py-3 px-6 text-left">Status</th>
            {isPending && <th className="py-3 px-6 text-center">Actions</th>}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {companies.length > 0 ? (
            companies.map((company) => (
              <tr
                key={company.company_id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {company.company_id}
                </td>
                <td className="py-3 px-6 text-left">{company.company_name}</td>
                <td className="py-3 px-6 text-left">{company.company_email}</td>
                <td className="py-3 px-6 text-left">
                  {company.company_address}
                </td>
                <td className="py-3 px-6 text-left">
                  {company.status === 0 ? "Pending" : "Approved"}
                </td>
                {isPending && (
                  <td className="py-3 px-6 text-center">
                    <button
                      className={`${
                        company.status === 0 ? "bg-green-500" : "bg-red-500"
                      } text-white px-4 py-2 rounded ${
                        company.status === 0
                          ? "hover:bg-green-600"
                          : "hover:bg-red-600"
                      } `}
                      onClick={() => onActionClick(company.company_email)}
                    >
                      {company.status === 0 ? "Approve" : "Decline"}
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={isPending ? "5" : "4"}
                className="text-center py-4 text-gray-500"
              >
                No companies found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesTable;
