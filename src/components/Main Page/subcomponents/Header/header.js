import './header.css';

function Header(props){
    return(
        <header>
        <h1 id='title'>Github User Search</h1>
        <form>
            <input onChange={props.change} value={props.value} name='username' className='form-element' id='search' type="text" placeholder='Search by Name or Username' />
            <button onClick={props.search} type='submit' className='form-element' id='search-btn'><i className="fa fa-search" aria-hidden="true"></i> Search</button>
        </form>
        </header>
    )
}

export default Header;