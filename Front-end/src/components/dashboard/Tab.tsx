type tabProps ={
    label:string
    active: boolean
    onClick: () => void
}

export default function Tab({label,active,onClick}:tabProps){
    return(
        <button onClick={onClick}
        className={`px-3 py-1 rounded-md text-sm font-medium transition
            ${active ? "bg-purple-600 text-white" : "bg-white/10 hover:bg-white/20"}
            `}
        >
            {label}
        </button>
    )
}