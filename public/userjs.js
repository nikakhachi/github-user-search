const regex = /[\w-]+$/;
const currentURL = window.location.href;
const searchedUsername = currentURL.match(regex)[0];

const mainURL = currentURL.replace(/[\w-]+$/,'');
document.getElementById('back-link').href = mainURL;

document.title = `${searchedUsername} | Github Search Engine`;

setupUserPage();

// Sets up the whole user info
function setupUserPage(){
    $.get(`https://api.github.com/search/users?q=${searchedUsername}+in:user`, function(searchResult){
        // If user isn't found, display not found   
        if(!searchResult['total_count']){
            document.getElementById('body').innerHTML = `<div id='not-found'><h1>**NOT FOUND**</h1></div>`;
        // Else, starts gathering info about user and building page
        }else{
            $.get(`https://api.github.com/users/${searchedUsername}`, function(data){
                let userFullName;
                if(!data['name']){
                    userFullName = "*Name not specified*";
                }else{
                    userFullName = data['name'];
                }
                let userLoc;
                if(!data['location']){
                    userLoc = 'Not Specified'
                }else{
                    userLoc = data['location']
                };
                // Fills up user info one by one
                document.getElementById('name').innerText = userFullName;
                document.getElementById('github-link').innerText = `@${data['login']}`;
                document.getElementById('github-link').href = `${data['html_url']}`;
                document.getElementById('acc-type').innerText = `(${data['type']})`;
                document.getElementById('organization').innerText = `Joined in ${data['created_at'].slice(0, 10)}`;
                document.getElementById('location').innerHTML = '<i class="fa fa-map-marker" aria-hidden="true"></i>' + " " + userLoc;
                document.getElementById('follow').innerText = `Following : ${data['following']} | Followers : ${data['followers']}`;
                document.getElementById('img-div').innerHTML = `<img id='avatar' src=${data['avatar_url']} alt=""></img>`;
                document.getElementById('org-title').innerText = `Organization : `;
                $.get(`https://api.github.com/users/${searchedUsername}/orgs`, function(orgs){
                    if(orgs[0][`login`]){orgName = orgs[0]['login']};
                    document.getElementById('org-img-div').innerHTML = `<img id='org-img' src=${orgs[0]['avatar_url']} alt="">`;
                    document.getElementById('org-dscr').innerText = orgs[0]['description'];
                    $.get(orgs[0]['url'], function(orgUrl){
                        document.getElementById('org-name').innerHTML = `<a href=${orgUrl['html_url']} target='_blank'>${orgs[0]['login']}</a>`;
                    })
                    if(orgs.slice(1)){
                        document.getElementById('other-orgs').innerText = `Other Organizations : None`;
                        if(orgs[1]){
                            document.getElementById('other-orgs').innerText = `Other Organizations : `;
                            orgs.slice(1).forEach(item => {
                            $.get(item['url'], function(data){
                                document.getElementById('other-orgs').innerHTML += `  <a href='${data['html_url']}' target='_blank'>${item['login']}</a> . `;
                            })
                        });
                        }
                    }
                })
                $.get(`https://api.github.com/users/${searchedUsername}/repos`, function(repos){
                    let repo1 = ''; let repo1Url = '';
                    let repo2 = ''; let repo2Url = '';
                    let repo3 = ''; let repo3Url = '';
                    if(repos[0]){
                        repo1 = repos[0]['name'];
                        repo1Url = repos[0]['html_url'];
                    }
                    if(repos[1]){
                        repo2 = repos[1]['name'];
                        repo2Url = repos[1]['html_url'];
                    }
                    if(repos[2]){
                        repo3 = repos[2]['name'];
                        repo3Url = repos[2]['html_url'];
                    }
                    document.getElementById('container3').innerHTML = `<h3 id='repo-title'>Repositories : </h3>
                                                                        <a href=${repo1Url} target='_blank'><p class='repos'>${repo1}</p></a>
                                                                        <a href=${repo2Url} target='_blank'><p class='repos'>${repo2}</p></a>
                                                                        <a href=${repo3Url} target='_blank'><p class='repos'>${repo3}</p></a>`
                    if(!repos[0]){
                        document.getElementById('container3').innerHTML = `<h3 id='repo-title'>Repositories : </h3>
                                                                            <p id='none'>None</p>`
                    }
                    if(!document.getElementById('org-name').innerHTML){
                        document.getElementById('org-name').innerHTML = `<p id='none'>None</p>`;
                };
                });
            })
        }
    });
}
