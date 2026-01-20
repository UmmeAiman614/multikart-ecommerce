// src/components/Breadcrumb.jsx
import { FaChevronRight } from 'react-icons/fa';

const Breadcrumb = ({ paths = [] }) => {
  return (
    <div className="mb-8 p-3 rounded-md bg-light-card dark:bg-dark-card shadow-sm transition-colors">
      <nav className="flex items-center space-x-2" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          {paths.map((path, idx) => (
            <li key={idx} className="flex items-center space-x-2">
              {path.href ? (
                <a
                  href={path.href}
                  className="text-light-body dark:text-dark-body hover:text-gold-light dark:hover:text-gold-dark transition-colors text-sm"
                >
                  {path.name}
                </a>
              ) : (
                <span className="text-sm font-medium text-light-text dark:text-dark-text">
                  {path.name}
                </span>
              )}
              {idx < paths.length - 1 && (
                <FaChevronRight className="text-light-muted dark:text-dark-muted text-xs" />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
