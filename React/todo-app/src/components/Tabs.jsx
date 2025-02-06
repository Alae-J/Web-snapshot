export function Tabs(props) {
    const { selectedTab, setSelectedTab, todos } = props;
    const tabs = ['All', 'Open', 'Completed'];
    return (
        <nav className="tab-container">
            {tabs.map((tab, tabIndex) => { // the tabIndex is required when mapping
                const numOfTabs = tab === "All" ?
                    todos.length : 
                    tab === "Open" ?
                        todos.filter(val => !val.complete).length :
                        todos.filter(val => val.complete).length;
                return (
                    <button key={tabIndex} className={"tab-button " + (tab === selectedTab ? "tab-selected" : "") } onClick={() => {
                        setSelectedTab(tab)
                    }} >
                        <h4>{tab} <span>({numOfTabs})</span></h4>
                    </button>
                )
            })}
            <hr />
        </nav>
    )
}