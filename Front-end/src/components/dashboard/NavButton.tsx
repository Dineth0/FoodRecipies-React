type navButtonProps ={
    label:string
    active:boolean
    onClick: ()=> void
}

export default function NavButton({label,active,onClick}: navButtonProps){
    return(
        <button
        onClick={onClick}
        className={`flex flex-col items-center text-xs transition
                ${active} ? "text-white" :"text-gray-400 hover:text-white"
            `}
        >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-1">

            {label[0].toUpperCase()}
            </div>
            {label}
        </button>
    )
}