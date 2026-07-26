export function HoursCard({hour}){
    return(
        <div className="flex border border-gray-300/20 hover:border-gray-300 hover:text-white font-semibold p-3 px-5 
        items-center justify-center rounded-full cursor-pointer">
            <p>{hour}</p>
        </div>
    )
}