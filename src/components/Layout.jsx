
import Footer from './Footer'; 

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
