let userName = '';
let users = [];
let toggleSwitches = document.querySelectorAll('.toggle-btn');
let toggleVar = 'list-view';
let mainURL = location.protocol + '//' + location.host + location.pathname;



// On start, loads list view with most popular users defined by followers
$.get(`https://api.github.com/search/users?q=followers:%3E=40000+in:user`, function(data){
    let repositories = '';
    users = data.items;
    users.forEach(user => {
        $.get(`https://api.github.com/users/${user.login}/repos`, function(repos){
            repositories = " " + `${repos[0]['name']}, ${repos[1]['name']}, ${repos[2]['name']}...`;
            // Sets up the account data. Avatar, username, type and repos
            let userURL = mainURL + user['login'];
            document.getElementById('list-view').innerHTML +=   `<div class='container'>
                                                                        <img class='avatar' src=${user["avatar_url"]} alt="user logo">
                                                                        <p class='username'><a class='userlink' href=${userURL} 
                                                                        >${user['login']}</a><span class='usertype'> (${user['type']})</span></p>
                                                                        <p class='repos'><strong>Repos :</strong> ${repositories}</p>
                                                                        </div>`;
            document.getElementById('grid-view').innerHTML +=   `<div class='container'>
                                                                        <img class='avatar' src=${user["avatar_url"]} alt="user logo">
                                                                        <p class='username'><a class='userlink' href=${userURL} 
                                                                        >${user['login']}</a><span class='usertype'> (${user['type']})</span></p>
                                                                        <p class='repos'><strong>Repos :</strong> ${repositories}</p>
                                                                        </div>`;
        });
    });
    // Makes sure only list view is loaded.
    document.getElementById('grid-view').style.display = 'none';
});




// Function for switching between grid and list view
toggleSwitches.forEach(function(button){
    button.addEventListener("click", function(){
		toggleSwitches.forEach(function(button){
			button.classList.remove("active");
		})
    button.classList.add('active');

    toggleVar = button.getAttribute('data-view');
    
    document.getElementById('list-view').style.display = 'none';
    document.getElementById('grid-view').style.display = 'none';

    if(toggleVar == 'list-view'){
        document.getElementById('list-view').style.display = 'block';
    }else{
        document.getElementById('grid-view').style.display = 'grid';
    }
    });
});



// Adds event listener to search button, to initiate search
document.getElementById("search-btn").addEventListener("click", function(event){
  // Search button is clicked and code below is executed
  event.preventDefault()
  userName = document.getElementById('search').value;
    if(userName != ''){
          // Resets 'list-view' and 'grid-view' div, so every time search is clicked, new list/grid appears.
  document.getElementById('list-view').innerHTML = ``;
  document.getElementById('grid-view').innerHTML = ``;

  // Resets "not-found" message if it existed
  document.getElementById('not-found').innerHTML = ``;
  
  searchUsers();
    // PRECONDITION : both, grid and list view is displayed
    // POSTCONDITION : only active view is displayed 
    document.getElementById('list-view').style.display = 'none';
    document.getElementById('grid-view').style.display = 'none';

        if(toggleVar == 'list-view'){
            document.getElementById('list-view').style.display = 'block';
        }else{
            document.getElementById('grid-view').style.display = 'grid';
        }
    }
  });



// Goes through API and collects data for searched users
function searchUsers(){
    let repositories = '';
	// Number of found users that appears, can be changed. for now, it is just 10. That means, for every search you will see max of 10 found accounts.
	// The number is low, because of github REST API rate limit. Less information you seach from API, longer you can use the search engine without exceeding rate limit
    $.get('https://api.github.com/search/users?q=' + userName + '+in:user&per_page=10', function(data){
        users = data.items;
        // If no users are found, displays **Not Found**...
        if(data['total_count'] === 0){
            document.getElementById('main-container').style.display = 'none';
            document.getElementById('toggle-switch').style.display = 'none';
            document.getElementById('not-found').innerHTML = `User Not Found<br><i class="fa fa-frown-o" aria-hidden="true"></i>`;
        }else{
            // Else... Starts setting up each found account
            document.getElementById('main-container').style.display = 'block';
            document.getElementById('toggle-switch').style.display = 'block';
            users.forEach(user => {
                // First, repositories are checked. and stored.
                $.get(`https://api.github.com/users/${user.login}/repos`, function(repos){
                    if(repos[2] != undefined){
                        repositories = " " + `${repos[0]['name']}, ${repos[1]['name']}, ${repos[2]['name']}...`;
                    }else if(repos[1] != undefined){
                        repositories = " " + `${repos[0]['name']}, ${repos[1]['name']}`;
                    }else if(repos[0] != undefined){
                        repositories = " " + `${repos[0]['name']}`;
                    }else{
                        repositories = " " + `none`;
                    }
                    // Sets up the account data. Avatar, username, type and repos
                    let userURL = mainURL + user['login'];
                    document.getElementById('list-view').innerHTML +=   `<div class='container'>
                                                                        <img class='avatar' src=${user["avatar_url"]} alt="user logo">
                                                                        <p class='username'><a class='userlink' href=${userURL} 
                                                                        >${user['login']}</a><span class='usertype'> (${user['type']})</span></p>
                                                                        <p class='repos'><strong>Repos :</strong> ${repositories}</p>
                                                                        </div>`;
                    document.getElementById('grid-view').innerHTML +=   `<div class='container'>
                                                                        <img class='avatar' src=${user["avatar_url"]} alt="user logo">
                                                                        <p class='username'><a class='userlink' href=${userURL} 
                                                                        >${user['login']}</a><span class='usertype'> (${user['type']})</span></p>
                                                                        <p class='repos'><strong>Repos :</strong> ${repositories}</p>
                                                                        </div>`;
                });
            });
        };
    });

};
