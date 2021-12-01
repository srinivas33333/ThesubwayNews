//jshint esversion:6
const header = document.getElementById('logo');
const forCountryCode = document.getElementById('forcountrycode');
const searchbox = $('#searchbox');
const newsContainer = document.getElementById('news-container');
let url = '';
// const api_key = '21c095742acd4aa491658210230952f8';
const api_key = '';
 let  getIsocode = '';
let news = '';
let output = '';
let fetchToLocal = JSON.parse(localStorage.getItem('news'));
let localNewsToDisplay;
let toLocalAll;

//styling starts here





//styling ends here

//main functions start from here
if (navigator.onLine)
{
    userVisit();
}
else
{
        
   
    output += 'your are offline'+'<img src="/imgs/wifilogo.png" width="120px"alt="">' ;
    newsContainer.innerHTML = output;
    // if (fetchToLocal)
    // {
    //     // toDisplayNews(fetchToLocal);
    //     }
    
}
    function userVisit() {  //used to display news without user search
            
        url = 'https://newsapi.org/v2/top-headlines?country=IN&apiKey=21c095742acd4aa491658210230952f8';
        
        const localurl = url;
        fetching(localurl);

    }   
       
searchbox.on('keypress  paste ', searchNews);

forCountryCode.addEventListener('change', countryNews);   //fetch news when user search

    function countryNews()
    {  //used to display news without user search
            
                //empty innerhtml otherwise the new news will concat with old one's
        getIsocode = forCountryCode.value;

        console.log(getIsocode);
        url = `https://newsapi.org/v2/top-headlines?country=${getIsocode}&apiKey=${api_key}`;
        const localurl = url;

         fetching(localurl);
        // console.log('countrynews return by fetching function');
        // console.log(toLocalAll);

        // if (getIsocode)
        // {
        //     localStorage.setItem('getIsocode', JSON.stringify(toLocalAll));
        // }

            }

    function searchNews(e)
    {
            const toFilter = e.target.value;
            console.log(e);
            // output = 'loading please wait';
            document.getElementById('news-container').innerHTML = output;
        
            localNewsToDisplay =   fetchToLocal.filter(eachArticle => {
                return (
                    eachArticle.source.name.toLowerCase().includes(toFilter.toLowerCase()) || eachArticle.title.toLowerCase().includes(toFilter.toLowerCase()) 
                );
            
            });
            toDisplayNews(localNewsToDisplay);
            console.log(localNewsToDisplay);

    }

    function fetching(localurl)
    {
            
        fetch(localurl).then( res => {
                return res.json();
            }).then(data => {  //accessing apinews from here
            
                news = data.articles;
                console.log(news, data);
                toLocalAll = news;
                toDisplayNews(news); //final output goes here
            
            
                localStorage.setItem('news', JSON.stringify(news));//setting fetched data to localstorage for access by searchbox
                fetchToLocal = JSON.parse(localStorage.getItem('news'));

            // document.getElementById('news-container').innerHTML = output;
            });
        
        // if (getIsocode)
        // {
        //     localStorage.setItem('getIsocode', JSON.stringify(toLocalAll));
        // }

       
    }

        function toDisplayNews(news)
        {
                        
            output = '';
                news.map((article,index) => {
                    
                                                // <p id="describe">${news[index].description}</p>

                    output += `
                <article>
                        <div id="imgdiv"> <img id="imgTag" src="${news[index].urlToImage}" class="img1" alt=""></div>

                        <div id="actual-content">
                                <div id="title_and">

                                    <p id="sourcefrom">SOURCE:&nbsp; ${news[index].source.name}</p>
                                    <p id="title">${news[index].title}</p>

                                </div>

                                <div id="fromTime">
                                
                                    <div id='date_time'>
                                        <p id="date">${news[index].publishedAt.split("T")[0]}</p>
                                        
                                        <p id='time'>${news[index].publishedAt.split('T')[1].substr(0, 8)}</p>
                                    
                                    </div>
                                    <p id="link"><a href=${news[index].url}><i class="fas fa-arrow-right"></i></a></p>
                                </div>

                            </div>

                    </article>
                                        
                        `;
                });
                newsContainer.innerHTML = output;
        }