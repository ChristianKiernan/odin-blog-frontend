export default function CenteredCard({ children }) {
  return (
    <div className="flex justify-center items-start min-h-screen py-5 bg-gray-100">
      <div
        className="bg-white p-4 rounded shadow w-full"
        style={{ maxWidth: '500px' }}
      >
        {children}
      </div>
    </div>
  );
}
