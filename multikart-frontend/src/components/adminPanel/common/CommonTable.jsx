import React from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommonTable = ({ title, addLink, addText, columns, data, onEdit, onDelete }) => {
    // Check karein ke kya actions dikhane hain
    const showActions = onEdit || onDelete;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl font-bold text-light-text dark:text-dark-text uppercase tracking-widest border-l-4 border-gold-light pl-4">
                    {title}
                </h2>
                {addLink && (
                    <Link to={addLink} className="flex items-center gap-2 bg-gold-light hover:bg-gold-hover text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-gold-light/20">
                        <Plus size={18} /> {addText}
                    </Link>
                )}
            </div>

            <div className="rounded-xl bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-light-bg dark:bg-dark-bg text-xs uppercase tracking-wider text-light-muted dark:text-dark-muted">
                                {columns.map((col, idx) => (
                                    <th key={idx} className="px-6 py-4 font-semibold">{col.header}</th>
                                ))}
                                {/* FIXED: Actions header ab sirf tab dikhega jab zaroorat ho */}
                                {showActions && <th className="px-6 py-4 font-semibold text-right">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-light-section dark:divide-dark-border">
                            {data.map((item, rowIdx) => (
                                <tr key={rowIdx} className="text-sm text-light-body dark:text-dark-body hover:bg-light-bg/50 dark:hover:bg-dark-bg/50 transition-colors">
                                    {columns.map((col, colIdx) => (
                                        <td key={colIdx} className="px-6 py-4 whitespace-nowrap">
                                            {col.render ? col.render(item) : item[col.key]}
                                        </td>
                                    ))}

                                    {showActions && (
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                {onEdit && (
                                                    <button onClick={() => onEdit(item)} className="p-2 text-gold-dark hover:bg-gold-light/10 hover:text-gold-light rounded-lg transition-all" title="Edit">
                                                        <Edit2 size={18} />
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button onClick={() => onDelete(item)} className="p-2 text-light-muted hover:bg-accent-rose/10 hover:text-accent-rose rounded-lg transition-all" title="Delete">
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CommonTable;