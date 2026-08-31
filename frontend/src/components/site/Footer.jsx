export const Footer = ({ onNavigate }) => (
  <footer className="relative z-10 bg-[#071A33] border-t border-[#C9A227]/20" data-testid="site-footer">
    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-12">
        <div>
          <img src="/mbtex-group-horizontal-vector.svg" alt="MBtex Group — Make It Happen" className="h-20 w-auto mb-5" data-testid="footer-logo" />
          <p className="font-serif-display italic text-white/50 text-lg">
            Building Platforms. Connecting Markets. Creating Sustainable Growth.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {[["Who We Are", "#who-we-are"], ["What We Do", "#what-we-do"], ["Approach", "#approach"], ["Values", "#values"], ["Contact", "#contact"]].map(([label, href]) => (
            <button key={href} onClick={() => onNavigate(href)} className="nav-link font-grotesk text-[0.68rem] uppercase tracking-[0.2em] text-white/50" data-testid={`footer-link-${href.slice(1)}`}>
              {label}
            </button>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="font-grotesk text-[0.68rem] uppercase tracking-[0.18em] text-white/30">
          © {new Date().getFullYear()} MBtex Group · Switzerland · International Operations
        </p>
        <p className="font-grotesk text-[0.68rem] uppercase tracking-[0.18em] text-white/30">info@mbtexgroup.com</p>
      </div>
    </div>
  </footer>
);
