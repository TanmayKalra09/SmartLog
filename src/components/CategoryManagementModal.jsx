import React, { useState } from 'react';
import { useTransactions } from './TransactionContext';

export const CategoryManagementModal = ({ isOpen, onClose }) => {
  const { categories, addCategory, updateCategory, deleteCategory } = useTransactions();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  if (!isOpen) return null;

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim());
      setNewCategoryName('');
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editingCategory.name.trim()) {
      updateCategory(editingCategory.id, editingCategory.name.trim());
      setEditingCategory(null);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Manage Categories</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        <form onSubmit={handleAddCategory} className="mb-6">
          <label htmlFor="new-category" className="block text-sm font-medium text-gray-700 mb-1">Add New Category</label>
          <div className="flex gap-2">
            <input type="text" id="new-category" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="e.g., Groceries" className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"/>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Add</button>
          </div>
        </form>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              {editingCategory?.id === cat.id ? (
                <form onSubmit={handleUpdate} className="flex-grow flex gap-2 items-center">
                  <input type="text" value={editingCategory.name} onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})} className="flex-grow p-2 border border-indigo-300 rounded-md" autoFocus/>
                  <button type="submit" className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
                  <button type="button" onClick={() => setEditingCategory(null)} className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500">Cancel</button>
                </form>
              ) : (
                <>
                  <span className="text-gray-800">{cat.name}</span>
                  <div className="flex gap-3">
                    <button onClick={() => setEditingCategory({...cat})} className="text-sm text-blue-600 hover:underline">Edit</button>
                    {cat.id !== 'cat0' && (<button onClick={() => deleteCategory(cat.id)} className="text-sm text-red-600 hover:underline">Delete</button>)}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 text-right">
          <button onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Done</button>
        </div>
      </div>
    </div>
  );
};