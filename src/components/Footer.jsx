export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white text-center py-4 border-t border-gray-700">
      <p className="text-sm">&copy; {new Date().getFullYear()} CryptoPulse. All rights reserved.</p>
    </footer>
  );
}
