import React, { useEffect, useState } from 'react'

const ConfirmationModal = ({show, onClose, onConfirm, title, message}) => {
    const [isVisible, setIsVisible] = useState(false);
    
    
    useEffect(() => {
        if (show) {
            setIsVisible(true);
        }
    }, [show]);
    
    if (!show) {
        return null;
    }
    
    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => onClose(), 300);
    };

    const handleConfirm = () => {
        onConfirm()
        handleClose()
    }

    return (
        <div className={`fixed inset-0 w-full h-screen backdrop-blur-sm bg-black/10  transition-opacity duration-300 z-50 overflow-y-auto flex items-center justify-center 
            ${isVisible ? 'bg-opacity-100' : 'bg-opacity-0'
            }`}
            onClick={handleClose}>
            <div 
            onClick={(e) => e.stopPropagation()} 
            className={`bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 my-auto 
                ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
                }`}>
                    <div className="p-6 text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <div className="flex justify-center gap-4">
                            <button 
                                onClick={handleClose}
                                className='px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300' 
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleConfirm}
                                className='px-6 py-3 rounded-xl bg-red-600 text-white font-medium transition-all hover:bg-red-700 shadow-md hover:shadow-lg' 
                            >
                                Delete
                            </button>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default ConfirmationModal