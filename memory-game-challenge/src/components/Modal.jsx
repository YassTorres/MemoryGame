
function Modal({children,modalState})
{
    return(
        <div className="modal-window fixed inset-0 bg-slate-950/75 flex items-center justify-center z-50 animate-fade-in backdrop-blur-sm"> 
            <div className="modal-container bg-slate-800 border-2 border-blue-500 p-6 rounded-2xl max-w-sm w-full mx-4 shadow-2xl transform scale-100 transition-all"> 
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    )

}
export default Modal