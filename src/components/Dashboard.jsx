import { useState, useEffect } from 'react';
import AddTransactionModal from './AddTransactionModal';
import { Plus, TrendingUp, TrendingDown, Wallet, IndianRupee, Calendar, Tag, Filter, Search, Eye, EyeOff, Trash2 } from 'lucide-react';
import { useTransactions } from './TransactionContext';
import { FaTrashAlt } from "react-icons/fa";
export default function Dashboard() {
  const { transactions, income, expense,deleteTransaction } = useTransactions();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showBalance, setShowBalance] = useState(true);
  const [animatedValues, setAnimatedValues] = useState({ income: 0, expense: 0, balance: 0 });

  const balance = income - expense;
  const categories = ['All', ...new Set(transactions.map(t => t.category))];

const [showDeleteModal, setShowDeleteModal] = useState(false);
const [transactionToDelete, setTransactionToDelete] = useState(null);

// When user clicks delete
const handleDeleteClick = (id) => {
  setTransactionToDelete(id);
  setShowDeleteModal(true);
};

// When user confirms delete
const confirmDelete = () => {
  if (transactionToDelete) {
    deleteTransaction(transactionToDelete);
    setTransactionToDelete(null);
  }
  setShowDeleteModal(false);
};


  


  useEffect(() => {
    setIsVisible(true);
    const duration = 2000;
    const steps = 60;
    const incomeStep = income / steps;
    const expenseStep = expense / steps;
    const balanceStep = balance / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setAnimatedValues({
        income: Math.floor(incomeStep * currentStep),
        expense: Math.floor(expenseStep * currentStep),
        balance: Math.floor(balanceStep * currentStep)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedValues({ income, expense, balance });
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [income, expense, balance]);


  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getTransactionIcon = (category) => {
    const icons = {
      'Food': '🍽️',
      'Entertainment': '🎬',
      'Utilities': '⚡',
      'Income': '💰',
      'Transport': '🚗',
      'Shopping': '🛍️',
      'Health': '🏥',
      'Education': '📚'
    };
    return icons[category] || '📝';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <h2 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Dashboard
          </h2>
          <p className="text-gray-600 mb-8">Track your financial journey with smart insights</p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         
          <div 
            className={`relative p-6 rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${
              hoveredCard === 'income' ? 'shadow-2xl shadow-green-200' : 'shadow-lg'
            } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              animationDelay: '0.2s'
            }}
            onMouseEnter={() => setHoveredCard('income')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute top-4 right-4">
              <TrendingUp className="w-8 h-8 text-white/80" />
            </div>
            <div className="text-white/80 text-sm font-medium mb-2">Total Income</div>
            <div className="text-3xl font-black text-white mb-1">
              {formatCurrency(animatedValues.income)}
            </div>
            <div className="text-white/60 text-xs">+12% from last month</div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-full">
              <div className="h-full bg-white/40 rounded-full w-3/4 animate-[expandWidth_2s_ease-out_1s]"></div>
            </div>
          </div>

         
          <div 
            className={`relative p-6 rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${
              hoveredCard === 'expense' ? 'shadow-2xl shadow-red-200' : 'shadow-lg'
            } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ 
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              animationDelay: '0.4s'
            }}
            onMouseEnter={() => setHoveredCard('expense')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute top-4 right-4">
              <TrendingDown className="w-8 h-8 text-white/80" />
            </div>
            <div className="text-white/80 text-sm font-medium mb-2">Total Expense</div>
            <div className="text-3xl font-black text-white mb-1">
              {formatCurrency(animatedValues.expense)}
            </div>
            <div className="text-white/60 text-xs">-5% from last month</div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-full">
              <div className="h-full bg-white/40 rounded-full w-2/3 animate-[expandWidth_2s_ease-out_1.2s]"></div>
            </div>
          </div>

         
          <div 
            className={`relative p-6 rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${
              hoveredCard === 'balance' ? 'shadow-2xl shadow-blue-200' : 'shadow-lg'
            } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ 
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              animationDelay: '0.6s'
            }}
            onMouseEnter={() => setHoveredCard('balance')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="text-white/80 hover:text-white transition-colors"
              >
                {showBalance ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
              </button>
              <Wallet className="w-8 h-8 text-white/80" />
            </div>
            <div className="text-white/80 text-sm font-medium mb-2">Current Balance</div>
            <div className="text-3xl font-black text-white mb-1">
              {showBalance ? formatCurrency(animatedValues.balance) : '••••••'}
            </div>
            <div className={`text-xs ${balance >= 0 ? 'text-green-200' : 'text-red-200'}`}>
              {balance >= 0 ? '✓ Healthy balance' : '⚠ Monitor spending'}
            </div>
          </div>
        </div>

       
        <div className={`flex flex-col md:flex-row gap-4 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '0.8s' }}>
          
          <button 
            onClick={() => setShowModal(true)} 
            className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
          >
            <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
            Add Transaction
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          </button>

          
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80 backdrop-blur-sm"
            />
          </div>

      
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-12 pr-8 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80 backdrop-blur-sm appearance-none cursor-pointer"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

       
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '1s' }}>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            Recent Transactions
            <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {filteredTransactions.length}
            </span>
          </h3>

          <div className="space-y-4">
            {filteredTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-gray-200"
                style={{ animationDelay: `${1.2 + index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                      transaction.type === 'Income' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    } group-hover:scale-110 transition-transform duration-300`}>
                      {getTransactionIcon(transaction.category)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {transaction.note}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Tag className="w-4 h-4" />
                        {transaction.category}
                        <Calendar className="w-4 h-4 ml-2" />
                        {(() => {
                          const [dd, mm, yyyy] = transaction.date.split('/');
                          return `${dd}/${mm}/${yyyy}`;
                        })()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex items-center justify-end">
                    <div className={`text-2xl font-black ${
                      transaction.type === 'Expense' ? 'text-red-600' : 'text-green-600'
                    } group-hover:scale-110 transition-transform duration-300`}>
                      {transaction.type === 'Expense' ? '-' : '+'}{formatCurrency(transaction.amount)}
                    </div>
                   <button
  onClick={() => handleDeleteClick(transaction.id)}
  className="text-red-500 hover:text-red-700 transition duration-200 p-2 rounded-full hover:bg-red-100"
  title="Delete Transaction"
>
  <FaTrashAlt size={18} />
</button>


                  </div>
                </div>
                
              
                <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      transaction.type === 'Income' ? 'bg-green-400' : 'bg-red-400'
                    }`}
                    style={{ 
                      width: `${Math.min((transaction.amount / Math.max(...transactions.map(t => t.amount))) * 100, 100)}%`,
                      animationDelay: `${1.5 + index * 0.1}s`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No transactions found</p>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        <AddTransactionModal showModal={showModal} setShowModal={setShowModal} />
        {showDeleteModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
      <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
      <p className="text-gray-500 mb-6">Do you really want to delete this transaction?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowDeleteModal(false)}
          className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={confirmDelete}
          className="px-6 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

      </div>

      
      <style jsx>{`
        @keyframes expandWidth {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}