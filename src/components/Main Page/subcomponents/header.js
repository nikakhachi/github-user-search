import './header.css';

function Header(){
    return(
        <header>
        <h1 id='title'>Github User Search</h1>
        <form>
            <input name='username' className='form-element' id='search' type="text" placeholder='Search by Name or Username' />
            <button type='submit' className='form-element' id='search-btn'><i className="fa fa-search" aria-hidden="true"></i> Search</button>
        </form>
        </header>
    )
}

export default Header;