function ToggleSwitch({view, setView}){
    return(
        <div id='toggle-switch'>
            <p style={{color: view ? 'orange':'black', transition: '0.2s'}} onClick={() => setView(true)} 
                className='toggles' id='toggle-grid'><i className="fa fa-th-large" aria-hidden="true"></i> GRID</p>
            <p style={{color: view ? 'black':'orange',  transition: '0.2s'}} onClick={() => setView(false)} 
                className='toggles' id='toggle-grid'><i className="fa fa-th-list" aria-hidden="true"></i> LIST</p>
        </div>
    )
}

export default ToggleSwitch;