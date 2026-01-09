const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} ReferHub · Built with React & Node.js
      </div>
    </footer>
  );
};

export default Footer;
