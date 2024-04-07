import "./loading.css"
export default function AppLoading() {
    return (
        <div className="translate-y-32 pb-36 flex flex-col items-center">
            <svg width="60" height="68" viewBox="0 0 60 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 29.6038V20.5472L24.2453 25.7358L33.6792 20.5472V29.6038L24.2453 35.0755L15 29.6038Z" fill="#02F5C3"/>
                <path d="M15 54.3208V33L23.2075 37.6226V59.5094L15 54.3208Z" fill="#02F5C3"/>
                <path d="M34.717 32.1509L25.566 37.6226V47.0566L34.717 41.7736L45 47.0566V37.6226L39.3396 34.5094L41.0377 32.1509L45 34.5094V13L36.4151 8V29.6038L34.717 32.1509Z" fill="#02F5C3"/>
            </svg>
            <p>
                <span className="text-4xl font-[500]">Crypto</span>
                <span>Profit</span>
            </p>
            <span className="loader"></span>
        </div>
    )
}