import React from 'react';

const CommonForm = ({ title, fields, formData, onChange, onSubmit, buttonText, isLoading }) => {
  return (
    <div className="rounded-xl bg-light-card p-6 shadow-sm dark:bg-dark-card border border-light-section dark:border-dark-border max-w-4xl mx-auto transition-colors duration-300">
      <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-6 border-b border-light-section dark:border-dark-border pb-4 uppercase tracking-wider">
        {title}
      </h2>
      
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => {
          // Check if the field is a checkbox to apply different layout
          const isCheckbox = field.type === 'checkbox';

          return (
            <div 
              key={field.name} 
              className={`${field.fullWidth ? 'md:col-span-2' : ''} flex ${isCheckbox ? 'flex-row items-center gap-3 py-2' : 'flex-col gap-2'}`}
            >
              {/* Label handling for Checkbox vs Other inputs */}
              {!isCheckbox && (
                <label className="text-sm font-semibold text-light-body dark:text-dark-body">
                  {field.label} {field.required && <span className="text-accent-rose">*</span>}
                </label>
              )}

              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={onChange}
                  className="h-11 rounded-lg border border-light-section bg-light-bg px-4 text-sm outline-none focus:ring-1 focus:ring-gold-light dark:border-dark-border dark:bg-dark-bg dark:text-dark-text transition-all"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={onChange}
                  rows={4}
                  className="rounded-lg border border-light-section bg-light-bg p-4 text-sm outline-none focus:ring-1 focus:ring-gold-light dark:border-dark-border dark:bg-dark-bg dark:text-dark-text transition-all"
                />
              ) : isCheckbox ? (
                <>
                  <input
                    type="checkbox"
                    id={field.name}
                    name={field.name}
                    checked={!!formData[field.name]} // Ensure boolean
                    onChange={onChange}
                    className="w-5 h-5 rounded border-gold-light/40 text-gold-light focus:ring-gold-light bg-light-bg dark:bg-dark-bg dark:border-dark-border cursor-pointer transition-all accent-gold-light"
                  />
                  <label htmlFor={field.name} className="text-sm font-semibold text-light-body dark:text-dark-body cursor-pointer select-none">
                    {field.label}
                  </label>
                </>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={field.type !== 'file' ? formData[field.name] || '' : undefined}
                  onChange={onChange}
                  placeholder={field.placeholder}
                  className="h-11 rounded-lg border border-light-section bg-light-bg px-4 text-sm outline-none focus:ring-1 focus:ring-gold-light dark:border-dark-border dark:bg-dark-bg dark:text-dark-text file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gold-light/10 file:text-gold-light hover:file:bg-gold-light/20 transition-all"
                />
              )}
            </div>
          );
        })}

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto px-10 py-3 rounded-lg bg-gold-light text-white font-bold uppercase tracking-widest hover:bg-gold-hover transition-all disabled:opacity-50 shadow-lg shadow-gold-light/20"
          >
            {isLoading ? 'Processing...' : buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommonForm;